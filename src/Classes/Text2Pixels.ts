import { translateString } from '../util/converter';
import Jimp from 'jimp';

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
    const hex = translateString(this.code);

    return hex;
  }

  as2DPixelArray(): string[][] {
    if (this.resolution.width === 0 || this.resolution.height === 0) throw new Error('Resolution not set');

    const hex: string[] = this.asPixelArray();
    const arr: string[][] = [];

    for (let i = 0; i < this.resolution.height; i++) {
      arr.push([]);
      for (let x = 0; x < this.resolution.width; x++) {
        arr[i].push(hex[i * this.resolution.width + x]);
      }
    }

    return arr;
  }

  createImage(path: string, name: string): string {
    if (!name) name = 'output.jpg';

    const hasExtMatch = name.match(/\..*/g);

    if (!hasExtMatch || hasExtMatch.length <= 0) name += '.jpg';

    const arr = this.as2DPixelArray();
    
    new Jimp(this.resolution.width, this.resolution.height, (err, image) => {
      if (err) throw err;

      for (let x = 0; x < this.resolution.width; x++) {
        for (let y = 0; y < this.resolution.height; y++) {
          const color = arr[x][y] ? Number(arr[x][y]) : 0xFFFFFFFF;

          image.setPixelColor(color, x, y);
        }
      }

      image.writeAsync(`${path}/${name}`).catch(e => { throw e; });
    });

    return `${path}/${name}`;
  }
}