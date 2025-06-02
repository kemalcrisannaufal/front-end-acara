import bannerServices from "@/src/services/banner.service";
import { useQuery } from "@tanstack/react-query";
import {
  PAGE_DEFAULT,
  LIMIT_BANNER,
  LIMIT_EVENT,
} from "@/src/constants/list.constants";
import eventServices from "@/src/services/event.service";

const useHome = () => {
  const getBanners = async () => {
    const params = `limit=${LIMIT_BANNER}&page=${PAGE_DEFAULT}`;
    const { data } = await bannerServices.getBanners(params);
    return data.data;
  };

  const { data: dataBanners, isLoading: isLoadingBanners } = useQuery({
    queryKey: ["Banners"],
    queryFn: getBanners,
    enabled: true,
  });

  const getFeaturedEvents = async () => {
    const params = `limit=${LIMIT_EVENT}&page=${PAGE_DEFAULT}&isPublish=true&isFeatured=true`;
    const { data } = await eventServices.getEvents(params);
    return data.data;
  };

  const { data: dataFeaturedEvents, isLoading: isLoadingFeaturedEvents } =
    useQuery({
      queryKey: ["FeaturedEvents"],
      queryFn: getFeaturedEvents,
      enabled: true,
    });

  const getLatestEvents = async () => {
    const params = `limit=${LIMIT_EVENT}&page=${PAGE_DEFAULT}&isPublish=true`;
    const { data } = await eventServices.getEvents(params);
    return data.data;
  };

  const { data: dataLatestEvents, isLoading: isLoadingLatestEvents } = useQuery(
    {
      queryKey: ["LatestEvents"],
      queryFn: getLatestEvents,
      enabled: true,
    },
  );

  return {
    dataBanners,
    isLoadingBanners,
    dataFeaturedEvents,
    isLoadingFeaturedEvents,
    dataLatestEvents,
    isLoadingLatestEvents,
  };
};

export default useHome;
