import * as THREE from "three";

var camera,
  scene,
  renderer,
  mouseX = 0,
  mouseY = 0,
  particles = [];

init();

function init() {
  camera = new THREE.PerspectiveCamera(
    80,
    window.innerWidth / window.innerHeight,
    1,
    4000
  );
  camera.position.z = 1000;

  scene = new THREE.Scene();
  scene.add(camera);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.getElementById("container").appendChild(renderer.domElement);

  makeParticles();

  document.addEventListener("mousemove", onMouseMove, false);

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  update();
  renderer.render(scene, camera);
}

function update() {
  updateParticles();
}

function makeParticles() {
  var particle, material;

  for (var zpos = -1000; zpos < 1000; zpos += 20) {
    material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    particle = new THREE.Mesh(new THREE.CircleGeometry(5, 32), material);

    particle.position.x = Math.random() * 1000 - 500;
    particle.position.y = Math.random() * 1000 - 500;
    particle.position.z = zpos;

    scene.add(particle);
    particles.push(particle);
  }
}

function updateParticles() {
  for (var i = 0; i < particles.length; i++) {
    var particle = particles[i];
    particle.position.z += mouseY * 5;

    if (particle.position.z > 1000) particle.position.z -= 2000;
  }
}

function onMouseMove(event) {
  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
}
