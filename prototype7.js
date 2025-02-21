let font;
let word = "Yanami";
let wordX, wordY;
let speed = 2;

function preload() {
  font = loadFont('myFont.ttf'); 
}

function setup() {
  createCanvas(600, 400);
  textFont(font);
  textSize(50);
  
  wordX = random(width);
  wordY = random(height);
}

function draw() {
  background(0);
  fill(255);
  noStroke();


  let targetX = mouseX;
  let targetY = mouseY;
  wordX = lerp(wordX, targetX, 0.02);
  wordY = lerp(wordY, targetY, 0.02);

  let jitterX = sin(frameCount * 0.1) * 3;
  let jitterY = cos(frameCount * 0.1) * 3;

  text(word, wordX + jitterX, wordY + jitterY);
}