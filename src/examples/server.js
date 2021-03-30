const { setupWindow } = require("../utils.js");

const OPC = require("../opc.js");
const OSC = require("osc-js");

const w = 4880,
  h = 1500;

const pixelNum = 1000;

setupWindow(w, h);
const p5 = require("p5");
const client = new OPC("localhost", 7890);

const options = {
  open: {
    host: "172.24.214.182",
    port: 3333,
  },
};
const osc = new OSC({ plugin: new OSC.DatagramPlugin(options) });
osc.open();
console.log("server is open on " + options.open.host + " " + options.open.port);

osc.on("*", (message) => {
  console.log(message.args);
});

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
  osc.on("/scene1", (message, rinfo) => {
    console.log(message.args);
    console.log(rinfo);
  });
});
