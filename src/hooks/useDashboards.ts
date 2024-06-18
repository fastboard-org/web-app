import { DashboardInterface, FolderInterface } from "@/types/dashboards";
import { useEffect, useState } from "react";

const mockDashboards: DashboardInterface[] = [
  {
    user_id: "1",
    id: "3",
    name: "Dashboard 1",
    folder_id: "1",
  },
  {
    user_id: "1",
    id: "4",
    name: "Dashboard 2",
    folder_id: "1",
  },
  {
    user_id: "1",
    id: "1",
    name: "API Dashboard",
  },
  {
    user_id: "1",
    id: "5",
    name: "DB Dashboard",
  },
];

const mockFolders: FolderInterface[] = [
  {
    id: "1",
    name: "My Project",
    user_id: "1",
    dashboards: [mockDashboards[0], mockDashboards[1]],
  },
];

const useDashboards = () => {
  const [folders, setFolders] = useState<FolderInterface[]>([]);
  const [dashboards, setDashboards] = useState<DashboardInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  const fetchDashboards = async () => {
    //TODO fetch dashboards and folders from API
    setTimeout(() => {
      setDashboards(mockDashboards);
      setFolders(mockFolders);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
    }

    fetchDashboards();
  }, [mounted]);

  return { dashboards, folders, loading };
};

export default useDashboards;
