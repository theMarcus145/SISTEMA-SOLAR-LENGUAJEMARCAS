import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const scene = new THREE.Scene();

// CÁMARA
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

// RESIZE DE LA VENTANA
window.addEventListener("resize", () => {
  const width  = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
});

const canvas = document.querySelector("#displayContent");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setAnimationLoop(animate);

let model = null;
const loader = new GLTFLoader();
loader.load(
  "/sun2.glb",
  (glb) => {
    model = glb.scene;
    model.position.set(0, 0, 0);
    model.scale.set(0.34, 0.34, 0.34);
    scene.add(model);

    function crearTexturaGlow() {
      const c = document.createElement("canvas");
      c.width = 256; c.height = 256;
      const ctx = c.getContext("2d");
      const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
      gradient.addColorStop(0.1, "rgb(255, 255, 255)");
      gradient.addColorStop(0.2, "rgba(216, 81, 18, 0.98)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 256, 256);
      return new THREE.CanvasTexture(c);
    }

    const glow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: crearTexturaGlow(),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }));
    glow.scale.set(40, 40, 1);
    scene.add(glow);
  },
  (xhr) => console.log((xhr.loaded / xhr.total) * 100 + "% cargado"),
  (error) => console.error("Error:", error),
);

camera.position.set(0, 4, 20);
camera.lookAt(0, 0, 0);

function animate(time) {
  if (model) model.rotation.y = time / 14000;
  renderer.render(scene, camera);
}