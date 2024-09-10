export function fillQueryParameters(
  queryParameters: Record<string, string>,
  initialData: Object | null
) {
  let newQueryParameters = { ...queryParameters };
  if (initialData) {
    Object.keys(queryParameters).map((key) => {
      const dataKey = queryParameters[key];
      // @ts-ignore
      newQueryParameters[key] = initialData[dataKey];
    });
  }
  return newQueryParameters;
}

const toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

export function transformFiles(formData: any) {
  formData = Object.entries(formData).reduce((acc, [key, value]) => {
    if (value instanceof FileList) {
      value = value.item(0);
    }
    return {
      ...acc,
      [key]: value,
    };
  }, {});
  return formData;
}
