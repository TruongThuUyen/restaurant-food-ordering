export const STORAGE = {
  USER_TOKEN: 'USER_TOKEN',
};

export function getSessionStorage(key: string) {
  return sessionStorage.getItem(key);
}

export function setSessionStorage(key: string, value: string) {
  return sessionStorage.setItem(key, value);
}

export function removeSessionStorage(key: string) {
  return sessionStorage.removeItem(key);
}
