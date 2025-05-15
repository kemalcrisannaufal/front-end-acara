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
import useRegister from "./useRegister";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Controller } from "react-hook-form";
import { cn } from "@/src/utils/cn";
const Register = () => {
  const {
    visiblePassword,
    handleVisiblePassword,
    control,
    handleSubmit,
    handleRegister,
    isPendingRegister,
    errors,
  } = useRegister();

  return (
    <div className="flex lg:flex-row flex-col justify-center items-center gap-10 lg:gap-20 w-full">
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
          <h2 className="font-bold text-danger-500 text-xl">Create Account</h2>
          <p className="text-sm">
            Have an account?&nbsp;
            <Link href="/auth/login" className="font-semibold text-danger-400">
              Login here
            </Link>
          </p>
          {errors.root && (
            <p className="font-medium text-danger-500 text-sm">
              {errors.root.message}
            </p>
          )}
          <form
            className={cn(
              "mt-3 flex flex-col lg:w-80",
              Object.keys(errors).length > 0 ? "gap-2" : "gap-4",
            )}
            onSubmit={handleSubmit(handleRegister)}
          >
            <Controller
              name="fullname"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  label="Fullname"
                  variant="bordered"
                  autoComplete="off"
                  isInvalid={errors.fullname !== undefined}
                  errorMessage={errors.fullname?.message}
                />
              )}
            />

            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  label="Username"
                  variant="bordered"
                  autoComplete="off"
                  isInvalid={errors.username !== undefined}
                  errorMessage={errors.username?.message}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="email"
                  label="Email"
                  variant="bordered"
                  autoComplete="off"
                  isInvalid={errors.email !== undefined}
                  errorMessage={errors.email?.message}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type={visiblePassword.password ? "text" : "password"}
                  label="Password"
                  variant="bordered"
                  autoComplete="off"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={() => handleVisiblePassword("password")}
                    >
                      {visiblePassword.password ? (
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

            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type={visiblePassword.confirmPassword ? "text" : "password"}
                  label="Password Confirmation"
                  variant="bordered"
                  autoComplete="off"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={() => handleVisiblePassword("confirmPassword")}
                    >
                      {visiblePassword.confirmPassword ? (
                        <FaEye className="text-default-500 text-xl pointer-events-none" />
                      ) : (
                        <FaEyeSlash className="text-default-500 text-xl pointer-events-none" />
                      )}
                    </button>
                  }
                  isInvalid={errors.confirmPassword !== undefined}
                  errorMessage={errors.confirmPassword?.message}
                />
              )}
            />

            <Button color="danger" size="lg" type="submit">
              {isPendingRegister ? (
                <Spinner color="white" size="sm" />
              ) : (
                "Register"
              )}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Register;
