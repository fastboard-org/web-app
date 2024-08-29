import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

const useNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const currentPage = useMemo(() => {
    return searchParams.get("page") || "home";
  }, [searchParams]);

  function changePage(pageId: string) {
    router.push(pathname + "?" + createQueryString("page", pageId));
  }

  return {
    currentPage,
    changePage,
  };
};

export default useNavigation;
