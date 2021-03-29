const { setupWindow } = require("../utils");
import { OPCStream } from "./../opcstream";

const OSC = require("osc-js");

const w = 4880,
  h = 1500;

const pixelNum = 1000;

setupWindow(w, h);
const p5 = require("p5");
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

osc.on("*", (message: any) => {
  console.log(message.args);
});

osc.on("/param/density", (message: any, rinfo: string) => {
  console.log(message.args);
  console.log(rinfo);
});

osc.on("/open", (message: any) => {
  client.connect();
});
osc.on("/close", (message: any) => {
  client.close();
});

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
  osc.on("/param/density", (message: any, rinfo: string) => {
    console.log(message.args);
    console.log(rinfo);
  });
});

osc.on("/scene1", (message: any, rinfo: string) => {
  console.log(message.args);
  console.log(rinfo);
});
