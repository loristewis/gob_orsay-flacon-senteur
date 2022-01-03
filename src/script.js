import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";

// import TexturePainter from "./TexturePainter";

import fragmentShader from "./shaders/fragment.glsl";
import vertexShader from "./shaders/vertex.glsl";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

/**
 * Texture
 */
// const textureLoader = new THREE.TextureLoader();
// const floorTexture = textureLoader.load("/textures/UV_Grid_Sm.jpg");

// Canvas
const webglCanvas = document.querySelector("canvas.webgl");

//2D Canvas
const drawCanvas = document.querySelector("canvas.draw-canvas");
drawCanvas.width = window.innerWidth;
drawCanvas.height = window.innerHeight;
const ctx = drawCanvas.getContext("2d");
const transformX = drawCanvas.width / 2 - 260
const transformY = drawCanvas.height / 2 - 260

const circlePath = `M270.11,0C120.93,0,0,120.93,0,270.11S120.93,540.22,270.11,540.22,540.22,419.29,540.22,270.11,419.29,0,270.11,0Zm.45,497.11c-125.36,0-227-101.63-227-227s101.64-227,227-227c125.37,0,227,101.63,227,227S395.93,497.11,270.56,497.11Z`;

const figure = new Path2D(circlePath);
// console.log(drawCanvas.width, drawCanvas.height);
// ctx.beginPath();
// ctx.arc(drawCanvas.width / 4, drawCanvas.height / 4, 100, 0, Math.PI * 2, true);
ctx.save();
ctx.strokeStyle = "red";
ctx.fillStyle = "green";
ctx.translate(transformX, transformY);
// ctx.translate(500, 500);
ctx.fill(figure);
console.log(ctx.getTransform());
ctx.restore();
ctx.clip(figure);


let coord = { x: 0, y: 0 };
let prevPos = {
  x: 0,
  y: 0,
};
let currentPos = {
  x: 0,
  y: 0,
};
let colorProgress = 0;
document.addEventListener("mousedown", start);
document.addEventListener("mouseup", stop);
// window.addEventListener("resize", resize);

// resize();

// function resize() {
//   ctx.canvas.width = window.innerWidth;
//   ctx.canvas.height = window.innerHeight;
// }
function reposition(event) {
  const { clientX, clientY } = event;
  console.log(clientX, transformX);
  coord.x = clientX - transformX;
  coord.y = clientY + transformY;
}
function start(event) {
  reposition(event);
  document.addEventListener("mousemove", draw);
}
function stop() {
  document.removeEventListener("mousemove", draw);
}

function draw(event) {
  let { clientX, clientY } = event;
  
  clientX = clientX - (drawCanvas.width / 2 - 260);
  clientY = clientY + (drawCanvas.height / 2 - 260)
  // console.log(clientX, clientY);
  console.log(coord.x, coord.y);
  if (ctx.isPointInPath(figure, coord.x, coord.y)) {
    console.log("true");
    // ctx.save();
    // ctx.translate(drawCanvas.width / 2 - 260, drawCanvas.height / 2 - 260);

    // console.log("dans la forme");
    // prevPos.x =
    //   Math.abs(prevPos.x - currentPos.x) > 50 ? currentPos.x : prevPos.x;
    // prevPos.y =
    //   Math.abs(prevPos.y - currentPos.y) > 50 ? currentPos.y : prevPos.y;

    if (Math.abs(prevPos.x - currentPos.x) > 50) {
      prevPos.x = currentPos.x;
      colorProgress++;
    } else if (Math.abs(prevPos.y - currentPos.y) > 50) {
      prevPos.y = currentPos.y;
      console.log(colorProgress);
      colorProgress++;
    }

    if (colorProgress > 30) {
      console.log("done");
    }

    currentPos.x = coord.x;
    currentPos.y = coord.y;

    ctx.beginPath();
    ctx.lineWidth = 75;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#ACD3ED";
    ctx.moveTo(coord.x, coord.y);
    reposition(event);

    ctx.lineTo(coord.x, coord.y);
    ctx.stroke();
    // ctx.restore();
  }
}

/**
 * Mouse
 */
const mouse = new THREE.Vector2();

const handleMouseMove = (e) => {
  getPoint(e);
  setPoint();
};
document.addEventListener("mousemove", handleMouseMove);

// Scene
const scene = new THREE.Scene();

/**
 * Draw points
 */

const plane = new THREE.Plane();
const planeNormal = new THREE.Vector3();
const raycaster = new THREE.Raycaster();
const point = new THREE.Vector3();
const pointArray = [];
let splineObject;

const getPoint = (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  point.x = mouse.x;
  point.y = mouse.y;
  planeNormal.copy(camera.position).normalize();
  plane.setFromNormalAndCoplanarPoint(planeNormal, scene.position);
  raycaster.setFromCamera(mouse, camera);
  raycaster.ray.intersectPlane(plane, point);

  //   pointArray.push(point);

  //   const curve = new THREE.SplineCurve(pointArray);
  //   console.log(pointArray);
  //   const interpolatedPoints = curve.getPoints(100);
  //   const geometry = new THREE.BufferGeometry().setFromPoints(interpolatedPoints);

  //   const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

  // Create the final object to add to the scene
  //   splineObject = new THREE.Line(geometry, material);
  //   scene.add(splineObject);
};

const setPoint = () => {
  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.09, 20, 16),
    new THREE.MeshBasicMaterial({
      color: "yellow",
    })
  );
  //   sphere.position.copy(pointArray[pointArray.length - 1]);
  sphere.position.copy(point);
  //   scene.add(sphere);
};

/**
 * Floor
 */
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshBasicMaterial({
    color: 0xeeeeee,
  })
);
floor.receiveShadow = true;
// floor.rotation.x = -Math.PI * 0.5;
scene.add(floor);

const cube = new THREE.Mesh(
  new THREE.BoxBufferGeometry(5, 5, 5),
  new THREE.MeshBasicMaterial({ color: "white" })
);
// scene.add(cube);

/**
 * Cylinder
 */
// const cylinderGeometry = new THREE.PlaneGeometry(5, 5);
// const cylinderMaterial = new THREE.ShaderMaterial({
//   fragmentShader: fragmentShader,
//   vertexShader: vertexShader,
//   uniforms: {
//     uTime: { value: 1.0 },
//     uMouse: { value: [mouse.x, mouse.y] },
//     uRatio: {
//       value: window.innerWidth / window.innerHeight,
//     },
//   },
// });

// const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
// scene.add(cylinder);

/**
 * Line
 */
// const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
// const points = [];
// points.push(new THREE.Vector3(-10, 0, 0));
// points.push(new THREE.Vector3(0, 10, 0));
// points.push(new THREE.Vector3(10, 0, 0));
// const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

// const line = new THREE.Line(lineGeometry, lineMaterial);

// scene.add(line);

/**
 * Lights
 */
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
// scene.add(ambientLight);

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

/**
 * Sizes
 */
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
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(0, 0, 5);
scene.add(camera);

/**
 * Axes Helper
 */
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

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

// new TexturePainter(renderer, camera, floor, floorTexture);
/**
 * Animate
 */
const clock = new THREE.Clock();
let previousTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  //   cylinderMaterial.uniforms.uTime.value = elapsedTime;
  //   cylinderMaterial.uniforms.uMouse.value[0] = mouse.x;
  //   cylinderMaterial.uniforms.uMouse.value[1] = mouse.y;

  // Update controls
  controls.update();

  //   painter.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
