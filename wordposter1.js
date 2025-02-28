let font;
let sampleFactor = 0.3;
let particles = [];
let textSize = 65;
let lineSpacing = textSize * 1.1;
let totalLines;
let lineOffsets = [];
let speed = 0.5;
let activeWord = null;
let activeStartTime = 0;
let words = ["this", "is", "a", "cloud"];
let wordOffsets = [];

function preload() {
  font = loadFont('myFont.ttf'); 
}

function setup() {
  createCanvas(600, 600);
  textFont(font);
  totalLines = floor(height / lineSpacing);

  for (let i = 0; i < totalLines; i++) {
    lineOffsets.push(random(-width, width));
  }

  generateParticles();
}

function draw() {
  clear();
  fill(255);
  noStroke();


  for (let i = 0; i < totalLines; i++) {
    lineOffsets[i] += speed;
    if (lineOffsets[i] > width + 300) {
      lineOffsets[i] = -300;
    }
  }

  let currentTime = millis();
  let wordDetected = false;

  for (let i = particles.length - 1; i >= 0; i--) {
    let particle = particles[i];


    if (activeWord === null && particle.isMouseOver()) {
      activeWord = { wordIndex: particle.wordIndex, lineIndex: particle.lineIndex };
      activeStartTime = currentTime;
    }

    // 让该行的该单词跟随鼠标并剧烈抖动
    if (activeWord !== null && 
        activeWord.wordIndex === particle.wordIndex && 
        activeWord.lineIndex === particle.lineIndex) {
      wordDetected = true;
      particle.followMouse(); 
    } else {
      particle.update(); 
    }

    particle.display();
  }


  if (!wordDetected && activeWord !== null) {
    activeWord = null;
  }

  
  if (activeWord !== null && currentTime - activeStartTime > 2000) {
    particles = particles.filter(p => 
      !(p.wordIndex === activeWord.wordIndex && p.lineIndex === activeWord.lineIndex)
    );
    activeWord = null;
  }
}


class Particle {
  constructor(x, y, lineIndex, wordIndex) {
    this.originalX = x;
    this.originalY = y;
    this.x = x;
    this.y = y;
    this.lineIndex = lineIndex;
    this.wordIndex = wordIndex;
    this.isFollowing = false; 
    this.noiseOffset = random(1000);
  }

  update() {
    if (!this.isFollowing) {
      this.x = this.originalX + lineOffsets[this.lineIndex];
    }
  }

  followMouse() {
    this.isFollowing = true; 
    let shakeX = random(-10, 10); 
    let shakeY = random(-10, 10); 

    let lerpAmount = 0.1; 
    this.x = lerp(this.x, mouseX + shakeX, lerpAmount);
    this.y = lerp(this.y, mouseY + shakeY, lerpAmount);
  }

  isMouseOver() {
    let distance = dist(mouseX, mouseY, this.originalX + lineOffsets[this.lineIndex], this.y);
    return distance < textSize; 
  }

  display() {
    ellipse(this.x, this.y, 2, 2);
  }
}


function generateParticles() {
  let startY = 50;
  particles = [];
  wordOffsets = [];

  for (let i = 0; i < totalLines; i++) {
    let posY = startY + i * lineSpacing;
    let xStart = (width - textSize * words.length * 2) / 2; 

    for (let w = 0; w < words.length; w++) {
      let bounds = font.textBounds(words[w], 0, 0, textSize);
      let textPoints = font.textToPoints(words[w], xStart, posY, textSize, {
        sampleFactor: sampleFactor
      });

      for (let p of textPoints) {
        particles.push(new Particle(p.x, p.y, i, w)); 
      }

      xStart += bounds.w + textSize * 0.3; 
    }
  }
}