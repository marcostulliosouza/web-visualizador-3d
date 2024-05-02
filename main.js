import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.132.2/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.132.2/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'https://cdn.jsdelivr.net/npm/three@0.132.2/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'https://cdn.jsdelivr.net/npm/three@0.132.2/examples/jsm/loaders/MTLLoader.js'; // Importe o MTLLoader também


const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const objLoader = new OBJLoader();
const mtlLoader = new MTLLoader();

// Adicione uma luz ambiente à cena
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Cor branca, intensidade 0.5
scene.add(ambientLight);

// Adicione uma luz direcional para iluminar o modelo 3D
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // Cor branca, intensidade 0.5
directionalLight.position.set(0, 1, 0); // Posição da luz
scene.add(directionalLight);

// Adicione controles de órbita
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Adicione amortecimento aos controles para uma movimentação suave da câmera
controls.dampingFactor = 0.25; // Fator de amortecimento (quanto maior, mais lento é o movimento)
controls.rotateSpeed = 0.35; // Velocidade de rotação dos controles

camera.position.z = 30;

mtlLoader.load('public/exemplo3D.mtl', function (materials) {
    materials.preload();
    objLoader.setMaterials(materials);

    objLoader.load('public/exemplo3D.obj', function (object) {
        console.log('Modelo 3D carregado:', object);
        // Remova a imagem de placeholder quando o modelo 3D for carregado
        const placeholder = document.getElementById('placeholder');
        placeholder.remove();

        // Adicione o modelo à cena
        scene.add(object);
    }, undefined, function (error) {
        console.error('Erro ao carregar o modelo 3D:', error);
    });
}, undefined, function (error) {
    console.error('Erro ao carregar o arquivo MTL:', error);
});

function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Atualize os controles de órbita a cada quadro
    renderer.render(scene, camera);
}

animate();
