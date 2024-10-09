import {
  MongoVectorSearchMetadata,
  ContentType,
  MongoQueryMetadata,
  QueryParameter,
  RestQueryMetadata,
} from "@/types/connections";
import { axiosInstance } from "@/lib/axios";
import { isPreviewPage, isPublishPage } from "@/lib/helpers";
import { mapQuery } from "@/lib/services/connections";
import { AxiosRequestConfig } from "axios";
import { toBase64 } from "@/lib/file";

const previewQuery = async (
  connectionId: string,
  queryMetadata:
    | MongoQueryMetadata
    | RestQueryMetadata
    | MongoVectorSearchMetadata,
  parameters: QueryParameter[],
  config?: AxiosRequestConfig
) => {
  const contentType = (queryMetadata as RestQueryMetadata)?.contentType;

  const transformedParameters = parameters
    ? (
        await Promise.all(
          parameters.map(async (param) => {
            if (param.type === "file") {
              if (!param.preview || !(param.preview instanceof File)) {
                return {
                  ...param,
                  preview: null,
                };
              }
              if (contentType === ContentType.JSON || !contentType) {
                return {
                  ...param,
                  preview: await toBase64(param.preview as File),
                };
              }
            }
            return param;
          })
        )
      ).reduce((acc: any, param: any) => {
        return { ...acc, [param.name]: param.preview };
      }, {})
    : {};

  const response = await axiosInstance.post(
    `/adapter/${connectionId}/preview`,
    {
      connection_metadata: queryMetadata,
      parameters: transformedParameters,
    },
    config
  );

  return response.data;
};

async function executeQuery(
  queryId: string | null,
  dashboardId: string,
  parameters?: Record<string, any>,
  previewAccessToken?: string,
  config?: AxiosRequestConfig
) {
  try {
    if (!queryId) {
      return null;
    }

    const token = localStorage.getItem(`auth-${dashboardId}`);
    const viewMode = isPreviewPage() || isPublishPage();
    const parametersToSend = {
      ...parameters,
      token: viewMode ? token : previewAccessToken,
    };

    const response = await axiosInstance.post(
      `/adapter/execute/${queryId}`,
      {
        parameters: parametersToSend,
      },
      config
    );

    if (response?.data.status_code && response?.data.status_code !== 200) {
      if (response?.data?.status_code === 401) {
        localStorage.removeItem(`auth-${dashboardId}`);
        if (viewMode) {
          window.location.reload();
        }
      }

      const error = response.data?.body?.error;
      throw new Error(
        `Error ${response.data.status_code}: ${error?.description ?? ""}`
      );
    }
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function createEmbeddings(queryId: string, indexField: string) {
  const response = await axiosInstance.post(
    `/embeddings/${queryId}?index_field=${indexField}`
  );

  return mapQuery(response?.data?.body);
}

export const adapterService = {
  previewQuery,
  executeQuery,
  createEmbeddings,
};
