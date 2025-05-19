import { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IRegister } from "@/src/types/Auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import authServices from "@/src/services/auth.service";

const registerSchema = yup.object().shape({
  fullname: yup.string().required("Please input your fullname"),
  username: yup.string().required("Please input your username"),
  email: yup
    .string()
    .email("Email is not valid")
    .required("Please input your email"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .test(
      "at-least-one-uppercase-letter",
      "Contains at least one uppercase letter",
      (value) => {
        const regex = /(?=.*[A-Z])/;
        return regex.test(value || "");
      },
    )
    .test("at-least-one-number", "Contains at least one number", (value) => {
      const regex = /(?=.*\d)/;
      return regex.test(value || "");
    })
    .required("Please input your password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Password does not match")
    .required("Please input your password"),
});

const useRegister = () => {
  const router = useRouter();
  const [visiblePassword, setVisiblePassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleVisiblePassword = (key: "password" | "confirmPassword") => {
    setVisiblePassword({
      ...visiblePassword,
      [key]: !visiblePassword[key],
    });
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const registerService = async (payload: IRegister) => {
    const result = await authServices.register(payload);
    return result;
  };

  const { mutate: mutateRegister, isPending: isPendingRegister } = useMutation({
    mutationFn: registerService,
    onError: (error) => {
      setError("root", {
        message: error.message,
      });
    },
    onSuccess: () => {
      router.push("/auth/register/success");
      reset();
    },
  });

  const handleRegister = (data: IRegister) => {
    mutateRegister(data);
  };

  return {
    visiblePassword,
    handleVisiblePassword,
    control,
    handleSubmit,
    handleRegister,
    isPendingRegister,
    errors,
  };
};

export default useRegister;
