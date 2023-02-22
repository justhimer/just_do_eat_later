const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const canvasCtx = canvasElement.getContext('2d');
const add_train_samples_buttons = document.getElementsByClassName('add_train_samples')
const classifier = knnClassifier.create();

function trainingButtonEvents(){
    let id=0
    for(const button of add_train_samples_buttons){
      button.localStorageName=`class_${id}_training_samples`;
      button.addEventListener('click',(e)=>{
        const className=e.target.localStorageName;
        let samples=JSON.parse(localStorage.getItem(className));
        if (samples==null)
          samples=[];
        samples.push(normalizedLandmarks);
        localStorage.setItem(className,JSON.stringify(samples));
      })
      id++;
    }
}
trainingButtonEvents();
function knnClassifierInit(){
    let id=0
    for(const button of add_train_samples_buttons){
      let samples=JSON.parse(localStorage.getItem(button.localStorageName));
      if(!samples)samples=training_samples[id];
      if(samples){
        for(const sample of samples){
          classifier.addExample(tf.tensor(sample), id);
        }
        initialized=true;
      }
      id++;
    }
}
knnClassifierInit();

async function detectFacialExpression(image,normalizedLandmarks){
    if(initialized){
      const result=await classifier.predictClass(tf.tensor(normalizedLandmarks));
      console.log(result);
      if(result==1){
        // It is a B
      }
    }
}
function onResults(results) {
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(
      results.image, 0, 0, canvasElement.width, canvasElement.height);
  if (results.multiHandLandmarks) {
    for (const landmarks of results.multiHandLandmarks) {
      const X=landmarks.filter(landmark =>landmark.x).reduce((total, next) => total + next.x, 0) / landmarks.length;
      const Y=landmarks.filter(landmark =>landmark.y).reduce((total, next) => total + next.y, 0) / landmarks.length;
      normalizedLandmarks=[];
      for(const landmark of landmarks) {
        normalizedLandmarks.push([landmark.x-X,landmark.y-Y]);
      }
      detectFacialExpression(results.image,normalizedLandmarks);
    //   drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS,
    //                  {color: '#00FF00', lineWidth: 5});
    //   drawLandmarks(canvasCtx, landmarks, {color: '#FF0000', lineWidth: 2});
    }
  }
  canvasCtx.restore();
}

const pose = new Pose({locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
}});
pose.setOptions({
  modelComplexity: 1,
  smoothLandmarks: true,
  enableSegmentation: true,
  smoothSegmentation: true,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});
pose.onResults(onResults);

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await pose.send({image: videoElement});
  },
  width: 1280,
  height: 720
});
camera.start();
