import { kbt } from 'koob';
import { nextString } from './random';
import { xhr } from './config';
import { fi, mustGet } from './util';
import { b } from 'chestre';

let books = new b.BooksApi(xhr);

export default class Force {

  constructor() {}

  books() {
    return Promise.all(fi(i => this.bookRec(i)));
  }
  
  bookRec(i: number) {
    return mustGet(books.newBook(`${i} force book`))
    (book => Promise.all([
      ...fi(i => this.contentRec(book.id, i)),
      ...fi(i => this.chapterRec(book.id, i))
    ]));
  }

  chapterRec(bookId: kbt.BookId, i: number) {
    return mustGet(books.newChapter(bookId, `${i} force chapter`))
    (chapter => Promise.all([
      ...fi(i => this.contentRec(chapter.id, i)),
      ...fi(i => this.sectionRec(chapter.id, i))
    ]));
  }

  sectionRec(chapterId: kbt.ChapterId, i: number) {
    return mustGet(books.newSection(chapterId, `${i} force section`))
    (section => Promise.all(
      fi(i => this.contentRec(section.id, i))
    ));
  }

  contentRec(sourceId: kbt.SourceId, i: number) {
    return books.newContent(sourceId, `${i} force content`, nextString(1000));
  }

  
}
