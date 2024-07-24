import { HTTP_METHOD } from "@/types/connections";
import { axiosInstance } from "@/lib/axios";

const previewQuery = async (
  connectionId: string,
  method: HTTP_METHOD,
  path: string,
  headers: any,
  body: any,
  parameters: any,
) => {
  const response = await axiosInstance.post(
    `/adapter/${connectionId}/preview`,
    {
      method,
      path,
      headers,
      body,
      parameters,
    },
  );

  return response.data;
};

export const adapterService = {
  previewQuery,
};
