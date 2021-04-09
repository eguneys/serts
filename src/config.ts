import { Xhr } from './xhr';
import { AuthXhr } from 'chestre';

export const xhr = new Xhr('http://localhost:3000');
export const authXhr = new AuthXhr(xhr);
export const userSession1Xhr = new AuthXhr(xhr).custom(`rk2=eyJzZXNzaW9uSWQiOiJla1VUbkFKWSJ9;`);
export const userSession2Xhr = new AuthXhr(xhr).custom(`rk2=eyJzZXNzaW9uSWQiOiJGZFJhMlM2MyJ9;`);
