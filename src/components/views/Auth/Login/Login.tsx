import AuthLayout from "@/src/components/layouts/AuthLayout";
import {
  Button,
  button,
  Card,
  CardBody,
  Input,
  Spinner,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { Controller } from "react-hook-form";
import useLogin from "./useLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const Login = () => {
  const {
    isPasswordVisible,
    handleVisiblePassword,
    control,
    handleLogin,
    handleSubmit,
    isPendingLogin,
    errors,
  } = useLogin();
  console.log(errors);
  return (
    <div className="flex lg:flex-row flex-col justify-center items-center gap-10 lg-gap-20 w-full">
      <div className="flex flex-col justify-center items-center gap-10 w-full lg:w-1/3">
        <Image
          src={"/images/general/logo.svg"}
          alt="logo"
          width={180}
          height={180}
        />
        <Image
          src={"/images/illustrations/login.svg"}
          alt="logo"
          className="w-2/3 lg:w-full"
          width={1024}
          height={1024}
        />
      </div>

      <Card className="w-full lg:w-max">
        <CardBody className="p-5 lg:p-8">
          <h1 className="font-bold text-danger-500 text-xl">Login</h1>
          <p className="text-sm">
            Don&apos;t have an account{" "}
            <Link
              href={"/auth/register"}
              className="font-semibold text-danger-400"
            >
              Register here
            </Link>
          </p>
          {errors.root && (
            <p className="font-medium text-danger-500 text-sm">
              {errors.root.message}
            </p>
          )}
          <form
            className="flex flex-col gap-4 mt-3 lg:w-80"
            onSubmit={handleSubmit(handleLogin)}
          >
            <Controller
              control={control}
              name="identifier"
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  label="Email or Username"
                  variant="bordered"
                  autoComplete="off"
                  isInvalid={errors.identifier !== undefined}
                  errorMessage={errors.identifier?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <Input
                  {...field}
                  type={isPasswordVisible ? "text" : "password"}
                  label="Password"
                  variant="bordered"
                  autoComplete="off"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={handleVisiblePassword}
                    >
                      {isPasswordVisible ? (
                        <FaEye className="text-default-500 text-xl pointer-events-none" />
                      ) : (
                        <FaEyeSlash className="text-default-500 text-xl pointer-events-none" />
                      )}
                    </button>
                  }
                  isInvalid={errors.password !== undefined}
                  errorMessage={errors.password?.message}
                />
              )}
            />

            <Button color="danger" type="submit" size="lg">
              {isPendingLogin ? <Spinner size="sm" color="white" /> : "Login"}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
