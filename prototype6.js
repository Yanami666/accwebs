let font;
let words = "butterfly";
let wordX, wordY;
let speedX, speedY;
let jitterAmount = 0;

function preload() {
  font = loadFont('myFont.ttf'); 
}

function setup() {
  createCanvas(600, 600);
  textFont(font);
  textSize(40);

  
  wordX = random(100, width - textWidth(words) - 100);
  wordY = random(50, height - 50);
  speedX = random(2, 3);
  speedY = random(1, 2);
}

function draw() {
  background(0);
  fill(255);
  noStroke();


  let distance = dist(mouseX, mouseY, wordX + textWidth(words) / 2, wordY);

  if (distance < 100) {
    jitterAmount = sin(frameCount * 10) * 5; 
  } else {
    jitterAmount = 0;
  }


  wordX += speedX;
  wordY += speedY;


  let wordWidth = textWidth(words);
  
  if (wordX + wordWidth > width || wordX < 0) {
    speedX *= -1;
  }

  if (wordY > height - 40 || wordY < 40) {
    speedY *= -1;
  }


  text(words, wordX + jitterAmount, wordY);
}