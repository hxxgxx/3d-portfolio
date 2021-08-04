import * as THREE from "https://threejs.org/build/three.module.js"
// console.log(THREE);
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js';
// console.log(OrbitControls);
import Stats from 'https://unpkg.com/three@0.125.2/examples/jsm/libs/stats.module.js';
// console.log(Stats);

// global variable
let scene;
let camera;
let renderer;
const canvas = document.querySelector('.webgl');

// create scene (scene setup)
scene = new THREE.Scene();

// camera setup
const fov = 60;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;

camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;
scene.add(camera);

// renderer setup
renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.autoClear = false;
renderer.setClearColor(0x000000, 0.0);

// orbit control setup
const controls = new OrbitControls(camera, renderer.domElement);


// earth geometry
//                                        radius segment height
const earthGeometry = new THREE.SphereGeometry(0.6, 32, 32);

// earth material
const earthMaterial = new THREE.MeshPhongMaterial({
    roughness: 1,
    metalness: 0,

    map: THREE.ImageUtils.loadTexture('./texture/earthmap1k.jpg'),
    bumpMap: THREE.ImageUtils.loadTexture('./texture/earthbump.jpg'),

    bumpScale: 0.3
});

// earth mesh
const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earthMesh);

// cloud Geometry
const cloudGeometry = new THREE.SphereGeometry(0.63, 32, 32);

// cloud metarial
const cloudMaterial = new THREE.MeshPhongMaterial({

    map: THREE.ImageUtils.loadTexture('./texture/earthCloud.png'),
    transparent: true
});

// cloud mesh
const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
scene.add(cloudMesh);

// galaxy geometry
const starGeometry = new THREE.SphereGeometry(80, 64, 64);


// galaxy material
const starMaterial = new THREE.MeshBasicMaterial({

    map : THREE.ImageUtils.loadTexture('./texture/galaxy.png'),
    side: THREE.BackSide
});

// galaxy mesh
const starMesh = new THREE.Mesh(starGeometry, starMaterial);
scene.add(starMesh);

// create ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

// create point light > 입체
const pointLight = new THREE.PointLight(0xffffff, 1);
//                      x  y  z
pointLight.position.set(5, 3, 5);
scene.add(pointLight);

// point light helper (조명위치)
const Helper = new THREE.PointLightHelper(pointLight);
scene.add(Helper);

// handling resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}, false);

// current fps
const stats = Stats()
document.body.appendChild(stats.dom);

// spinning animation
const animate = () => {
    requestAnimationFrame(animate);
    // how many rotation you want (if you want to more fast rotation increase, slow > decrease rotation)
    earthMesh.rotation.y -= 0.0015;
    cloudMesh.rotation.y -= 0.001;
    starMesh.rotation.y -= 0.002;
    controls.update();
    render();
    stats.update();
}

// rendering
const render = () => {
    renderer.render(scene, camera);
}

animate();