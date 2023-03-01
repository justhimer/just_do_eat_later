import { calculateAngle } from "../do/do_utils.js";
import { exercises } from "../do/do_models.js";

const exName = document.URL.split("?")[1].replace("exName=", "");

// modes
let selectedVtuber = false;

// setup poses variables
const visT = 0.0001; // visibilityThreshold, larger than visT means visible

// 全直 : 150 ~ 180
// 半直 : 90 ~ 150
// 半屈 : 60 ~ 90
// 全屈 : 0 ~ 60
const jointStatusDescription = ["全直", "半直", "半屈", "全屈"];
// 高 : higher than hip
// 低 : lower than hip
// 左 : left of half screen
// 右 : right of half screen
const positionStatusDescription = ["高左", "高右", "低左", "低右"];

let status = {
  // can be set to index of statusDescription
  jointStatus: {
    leftShoulder: null,
    rightShoulder: null,
    leftElbow: null,
    rightElbow: null,
    leftHip: null,
    rightHip: null,
    leftKnee: null,
    rightKnee: null,
  },
  positionStatus: {
    nose: null,
    leftShoulder: null,
    rightShoulder: null,
    leftElbow: null,
    rightElbow: null,
    leftWrist: null,
    rightWrist: null,
    leftHip: null,
    rightHip: null,
    leftKnee: null,
    rightKnee: null,
    leftAnkle: null,
    rightAnkle: null,
  },
};

let milestone = 0;
let repes = 0; // repetition counter

/****************************/
/**** vtuber setup start ****/
/****************************/

let currentVrm;
let animateVRM;

