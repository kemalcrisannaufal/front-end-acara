import { ToasterContext } from "@/src/contexts/ToasterContext";
import useMediaHandling from "@/src/hooks/useMediaHandling";
import categoryServices from "@/src/services/category.service";
import { ICategory } from "@/src/types/Category";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const categorySchema = yup.object().shape({
  name: yup.string().required("Please input name"),
  description: yup.string().required("Please input description"),
  icon: yup.mixed<FileList | string>().required("Please input icon"),
});

const useAddCategoryModal = () => {
  const { setToaster } = useContext(ToasterContext);
  const {
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,

    handleUploadFile,
    handleDeleteFile,
  } = useMediaHandling();

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
    watch,
    getValues,
    setValue,
  } = useForm({ resolver: yupResolver(categorySchema) });

  const preview = watch("icon");
  const fileUrl = getValues("icon");

  const handleUploadIcon = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl) => {
      if (fileUrl) {
        setValue("icon", fileUrl);
      }
    });
  };

  const handleDeleteIcon = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    if (typeof fileUrl === "string") {
      handleDeleteFile(fileUrl, () => {
        onChange(undefined);
        setValue("icon", "");
      });
    }
  };

  const handleOnClose = (onClose: () => void) => {
    if (typeof fileUrl === "string") {
      handleDeleteFile(fileUrl, () => {
        reset();
        onClose();
      });
    }
  };

  const addCategory = async (payload: ICategory) => {
    const result = await categoryServices.addCategory(payload);
    return result;
  };

  const {
    mutate: mutateAddCategory,
    isPending: isPendingMutateAddCategory,
    isSuccess: isSuccessAddCategory,
  } = useMutation({
    mutationFn: addCategory,
    onError: (error) => {
      setToaster({ type: "error", message: error.message });
    },
    onSuccess: () => {
      reset();
      setToaster({ type: "success", message: "Success add category" });
    },
  });

  const handleAddCategory = (data: ICategory) => mutateAddCategory(data);

  return {
    control,
    errors,
    handleAddCategory,
    handleSubmitForm,
    isPendingMutateAddCategory,
    isSuccessAddCategory,

    handleUploadIcon,
    handleDeleteIcon,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,
    preview,

    handleOnClose,
  };
};

export default useAddCategoryModal;
