import { useEffect, useState } from "react";

export const useRefreshToken = ({ dashboardId }: { dashboardId: string }) => {
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem(`auth-${dashboardId}`);
    setRefreshToken(token);

    const listener = (e: StorageEvent) => {
      if (e.key === `refresh-${dashboardId}`) {
        setRefreshToken(e.newValue);
      }
    };

    window.addEventListener("storage", listener);

    return () => {
      window.removeEventListener("storage", listener);
    };
  }, [dashboardId]);

  const updateRefreshToken = (token: string) => {
    setRefreshToken(token);
    localStorage.setItem(`refresh-${dashboardId}`, token);
  };

  return { refreshToken, updateRefreshToken };
};
