let cols;
let rows;
let scale = 15;
let w = 1280;
let h = 540;

let flying = 0;

let terrain = [];

function setup() {
  createCanvas(960, 540, WEBGL);
  cols = w / scale;
  rows = h / scale;

  for (let x = 0; x < cols; x++) {
    terrain[x] = [];
    for (let y = 0; y < rows; y++) {
        terrain[x][y] = 0; // default value
    }
  }
}

function draw() {
  
  flying -= 0.005; // decrease noise space every cycle
  
  let yoff = flying; // y offset
  for (let y = 0; y < rows; y++) {
    let xoff = 0; // x offset
    for (let x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -20, 50);
      xoff += 0.3;
    }
    yoff += 0.3;
  }
  
  background(0, 15, 34); // black background
   stroke(34, 80, 145);
  //stroke(15, 222, 244);
   fill(200,200,200, 50);
  //noFill();
  rotateX(PI/2.5);
  translate(-w/2, -h/6); // draw relative to center of window
  // ortho();
  
  for (let y = 0; y < rows-1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
      vertex(x*scale, y*scale, terrain[x][y]);
      // vertex(x*scale, (y+1)*scale, terrain[x][y+1]);
    }
    endShape();
  }
}
