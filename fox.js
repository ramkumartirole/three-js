import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Create a scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let mixer;

// Load the GLTF model
const loader = new GLTFLoader();

loader.load('/Fox/glTF/Fox.gltf', (gltf) => {
  const model = gltf.scene;

  // Create the animation mixer and play the animation
  mixer = new THREE.AnimationMixer(model);
  const action = mixer.clipAction(gltf.animations[2]);
  action.play();

  
    // Center the model on the screen
    // const boundingBox = new THREE.Box3().setFromObject(model);
    // const center = boundingBox.getCenter(new THREE.Vector3());
    // model.position.sub(center);
  
  // Set the initial position and scale of the model
  const initialScale = 0.03;
  model.scale.set(initialScale, initialScale, initialScale);
  scene.add(model);
});

// Add lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
directionalLight.position.set(1, 1, 0);
scene.add(directionalLight);



// Set camera position
camera.position.set(2,2,4); // Use set() for setting multiple coordinates

// Create OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.update(); // Call update initially to prevent initial jump

// Animation loop
const animate = () => {
  // Update the animation mixer


  if (mixer) {
    mixer.update(0.01);
  }

  // Update OrbitControls
  controls.update();

  // Render the scene
  renderer.render(scene, camera);

  // Request the next frame
  requestAnimationFrame(animate);
};

// Start the animation loop
animate();

