image_amount = 24;    // Ugly, but no time to fix
var images;
var pos = [];
var angle = 1;
var keys = [false, false, false, false];  // up, left, down and right arrow
var speed = 4;
var image_seperation = -4;
var display_modus = false;

function preload() {
  images = [];
  for (var i = 0; i <= image_amount; i++) {
    if (i < 10) { img = loadImage('images/sprite_0' + i + '.png');} // absolutely
    else {        img = loadImage('images/sprite_' + i + '.png');}  // beautiful
    images.push(img);
  }
  console.log("Preloaded images.")
}

function setup() {
  imageMode(CENTER);
  createCanvas(800, 800)
  pos = [300, 300];
  textSize(32);
}

function draw() {
  clear();
  background(240);

  textAlign(LEFT);
  text("Controls: ←↑→ and ␣", 20, height - 30)

  textAlign(RIGHT);
  if (!display_modus) {
    text("Driving mode", width - 20, height - 30)
  } else {
    text("Expanding mode", width - 20, height - 30)
  }

  handleKeyInput();

  translate(pos[0], pos[1]);

  for (var i = 0; i <= image_amount; i++) {
    translate(0, image_seperation);
    rotate(angle);
    image(images[i], 0, 0);
    rotate(-angle);
  }
}

function handleKeyInput() {
  if (!display_modus) {
    if (keys[0]) {
      pos[0] += cos(angle) * speed;
      pos[1] += sin(angle) * speed;
    }
    if (keys[2]) {
      pos[0] -= cos(angle) * speed;
      pos[1] -= sin(angle) * speed;
    }
  } else {
    if (keys[0]) {
      image_seperation -= 0.2;
    }
    if (keys[2]) {
      image_seperation += 0.2;
    }
  }

  if (keys[1]) {
    angle -= 0.05;
  }
  if (keys[3]) {
    angle += 0.05;
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    keys[1] = true;
  } else if (keyCode === RIGHT_ARROW) {
    keys[3] = true;
  } else if (keyCode === UP_ARROW) {
    keys[0] = true;
  } else if (keyCode === DOWN_ARROW) {
    keys[2] = true;
  } else if (keyCode === 32) {  // space
    display_modus = !display_modus;
  }
}

function keyReleased() {
  if (keyCode === LEFT_ARROW) {
    keys[1] = false;
  } else if (keyCode === RIGHT_ARROW) {
    keys[3] = false;
  } else if (keyCode === UP_ARROW) {
    keys[0] = false;
  } else if (keyCode === DOWN_ARROW) {
    keys[2] = false;
  }
}
