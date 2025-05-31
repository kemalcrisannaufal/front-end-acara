import { Tab, Tabs } from "@nextui-org/react";
import CoverTab from "./CoverTab";
import useEventDetail from "./useEventDetail";
import InfoTab from "./InfoTab";
import LocationTab from "./LocationTab";
import TicketTab from "./TicketTab";

const EventDetail = () => {
  const {
    dataEvent,
    dataDefaultRegion,
    handleUpdateBanner,
    handleUpdateInfo,
    handleUpdateLocation,

    isPendingUpdateEvent,
    isSuccessUpdateEvent,
    isPendingDefaultRegion,

    refetchDefaultRegion,

    dataTicket,
    isLoadingTickets,
    isRefetchingTickets,
    refetchTickets,
  } = useEventDetail();

  return (
    <div>
      <Tabs>
        <Tab key={"cover"} title={"Cover"}>
          <CoverTab
            currentCover={dataEvent?.banner}
            isPendingUpdate={isPendingUpdateEvent}
            isSuccessUpdate={isSuccessUpdateEvent}
            onUpdate={handleUpdateBanner}
          />
        </Tab>
        <Tab key={"info"} title={"Info"}>
          <InfoTab
            dataEvent={dataEvent}
            isPendingUpdate={isPendingUpdateEvent}
            isSuccessUpdate={isSuccessUpdateEvent}
            onUpdate={handleUpdateInfo}
          />
        </Tab>
        <Tab key={"location"} title={"Location"}>
          <LocationTab
            dataEvent={dataEvent}
            isPendingUpdate={isPendingUpdateEvent}
            isSuccessUpdate={isSuccessUpdateEvent}
            onUpdate={handleUpdateLocation}
            isPendingDefaultRegion={isPendingDefaultRegion}
            defaultRegion={dataDefaultRegion?.data.data[0].name}
            refetchDefaultRegion={refetchDefaultRegion}
          />
        </Tab>
        <Tab key={"ticket"} title={"Ticket"}>
          <TicketTab
            dataTicket={dataTicket}
            isLoadingTickets={isLoadingTickets}
            isRefetchingTickets={isRefetchingTickets}
            refetchTickets={refetchTickets}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default EventDetail;
