image_amount = 24;    // Ugly, but no time to fix
var images;
var cursors = ['images/car_cursor.cur', 'images/penis_cursor.cur'];
var pos = [];
var angle = 0;
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
  var cursor_index = 0;
  if (Math.random() > 0.9) cursor_index = 1;
  document.body.style.cursor = 'url("' + cursors[cursor_index] + '"), auto';
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

  translate(pos[0], pos[1] + 50);
  push();
  for (var i = 0; i <= image_amount; i++) {
    translate(0, image_seperation);
    push();
    rotate(angle);
    image(images[i], 0, 0);
    pop();
  }
  pop();

  var w = 160;
  var h = 120;
  var r = sqrt(pow(w / 2, 2) + pow(h / 2, 2));
  var theta = acos((w / 2) / r);

  var x_coords = [
    r * cos(theta - angle),
    r * cos(-theta - angle),
    r * cos(-PI + theta - angle),
    r * cos(PI - theta - angle)
  ];

  var y_coords = [
    -r * sin(theta - angle),
    -r * sin(-theta - angle),
    -r * sin(-PI + theta - angle),
    -r * sin(PI - theta - angle)
  ];

  var edge = false;
  var outside = 0;
  var rel_pos = [0, 0];
  for (x in x_coords) {
    if (pos[0] + x_coords[x] < 0) {
      rel_pos = [width, 0]
      edge = true;
      outside++;
    } else if (pos[0] + x_coords[x] > width) {
      rel_pos = [-width, 0]
      edge = true;
      outside++;
    }
  }

  for (y in y_coords) {
    if (pos[1] + y_coords[y] < 0) {
      rel_pos = [0, height]
      edge = true;
      outside++;
    } else if (pos[1] + y_coords[y] > height) {
      rel_pos = [0, -height]
      edge = true;
      outside++;
    }
  }

  if(edge) {
    translate(rel_pos[0], rel_pos[1]);
    push();
    for (var i = 0; i <= image_amount; i++) {
      translate(0, image_seperation);
      push();
      rotate(angle);
      image(images[i], 0, 0);
      pop();
    }
    pop();
  }

  if (outside == 4) {
    if (pos[0] < 0) pos[0] += rel_pos[0];
    if (pos[0] > width) pos[0] += rel_pos[0];
    if (pos[1] < 0) pos[1] += rel_pos[1];
    if (pos[1] > height) pos[1] += rel_pos[1];
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
  } else {
	  honk();  
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
  } else {
	  honk();  
  }
}

var honk_sound = new Howl({
  src: ['car_horn.ogg'],
  autoplay: false,
  loop: true
});
var mute = true;
function honk() { //Simple function for car honking
  mute ? honk_sound.play() : honk_sound.pause();
  mute = !mute;
}
