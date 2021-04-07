import { it, qed } from 'tiqed';
import * as books from '../books';

export default function() {

  it('books');

  let badid = 'badid';

  it('returns 404', () => {
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
    ].map((_, i) => _.then(_ => {
      qed(i + 1 + '. bad id []', _, [])
    }))));
    
}
