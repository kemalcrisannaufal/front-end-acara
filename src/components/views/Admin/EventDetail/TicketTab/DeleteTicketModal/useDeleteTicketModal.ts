import { ToasterContext } from "@/src/contexts/ToasterContext";
import eventServices from "@/src/services/event.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteTicketModal = () => {
  const { setToaster } = useContext(ToasterContext);
  const deleteTicket = async (id: string) => {
    const result = await eventServices.deleteTicket(id);
    return result;
  };

  const {
    mutate: mutateDeleteTicket,
    isPending: isPendingMutateDeleteTicket,
    isSuccess: isSuccessMutateDeleteTicket,
  } = useMutation({
    mutationKey: ["deleteTicket"],
    mutationFn: deleteTicket,
    onError: () => {
      setToaster({ type: "error", message: "Failed delete ticket" });
    },
    onSuccess: () => {
      setToaster({ type: "success", message: "Success delete ticket" });
    },
  });

  const handleDeleteTicket = (id: string) => mutateDeleteTicket(id);

  return {
    handleDeleteTicket,
    isPendingMutateDeleteTicket,
    isSuccessMutateDeleteTicket,
  };
};

export default useDeleteTicketModal;
