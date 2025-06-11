import { FaChevronLeft, FaClock, FaLocationDot } from "react-icons/fa6";
import useEventDetail from "./useEventDetail";
import { convertTime } from "@/src/utils/date";
import Image from "next/image";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Skeleton,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { ITicket } from "@/src/types/Ticket";
import EventDetailTicket from "./EventDetailTicket/EventDetailTicket";
import EventDetailCart from "./EventDetailCart";
import Script from "next/script";
import { environment } from "@/src/config/environment";

const EventDetail = () => {
  const {
    dataEvent,
    dataTicket,
    cart,
    handleAddToCart,
    dataTicketInCart,
    handleChangeQuantity,
    mutateCreateOrder,
    isPendingCreateOrder,
  } = useEventDetail();

  return (
    <div className="mx-6 lg:mx-0">
      <Script
        src={environment.MIDTRANS_SNAP_URL}
        data-client-key={environment.MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />
      <Breadcrumbs>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/event">Event</BreadcrumbItem>
        <BreadcrumbItem>{dataEvent?.name}</BreadcrumbItem>
      </Breadcrumbs>
      <section className="mt-5 flex flex-col gap-8 lg:mt-8 lg:flex-row">
        <div className="lg:w-2/3">
          <div className="flex flex-col gap-1.5">
            <Skeleton isLoaded={!!dataEvent} className="h-8 w-full rounded-lg">
              <h1 className="text-2xl font-bold text-danger-500">
                {dataEvent?.name}
              </h1>
            </Skeleton>

            <div className="flex items-center gap-2 text-default-600">
              <FaClock width={16} />
              <Skeleton
                isLoaded={!!dataEvent}
                className="mt-1 h-6 w-full rounded-lg"
              >
                <p className="text-xs md:text-sm">
                  {`${convertTime(`${dataEvent?.startDate}`)} - 
                ${convertTime(`${dataEvent?.endDate}`)}`}
                </p>
              </Skeleton>
            </div>

            <div className="flex items-center gap-2 text-default-600">
              <FaLocationDot width={16} />
              <Skeleton
                isLoaded={!!dataEvent}
                className="mt-1 h-6 w-full rounded-lg"
              >
                <p className="text-xs md:text-sm">
                  {dataEvent?.isOnline
                    ? "Online"
                    : `Offline - ${dataEvent?.location?.address}`}
                </p>
              </Skeleton>
            </div>
          </div>

          <Skeleton isLoaded={!!dataEvent} className="mt-5 w-full lg:h-[500px]">
            {dataEvent?.banner && (
              <Image
                src={`${dataEvent?.banner}`}
                alt={`${dataEvent?.name}`}
                width={1920}
                height={800}
                className="w-full rounded-md object-cover lg:h-[500px]"
              />
            )}
          </Skeleton>

          <Tabs fullWidth className="mt-5">
            <Tab key={"description"} title={"Description"}>
              <Skeleton isLoaded={!!dataEvent} className="w-full rounded-xl">
                <Card className="p-3">
                  <CardHeader>
                    <h2 className="font-semibold">Description</h2>
                  </CardHeader>
                  <CardBody>{dataEvent?.description}</CardBody>
                </Card>
              </Skeleton>
            </Tab>
            <Tab key={"Ticket"} title={"Ticket"}>
              <div className="flex flex-col gap-4">
                {dataTicket?.map((ticket: ITicket) => (
                  <EventDetailTicket
                    key={`${ticket._id}`}
                    ticket={ticket}
                    cart={cart}
                    handleAddToCart={() => handleAddToCart(`${ticket?._id}`)}
                  />
                ))}
              </div>
            </Tab>
          </Tabs>
        </div>

        <div className="w-full lg:w-1/3">
          <EventDetailCart
            cart={cart}
            dataTicketInCart={dataTicketInCart}
            onChangeQuantity={handleChangeQuantity}
            onCreateOrder={mutateCreateOrder}
            isLoading={isPendingCreateOrder}
          />
        </div>
      </section>
    </div>
  );
};
export default EventDetail;
