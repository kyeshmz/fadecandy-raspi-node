import { OPCStream } from "./../opcstream";
const { setupWindow } = require("../utils");
const w = 4880,
  h = 1500;

setupWindow(w, h);
const p5 = require("p5");

const client = new OPCStream("localhost", 7890, 512);
client.connect();
new p5((p: any) => {
  // Declare sketch variables here
  p.setup = () => {
    p.createCanvas(w, h);
    // setup function
    // saveAsPNG(p, "name") // will not run draw
  };
  p.draw = () => {
    var millis = new Date().getTime();

    for (var pixel = 0; pixel < 512; pixel++) {
      var t = pixel * 0.2 + millis * 0.002;
      var red = 128 + 96 * Math.sin(t);
      var green = 128 + 96 * Math.sin(t + 0.1);
      var blue = 128 + 96 * Math.sin(t + 0.3);

      client.setPixel(pixel, red, green, blue);
    }
    client.writePixels();
    // draw function
  };
});
