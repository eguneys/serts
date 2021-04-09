import test from 'ava';
import { b } from 'chestre';
import { userSession1Xhr } from '../config';
import { nextString } from 'domnar';


let bu1 = new b.BooksApi(userSession1Xhr);

test.before(async t => {
});

test.only('add', async t => {

  let name = nextString(10);
  
  await bu1.newBook(name);
  
  let bs1 = await bu1.books();
  let book = bs1?.find(_ => _.name === name)
  
  t.like(book, { name });

  await bu1?.deleteBook(book!.id);

  let bs2 = await bu1.books();

  t.falsy(bs2?.find(_ => _.name === name));
    
});
