import { MongoQueryMetadata, RestQueryMetadata } from "@/types/connections";
import { axiosInstance } from "@/lib/axios";
import { isPreviewPage, isPublishPage } from "@/lib/helpers";

const previewQuery = async (
  connectionId: string,
  queryMetadata: MongoQueryMetadata | RestQueryMetadata,
  parameters: any,
) => {
  const response = await axiosInstance.post(
    `/adapter/${connectionId}/preview`,
    {
      connection_metadata: queryMetadata,
      parameters,
    },
  );

  return response.data;
};

async function executeQuery(
  queryId: string | null,
  dashboardId: string,
  parameters?: Record<string, any>,
  previewAccessToken?: string,
) {
  try {
    if (!queryId) {
      return null;
    }

    const token = localStorage.getItem(`auth-${dashboardId}`);

    const parametersToSend = parameters ?? {};

    const viewMode = isPreviewPage() || isPublishPage();

    parametersToSend.token = viewMode ? token : previewAccessToken;

    const response = await axiosInstance.post(`/adapter/execute/${queryId}`, {
      parameters: parametersToSend,
    });

    if (response.data?.status_code !== 200) {
      if (response.data?.status_code === 401) {
        localStorage.removeItem(`auth-${dashboardId}`);
        if (viewMode) {
          window.location.reload();
        }
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
