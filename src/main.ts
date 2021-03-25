import * as p5 from "p5";

const sketch = (p: p5) => {
  p.preload = () => {};

  p.setup = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.draw = () => {
    p.background(100);
    p.ellipse(50, 50, 80, 80);
  };
};

const sketchP = new p5(sketch);
