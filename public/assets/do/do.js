import { calculateAngle } from "./do_utils.js";
import { hammerCurl } from "./do_models.js";

// setup video, canvas and mediapipe
const videoElement = document.getElementsByClassName("input_video")[0];
const canvasElement = document.getElementsByClassName("output_canvas")[0];
const canvasCtx = canvasElement.getContext("2d");

// setup poses variables
const visT = 0.01; // visibilityThreshold, larger than visT means visible
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

  // draw image
  canvasCtx.drawImage(
    results.image,
    0,
    0,
    canvasElement.width,
    canvasElement.height
  );

  // get all landmarks
  const landmarks = results.poseLandmarks; // each landmark has x, y, z and visibility

  // draw landmarks and connectors
  canvasCtx.globalCompositeOperation = "source-over";
  drawConnectors(canvasCtx, landmarks, POSE_CONNECTIONS, {
    color: "#00FF00",
    lineWidth: 4,
  });
  drawLandmarks(canvasCtx, landmarks, {
    color: "#FF0000",
    lineWidth: 2,
  });

  // get normalized coordinates
  const coors = {
    // left
    leftShoulder: landmarks[11].visibility > visT ? [landmarks[11].x, landmarks[11].y] : null,
    leftElbow: landmarks[13].visibility > visT ? [landmarks[13].x, landmarks[13].y] : null,
    leftWrist: landmarks[15].visibility > visT ? [landmarks[15].x, landmarks[15].y] : null,
    leftHip: landmarks[23].visibility > visT ? [landmarks[23].x, landmarks[23].y] : null,
    leftKnee: landmarks[25].visibility > visT ? [landmarks[25].x, landmarks[25].y] : null,
    leftAnkle: landmarks[27].visibility > visT ? [landmarks[27].x, landmarks[27].y] : null,
    // right
    rightShoulder: landmarks[12].visibility > visT ? [landmarks[12].x, landmarks[12].y] : null,
    rightElbow: landmarks[14].visibility > visT ? [landmarks[14].x, landmarks[14].y] : null,
    rightWrist: landmarks[16].visibility > visT ? [landmarks[16].x, landmarks[16].y] : null,
    rightHip: landmarks[24].visibility > visT ? [landmarks[24].x, landmarks[24].y] : null,
    rightKnee: landmarks[26].visibility > visT ? [landmarks[26].x, landmarks[26].y] : null,
    rightAnkle: landmarks[28].visibility > visT ? [landmarks[28].x, landmarks[28].y] : null,
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
  canvasCtx.font = "18px Arial";
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
    `milestone: ${milestone}
    完成次數 : ${repes}`,
    canvasElement.width * 2/5,
    canvasElement.height / 2
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
