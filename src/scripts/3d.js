import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import * as dat from "lil-gui";
import gsap from "gsap";

import ee from "./utils/eventsSetUp";

import fragmentShader from "../shaders/fragment.glsl";
import vertexShader from "../shaders/vertex.glsl";
import { LogLuvEncoding, MeshStandardMaterial } from "three";

// /**
//  * Base
//  */
// // Debug
// const gui = new dat.GUI();

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

    this.gui = new dat.GUI();
    console.log(this.gui);

    // Scene
    this.scene = new THREE.Scene();

    this.clock = new THREE.Clock();

    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    this.debugParameters = {
      directionalLight1Color: 0xffffff,
      directionalLight2Color: 0xffffff,
      directionalLight3Color: 0xffffff,
    };

    this.setCamera();
    this.setControls();
    this.setLights();

    this.setRenderer();

    this.loadEnvMap();
    this.loadTextures();
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

  loadEnvMap() {
    const cubeTextureLoader = new THREE.CubeTextureLoader();

    this.environmentMapTexture1 = cubeTextureLoader.load([
      "/envMap/map1/px.png",
      "/envMap/map1/nx.png",
      "/envMap/map1/py.png",
      "/envMap/map1/ny.png",
      "/envMap/map1/pz.png",
      "/envMap/map1/nz.png",
    ]);
  }

  loadTextures() {
    const textureLoader = new THREE.TextureLoader();

    // this.glassAmbient = textureLoader.load("/images/glass/glassAmbient.jpg/");
    // this.glassBaseColor = textureLoader.load(
    //   "/images/glass/glassBaseColor.jpg/"
    // );
    // this.glassHeight = textureLoader.load("/images/glass/glassHeight.png/");
    // this.glassNormal = textureLoader.load("/images/glass/glassNormal.jpg/");
    // this.glassRoughness = textureLoader.load(
    //   "/images/glass/glassRoughness.jpg/"
    // );
    this.glassAmbient = textureLoader.load("/images/glass2/glassAmbient.png/");
    this.glassHeight = textureLoader.load("/images/glass2/glassHeight.png/");
    this.glassNormal = textureLoader.load("/images/glass2/glassNormal.png/");

    this.waterHeight = textureLoader.load("/images/textures/water.png/");
  }

  loadModels() {
    this.gltfLoader = new GLTFLoader();

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");
    this.gltfLoader.setDRACOLoader(dracoLoader);

    this.gltfLoader.load("/models/flacon.glb", (gltf) => {
      const loadedFlacon = gltf.scene.children[0];

      const glassMaterial = new THREE.MeshStandardMaterial({
        envMap: this.environmentMapTexture1,
        transparent: true,
        // opacity: 0.6,
        metalness: 0.99,
        roughness: 0,
        // map: this.glassBaseColor,
        aoMap: this.glassAmbient,
        aoMapIntensity: 1,
        side: THREE.DoubleSide,
        color: new THREE.Color("#ffffff"),
        // displacementMap: this.glassHeight,
        // displacementScale: 0.1,
        // displacementBias: -0.1,
        // metalnessMap = doorMetalnessTexture
        normalMap: this.glassNormal,
        flatShading: false,
        // this.glassRoughness,
      });

      this.gui
        .add(glassMaterial, "metalness")
        .min(0)
        .max(1)
        .step(0.01)
        .name("flacon metalness");
      this.gui
        .add(glassMaterial, "roughness")
        .min(0)
        .max(1)
        .step(0.01)
        .name("flacon roughness");

      const flaconGeometry = loadedFlacon.geometry;
      flaconGeometry.setAttribute(
        "uv2",
        new THREE.BufferAttribute(flaconGeometry.attributes.uv.array, 2)
      );

      this.flacon = new THREE.Mesh(flaconGeometry, glassMaterial);

      this.flacon.position.set(0, -1, 0);

      this.scene.add(this.flacon);

      this.flacon2 = new THREE.Mesh(flaconGeometry, glassMaterial.clone());

      this.flacon2.material.opacity = 0.2;
      // this.flacon2.material.opacity = 0;
      this.flacon2.material.displacementMap = this.waterHeight;
      this.flacon2.material.displacementScale = 0.5;
      this.flacon2.material.displacementBias = -0.35;
      this.scene.add(this.flacon2);

      this.flacon.material.color = new THREE.Color("white");

      // this.flacon2.rotation.y = Math.PI;

      // mask.material.transparent = false;
      // this.flacon2.material.transparent = false;
      // this.flacon2.material.opacity = 0;
      // this.flacon2.renderOrder = -1;

      this.flacon2.position.set(0, -1, 0);
      this.flacon2.scale.set(0.97, 0.97, 0.97);
      // scaleY(this.flacon2, 0.1);
      // this.flacon2.scale.y = 0.1;

      this.flacon.material.depthWrite = false;
      this.flacon.material.opacity = 0.99;

      //DEBUG
      this.gui
        .add(this.flacon.material, "opacity")
        .min(0)
        .max(1)
        .step(0.01)
        .name("flacon opacity");
      this.gui
        .add(this.flacon2.material, "opacity")
        .min(0)
        .max(1)
        .step(0.01)
        .name("liquide opacity");

      console.log(this.flacon.material == this.flacon2.material);
    });
  }

  setCamera() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      10
    );
    this.camera.position.z = 5;
    this.scene.add(this.camera);
  }

  setLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    this.scene.add(ambientLight);

    this.gui
      .add(ambientLight, "intensity")
      .min(-5)
      .max(5)
      .step(0.1)
      .name("ambient intensity");

    const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
    directionalLight.position.set(5, 5, 5);
    this.scene.add(directionalLight);

    this.gui
      .add(directionalLight, "intensity")
      .min(-10)
      .max(10)
      .step(0.1)
      .name("directionalLight1 intensity");
    this.gui
      .add(directionalLight.position, "x")
      .min(-15)
      .max(15)
      .step(0.4)
      .name("directionalLight1 x");
    this.gui
      .add(directionalLight.position, "y")
      .min(-15)
      .max(15)
      .step(0.4)
      .name("directionalLight1 y");
    this.gui
      .add(directionalLight.position, "z")
      .min(-15)
      .max(15)
      .step(0.4)
      .name("directionalLight1 z");
    this.gui
      .addColor(this.debugParameters, "directionalLight1Color")
      .onChange(() => {
        // console.log(this.debugParameters.directionalLight1Color);
        directionalLight.color.set(this.debugParameters.directionalLight1Color);
      });

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 10);
    directionalLight2.position.set(-5, -5, 5);
    this.scene.add(directionalLight2);

    this.gui
      .add(directionalLight2, "intensity")
      .min(-10)
      .max(10)
      .step(0.1)
      .name("directionalLight2 intensity");
    this.gui
      .add(directionalLight2.position, "x")
      .min(-15)
      .max(15)
      .step(0.4)
      .name("directionalLight2 x");
    this.gui
      .add(directionalLight2.position, "y")
      .min(-15)
      .max(15)
      .step(0.4)
      .name("directionalLight2 y");
    this.gui
      .add(directionalLight2.position, "z")
      .min(-15)
      .max(15)
      .step(0.4)
      .name("directionalLight2 z");
    this.gui
      .addColor(this.debugParameters, "directionalLight2Color")
      .onChange(() => {
        // console.log(this.debugParameters.directionalLight2Color);
        directionalLight2.color.set(
          this.debugParameters.directionalLight2Color
        );
      });

    const directionalLight3 = new THREE.DirectionalLight(0xffffff, 10);
    directionalLight3.position.set(-5, -10, 5);
    this.scene.add(directionalLight3);

    this.gui
      .add(directionalLight3, "intensity")
      .min(-10)
      .max(10)
      .step(0.1)
      .name("directionalLight3 intensity");
    this.gui
      .add(directionalLight3.position, "x")
      .min(-15)
      .max(15)
      .step(0.4)
      .name("directionalLight3 x");
    this.gui
      .add(directionalLight3.position, "y")
      .min(-15)
      .max(15)
      .step(0.4)
      .name("directionalLight3 y");
    this.gui
      .add(directionalLight3.position, "z")
      .min(-15)
      .max(15)
      .step(0.4)
      .name("directionalLight3 z");
    this.gui
      .addColor(this.debugParameters, "directionalLight3Color")
      .onChange(() => {
        // console.log(this.debugParameters.directionalLight3Color);
        directionalLight3.color.set(
          this.debugParameters.directionalLight3Color
        );
      });

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

function scaleY(mesh, scale) {
  mesh.scale.y = scale;
  // if (!mesh.geometry.boundingBox) mesh.geometry.computeBoundingBox();
  var height =
    mesh.geometry.boundingBox.max.y - mesh.geometry.boundingBox.min.y;
  //height is here the native height of the geometry
  //that does not change with scaling.
  //So we need to multiply with scale again
  console.log((height * scale) / 2);
  mesh.position.y = (height * scale) / 2 - height + ((height * scale) / 2) * 2;
}
