import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";

interface Proptypes {
  status: "success" | "failed";
}

const Activation = (props: Proptypes) => {
  const { status } = props;
  const router = useRouter();
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col justify-center items-center gap-10">
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

      <div className="flex flex-col items-center gap-2 mt-10">
        <h1 className="font-bold text-danger-500 text-xl">
          Activation {status === "success" ? "Success" : "Failed"}
        </h1>
        <p className="mb-5 font-semibold text-default-500 text-md">
          {status === "success"
            ? "Thank you for register account in Acara"
            : "Confirmation code is invalid"}
        </p>
        <Button variant="ghost" color="danger" onClick={() => router.push("/")}>
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default Activation;
