import { getJWTToken } from './token.js';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';



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
      window.location.href = "/login.html";
    }
    else {
      getAlbum();
    }
  }
  else {
    //Route to login
    window.location.href = "/login.html";
  }
}

/*
* getAlbum - Fetch API call to receive the specified album as per ID
*/
function getAlbum() {
  //Retrieve the albumID from local storage
  albumID = localStorage.getItem("albumID");

  //Send GET request to the API
  fetch(`https://ec2-3-142-232-139.us-east-2.compute.amazonaws.com:5184/api/Album/${albumID}`, {
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
      //Set the passed ID in the browsers local storage as albumID
      
      photoURL = data.data.photoURL;

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

      loadDisplay();
        
    })
    .catch((error) => {
        console.log(error);
    });
}

/*
* loadDisplay - display spinning album
*/
function loadDisplay() {
  //Configure album size
  const sizes = {
    width: window.innerWidth / 2,
    height: window.innerHeight,
  };

  //Create a scene and camera render
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);

  //Retrieve canvas
  const canvas = document.querySelector('.webgl');
  //Create and configure renderer
  const renderer = new THREE.WebGLRenderer({canvas, alpha: true});
  renderer.setSize(sizes.width, sizes.height);
  document.body.appendChild(renderer.domElement);

  const geometry = new THREE.BoxGeometry(2.5, 2.5, 0.15);
  const texture = new THREE.TextureLoader().load(photoURL);

  //Specify cube materials
  var cubeMaterial = [
    new THREE.MeshBasicMaterial({
      color: 0x4e3a36  //left
    }),
    new THREE.MeshBasicMaterial({
      color: 0x4e3a36, //right
    }),
    new THREE.MeshBasicMaterial({
      color: 0x4e3a36 // top
    }),
    new THREE.MeshBasicMaterial({
      color: 0x4e3a36// bottom
    }),
    new THREE.MeshBasicMaterial({
      map: texture, //front
    }),
    new THREE.MeshBasicMaterial({
      map: texture //front
    })
  ];
  //Create the cube
  const cube = new THREE.Mesh(geometry, cubeMaterial);
  scene.add(cube);

  camera.position.z = 4;

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.enableZoom = false;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 2;

  //Every frame, re-animate the spinning album
  function animate() {
    controls.update();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
}



