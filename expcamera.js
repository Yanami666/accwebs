let my_capture, handPose;
let hands = [];
let isThumbsUp = false;

function preload(){
  handPose = ml5.handPose();
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  my_capture = createCapture(VIDEO);
  my_capture.hide();
  
  handPose.detectStart(my_capture, gotHands);
}

function draw(){
  background(220);

  if (isThumbsUp) {
    tint(255, 150, 150);
  } else {
    noTint();
  }
  
  push();

  translate(my_capture.width, 0);
  scale(-1, 1);

  image(my_capture, 0, 0);

  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    let keypoints = hand.keypoints;
    for (let j = 0; j < keypoints.length; j++) {
      let kp = keypoints[j];
      fill(0, 255, 0);
      noStroke();
      circle(kp.x, kp.y, 10);
    }
  }
  
  pop(); 

  isThumbsUp = checkThumbsUp(hands);
}

function gotHands(results){
  hands = results;
}

function checkThumbsUp(hands) {
  if (hands.length === 0) return false;
  let hand = hands[0];
  let keypoints = hand.keypoints;
  if (!keypoints || keypoints.length === 0) return false;

  let thumbTip = keypoints.find(k => k.part === "thumb_tip");
  let indexTip = keypoints.find(k => k.part === "index_finger_tip");
  let middleTip = keypoints.find(k => k.part === "middle_finger_tip");
  let ringTip = keypoints.find(k => k.part === "ring_finger_tip");
  let pinkyTip = keypoints.find(k => k.part === "pinky_tip");

  if (!thumbTip || !indexTip || !middleTip || !ringTip || !pinkyTip) {
    return false;
  }


  let isThumbUp = thumbTip.y < indexTip.y &&
                  thumbTip.y < middleTip.y &&
                  thumbTip.y < ringTip.y &&
                  thumbTip.y < pinkyTip.y;

  return isThumbUp;
}