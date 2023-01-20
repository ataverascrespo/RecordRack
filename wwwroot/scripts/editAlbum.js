import { getJWTToken } from './token.js';

//Global variables
var albumID, photoURL, publicID;

//Get Edit button
const editButton = document.getElementById("submit");
editButton.disabled = false;
editButton.addEventListener("click", editAlbum);

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
 * editAlbum(albumID) - Take form input from user and send it to API once form submit occurs
 */
function editAlbum(albumID) {
  //Retrieve all the form element values
  const albumName = document.getElementById("album").value;
  const artistName = document.getElementById("artist").value;
  const yearReleased = document.getElementById("year").value;
  const albumGenre = document.getElementById("genre").value;
  const albumRating = document.getElementById("rating").value;
  const albumDesc = document.getElementById("desc").value;
  
  //Retrieve the albumID from local storage
  albumID = localStorage.getItem("albumID");
  
  //Analyze if string is empty
  const isEmpty = str => !str.trim().length;

   //For each of the form elements, check if empty. Send alert if empty.
  if (isEmpty(albumName)) {
      alert("Album name must be entered");
  }
  else if (isEmpty(artistName)) {
      alert("Artist name must be entered");
  }
  else if (isEmpty(yearReleased)) {
      alert("Release year must be entered");
  }
  else if (isEmpty(albumGenre)) {
      alert("Album genre must be entered");
  }
  else if (isEmpty(albumRating)) {
    alert("Album rating must be entered");
  }
  //Continue when all necessary form elements are filled
  else {
    //Disable the edit button so that it is not edited multiple times
    editButton.disabled = true;

    //Send PUT request to the API 
    fetch("http://localhost:5184/api/Album", {
      method: "PUT",
      headers: {
          //Append the JWT token credentials in the authorization header
          "Authorization": `Bearer ${getJWTToken()}`,
          "Content-Type": "application/json",
      },
      //Send all form elements + albumID/photoURL/publicID in JSON format
      body: JSON.stringify({
        id: albumID,
        albumName: `${albumName}`,
        artistName: `${artistName}`,
        yearReleased: `${yearReleased}`,
        albumGenre: `${albumGenre}`,
        albumDescription: `${albumDesc}`,
        albumRating: albumRating,
        photoURL: `${photoURL}`,
        publicID: `${publicID}`,
      })
    })
      //Link to racklist.html
      .then((window.location.href = "http://127.0.0.1:5500/wwwroot/racklist.html"))
      .catch((error) => {
        console.log(error);
    });
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
      console.log(data);

      //For each of the form elements, set the value to the retrieved API value
      //This creates input preview on the form for editing
      let imgPreview = document.getElementById("output");
      imgPreview.setAttribute('src', data.data.photoURL); 
      
      let albumName = document.getElementById("album");
      albumName.setAttribute('value', data.data.albumName);

      let artistName = document.getElementById("artist");
      artistName.setAttribute('value', data.data.artistName);

      let yearReleased = document.getElementById("year");
      yearReleased.setAttribute('value', data.data.yearReleased);

      let albumGenre = document.getElementById("genre");
      albumGenre.setAttribute('value', data.data.albumGenre);
      
      let albumRating = document.getElementById("rating");
      albumRating.setAttribute('value', data.data.albumRating);
      
      let albumDesc = document.getElementById("desc");
      albumDesc.setAttribute('value', data.data.albumDesc);

      //Retrieve the Cloudinary photoURL and publicID from the API call
      photoURL = data.data.photoURL;
      publicID = data.data.publicID;
    })
    .catch((error) => {
      console.log(error);
    });
}

