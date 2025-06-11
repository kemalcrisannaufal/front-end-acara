import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  useDisclosure,
} from "@nextui-org/react";
import DataTable from "@/src/components/ui/DataTable";
import { COLUMNS_LIST_TICKET } from "./Ticket.constants";
import useChangeUrl from "@/src/hooks/useChangeUrl";
import { DropdownActions } from "@/src/components/common/DropdownActions";
import useTicketTab from "./useTicketTab";
import AddTicketModal from "./AddTicketModal";
import DeleteTicketModal from "./DeleteTicketModal";
import UpdateTicketModal from "./UpdateTicketModal";
import { ITicket } from "@/src/types/Ticket";

interface Proptypes {
  dataTicket: ITicket[];
  isLoadingTickets: boolean;
  isRefetchingTickets: boolean;
  refetchTickets: () => void;
  eventId: string;
}

const TicketTab = (props: Proptypes) => {
  const {
    dataTicket,
    isLoadingTickets,
    isRefetchingTickets,
    refetchTickets,
    eventId,
  } = props;

  const { isReady, query, push } = useRouter();
  const { selectedId, setSelectedId, selectedTicket, setSelectedTicket } =
    useTicketTab();

  const addTicket = useDisclosure();
  const updateTicket = useDisclosure();
  const deleteTicket = useDisclosure();

  const renderCell = useCallback(
    (ticket: Record<string, unknown>, columnKey: Key) => {
      const cellValue = ticket[columnKey as keyof typeof ticket];

      switch (columnKey) {
        case "actions":
          return (
            <DropdownActions
              onPressButtonDelete={() => {
                setSelectedId(ticket._id as string);
                deleteTicket.onOpen();
              }}
              onPressButtonDetail={() => {
                setSelectedTicket(ticket as unknown as ITicket);
                updateTicket.onOpen();
              }}
              textButtonDetail="Update"
            />
          );

        default:
          return cellValue as ReactNode;
      }
    },
    [],
  );

  return (
    <section>
      <Card className="w-full p-2">
        <CardHeader className="flex flex-col items-start gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
          <div>
            <h2 className="font-semibold">Event Ticket</h2>
            <p className="text-small text-default-400">
              Manage ticket of this event
            </p>
          </div>
          <Button
            variant="solid"
            color="danger"
            onPress={() => addTicket.onOpen()}
          >
            Add New Ticket
          </Button>
        </CardHeader>
        <CardBody>
          {Object.keys(query).length > 0 && (
            <DataTable
              buttonTopContentLabel="Add New Ticket"
              columns={COLUMNS_LIST_TICKET}
              data={
                dataTicket ? dataTicket.map((ticket) => ({ ...ticket })) : []
              }
              emptyContent="Ticket is empty"
              isLoading={isLoadingTickets || isRefetchingTickets}
              renderCell={renderCell}
              showSearch={false}
              showLimit={false}
              totalPages={1}
            />
          )}
        </CardBody>
      </Card>

      <AddTicketModal
        {...addTicket}
        refetchTickets={refetchTickets}
        eventId={eventId}
      />

      <UpdateTicketModal
        {...updateTicket}
        refetchTickets={refetchTickets}
        selectedTicket={selectedTicket}
        setSelectedTicket={setSelectedTicket}
      />

      <DeleteTicketModal
        {...deleteTicket}
        refetchTickets={refetchTickets}
        selectedId={selectedId}
      />
    </section>
  );
};
export default TicketTab;
