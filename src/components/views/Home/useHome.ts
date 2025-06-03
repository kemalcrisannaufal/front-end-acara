import bannerServices from "@/src/services/banner.service";
import { useQuery } from "@tanstack/react-query";
import {
  PAGE_DEFAULT,
  LIMIT_BANNER,
  LIMIT_EVENT,
  LIMIT_CATEGORY,
} from "@/src/constants/list.constants";
import eventServices from "@/src/services/event.service";
import categoryServices from "@/src/services/category.service";

const useHome = () => {
  const getBanners = async () => {
    const params = `limit=${LIMIT_BANNER}&page=${PAGE_DEFAULT}`;
    const { data } = await bannerServices.getBanners(params);
    return data.data;
  };

  const getFeaturedEvents = async () => {
    const params = `limit=${LIMIT_EVENT}&page=${PAGE_DEFAULT}&isPublish=true&isFeatured=true`;
    const { data } = await eventServices.getEvents(params);
    return data.data;
  };

  const getLatestEvents = async () => {
    const params = `limit=${LIMIT_EVENT}&page=${PAGE_DEFAULT}&isPublish=true`;
    const { data } = await eventServices.getEvents(params);
    return data.data;
  };

  const getCategories = async () => {
    const params = `limit=${LIMIT_CATEGORY}&page=${PAGE_DEFAULT}`;
    const { data } = await categoryServices.getCategories(params);
    return data.data;
  };

  const { data: dataBanners, isLoading: isLoadingBanners } = useQuery({
    queryKey: ["Banners"],
    queryFn: getBanners,
    enabled: true,
  });

  const { data: dataFeaturedEvents, isLoading: isLoadingFeaturedEvents } =
    useQuery({
      queryKey: ["FeaturedEvents"],
      queryFn: getFeaturedEvents,
      enabled: true,
    });

  const { data: dataLatestEvents, isLoading: isLoadingLatestEvents } = useQuery(
    {
      queryKey: ["LatestEvents"],
      queryFn: getLatestEvents,
      enabled: true,
    },
  );

  const { data: dataCategory, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["Categories"],
    queryFn: getCategories,
    enabled: true,
  });

  return {
    dataBanners,
    isLoadingBanners,
    dataFeaturedEvents,
    isLoadingFeaturedEvents,
    dataLatestEvents,
    isLoadingLatestEvents,
    dataCategory,
    isLoadingCategories,
  };
};

export default useHome;
