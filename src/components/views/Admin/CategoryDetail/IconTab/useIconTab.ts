import useMediaHandling from "@/src/hooks/useMediaHandling";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const iconUpdateSchema = yup.object().shape({
  icon: yup.mixed<FileList | string>().required("Please upload an icon"),
});

const useIconTab = () => {
  const {
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,

    handleUploadFile,
    handleDeleteFile,
  } = useMediaHandling();

  const {
    control: controlIconUpdate,
    handleSubmit: handleSubmitIconUpdate,
    formState: { errors: iconUpdateErrors },
    reset: resetIconUpdate,
    watch: watchIconUpdate,
    getValues: getValuesIconUpdate,
    setValue: setValueIconUpdate,
  } = useForm({
    resolver: yupResolver(iconUpdateSchema),
  });

  const preview = watchIconUpdate("icon");

  const handleUploadIcon = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    if (files.length !== 0) {
      handleUploadFile(files, onChange, (fileUrl) => {
        if (fileUrl) {
          setValueIconUpdate("icon", fileUrl);
        }
      });
    }
  };

  const handleDeleteIcon = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    const fileUrl = getValuesIconUpdate("icon");
    if (typeof fileUrl !== "string") return;

    handleDeleteFile(fileUrl, (fileUrl) => {
      onChange(undefined);
      setValueIconUpdate("icon", "");
    });
  };

  return {
    controlIconUpdate,
    handleSubmitIconUpdate,
    iconUpdateErrors,
    resetIconUpdate,

    handleUploadIcon,
    isPendingMutateUploadFile,
    handleDeleteIcon,
    isPendingMutateDeleteFile,

    preview,
  };
};

export default useIconTab;
