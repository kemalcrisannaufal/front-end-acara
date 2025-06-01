import { ToasterContext } from "@/src/contexts/ToasterContext";
import eventServices from "@/src/services/event.service";
import { ITicket, ITicketForm } from "@/src/types/Event";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const ticketSchema = yup.object().shape({
  name: yup.string().required("Please input name"),
  price: yup.string().required("Please input price"),
  quantity: yup.string().required("Please input quantity"),
  description: yup.string().required("Please input description"),
});

const useAddTicketModal = (eventId: string) => {
  const { setToaster } = useContext(ToasterContext);
  const {
    control: controlAddTicket,
    formState: { errors: errorsAddTicket },
    handleSubmit: handleSubmitAddTicket,
    reset: resetAddTicket,
  } = useForm({
    resolver: yupResolver(ticketSchema),
  });

  const addTicket = async (payload: ITicket) => {
    const result = await eventServices.createTicket(payload);
    return result;
  };

  const {
    mutate: mutateAddTicket,
    isPending: isPendingAddTicket,
    isSuccess: isSuccessAddTicket,
  } = useMutation({
    mutationKey: ["addTicket"],
    mutationFn: addTicket,
    onError: (error) => {
      setToaster({ type: "error", message: error.message });
    },
    onSuccess: () => {
      resetAddTicket();
      setToaster({ type: "success", message: "Success add ticket" });
    },
  });

  const handleAddTicket = (data: ITicketForm) => {
    const payload: ITicket = {
      ...data,
      price: Number(data.price),
      quantity: Number(data.quantity),
      event: eventId,
    };

    mutateAddTicket(payload);
  };

  return {
    controlAddTicket,
    errorsAddTicket,
    handleSubmitAddTicket,
    resetAddTicket,

    handleAddTicket,
    isPendingAddTicket,
    isSuccessAddTicket,
  };
};

export default useAddTicketModal;
