export interface DashboardInterface {
  user_id: string;
  id: string;
  name: string;
  folder_id?: string;
  metadata?: object;
}

export interface FolderInterface {
  id: string;
  name: string;
  user_id: string;
  dashboards: DashboardInterface[];
}
