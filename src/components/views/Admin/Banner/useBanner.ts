import useChangeUrl from "@/src/hooks/useChangeUrl";
import bannerServices from "@/src/services/banner.service";
import categoryServices from "@/src/services/category.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useBanner = () => {
  const router = useRouter();
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();
  const [selectedId, setSelectedId] = useState<string>("");

  const getBanners = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const res = await bannerServices.getBanners(params);
    const { data } = res;
    return data;
  };

  const {
    data: dataBanner,
    isLoading: isLoadingBanner,
    isRefetching: isRefetchingBanner,
    refetch: refetchBanner,
  } = useQuery({
    queryKey: ["Banners", currentLimit, currentPage, currentSearch],
    queryFn: getBanners,
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  return {
    dataBanner,
    isLoadingBanner,
    isRefetchingBanner,
    refetchBanner,

    selectedId,
    setSelectedId,
  };
};

export default useBanner;
