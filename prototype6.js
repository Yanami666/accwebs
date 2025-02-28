let font;
let word = "butterfly";
let letters = [];
let floatingLetters = []; // 存储被点击的字母
let baseSize = 30;
let floatAmplitude = 3;
let spacing = baseSize * 0.7;
let verticalSpacing = baseSize * 1.2;
let offsetShift = baseSize * 0.4;
let margin = 60;
let floatingSize = 40;

// **加载字体**
function preload() {
  font = loadFont('myFont.ttf'); 
}

function setup() {
  createCanvas(700, 700);
  textFont(font);

  let topCount = floor((width - 2 * margin) / spacing);
  for (let i = 0; i < topCount; i++) {
    letters.push(new Letter(word[i % word.length], margin + i * spacing, margin));
  }

  let rightCount = floor((height - 2 * margin) / verticalSpacing);
  for (let i = 0; i < rightCount; i++) {
    let x = width - margin;
    let y = margin + i * verticalSpacing;
    if (i % 2 === 1) x += offsetShift;
    letters.push(new Letter(word[i % word.length], x, y));
  }

  let bottomCount = floor((width - 2 * margin) / spacing);
  for (let i = bottomCount; i >= 0; i--) {
    letters.push(new Letter(word[i % word.length], margin + i * spacing, height - margin));
  }

  let leftCount = floor((height - 2 * margin) / verticalSpacing);
  for (let i = leftCount; i >= 0; i--) {
    let x = margin;
    let y = margin + i * verticalSpacing;
    if (i % 2 === 1) x -= offsetShift;
    letters.push(new Letter(word[i % word.length], x, y));
  }
}

function draw() {
  background(0);

  // **绘制边框字母**
  for (let letter of letters) {
    letter.update();
    letter.display();
  }

  // **绘制所有被点击的字母**
  for (let floating of floatingLetters) {
    floating.update();
    floating.display();
  }
}

// **鼠标点击事件**
function mousePressed() {
  for (let letter of letters) {
    if (letter.isMouseOver()) {
      floatingLetters.push(new FloatingLetter(letter.char));
    }
  }
}

// ✅ `Letter` 类（方框上的字母）
class Letter {
  constructor(char, x, y) {
    this.char = char;
    this.x = x;
    this.y = y;
    this.baseY = y;
    this.speed = random(0.01, 0.03);
    this.alpha = 150; // **让边框文字保持半透明**
  }

  update() {
    let yOffset = sin(frameCount * this.speed) * floatAmplitude;
    this.y = this.baseY + yOffset;
  }

  display() {
    fill(255, this.alpha);
    noStroke();
    textSize(baseSize);
    text(this.char, this.x, this.y);
  }

  isMouseOver() {
    let distance = dist(mouseX, mouseY, this.x, this.y);
    return distance < baseSize / 2;
  }
}

// ✅ `FloatingLetter` 类（点击后出现在框内的字母，并正确弹跳）
class FloatingLetter {
  constructor(char) {
    this.char = char;
    this.x = random(margin, width - margin);
    this.y = random(margin, height - margin);
    this.speedX = random(2, 3);
    this.speedY = random(1, 2);
    this.jitterAmount = 0;
    
    // ✅ `textToPoints()` 生成粒子
    this.points = font.textToPoints(this.char, this.x, this.y, floatingSize, { sampleFactor: 0.3 });
  }

  update() {
    let distance = dist(mouseX, mouseY, this.x, this.y);
    if (distance < 100) {
      this.jitterAmount = sin(frameCount * 10) * 5; // **鼠标靠近时剧烈抖动**
    } else {
      this.jitterAmount = 0;
    }

    this.x += this.speedX;
    this.y += this.speedY;

    let wordWidth = textWidth(this.char);
    if (this.x + wordWidth > width - margin || this.x < margin) {
      this.speedX *= -1;
    }
    if (this.y > height - margin || this.y < margin) {
      this.speedY *= -1;
    }
  }

  display() {
    fill(255);
    noStroke();
    for (let p of this.points) {
      ellipse(p.x + this.jitterAmount, p.y + this.jitterAmount, 2, 2); // ✅ 让字母用点显示，并剧烈抖动
    }
  }
}