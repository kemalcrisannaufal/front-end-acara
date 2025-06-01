import { ToasterContext } from "@/src/contexts/ToasterContext";
import useMediaHandling from "@/src/hooks/useMediaHandling";
import bannerServices from "@/src/services/banner.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteBannerModal = () => {
  const { setToaster } = useContext(ToasterContext);
  const { mutateDeleteFile } = useMediaHandling();
  const deleteBanner = async (id: string) => {
    const result = await bannerServices.deleteBanner(id);
    return result.data.data.image;
  };

  const deleteImage = async (fileUrl: string) => {
    mutateDeleteFile({
      fileUrl,
      callback: () => {
        setToaster({ type: "success", message: "Success delete banner" });
      },
    });
  };

  const {
    mutate: mutateDeleteBanner,
    isPending: isPendingDeleteBanner,
    isSuccess: isSuccessDeleteBanner,
  } = useMutation({
    mutationKey: ["deleteBanner"],
    mutationFn: deleteBanner,
    onError: () => {
      setToaster({
        type: "error",
        message: "Error delete banner",
      });
    },
    onSuccess: (fileUrl) => {
      deleteImage(fileUrl);
    },
  });

  const handleDeleteBanner = (id: string) => mutateDeleteBanner(id);
  return { handleDeleteBanner, isPendingDeleteBanner, isSuccessDeleteBanner };
};

export default useDeleteBannerModal;
