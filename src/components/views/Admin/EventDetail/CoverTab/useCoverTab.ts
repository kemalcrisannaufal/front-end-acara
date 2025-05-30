import useMediaHandling from "@/src/hooks/useMediaHandling";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const coverShema = yup.object().shape({
  banner: yup.mixed<FileList | string>().required("Please upload a cover"),
});

const useCoverTab = () => {
  const {
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,
    handleUploadFile,
    handleDeleteFile,
  } = useMediaHandling();

  const {
    control: controlCoverUpdate,
    formState: { errors: coverUpdateErrors },
    handleSubmit: handleSubmitCoverUpdate,
    watch: watchCoverUpdate,
    setValue: setValueCoverUpdate,
    getValues: getValuesCoverUpdate,
    reset: resetCoverUpdate,
  } = useForm({
    resolver: yupResolver(coverShema),
  });

  const preview = watchCoverUpdate("banner");

  const handleUploadCover = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl) => {
      if (fileUrl) {
        setValueCoverUpdate("banner", fileUrl);
      }
    });
  };

  const handleDeleteCover = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    const fileUrl = getValuesCoverUpdate("banner");
    if (typeof fileUrl === "string") {
      handleDeleteFile(fileUrl, (fileUrl) => {
        onChange(undefined);
        setValueCoverUpdate("banner", "");
      });
    }
  };

  return {
    controlCoverUpdate,
    coverUpdateErrors,
    handleSubmitCoverUpdate,
    resetCoverUpdate,

    preview,

    handleUploadCover,
    handleDeleteCover,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,
  };
};
export default useCoverTab;
