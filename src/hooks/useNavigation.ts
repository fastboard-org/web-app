import { isPropertiesDrawerOpen } from "@/atoms/editor";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { useSetRecoilState } from "recoil";

const useNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const setIsPropertiesDrawerOpen = useSetRecoilState(isPropertiesDrawerOpen);

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

  function changePage(
    pageId: string,
    queryStrings?: { name: string; value: string }[]
  ) {
    const newParams = new URLSearchParams();
    newParams.set("page", pageId);
    if (queryStrings) {
      queryStrings.forEach((qs) => {
        newParams.set(qs.name, qs.value);
      });
    }
    router.push(pathname + "?" + newParams.toString());
    setIsPropertiesDrawerOpen(false);
  }

  function getQueryParam(key: string) {
    return searchParams.get(key);
  }

  return {
    currentPage,
    changePage,
    getQueryParam,
  };
};

export default useNavigation;
