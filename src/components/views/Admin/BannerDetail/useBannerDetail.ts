import { ToasterContext } from "@/src/contexts/ToasterContext";
import bannerServices from "@/src/services/banner.service";
import { IBanner, IBannerForm } from "@/src/types/Banner";
import { convertStringToBoolean } from "@/src/utils/boolean";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

const useBannerDetail = () => {
  const { query, isReady } = useRouter();
  const { setToaster } = useContext(ToasterContext);
  const getBannerById = async () => {
    const { data } = await bannerServices.getBannerById(`${query.id}`);
    return data.data;
  };

  const updateBanner = async (payload: IBanner) => {
    const result = await bannerServices.updateBanner(`${query.id}`, payload);
    return result;
  };

  const { data: dataBanner, refetch: refetchBanner } = useQuery({
    queryKey: ["BannerDetail"],
    queryFn: getBannerById,
    enabled: isReady && !!query.id,
  });

  const {
    mutate: mutateUpdateBanner,
    isPending: isPendingUpdateBanner,
    isSuccess: isSuccessUpdateBanner,
  } = useMutation({
    mutationKey: ["updateBanner"],
    mutationFn: updateBanner,
    onError: () => {
      setToaster({
        type: "error",
        message: "Error update banner",
      });
    },
    onSuccess: () => {
      refetchBanner();
      setToaster({
        type: "success",
        message: "Success update banner",
      });
    },
  });

  const handleUpdateBannerImage = (payload: IBanner) => {
    mutateUpdateBanner(payload);
  };

  const handleUpdateBannerInfo = (data: IBannerForm) => {
    const payload: IBanner = {
      ...data,
      isShow: convertStringToBoolean(data.isShow),
    };
    mutateUpdateBanner(payload);
  };

  return {
    dataBanner,
    refetchBanner,
    isPendingUpdateBanner,
    isSuccessUpdateBanner,
    handleUpdateBannerImage,
    handleUpdateBannerInfo,
  };
};

export default useBannerDetail;
