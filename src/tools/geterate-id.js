const sym = 'abcdefghijklmnopqrstuvwxyz1234567890';

export function generateId() {
  let str = '';

  for (let i = 0; i < 8; i++) {
    str += sym[parseInt(Math.floor(Math.random() * sym.length - 1) + 1)];
  }

  return str;
}
