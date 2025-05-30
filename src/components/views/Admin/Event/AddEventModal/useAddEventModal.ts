import { DELAY } from "@/src/constants/list.constants";
import { ToasterContext } from "@/src/contexts/ToasterContext";
import useDebounce from "@/src/hooks/useDebounce";
import useMediaHandling from "@/src/hooks/useMediaHandling";
import categoryServices from "@/src/services/category.service";
import eventServices from "@/src/services/event.service";
import { IEvent, IEventForm } from "@/src/types/Event";
import { toDateStandard } from "@/src/utils/date";
import { yupResolver } from "@hookform/resolvers/yup";
import { getLocalTimeZone, now } from "@internationalized/date";
import { DateValue } from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const eventSchema = yup.object().shape({
  name: yup.string().required("Please input name"),
  slug: yup.string().required("Please input slug"),
  banner: yup.mixed<FileList | string>().required("Please input banner"),
  category: yup.string().required("Please select category"),
  startDate: yup.mixed<DateValue>().required("Please select start date"),
  endDate: yup.mixed<DateValue>().required("Please select end date"),
  description: yup.string().required("Please input description"),
  isFeatured: yup.string().required("Please select isFeatured"),
  isOnline: yup.string().required("Please select isOnline"),
  isPublish: yup.string().required("Please select isPublish"),
  region: yup.string().required("Please select region"),
  longitude: yup.string().required("Please input longitude coordinate"),
  latitude: yup.string().required("Please input latitude coordinate"),
});

const useAddEventModal = () => {
  const { setToaster } = useContext(ToasterContext);
  const session: any = useSession();
  const debounce = useDebounce();
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
  } = useForm({ resolver: yupResolver(eventSchema) });

  const preview = watch("banner");
  const fileUrl = getValues("banner");

  const dateNow = now(getLocalTimeZone());
  setValue("startDate", dateNow);
  setValue("endDate", dateNow);

  const handleUploadBanner = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    if (files.length !== 0) {
      handleUploadFile(files, onChange, (fileUrl) => {
        if (fileUrl) {
          setValue("banner", fileUrl);
        }
      });
    }
  };

  const handleDeleteBanner = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    if (typeof fileUrl === "string") {
      handleDeleteFile(fileUrl, () => {
        onChange(undefined);
        setValue("banner", "");
      });
    }
  };

  const handleOnClose = (onClose: () => void) => {
    if (typeof fileUrl === "string") {
      handleDeleteFile(fileUrl, () => {
        reset();
        onClose();
      });
    } else {
      reset();
      onClose();
    }
  };

  const { data: dataCategory } = useQuery({
    queryKey: ["Categories"],
    queryFn: async () => categoryServices.getCategories(),
    enabled: true,
  });

  const [searchRegency, setSearchRegency] = useState("");

  const { data: dataRegency } = useQuery({
    queryKey: ["Regencies", searchRegency],
    queryFn: async () => eventServices.searchLocationByRegency(searchRegency),
    enabled: searchRegency !== "",
  });

  const handleSearchRegion = (regencyName: string) => {
    debounce(() => {
      setSearchRegency(regencyName);
    }, DELAY);
  };

  const addEvent = async (payload: IEvent) => {
    const result = await eventServices.addEvent(payload);
    return result;
  };

  const {
    mutate: mutateAddEvent,
    isPending: isPendingMutateAddEvent,
    isSuccess: isSuccessAddEvent,
  } = useMutation({
    mutationFn: addEvent,
    onError: (error) => {
      setToaster({ type: "error", message: "Slug already exists" });
    },
    onSuccess: () => {
      reset();
      setToaster({ type: "success", message: "Success add category" });
    },
  });

  const handleAddEvent = (data: IEventForm) => {
    const payload = {
      ...data,
      isFeatured: Boolean(data.isFeatured),
      isOnline: Boolean(data.isOnline),
      isPublish: Boolean(data.isPublish),
      startDate: toDateStandard(data.startDate),
      endDate: toDateStandard(data.endDate),
      location: {
        region: data.region!,
        coordinates: [Number(data.latitude), Number(data.longitude)],
      },
      banner: data.banner,
      createdBy: session.data?.user._id,
    };
    mutateAddEvent(payload);
  };

  return {
    control,
    errors,
    handleAddEvent,
    handleSubmitForm,
    isPendingMutateAddEvent,
    isSuccessAddEvent,

    handleUploadBanner,
    handleDeleteBanner,
    handleOnClose,

    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,
    preview,

    dataCategory,

    dataRegency,
    handleSearchRegion,
  };
};

export default useAddEventModal;
