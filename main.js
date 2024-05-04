import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.132.2/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.132.2/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'https://cdn.jsdelivr.net/npm/three@0.132.2/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'https://cdn.jsdelivr.net/npm/three@0.132.2/examples/jsm/loaders/MTLLoader.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const objLoader = new OBJLoader();
const mtlLoader = new MTLLoader();

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 1, 0);
scene.add(directionalLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.rotateSpeed = 0.35;

camera.position.z = 30;

mtlLoader.load('public/projeto-principal-garagem.mtl', function (materials) {
    materials.preload();
    objLoader.setMaterials(materials);

    objLoader.load('public/projeto-principal-garagem.obj', function (object) {
        console.log('Modelo 3D carregado:', object);
        scene.add(object);
        const placeholder = document.getElementById('placeholder');
        if (placeholder) {
            placeholder.remove();
        }
    }, undefined, function (error) {
        console.error('Erro ao carregar o modelo 3D:', error);
    });
}, undefined, function (error) {
    console.error('Erro ao carregar o arquivo MTL:', error);
});

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();
