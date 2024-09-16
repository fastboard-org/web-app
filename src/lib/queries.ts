export const isValidBody = (body: string) => {
  if (!body) return true;
  try {
    JSON.parse(body);
    return true;
  } catch (e) {
    return false;
  }
};
