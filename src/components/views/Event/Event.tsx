import { IEvent } from "@/src/types/Event";
import CardEvent from "../../ui/CardEvent";
import EventFilter from "./EventFilter";
import useEvent from "./useEvent";
import useChangeUrl from "@/src/hooks/useChangeUrl";
import { useEffect } from "react";
import EventFooter from "./EventFooter";
import Image from "next/image";
import { useRouter } from "next/router";

const Event = () => {
  const { isReady } = useRouter();
  const { dataEvent, isLoadingEvent, refetchEvents, isRefetchingEvent } =
    useEvent();
  const {
    currentLimit,
    currentPage,
    currentCategory,
    currentIsOnline,
    currentIsFeatured,
    setURLExplore,
  } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setURLExplore();
    }
  }, [isReady]);

  useEffect(() => {
    refetchEvents();
  }, [
    currentLimit,
    currentPage,
    currentCategory,
    currentIsOnline,
    currentIsFeatured,
  ]);

  return (
    <div className="mx-6 flex flex-col gap-4 lg:mx-0 lg:flex-row">
      <EventFilter />
      <div className="w-full">
        {!isLoadingEvent && !isRefetchingEvent ? (
          dataEvent?.data?.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {dataEvent?.data?.map((event: IEvent) => (
                  <CardEvent
                    key={`card-event-${event._id}`}
                    event={event}
                    isLoading={false}
                  />
                ))}
              </div>
              <EventFooter
                totalPages={Number(dataEvent?.pagination?.totalPage)}
              />
            </>
          ) : (
            <div className="mt-3 flex flex-col items-center justify-center gap-4">
              <Image
                src={"/images/illustrations/no-data.svg"}
                alt="no-data"
                width={300}
                height={300}
              />
              <p className="text-2xl font-bold text-danger-500">
                No Data Found
              </p>
            </div>
          )
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <CardEvent
                key={`card-event-skeleton-${index}`}
                event={{}}
                isLoading={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Event;
