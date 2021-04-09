import { Xhr as IXhr } from 'chestre';
import fetch from 'node-fetch';
import FormData from 'form-data';

const jsonHeader = {
  Accept: 'application/vnd.chest.v1+json'
};

export const defaultInit: RequestInit = {
  cache: 'no-cache',
  credentials: 'same-origin'
};

export const xhrHeader = {
  'X-Requested-With': 'XMLHttpRequest'
};


export class Xhr implements IXhr {
  
  baseUrl: string
  
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  json(url: string, init: RequestInit = {}): Promise<any> {
    let { headers, ...rest } = init;
    
    return fetch(this.baseUrl + url, {
      ...defaultInit,
      headers: {
        ...jsonHeader,
        ...xhrHeader,
        ...headers
      },
      ...rest
    } as any).then(res => {
      if (res.ok) return res.json();
      return res.json()
        .then(_ => { throw _});
    });
  }
    
  form(data: any): any {
    const form = new FormData();
    for (let key in data) {
      form.append(key, data[key]);
    }
    return form;
  }

  headers(url: string) {
    return fetch(this.baseUrl + url, {
      redirect: 'manual'
    })
      .then(_ => {
        return _.headers.raw();
      });
  }
}
