import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

var camera, scene, renderer;
var sphere, clouds;
var light, headlight;

function fillScene() {
  scene = new THREE.Scene();
  var ambiLight = new THREE.AmbientLight(0x222222);
  scene.add(ambiLight);

  light = new THREE.DirectionalLight(0xffffff, 0.8);
  light.position.set(-200, 200, -400);
  scene.add(light);

  headlight = new THREE.PointLight(0xffffff, 0.8);
  headlight.position.set(-200, 400, 400);
  scene.add(headlight);

  var textureLoader = new THREE.TextureLoader();

  var surfaceMap = textureLoader.load("images/worldmap.jpg");
  var normalMap = textureLoader.load("images/worldbump.jpg");
  var cloudMap = textureLoader.load("images/worldcloudmap.jpg");

  var earth = new THREE.Object3D();

  sphere = new THREE.Mesh(
    new THREE.SphereGeometry(200, 32, 32),
    new THREE.MeshPhongMaterial({
      map: surfaceMap,
      bumpMap: normalMap,
      bumpScale: 5.0,
    })
  );
  clouds = new THREE.Mesh(
    new THREE.SphereGeometry(210, 32, 32),
    new THREE.MeshPhongMaterial({
      map: cloudMap,
      transparent: true,
      opacity: 0.35,
    })
  );
  earth.position.set(200, 200, -200);
  earth.add(sphere);
  earth.add(clouds);

  scene.add(earth);

  var groundTex = textureLoader.load("images/checker.gif");
  groundTex.wrapS = groundTex.wrapT = THREE.RepeatWrapping;
  groundTex.min_filter = groundTex.mag_filter = THREE.LinearFilter;
  groundTex.repeat.set(5, 5);

  var solidGround = new THREE.Mesh(
    new THREE.PlaneGeometry(10000, 10000),
    new THREE.MeshPhongMaterial({
      color: 0xffffff,
      polygonOffset: true,
      polygonOffsetFactor: 1.0,
      polygonOffsetUnits: 4.0,
      map: groundTex,
      side: THREE.DoubleSide,
    })
  );
  solidGround.rotation.x = -Math.PI / 2;
  scene.add(solidGround);

  var path = "images/skybox/";
  var texFiles = [
    path + "px.jpg",
    path + "nx.jpg",
    path + "py.jpg",
    path + "ny.jpg",
    path + "pz.jpg",
    path + "nz.jpg",
  ];

  var cubeTextureLoader = new THREE.CubeTextureLoader();
  var skyBox = cubeTextureLoader.load(texFiles);

  var cubeMap = new THREE.Mesh(
    new THREE.BoxGeometry(4200, 4200, 4200),
    new THREE.MeshLambertMaterial({
      side: THREE.BackSide,
      color: 0xff6600,
      ambient: 0x993300,
      combine: THREE.MixOperation,
      reflectivity: 0.9,
      envMap: skyBox,
    })
  );
  scene.add(cubeMap);
}

function init() {
  var canvasWidth = window.innerWidth;
  var canvasHeight = window.innerHeight;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.shadowMap.enabled = true;

  renderer.gammaInput = true;
  renderer.gammaOutput = true;
  renderer.setSize(canvasWidth, canvasHeight);

  camera = new THREE.PerspectiveCamera(
    35,
    canvasWidth / canvasHeight,
    1,
    10000
  );
  camera.position.set(-1160, 350, 1600);

  const cameraControls = new OrbitControls(camera, renderer.domElement);
  cameraControls.target.set(0, 100, 0);
}

function addToDOM() {
  var container = document.getElementById("container");
  var canvas = container.getElementsByTagName("canvas");
  if (canvas.length > 0) {
    container.removeChild(canvas[0]);
  }
  container.appendChild(renderer.domElement);
}

function animate() {
  window.requestAnimationFrame(animate);
  render();
}

function render() {
  sphere.rotation.y += 0.02;
  clouds.rotation.y += 0.03;
  renderer.render(scene, camera);
}

init();
fillScene();
addToDOM();
animate();
