import useChangeUrl from "@/src/hooks/useChangeUrl";
import eventServices from "@/src/services/event.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useTicketTab = () => {
  const router = useRouter();
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();
  const [selectedId, setSelectedId] = useState<string>("");

  const getTickets = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const res = await eventServices.getTickets(params);
    const { data } = res;
    return data;
  };

  const {
    data: dataTicket,
    isLoading: isLoadingTickets,
    isRefetching: isRefetchingTickets,
    refetch: refetchTickets,
  } = useQuery({
    queryKey: ["Tickets", currentLimit, currentPage, currentSearch],
    queryFn: getTickets,
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  return {
    dataTicket,
    isLoadingTickets,
    isRefetchingTickets,
    refetchTickets,

    selectedId,
    setSelectedId,
  };
};

export default useTicketTab;
