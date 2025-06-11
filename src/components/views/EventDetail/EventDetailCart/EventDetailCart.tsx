import { ICart, ITicket } from "@/src/types/Ticket";
import { convertToIDR } from "@/src/utils/currency";
import { Button, Card, CardBody, Spinner } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

interface Proptypes {
  cart: ICart;
  dataTicketInCart: ITicket | undefined | null;
  onChangeQuantity: (type: "increment" | "decrement") => void;
  onCreateOrder: () => void;
  isLoading: boolean;
}

const EventDetailCart = (props: Proptypes) => {
  const { cart, dataTicketInCart, onChangeQuantity, onCreateOrder, isLoading } =
    props;
  const session = useSession();
  const router = useRouter();
  return (
    <Card radius="lg" className="border-none p-6 lg:sticky lg:top-[80px]">
      {session.status === "authenticated" ? (
        <CardBody className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-foreground-700">Cart</h2>
          {cart.ticket === "" ? (
            <p className="text-foreground-500">No tickets in cart</p>
          ) : (
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-foreground-600">
                  {dataTicketInCart?.name}
                </h4>
                <Button
                  size="md"
                  variant="bordered"
                  className="h-9 w-9 min-w-0 scale-80 rounded-full font-bold text-foreground-500"
                  onPress={() => onChangeQuantity("decrement")}
                >
                  -
                </Button>
                <span>{cart.quantity}</span>
                <Button
                  size="md"
                  variant="bordered"
                  className="h-9 w-9 min-w-0 scale-80 rounded-full font-bold text-foreground-500"
                  onPress={() => onChangeQuantity("increment")}
                >
                  +
                </Button>
              </div>
              <p className="font-semibold">
                {convertToIDR(Number(dataTicketInCart?.price) * cart.quantity)}
              </p>
            </div>
          )}
          <Button
            fullWidth
            variant="solid"
            color="danger"
            disabled={cart.ticket === "" || isLoading}
            className="disabled:opacity-20"
            onPress={onCreateOrder}
          >
            {isLoading ? <Spinner color="white" size="sm" /> : "Checkout"}
          </Button>
        </CardBody>
      ) : (
        <CardBody>
          <Button
            as={Link}
            fullWidth
            variant="solid"
            color="danger"
            href={`/auth/login?callbackUrl=/event/${router.query.slug}`}
          >
            Login to book ticket
          </Button>
        </CardBody>
      )}
    </Card>
  );
};

export default EventDetailCart;