if (selectedVtuber) {
  //Import Helper Functions from Kalidokit
  const remap = Kalidokit.Utils.remap;
  const clamp = Kalidokit.Utils.clamp;
  const lerp = Kalidokit.Vector.lerp;

  // renderer
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);

  // camera
  const orbitCamera = new THREE.PerspectiveCamera(
    35,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  orbitCamera.position.set(0.0, 1.4, 0.7);

  // controls
  const orbitControls = new THREE.OrbitControls(
    orbitCamera,
    renderer.domElement
  );
  orbitControls.screenSpacePanning = true;
  orbitControls.target.set(0.0, 1.4, 0.0);
  orbitControls.update();

  // scene
  const scene = new THREE.Scene();

  // light
  const light = new THREE.DirectionalLight(0xffffff);
  light.position.set(1.0, 1.0, 1.0).normalize();
  scene.add(light);

  // Main Render Loop
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    if (currentVrm) {
      // Update model to render physics
      currentVrm.update(clock.getDelta());
    }
    renderer.render(scene, orbitCamera);
  }
  animate();

  /* VRM CHARACTER SETUP */

  // Import Character VRM
  const loader = new THREE.GLTFLoader();
  loader.crossOrigin = "anonymous";
  // Import model from URL, add your own model here
  loader.load(
    "assets/do/29e07830-2317-4b15-a044-135e73c7f840_Ashtra.vrm",

    (gltf) => {
      THREE.VRMUtils.removeUnnecessaryJoints(gltf.scene);

      THREE.VRM.from(gltf).then((vrm) => {
        scene.add(vrm.scene);
        currentVrm = vrm;
        currentVrm.scene.rotation.y = Math.PI; // Rotate model 180deg to face camera
      });
    },

    (progress) =>
      console.log(
        "Loading model...",
        100.0 * (progress.loaded / progress.total),
        "%"
      ),

    (error) => console.error(error)
  );

  // Animate Rotation Helper function
  const rigRotation = (
    name,
    rotation = { x: 0, y: 0, z: 0 },
    dampener = 1,
    lerpAmount = 0.3
  ) => {
    if (!currentVrm) {
      return;
    }
    const Part = currentVrm.humanoid.getBoneNode(
      THREE.VRMSchema.HumanoidBoneName[name]
    );
    if (!Part) {
      return;
    }

    let euler = new THREE.Euler(
      rotation.x * dampener,
      rotation.y * dampener,
      rotation.z * dampener
    );
    let quaternion = new THREE.Quaternion().setFromEuler(euler);
    Part.quaternion.slerp(quaternion, lerpAmount); // interpolate
  };

  // Animate Position Helper Function
  const rigPosition = (
    name,
    position = { x: 0, y: 0, z: 0 },
    dampener = 1,
    lerpAmount = 0.3
  ) => {
    if (!currentVrm) {
      return;
    }
    const Part = currentVrm.humanoid.getBoneNode(
      THREE.VRMSchema.HumanoidBoneName[name]
    );
    if (!Part) {
      return;
    }
    let vector = new THREE.Vector3(
      position.x * dampener,
      position.y * dampener,
      position.z * dampener
    );
    Part.position.lerp(vector, lerpAmount); // interpolate
  };

  let oldLookTarget = new THREE.Euler();
  const rigFace = (riggedFace) => {
    if (!currentVrm) {
      return;
    }
    rigRotation("Neck", riggedFace.head, 0.7);

    // Blendshapes and Preset Name Schema
    const Blendshape = currentVrm.blendShapeProxy;
    const PresetName = THREE.VRMSchema.BlendShapePresetName;

    // Simple example without winking. Interpolate based on old blendshape, then stabilize blink with `Kalidokit` helper function.
    // for VRM, 1 is closed, 0 is open.
    riggedFace.eye.l = lerp(
      clamp(1 - riggedFace.eye.l, 0, 1),
      Blendshape.getValue(PresetName.Blink),
      0.5
    );
    riggedFace.eye.r = lerp(
      clamp(1 - riggedFace.eye.r, 0, 1),
      Blendshape.getValue(PresetName.Blink),
      0.5
    );
    riggedFace.eye = Kalidokit.Face.stabilizeBlink(
      riggedFace.eye,
      riggedFace.head.y
    );
    Blendshape.setValue(PresetName.Blink, riggedFace.eye.l);

    // Interpolate and set mouth blendshapes
    Blendshape.setValue(
      PresetName.I,
      lerp(riggedFace.mouth.shape.I, Blendshape.getValue(PresetName.I), 0.5)
    );
    Blendshape.setValue(
      PresetName.A,
      lerp(riggedFace.mouth.shape.A, Blendshape.getValue(PresetName.A), 0.5)
    );
    Blendshape.setValue(
      PresetName.E,
      lerp(riggedFace.mouth.shape.E, Blendshape.getValue(PresetName.E), 0.5)
    );
    Blendshape.setValue(
      PresetName.O,
      lerp(riggedFace.mouth.shape.O, Blendshape.getValue(PresetName.O), 0.5)
    );
    Blendshape.setValue(
      PresetName.U,
      lerp(riggedFace.mouth.shape.U, Blendshape.getValue(PresetName.U), 0.5)
    );

    //PUPILS
    //interpolate pupil and keep a copy of the value
    let lookTarget = new THREE.Euler(
      lerp(oldLookTarget.x, riggedFace.pupil.y, 0.4),
      lerp(oldLookTarget.y, riggedFace.pupil.x, 0.4),
      0,
      "XYZ"
    );
    oldLookTarget.copy(lookTarget);
    currentVrm.lookAt.applyer.lookAt(lookTarget);
  };

  /* VRM Character Animator */
  animateVRM = (vrm, results) => {
    if (!vrm) {
      return;
    }
    // Take the results from `Holistic` and animate character based on its Face, Pose, and Hand Keypoints.
    let riggedPose, riggedLeftHand, riggedRightHand, riggedFace;

    const faceLandmarks = results.faceLandmarks;
    // Pose 3D Landmarks are with respect to Hip distance in meters
    const pose3DLandmarks = results.ea;
    // Pose 2D landmarks are with respect to videoWidth and videoHeight
    const pose2DLandmarks = results.poseLandmarks;
    // Be careful, hand landmarks may be reversed
    const leftHandLandmarks = results.rightHandLandmarks;
    const rightHandLandmarks = results.leftHandLandmarks;

    // Animate Face
    if (faceLandmarks) {
      riggedFace = Kalidokit.Face.solve(faceLandmarks, {
        runtime: "mediapipe",
        video: videoElement,
      });
      rigFace(riggedFace);
    }

    // Animate Pose
    if (pose2DLandmarks && pose3DLandmarks) {
      riggedPose = Kalidokit.Pose.solve(pose3DLandmarks, pose2DLandmarks, {
        runtime: "mediapipe",
        video: videoElement,
      });
      rigRotation("Hips", riggedPose.Hips.rotation, 0.7);
      rigPosition(
        "Hips",
        {
          x: -riggedPose.Hips.position.x, // Reverse direction
          y: riggedPose.Hips.position.y + 1, // Add a bit of height
          z: -riggedPose.Hips.position.z, // Reverse direction
        },
        1,
        0.07
      );

      rigRotation("Chest", riggedPose.Spine, 0.25, 0.3);
      rigRotation("Spine", riggedPose.Spine, 0.45, 0.3);

      rigRotation("RightUpperArm", riggedPose.RightUpperArm, 1, 0.3);
      rigRotation("RightLowerArm", riggedPose.RightLowerArm, 1, 0.3);
      rigRotation("LeftUpperArm", riggedPose.LeftUpperArm, 1, 0.3);
      rigRotation("LeftLowerArm", riggedPose.LeftLowerArm, 1, 0.3);

      rigRotation("LeftUpperLeg", riggedPose.LeftUpperLeg, 1, 0.3);
      rigRotation("LeftLowerLeg", riggedPose.LeftLowerLeg, 1, 0.3);
      rigRotation("RightUpperLeg", riggedPose.RightUpperLeg, 1, 0.3);
      rigRotation("RightLowerLeg", riggedPose.RightLowerLeg, 1, 0.3);
    }

    // Animate Hands
    if (leftHandLandmarks) {
      riggedLeftHand = Kalidokit.Hand.solve(leftHandLandmarks, "Left");
      rigRotation("LeftHand", {
        // Combine pose rotation Z and hand rotation X Y
        z: riggedPose.LeftHand.z,
        y: riggedLeftHand.LeftWrist.y,
        x: riggedLeftHand.LeftWrist.x,
      });
      rigRotation("LeftRingProximal", riggedLeftHand.LeftRingProximal);
      rigRotation("LeftRingIntermediate", riggedLeftHand.LeftRingIntermediate);
      rigRotation("LeftRingDistal", riggedLeftHand.LeftRingDistal);
      rigRotation("LeftIndexProximal", riggedLeftHand.LeftIndexProximal);
      rigRotation(
        "LeftIndexIntermediate",
        riggedLeftHand.LeftIndexIntermediate
      );
      rigRotation("LeftIndexDistal", riggedLeftHand.LeftIndexDistal);
      rigRotation("LeftMiddleProximal", riggedLeftHand.LeftMiddleProximal);
      rigRotation(
        "LeftMiddleIntermediate",
        riggedLeftHand.LeftMiddleIntermediate
      );
      rigRotation("LeftMiddleDistal", riggedLeftHand.LeftMiddleDistal);
      rigRotation("LeftThumbProximal", riggedLeftHand.LeftThumbProximal);
      rigRotation(
        "LeftThumbIntermediate",
        riggedLeftHand.LeftThumbIntermediate
      );
      rigRotation("LeftThumbDistal", riggedLeftHand.LeftThumbDistal);
      rigRotation("LeftLittleProximal", riggedLeftHand.LeftLittleProximal);
      rigRotation(
        "LeftLittleIntermediate",
        riggedLeftHand.LeftLittleIntermediate
      );
      rigRotation("LeftLittleDistal", riggedLeftHand.LeftLittleDistal);
    }
    if (rightHandLandmarks) {
      riggedRightHand = Kalidokit.Hand.solve(rightHandLandmarks, "Right");
      rigRotation("RightHand", {
        // Combine Z axis from pose hand and X/Y axis from hand wrist rotation
        z: riggedPose.RightHand.z,
        y: riggedRightHand.RightWrist.y,
        x: riggedRightHand.RightWrist.x,
      });
      rigRotation("RightRingProximal", riggedRightHand.RightRingProximal);
      rigRotation(
        "RightRingIntermediate",
        riggedRightHand.RightRingIntermediate
      );
      rigRotation("RightRingDistal", riggedRightHand.RightRingDistal);
      rigRotation("RightIndexProximal", riggedRightHand.RightIndexProximal);
      rigRotation(
        "RightIndexIntermediate",
        riggedRightHand.RightIndexIntermediate
      );
      rigRotation("RightIndexDistal", riggedRightHand.RightIndexDistal);
      rigRotation("RightMiddleProximal", riggedRightHand.RightMiddleProximal);
      rigRotation(
        "RightMiddleIntermediate",
        riggedRightHand.RightMiddleIntermediate
      );
      rigRotation("RightMiddleDistal", riggedRightHand.RightMiddleDistal);
      rigRotation("RightThumbProximal", riggedRightHand.RightThumbProximal);
      rigRotation(
        "RightThumbIntermediate",
        riggedRightHand.RightThumbIntermediate
      );
      rigRotation("RightThumbDistal", riggedRightHand.RightThumbDistal);
      rigRotation("RightLittleProximal", riggedRightHand.RightLittleProximal);
      rigRotation(
        "RightLittleIntermediate",
        riggedRightHand.RightLittleIntermediate
      );
      rigRotation("RightLittleDistal", riggedRightHand.RightLittleDistal);
    }
  };
}

