import { getJWTToken } from './token.js';

const addButton = document.getElementById("submit");

document.onload = checkToken();

function checkToken() {
  const decode = JSON.parse(atob(getJWTToken().split('.')[1]));
  console.log(decode);
  if (decode.exp * 1000 < new Date().getTime()) {
    console.log('Time Expired');
    window.location.href = "http://127.0.0.1:5500/wwwroot/login.html";
  }
  else {
    //Get add button
    addButton.disabled = false;
    addButton.addEventListener("click", addAlbum);
  }
}

function addAlbum(event) {
  //Prevent the default form submission behavior
  event.preventDefault();

  const albumImg = document.querySelector('input[type="file"]').files[0];
  const albumName = document.getElementById("album").value;
  const artistName = document.getElementById("artist").value;
  const yearReleased = document.getElementById("year").value;
  const albumGenre = document.getElementById("genre").value;
  const albumRating = document.getElementById("rating").value;
  const albumDesc = document.getElementById("desc").value;

  const formData = new FormData(); 

  const isEmpty = str => !str.trim().length;
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
  else {
    formData.append("albumName", albumName);
    formData.append("artistName", artistName);
    formData.append("yearReleased", yearReleased);
    formData.append("albumGenre", albumGenre);
    formData.append("albumRating", albumRating);
    formData.append("albumDesc", albumDesc);
    formData.append("File", albumImg);

    addButton.disabled = true;

    //Send POST request to the API 
    fetch("http://localhost:5184/api/Album/", {
      method: "POST",
        headers: {
          "Authorization": `Bearer ${getJWTToken()}`,
      },
      body: formData
    })
      .then((response) => response.json())
      .then((data) => {
          //Route to rack list page
          window.location.href = "http://127.0.0.1:5500/wwwroot/racklist.html";
      })
      .catch((error) => {
        console.log(error);
    });
  }
}
