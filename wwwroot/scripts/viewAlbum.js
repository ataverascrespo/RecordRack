import { getJWTToken } from './token.js';

//Global variables
var albumID, photoURL, publicID, content;

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
    const decode = JSON.parse(atob(getJWTToken().split('.')[1]));

    //JWT is expired if decode expiry time is less than current time
    if (decode.exp * 1000 < new Date().getTime()) {
      console.log('Time Expired');
      //Route to login
      window.location.href = "http://127.0.0.1:5500/wwwroot/login.html";
    }
    else {
      getAlbum();
    }
  }
  else {
    //Route to login
    window.location.href = "http://127.0.0.1:5500/wwwroot/login.html";
  }
}

/*
* getAlbum - Fetch API call to receive the specified album as per ID
*/
function getAlbum() {
  //Retrieve the albumID from local storage
  albumID = localStorage.getItem("albumID");

  //Send GET request to the API
  fetch(`http://localhost:5184/api/Album/${albumID}`, {
    method: "GET",
    headers: {
      //Append the JWT token credentials in the authorization header
      "Authorization": `Bearer ${getJWTToken()}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {

        //For each of the form elements, set the value to the retrieved API value
        //This creates input preview on the form for viewing
        let imgPreview = document.getElementById("output");
        imgPreview.setAttribute('src', data.data.photoURL); 
        
        //Set each of the input elements to read only
        let albumName = document.getElementById("album");
        albumName.setAttribute('value', data.data.albumName);
        albumName.readOnly = true;

        let artistName = document.getElementById("artist");
        artistName.setAttribute('value', data.data.artistName);
        artistName.readOnly = true;

        let yearReleased = document.getElementById("year");
        yearReleased.setAttribute('value', data.data.yearReleased);
        yearReleased.readOnly = true;

        let albumGenre = document.getElementById("genre");
        albumGenre.setAttribute('value', data.data.albumGenre);
        albumGenre.readOnly = true;
        
        let albumRating = document.getElementById("rating");
        albumRating.setAttribute('value', data.data.albumRating);
        albumRating.readOnly = true;
        
        let albumDesc = document.getElementById("desc");
        albumDesc.setAttribute('value', data.data.albumDesc);
        albumDesc.readOnly = true;
    })
    .catch((error) => {
        console.log(error);
    });
}

