import { Xhr } from './xhr';
import { AuthXhr } from 'chestre';

export const xhr = new Xhr('http://localhost:3000');
export const authXhr = new AuthXhr(xhr);
export const userSession1Xhr = new AuthXhr(xhr).custom(`rk2=eyJzZXNzaW9uSWQiOiJOVVdRNmVoWCJ9;rk2.sig=yEhQEv-Fjwxhy1L6gwnmNGSspd8`);
export const userSession2Xhr = new AuthXhr(xhr).custom(`rk2=eyJzZXNzaW9uSWQiOiIySXVKcUpiNSJ9;rk2.sig=6J880xcJWWb93sD2yMVIXDOdqbw`);
