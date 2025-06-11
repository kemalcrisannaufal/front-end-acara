import eventServices from "@/src/services/event.service";
import { IEvent } from "@/src/types/Event";
import { ICart, ITicket } from "@/src/types/Ticket";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { DEFAULT_CART } from "./EventDetail.constants";

const useEventDetail = () => {
  const { isReady, query } = useRouter();

  const getEventDetail = async (): Promise<IEvent> => {
    const { data } = await eventServices.getEventBySlug(`${query.slug}`);
    return data.data;
  };

  const getTicketsByEvent = async (): Promise<ITicket[]> => {
    const { data } = await eventServices.getTicketsByEventId(
      `${dataEvent?._id}`,
    );
    return data.data;
  };

  const { data: dataEvent, isPending: isPendingEvent } = useQuery({
    queryKey: ["EventDetail"],
    queryFn: getEventDetail,
    enabled: isReady && !!query.slug,
  });

  const { data: dataTicket, isPending: isPendingTicket } = useQuery({
    queryKey: ["TicketsByEvent"],
    queryFn: getTicketsByEvent,
    enabled: isReady && !!query.slug && !!dataEvent?._id,
  });

  const [cart, setCart] = useState<ICart>(DEFAULT_CART);

  const dataTicketInCart = useMemo(() => {
    if (dataTicket) {
      return dataTicket.find((ticket: ITicket) => ticket._id === cart.ticket);
    }
    return null;
  }, [dataTicket, cart]);

  const handleAddToCart = (ticket: string) => {
    setCart({ events: `${dataEvent?._id}`, ticket, quantity: 1 });
  };

  const handleChangeQuantity = (type: "increment" | "decrement") => {
    if (type === "increment") {
      if (cart.quantity < dataTicketInCart?.quantity!) {
        setCart((prev: ICart) => ({
          ...prev,
          quantity: prev.quantity + 1,
        }));
      }
    } else {
      if (cart.quantity <= 1) {
        setCart(DEFAULT_CART);
      } else {
        setCart((prev: ICart) => ({
          ...prev,
          quantity: prev.quantity - 1,
        }));
      }
    }
  };

  return {
    dataEvent,
    isPendingEvent,
    dataTicket,
    isPendingTicket,

    cart,
    dataTicketInCart,
    handleAddToCart,
    handleChangeQuantity,
  };
};

export default useEventDetail;
