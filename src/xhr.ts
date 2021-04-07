import fetch from 'node-fetch';

const jsonHeader = {
  Accept: 'application/json'
};

export const defaultInit: RequestInit = {
  cache: 'no-cache',
  credentials: 'same-origin'
};

export const xhrHeader = {
  'X-Requested-With': 'XMLHttpRequest'
};


export class Xhr {

  baseUrl: string
  
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  json(url: string, init: RequestInit = {}): Promise<any> {
    return fetch(this.baseUrl + url, {
      ...defaultInit,
      headers: {
        ...jsonHeader,
        ...xhrHeader
      },
      ...init
    } as any).then(res => {
      if (res.ok) return res.json();
      throw res.status;
    });
  }
    
  form(data: any): string {
    return JSON.stringify(data);
  }
}
