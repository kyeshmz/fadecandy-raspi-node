import { createCanvas } from "canvas";
import { JSDOM } from "jsdom";

const fs = require("fs");

interface IWindow {
  width: number;
  height: number;
}

const setupWindow = (props: IWindow) => {
  // I really dont know what this is doing
  // @ts-ignore
  global.window = global;

  const dom = new JSDOM();
  global.document = dom.window.document;

  const nodeCanvas = createCanvas(props.width, props.height);
  global.performance = performance;
  global.screen = screen;

  dom.window.HTMLCanvasElement.prototype.getContext("2d");
  global.addEventListener = dom.window.addEventListener.bind(dom.window);
  global.removeEventListener = dom.window.removeEventListener.bind(dom.window);
  global.navigator = { ...global.navigator, userAgent: "node" };
};

module.exports = { setupWindow };
