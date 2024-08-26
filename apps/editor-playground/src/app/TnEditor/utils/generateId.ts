export const generateId = (prefix: string) => {
  return prefix + Date.now() + '_' + Math.random().toString(36).slice(2, 9);
};
