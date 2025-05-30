import categoryServices from "@/src/services/category.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { DateValue } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const infoSchema = yup.object().shape({
  name: yup.string().required("Please input name"),
  slug: yup.string().required("Please input slug"),
  category: yup.string().required("Please select category"),
  startDate: yup.mixed<DateValue>().required("Please select start date"),
  endDate: yup.mixed<DateValue>().required("Please select end date"),
  description: yup.string().required("Please input description"),
  isFeatured: yup.string().required("Please select isFeatured"),
  isPublish: yup.string().required("Please select isPublish"),
});

const useInfoTab = () => {
  const {
    control: controlInfoUpdate,
    formState: { errors: infoUpdateErrors },
    reset: resetInfoUpdate,
    handleSubmit: handleSubmitInfoUpdate,
    setValue: setValueInfoUpdate,
  } = useForm({
    resolver: yupResolver(infoSchema),
  });

  const { data: dataCategory } = useQuery({
    queryKey: ["Categories"],
    queryFn: async () => categoryServices.getCategories(),
    enabled: true,
  });

  return {
    controlInfoUpdate,
    handleSubmitInfoUpdate,
    infoUpdateErrors,
    resetInfoUpdate,
    setValueInfoUpdate,

    dataCategory,
  };
};

export default useInfoTab;
