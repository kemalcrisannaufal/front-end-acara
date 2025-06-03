import { useRouter } from "next/router";
import useDebounce from "./useDebounce";
import {
  DELAY,
  LIMIT_DEFAULT,
  PAGE_DEFAULT,
} from "../constants/list.constants";
import { ChangeEvent, Key } from "react";

const useChangeUrl = () => {
  const router = useRouter();
  const debounce = useDebounce();

  const currentLimit = router.query.limit;
  const currentPage = router.query.page;
  const currentSearch = router.query.search;
  const currentCategory = router.query.category;
  const currentIsOnline = router.query.isOnline;
  const currentIsFeatured = router.query.isFeatured;

  const setURL = () => {
    router.replace({
      query: {
        limit: currentLimit || LIMIT_DEFAULT,
        page: currentPage || PAGE_DEFAULT,
        search: currentSearch || "",
      },
    });
  };

  const setURLExplore = () => {
    router.replace({
      query: {
        limit: currentLimit || LIMIT_DEFAULT,
        page: currentPage || PAGE_DEFAULT,
        search: currentSearch || "",
        category: currentCategory || "",
        isOnline: currentIsOnline || "",
        isFeatured: currentIsFeatured || "",
      },
    });
  };

  const handleChangePage = (page: number) => {
    router.push({
      query: {
        ...router.query,
        page,
      },
    });
  };

  const handleChangeLimit = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedLimit = e.target.value;
    router.push({
      query: {
        ...router.query,
        limit: selectedLimit,
        page: PAGE_DEFAULT,
      },
    });
  };
  const handleChangeCategory = (category: Key | null) => {
    router.push({
      query: {
        ...router.query,
        limit: LIMIT_DEFAULT,
        page: PAGE_DEFAULT,
        category,
      },
    });
  };

  const handleChangeIsOnline = (e: ChangeEvent<HTMLSelectElement>) => {
    const isOnline = e.target.value;
    router.push({
      query: {
        ...router.query,
        limit: LIMIT_DEFAULT,
        page: PAGE_DEFAULT,
        category: currentCategory || "",
        isOnline,
      },
    });
  };

  const handleChangeIsFeatured = (e: ChangeEvent<HTMLSelectElement>) => {
    const isFeatured = e.target.value;
    router.push({
      query: {
        ...router.query,
        limit: LIMIT_DEFAULT,
        page: PAGE_DEFAULT,
        category: currentCategory || "",
        isOnline: currentIsOnline || "",
        isFeatured,
      },
    });
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debounce(() => {
      const search = e.target.value;
      router.push({
        query: {
          ...router.query,
          search,
          page: PAGE_DEFAULT,
        },
      });
    }, DELAY);
  };

  const handleClearSearch = () => {
    router.push({
      query: {
        ...router.query,
        search: "",
        page: PAGE_DEFAULT,
      },
    });
  };

  return {
    setURL,
    currentPage,
    currentLimit,
    currentSearch,
    currentCategory,

    handleChangePage,
    handleChangeLimit,
    handleSearch,
    handleClearSearch,

    handleChangeCategory,
    handleChangeIsOnline,
    currentIsOnline,
    currentIsFeatured,
    handleChangeIsFeatured,
    setURLExplore,
  };
};

export default useChangeUrl;
