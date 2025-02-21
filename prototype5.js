let font;
let words = "butterfly";
let positions = [];

function preload() {
  font = loadFont('myFont.ttf'); 
}

function setup() {
  createCanvas(600, 600);
  textFont(font);
  
  let textWidthTotal = words.length * 40 * 0.6; 
  let xStart = width / 2 - textWidthTotal / 2; 
  
  for (let i = 0; i < words.length; i++) {
    positions.push({
      x: xStart + i * 40 * 0.6,
      y: height / 2,
      char: words[i] 
    });
  }
}

function draw() {
  background(0);
  textSize(40);
  noStroke();

  for (let p of positions) {
    let distance = dist(mouseX, mouseY, p.x, p.y);
    let glow = map(distance, 0, 100, 255, 50, true); 

    fill(255, glow);
    text(p.char, p.x, p.y);
  }
}