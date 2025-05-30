import { ToasterContext } from "@/src/contexts/ToasterContext";
import eventServices from "@/src/services/event.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteEventModal = () => {
  const { setToaster } = useContext(ToasterContext);
  const deleteEvent = async (id: string) => {
    const result = await eventServices.deleteEvent(id);
    return result;
  };

  const {
    mutate: mutateDeleteEvent,
    isPending: isPendingMutateDeleteEvent,
    isSuccess: isSuccessMutateDeleteEvent,
  } = useMutation({
    mutationKey: ["deleteEvent"],
    mutationFn: deleteEvent,
    onError: () => {
      setToaster({ type: "error", message: "Error delete event" });
    },
    onSuccess: () => {
      setToaster({ type: "success", message: "Success delete event" });
    },
  });

  const handleDeleteEvent = (id: string) => mutateDeleteEvent(id);

  return {
    handleDeleteEvent,
    isPendingMutateDeleteEvent,
    isSuccessMutateDeleteEvent,
  };
};

export default useDeleteEventModal;
