import { ToasterContext } from "@/src/contexts/ToasterContext";
import useMediaHandling from "@/src/hooks/useMediaHandling";
import categoryServices from "@/src/services/category.service";
import mediaServices from "@/src/services/media.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteCategoryModal = () => {
  const { setToaster } = useContext(ToasterContext);
  const { mutateDeleteFile } = useMediaHandling();

  const deleteCategory = async (id: string) => {
    const res = await categoryServices.deleteCategory(id);
    return res.data;
  };

  const deleteIcon = async (fileUrl: string) => {
    mutateDeleteFile({
      fileUrl,
      callback: () => {
        setToaster({ type: "success", message: "Success delete category" });
      },
    });
  };

  const {
    mutate: mutateDeleteCategory,
    isPending: isPendingMutateDeleteCategory,
    isSuccess: isSuccessMutateDeleteCategory,
  } = useMutation({
    mutationFn: deleteCategory,
    onError: (error) => {
      setToaster({ type: "error", message: error.message });
    },
    onSuccess: (data) => {
      deleteIcon(data.data.icon);
    },
  });

  const handleDeleteCategory = (id: string) => mutateDeleteCategory(id);

  return {
    handleDeleteCategory,
    isPendingMutateDeleteCategory,
    isSuccessMutateDeleteCategory,
  };
};

export default useDeleteCategoryModal;
