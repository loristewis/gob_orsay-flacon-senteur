import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import * as dat from "lil-gui";
import gsap from "gsap";

import ee from "./utils/eventsSetUp";

import fragmentShader from "../shaders/fragment.glsl";
import vertexShader from "../shaders/vertex.glsl";

import liquidFragment from "../shaders/liquid/liquidFragment.glsl";
import liquidVertex from "../shaders/liquid/liquidVertex.glsl";

export default class ThreeScene {
  constructor() {
    // Canvas
    this.webglCanvas = document.querySelector("canvas.webgl");

    this.gui = new dat.GUI();
    document.querySelector(".lil-gui").style.display = "none";

    // Scene
    this.scene = new THREE.Scene();

    this.clock = new THREE.Clock();

    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    this.customUniforms = {
      uTime: { value: 0 },
      uTexture: { value: 0 },
      uProgress: { value: 0 },
    };

    this.debugParameters = {
      directionalLight1Color: 0xffffff,
      directionalLight2Color: 0xffffff,
      directionalLight3Color: 0xffffff,
      liquidColor: 0xbd5500,
    };

    this.setCamera();
    this.setControls();
    this.setLights();

    this.setRenderer();
    this.setPostProcess();

    this.loadEnvMap();
    this.loadTextures();
    this.loadModels();

    this.setListeners();
    this.setEmitters();

    // this.addSphere();
    // this.addGroup();

    this.loop();
  }

