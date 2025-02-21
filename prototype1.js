let font;
let sampleFactor = 0.4;
let points = [];
let textSize = 65;
let lineSpacing = textSize * 1.3;
let offsets = [];

function preload() {
  font = loadFont('myFont.ttf'); 
}

function setup() {
  let cnv = createCanvas(600, 600);


  textFont(font);
  generatePoints();
}

function draw() {
  background(0);
  fill(255);
  noStroke();

  for (let i = 0; i < points.length; i++) {
    let p = points[i];

    let yOffset = map(noise(frameCount * 0.01 + offsets[i]), 0, 1, -3, 3);
    
    ellipse(p.x, p.y + yOffset, 2, 2);
  }
}

function generatePoints() {
  let startY = 50;
  let totalLines = floor(height / lineSpacing);

  points = [];
  offsets = [];

  for (let i = 0; i < totalLines; i++) {
    let posY = startY + i * lineSpacing;

    let bounds = font.textBounds('this is a cloud', 0, 0, textSize);
    let xCenter = (width - bounds.w) / 2;

    let textPoints = font.textToPoints('this is a cloud', xCenter, posY, textSize, {
      sampleFactor: sampleFactor
    });

    for (let p of textPoints) {
      points.push(p);
      offsets.push(random(1000));
    }
  }
}