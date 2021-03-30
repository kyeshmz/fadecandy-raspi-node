import { OPCStream } from "../src/opcstream";
const { setupWindow } = require("../src/utils");
const w = 4880,
  h = 1500;

setupWindow(w, h);
const p5 = require("p5");

const client = new OPCStream("localhost", 7890, 512);
client.connect();

new p5((p: any) => {
  // Declare sketch variables here
  let vid: any;
  let playing = true;

  p.setup = () => {
    p.createCanvas(w, h);
    // setup function
    // saveAsPNG(p, "name") // will not run draw
    vid = p.loadImage("wave.gif");
    vid.size(400, 400);
    vid.volume(0);
    vid.loop();
    vid.hide();
  };
  p.draw = () => {
    p.background(255);
    vid.loadPixels();
    // const stepSize = round(constrain(mouseX / 8, 6, 32));
    const stepSize = 9;
    // console.log(stepSize);
    for (let pixel = 0; pixel < 512; pixel++) {
      for (let y = 0; y < w; y += stepSize) {
        for (let x = 0; x < h; x += stepSize) {
          const i = y * w + x;
          // const darkness = (255 - vid.pixels[i * 4]) / 255;
          // const radius = stepSize * darkness;
          // ellipse(x, y, radius, radius);
          const color = vid.pixels[i * 3];
          client.setPixel(pixel, color[0], color[1], color[2]);
        }
      }
    }
  };
  client.writePixels();
});
