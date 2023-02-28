import { calculateAngle } from "./do_utils.js";

// setup video, canvas and mediapipe
const videoElement = document.getElementsByClassName("input_video")[0];
const canvasElement = document.getElementsByClassName("output_canvas")[0];
const canvasCtx = canvasElement.getContext("2d");

// setup poses variables
const jointStatusDescription = ["straight", "half-bent", "full-bent"];
let jointStatus = {
  // can be set to index of jointStatusDescription
  leftShoulder: null, leftElbow: null, leftHip: null, leftKnee: null,
  rightShoulder: null, rightElbow: null, rightHip: null, rightKnee: null,
};

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
    leftShoulder: [landmarks[11].x, landmarks[11].y],
    leftElbow: [landmarks[13].x, landmarks[13].y],
    leftWrist: [landmarks[15].x, landmarks[15].y],
    leftHip: [landmarks[23].x, landmarks[23].y],
    leftKnee: [landmarks[25].x, landmarks[25].y],
    leftAnkle: [landmarks[27].x, landmarks[27].y],
    // right
    rightShoulder: [landmarks[12].x, landmarks[12].y],
    rightElbow: [landmarks[14].x, landmarks[14].y],
    rightWrist: [landmarks[16].x, landmarks[16].y],
    rightHip: [landmarks[24].x, landmarks[24].y],
    rightKnee: [landmarks[26].x, landmarks[26].y],
    rightAnkle: [landmarks[28].x, landmarks[28].y],
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

  // fuzzy logic
  for (let key in angles) {
    if (angles[key] > 140) {
      jointStatus[key] = 0; // straight
    } else if (angles[key] < 140 && angles[key] > 70) {
      jointStatus[key] = 1; // half-bent
    } else if (angles[key] < 70) {
      jointStatus[key] = 2; // full-bent
    }
  }

  // if (angles.leftElbow > 140) {
  //   jointStatus.leftElbow = 0; // straight
  // } else if (angles.leftElbow < 140 && angles.leftElbow > 70) {
  //   jointStatus.leftElbow = 1; // half-bent
  // } else if (angles.leftElbow < 70) {
  //   jointStatus.leftElbow = 2; // full-bent
  // }

  // visualize angle
  canvasCtx.font = "18px Arial";
  canvasCtx.fillStyle = "#ffffff";
  for (let key in angles) {
    canvasCtx.fillText(
      `${angles[key].toFixed(1)} ${jointStatusDescription[jointStatus[key]]}`,
      coors[key][0] * canvasElement.width,
      coors[key][1] * canvasElement.height - 10
    );
  }

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
