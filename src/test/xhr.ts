import { qed, pqed, it } from 'tiqed';
import { xhr } from '../config';


export default function list() {

  it('xhr', () =>
    xhr.headers('/auth/guest').then(_ => {
      qed('set cookie', _['set-cookie'].length, 2);
    }));
}
