import { ColorCharmap } from "./ColorCharmap";

/**
 * Code-to-text class. Translates code into text which will be translated into pixels
 */
export class Text2Pixels {
  code: string;
  resolution: { width: number, height: number };

  constructor(code: any, resolution?: { width: number, height: number }) {
    // If we are passed a function, export the function as a string
    if (typeof code === 'function') this.code = String(code);
    else this.code = code;

    // If no resultion passed, calculate it later.
    if (resolution) this.resolution = resolution;
    else this.resolution = { width: 0, height: 0 };
  }

  asPixelArray(): string[] {
    return [];
  }
}