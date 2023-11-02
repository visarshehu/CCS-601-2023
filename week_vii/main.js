import * as THREE from "three";
import * as dat from "dat.gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

var scene = new THREE.Scene();

// Defining the renderer
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.autoClear = false;

// Lights
var ambientLight = new THREE.AmbientLight(0x222222);
var light = new THREE.DirectionalLight(0xffffff, 1.0);
light.position.set(200, 400, 500);

var light2 = new THREE.DirectionalLight(0xffffff, 1.0);
light2.position.set(-400, 200, -300);

scene.add(ambientLight);
scene.add(light);
scene.add(light2);

// Camera
var camera = new THREE.PerspectiveCamera(
  40,
  window.innerWidth / window.innerHeight,
  1,
  10000
);
camera.position.set(100, 1200, -919);
scene.add(camera);

// Controls
var controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);

// Appending the renderer's DOM element to the container
document.getElementById("container").append(renderer.domElement);

// Creating axes
var axes = new THREE.AxesHelper(600);
scene.add(axes);

// Create the ground plane
var planeGeometry = new THREE.PlaneGeometry(5000, 5000, 32, 32);
var planeMat = new THREE.MeshBasicMaterial({
  color: 0xb4ae00,
  side: THREE.DoubleSide,
});

// Set polygon offset properties to prevent z-fighting
planeMat.polygonOffset = true;
planeMat.depthTest = true;
planeMat.polygonOffsetFactor = 1;
planeMat.polygonOffsetUnits = 0.1;

var plane = new THREE.Mesh(planeGeometry, planeMat);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -2;
scene.add(plane);

const geometry = new THREE.BoxGeometry(5, 5, 5);
var material = new THREE.MeshPhongMaterial({
  color: 0xce0000,
  opacity: 1.0,
  transparent: false,
  shininess: 5.0,
});
var mesh = new THREE.Mesh(geometry, material);
mesh.scale.set(50.0, 50.0, 50.0);
mesh.position.set(0, 130, 0);
scene.add(mesh);

// Create the wireframe for the plane
var wireframeMat = new THREE.MeshBasicMaterial({
  color: 0x000000,
  wireframe: true,
  transparent: true,
});
var wireframe = new THREE.Mesh(planeGeometry, wireframeMat);
wireframe.rotation.x = -Math.PI / 2;
wireframe.position.y = -1.99; // Adjust the position slightly to avoid interference with the cube
scene.add(wireframe);

// GUI Controls
var control = new (function () {
  this.fov = camera.fov;
  this.posX = camera.position.x;
  this.posZ = camera.position.z;
})();

// GUI
var gui = new dat.GUI();
gui.add(control, "fov", 1.0, 90.0).onChange(function (e) {
  camera.fov = e;
});
gui.add(control, "posX", -1000, 1000).onChange(function (e) {
  camera.position.x = e;
});
gui.add(control, "posZ", -1000, 1000).onChange(function (e) {
  camera.position.z = e;
});

// Top View Camera
var topCam = new THREE.OrthographicCamera(
  -window.innerWidth / 2,
  window.innerWidth / 2,
  window.innerHeight / 2,
  -window.innerHeight / 2,
  -1000,
  1000
);
topCam.position.z = 500;
topCam.up.set(0, 0, 1);

// Side View Camera
var sideCam = new THREE.OrthographicCamera(
  -window.innerWidth / 2,
  window.innerWidth / 2,
  window.innerHeight / 2,
  -window.innerHeight / 2,
  -1000,
  1000
);
sideCam.position.z = 500;
sideCam.up.set(0, 0, 1);

// Front View Camera
var frontCam = new THREE.OrthographicCamera(
  -window.innerWidth / 2,
  window.innerWidth / 2,
  window.innerHeight / 2,
  -window.innerHeight / 2,
  -1000,
  1000
);
frontCam.position.z = 500;
frontCam.up.set(0, 1, 0);

animate();

function animate() {
  requestAnimationFrame(animate);
  render();
  update();
}

function update() {
  // controls.update();
}

function render() {
  // Setting camera and projection updates
  camera.lookAt(scene.position);
  camera.updateProjectionMatrix();

  // Clear the entire screen with the proper clear color
  renderer.clear();

  // Perspective view
  renderer.setViewport(0, 0, window.innerWidth / 2, window.innerHeight / 2);
  renderer.render(scene, camera);

  // Top view
  topCam.position.copy(controls.target);
  topCam.position.y += 1;
  topCam.lookAt(controls.target);
  renderer.setViewport(
    window.innerWidth / 2,
    0,
    window.innerWidth / 2,
    window.innerHeight / 2
  );
  renderer.render(scene, topCam);

  // Front view
  frontCam.position.copy(controls.target);
  frontCam.lookAt(controls.target);
  renderer.setViewport(
    0,
    window.innerHeight / 2,
    window.innerWidth / 2,
    window.innerHeight / 2
  );
  renderer.render(scene, frontCam);

  // Side view
  sideCam.position.copy(controls.target);
  sideCam.position.x += 1;
  sideCam.lookAt(controls.target);
  renderer.setViewport(
    window.innerWidth / 2,
    window.innerHeight / 2,
    window.innerWidth / 2,
    window.innerHeight / 2
  );
  renderer.render(scene, sideCam);
}
