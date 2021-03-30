const { setupWindow } = require("../utils");
const w = 4880,
  h = 1500;
setupWindow(w, h);
// const p5 = require("p5");
import p5 from "p5";
import { OPCStream } from "../src/opcstream";

const OSC = require("osc-js");

const pixelNum = 1000;

const client = new OPCStream("localhost", 7890, 512);
client.connect();

const options = {
  open: {
    host: "172.24.214.182",
    port: 3333,
  },
};
const osc = new OSC({ plugin: new OSC.DatagramPlugin(options) });
osc.open();
console.log("server is open on " + options.open.host + " " + options.open.port);

new p5((p: any) => {
  // Declare sketch variables here
  let sceneIndex = 0;
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

  osc.on("/scene1", (message: any, rinfo: string) => {
    console.log(message.args);
    console.log(rinfo);
  });
  osc.on("/scene2", (message: any, rinfo: string) => {
    console.log(message.args);
    console.log(rinfo);
  });
  osc.on("/scene3", (message: any, rinfo: string) => {
    console.log(message.args);
    console.log(rinfo);
  });
  osc.on("/open", (message: any) => {
    client.connect();
  });
  osc.on("/close", (message: any) => {
    client.close();
  });
});

osc.on("/scene2", (message, rinfo) => {
  console.log(message.args);
  console.log(rinfo);

  let circleSize = 10;

  new p5((p: p5) => {
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
            const blockPixelColor = p.get(wblock, hblock);
            client.setPixel(pixel, blockPixelColor.r);
          }
        }
      }
      client.writePixels();
      // draw function
    };
  });
});
