import { useEffect, useState } from "react";
import { Connection } from "@/types/connections";
import { mockConnections } from "@/hooks/useConnections";
import { ComponentType, DashboardMetadata, LayoutType } from "@/types/editor";
import { FastboardTableProperties } from "@/types/editor/table-types";

const dashboardData: DashboardMetadata = {
  layouts: [
    {
      type: LayoutType.Full,
      component1: {
        type: ComponentType.Table,
        properties: FastboardTableProperties.default(),
      },
    },
  ],
};

const useDashboard = (id: string) => {
  const [dashboard, setDashboard] = useState<DashboardMetadata | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(true);

  const fetchDashboard = async () => {
    // TODO: fetch dashboard by id
    setTimeout(() => {
      setDashboard(dashboardData);
      setLoading(false);
    }, 3000);
  };

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
    }

    fetchDashboard();
  }, [id]);

  return {
    dashboard,
    loading,
  };
};

export default useDashboard;
