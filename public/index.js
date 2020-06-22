import * as SceneSetup from "./scene.js";
import { loadVideo } from "./camera.js";
import { createTrackers } from "./tracker.js";
import * as LandingPage from "./landing.js";

let container, scene, camera, renderer;
let video;
let networkTrackers = [];
let width = window.innerWidth;
let height = window.innerHeight;
const socket = io();
const div = document.getElementById("landing-page");

async function init() {
  container = document.querySelector("#scene-container");
  scene = new THREE.Scene();

  try {
    video = await loadVideo(width, height);
  } catch (e) {
    throw e;
  }

  LandingPage.createTextElements(div);
  const button = LandingPage.createButton(div);

  const net = await posenet.load({
    architecture: "MobileNetV1",
    outputStride: 16,
    multiplier: 0.75
  });

  LandingPage.updateButton(button, div);

  camera = SceneSetup.createCamera(width, height); // create camera
  SceneSetup.createAmbientLight(scene); // create ambient light
  SceneSetup.createPointLights(scene); // create point light

  const userColour = 0x34ebdc; // turquoise
  const userTrackers = createTrackers(userColour); // tracker object containing keypoint trackers and their three.js Group container
  scene.add(userTrackers.group); // add group of user trackers to three.js scene

  renderer = SceneSetup.createRenderer(container, width, height); // create renderer

  socket.on("networkPose", data => {
    const networkColour = 0x797979; // grey, shows up pink due to pink point light
    networkTrackers.push(createTrackers(networkColour));
 
    for (let i = 0; i < networkTrackers.length; i++) {
      scene.add(networkTrackers[i].group); // add group of network trackers to three.js scene
      draw(data, networkTrackers[i].trackers, 0); // draw network keypoint trackers behind user trackers
    }
  });

  renderer.setAnimationLoop(() => {
    detect(video, net) // wait to detect pose
      .then(pose => {
        // when pose detected
        socket.emit("pose", pose); // send to server
        draw(pose, userTrackers.trackers, 50); // draw user keypoint trackers in foreground
      })
      .catch(err => console.error(err));

    renderer.render(scene, camera); // render scene
  });

  window.addEventListener("resize", onWindowResize);
}

async function detect(video, net) {
  const pose = await net.estimateSinglePose(video, {
    flipHorizontal: true // make sure video is flipped the right way
  });
  return pose;
}

function draw(pose, trackers, depth) {
  if (pose !== undefined && trackers !== undefined && depth !== undefined) {
    let poses = [];
    poses.push(pose);

    const minPoseConfidence = 0.1;
    const minPartConfidence = 0.3;

    poses.forEach(({ score, keypoints }) => {
      if (score >= minPoseConfidence) {
        keypoints.forEach((d, i) => {
          if (d.score > minPartConfidence) {
            // may be worth normalising this position data if time permits
            trackers[i].update(
              d.position.x * 0.5 - width / 4, // update x position
              d.position.y * 0.5 - height / 4, // update y position
              depth // update x position
            );
            trackers[i].display();
          } else if (d.score < minPartConfidence) {
            trackers[i].update(-10000, -10000, 0); // move out of screen if body part not detected
            trackers[i].display();
          }
        });
      }
    });
  }
  if (pose === undefined) {
    console.error("You must specify the pose to draw");
  }
  if (trackers === undefined) {
    console.error("draw() requires an array of tracker objects to excecute");
  }
  if (depth === undefined) {
    console.warn(
      "You should specify the depth to render the tracker objects to avoid overlap. It has been defaulted to 0. The orthographic camera projection means an object's size in the rendered image stays constant regardless of its distance from the camera."
    );
    depth = 0;
  }
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

init();
