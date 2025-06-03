import CardEvent from "@/src/components/ui/CardEvent";
import { LIMIT_DEFAULT, PAGE_DEFAULT } from "@/src/constants/list.constants";
import { IEvent } from "@/src/types/Event";
import Link from "next/link";

interface Proptypes {
  title: string;
  events: IEvent[];
  isLoading: boolean;
  href?: string;
}

const HomeEventList = (props: Proptypes) => {
  const {
    title,
    events,
    isLoading,
    href = `/event?limit=${LIMIT_DEFAULT}&page=${PAGE_DEFAULT}&search=`,
  } = props;
  return (
    <section className="mx-6 mb-16 lg:mx-0">
      <div className="flex items-center justify-between px-0">
        <h2 className="text-2xl font-bold text-danger">{title}</h2>
        <Link href={href} className="font-semibold">
          See more
        </Link>
      </div>
      <div className="grid auto-cols-[20rem] grid-flow-col gap-6 overflow-x-auto py-2 lg:grid-cols-4 lg:px-1">
        {!isLoading
          ? events.map((event: IEvent) => (
              <CardEvent
                key={`card-event-${event._id}`}
                event={event}
                isLoading={false}
              />
            ))
          : Array.from({ length: 4 }).map((_, index) => (
              <CardEvent
                key={`card-event-skeleton-${index}`}
                event={{} as IEvent}
                isLoading={true}
              />
            ))}
      </div>
    </section>
  );
};

export default HomeEventList;
