let font;
let points = [];
let word = "Yanami";
let scatter = false;
let fontSize = 100;

function preload() {
  font = loadFont('myFont.ttf'); 
}

function setup() {
  createCanvas(600, 600);
  textFont(font);
  
  let bounds = font.textBounds(word, 0, 0, fontSize);
  let xStart = width / 2 - bounds.w / 2;
  let yStart = height / 2 + bounds.h / 2; 

  let textPoints = font.textToPoints(word, xStart, yStart, fontSize, {
    sampleFactor: 0.15 
  });

  for (let p of textPoints) {
    points.push({ 
      x: p.x, 
      y: p.y, 
      startX: p.x, 
      startY: p.y, 
      size: random(5, 10) 
    });
  }
}

function draw() {
  background(0);
  stroke(255); 
  noFill();

  let distance = dist(mouseX, mouseY, width / 2, height / 2);
  scatter = distance < 120; 

  for (let p of points) {
    let targetX = scatter ? p.startX + random(-60, 60) : p.startX;
    let targetY = scatter ? p.startY + random(-60, 60) : p.startY;

    p.x = lerp(p.x, targetX, 0.1);
    p.y = lerp(p.y, targetY, 0.1);

    ellipse(p.x, p.y, p.size, p.size); 
  }
}