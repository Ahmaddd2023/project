import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HexToRgbService {
  constructor() {}

  isValidHex = (hex: string) => /^#([A-Fa-f0-9]{3,4}){1,2}$/.test(hex);

  getChunksFromString = (st: string, chunkSize: number) =>
    st.match(new RegExp(`.{${chunkSize}}`, 'g'));

  convertHexUnitTo256 = (hexStr: string) =>
    parseInt(hexStr.repeat(2 / hexStr.length), 16);

  getAlphafloat = (a: number, alpha?: number) => {
    if (typeof a !== 'undefined') {
      return a / 255;
    }
    if (typeof alpha != 'number' || alpha < 0 || alpha > 1) {
      return 1;
    }
    return alpha;
  };

  hexToRGBA = (hex: string, alpha?: number) => {
    if (!this.isValidHex(hex)) {
      throw new Error('Invalid HEX');
    }
    const chunkSize = Math.floor((hex.length - 1) / 3);
    const hexArr = this.getChunksFromString(hex.slice(1), chunkSize) || [];
    const [r, g, b, a] = hexArr.map(this.convertHexUnitTo256);
    return `${r}, ${g}, ${b}`;
    // with alpha channel if needed
    // `${r}, ${g}, ${b}, ${this.getAlphafloat(a, alpha)}`;
  };
}
