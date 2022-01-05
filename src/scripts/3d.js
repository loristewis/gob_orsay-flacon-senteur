import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import * as dat from "lil-gui";
import gsap from "gsap";

import ee from "./utils/eventsSetUp";

import fragmentShader from "../shaders/fragment.glsl";
import vertexShader from "../shaders/vertex.glsl";

/**
 * Base
 */
// Debug
// const gui = new dat.GUI();

/**
 * Texture
 */
const textureLoader = new THREE.TextureLoader();

const smokeTexture = textureLoader.load("/images/textures/smoke2.png", () => {
  // const smokeParticles = [];
  // for (let p = 0; p < 50; p++) {
  //   let smoke = new THREE.Mesh(smokeGeo, smokeMaterial);
  //   smoke.position.set(
  //     Math.random() * (800 / 8) - 400 / 8,
  //     500 / 8,
  //     Math.random() * (500 / 8) - 500 / 8
  //   );
  //   // smoke.rotation.x = 1.16;
  //   // smoke.rotation.y = -0.12;
  //   smoke.rotation.z = Math.random() * 2 * Math.PI;
  //   smoke.material.opacity = 0.55;
  //   smokeParticles.push(smoke);
  //   scene.add(smoke);
  // }
});

// Canvas
const webglCanvas = document.querySelector("canvas.webgl");

/**
 * Mouse
 */
// const mouse = new THREE.Vector2();

// const handleMouseMove = (e) => {
//   getPoint(e);
//   setPoint();
// };
// document.addEventListener("mousemove", handleMouseMove);

// Scene
const scene = new THREE.Scene();

/**
 * Draw points
 */

// // const plane = new THREE.Plane();
// // const planeNormal = new THREE.Vector3();
// // const raycaster = new THREE.Raycaster();
// // const point = new THREE.Vector3();
// // const pointArray = [];
// // let splineObject;

// // const getPoint = (e) => {
// //   mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
// //   mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
// //   point.x = mouse.x;
// //   point.y = mouse.y;
// //   planeNormal.copy(camera.position).normalize();
// //   plane.setFromNormalAndCoplanarPoint(planeNormal, scene.position);
// //   raycaster.setFromCamera(mouse, camera);
// //   raycaster.ray.intersectPlane(plane, point);

// //   //   pointArray.push(point);

// //   //   const curve = new THREE.SplineCurve(pointArray);
// //   //   console.log(pointArray);
// //   //   const interpolatedPoints = curve.getPoints(100);
// //   //   const geometry = new THREE.BufferGeometry().setFromPoints(interpolatedPoints);

// //   //   const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

// //   // Create the final object to add to the scene
// //   //   splineObject = new THREE.Line(geometry, material);
// //   //   scene.add(splineObject);
// // };

// // const setPoint = () => {
// //   const sphere = new THREE.Mesh(
// //     new THREE.SphereGeometry(0.09, 20, 16),
// //     new THREE.MeshBasicMaterial({
// //       color: "yellow",
// //     })
// //   );
// //   //   sphere.position.copy(pointArray[pointArray.length - 1]);
// //   sphere.position.copy(point);
// //   //   scene.add(sphere);
// // };

// /**
//  * Floor
//  */
// const floor = new THREE.Mesh(
//   new THREE.PlaneGeometry(10, 10),
//   new THREE.MeshBasicMaterial({
//     color: 0xeeeeee,
//   })
// );
// floor.receiveShadow = true;
// // floor.rotation.x = -Math.PI * 0.5;
// // scene.add(floor);

/**
 * Sphere
 */
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(1, 20, 20),
  new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true,
  })
);
sphere.scale.set(0, 0, 0);
sphere.position.z = -5;
scene.add(sphere);

ee.on("drawingCompleted", () => {
  gsap.to(sphere.scale, {
    x: 1.2,
    y: 1.2,
    z: 1.2,
    duration: 1,
    ease: "power4",
  });
});

/**
 * Smoke
 */
const smokeGeo = new THREE.PlaneBufferGeometry(10, 10);
const smokeMaterial = new THREE.ShaderMaterial({
  fragmentShader,
  vertexShader,
  uniforms: {
    uTime: { value: 0 },
    uTexture: { value: smokeTexture },
  },
});
const smoke = new THREE.Mesh(smokeGeo, smokeMaterial);
smoke.position.set(5, -4, 0);
smoke.rotation.y = -0.5;
// scene.add(smoke);
// console.log(smokeMaterial);
/**
 * Fog
 */
scene.fog = new THREE.FogExp2(0x1d272e, 0.001);

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
// directionalLight.castShadow = true;
// directionalLight.shadow.mapSize.set(1024, 1024);
// directionalLight.shadow.camera.far = 15;
// directionalLight.shadow.camera.left = -7;
// directionalLight.shadow.camera.top = 7;
// directionalLight.shadow.camera.right = 7;
// directionalLight.shadow.camera.bottom = -7;
// directionalLight.position.set(5, 5, 5);
// scene.add(directionalLight);

// /**
//  * Sizes
//  */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
// const camera = new THREE.PerspectiveCamera(
//   75,
//   sizes.width / sizes.height,
//   0.1,
//   100
// );
// camera.position.set(0, 0, 5);
// scene.add(camera);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;
// camera.rotation.x = 1.16;
// camera.rotation.y = -0.12;
// camera.rotation.z = 0.27;
scene.add(camera);

/**
 * Axes Helper
 */
// const axesHelper = new THREE.AxesHelper(2);
// scene.add(axesHelper);

// Controls
const controls = new OrbitControls(camera, webglCanvas);
// controls.target.set(0, 0.75, 0);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: webglCanvas,
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(scene.fog.color);

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  smokeMaterial.uniforms.uTime.value = elapsedTime;
  //   cylinderMaterial.uniforms.uMouse.value[0] = mouse.x;
  //   cylinderMaterial.uniforms.uMouse.value[1] = mouse.y;

  sphere.rotation.y = elapsedTime * 0.5;
  // sphere.rotation.z = Math.cos(elapsedTime);

  // Update controls
  controls.update();

  //   painter.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
