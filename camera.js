let my_capture, handPose;
let hands = [];

let currentFilterMode = 0;
let lastHandX = null;
let lastSwitchTime = 0;
const switchDelay = 1500;

function preload(){
  handPose = ml5.handPose();
}

function setup(){
  createCanvas(640, 480);
  my_capture = createCapture(VIDEO);
  my_capture.size(640, 480);
  my_capture.hide();
  handPose.detectStart(my_capture, gotHands);
}

function draw(){
  background(220);
  
// 镜像画面
  push();
  translate(width, 0);
  scale(-1, 1);
  image(my_capture, 0, 0, width, height);
  pop();
  

  if (hands.length > 0) {
    let hand = hands[0];
    let currentHandX = hand.keypoints[0].x;
    let mirroredX = width - currentHandX;
    if (lastHandX !== null) {
      let diff = mirroredX - lastHandX;
      let now = millis();
      if (now - lastSwitchTime > switchDelay) {
        if (diff > 60) {
          currentFilterMode = (currentFilterMode + 1) % 5;
          lastSwitchTime = now;
        } else if (diff < -50) {
          currentFilterMode = (currentFilterMode - 1 + 5) % 5;
          lastSwitchTime = now;
        }
      }
    }
    lastHandX = mirroredX;
  } else {
    lastHandX = null;
  }
  
  
  if (currentFilterMode === 1) { 
    // 冷色调滤镜
    loadPixels();
    for (let i = 0; i < pixels.length; i += 4) {
      pixels[i] = pixels[i] * 0.8;
      pixels[i+2] = pixels[i+2] * 1.2;
    }
    updatePixels();
  } else if (currentFilterMode === 2) { 
    // 暖色调滤镜
    loadPixels();
    for (let i = 0; i < pixels.length; i += 4) {
      pixels[i] = pixels[i] * 1.2;
      pixels[i+2] = pixels[i+2] * 0.8;
    }
    updatePixels();
  } else if (currentFilterMode === 3) { 
    // 像素滤镜
    noSmooth();
    let pixelSize = 10;
    for (let y = 0; y < height; y += pixelSize) {
      for (let x = 0; x < width; x += pixelSize) {
        let c = get(x, y);
        fill(c);
        noStroke();
        rect(x, y, pixelSize, pixelSize);
      }
    }
    smooth();
  } else if (currentFilterMode === 4) { 
    //绿镜
    loadPixels();
    for (let i = 0; i < pixels.length; i += 4) {
      let r = pixels[i];
      let g = pixels[i+1];
      let b = pixels[i+2];
      pixels[i] = g;
      pixels[i+1] = r;
      pixels[i+2] = b * 0.5;
    }
    updatePixels();
  }
  // currentFilterMode === 0 保持原始画面，不做滤镜处理
}

function gotHands(results){
  hands = results;
}