import { Dashboard, Folder } from "@/types/dashboards";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { dashboardService } from "@/lib/services/dashboards";

const useDashboards = () => {
  const {
    isPending: dashboardsLoading,
    data: dashboards,
    error: dashboardsError,
    isError: dashboardsIsError,
  } = useQuery({
    queryKey: ["dashboards"],
    queryFn: () => dashboardService.getDashboards(),
    refetchOnWindowFocus: false,
  });

  const {
    isPending: foldersLoading,
    data: folders,
    error: foldersError,
    isError: foldersIsError,
  } = useQuery({
    queryKey: ["folders"],
    queryFn: () => dashboardService.getFolders(),
    refetchOnWindowFocus: false,
  });

  const queryClient = useQueryClient();

  const addDashboard = (dashboard: Dashboard) => {
    const updatedDashboards = [...(dashboards as Dashboard[]), dashboard];
    queryClient.setQueryData(["dashboards"], updatedDashboards);
  };

  const updateDashboard = (dashboard: Dashboard) => {
    const updatedDashboards = (dashboards as Dashboard[]).map((d) =>
      d.id === dashboard.id ? dashboard : d,
    );

    queryClient.setQueryData(["dashboards"], updatedDashboards);

    if (dashboard.folder_id) {
      const updatedFolders = (folders as Folder[]).map((folder) => {
        if (folder.id === dashboard.folder_id) {
          return {
            ...folder,
            dashboards: folder.dashboards.map((d) =>
              d.id === dashboard.id ? dashboard : d,
            ),
          };
        } else {
          return {
            ...folder,
            dashboards: folder.dashboards.filter((d) => d.id !== dashboard.id),
          };
        }
      });

      queryClient.setQueryData(["folders"], updatedFolders);
    }
  };

  const deleteDashboard = (dashboard: Dashboard) => {
    const updatedDashboards = (dashboards as Dashboard[]).filter(
      (d) => d.id !== dashboard.id,
    );
    queryClient.setQueryData(["dashboards"], updatedDashboards);

    const updatedFolders = (folders as Folder[]).map((folder) => ({
      ...folder,
      dashboards: folder.dashboards.filter((d) => d.id !== dashboard.id),
    }));

    queryClient.setQueryData(["folders"], updatedFolders);
  };

  const addFolder = (folder: Folder) => {
    const updatedFolders = [...(folders as Folder[]), folder];
    queryClient.setQueryData(["folders"], updatedFolders);
  };

  const updateFolder = (folder: Folder) => {
    const updatedFolders = (folders as Folder[]).map((f) =>
      f.id === folder.id ? folder : f,
    );
    queryClient.setQueryData(["folders"], updatedFolders);
  };

  const deleteFolder = (folder: Folder) => {
    const updatedFolders = (folders as Folder[]).filter(
      (f) => f.id !== folder.id,
    );
    queryClient.setQueryData(["folders"], updatedFolders);

    const updatedDashboards = (dashboards as Dashboard[]).map((d) => {
      if (d.folder_id === folder.id) {
        return {
          ...d,
          folder_id: null,
        };
      }
      return d;
    });

    queryClient.setQueryData(["dashboards"], updatedDashboards);
  };

  return {
    dashboards: dashboards || [],
    folders: folders || [],
    loading: dashboardsLoading || foldersLoading,
    isError: dashboardsIsError || foldersIsError,
    error: dashboardsError || foldersError,
    operations: {
      updateDashboard,
      updateFolder,
      addDashboard,
      addFolder,
      deleteDashboard,
      deleteFolder,
    },
  };
};

export default useDashboards;
