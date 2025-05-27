import { ToasterContext } from "@/src/contexts/ToasterContext";
import categoryServices from "@/src/services/category.service";
import { ICategory } from "@/src/types/Category";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

const useCategoryDetail = () => {
  const { query, isReady } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const getCategoryById = async (id: string) => {
    const { data } = await categoryServices.getCategoryById(id);
    return data.data;
  };

  const updateCategory = async (payload: ICategory) => {
    const { data } = await categoryServices.updateCategory(
      `${query.id}`,
      payload,
    );
    return data.data;
  };

  const { data: dataCategory, refetch: refetchCategory } = useQuery({
    queryKey: ["Category"],
    queryFn: () => getCategoryById(`${query.id}`),
    enabled: isReady && !!query.id,
  });

  const {
    mutate: mutateUpdateCategory,
    isPending: isPendingMutateUpdateCategory,
    isSuccess: isSuccessMutateUpdateCategory,
  } = useMutation({
    mutationFn: (payload: ICategory) => updateCategory(payload),
    onError: (error) => {
      setToaster({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to update category info",
      });
    },
    onSuccess: (result) => {
      refetchCategory();
      setToaster({
        type: "success",
        message: "Success update category",
      });
    },
  });

  const handleUpdateCategory = (payload: ICategory) =>
    mutateUpdateCategory(payload);

  return {
    dataCategory,

    handleUpdateCategory,
    isPendingMutateUpdateCategory,
    isSuccessMutateUpdateCategory,
  };
};

export default useCategoryDetail;
