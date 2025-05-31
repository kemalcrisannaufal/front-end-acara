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
import { ITicket } from "@/src/types/Event";

interface Proptypes {
  dataTicket: ITicket[];
  isLoadingTickets: boolean;
  isRefetchingTickets: boolean;
  refetchTickets: () => void;
}

const TicketTab = (props: Proptypes) => {
  const { dataTicket, isLoadingTickets, isRefetchingTickets, refetchTickets } =
    props;

  const { isReady, query, push } = useRouter();
  const { selectedId, setSelectedId } = useTicketTab();

  const addTicket = useDisclosure();
  const updateTicket = useDisclosure();
  const deleteTicket = useDisclosure();

  const renderCell = useCallback(
    (event: Record<string, unknown>, columnKey: Key) => {
      const cellValue = event[columnKey as keyof typeof event];

      switch (columnKey) {
        case "actions":
          return (
            <DropdownActions
              onPressButtonDelete={() => {
                setSelectedId(event._id as string);
                deleteTicket.onOpen();
              }}
              onPressButtonDetail={() => {
                setSelectedId(event._id as string);
                updateTicket.onOpen();
              }}
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
        <CardHeader className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-semibold">Event Ticket</h2>
            <p className="text-small text-default-400">
              Manage ticket of this event
            </p>
          </div>
          <Button variant="solid" color="danger">
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
              onClickButtonTopContent={addTicket.onOpen}
              renderCell={renderCell}
              showSearch={false}
              showLimit={false}
              totalPages={1}
            />
          )}
        </CardBody>
      </Card>
    </section>
  );
};
export default TicketTab;
