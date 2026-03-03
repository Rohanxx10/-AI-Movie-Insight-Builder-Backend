export const validateImdb = (id) => {
  return /^tt\d+$/.test(id);
};