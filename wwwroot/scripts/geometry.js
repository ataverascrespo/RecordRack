import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//Configure album size
const sizes = {
    width: window.innerWidth,
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

//Specify camera positions
camera.position.z = 45 / 180 * Math.PI;
camera.position.y = 1;
camera.position.x = 2;

//DOM event listener for window resize
window.addEventListener('resize', () => {
    //Update the sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    //Update camera aspect and projection matrix
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    //Sets the new canvas size
    renderer.setSize(sizes.width, sizes.height);
});


//Load a GLTF model from the directory
let loader = new GLTFLoader();
loader.load("models/scene.gltf", function (gtlf) {
    var record = gtlf.scene.children[0];
    //Create a GSAP timeline, set the scale from 0 to preferred size upon window load
    const timeline = gsap.timeline({ defaults: { duration: 1 } });
    timeline.fromTo(record.scale, { z: 0, x: 0, y: 0 }, { z: 1.5, x: 1.5, y: 1.5 });
    scene.add(gtlf.scene);
    
    //Configure light position
    var directionaLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionaLight.position.set(-20, 35, 0);
    scene.add(directionaLight);

    //Configure orbit controls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 7.5;
  
    //Every frame, re-animate the spinning record
    function animate() {
        controls.update();
        console.log(record.z);
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    animate();
})


