import useMediaHandling from "@/src/hooks/useMediaHandling";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const bannerSchema = yup.object().shape({
  image: yup.mixed<FileList | string>().required("Please upload an image"),
});

const useImageTab = () => {
  const {
    handleUploadFile,
    handleDeleteFile,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,
  } = useMediaHandling();

  const {
    control: controlImageUpdate,
    handleSubmit: handleSubmitImageUpdate,
    formState: { errors: errorsImageUpdate },
    reset: resetImageUpdate,
    setValue: setValueImageUpdate,
    watch: watchImageUpdate,
    getValues: getValuesImageUpdate,
  } = useForm({
    resolver: yupResolver(bannerSchema),
  });

  const preview = watchImageUpdate("image");
  const imageUrl = getValuesImageUpdate("image");

  const handleUploadImage = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl) => {
      if (fileUrl) {
        setValueImageUpdate("image", fileUrl);
      }
    });
  };

  const handleDeleteImage = (
    onchange: (files: FileList | undefined) => void,
  ) => {
    if (typeof imageUrl === "string") {
      handleDeleteFile(imageUrl, () => {
        onchange(undefined);
        setValueImageUpdate("image", "");
      });
    }
  };

  return {
    controlImageUpdate,
    handleSubmitImageUpdate,
    errorsImageUpdate,
    resetImageUpdate,
    handleUploadImage,
    handleDeleteImage,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,
    preview,
  };
};

export default useImageTab;
