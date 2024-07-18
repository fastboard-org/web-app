import { axiosInstance } from "@/lib/axios";
import { Dashboard, Folder } from "@/types/dashboards";

const mapDashboard = (data: any): Dashboard => {
  return {
    id: data._id,
    name: data.name,
    user_id: data.user_id,
    folder_id: data.folder_id,
    metadata: data.metadata,
  };
};

const mapFolder = (data: any): Folder => {
  return {
    id: data._id,
    name: data.name,
    user_id: data.user_id,
    dashboards: data.dashboards.map(mapDashboard),
  };
};

const getDashboards = async () => {
  const response = await axiosInstance.get("/dashboards/me");
  return response.data.map(mapDashboard);
};

const createDashboard = async (name: string, folderId?: string | null) => {
  const response = await axiosInstance.post("/dashboards", {
    name,
    folder_id: folderId,
    metadata: {},
  });
  return mapDashboard(response.data);
};

const updateDashboard = async (
  id: string,
  name: string,
  folderId?: string | null,
) => {
  const response = await axiosInstance.patch(`/dashboards/${id}`, {
    name,
    folder_id: folderId,
  });
  return mapDashboard(response.data);
};

const deleteDashboard = async (id: string) => {
  await axiosInstance.delete(`/dashboards/${id}`);
};

const getFolders = async () => {
  const response = await axiosInstance.get("/folders/me");
  return response.data.map(mapFolder);
};

const createFolder = async (name: string) => {
  const response = await axiosInstance.post("/folders", { name });
  return mapFolder(response.data);
};

export const dashboardService = {
  getDashboards,
  createDashboard,
  updateDashboard,
  deleteDashboard,
  getFolders,
  createFolder,
};
