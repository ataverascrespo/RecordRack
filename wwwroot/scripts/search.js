import { getJWTToken } from './token.js';

//Spotify Client ID
const CLIENT_ID = "6b6f9f90098c40469273168487c49eb7";
//Secret ID to be retrieved with lambda function
var CLIENT_SECRET;

//Retrieve HTML elements
const searchButton = document.getElementById("search");
const errorMessage = document.getElementById("message-content-search");

var JSONData;

document.onload = checkToken();

/*
 * checkToken - Decode JWT on document load to determine whether
 * user is still signed in or needs to log in again
 */
function checkToken() {
  let jwt = getJWTToken();
  
  //if JWT exists
  if (jwt !== null) {
    //Parse the JSON string to get base64 URL
    const decode = JSON.parse(atob(jwt.split('.')[1]));

    //JWT is expired if decode expiry time is less than current time
    if (decode.exp * 1000 < new Date().getTime()) {
        console.log('Time Expired');
        //Route to login
        window.location.href = "/login.html";
    }
    else {
        searchButton.disabled = false;
        searchButton.addEventListener("click", searchAlbum);
    }
  }
  else {
        //Route to login
        window.location.href = "/login.html";
  }
}

/*
 * validateToken - Function to retrieve and validate Spotify API credentials for search usage
 */
function validateToken() {
    
    fetch('https://recordrack.netlify.app/netlify/functions/spotifyFunction', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((response) => response.json())
    .then((data) => {
        CLIENT_SECRET = data.apiKey;
        console.log(data);
    });
    
    //Send POST request to Spotify API with the required credentials
    var authParameters = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }
    fetch('https://accounts.spotify.com/api/token', authParameters)
        .then(result => result.json())
        //Set the access token in local storage
        .then(data => localStorage.setItem("spotiapi", data.access_token))
        //Exception handler
    .catch((error) => {
        console.log(error);
    });
}

/*
 * validateToken - Function to search for an album using Spotify API
 */
function searchAlbum(event) {
    //Prevent the default form submission behavior
    event.preventDefault();

    //Retrieve the inputted URL
    const albumURL = document.getElementById("album").value;

    //Analyze if a given string is empty
    const isEmpty = str => !str.trim().length;
    
    //For the albumURL, check if empty. Send alert if empty.
    if (isEmpty(albumURL)) {
        alert("Album URL must be entered.");
    }

    //If the URL is not empty
    else {
        var albumID;
        //Regular expression to parse out the ID part of the URL
        const regex = /\/album\/(.+)/;
        //Check if there is a regex match
        const match = albumURL.match(regex);
        if (match !== null) {
            //Store parsed ID if there is a regex match
            albumID = match[1];

        //Call token validation function
        validateToken();
        
        //Send POST request to the API with the user credentials
            fetch(`https://api.spotify.com/v1/albums/${albumID}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    //Append the spotify token credentials in the authorization header
                    "Authorization": `Bearer ${localStorage.getItem("spotiapi")}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    //If the search is unsuccessful, display an error to end user
                    if (data === null) {
                        errorMessage.innerHTML = "That album does not exist.";
                    }
                    //If search is successful, the API returns a JSON body with data pertinent to our 
                    else {
                        errorMessage.innerHTML = "";
                        
                        //Set the album name into local storage
                        localStorage.setItem("spotifyAlbumName", data.name)

                        //Parse the album's release year out of it's full date
                        let parsedYear = data.release_date.split("-")[0];
                        //Set the release year into local storage
                        localStorage.setItem("spotifyAlbumYear", parsedYear)

                        //Set the album image to the first returned image
                        localStorage.setItem("spotifyAlbumImg", data.images[0].url)

                        var names;
                        //If there is only one artist associated, set the name to that artist
                        if (data.artists.length <= 1) {
                            names = data.artists[0].name;
                        }
                        //If there is more than one, concatenate all the artists into one string
                        else {
                            var artists = data.artists.map(artist => artist.name);
                            names = artists.join(", ");
                        }
                        //Set the album artists to the name string
                        localStorage.setItem("spotifyAlbumArtists", names);
                
                        //Route to add album page
                        window.location.href = "/spotifyaddalbum.html";
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        else {
            //Display null alert
            errorMessage.innerHTML = "That is not a valid Spotify URL.";
        }
    }
}

