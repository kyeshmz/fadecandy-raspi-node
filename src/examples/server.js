const { setupWindow } = require("../utils.js");

const OPC = require("../opc.js");
const OSC = require("osc-js");

const w = 4880,
  h = 1500;

const pixelNum = 1000;

setupWindow(w, h);
const p5 = require("p5");
var client = new OPC("localhost", 7890);

const options = {
  open: {
    host: "localhost",
    port: 3333,
  },
};
const osc = new OSC({ plugin: new OSC.DatagramPlugin(options) });

osc.on("*", (message) => {
  console.log(message.args);
});

osc.on("/param/density", (message, rinfo) => {
  console.log(message.args);
  console.log(rinfo);
});

osc.on("/scene1", (message, rinfo) => {
  console.log(message.args);
  console.log(rinfo);

  new p5((p) => {
    // Declare sketch variables here
    p.setup = () => {
      p.createCanvas(w, h);
    };
    p.draw = () => {
      var millis = new Date().getTime();

      for (var pixel = 0; pixel < pixelNum; pixel++) {
        var t = pixel * 0.2 + millis * 0.002;
        var red = 128 + 96 * Math.sin(t);
        var green = 128 + 96 * Math.sin(t + 0.1);
        var blue = 128 + 96 * Math.sin(t + 0.3);
        p.random();
        p.circle();

        client.setPixel(pixel, red, green, blue);
      }
      client.writePixels();
      // draw function
    };
  });
});

// 20 rows
// 17 col

const gridWidth = 200;
const gridHeight = 200;

osc.on("/scene2", (message, rinfo) => {
  console.log(message.args);
  console.log(rinfo);

  let circleSize = 10;

  new p5((p) => {
    // Declare sketch variables here
    p.setup = () => {
      p.createCanvas(w, h);
      p.background(0);
      p.fill(255);
      circleSize = 20;
    };
    p.draw = () => {
      p.background(0);
      p.fill(255);
      circleSize += 5;
      p.ellipse(width / 2, height / 2, circleSize);

      const widthSize = w / gridWidth;
      const heightSize = h / gridHeight;

      for (const pixel = 0; pixel < pixelNum; pixel++) {
        for (const hblock = 0; hblock < h; gridHeight++) {
          for (const wblock = 0; wblock < w; gridWidth++) {
            blockPixelColor = p.get(wblock, hblock);
            client.setPixel(pixel, blockPixelColor);
          }
        }
      }
      client.writePixels();
      // draw function
    };
  });
});
