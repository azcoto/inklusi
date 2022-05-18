/* eslint-disable class-methods-use-this */
export const setItem = (key: string, value: unknown): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getItem = <T>(key: string, otherwise?: T): T | null => {
  const data: string | null = localStorage.getItem(key);
  if (data !== null) {
    return JSON.parse(data);
  }
  if (otherwise) {
    return otherwise;
  }
  return null;
};
