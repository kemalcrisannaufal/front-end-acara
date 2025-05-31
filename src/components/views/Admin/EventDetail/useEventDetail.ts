import { ToasterContext } from "@/src/contexts/ToasterContext";
import eventServices from "@/src/services/event.service";
import { IEvent, IEventForm } from "@/src/types/Event";
import { convertStringToBoolean } from "@/src/utils/boolean";
import { toDateStandard } from "@/src/utils/date";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

const useEventDetail = () => {
  const { setToaster } = useContext(ToasterContext);
  const { query, isReady } = useRouter();

  const getEventBySlug = async (slug: string) => {
    const { data } = await eventServices.getEventBySlug(slug);
    return data.data;
  };

  const { data: dataEvent, refetch: refetchEvent } = useQuery({
    queryKey: ["EventDetail"],
    queryFn: () => getEventBySlug(query.slug as string),
    enabled: isReady && !!query.slug,
  });

  const updateEvent = async (data: IEvent) => {
    const result = await eventServices.updateEvent(`${dataEvent._id}`, data);
    return result;
  };

  const {
    mutate: mutateUpdateEvent,
    isPending: isPendingUpdateEvent,
    isSuccess: isSuccessUpdateEvent,
  } = useMutation({
    mutationKey: ["updateEvent"],
    mutationFn: updateEvent,
    onError: (error) => {
      setToaster({ type: "error", message: error.message });
    },
    onSuccess: () => {
      refetchEvent();
      setToaster({ type: "success", message: "Success update event" });
    },
  });

  const regionId = dataEvent?.location?.region;

  const {
    data: dataDefaultRegion,
    isPending: isPendingDefaultRegion,
    refetch: refetchDefaultRegion,
  } = useQuery({
    queryKey: ["defaultRegion", regionId],
    queryFn: () => eventServices.getRegencyById(regionId),
    enabled: !!regionId,
  });

  const handleUpdateBanner = (payload: { banner: FileList | string }) => {
    mutateUpdateEvent(payload);
  };

  const handleUpdateInfo = (data: IEventForm) => {
    const payload = {
      name: data.name || dataEvent.name,
      slug: data.slug || dataEvent.slug,
      category: data.category || dataEvent.category,
      startDate: toDateStandard(data.startDate) || dataEvent.startDate,
      endDate: toDateStandard(data.endDate) || dataEvent.endDate,
      isPublish: convertStringToBoolean(data.isPublish) || dataEvent.isPublish,
      isFeatured:
        convertStringToBoolean(data.isFeatured) || dataEvent.isFeatured,
      isOnline: convertStringToBoolean(data.isOnline) || dataEvent.isOnline,
      description: data.description || dataEvent.description,
    };

    mutateUpdateEvent(payload);
  };

  const handleUpdateLocation = (data: IEventForm) => {
    const payload = {
      isOnline: convertStringToBoolean(data.isOnline) || dataEvent.isOnline,
      location: {
        region: data.region || dataEvent.region,
        coordinates: [Number(data.latitude), Number(data.longitude)],
        address: data.address || dataEvent.address,
      },
    };
    mutateUpdateEvent(payload);
  };

  const getTicketByEventId = async () => {
    const { data } = await eventServices.getTicketsByEventId(
      `${dataEvent._id}`,
    );

    return data.data;
  };

  const {
    data: dataTicket,
    isLoading: isLoadingTickets,
    isRefetching: isRefetchingTickets,
    refetch: refetchTickets,
  } = useQuery({
    queryKey: ["Tickets", dataEvent?._id],
    queryFn: getTicketByEventId,
    enabled: isReady,
  });

  return {
    dataEvent,
    refetchEvent,

    handleUpdateBanner,
    handleUpdateInfo,
    handleUpdateLocation,

    isPendingUpdateEvent,
    isSuccessUpdateEvent,

    dataDefaultRegion,
    isPendingDefaultRegion,
    refetchDefaultRegion,

    dataTicket,
    isLoadingTickets,
    isRefetchingTickets,
    refetchTickets,
  };
};

export default useEventDetail;
