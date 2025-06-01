import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const infoSchema = yup.object().shape({
  title: yup.string().required("Please enter a title"),
  isShow: yup.string().required("Please select status"),
});

const useInfoTab = () => {
  const {
    control: controlInfo,
    handleSubmit: handleSubmitInfo,
    formState: { errors: infoErrors },
    reset: resetInfo,
    setValue: setValueInfo,
  } = useForm({ resolver: yupResolver(infoSchema) });

  return {
    controlInfo,
    handleSubmitInfo,
    infoErrors,
    resetInfo,
    setValueInfo,
  };
};

export default useInfoTab;
