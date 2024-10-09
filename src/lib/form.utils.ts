import { toBase64 } from "./file";

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

export async function transformFiles(formData: any) {
  const transformedFormData = (
    await Promise.all(
      Object.entries(formData).map(async ([key, value]) => {
        if (value instanceof FileList) {
          const file = value.item(0);
          if (!file) return { name: key, value: null };
          return {
            name: key,
            value: await toBase64(file),
          };
        }
        return { name: key, value: value };
      })
    )
  ).reduce((acc: any, input: any) => {
    return { ...acc, [input.name]: input.value };
  }, {});

  return transformedFormData;
}
