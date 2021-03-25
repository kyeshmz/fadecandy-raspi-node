import * as opc from "opc";
import * as p5 from "p5";

// Connect to the local instance of fcserver
var WebSocketAddress = "ws://127.0.0.1:7890";
//Show LED pixel locations.

var showPixelLocations = true;
//Change the HTML Id of the canvas.
var canvasId = "strip64_flames";
let im;

const sketch = (p: p5) => {
  p.setup = () => {
    var canvas = p.createCanvas(800, 200);
    canvas.id(canvasId);
    opc.socketSetup(WebSocketAddress); // Connect to the local instance of fcserver via websocket.

    im = p.loadImage("images/flames.jpeg"); // Load a sample image
    opc.ledStrip(0, 64, p.width / 2, p.height / 2, p.width / 70, 0, false);
    //ledRing(0, 120, width/2, height/2, height/4, 0);
    //ledGrid8x8(0, width/2, height/2, 5, 0, true);
    //ledGrid(0, 15, 8, width/2, height/2, 2, 2, 0, true);
    p.frameRate(60);
  };

  p.draw = () => {
    // Scale the image so that it matches the width of the window
    var imHeight = (im.height * p.width) / im.width;

    // Scroll down slowly, and wrap around
    var speed = 0.05;
    var y = (p.millis() * -speed) % imHeight;

    // Use two copies of the image, so it seems to repeat infinitely
    p.image(im, 0, y, p.width, imHeight);
    p.image(im, 0, y + imHeight, p.width, imHeight);

    //Send to fcServer.
    opc.drawFrame();
  };
  // end of p5
};

const sketchP = new p5(sketch);
