import { useRouter } from "next/router";
import useEvent from "./useEvent";
import { Key, ReactNode, useCallback, useEffect } from "react";
import Image from "next/image";
import { Chip, useDisclosure } from "@nextui-org/react";
import DataTable from "@/src/components/ui/DataTable";
import { COLUMNS_LIST_EVENT } from "./Event.constants";
import useChangeUrl from "@/src/hooks/useChangeUrl";
import { DropdownActions } from "@/src/components/common/DropdownActions";
import AddEventModal from "./AddEventModal";

const Event = () => {
  const { isReady, query } = useRouter();
  const {
    dataEvent,
    isLoadingEvent,
    isRefetchingEvent,
    refetchEvents,
    selectedId,
  } = useEvent();
  const { setURL } = useChangeUrl();

  const addEvent = useDisclosure();

  useEffect(() => {
    setURL();
  }, [isReady]);

  const renderCell = useCallback(
    (event: Record<string, unknown>, columnKey: Key) => {
      const cellValue = event[columnKey as keyof typeof event];

      switch (columnKey) {
        case "banner":
          return (
            <Image
              src={`${cellValue}` as string}
              alt="banner"
              width={100}
              height={100}
              className="aspect-video h-24 w-36 rounded-lg object-cover"
            />
          );

        case "isPublished":
          return (
            <Chip
              color={cellValue ? "success" : "warning"}
              variant="flat"
              size="sm"
            >
              {cellValue ? "Published" : "Not Published"}
            </Chip>
          );

        case "actions":
          return (
            <DropdownActions
              onPressButtonDelete={() => {}}
              onPressButtonDetail={() => {}}
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
      {Object.keys(query).length > 0 && (
        <DataTable
          buttonTopContentLabel="Create Event"
          columns={COLUMNS_LIST_EVENT}
          data={dataEvent?.data || []}
          emptyContent="Event not found"
          isLoading={isLoadingEvent || isRefetchingEvent}
          onClickButtonTopContent={addEvent.onOpen}
          renderCell={renderCell}
          totalPages={dataEvent?.pagination.totalPage}
        />
      )}

      <AddEventModal {...addEvent} refetchEvents={refetchEvents} />
    </section>
  );
};
export default Event;
