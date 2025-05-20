import { ToasterContext } from "@/src/contexts/ToasterContext";
import { ILogin } from "@/src/types/Auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const loginSchema = yup.object().shape({
  identifier: yup.string().required("Please input your username or email"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Please input your password"),
});

const useLogin = () => {
  const router = useRouter();
  const callbackUrl: string = (router.query.callbackUrl as string) || "/";
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const handleVisiblePassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const { setToaster } = useContext(ToasterContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({ resolver: yupResolver(loginSchema) });

  const loginService = async (payload: ILogin) => {
    const result = await signIn("credentials", {
      ...payload,
      redirect: false,
      callbackUrl,
    });

    if (result?.error) {
      throw new Error("Username or password is incorrect");
    }
    return result;
  };

  const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation({
    mutationFn: loginService,
    onError: (error) => {
      setToaster({ type: "error", message: error.message });
    },
    onSuccess: () => {
      reset();
      setToaster({ type: "success", message: "Login Success" });
      router.push(callbackUrl);
    },
  });

  const handleLogin = (data: ILogin) => mutateLogin(data);

  return {
    isPasswordVisible,
    handleVisiblePassword,
    control,
    handleSubmit,
    handleLogin,
    isPendingLogin,
    errors,
  };
};

export default useLogin;
