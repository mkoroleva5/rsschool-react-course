export const getCookie = (name: string) => {
  if (typeof document !== 'undefined') {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()!.split(';').shift();
    }
  }
};

export const setCookie = (query: string) => {
  if (typeof document !== 'undefined') {
    document.cookie = `search=${query};`;
  }
};
