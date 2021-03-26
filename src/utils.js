
const {fs} = require("fs")
const {performance } = require("perf_hooks");
const {JSDOM} = require("jsdom"); 
const {createCanvas} = require("canvas");





async function saveAsPNG(p5Inst, filename = "sketch") {
  const buffer = p5Inst._renderer.drawingContext.canvas.toBuffer();
  await fs.promises.writeFile(filename + ".png", buffer);
}

function getBuffer(p5Inst) {
  return p5Inst._renderer.drawingContext.canvas.toBuffer();
}

const setupWindow = (w,h) =>{
  global.window = global;

  const dom = new JSDOM();
  global.document = dom.window.document;

  const nodeCanvas = createCanvas(w, h);
  dom.window.HTMLCanvasElement.prototype.getContext = (type) => {
    return nodeCanvas.getContext(type);
  };

  global.performance = performance;

  global.screen = {};

  global.addEventListener = dom.window.addEventListener.bind(dom.window);
  global.removeEventListener = dom.window.removeEventListener.bind(dom.window);

  global.navigator = { userAgent: "node" };
}


// export { saveAsPNG, getBuffer, setupWindow };

module.exports = { saveAsPNG, getBuffer, setupWindow };
