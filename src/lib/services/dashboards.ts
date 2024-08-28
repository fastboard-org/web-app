import { axiosInstance } from "@/lib/axios";
import { Dashboard, Folder } from "@/types/dashboards";
import { DashboardMetadata } from "@/types/editor";
import { Layout, LayoutType } from "@/types/editor/layout-types";

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

const getDashboard = async (id: string) => {
  const response = await axiosInstance.get(`/dashboards/${id}`);
  return mapDashboard(response.data);
};

const getDashboards = async () => {
  const response = await axiosInstance.get("/dashboards");
  return response.data.map(mapDashboard);
};

const createDashboard = async (name: string, folderId?: string | null) => {
  const metadata: DashboardMetadata = {
    components: {},
    modals: [],
    layouts: [Layout.of(LayoutType.Full)],
  };
  const response = await axiosInstance.post("/dashboards", {
    name,
    folder_id: folderId,
    metadata: metadata,
  });
  return mapDashboard(response.data);
};

const updateDashboard = async (
  id: string,
  name: string,
  folderId?: string | null,
  metadata?: DashboardMetadata
) => {
  const response = await axiosInstance.patch(`/dashboards/${id}`, {
    name,
    folder_id: folderId,
    metadata: metadata ?? {},
  });
  return mapDashboard(response.data);
};

const deleteDashboard = async (id: string) => {
  await axiosInstance.delete(`/dashboards/${id}`);
};

const getFolders = async () => {
  const response = await axiosInstance.get("/folders");
  return response.data.map(mapFolder);
};

const createFolder = async (name: string) => {
  const response = await axiosInstance.post("/folders", { name });
  return mapFolder(response.data);
};

const updateFolder = async (id: string, name: string) => {
  const response = await axiosInstance.patch(`/folders/${id}`, { name });
  return mapFolder(response.data);
};

const deleteFolder = async (id: string) => {
  await axiosInstance.delete(`/folders/${id}`);
};

export const dashboardService = {
  getDashboard,
  getDashboards,
  createDashboard,
  updateDashboard,
  deleteDashboard,
  getFolders,
  createFolder,
  updateFolder,
  deleteFolder,
};
