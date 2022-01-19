//https://codinhood.com/post/create-skybox-with-threejs
import * as THREE from 'three';
//import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
/* import Front from './images/room_ft.jpg'
import Back from './images/room_bk.jpg'
import Up from './images/room_up.jpg'
import Down from './images/room_dn.jpg'
import Right from './images/room_rt.jpg'
import Left from './images/room_lf.jpg' */

import Front from './skybox_ft.png'
import Back from './skybox_bk.png'
import Up from './skybox_up.png'
import Down from './skybox_dn.png'
import Right from './skybox_rt.png'
import Left from './skybox_lf.png'

/* let scene, camera, renderer, skyboxGeo, skybox;
let skyboxImage = "room";
  
function createPathStrings(filename) {
    const basePath = "./images/";
    const baseFilename = basePath + filename;
    const fileType = ".jpg";
    const sides = ["ft", "bk", "up", "dn", "rt", "lf"];
    const pathStings = sides.map(side => {
      return baseFilename + "_" + side + fileType;
    });
    console.log('pathStrings', pathStings)
    return pathStings;
  }

function createMaterialArray(filename) {
    const skyboxImagepaths = createPathStrings(filename);
    const materialArray = skyboxImagepaths.map(image => {
      let texture = new THREE.TextureLoader().load(image);
      return new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
    });
    return materialArray;
}


function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    45,
    30000
  );

  camera.position.set(1200, -250, 20000);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.domElement.id = "canvas";
  document.body.appendChild(renderer.domElement);
  const materialArray = createMaterialArray(skyboxImage);
  //------- these 3 lines added a white box
  skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
  skybox = new THREE.Mesh(skyboxGeo);
  scene.add(skybox);
  //------- end of 3 lines that added a white box
  
  animate();
}
function animate() {
  //---To verify it is a cube and not a square we can add a rotation animation within the animate function
  skybox.rotation.x += 0.005; 
  skybox.rotation.y += 0.005;
  //-- end of verification that it is cube not  a square. Note: it rotates on its own
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}


init();
 */


  /*  var myImage = new Image();
   myImage.src = '../src/skybox_bk.png';
   myImage.onerror = function(){
    alert('not found');
   } */


let scene, camera, renderer, skyboxGeo, skybox, controls, myReq;
let zoomOut = false;
let autoRotate = true;
let skyboxImage = 'skybox';

/* function createPathStrings(filename) {
  //const basePath = `https://raw.githubusercontent.com/codypearce/some-skyboxes/master/skyboxes/${filename}/`;
  
  const basePath ="./"
  const baseFilename = basePath + filename;
  const fileType = filename == 'skybox' ? '.png' : '.jpg';
  const sides = ['ft', 'bk', 'up', 'dn', 'rt', 'lf'];

   const pathStings = sides.map(side => {
    return baseFilename + '_' + side + fileType;
  });
  console.log('pathStings', pathStings)
  return pathStings;
} */

function createMaterialArray(filename) {
  const skyboxImagepaths = createPathStrings(filename);
  const materialArray = skyboxImagepaths.map(image => {
    let texture = new THREE.TextureLoader().load(image.defult);

    return new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
  });
  return materialArray;
} 

/* function createMaterialArray() {
    console.log(Front);
    const materialArray = []
    let texture_ft = new THREE.TextureLoader().load( Front);
    let texture_bk = new THREE.TextureLoader().load(Back);
    let texture_up = new THREE.TextureLoader().load( Up);
    let texture_dn = new THREE.TextureLoader().load( Down);
    let texture_rt = new THREE.TextureLoader().load( Right);
    let texture_lf = new THREE.TextureLoader().load( Left);
      
    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_up }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf }));

    for (let i = 0; i < 6; i++) {
      materialArray[i].side = THREE.BackSide;
      //materialArray[i].map = texture;
    }

    return materialArray;
}  */


function init() {

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    45,
    30000,
  );
  camera.position.set(1200, -250, 2000);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.domElement.id = 'canvas';
  document.body.appendChild(renderer.domElement);

  const materialArray = createMaterialArray(skyboxImage);
  //const materialArray = createMaterialArray();

  skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
  skybox = new THREE.Mesh(skyboxGeo, materialArray);

  scene.add(skybox);


  controls = new OrbitControls(camera, renderer.domElement);
  controls.enabled = true;
  controls.minDistance = 700;
  controls.maxDistance = 1500;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1.0;

  window.addEventListener('resize', onWindowResize, false);
  animate();
}
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    controls.autoRotate = autoRotate;
  
    if(controls.maxDistance == 1500 && zoomOut) {
    
      controls.maxDistance = 20000;
      camera.position.z = 20000;
    } else if(controls.maxDistance == 20000 && !zoomOut) {
          console.log('called')
      controls.maxDistance = 1500;
      camera.position.z = 2000;
    }
    
    controls.update();
    renderer.render(scene, camera);
    myReq = window.requestAnimationFrame(animate);
   
}

init();

/* function switchSkyBox (skyboxName) {
  scene.remove(skybox);
  skyboxImage = skyboxName;
  const materialArray = createMaterialArray(skyboxImage);

  skybox = new THREE.Mesh(skyboxGeo, materialArray);
  scene.add(skybox);
}

function toggleAutoRotate(value) {
  autoRotate = value;
}

function toggleZoom(value) {
  zoomOut = value;
  zoomBtn.textContent = value ? 'Inside Box' : "Outside Box";
  loading.style.display = value ? 'none' : 'show';
}

const spaceBtn = document.getElementById('space');
const mountainsBtn = document.getElementById('mountains');
const waterBtn = document.getElementById('water');
const lavaButton = document.getElementById('lava');
const autoRotateBtn = document.getElementById('autoRotate');
const zoomBtn = document.getElementById('zoom');
const loading = document.getElementById('loading');


spaceBtn.addEventListener('click', () => switchSkyBox('purplenebula'))
mountainsBtn.addEventListener('click', () => switchSkyBox('afterrain'))
waterBtn.addEventListener('click', () => switchSkyBox('aqua9'))
lavaButton.addEventListener('click', () => switchSkyBox('flame'))
autoRotateBtn.addEventListener('click', () => toggleAutoRotate(!autoRotate))
zoomBtn.addEventListener('click', () => toggleZoom(!zoomOut)) */