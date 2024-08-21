import { useEffect, useState } from "react";

export const useAccessToken = ({ dashboardId }: { dashboardId: string }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    // listener
    const token = localStorage.getItem(`auth-${dashboardId}`);
    if (token) {
      setAccessToken(token);
    } else {
      setAccessToken(null);
    }

    const listener = (e: StorageEvent) => {
      if (e.key === `auth-${dashboardId}`) {
        setAccessToken(e.newValue);
      }
    };

    window.addEventListener("storage", listener);

    return () => {
      window.removeEventListener("storage", listener);
    };
  }, [dashboardId]);

  const updateAccessToken = (token: string) => {
    setAccessToken(token);
    localStorage.setItem(`auth-${dashboardId}`, token);
  };

  return { accessToken, updateAccessToken };
};
