import { HTTP_METHOD } from "@/types/connections";

export const methodColor = (method: HTTP_METHOD) => {
  const colors = {
    [HTTP_METHOD.GET]: "success",
    [HTTP_METHOD.POST]: "warning",
    [HTTP_METHOD.PUT]: "primary",
    [HTTP_METHOD.DELETE]: "danger",
    [HTTP_METHOD.PATCH]: "secondary",
  };

  return colors[method];
};
