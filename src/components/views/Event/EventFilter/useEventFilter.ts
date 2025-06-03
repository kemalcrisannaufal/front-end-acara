import { LIMIT_CATEGORY, PAGE_DEFAULT } from "@/src/constants/list.constants";
import useChangeUrl from "@/src/hooks/useChangeUrl";
import categoryServices from "@/src/services/category.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const eventFilterSchema = yup.object().shape({
  category: yup.string(),
  isFeatured: yup.string(),
  isOnline: yup.string(),
});
const useEventFilter = () => {
  const { setURL } = useChangeUrl();
  const {
    control: controlFilter,
    setValue: setValueFilter,
    reset: resetFilter,
  } = useForm({
    resolver: yupResolver(eventFilterSchema),
  });
  const getCategories = async () => {
    const params = `limit=${LIMIT_CATEGORY}&page=${PAGE_DEFAULT}`;
    const { data } = await categoryServices.getCategories(params);
    return data.data;
  };

  const { data: dataCategory, isSuccess: isSuccessGetCategory } = useQuery({
    queryKey: ["Categories"],
    queryFn: getCategories,
    enabled: true,
  });

  const handleResetFilter = () => {
    resetFilter();
    setValueFilter("category", "");
    setValueFilter("isFeatured", "");
    setValueFilter("isOnline", "");
    setURL();
  };

  return {
    dataCategory,
    isSuccessGetCategory,
    controlFilter,
    setValueFilter,
    handleResetFilter,
  };
};

export default useEventFilter;
