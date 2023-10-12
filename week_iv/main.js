import * as THREE from "three";

// Set up the scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create materials
const sunMaterial1 = new THREE.MeshPhongMaterial({
  color: new THREE.Color(0xffff00),
  emissive: new THREE.Color(0xff6600),
  emissiveIntensity: 1,
  shininess: 100,
});

const earthMaterial1 = new THREE.MeshStandardMaterial({
  color: 0x0000ff,
  roughness: 0.7,
});

const moonMaterial1 = new THREE.MeshStandardMaterial({
  color: 0xaaaaaa,
  roughness: 0.4,
});
// Create the Sun's material with MeshPhongMaterial
const sunMaterial = new THREE.MeshPhongMaterial({
  color: new THREE.Color(0xffff00), // Base color
  emissive: new THREE.Color(0xff6600), // Emissive color
  emissiveIntensity: 1, // Emissive intensity
  shininess: 100, // Shininess (adjust as needed)
});

const earthMaterial = new THREE.MeshStandardMaterial({
  color: 0x0000ff,
  roughness: 0.7,
  metalness: 0.0,
});

const moonMaterial = new THREE.MeshStandardMaterial({
  color: 0xaaaaaa,
  roughness: 0.5,
  metalness: 0.0,
});

// Create the Sun
const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Create the Earth
const earthGeometry = new THREE.SphereGeometry(1, 32, 32);
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earth);

// Create the Moon
const moonGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
scene.add(moon);

// Set camera position
camera.position.z = 20;

// Add lights to the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// Animation variables
let earthRotation = 0;
let moonRotation = 0;

// Animation function
function animate() {
  requestAnimationFrame(animate);

  // Earth's rotation around its own axis
  earthRotation += 0.001;
  earth.rotation.y = earthRotation;

  earth.position.x = 10;
  moon.position.x = 12;

  // Earth's orbit around the Sun
  const earthOrbitSpeed = 1;
  earth.position.x = 10 * Math.cos(earthOrbitSpeed * earthRotation);
  earth.position.z = 10 * Math.sin(earthOrbitSpeed * earthRotation);

  // Moon's rotation around its own axis
  moonRotation += 0.03;
  moon.rotation.y = moonRotation;

  // Moon's orbit around the Earth
  const moonOrbitSpeed = 0.5;
  moon.position.x =
    earth.position.x + 2 * Math.cos(moonOrbitSpeed * moonRotation);
  moon.position.z =
    earth.position.z + 2 * Math.sin(moonOrbitSpeed * moonRotation);

  renderer.render(scene, camera);
}

// Run the animation loop
animate();
