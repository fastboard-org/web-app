import { HTTP_METHOD, Query } from "@/types/connections";
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

async function executeQuery(
  query: Query | null,
  dashboardId: string,
  parameters?: Record<string, any>,
  previewAccessToken?: string,
) {
  try {
    if (!query) {
      return null;
    }

    const token = localStorage.getItem(`auth-${dashboardId}`);

    const parametersToSend = parameters ?? {};

    parametersToSend.token = previewAccessToken || token || undefined;

    console.log("parametersToSend", parametersToSend);

    const response = await axiosInstance.post(
      `/adapter/${query.connection_id}/execute/${query.id}`,
      {
        parameters: parametersToSend,
      },
    );

    if (response.data?.status_code !== 200) {
      if (response.data?.status_code === 401) {
        localStorage.removeItem(`auth-${dashboardId}`);
      }

      const error = response.data?.body?.error;
      throw new Error(
        `Error ${response.data.status_code}: ${error?.description ?? ""}`,
      );
    }
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const adapterService = {
  previewQuery,
  executeQuery,
};
