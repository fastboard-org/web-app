import { Query } from "@/types/connections";
import { axiosInstance } from "../axios";

export async function executeQuery(
  query: Query | null,
  parameters?: Record<string, any>
) {
  try {
    if (!query) {
      return null;
    }
    const response = await axiosInstance.post(
      `/adapter/${query.connection_id}/execute/${query.id}`,
      {
        parameters: parameters ?? {},
      }
    );
    if (response.data.status_code !== 200) {
      throw new Error(response.data.body);
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
