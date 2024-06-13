import { DashboardInterface } from "@/types";
import { useEffect, useState } from "react";

const mockDashboards: DashboardInterface[] = [
  {
    id: "2",
    name: "My Project",
    isFolder: true,
    dashboards: [
      {
        id: "3",
        name: "Dashboard 1",
        isFolder: false,
      },
      {
        id: "4",
        name: "Dashboard 2",
        isFolder: false,
      },
    ],
  },
  {
    id: "1",
    name: "API Dashboard",
    isFolder: false,
  },
  {
    id: "5",
    name: "DB Dashboard",
    isFolder: false,
  },
];

const useDashboards = () => {
  const [dashboards, setDashboards] = useState<DashboardInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  const fetchDashboards = async () => {
    //TODO fetch dashboards
    setTimeout(() => {
      setDashboards(mockDashboards);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
    }

    fetchDashboards();
  }, [mounted]);

  return { dashboards, loading };
};

export default useDashboards;
