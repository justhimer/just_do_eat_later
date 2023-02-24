import { calculateAngle } from "./do_utils.js";
import { hammerCurl } from "./do_models.js";

// setup video, canvas and mediapipe
const videoElement = document.getElementsByClassName("input_video")[0];
const canvasElement = document.getElementsByClassName("output_canvas")[0];
const canvasCtx = canvasElement.getContext("2d");

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

// functions
function onResults(results) {
  if (!results.poseLandmarks) {
    return;
  }

  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

  // Flip the canvas horizontally
  canvasCtx.scale(-1, 1);
  canvasCtx.translate(-canvasElement.width, 0);

  // draw image
  canvasCtx.drawImage(
    results.image,
    0,
    0,
    canvasElement.width,
    canvasElement.height
  );

  // Flip the canvas horizontally again
  canvasCtx.scale(-1, 1);
  canvasCtx.translate(-canvasElement.width, 0);

  // get all landmarks
  // const landmarks = results.poseLandmarks; // each landmark has x, y, z and visibility
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
  canvasCtx.font = "22px Arial";
  canvasCtx.fillStyle = "#ffffff";
  for (let key in angles) {
    if (angles[key] === null) { continue }
    canvasCtx.fillText(
      `${angles[key].toFixed(1)} ${jointStatusDescription[jointStatus[key]]}`,
      coors[key][0] * canvasElement.width,
      coors[key][1] * canvasElement.height - 10
    );
  }

  // fuzzy logic for exercise
  if ( milestone === -1 ) {  // milestone = -1 means one repetition is completed
    repes++;
    milestone = 0;  // init milstone
    reachHalf = false;  // init reachHalf
  }
  if ( milestone === hammerCurl.length - 1 ) {
    reachHalf = true;
  }

  let clear = true;
  for (let key in hammerCurl[milestone]) {
    if (jointStatus[key] !== hammerCurl[milestone][key]) {
      clear = false;
    }
  }
  if ( clear & !reachHalf ) { milestone++ }
  else if ( clear & reachHalf ) { milestone-- }

  // visualize counter
  canvasCtx.fillText(
    `Visibility Threshold: ${visT}
    milestone: ${milestone}
    完成次數 : ${repes}`,
    10, 30
    // canvasElement.width * 2/5,
    // canvasElement.height / 2
  );

  canvasCtx.restore();
}

const pose = new Pose({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
  },
});

pose.setOptions({
  modelComplexity: 1,
  smoothLandmarks: true,
  enableSegmentation: false,
  smoothSegmentation: false,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5,
});

pose.onResults(onResults);

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await pose.send({ image: videoElement });
  },
  width: 1280,
  height: 720,
});
camera.start();
