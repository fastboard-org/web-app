export interface UserInterface {
  id: string;
  name: string;
  email: string;
}

export interface DashboardInterface {
  id: string;
  name: string;
  isFolder: boolean;
  dashboards?: DashboardInterface[];
}
