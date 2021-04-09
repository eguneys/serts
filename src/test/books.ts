import { it, qed, pqed } from 'tiqed';
import { b } from 'chestre';
import { xhr } from '../config';
import Force from '../force';
import { mustGet } from '../util';

export function force() {
  it('forces');

  let force = new Force();

  it('books', () => force.books());
}

export function good() {

  let books = new b.BooksApi(xhr);

  it('books good');

  it('creates book', () =>
    books.newBook('a book').then(_ => {
      pqed('a book', _, { name: 'a book' });
    }));

  it('creates chapter', () =>
    mustGet(books.newBook('a book'))(_ =>
      books.newChapter(_.id, 'a chapter').then(_ => {
        pqed('a chapter', _, { name: 'a chapter' })
      })));

  it('creates section', () =>
    mustGet(books.newBook('a book'))(_ =>
      mustGet(books.newChapter(_.id, 'a chapter'))(_ =>
        books.newSection(_.id, 'a section').then(_ => {
          pqed('a section', _, { name: 'a section' })
        }))));

  it('creates content', () =>
    mustGet(books.newBook('a book'))(_ =>
      books.newContent(_.id, 'a content', 'somecontent').then(_ => {
        pqed('a content', _, { name: 'a content', content: 'somecontent' })
      })));
}

export function bad() {

  let books = new b.BooksApi(xhr);
    
  it('books bad');

  let badid = 'badid';

  it.only('returns 404', () => {
    let res = Promise.all([
      books.book(badid),
      books.chapter(badid),
      books.section(badid),
      books.content(badid)
    ].map((_, i) => _.then(_ => {
      qed(i + 1 + '. no 404', _, 1);
    }).catch(_ => {
      qed(i + 1 + '. 404', _, 404);
    })));

    return res;
  });

  it('returns empty result', () => 
    Promise.all([
      books.contents(badid),
      books.sections(badid),
      books.chapters(badid)
    ].map((_, i) => _.then((_: any) => {
      qed(i + 1 + '. bad id []', _, [])
    }))));

  it('cant make a new book', () =>
    Promise.all([
      books.newBook(''),
      books.newChapter('1', ''),
      books.newSection('1', ''),
      books.newContent('1', '', ''),
    ].map((_, i) => _.then((_: any) => {
      qed(i + 1 + '. no 400', _, 1);
    }).catch(_ => {
      qed(i + 1 + '. 400', _, 400);
    }))));

}
