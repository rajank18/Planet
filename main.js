
import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

// Main Globe
const mainGlobeGeometry = new THREE.SphereGeometry(3, 640, 640);
const mainGlobeMaterial = new THREE.MeshStandardMaterial({
    color: '#0000ff',
});
const mainGlobeMesh = new THREE.Mesh(mainGlobeGeometry, mainGlobeMaterial);
scene.add(mainGlobeMesh);

// Stars
const numStars = 100;
const stars = [];

for (let i = 0; i < numStars; i++) {
    const starGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const starMaterial = new THREE.MeshStandardMaterial({
        color: '#ffffff',
    });
    const starMesh = new THREE.Mesh(starGeometry, starMaterial);

    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI - Math.PI / 4;
    const radius = 5 + Math.random() * 50; // Adjust the radius range as needed

    starMesh.position.setFromSphericalCoords(radius, phi, theta);
    
    scene.add(starMesh);
    stars.push(starMesh);
}

const size = {
    width: window.innerWidth,
    height: window.innerHeight,
};

const light = new THREE.PointLight(0xffffff, 80, 100);
light.position.set(5, 10, 10);
scene.add(light);

const camera = new THREE.PerspectiveCamera(45, size.width / size.height, 0.1, 100);
camera.position.z = 12;
scene.add(camera);

const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(size.width, size.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;

const audiosrc = "/space-atmospheric-background-124841.mp3"
const audio = new Audio(audiosrc);
audio.loop = true;
audio.volume = 0.7;
audio.play();

document.addEventListener('click', () => {
    audio.play()
      .then(() => {
        console.log('Audio is playing...');
      })
      .catch(error => {
        console.error('Error playing audio:', error.message);
      });
  });

  
window.addEventListener('resize', () => {
    size.width = window.innerWidth;
    size.height = window.innerHeight;

    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();
    renderer.setSize(size.width, size.height);
});



const loop = () => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(loop);
};

loop();





