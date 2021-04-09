import { qed, pqed, it } from 'tiqed';
import { b } from 'chestre';
import { xhr, authXhr } from '../config';

const catchRedirect = (_: Promise<any>) => _.then(_ => {
  qed('fail fail', _, 1);
}).catch(_ => {
  qed('redirect', _, { redirect: '/auth' });
});

export default function list() {

  let bap = new b.BooksApi(xhr);

  it('noauth single', () =>
    Promise.all([
      bap.book('1'),
      bap.chapter('1'),
      bap.section('1'),
      bap.content('1')
    ].map(catchRedirect)));
  
  it('noauth list', () =>
     Promise.all([
       bap.books(),
       //bap.chapters('1'),
       //bap.sections('1'),
       //bap.contents('1'),
     ].map(catchRedirect)));

  it('noauth make', () =>
    Promise.all([
      bap.newBook('adf'),
      bap.newChapter('1', 'lakjf'),
      bap.newSection('1', 'alksjdf'),
      bap.newContent('1', 'adf', 'adf'),
    ].map(catchRedirect)));

  it('noauth update', () =>
    Promise.all([
      bap.updateContent('1', 'qweesa')
    ].map(catchRedirect)));
}
