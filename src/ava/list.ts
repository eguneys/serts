import test from 'ava';
import { b } from 'chestre';
import { userSession1Xhr } from '../config';


let bu1 = new b.BooksApi(userSession1Xhr);

test.before(async t => {
  let books = await bu1.books();

  books?.forEach(({id}) => bu1.deleteBook(id));
});

test.only('foo', async t => {

  await bu1.newBook('hello');
  await bu1.newBook('hello');
  
  let bs1 = await bu1.books();

  t.is(bs1?.length, 2);
    
});
