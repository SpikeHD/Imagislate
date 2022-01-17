import Jimp from 'jimp';
import { hexToChar } from '../util/converter';

export class Image2Text {
  path: string;

  constructor(path: string) {
    this.path = path;
  }

  async toText(): Promise<string> {
    let out = '';

    return new Promise((resolve) => {
      Jimp.read(this.path, (err, image) => {
        const width = image.getWidth();
        const height = image.getHeight();
  
        for (let x = 0; x < width; x++) {
          for (let y = 0; y < height; y++) {
            out += hexToChar(image.getPixelColor(x, y));
          }
        }

        resolve(out);
      });
    });
  }
}