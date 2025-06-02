import { IEvent } from "@/src/types/Event";
import { Card, CardBody } from "@nextui-org/react";
import Image from "next/image";

interface Proptypes {
  event: IEvent;
}

const CardEvent = (props: Proptypes) => {
  const { event } = props;
  return (
    <Card>
      <CardBody>
        <Image
          src={`${event?.banner}`}
          alt={`${event?.name}`}
          width={300}
          height={200}
        />
        <div className="mt-2">
          <h2 className="font-bold text-danger-500 text-md">{event?.name}</h2>
          <p className="text-default-700 text-sm line-clamp-2">
            {event?.description}
          </p>
        </div>
      </CardBody>
    </Card>
  );
};

export default CardEvent;
