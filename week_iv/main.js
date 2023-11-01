import * as THREE from "three"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 100);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const sphereMaterial = new THREE.MeshPhongMaterial({

    color: new THREE.Color(0xff0000),
    //emissive: new THREE.Color(0xff0000),
    shininess: 100,

});

const sphereGeometry = new THREE.SphereGeometry(1, 16, 16);
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);
sphere.position.x = 2;
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);

const gridHelper = new THREE.GridHelper( 10, 10 );
scene.add( gridHelper );



const helper = new THREE.DirectionalLightHelper( directionalLight, 5 );
scene.add( helper );

scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(-10, 0, 10);

const sphereSize = 1;
const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
scene.add( pointLightHelper );
scene.add(pointLight);

const spotLight = new THREE.SpotLight(0xffffff, 0);
spotLight.position.set(-10, -10, 10);
scene.add(spotLight);

const spotLightHelper = new THREE.SpotLightHelper( spotLight );
scene.add( spotLightHelper );

const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

const boxHelper = new THREE.BoxHelper( sphere, 0xffff00 );
scene.add(boxHelper);

const controls = new OrbitControls( camera, renderer.domElement );

controls.update();


camera.position.y = 2;
camera.position.z = 5;
renderer.render(scene, camera);
