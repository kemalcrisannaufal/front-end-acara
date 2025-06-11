import { ToasterContext } from "@/src/contexts/ToasterContext";
import eventServices from "@/src/services/event.service";
import { ITicket, ITicketForm } from "@/src/types/Ticket";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const ticketSchema = yup.object().shape({
  name: yup.string().required("Please input name"),
  price: yup.string().required("Please input price"),
  quantity: yup.string().required("Please input quantity"),
  description: yup.string().required("Please input description"),
});

const useUpdateTicketModal = (id: string) => {
  const { setToaster } = useContext(ToasterContext);

  const {
    control: controlUpdateTicket,
    formState: { errors: errorsUpdateTicket },
    handleSubmit: handleSubmitUpdateTicket,
    setValue: setValueUpdateTicket,
  } = useForm({
    resolver: yupResolver(ticketSchema),
  });

  const updateTicket = async (payload: ITicket) => {
    const result = await eventServices.updateTicket(id, payload);
    return result;
  };

  const {
    mutate: mutateUpdateTicket,
    isPending: isPendingUpdateTicket,
    isSuccess: isSuccessUpdateTicket,
  } = useMutation({
    mutationKey: ["updateTicket"],
    mutationFn: updateTicket,
    onError: (error) => {
      setToaster({ type: "error", message: error.message });
    },
    onSuccess: () => {
      setToaster({ type: "success", message: "Success update ticket" });
    },
  });

  const handleUpdateTicket = (data: ITicketForm) => {
    const payload: ITicket = {
      ...data,
      price: Number(data.price),
      quantity: Number(data.quantity),
    };

    mutateUpdateTicket(payload);
  };

  return {
    controlUpdateTicket,
    errorsUpdateTicket,
    handleSubmitUpdateTicket,
    setValueUpdateTicket,

    isPendingUpdateTicket,
    isSuccessUpdateTicket,
    handleUpdateTicket,
  };
};

export default useUpdateTicketModal;
