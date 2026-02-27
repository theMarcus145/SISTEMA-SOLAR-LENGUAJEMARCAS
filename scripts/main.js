import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const scene = new THREE.Scene();

//CÁMARA
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

window.addEventListener("resize", () => {
  camera.aspect = getCameraAspect();
  camera.updateProjectionMatrix();
});

const canvas = document.querySelector("#displayContent");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);

// MODELO 3D
let model = null;
const loader = new GLTFLoader();
loader.load(
  "/sun2.glb",
  (glb) => {
    console.log("Modelo cargado:", glb);
    model = glb.scene;
    model.position.set(0, 0, 0);
    model.scale.set(0.34, 0.34, 0.34);
    scene.add(model);

    // FUNCIÓN PARA CREAR LA TEXTURA DE BRILLO
    function crearTexturaGlow() {
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext("2d");

      const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
      gradient.addColorStop(0.1, "rgb(255, 255, 255)");
      gradient.addColorStop(0.2, "rgba(216, 81, 18, 0.98)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 256, 256);

      return new THREE.CanvasTexture(canvas);
    }

    // AÑADIR EL BRILLO
    const glowMaterial = new THREE.SpriteMaterial({
      map: crearTexturaGlow(),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    // AÑADE EL BRILLO AL RENDERER
    const glow = new THREE.Sprite(glowMaterial);
    glow.scale.set(40, 40, 1); // TAMAÑO DEL GLOWMATERIAL
    scene.add(glow);
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + "% cargado");
  },
  (error) => {
    console.error("Error:", error);
  },
);

camera.position.set(0, 4, 20);
camera.lookAt(0, 0, 0);

function animate(time) {
  if (model) {
    model.rotation.y = time / 14000;
  }
  renderer.render(scene, camera);
}
