import * as THREE from "three";

// Create a scene
const scene = new THREE.Scene();

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("WebGL-Output").appendChild(renderer.domElement);

// Create an orthographic camera
const camera = new THREE.OrthographicCamera(
  window.innerWidth / -2,
  window.innerWidth / 2,
  window.innerHeight / 2,
  window.innerHeight / -2,
  -200,
  1000
);
camera.position.set(0, 0, 150);
scene.add(camera);

// Create a geometry
const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
  -100, 100, 0, -100, -100, 0, 100, -100, 0, 100, 100, 0, 0, 100, 0, 0, -100, 0,
]);
geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

// Create faces for the geometry
const indices = new Uint16Array([0, 1, 2, 0, 2, 3]);
geometry.setIndex(new THREE.BufferAttribute(indices, 1));

// Create a material
const material = new THREE.MeshBasicMaterial({
  color: 0xe99306,
  side: THREE.DoubleSide,
  wireframe: true,
});

// Create a mesh
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Render the scene
renderer.render(scene, camera);
