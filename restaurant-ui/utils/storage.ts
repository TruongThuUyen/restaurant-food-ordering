export const STORAGE = {
  USER_TOKEN: 'USER_TOKEN',
};

export function getLocalStorage(key: string) {
  return localStorage.getItem(key);
}

export function setLocalStorage(key: string, value: string) {
  return localStorage.setItem(key, value);
}

export function removeLocalStorage(key: string) {
  return localStorage.removeItem(key);
}