/****************************/
/***** vtuber setup end *****/
/****************************/

let videoElement = document.querySelector(".input_video"),
  guideCanvas = document.querySelector("canvas.guides");

/* draw canvas */
const drawResults = (results) => {
  if (!results.poseLandmarks) {
    return;
  }

  let canvasCtx = guideCanvas.getContext("2d");

  canvasCtx.save();
  canvasCtx.clearRect(0, 0, guideCanvas.width, guideCanvas.height);

  // Use `Mediapipe` drawing functions
  drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
    color: "#00cff7",
    lineWidth: 2,
  });
  drawLandmarks(canvasCtx, results.poseLandmarks, {
    color: "#ff0364",
    lineWidth: 1,
  });

  // set font for text
  canvasCtx.font = "1.2rem Arial";
  canvasCtx.fillStyle = "#ffffff";

  // get all landmarks
  const landmarks = results.poseLandmarks;

  // get normalized coordinates
  const coors = {
    // nose
    nose:
      landmarks[0].visibility > visT ? [landmarks[0].x, landmarks[0].y] : null,

    // shoulder
    leftShoulder:
      landmarks[11].visibility > visT
        ? [landmarks[11].x, landmarks[11].y]
        : null,
    rightShoulder:
      landmarks[12].visibility > visT
        ? [landmarks[12].x, landmarks[12].y]
        : null,

    // elbow
    leftElbow:
      landmarks[13].visibility > visT
        ? [landmarks[13].x, landmarks[13].y]
        : null,
    rightElbow:
      landmarks[14].visibility > visT
        ? [landmarks[14].x, landmarks[14].y]
        : null,

    // wrist
    leftWrist:
      landmarks[15].visibility > visT
        ? [landmarks[15].x, landmarks[15].y]
        : null,
    rightWrist:
      landmarks[16].visibility > visT
        ? [landmarks[16].x, landmarks[16].y]
        : null,

    // hip
    leftHip:
      landmarks[23].visibility > visT
        ? [landmarks[23].x, landmarks[23].y]
        : null,
    rightHip:
      landmarks[24].visibility > visT
        ? [landmarks[24].x, landmarks[24].y]
        : null,

    // knee
    leftKnee:
      landmarks[25].visibility > visT
        ? [landmarks[25].x, landmarks[25].y]
        : null,
    rightKnee:
      landmarks[26].visibility > visT
        ? [landmarks[26].x, landmarks[26].y]
        : null,

    // ankle
    leftAnkle:
      landmarks[27].visibility > visT
        ? [landmarks[27].x, landmarks[27].y]
        : null,
    rightAnkle:
      landmarks[28].visibility > visT
        ? [landmarks[28].x, landmarks[28].y]
        : null,
  };

  // calculate angles
  const angles = {
    // left
    leftShoulder: calculateAngle(
      coors.leftHip,
      coors.leftShoulder,
      coors.leftElbow
    ),
    leftElbow: calculateAngle(
      coors.leftShoulder,
      coors.leftElbow,
      coors.leftWrist
    ),
    leftHip: calculateAngle(coors.leftShoulder, coors.leftHip, coors.leftKnee),
    leftKnee: calculateAngle(coors.leftHip, coors.leftKnee, coors.leftAnkle),
    // right
    rightShoulder: calculateAngle(
      coors.rightHip,
      coors.rightShoulder,
      coors.rightElbow
    ),
    rightElbow: calculateAngle(
      coors.rightShoulder,
      coors.rightElbow,
      coors.rightWrist
    ),
    rightHip: calculateAngle(
      coors.rightShoulder,
      coors.rightHip,
      coors.rightKnee
    ),
    rightKnee: calculateAngle(
      coors.rightHip,
      coors.rightKnee,
      coors.rightAnkle
    ),
  };

  // set joint status
  for (let key in angles) {
    if (angles[key] === null) {
      continue;
    }
    if (angles[key] > 150) {
      status.jointStatus[key] = 0; // straight
    } else if (angles[key] < 150 && angles[key] > 90) {
      status.jointStatus[key] = 1; // half-stright
    } else if (angles[key] < 90 && angles[key] > 60) {
      status.jointStatus[key] = 2; // half-bent
    } else if (angles[key] < 60) {
      status.jointStatus[key] = 3; // full-bent
    }
  }

  // set position status
  for (let key in coors) {
    if (coors[key] === null ||
        coors.leftHip === null ||
        coors.rightHip === null) {
      continue;
    }
    if (coors[key][1] < coors.leftHip[1] || coors[key][1] < coors.rightHip[1]) {
      if (coors[key][0] > 0.5) {
        status.positionStatus[key] = 0; // 高左
      } else if (coors[key][0] <= 0.5) {
        status.positionStatus[key] = 1; // 高右
      }
    } else {
      if (coors[key][0] > 0.5) {
        status.positionStatus[key] = 2; // 低左
      } else if (coors[key][0] <= 0.5) {
        status.positionStatus[key] = 3; // 低右
      }
    }
  }

  // visualize joint status
  for (let key in angles) {
    if (angles[key] === null) {
      continue;
    }
    canvasCtx.fillText(
      //   `${angles[key].toFixed(1)} ${jointStatusDescription[status.jointStatus[key]]}`,
      `(${jointStatusDescription[status.jointStatus[key]]})`,
      coors[key][0] * guideCanvas.width,
      coors[key][1] * guideCanvas.height - 10
    );
  }

  // visualize position status
  for (let key in coors) {
    if (coors[key] === null) {
      continue;
    }
    canvasCtx.fillText(
      `(${positionStatusDescription[status.positionStatus[key]]})`,
      coors[key][0] * guideCanvas.width - 40,
      coors[key][1] * guideCanvas.height - 10
    );
  }

  // fuzzy logic for exercise
  if (milestone === exercises[exName].length) {
    repes++;
    milestone = 0; // init milstone
  }
  let clear = true;
  for (let statusKey in exercises[exName][milestone]) {
    for (let bodyPart in exercises[exName][milestone][statusKey]) {
      let checkEither = false;
      for (let option of exercises[exName][milestone][statusKey][bodyPart]) {
        if (status[statusKey][bodyPart] === option) {
          checkEither = true;
          break;
        }
      }
      if (!checkEither) {
        clear = false;
        break;
      }
    }
  }
  if (clear) {
    milestone++;
  }

  // visualize counter
  canvasCtx.font = "2rem Arial";
  canvasCtx.fillStyle = "#ffffff";
  canvasCtx.fillText(
    `動作: ${exName}
    milestone: ${milestone}
    完成次數: ${repes}`,
    10,
    30
    // canvasElement.width * 2/5,
    // canvasElement.height / 2
  );
  canvasCtx.font = "20rem Arial";
  canvasCtx.fillText(
    `${repes}`,
    guideCanvas.width / 2 - 60,
    guideCanvas.height / 2
  );
};

