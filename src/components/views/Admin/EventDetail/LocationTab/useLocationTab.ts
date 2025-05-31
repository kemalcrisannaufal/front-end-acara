import { DELAY } from "@/src/constants/list.constants";
import useDebounce from "@/src/hooks/useDebounce";
import eventServices from "@/src/services/event.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const locationSchema = yup.object().shape({
  isOnline: yup.string().required("Please select is event online"),
  region: yup.string().required("Please select region"),
  latitude: yup.string().required("Please input latitude coordinate"),
  longitude: yup.string().required("Please input longitude coordinate"),
  address: yup.string().required("Please input address"),
});
const useLocationTab = () => {
  const debounce = useDebounce();
  const {
    control: controlLocationUpdate,
    handleSubmit: handleSubmitLocationUpdate,
    formState: { errors: locationUpdateErrors },
    setValue: setValueLocationUpdate,
    reset: resetLocationUpdate,
  } = useForm({ resolver: yupResolver(locationSchema) });

  const [searchRegency, setSearchRegency] = useState("");

  const handleSearchRegion = (region: string) => {
    debounce(() => {
      setSearchRegency(region);
    }, DELAY);
  };

  const { data: dataRegency } = useQuery({
    queryKey: ["Regencies"],
    queryFn: () => eventServices.searchLocationByRegency(searchRegency),
    enabled: searchRegency.length > 0,
  });

  return {
    controlLocationUpdate,
    dataRegency,
    handleSubmitLocationUpdate,
    handleSearchRegion,
    locationUpdateErrors,
    resetLocationUpdate,
    setValueLocationUpdate,
  };
};

export default useLocationTab;
