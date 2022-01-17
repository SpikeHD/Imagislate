export function charToHex(c: string) {
  if (c.length !== 1) throw new Error('Only one character is supported');
  console.log(c, ': ', c.charCodeAt(0).toString(16));
  return c.charCodeAt(0).toString(16);
}

export function translateString(s: string) {
  const arr = [];

  for (const c of s) {
    arr.push(charToHex(c));
  }

  return arr;
}

export function hexToChar(h: number | string) {
  const hex = parseInt(String(h), 16);
  return String.fromCharCode(hex);
}