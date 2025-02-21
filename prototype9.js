let font;
let word = "Yanami";
let fontSize = 100;
let distortionFactor = 5;
function preload() {
  font = loadFont('myFont.ttf'); 
}

function setup() {
  createCanvas(600, 600);
  textFont(font);
  textSize(fontSize);
}

function draw() {
  background(0);
  fill(255);
  noStroke();

  let xStart = width / 2 - textWidth(word) / 2;
  let yStart = height / 2;

  for (let i = 0; i < word.length; i++) {
    let letter = word[i];
    let charX = xStart + textWidth(word.substring(0, i)); 
    let charY = yStart;


    let d = dist(mouseX, mouseY, charX, charY);
    

    let offsetX = sin(frameCount * 0.05 + charY * 0.02) * distortionFactor * exp(-d / 50);
    let offsetY = cos(frameCount * 0.05 + charX * 0.02) * distortionFactor * exp(-d / 50);

    text(letter, charX + offsetX, charY + offsetY);
  }
}