  addGroup() {
    this.scene.add(this.flaconGroup);
    gsap.to(this.flaconGroup.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 0.5,
      delay: 0.25,
      ease: "power4",
    });
  }

  addBouchon() {
    gsap.to(this.bouchon, {
      x: 1,
      y: 1,
      z: 1,
      duration: 0.5,
      delay: 0.25,
      ease: "power4",
    });
  }

  fillFlacon() {
    const animDuration = 1500;

    gsap.to(this.customUniforms.uProgress, {
      value: 1,
      //animation start sooner than its end
      duration: animDuration / 1000 + 4,
      ease: "power4",
    });

    setTimeout(() => {
      ee.emit("fillFlaconSuccess", "flacon has been filled");
    }, animDuration);
  }

  hideFlacon() {
    gsap.to(this.flaconGroup.scale, {
      x: 0,
      y: 0,
      z: 0,
      duration: 2,
      ease: "power4",
    });
    //Liquid can't fade out like flacon bc opacity is in the custom shader
    gsap.set(this.liquid.scale, {
      x: 0,
      y: 0,
      z: 0,
    });
    gsap.to(this.flacon.material, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => ee.emit("drawBouchon", "draw bouchon"),
      ease: "power4",
    });
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
    // this.glassAmbient.encoding = THREE.sRGBEncoding;
    this.glassHeight = textureLoader.load("/images/glass2/glassHeight.png/");
    // this.glassHeight.encoding = THREE.sRGBEncoding;
    this.glassNormal = textureLoader.load("/images/glass2/glassNormal.png/");
    // this.glassNormal.encoding = THREE.sRGBEncoding;

    this.waterHeight = textureLoader.load("/images/textures/water.png/");
    this.customUniforms.uTexture.value = this.waterHeight;
    // this.waterHeight.encoding = THREE.sRGBEncoding;

    this.bouchonBaseColor = textureLoader.load("/images/bouchon/albedo.png/");
    // this.bouchonBaseColor.encoding = THREE.sRGBEncoding;
    this.bouchonAmbient = textureLoader.load("/images/bouchon/ao.png/");
    // this.bouchonAmbient.encoding = THREE.sRGBEncoding;
    // this.bouchonHeight = textureLoader.load("/images/bouchon/bouchonHeight.png/");
    this.bouchonNormal = textureLoader.load("/images/bouchon/normal.png/");
    // this.bouchonNormal.encoding = THREE.sRGBEncoding;
    this.bouchonRoughness = textureLoader.load("/images/bouchon/rough.png/");
    // this.bouchonRoughness.encoding = THREE.sRGBEncoding;
    this.bouchonMetalness = textureLoader.load("/images/bouchon/metal.png/");
    // this.bouchonMetalness.encoding = THREE.sRGBEncoding;

    // this.bouchonMatcap = textureLoader.load("/images/bouchon/goldMatCap.png/");
    this.bouchonMatcap = textureLoader.load("/images/bouchon/goldMatCap2.png/");
    // this.bouchonMatcap.encoding = THREE.sRGBEncoding;
  }

  loadModels() {
    this.gltfLoader = new GLTFLoader();

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");
    this.gltfLoader.setDRACOLoader(dracoLoader);

    this.gltfLoader.load("/models/flacon2.glb", (gltf) => {
      this.flacon = gltf.scene.children[0];
      this.bouchon = gltf.scene.children[1];

      const glassMaterial = new THREE.MeshStandardMaterial({
        envMap: this.environmentMapTexture1,
        envMapIntensity: 0.33,
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

      const flaconGeometry = this.flacon.geometry;

      flaconGeometry.setAttribute(
        "uv2",
        new THREE.BufferAttribute(flaconGeometry.attributes.uv.array, 2)
      );

      //Flacon
      this.flacon.material = glassMaterial;
      this.flacon.material.depthWrite = false;
      this.flacon.material.opacity = 0.6;
      // this.flacon.material.opacity = 0;
      // this.flacon.material.color = new THREE.Color("red");
      this.flacon.rotation.y = Math.PI * 0.5;

      //Liquid
      this.liquid = this.flacon.clone();
      this.liquid.material = glassMaterial.clone();

      //Bouchon
      const metalMaterial = new THREE.MeshStandardMaterial({
        envMap: this.environmentMapTexture1,
        metalness: 0.99,
        roughness: 0,
        map: this.bouchonBaseColor,
        aoMap: this.bouchonAmbient,
        aoMapIntensity: 0.7,
        side: THREE.DoubleSide,
        // color: new THREE.Color("#ffffff"),
        normalMap: this.bouchonNormal,
        roughnessMap: this.bouchonRoughness,
        metalnessMap: this.bouchonMetalness,
      });

      const metalMatcapMaterial = new THREE.MeshMatcapMaterial({
        matcap: this.bouchonMatcap,
      });
      // bouchon.material = metalMaterial;
      this.bouchon.material = metalMatcapMaterial;

      this.liquid.material.onBeforeCompile = (shader) => {
        shader.uniforms.uTime = this.customUniforms.uTime;
        shader.uniforms.uTexture = this.customUniforms.uTexture;
        shader.uniforms.uProgress = this.customUniforms.uProgress;

        shader.vertexShader = shader.vertexShader.replace(
          "#include <common>",
          `
          #include <common>

          varying vec3 vPosition;
          `
        );

        shader.vertexShader = shader.vertexShader.replace(
          "#include <begin_vertex>",
          `
          #include <begin_vertex>

          vPosition = position;
          `
        );

        shader.fragmentShader = shader.fragmentShader.replace(
          "#include <common>",
          `
          #include <common>

          uniform sampler2D uTexture;
          uniform float uProgress;

          varying vec3 vPosition;
          `
        );

        shader.fragmentShader = shader.fragmentShader.replace(
          "#include <output_fragment>",
          `
          #ifdef OPAQUE
          diffuseColor.a = 1.0;
          #endif

          // https://github.com/mrdoob/three.js/pull/22425
          #ifdef USE_TRANSMISSION
          diffuseColor.a *= transmissionAlpha + 0.1;
          #endif
          
          vec4 displace = texture2D(uTexture, vUv);

          float strength = step(1. - uProgress, vUv.y);

          gl_FragColor = vec4( outgoingLight,  strength  * 0.6 );
          `
        );
      };

      this.liquid.material.opacity = 1;
      // this.liquid.material.opacity = 0.6;
      this.liquid.material.displacementMap = this.waterHeight;
      this.liquid.material.color = new THREE.Color(
        this.debugParameters.liquidColor
      );
      this.liquid.material.displacementScale = 0.5;
      this.liquid.material.displacementBias = -0.35;
      // this.scene.add(this.liquid);
      this.liquid.scale.set(0.925, 0.925, 0.925);

      this.flaconGroup = new THREE.Group();
      this.flaconGroup.add(this.liquid);
      this.flaconGroup.add(this.flacon);
      this.flaconGroup.add(this.bouchon);

      this.flaconGroup.position.set(0, -2, 0);

      // INITIAL SIZE
      this.flaconGroup.scale.set(0, 0, 0);
      this.flaconGroup.scale.set(0, 0, 0);
      this.bouchon.scale.set(0, 0, 0);

      //DEBUG
      this.flaconFolder = this.gui.addFolder("Flacon");
      this.liquidFolder = this.gui.addFolder("Liquid");
      this.bouchonFolder = this.gui.addFolder("Bouchon");

      this.flaconFolder
        .add(glassMaterial, "metalness")
        .min(0)
        .max(1)
        .step(0.01)
        .name("flacon metalness");
      this.flaconFolder
        .add(glassMaterial, "roughness")
        .min(0)
        .max(1)
        .step(0.01)
        .name("flacon roughness");
      this.flaconFolder
        .add(this.flacon.material, "opacity")
        .min(0)
        .max(1)
        .step(0.01)
        .name("flacon opacity");

      this.liquidFolder
        .add(this.liquid.material, "opacity")
        .min(0)
        .max(1)
        .step(0.01)
        .name("liquide opacity");

      this.liquidFolder
        .addColor(this.debugParameters, "liquidColor")
        .onChange(() => {
          this.liquid.material.color.set(this.debugParameters.liquidColor);
        });

      this.bouchonFolder
        .add(metalMaterial, "metalness")
        .min(0)
        .max(1)
        .step(0.01)
        .name("bouchon metalness");
      this.bouchonFolder
        .add(metalMaterial, "roughness")
        .min(0)
        .max(1)
        .step(0.01)
        .name("bouchon roughness");
      this.bouchonFolder
        .add(metalMaterial, "aoMapIntensity")
        .min(0)
        .max(1)
        .step(0.01)
        .name("bouchon aoMapIntensity");

      this.gui
        .add(this.customUniforms.uProgress, "value")
        .min(0)
        .max(1)
        .step(0.001)
        .name("Shader Progress");
    });
  }

  setCamera() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      10
    );
    this.camera.position.y = 0.905;
    this.camera.position.z = 5;
    this.scene.add(this.camera);

    this.cameraFolder = this.gui.addFolder("Camera");
    this.cameraFolder
      .add(this.camera.position, "x")
      .min(-10)
      .max(10)
      .step(0.001)
      .name("camera x");
    this.cameraFolder
      .add(this.camera.position, "y")
      .min(-10)
      .max(10)
      .step(0.001)
      .name("camera y");
    this.cameraFolder
      .add(this.camera.position, "z")
      .min(-10)
      .max(10)
      .step(0.001)
      .name("camera z");
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
      .min(0)
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
      .min(0)
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
      .min(0)
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
    ee.on("fillFlacon", () => {
      this.fillFlacon();
    });

    ee.on("hideFlacon", () => {
      this.hideFlacon();
    });
  }

  setRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      canvas: this.webglCanvas,
      // powerPreference: "high-performance",
      antialias: true,
    });
    this.renderer.physicallyCorrectLights = true;
    //Load background texture
    const loader = new THREE.TextureLoader();
    // loader.load(
    //   "https://images.pexels.com/photos/1205301/pexels-photo-1205301.jpeg",
    //   function (texture) {
    //     this.scene.background = texture;
    //     texture.wrapS = THREE.MirroredRepeatWrapping;
    //     texture.wrapT = THREE.MirroredRepeatWrapping;
    //   }
    // );

    const bgTexture = loader.load(
      "/images/textures/bg-object.png/",
      function (texture) {
        var img = texture.image;
        // bgWidth = img.width;
        // bgHeight = img.height;
        // resize();
      }
    );
    this.scene.background = bgTexture;
    bgTexture.wrapS = THREE.MirroredRepeatWrapping;
    bgTexture.wrapT = THREE.MirroredRepeatWrapping;

    // this.renderer.outputEncoding = THREE.sRGBEncoding;
    // this.renderer.gammaFactor = 2.2;
    // this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    // this.renderer.toneMappingExposure = 1;
    // this.renderer.stencil = false;
    // this.renderer.preserveDrawingBuffer = false;
    // this.renderer.depth = false;

    // this.renderer.gammaOutput = true;
    // this.renderer.gammaFactor = 0.1;

    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  setPostProcess() {
    /**
     * Post processing
     */
    this.effectComposer = new EffectComposer(this.renderer);
    this.effectComposer.setSize(this.sizes.width, this.sizes.height);
    this.effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const renderPass = new RenderPass(this.scene, this.camera);
    this.effectComposer.addPass(renderPass);

    const unrealBloomPass = new UnrealBloomPass();
    this.effectComposer.addPass(unrealBloomPass);

    unrealBloomPass.strength = 0.3;
    unrealBloomPass.radius = 1;
    unrealBloomPass.threshold = 0.6;

    this.postBloom = this.gui.addFolder("Bloom");

    this.postBloom.add(unrealBloomPass, "enabled");
    this.postBloom.add(unrealBloomPass, "strength").min(0).max(2).step(0.001);
    this.postBloom.add(unrealBloomPass, "radius").min(0).max(2).step(0.001);
    this.postBloom.add(unrealBloomPass, "threshold").min(0).max(1).step(0.001);
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

      this.effectComposer.setSize(this.sizes.width, this.sizes.height);
    });
  }

  loop() {
    const elapsedTime = this.clock.getElapsedTime();
    // smokeMaterial.uniforms.uTime.value = elapsedTime;
    //   cylinderMaterial.uniforms.uMouse.value[0] = mouse.x;
    //   cylinderMaterial.uniforms.uMouse.value[1] = mouse.y;

    if (this.sphere) this.sphere.rotation.y = elapsedTime * 0.5;
    if (this.flaconGroup) this.flaconGroup.rotation.y = elapsedTime * 0.5;
    // sphere.rotation.z = Math.cos(elapsedTime);

    //Update material
    this.customUniforms.uTime.value = elapsedTime;

    // Update controls
    this.controls.update();

    // Render
    this.renderer.render(this.scene, this.camera);

    this.effectComposer.render();

    // Call tick again on the next frame
    requestAnimationFrame(this.loop.bind(this));
  }
}

// new ThreeScene();
