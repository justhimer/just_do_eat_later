import { calculateAngle } from "./do_utils.js";
import { swingArm } from "./do_models.js";


// let videoElement = document.querySelector(".input_video"),
//     guideCanvas = document.querySelector('canvas.guides');

// guideCanvas.width = videoElement.videoWidth;
// guideCanvas.height = videoElement.videoHeight;
// let canvasCtx = guideCanvas.getContext('2d');

// setup poses variables
const visT = 0.0001; // visibilityThreshold, larger than visT means visible
const jointStatusDescription = ["全直", "半直", "半屈", "全屈"];
let jointStatus = {
// can be set to index of jointStatusDescription
leftShoulder: null, leftElbow: null, leftHip: null, leftKnee: null,
rightShoulder: null, rightElbow: null, rightHip: null, rightKnee: null,
};
let milestone = 0;
let reachHalf = false;
let repes = 0;  // repetition counter


//Import Helper Functions from Kalidokit
const remap = Kalidokit.Utils.remap;
const clamp = Kalidokit.Utils.clamp;
const lerp = Kalidokit.Vector.lerp;

/* THREEJS WORLD SETUP */
let currentVrm;

// renderer
const renderer = new THREE.WebGLRenderer({alpha:true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// camera
const orbitCamera = new THREE.PerspectiveCamera(35,window.innerWidth / window.innerHeight,0.1,1000);
orbitCamera.position.set(0.0, 1.4, 0.7);

// controls
const orbitControls = new THREE.OrbitControls(orbitCamera, renderer.domElement);
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

    gltf => {
    THREE.VRMUtils.removeUnnecessaryJoints(gltf.scene);

    THREE.VRM.from(gltf).then(vrm => {
        scene.add(vrm.scene);
        currentVrm = vrm;
        currentVrm.scene.rotation.y = Math.PI; // Rotate model 180deg to face camera
    });
    },

    progress =>
    console.log(
        "Loading model...",
        100.0 * (progress.loaded / progress.total),
        "%"
    ),

    error => console.error(error)
);

// Animate Rotation Helper function
const rigRotation = (
  name,
  rotation = { x: 0, y: 0, z: 0 },
  dampener = 1,
  lerpAmount = 0.3
) => {
  if (!currentVrm) {return}
  const Part = currentVrm.humanoid.getBoneNode(
    THREE.VRMSchema.HumanoidBoneName[name]
  );
  if (!Part) {return}
  
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
  if (!currentVrm) {return}
  const Part = currentVrm.humanoid.getBoneNode(
    THREE.VRMSchema.HumanoidBoneName[name]
  );
  if (!Part) {return}
  let vector = new THREE.Vector3(
    position.x * dampener,
    position.y * dampener,
    position.z * dampener
  );
  Part.position.lerp(vector, lerpAmount); // interpolate
};

let oldLookTarget = new THREE.Euler()
const rigFace = (riggedFace) => {
    if(!currentVrm){return}
    rigRotation("Neck", riggedFace.head, 0.7);

    // Blendshapes and Preset Name Schema
    const Blendshape = currentVrm.blendShapeProxy;
    const PresetName = THREE.VRMSchema.BlendShapePresetName;
  
    // Simple example without winking. Interpolate based on old blendshape, then stabilize blink with `Kalidokit` helper function.
    // for VRM, 1 is closed, 0 is open.
    riggedFace.eye.l = lerp(clamp(1 - riggedFace.eye.l, 0, 1),Blendshape.getValue(PresetName.Blink), .5)
    riggedFace.eye.r = lerp(clamp(1 - riggedFace.eye.r, 0, 1),Blendshape.getValue(PresetName.Blink), .5)
    riggedFace.eye = Kalidokit.Face.stabilizeBlink(riggedFace.eye,riggedFace.head.y)
    Blendshape.setValue(PresetName.Blink, riggedFace.eye.l);
    
    // Interpolate and set mouth blendshapes
    Blendshape.setValue(PresetName.I, lerp(riggedFace.mouth.shape.I,Blendshape.getValue(PresetName.I), .5));
    Blendshape.setValue(PresetName.A, lerp(riggedFace.mouth.shape.A,Blendshape.getValue(PresetName.A), .5));
    Blendshape.setValue(PresetName.E, lerp(riggedFace.mouth.shape.E,Blendshape.getValue(PresetName.E), .5));
    Blendshape.setValue(PresetName.O, lerp(riggedFace.mouth.shape.O,Blendshape.getValue(PresetName.O), .5));
    Blendshape.setValue(PresetName.U, lerp(riggedFace.mouth.shape.U,Blendshape.getValue(PresetName.U), .5));

    //PUPILS
    //interpolate pupil and keep a copy of the value
    let lookTarget =
      new THREE.Euler(
        lerp(oldLookTarget.x , riggedFace.pupil.y, .4),
        lerp(oldLookTarget.y, riggedFace.pupil.x, .4),
        0,
        "XYZ"
      )
    oldLookTarget.copy(lookTarget)
    currentVrm.lookAt.applyer.lookAt(lookTarget);
}

/* VRM Character Animator */
const animateVRM = (vrm, results) => {
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
   riggedFace = Kalidokit.Face.solve(faceLandmarks,{
      runtime:"mediapipe",
      video:videoElement
   });
   rigFace(riggedFace)
  }

  // Animate Pose
  if (pose2DLandmarks && pose3DLandmarks) {
    riggedPose = Kalidokit.Pose.solve(pose3DLandmarks, pose2DLandmarks, {
      runtime: "mediapipe",
      video:videoElement,
    });
    rigRotation("Hips", riggedPose.Hips.rotation, 0.7);
    rigPosition(
      "Hips",
      {
        x: -riggedPose.Hips.position.x, // Reverse direction
        y: riggedPose.Hips.position.y + 1, // Add a bit of height
        z: -riggedPose.Hips.position.z // Reverse direction
      },
      1,
      0.07
    );

    rigRotation("Chest", riggedPose.Spine, 0.25, .3);
    rigRotation("Spine", riggedPose.Spine, 0.45, .3);

    rigRotation("RightUpperArm", riggedPose.RightUpperArm, 1, .3);
    rigRotation("RightLowerArm", riggedPose.RightLowerArm, 1, .3);
    rigRotation("LeftUpperArm", riggedPose.LeftUpperArm, 1, .3);
    rigRotation("LeftLowerArm", riggedPose.LeftLowerArm, 1, .3);

    rigRotation("LeftUpperLeg", riggedPose.LeftUpperLeg, 1, .3);
    rigRotation("LeftLowerLeg", riggedPose.LeftLowerLeg, 1, .3);
    rigRotation("RightUpperLeg", riggedPose.RightUpperLeg, 1, .3);
    rigRotation("RightLowerLeg", riggedPose.RightLowerLeg, 1, .3);
  }

  // Animate Hands
  if (leftHandLandmarks) {
    riggedLeftHand = Kalidokit.Hand.solve(leftHandLandmarks, "Left");
    rigRotation("LeftHand", {
      // Combine pose rotation Z and hand rotation X Y
      z: riggedPose.LeftHand.z,
      y: riggedLeftHand.LeftWrist.y,
      x: riggedLeftHand.LeftWrist.x
    });
    rigRotation("LeftRingProximal", riggedLeftHand.LeftRingProximal);
    rigRotation("LeftRingIntermediate", riggedLeftHand.LeftRingIntermediate);
    rigRotation("LeftRingDistal", riggedLeftHand.LeftRingDistal);
    rigRotation("LeftIndexProximal", riggedLeftHand.LeftIndexProximal);
    rigRotation("LeftIndexIntermediate", riggedLeftHand.LeftIndexIntermediate);
    rigRotation("LeftIndexDistal", riggedLeftHand.LeftIndexDistal);
    rigRotation("LeftMiddleProximal", riggedLeftHand.LeftMiddleProximal);
    rigRotation("LeftMiddleIntermediate", riggedLeftHand.LeftMiddleIntermediate);
    rigRotation("LeftMiddleDistal", riggedLeftHand.LeftMiddleDistal);
    rigRotation("LeftThumbProximal", riggedLeftHand.LeftThumbProximal);
    rigRotation("LeftThumbIntermediate", riggedLeftHand.LeftThumbIntermediate);
    rigRotation("LeftThumbDistal", riggedLeftHand.LeftThumbDistal);
    rigRotation("LeftLittleProximal", riggedLeftHand.LeftLittleProximal);
    rigRotation("LeftLittleIntermediate", riggedLeftHand.LeftLittleIntermediate);
    rigRotation("LeftLittleDistal", riggedLeftHand.LeftLittleDistal);
  }
  if (rightHandLandmarks) {
    riggedRightHand = Kalidokit.Hand.solve(rightHandLandmarks, "Right");
    rigRotation("RightHand", {
      // Combine Z axis from pose hand and X/Y axis from hand wrist rotation
      z: riggedPose.RightHand.z,
      y: riggedRightHand.RightWrist.y,
      x: riggedRightHand.RightWrist.x
    });
    rigRotation("RightRingProximal", riggedRightHand.RightRingProximal);
    rigRotation("RightRingIntermediate", riggedRightHand.RightRingIntermediate);
    rigRotation("RightRingDistal", riggedRightHand.RightRingDistal);
    rigRotation("RightIndexProximal", riggedRightHand.RightIndexProximal);
    rigRotation("RightIndexIntermediate",riggedRightHand.RightIndexIntermediate);
    rigRotation("RightIndexDistal", riggedRightHand.RightIndexDistal);
    rigRotation("RightMiddleProximal", riggedRightHand.RightMiddleProximal);
    rigRotation("RightMiddleIntermediate", riggedRightHand.RightMiddleIntermediate);
    rigRotation("RightMiddleDistal", riggedRightHand.RightMiddleDistal);
    rigRotation("RightThumbProximal", riggedRightHand.RightThumbProximal);
    rigRotation("RightThumbIntermediate", riggedRightHand.RightThumbIntermediate);
    rigRotation("RightThumbDistal", riggedRightHand.RightThumbDistal);
    rigRotation("RightLittleProximal", riggedRightHand.RightLittleProximal);
    rigRotation("RightLittleIntermediate", riggedRightHand.RightLittleIntermediate);
    rigRotation("RightLittleDistal", riggedRightHand.RightLittleDistal);
  }
  
};

