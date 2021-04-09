export const range = (_from: string, to: string) => {
  let res = [];
  let nf = _from.charCodeAt(0),
  nt = to.charCodeAt(0);
  for (let i = nf; i <= nt; i++) {
    res.push(String.fromCharCode(i));
  }
  return res;
};

export const randInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

const chars = [...range('0', '9'), 
               ...range('a', 'z'),
               ...range('A', 'Z')];

const nbChars = chars.length;

const nextChar = () => chars[randInt(nbChars)];
export const nextString = (len: number) => {
  let res = "";
  for (let i = 0; i < len; i++) {
    res += nextChar();
  }
  return res;
};
