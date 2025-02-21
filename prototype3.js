let font;
let baseSize = 30;
let maxSize = 50; 
let spacingY = baseSize * 2;
let columns = [-100, 180, 460];
let words = "this is a cloud";
let positions = [];
function preload() {
  font = loadFont('myFont.ttf');
}

function setup() {
  createCanvas(600, 600);
  textFont(font);
  generateTextPositions();
}

function draw() {
  background(0);
  fill(255);
  noStroke();

  for (let i = 0; i < positions.length; i++) {
    let p = positions[i];

    let distance = dist(mouseX, mouseY, p.x, p.y);

    let size = map(distance, 0, 150, maxSize, baseSize, true);
    textSize(size);
    text(p.text, p.x, p.y);
  }
}

function generateTextPositions() {
  positions = [];

  for (let y = 50; y < height; y += spacingY) { 
    for (let col = 0; col < columns.length; col++) { 
      let x = columns[col];
      positions.push({ x: x, y: y, text: words });
    }
  }
}