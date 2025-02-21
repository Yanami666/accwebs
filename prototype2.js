let font;
let fontSize = 65;
let lineSpacing = fontSize * 1.3;
let totalLines;
let lineOffsets = [];

function preload() {
  font = loadFont('myFont.ttf');
}

function setup() {
  createCanvas(600, 600);
  textFont(font);
  textSize(fontSize);
  
  totalLines = floor(height / lineSpacing);
  
  for (let i = 0; i < totalLines; i++) {
    lineOffsets.push(random(-width, width));
  }
}

function draw() {
  background(0);
  fill(255);
  noStroke();

  for (let i = 0; i < totalLines; i++) {
    let y = (i + 1) * lineSpacing;
   

    lineOffsets[i] += 0.5;

    if (lineOffsets[i] > width + 300) {
      lineOffsets[i] = -300;
    }

    text('this is a cloud', lineOffsets[i], y);
  }
}