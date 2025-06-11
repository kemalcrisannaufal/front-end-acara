import { ICart, ITicket } from "@/src/types/Ticket";
import { convertToIDR } from "@/src/utils/currency";
import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  Chip,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";

interface Proptypes {
  ticket: ITicket;
  cart: ICart;
  handleAddToCart: () => void;
}

const EventDetailTicket = (props: Proptypes) => {
  const { ticket, cart, handleAddToCart } = props;
  const session = useSession();
  return (
    <Card className="px-4 pb-4">
      <Accordion>
        <AccordionItem
          aria-label={ticket?.name}
          key={ticket?._id}
          className="border-b-2 border-dashed"
          title={
            <div className="flex items-center gap-2 pb-0">
              <h2 className="text-xl font-bold text-foreground-700">
                {ticket?.name}
              </h2>
              {Number(ticket?.quantity) > 0 ? (
                <Chip size="sm" color="success" variant="bordered">
                  Available
                </Chip>
              ) : (
                <Chip size="sm" color="danger" variant="bordered">
                  Sold Out
                </Chip>
              )}
            </div>
          }
        >
          <p>{ticket?.description}</p>
        </AccordionItem>
      </Accordion>
      <div className="mt-2 flex items-center justify-between p-2">
        <h2 className="text-lg font-semibold">{convertToIDR(ticket.price)}</h2>
        {session.status === "authenticated" && Number(ticket?.quantity) > 0 && (
          <Button
            size="md"
            variant="bordered"
            color="warning"
            className="font-bold disabled:text-foreground-500 disabled:opacity-20"
            disabled={cart?.ticket === ticket?._id}
            onPress={handleAddToCart}
          >
            Add To Cart
          </Button>
        )}
      </div>
    </Card>
  );
};
export default EventDetailTicket;
