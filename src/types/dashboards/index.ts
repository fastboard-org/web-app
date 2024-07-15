import { DashboardMetadata } from "../editor";

export interface Dashboard {
  user_id: string;
  id: string;
  name: string;
  folder_id?: string;
  metadata?: DashboardMetadata;
}

export interface Folder {
  id: string;
  name: string;
  user_id: string;
  dashboards: Dashboard[];
}
