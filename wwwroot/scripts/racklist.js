import { getJWTToken } from './token.js';

var albumID;

const addButton = document.getElementById('addAlbum');
addButton.onclick = function () {
  location.assign('http://127.0.0.1:5500/wwwroot/addAlbum.html');
}

document.onload = checkToken();

/*
 * checkToken - Decode JWT on document load to determine whether
 * user is still signed in or needs to log in again
 */
function checkToken() {
  //Parse the JSON string to get base64 URL
  const decode = JSON.parse(atob(getJWTToken().split('.')[1]));

  //JWT is expired if decode expiry time is less than current time
  if (decode.exp * 1000 < new Date().getTime()) {
    console.log('Time Expired');
    //Route to login
    window.location.href = "http://127.0.0.1:5500/wwwroot/login.html";
  }
  else {
    //Continue to rack list
    getAlbums();
  }
}

function getAlbums() {
  fetch("http://localhost:5184/api/Album/GetAll", {
    method: "GET",
      headers: {
      "Authorization": `Bearer ${getJWTToken()}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      _displayAlbums(data)
    })
    .catch((error) => {
      console.log(error);
    });
}

export function editAlbum(ID) {
  console.log(ID);
  window.location.href = "http://127.0.0.1:5500/wwwroot/editAlbum.html";
  localStorage.setItem("albumID", ID);
}

export function deleteAlbum(ID) {
  if (confirm("Are you sure you want to delete this album? It cannot be recovered.") == true) {
    fetch(`http://localhost:5184/api/Album/${ID}`, {
    method: "DELETE",
      headers: {
      "Authorization": `Bearer ${getJWTToken()}`,
    },
  })
    .then(location.reload())
    .catch((error) => {
      console.log("Unable to delete item", error);
    });
  }
  console.log(ID);
}

function _displayAlbums(data) {
  const albumTrack = document.getElementById("image-track");

  Object.values(data)[0].forEach(album => {
    let albumDiv = document.createElement('div');
    albumDiv.setAttribute("class", "album");

    let image = document.createElement('img');
    image.setAttribute("class", "image");
    image.setAttribute('draggable', false);
    image.setAttribute('src', album.photoURL);

    let iconsDiv = document.createElement('div');
    iconsDiv.setAttribute("class", "icons");

    let updateIcon = document.createElement('img');
    updateIcon.setAttribute("class", "iconUpdate");
    updateIcon.setAttribute('draggable', false);
    updateIcon.setAttribute('onclick', `editAlbum(${album.id})`);
    updateIcon.setAttribute('src', 'images/edit.png');


    let deleteIcon = document.createElement('img');
    deleteIcon.setAttribute("class", "iconDelete");
    deleteIcon.setAttribute('draggable', false);
    deleteIcon.setAttribute('onclick', `deleteAlbum(${album.id})`);
    deleteIcon.setAttribute('src', 'images/delete.png');

    albumTrack.appendChild(albumDiv);
    albumDiv.appendChild(image);
    albumDiv.appendChild(iconsDiv);
    iconsDiv.appendChild(updateIcon);
    iconsDiv.appendChild(deleteIcon);
  });
}




