import CardEvent from "@/src/components/ui/CardEvent";
import { IEvent } from "@/src/types/Event";
import Link from "next/link";

interface Proptypes {
  title: string;
  events: IEvent[];
  isLoading: boolean;
}

const HomeList = (props: Proptypes) => {
  const { title, events, isLoading } = props;
  return (
    <section className="mb-16">
      <div className="flex items-center justify-between px-6 lg:px-0">
        <h2 className="text-2xl font-bold text-danger">{title}</h2>
        <Link href="/events" className="font-semibold">
          See more
        </Link>
      </div>
      <div className="grid auto-cols-[20rem] grid-flow-col gap-6 overflow-x-auto py-2 lg:grid-cols-4 lg:px-1">
        {!isLoading
          ? events.map((event: IEvent) => (
              <CardEvent key={`card-event-${event._id}`} event={event} />
            ))
          : Array.from({ length: 4 }).map(
              (_, index) =>
                // <CardEventSkeleton key={`card-event-skeleton-${index}`} />
                null,
            )}
      </div>
    </section>
  );
};

export default HomeList;
