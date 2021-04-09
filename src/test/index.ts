import { tMo, run } from 'tiqed';
import * as books from './books';
import list from './list';
import auth from './auth';
import xhr from './xhr';

export default function() {

  tMo(xhr);
  tMo(auth);
  tMo.only(list);
  tMo(books.force);
  tMo(books.good);
  tMo(books.bad);
  
  run();
  
}
