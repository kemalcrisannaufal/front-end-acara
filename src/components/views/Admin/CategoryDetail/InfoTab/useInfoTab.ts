import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const infoUpdateSchema = yup.object().shape({
  name: yup.string().required("Please enter a name"),
  description: yup.string().required("Please enter a description"),
});

const useInfoTab = () => {
  const {
    control: controlInfoUpdate,
    handleSubmit: handleSubmitInfoUpdate,
    formState: { errors: infoUpdateErrors },
    reset: resetInfoUpdate,
    setValue: setValueInfoUpdate,
  } = useForm({
    resolver: yupResolver(infoUpdateSchema),
  });

  return {
    controlInfoUpdate,
    handleSubmitInfoUpdate,
    infoUpdateErrors,
    resetInfoUpdate,
    setValueInfoUpdate,
  };
};

export default useInfoTab;
