import * as net from "net";

export class OPCStream {
  public host: string;
  public port: number;
  public pixelLength: number;
  public pixelBuffer: Buffer;
  public socket: net.Socket;
  public connected: boolean;

  constructor(host: string, port: number, pixelLength: number) {
    this.host = host;
    this.port = port;
    this.pixelBuffer = Buffer.alloc(0);
    this.pixelLength = pixelLength;
    this.socket = new net.Socket();
    this.connected = false;
  }
  public connect = () => {
    this.socket.connect(this.port, this.host, () => {
      if (this.socket) {
        console.log("Connected to " + this.socket.remoteAddress);
        this.connected = true;
        this.socket.setNoDelay();
      }
    });
  };

  public close = () => {
    this.socket.on("close", () => {
      console.log("Connection closed");
      // this.socket = null;
      this.connected = false;
    });
  };
  public setPixelBuffer = (num: number) => {
    var length = 4 + num * 3;
    if (this.pixelBuffer == null || this.pixelBuffer.length != length) {
      this.pixelBuffer = Buffer.alloc(length);
    }
    // Initialize OPC header
    this.pixelBuffer.writeUInt8(0, 0); // Channel
    this.pixelBuffer.writeUInt8(0, 1); // Command
    this.pixelBuffer.writeUInt16BE(this.pixelLength * 3, 2); // Length
  };

  public writePixels = () => {
    this.socket.write(this.pixelBuffer);
  };

  public setPixel = (num: number, r: number, g: number, b: number) => {
    var offset = 4 + num * 3;
    if (this.pixelBuffer == null || offset + 3 > this.pixelBuffer.length) {
      this.setPixelBuffer(num + 1);
    }

    this.pixelBuffer.writeUInt8(Math.max(0, Math.min(255, r | 0)), offset);
    this.pixelBuffer.writeUInt8(Math.max(0, Math.min(255, g | 0)), offset + 1);
    this.pixelBuffer.writeUInt8(Math.max(0, Math.min(255, b | 0)), offset + 2);
  };
  public hsvtorgb = (h: number, s: number, v: number) => {
    /*
     * Converts an HSV color value to RGB.
     *
     * Normal hsv range is in [0, 1], RGB range is [0, 255].
     * Colors may extend outside these bounds. Hue values will wrap.
     *
     * Based on tinycolor:
     * https://github.com/bgrins/TinyColor/blob/master/tinycolor.js
     * 2013-08-10, Brian Grinstead, MIT License
     */

    h = (h % 1) * 6;
    if (h < 0) h += 6;

    var i = h | 0,
      f = h - i,
      p = v * (1 - s),
      q = v * (1 - f * s),
      t = v * (1 - (1 - f) * s),
      r = [v, q, p, p, t, v][i],
      g = [t, v, v, q, p, p][i],
      b = [p, p, t, v, v, q][i];

    return [r * 255, g * 255, b * 255];
  };
}
