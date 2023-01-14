import { getJWTToken } from './token.js';

var albumID, photoURL, publicID;

const editButton = document.getElementById("submit");
editButton.disabled = false;
editButton.addEventListener("click", editAlbum);

document.onload = checkToken();

function checkToken() {
  const decode = JSON.parse(atob(getJWTToken().split('.')[1]));
  if (decode.exp * 1000 < new Date().getTime()) {
    console.log('Time Expired');
    window.location.href = "http://127.0.0.1:5500/wwwroot/login.html";
  }
  else {
    getAlbum();
  }
}

function editAlbum(albumID) {
  const albumName = document.getElementById("album").value;
  const artistName = document.getElementById("artist").value;
  const yearReleased = document.getElementById("year").value;
  const albumGenre = document.getElementById("genre").value;
  const albumRating = document.getElementById("rating").value;
  const albumDesc = document.getElementById("desc").value;
  
  albumID = localStorage.getItem("albumID");

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
  else {

    const album = {
      id: `${albumID}`,
      albumName: `${albumName}`,
      artistName: `${artistName}`,
      yearReleased: `${yearReleased}`,
      albumGenre: `${albumGenre}`,
      albumDescription: `${albumDesc}`,
      albumRating: `${albumRating}`,
      photoURL: `${photoURL}`,
      publicID: `${publicID}`,
    }
    
    editButton.disabled = true;
    console.log(album);

    fetch("http://localhost:5184/api/Album/", {
      method: "PUT",
        headers: {
          "Authorization": `Bearer ${getJWTToken()}`,
          "Content-Type": "application/json",
      },
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
      .then((window.location.href = "http://127.0.0.1:5500/wwwroot/racklist.html"))
      .catch((error) => {
        console.log(error);
    });
  }
}

function getAlbum() {

  albumID = localStorage.getItem("albumID");
  fetch(`http://localhost:5184/api/Album/${albumID}`, {
    method: "GET",
      headers: {
      "Authorization": `Bearer ${getJWTToken()}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

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

      photoURL = data.data.photoURL;
      publicID = data.data.publicID;
    })
    .catch((error) => {
      console.log(error);
    });
}

