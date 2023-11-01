import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
                75, 
                window.innerWidth / window.innerHeight, 
                1, 
                1000);
const renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);

const orbitControls = new OrbitControls(camera, renderer.domElement);
// orbitControls.target.set(0, 150, 0);
// orbitControls.minDistance = 100;
// orbitControls.maxDistance = 2000;

const sunMaterial = new THREE.MeshPhongMaterial({
    color: new THREE.Color(0xffff00),
    emissive: new THREE.Color(0xff7700),
    emissiveIntensity: 1,
    shininess: 100
});

const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
const sun = new THREE.Mesh(sunGeometry, sunMaterial);

const earthMaterial = new THREE.MeshStandardMaterial({
    color: 0x0000ff
});
const earthGeometry = new THREE.SphereGeometry(1, 32, 32);
const earth = new THREE.Mesh(earthGeometry, earthMaterial);

const moonMaterial = new THREE.MeshStandardMaterial({
    color: 0x706f6f
});
const moonGeometry = new THREE.SphereGeometry(0.3, 32, 32);
const moon = new THREE.Mesh(moonGeometry, moonMaterial);

scene.add(earth);
scene.add(moon);

camera.position.z = 20;

scene.add(sun);
scene.add(camera);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1,1,1);
scene.add(directionalLight);

var earthRotation = 0;
var moonRotation = 0;

earth.position.x = 7;
moon.position.x = 9;
function animate()
{
    requestAnimationFrame(animate);

    earthRotation += 0.01;
    earth.rotation.y = earthRotation;
    
    moonRotation += 0.1;
    moon.rotation.y = moonRotation;

    const earthOrbit = 1;
    earth.position.x = 7 * Math.cos(earthOrbit * earthRotation);
    earth.position.z = 7 * Math.sin(earthOrbit * earthRotation);
    
    const moonOrbit = 0.5;
    moon.position.x = earth.position.x + 2 * Math.cos(moonOrbit * moonRotation);
    moon.position.z = earth.position.z + 2 * Math.sin(moonOrbit * moonRotation);

    renderer.render(scene, camera);
}

animate();
