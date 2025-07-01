import useChangeUrl from "@/src/hooks/useChangeUrl";
import orderServices from "@/src/services/order.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useTransaction = () => {
  const router = useRouter();
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getMemberTransaction = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const res = await orderServices.getMemberOrder(params);
    const { data } = res;
    return data;
  };

  const {
    data: dataMemberTransaction,
    isLoading: isLoadingMemberTransaction,
    isRefetching: isRefetchingMemberTransaction,
    refetch: refetchMemberTransaction,
  } = useQuery({
    queryKey: ["MemberTransaction", currentLimit, currentPage, currentSearch],
    queryFn: getMemberTransaction,
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  return {
    dataMemberTransaction,
    isLoadingMemberTransaction,
    isRefetchingMemberTransaction,
    refetchMemberTransaction,
  };
};

export default useTransaction;
