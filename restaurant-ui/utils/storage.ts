export const STORAGE = {
  USER_TOKEN: 'USER_TOKEN',
};

export function getSessionStorage(key: string) {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem(key);
  }
  return null;
}

export function setSessionStorage(key: string, value: string) {
  if (typeof window !== 'undefined') {
    return sessionStorage.setItem(key, value);
  }
}

export function removeSessionStorage(key: string) {
  if (typeof window !== 'undefined') {
    return sessionStorage.removeItem(key);
  }
}
