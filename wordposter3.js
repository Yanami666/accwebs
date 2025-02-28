let font;
let particles = [];
let word = "Yanami";
let scatter = false;
let fontSize = 100;
let bgColor = 0; 
let colorChangeSpeed = 5; 

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

  particles = textPoints.map(p => new Particle(p.x, p.y));
}

function draw() {
  background(bgColor); 
  stroke(255); 
  noFill();

  let distance = dist(mouseX, mouseY, width / 2, height / 2);
  scatter = distance < 120; 

  let moving = false; 

  for (let p of particles) {
    p.update();
    p.display();
    if (p.isMoving) moving = true;
  }


  if (moving) {
    bgColor = min(250, bgColor + colorChangeSpeed);
  } else {
    bgColor = max(0, bgColor - colorChangeSpeed);
  }
}


class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.startX = x;
    this.startY = y;
    this.size = random(5, 10);
    this.isMoving = false;
  }

  update() {
    let targetX = scatter ? this.startX + random(-60, 60) : this.startX;
    let targetY = scatter ? this.startY + random(-60, 60) : this.startY;

    let prevX = this.x;
    let prevY = this.y;

    this.x = lerp(this.x, targetX, 0.1);
    this.y = lerp(this.y, targetY, 0.1);

    this.isMoving = dist(prevX, prevY, this.x, this.y) > 0.5;
  }

  display() {
    ellipse(this.x, this.y, this.size, this.size);
  }
}