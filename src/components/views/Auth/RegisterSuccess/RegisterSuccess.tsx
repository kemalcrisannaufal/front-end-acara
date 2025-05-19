import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";

const RegisterSuccess = () => {
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
          src={"/images/illustrations/email-send.svg"}
          alt="register-success"
          width={400}
          height={400}
        />
      </div>

      <div className="flex flex-col items-center gap-2 mt-10">
        <h1 className="font-bold text-danger-500 text-xl">
          Create Account Success
        </h1>
        <p className="mb-5 font-semibold text-default-500 text-md">
          Check your email for account activation
        </p>
        <Button variant="ghost" color="danger" onPress={() => router.push("/")}>
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default RegisterSuccess;
