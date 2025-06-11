import { Card, CardBody, CardHeader } from "@nextui-org/react";

const HomeAnnouncement = () => {
  return (
    <Card
      shadow="md"
      className="mx-6 mb-5 border border-danger-500 bg-danger-50 p-3 lg:mx-0"
    >
      <CardHeader>
        <h2 className="text-lg font-semibold">❗For Demo Only</h2>
      </CardHeader>
      <CardBody>
        <ul className="list-disc pl-5 text-xs text-foreground-600 md:text-sm">
          <li>
            This website is for{" "}
            <span className="font-bold">demo and portfolio purposes only.</span>
          </li>
          <li>
            All transactions use the Midtrans sandbox environment, and{" "}
            <span className="font-bold">
              no real payments will be processed
            </span>
            .
          </li>
          <li>
            Any attempts to make real payments (e.g., scanning the QR code with
            a real banking or e-wallet app) may result in lost funds and cannot
            be refunded.
          </li>
          <li>
            The developer is not responsible for any financial loss.{" "}
            <span className="font-bold">Do not attempt real transactions.</span>
          </li>
          <li>
            Use{" "}
            <a
              href="https://simulator.sandbox.midtrans.com/"
              className="font-bold text-foreground-600"
            >
              Midtrans Simulator{" "}
            </a>
            to simulate transactions:
          </li>
        </ul>
      </CardBody>
    </Card>
  );
};

export default HomeAnnouncement;
