import { useQuery } from "@tanstack/react-query";
import { Dashboard } from "@/types/dashboards";
import { axiosInstance } from "@/lib/axios";

const useDashboard = (id: string) => {
  const {
    isPending: loading,
    isError,
    data: dashboard,
    error,
  } = useQuery({
    queryKey: ["dashboards", id],
    queryFn: () => fetchDashboardById(id),
    refetchOnWindowFocus: false,
  });

  const fetchDashboardById = async (id: string) => {
    try {
      const response = await axiosInstance.get<Dashboard>(`/dashboards/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    dashboard,
    loading,
    isError,
    error,
  };
};

export default useDashboard;
