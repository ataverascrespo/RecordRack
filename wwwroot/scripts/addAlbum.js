import { getJWTToken } from './token.js';

//Get add button
const addButton = document.getElementById("submit");

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
      window.location.href = "/login.html";
    }
    else {
      addButton.disabled = false;
      addButton.addEventListener("click", addAlbum);
    }
  }
  else {
    //Route to login
    window.location.href = "/login.html";
  }
}

/*
 * addAlbum(event) - Take form input from user and send it to API once form submit occurs
 */
function addAlbum(event) {
  //Prevent the default form submission behavior
  event.preventDefault();

  //Retrieve all the form element values
  const albumImg = document.querySelector('input[type="file"]').files[0];
  const albumName = document.getElementById("album").value;
  const artistName = document.getElementById("artist").value;
  const yearReleased = document.getElementById("year").value;
  const albumGenre = document.getElementById("genre").value;
  const albumRating = document.getElementById("rating").value;

  //Create a new FormData element
  const formData = new FormData(); 

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
  else if (albumImg == undefined) {
    alert("Album cover image must be uploaded via 'Choose file' form");
  }
  //Continue when all necessary form elements are filled
  else {
    //Append each of the submitted form elements to the formData element
    formData.append("albumName", albumName);
    formData.append("artistName", artistName);
    formData.append("yearReleased", yearReleased);
    formData.append("albumGenre", albumGenre);
    formData.append("albumRating", albumRating);
    formData.append("File", albumImg);
    
    //Disable the add button so that multiple copies of the same album are not added
    addButton.disabled = true;

    //Send POST request to the API 
    fetch("https://www.r3c0rdr4ck.xyz/api/Album/", {
      method: "POST",
      headers: {
          //Append the JWT token credentials in the authorization header
          "Authorization": `Bearer ${getJWTToken()}`,
      },
      //Send the formData element in the POST body
      body: formData
    })
      .then((response) => response.json())
      .then((data) => {
          //Route to rack list page
          window.location.href = "/racklist.html";
      })
      .catch((error) => {
        console.log(error);
        //This is rare, but if there happens to be some error, re-enable the add button
        addButton.disabled = true;
    });
  }
}
