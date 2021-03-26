const w = 4880,
  h = 1500;
const { setupWindow } = require("../utils");
setupWindow(w, h);

const p5 = require("p5");
var OPC = new require("./opc");
var client = new OPC("localhost", 7890);

var oscServer = new Server(3333, "0.0.0.0", () => {
  console.log("OSC Server is listening");
});

server.on("message", (msg) => {
  console.log(`Message: ${msg}`);

  new p5((p) => {
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
  server.close();
});