let videoElement = document.querySelector(".input_video"),
    guideCanvas = document.querySelector('canvas.guides');

/* draw canvas */
const drawResults = (results) => {

    if (!results.poseLandmarks) {
        return;
    }

    guideCanvas.width = videoElement.videoWidth;
    guideCanvas.height = videoElement.videoHeight;
    let canvasCtx = guideCanvas.getContext('2d');

    canvasCtx.save();
    canvasCtx.clearRect(0, 0, guideCanvas.width, guideCanvas.height);

    // Use `Mediapipe` drawing functions
    drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
        color: "#00cff7",
        lineWidth: 2
    });
    drawLandmarks(canvasCtx, results.poseLandmarks, {
        color: "#ff0364",
        lineWidth: 1
    });

    // set font for text
    canvasCtx.font = "18px Arial";
    canvasCtx.fillStyle = "#ffffff";

    // Flip the canvas horizontally
    canvasCtx.scale(-1, 1);
    canvasCtx.translate(-guideCanvas.width, 0);

    // get all landmarks
    const mirroredLandmarks = results.poseLandmarks.map((landmark) => {
        return { x: 1 - landmark.x, y: landmark.y, z: landmark.z, visibility: landmark.visibility };
    });

    // draw landmarks and connectors
    canvasCtx.globalCompositeOperation = "source-over";
    drawConnectors(canvasCtx, mirroredLandmarks, POSE_CONNECTIONS, {
        color: "#FFFF00",
        lineWidth: 4,
    });
    drawLandmarks(canvasCtx, mirroredLandmarks, {
        color: "#00FF00",
        lineWidth: 2,
    });

    // get normalized coordinates
    const coors = {
        // left
        leftShoulder: mirroredLandmarks[11].visibility > visT ? [mirroredLandmarks[11].x, mirroredLandmarks[11].y] : null,
        leftElbow: mirroredLandmarks[13].visibility > visT ? [mirroredLandmarks[13].x, mirroredLandmarks[13].y] : null,
        leftWrist: mirroredLandmarks[15].visibility > visT ? [mirroredLandmarks[15].x, mirroredLandmarks[15].y] : null,
        leftHip: mirroredLandmarks[23].visibility > visT ? [mirroredLandmarks[23].x, mirroredLandmarks[23].y] : null,
        leftKnee: mirroredLandmarks[25].visibility > visT ? [mirroredLandmarks[25].x, mirroredLandmarks[25].y] : null,
        leftAnkle: mirroredLandmarks[27].visibility > visT ? [mirroredLandmarks[27].x, mirroredLandmarks[27].y] : null,
        // right
        rightShoulder: mirroredLandmarks[12].visibility > visT ? [mirroredLandmarks[12].x, mirroredLandmarks[12].y] : null,
        rightElbow: mirroredLandmarks[14].visibility > visT ? [mirroredLandmarks[14].x, mirroredLandmarks[14].y] : null,
        rightWrist: mirroredLandmarks[16].visibility > visT ? [mirroredLandmarks[16].x, mirroredLandmarks[16].y] : null,
        rightHip: mirroredLandmarks[24].visibility > visT ? [mirroredLandmarks[24].x, mirroredLandmarks[24].y] : null,
        rightKnee: mirroredLandmarks[26].visibility > visT ? [mirroredLandmarks[26].x, mirroredLandmarks[26].y] : null,
        rightAnkle: mirroredLandmarks[28].visibility > visT ? [mirroredLandmarks[28].x, mirroredLandmarks[28].y] : null,
    };

    // calculate angles
    const angles = {
        // left
        leftShoulder: calculateAngle(coors.leftHip, coors.leftShoulder,coors.leftElbow),
        leftElbow: calculateAngle(coors.leftShoulder, coors.leftElbow, coors.leftWrist),
        leftHip: calculateAngle(coors.leftShoulder, coors.leftHip,coors.leftKnee),
        leftKnee: calculateAngle(coors.leftHip,coors.leftKnee, coors.leftAnkle),
        // right
        rightShoulder: calculateAngle(coors.rightHip, coors.rightShoulder,coors.rightElbow),
        rightElbow: calculateAngle(coors.rightShoulder, coors.rightElbow, coors.rightWrist),
        rightHip: calculateAngle(coors.rightShoulder, coors.rightHip,coors.rightKnee),
        rightKnee: calculateAngle(coors.rightHip,coors.rightKnee, coors.rightAnkle),
    };

    // fuzzy logic for joints
    for (let key in angles) {
        if (angles[key] === null) { continue }
        if (angles[key] > 150) {
        jointStatus[key] = 0; // straight
        } else if (angles[key] < 150 && angles[key] > 90) {
        jointStatus[key] = 1; // half-stright
        } else if (angles[key] < 90 && angles[key] > 60) {
        jointStatus[key] = 2; // half-bent
        } else if (angles[key] < 60) {
        jointStatus[key] = 3; // full-bent
        }
    }

    // visualize angle
    for (let key in angles) {
        if (angles[key] === null) { continue }
        canvasCtx.fillText(
        `${angles[key].toFixed(1)} ${jointStatusDescription[jointStatus[key]]}`,
        coors[key][0] * guideCanvas.width,
        coors[key][1] * guideCanvas.height - 10
        );
    }

    // fuzzy logic for exercise
    if ( milestone === -1 ) {  // milestone = -1 means one repetition is completed
        repes++;
        milestone = 0;  // init milstone
        reachHalf = false;  // init reachHalf
    }
    if ( milestone === swingArm.length - 1 ) {
        reachHalf = true;
    }

    let clear = true;
    for (let key in swingArm[milestone]) {
        if (jointStatus[key] !== swingArm[milestone][key]) {
        clear = false;
        }
    }
    if ( clear & !reachHalf ) { milestone++ }
    else if ( clear & reachHalf ) { milestone-- }

    // visualize counter
    canvasCtx.font = "16px Arial";
    canvasCtx.fillStyle = "#000000";
    canvasCtx.fillText(
        `milestone: ${milestone}
        完成次數 : ${repes}`,
        10, 30
        // canvasElement.width * 2/5,
        // canvasElement.height / 2
      );

    // Flip the canvas horizontally
    canvasCtx.scale(-1, 1);
    canvasCtx.translate(-guideCanvas.width, 0);

}

/* SETUP MEDIAPIPE HOLISTIC INSTANCE */
const holistic = new Holistic({
    locateFile: file => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic@0.5.1635989137/${file}`;
    }
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
    drawResults(results)
    // Animate model
    animateVRM(currentVrm, results);
}

// Pass holistic a callback function
holistic.onResults(onResults);

// Use `Mediapipe` utils to get camera - lower resolution = higher fps
const camera = new Camera(videoElement, {
  onFrame: async () => {
    await holistic.send({image: videoElement});
  },
  width: 480,
  height: 360
});
camera.start();

// // for video
// video.requestVideoFrameCallback(async()=>{
//     await holistic.send({ image: video });
// });