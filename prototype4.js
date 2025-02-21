let font;
let words = "butterfly";
let letters = [];
let baseSize = 40;
let flutterSpeed = 0.02;

function preload() {
  font = loadFont('myFont.ttf'); 
}

function setup() {
  createCanvas(600, 600);
  textFont(font);
  
  let xStart = width / 2 - (words.length * baseSize * 0.6) / 2;
  for (let i = 0; i < words.length; i++) {
    letters.push({
      char: words[i],
      x: xStart + i * baseSize * 0.6,
      y: height / 2,
      angle: random(TWO_PI),
      speed: random(0.01, 0.03),
    });
  }
}

function draw() {
  background(0);
  fill(255);
  textSize(baseSize);
  noStroke();

  for (let letter of letters) {
    let yOffset = sin(frameCount * letter.speed) * 10;
    text(letter.char, letter.x, letter.y + yOffset);
  }
}