export const isValidBody = (body: Object) => {
  if (!body) return true;
  try {
    JSON.parse(body);
    return true;
  } catch (e) {
    return false;
  }
};
