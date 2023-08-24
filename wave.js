// Import Three.js library
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

camera.position.set(0,8,0);
controls.update(); 

// Create particle geometry
const particlesGeometry = new THREE.BufferGeometry();

// Create arrays to hold positions and colors
const positions = new Float32Array(10000 * 3);
const colors = new Float32Array(10000 * 3);

// Initialize positions and colors
for (let i = 0; i < 10000; i++) {
  const i3 = i * 3;
  positions[i3] = (Math.random() - 0.5) *20; // X
  positions[i3 + 1] = (Math.random() - 0.5) *20; // Y
  positions[i3 + 2] = (Math.random() - 0.5) *20; // Z

  colors[i3] = Math.random(); // R
  colors[i3 + 1] = Math.random(); // G
  colors[i3 + 2] = Math.random(); // B
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
 
// Create particle material
const particlesMaterial = new THREE.PointsMaterial({ size: 0.09, vertexColors: true });

// Create particle system
const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particleSystem);


function animate() {
    // Update particle positions
    const elapsedTime = Date.now() * 0.001;
    const positionsArray = particlesGeometry.attributes.position.array;
  
    for (let i = 0; i < 10000; i++) {
      const i3 = i * 3;
      const x = positionsArray[i3];
      positionsArray[i3 + 1] = Math.cos(elapsedTime + x);
    }
  
    // Mark the buffer as needing an update
    particlesGeometry.attributes.position.needsUpdate = true;
  
    // Render the scene
    renderer.render(scene, camera);
  
    // Call animate recursively
    requestAnimationFrame(animate);
  }
  
  // Start the animation loop
  animate();
