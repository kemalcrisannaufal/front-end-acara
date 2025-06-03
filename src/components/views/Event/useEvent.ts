import { LIMIT_EVENT, PAGE_DEFAULT } from "@/src/constants/list.constants";
import useChangeUrl from "@/src/hooks/useChangeUrl";
import eventServices from "@/src/services/event.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useEvent = () => {
  const {
    currentLimit,
    currentPage,
    currentCategory,
    currentIsOnline,
    currentIsFeatured,
  } = useChangeUrl();
  const getEvents = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;

    if (currentCategory) {
      params += `&category=${currentCategory}`;
    }

    if (currentIsOnline) {
      params += `&isOnline=${currentIsOnline}`;
    }

    if (currentIsFeatured) {
      params += `&isFeatured=${currentIsFeatured}`;
    }

    const res = await eventServices.getEvents(params);
    const { data } = res;
    return data;
  };

  const {
    data: dataEvent,
    isLoading: isLoadingEvent,
    refetch: refetchEvents,
    isRefetching: isRefetchingEvent,
  } = useQuery({
    queryKey: ["Events"],
    queryFn: getEvents,
    enabled: true,
  });

  return { dataEvent, isLoadingEvent, refetchEvents, isRefetchingEvent };
};

export default useEvent;