/* SETUP MEDIAPIPE HOLISTIC INSTANCE */
const holistic = new Holistic({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic@0.5.1635989137/${file}`;
  },
});

holistic.setOptions({
  modelComplexity: 1,
  smoothLandmarks: true,
  minDetectionConfidence: 0.7,
  minTrackingConfidence: 0.7,
  refineFaceLandmarks: true,
});

const onResults = (results) => {
  // Draw landmark guides
  drawResults(results);

  // Animate model
  if (selectedVtuber) {
    animateVRM(currentVrm, results);
  }
};

// Pass holistic a callback function
holistic.onResults(onResults);

videoElement.src = "./assets/exercises/videos/lunges-2.mp4";
console.log(videoElement.src);
videoElement.onloadeddata = (evt) => {
  let video = evt.target;

  guideCanvas.width = video.videoWidth;
  guideCanvas.height = video.videoHeight;

  videoElement.play();
  onFrame();
};

async function onFrame() {
  if (!videoElement.paused && !videoElement.ended) {
    await holistic.send({
      image: videoElement,
    });
    await new Promise(requestAnimationFrame);
    onFrame();
  } else setTimeout(onFrame, 500);
}

// // Use `Mediapipe` utils to get camera - lower resolution = higher fps
// const camera = new Camera(videoElement, {
//   onFrame: async () => {
//     await holistic.send({ image: videoElement });
//   },
//   width: 960,
//   height: 1280,
// });
// camera.start();

// // for video
// video.requestVideoFrameCallback(async()=>{
//     await holistic.send({ image: video });
// });

// 1280x960, 960x720, 800x600, 640x480, 480x360
