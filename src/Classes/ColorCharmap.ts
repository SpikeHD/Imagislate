export class ColorCharmap {
  findChar(c: string) {
    if (c.length !== 1) throw new Error('Only one character is supported');
    return c.charCodeAt(0).toString(16);
  }

  translateString(s: string) {
    const arr = [];

    for (const c of s) {
      arr.push(this.findChar(c));
    }

    return arr.join('');
  }
}