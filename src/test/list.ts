import { qed, pqed, it } from 'tiqed';
import { b } from 'chestre';
import { authXhr, userSession1Xhr, userSession2Xhr } from '../config';

let emptys = (_: any) => {
  qed('[]', _, []);
};

let qedObject = (_: any) => {
  qed('ok', typeof _, 'object');
};

const okResult = (op: (_: any) => void = qedObject) =>
  (_: Promise<any>) =>
  _.then(op).catch(_ => {
    qed('fail', _, 1);
  });
  

export default function list() {

  let bapu1 = new b.BooksApi(userSession1Xhr);
  let bapu2 = new b.BooksApi(userSession2Xhr);
  
  let bap = new b.BooksApi(authXhr);

  let guest = authXhr.guest();
  
  it('lists', () =>
    guest.then(() => Promise.all([
      bap.books()
    ].map(okResult(emptys)))));

  it('lists for user', () =>
    Promise.all([bapu1.books()].map(okResult(emptys))));

  it('user 2 sessions', () =>
    bapu1.newBook('hello').then(() =>
      okResult(_ => {
        console.log(_);
      })(bapu2.books())));
  
  
}
