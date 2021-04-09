import test from 'ava';
import { b } from 'chestre';
import { userSession1Xhr, userSession2Xhr } from '../config';


let bu1 = new b.BooksApi(userSession1Xhr);
let bu2 = new b.BooksApi(userSession2Xhr);

test.before(async t => {
  let books = await bu1.books();

  books?.forEach(({id}) => bu1.deleteBook(id));    
});

test('foo', async t => {

  await bu1.newBook('hello');

  let bs1 = await bu1.books(),
  bs2 = await bu2.books();
  t.deepEqual(bs1, bs2);
  t.like(bs1?.[0], { name: 'hello' });
  
});
