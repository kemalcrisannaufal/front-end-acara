import { ToasterContext } from "@/src/contexts/ToasterContext";
import useMediaHandling from "@/src/hooks/useMediaHandling";
import eventServices from "@/src/services/event.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteEventModal = () => {
  const { setToaster } = useContext(ToasterContext);
  const { handleDeleteFile } = useMediaHandling();

  const deleteEvent = async (id: string) => {
    const result = await eventServices.deleteEvent(id);
    return result.data.data.banner;
  };

  const deleteBanner = async (fileUrl: string) => {
    handleDeleteFile(fileUrl, () => {
      setToaster({ type: "success", message: "Success delete event" });
    });
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
    onSuccess: (fileUrl) => {
      deleteBanner(fileUrl);
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
