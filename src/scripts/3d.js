import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
// import * as dat from "lil-gui";
import gsap from "gsap";

import ee from "./utils/eventsSetUp";

import fragmentShader from "../shaders/fragment.glsl";
import vertexShader from "../shaders/vertex.glsl";

// /**
//  * Base
//  */
// // Debug
// // const gui = new dat.GUI();

// /**
//  * Texture
//  */
// const textureLoader = new THREE.TextureLoader();

//  * Axes Helper
//  */
// // const axesHelper = new THREE.AxesHelper(2);
// // scene.add(axesHelper);

// /**
//  * Renderer
//  */
// const renderer = new THREE.WebGLRenderer({
//   canvas: webglCanvas,
//   alpha: true,
// });
// renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;
// renderer.setSize(sizes.width, sizes.height);
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

class ThreeScene {
  constructor() {
    // Canvas
    this.webglCanvas = document.querySelector("canvas.webgl");

    // Scene
    this.scene = new THREE.Scene();

    this.clock = new THREE.Clock();

    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    this.setCamera();
    this.setControls();
    this.setLights();

    this.setRenderer();

    this.loadModels();

    this.setListeners();
    this.setEmitters();

    this.addSphere();

    this.loop();
  }

  addSphere() {
    this.sphere = new THREE.Mesh(
      new THREE.SphereGeometry(1, 20, 20),
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
      })
    );
    // this.sphere.scale.set(0, 0, 0);
    this.sphere.scale.set(2, 2, 2);
    this.sphere.position.z = -5;
    this.scene.add(this.sphere);
  }

  loadModels() {
    this.gltfLoader = new GLTFLoader();

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");
    this.gltfLoader.setDRACOLoader(dracoLoader);

    this.gltfLoader.load("/models/flacon.glb", (gltf) => {
      const flacon = gltf.scene;
      this.scene.add(gltf.scene);
      flacon.position.set(0, -1, 0);
    });
  }

  setCamera() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;
    this.scene.add(this.camera);
  }

  setLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 10);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 0, 3);
    this.scene.add(directionalLight);

    // const directionalLight2 = new THREE.DirectionalLight(0xffffff, 2);
    // directionalLight2.position.set(-1, 0, 0);
    // this.scene.add(directionalLight2);
  }

  setControls() {
    // Controls
    this.controls = new OrbitControls(this.camera, this.webglCanvas);
    // controls.target.set(0, 0.75, 0);
    this.controls.enableDamping = true;
  }

  setEmitters() {
    ee.on("drawingCompleted", () => {
      gsap.to(sphere.scale, {
        x: 1.2,
        y: 1.2,
        z: 1.2,
        duration: 1,
        ease: "power4",
      });
    });
  }

  setRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.webglCanvas,
      alpha: true,
    });
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  setListeners() {
    window.addEventListener("resize", () => {
      // Update sizes
      this.sizes.width = window.innerWidth;
      this.sizes.height = window.innerHeight;

      // Update camera
      this.camera.aspect = this.sizes.width / this.sizes.height;
      this.camera.updateProjectionMatrix();

      // Update renderer
      this.renderer.setSize(this.sizes.width, this.sizes.height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
  }

  loop() {
    const elapsedTime = this.clock.getElapsedTime();
    // smokeMaterial.uniforms.uTime.value = elapsedTime;
    //   cylinderMaterial.uniforms.uMouse.value[0] = mouse.x;
    //   cylinderMaterial.uniforms.uMouse.value[1] = mouse.y;

    this.sphere.rotation.y = elapsedTime * 0.5;
    // sphere.rotation.z = Math.cos(elapsedTime);

    // Update controls
    this.controls.update();

    // Render
    this.renderer.render(this.scene, this.camera);

    // Call tick again on the next frame
    requestAnimationFrame(this.loop.bind(this));
  }
}

new ThreeScene();
