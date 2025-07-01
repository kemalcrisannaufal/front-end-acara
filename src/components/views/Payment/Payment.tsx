import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import usePayment from "./usePayment";
import { useEffect } from "react";

const Payment = () => {
  const router = useRouter();
  const { mutateUpdateOrderStatus } = usePayment();
  const { order_id, status } = router.query;

  useEffect(() => {
    if (router.isReady) {
      mutateUpdateOrderStatus();
    }
  }, [router.isReady]);
  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col items-center justify-center gap-10">
        <Image
          src={"/images/general/logo.svg"}
          alt="logo"
          width={180}
          height={180}
        />
        <Image
          src={
            status === "success"
              ? "/images/illustrations/success.svg"
              : "/images/illustrations/pending.svg"
          }
          alt="register-success"
          width={300}
          height={300}
        />
      </div>

      <div className="mt-10 flex flex-col items-center gap-2">
        <h1 className="text-xl font-bold capitalize text-danger-500">
          Transaction {status}
        </h1>

        <Button
          variant="ghost"
          color="danger"
          onPress={() => router.push(`/member/transaction/${order_id}`)}
        >
          Check your transaction here
        </Button>
      </div>
    </div>
  );
};

export default Payment;
