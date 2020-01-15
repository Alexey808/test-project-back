const sym = 'abcdefghijklmnopqrstuvwxyz1234567890';
const long = 5;

export function generateId() {
  let str = '';

  for (let i = 0; i < 16; i++) {
    str += sym[parseInt(Math.floor(Math.random() * 16) + 1)];
    console.log('str -> ', str);
  }

  return str;
}
