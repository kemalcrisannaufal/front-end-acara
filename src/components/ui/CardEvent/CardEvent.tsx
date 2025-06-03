import { IEvent } from "@/src/types/Event";
import { convertTime } from "@/src/utils/date";
import { Card, CardBody, CardFooter, Skeleton } from "@nextui-org/react";
import Image from "next/image";
import { Fragment } from "react";

interface Proptypes {
  event: IEvent;
  isLoading?: boolean;
  key?: string;
}

const CardEvent = (props: Proptypes) => {
  const { event, isLoading, key } = props;
  return (
    <Card shadow="sm" key={key}>
      {!isLoading ? (
        <CardBody>
          <Image
            src={`${event?.banner}`}
            alt={`${event?.name}`}
            width={1920}
            height={800}
            className="aspect-video w-full rounded-lg object-cover"
          />

          <CardFooter className="flex-col items-start text-left">
            <h2 className="line-clamp-1 text-lg font-bold text-danger-500">
              {event?.name}
            </h2>
            <p className="line-clamp-2 text-sm">{event?.description}</p>
            <p className="mt-2 text-sm text-default-700">
              {convertTime(`${event?.startDate}`)}
            </p>
          </CardFooter>
        </CardBody>
      ) : (
        <Fragment>
          <CardBody>
            <Skeleton className="aspect-video w-full rounded-lg" />
          </CardBody>
          <CardFooter className="flex-col items-start">
            <Skeleton className="mt-2 h-6 w-full" />
            <Skeleton className="mt-2 h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-3/4" />
            <Skeleton className="mt-2 h-3 w-1/2" />
          </CardFooter>
        </Fragment>
      )}
    </Card>
  );
};

export default CardEvent;
