import { randInt } from './random';

export function fi(op: (i: number) => void, n: number = 5) {
  let res = [];
  n = randInt(n) + randInt(n);
  for (let i = 0; i < n; i++) {
    res.push(op(i));
  }
  return res;
}

export function mustGet<A>(fu: Promise<A|undefined>) {
  return (op: (_: A) => Promise<any>) => {
    return fu.then(_ => {
      if(_) {
        return op(_);
      } else {
        return Promise.reject('undefined');
      }
    });
  }
}
