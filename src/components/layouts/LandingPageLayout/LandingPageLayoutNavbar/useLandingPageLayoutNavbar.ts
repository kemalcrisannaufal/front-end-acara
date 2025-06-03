import { DELAY } from "@/src/constants/list.constants";
import useDebounce from "@/src/hooks/useDebounce";
import authServices from "@/src/services/auth.service";
import eventServices from "@/src/services/event.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";

const useLandingPageLayoutNavbar = () => {
  const { isReady } = useRouter();
  const debounce = useDebounce();
  const getProfile = async () => {
    const { data } = await authServices.getProfile();
    return data.data;
  };
  const { data: dataProfile } = useQuery({
    queryKey: ["getProfile"],
    queryFn: getProfile,
    enabled: isReady,
  });

  const [search, setSearch] = useState("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const textSearch = e.target.value;
    debounce(() => {
      setSearch(textSearch);
    }, DELAY);
  };

  const searchEvent = async () => {
    const params = `search=${search}`;
    const { data } = await eventServices.getEvents(params);
    return data.data;
  };

  const {
    data: dataSearchEvent,
    isLoading: isLoadingEvent,
    refetch: refetchEvents,
    isRefetching: isRefetchingEvent,
  } = useQuery({
    queryKey: ["SearchEvent"],
    queryFn: searchEvent,
    enabled: !!search,
  });

  return {
    dataProfile,
    handleSearch,
    dataSearchEvent,
    search,
    setSearch,
    refetchEvents,
    isLoadingEvent,
    isRefetchingEvent,
  };
};

export default useLandingPageLayoutNavbar;
