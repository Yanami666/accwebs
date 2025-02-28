let font;
let word = "butterfly";
let letters = [];
let floatingLetters = [];
let baseSize = 30;
let spacing = baseSize * 0.7;
let verticalSpacing = baseSize * 1.2;
let offsetShift = baseSize * 0.4;
let margin = 60;
let floatingSize = 40;

function preload() {
  font = loadFont('myFont.ttf'); 
}

function setup() {
  createCanvas(700, 700);
  textFont(font);
  createBorderLetters();
}

function draw() {
  background(0);
  letters.forEach(letter => letter.update().display());
  floatingLetters.forEach(floating => floating.update().display());
}

function mousePressed() {
  letters.forEach(letter => {
    if (letter.isMouseOver()) {
      floatingLetters.push(new FloatingLetter(letter.char));
    }
  });
}

// ✅ 生成边框字母
function createBorderLetters() {
  const addLetter = (char, x, y) => letters.push(new Letter(char, x, y));

  for (let i = 0; i < floor((width - 2 * margin) / spacing); i++)
    addLetter(word[i % word.length], margin + i * spacing, margin);

  for (let i = 0; i < floor((height - 2 * margin) / verticalSpacing); i++)
    addLetter(word[i % word.length], width - margin, margin + i * verticalSpacing);

  for (let i = floor((width - 2 * margin) / spacing); i >= 0; i--)
    addLetter(word[i % word.length], margin + i * spacing, height - margin);

  for (let i = floor((height - 2 * margin) / verticalSpacing); i >= 0; i--)
    addLetter(word[i % word.length], margin, margin + i * verticalSpacing);
}

// ✅ `Letter` 类（边框上的字母）
class Letter {
  constructor(char, x, y) {
    this.char = char;
    this.x = x;
    this.y = y;
    this.baseY = y;
    this.alpha = 150;
  }

  update() {
    this.y = this.baseY + noise(this.x * 0.01, frameCount * 0.01) * 6 - 3; // ✅ 让浮动更自然
    return this;
  }

  display() {
    fill(255, this.alpha);
    textSize(baseSize);
    text(this.char, this.x, this.y);
  }

  isMouseOver() {
    return dist(mouseX, mouseY, this.x, this.y) < baseSize / 2;
  }
}

// ✅ `FloatingLetter` 类（点击后生成）
class FloatingLetter {
  constructor(char) {
    this.char = char;
    this.x = random(margin, width - margin);
    this.y = random(margin, height - margin);
    this.speedX = random(2, 3);
    this.speedY = random(1, 2);
    this.points = font.textToPoints(char, 0, 0, floatingSize, { sampleFactor: 0.3 });
  }

  update() {
    // ✅ 恢复鼠标靠近时的剧烈抖动效果
    let distance = dist(mouseX, mouseY, this.x, this.y);
    if (distance < 100) {
      this.x += random(-5, 5); // **剧烈左右抖动**
      this.y += random(-5, 5); // **剧烈上下抖动**
    }

    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > width - margin || this.x < margin) this.speedX *= -1;
    if (this.y > height - margin || this.y < margin) this.speedY *= -1;
    return this;
  }

  display() {
    fill(255);
    noStroke();
    this.points.forEach(p => ellipse(this.x + p.x, this.y + p.y, 2, 2));
  }
}