import { ToasterContext } from "@/src/contexts/ToasterContext";
import useMediaHandling from "@/src/hooks/useMediaHandling";
import bannerServices from "@/src/services/banner.service";
import { IBanner, IBannerForm } from "@/src/types/Banner";
import { convertStringToBoolean } from "@/src/utils/boolean";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const bannerSchema = yup.object().shape({
  title: yup.string().required("Please enter a title"),
  image: yup.mixed<FileList | string>().required("Please upload an image"),
  isShow: yup.string().required("Please select isShow"),
});

const useAddBannerModal = () => {
  const { setToaster } = useContext(ToasterContext);
  const {
    handleUploadFile,
    handleDeleteFile,
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,
  } = useMediaHandling();

  const {
    control: controlAddBanner,
    handleSubmit: handleSubmitAddBanner,
    watch: watchAddBanner,
    setValue: setValueAddBanner,
    getValues: getValuesAddBanner,
    formState: { errors: errorsAddBanner },
    reset: resetAddBanner,
  } = useForm({
    resolver: yupResolver(bannerSchema),
  });

  const addBanner = async (payload: IBanner) => {
    const result = await bannerServices.createBanner(payload);
    return result;
  };

  const {
    mutate: mutateAddBanner,
    isPending: isPendingAddBanner,
    isSuccess: isSuccessAddBanner,
  } = useMutation({
    mutationKey: ["addBanner"],
    mutationFn: addBanner,
    onError: () => {
      setToaster({ type: "error", message: "Error add banner" });
    },
    onSuccess: () => {
      resetAddBanner();
      setToaster({ type: "success", message: "Success add banner" });
    },
  });

  const preview = watchAddBanner("image");
  const imageUrl = getValuesAddBanner("image");

  const handleUploadImage = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl) => {
      if (fileUrl) {
        setValueAddBanner("image", fileUrl);
      }
    });
  };

  const handleDeleteImage = (
    onchange: (files: FileList | undefined) => void,
  ) => {
    if (typeof imageUrl === "string") {
      handleDeleteFile(imageUrl, () => {
        onchange(undefined);
        setValueAddBanner("image", "");
      });
    }
  };

  const handleOnClose = (onClose: () => void) => {
    if (typeof imageUrl === "string") {
      handleDeleteFile(imageUrl, () => {
        resetAddBanner();
        onClose();
      });
    }
  };

  const handleAddBanner = (data: IBannerForm) => {
    const payload: IBanner = {
      ...data,
      isShow: convertStringToBoolean(data.isShow),
    };

    mutateAddBanner(payload);
  };

  return {
    controlAddBanner,
    handleSubmitAddBanner,
    errorsAddBanner,

    preview,
    handleUploadImage,
    handleDeleteImage,
    handleOnClose,
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,

    isPendingAddBanner,
    isSuccessAddBanner,
    handleAddBanner,
  };
};

export default useAddBannerModal;
