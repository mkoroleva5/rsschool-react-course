import { getCookie, setCookie } from './cookie';

//const cookie = 'search=cat';

describe('Cookie helpers test', () => {
  it('returns right value from cookie', () => {
    Object.defineProperty(document, 'cookie', {
      writable: true,
      value: '',
    });
    document.cookie = 'search=cat';
    const result = getCookie('search');
    expect(result).toEqual('cat');
  });

  it('returns right value from cookie', () => {
    Object.defineProperty(document, 'cookie', {
      writable: true,
      value: '',
    });
    setCookie('cat');
    expect(document.cookie).toEqual('search=cat;');
  });
});
