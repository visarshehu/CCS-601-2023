import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  38,
  window.innerWidth / window.innerHeight,
  1,
  5000
);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xaaaaaa, 1.0);

const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.target.set(0, 150, 0);
orbitControls.minDistance = 100;
orbitControls.maxDistance = 2000;

const ambientLight = new THREE.AmbientLight(0x222222);

const light = new THREE.DirectionalLight(0xffffff, 1.0);
light.position.set(200, 400, 500);

const light2 = new THREE.DirectionalLight(0xffffff, 1.0);
light2.position.set(-500, 250, -200);

scene.add(ambientLight);
scene.add(light);
scene.add(light2);

const petalMaterial = new THREE.MeshLambertMaterial({ color: 0xee82ee });
const flowerHeight = 200;
const petalLength = 120;

const cylGeom = new THREE.CylinderGeometry(15, 0, petalLength, 32);

const flower = new THREE.Object3D();
for (var i = 0; i < 24; i++) {
  const cylinder = new THREE.Mesh(cylGeom, petalMaterial);
  cylinder.position.y = petalLength / 2;

  console.log("Petal length", petalLength / 2);

  const petal = new THREE.Object3D();
  petal.add(cylinder);

  petal.rotation.z = (90 * Math.PI) / 180;
  petal.rotation.y = (15 * i * Math.PI) / 180;
  petal.position.y = flowerHeight;

  flower.add(petal);
}

const stamenMaterial = new THREE.MeshLambertMaterial({ color: 0x333310 });
const stamen = new THREE.Mesh(
  new THREE.SphereGeometry(20, 32, 16),
  stamenMaterial
);
stamen.position.y = flowerHeight;
flower.add(stamen);

const stemMaterial = new THREE.MeshLambertMaterial({ color: 0x339424 });
const stem = new THREE.Mesh(
  new THREE.CylinderGeometry(10, 10, flowerHeight, 32),
  stemMaterial
);
stem.position.y = flowerHeight / 2;
flower.add(stem);

scene.add(flower);

camera.position.set(0, 500, 500);
camera.lookAt(0, 150, 0);
camera.updateProjectionMatrix();

document.getElementById("container").appendChild(renderer.domElement);

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  renderer.render(scene, camera);
}

animate();
