import { getJWTToken } from './token.js';

//Get add Button album and assign routing
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
    localStorage.removeItem("albumID");
    //Continue to rack list
    getAlbums();
  }
}

/*
* getAlbums - Fetch API call to receive the list of all albums
*/
function getAlbums() {
  //Send GET request to the API
  fetch("http://localhost:5184/api/Album/GetAll", {
    method: "GET",
    headers: {
      //Append the JWT token credentials in the authorization header
      "Authorization": `Bearer ${getJWTToken()}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      //Once the API call is done, continue to displayAlbums
      displayAlbums(data)
    })
    .catch((error) => {
      console.log(error);
    });
}

/*
* viewAlbum(ID) - Manage logic upon view icon click
*/
export function viewAlbum(ID) {
  window.location.href = "http://127.0.0.1:5500/wwwroot/viewAlbum.html";

  //Set the passed ID in the browsers local storage as albumID
  localStorage.setItem("albumID", ID);
}

/*
* editAlbum(ID) - Manage logic upon edit icon click
*/
export function editAlbum(ID) {
  window.location.href = "http://127.0.0.1:5500/wwwroot/editAlbum.html";

  //Set the passed ID in the browsers local storage as albumID
  localStorage.setItem("albumID", ID);
}

function deletePhoto(PhotoID) {
  //Send DELETE request to the API
  fetch(`http://localhost:5184/api/Album/DeletePhoto?ID=${PhotoID}`, {
    method: "DELETE",
    headers: {
      //Append the JWT token credentials in the authorization header
      "Authorization": `Bearer ${getJWTToken()}`,
    },
  })
  .then((response) => response.json())
  .then((data) => {
    //Reload the page
    location.reload();
  })
  .catch((error) => {
    console.log("Unable to delete photo", error);
  });
}

/*
* deleteAlbum(ID) - Manage logic upon delete icon click
*/
export function deleteAlbum(ID, PhotoID) {

  console.log(PhotoID);
  //Create a modal alert asking for user confirmation, if confirmed continue with Fetch API call
  if (confirm("Are you sure you want to delete this album? It cannot be recovered.") == true) {
    //Send DELETE request to the API
    fetch(`http://localhost:5184/api/Album/${ID}`, {
      method: "DELETE",
      headers: {
        //Append the JWT token credentials in the authorization header
        "Authorization": `Bearer ${getJWTToken()}`,
      },
    })
    .then(deletePhoto(PhotoID))
    .catch((error) => {
      console.log("Unable to delete item", error);
    });
  }
}


/*
* displayAlbums(data) - Display the albums in the rack list
*/
function displayAlbums(data) {
  //Get the image track element, which is responsible for holding the album display
  const albumTrack = document.getElementById("image-track");

  //Iterate through each of the returned objects from the API response data
  Object.values(data)[0].forEach(album => {
    
    //Create div and set class
    //This div will hold all of the album display content
    let albumDiv = document.createElement('div');
    albumDiv.setAttribute("class", "album");

    //Create image abd set class
    //Set the image source to the returned photoURL from Cloudinary
    let image = document.createElement('img');
    image.setAttribute("class", "image");
    image.setAttribute('draggable', false);
    image.setAttribute('src', album.photoURL);

    //Create div and set class
    //This div will hold both icons for each image
    let iconsDiv = document.createElement('div');
    iconsDiv.setAttribute("class", "icons");

    //Create view icon, set image source
    let viewIcon = document.createElement('img');
    viewIcon.setAttribute("class", "iconView");
    viewIcon.setAttribute('draggable', false);
    //Set HTML onclick function to viewAlbum
    viewIcon.setAttribute('onclick', `viewAlbum(${album.id})`);
    viewIcon.setAttribute('src', 'images/view.png');

    //Create update icon, set image source
    let updateIcon = document.createElement('img');
    updateIcon.setAttribute("class", "iconUpdate");
    updateIcon.setAttribute('draggable', false);
    //Set HTML onclick function to editAlbum
    updateIcon.setAttribute('onclick', `editAlbum(${album.id})`);
    updateIcon.setAttribute('src', 'images/edit.png');

    //Create delete icon, set image source
    let deleteIcon = document.createElement('img');
    deleteIcon.setAttribute("class", "iconDelete");
    deleteIcon.setAttribute('draggable', false);
    //Set HTML onclick function to deleteAlbum
    deleteIcon.setAttribute('onclick', `deleteAlbum("${album.id}","${album.publicID}")`)
    deleteIcon.setAttribute('src', 'images/delete.png');

    

    //Append the album div to the album track
    albumTrack.appendChild(albumDiv);
    //Append the image, and icons div to the album div
    albumDiv.appendChild(image);
    albumDiv.appendChild(iconsDiv);
    //Append the view, update and delete icon to the icons div
    iconsDiv.appendChild(viewIcon)
    iconsDiv.appendChild(updateIcon);
    iconsDiv.appendChild(deleteIcon);
  });
}




