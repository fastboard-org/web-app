import { lastDashboardMetadata } from "@/atoms/editor";
import { dashboardService } from "@/lib/services/dashboards";
import { Dashboard } from "@/types/dashboards";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

const useSave = (interval: number = 3000) => {
  const [lastDashboard, setLastDashboard] = useRecoilState(
    lastDashboardMetadata
  );

  function saveDashboard(lastDashboard: Dashboard | null) {
    if (!lastDashboard) {
      return;
    }
    dashboardService.updateDashboard(
      lastDashboard.id,
      lastDashboard.name,
      lastDashboard.folder_id,
      lastDashboard.metadata
    );
    setLastDashboard(null);
  }

  useEffect(() => {
    const timer = setInterval(() => saveDashboard(lastDashboard), interval);

    return () => {
      clearInterval(timer);
    };
  }, [lastDashboard]);
};

export default useSave;
