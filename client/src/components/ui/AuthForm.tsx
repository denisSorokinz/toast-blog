"use client";

import { SubmitHandler, set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FC, useState } from "react";
import { useMutation } from "@apollo/client";
import { MUTATION_LOGIN, MUTATION_SIGN_UP } from "@/queries";
import useAuthStore from "@/stores/auth";
import {
  AUTH_OPERATIONS,
  AuthResponse,
  LoginResponse,
  SignUpResponse,
} from "@/types";
import { authAction } from "@/lib/actions";

const validationSchema = z
  .object({
    login: z.string().min(1, { message: "Login is required" }),
    password: z
      .string()
      .min(4, { message: "Password must be at least 4 characters" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match",
  });
type FormData = z.infer<typeof validationSchema>;

type Props = {
  onAuthSuccess?: () => void;
  Heading?: FC;
  Footer?: FC;
};

const AuthForm: FC<Props> = ({ onAuthSuccess, Heading, Footer }) => {
  const [mode, setMode] = useState<AUTH_OPERATIONS>(AUTH_OPERATIONS.LOGIN);
  const toggleMode = () =>
    setMode(
      mode === AUTH_OPERATIONS.LOGIN
        ? AUTH_OPERATIONS.SIGN_UP
        : AUTH_OPERATIONS.LOGIN,
    );

  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const {
    register,
    handleSubmit,
    formState: { errors },
    ...form
  } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
  });

  const [message, setMessage] = useState("");

  const onValid = async ({ login, password }: FormData) => {
    const operation = mode;
    const res = await authAction({ operation, login, password });

    if (operation === AUTH_OPERATIONS.LOGIN) {
      const token = (res as LoginResponse).login.accessToken;
      setAccessToken(token);

      form.reset();
      onAuthSuccess && onAuthSuccess();
    }

    if (
      operation === AUTH_OPERATIONS.SIGN_UP &&
      (res as SignUpResponse).signUp.success
    )
      setMessage("Sign up successfully");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <div className="flex flex-col gap-2 p-4 md:gap-4">
          {Heading && <Heading />}
          <div className="flex flex-col gap-1">
            <label
              className="block text-sm font-bold text-gray-700"
              htmlFor="login"
            >
              Login:
            </label>
            <input
              className={`w-full border px-3 py-2 text-sm leading-tight text-gray-700 ${
                errors.login && "border-red-500"
              } focus:shadow-outline appearance-none rounded focus:outline-none`}
              id="login"
              type="login"
              placeholder="login..."
              {...register("login")}
            />
            {errors.login && (
              <p className="mt-2 text-xs italic text-red-500">
                {errors.login?.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2 md:flex-row">
            <div className="flex flex-col gap-1">
              <label
                className="block text-sm font-bold text-gray-700"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className={`w-full border px-3 py-2 text-sm leading-tight text-gray-700 ${
                  errors.password && "border-red-500"
                } focus:shadow-outline appearance-none rounded focus:outline-none`}
                id="password"
                type="password"
                placeholder="password..."
                {...register("password")}
              />
              {errors.password && (
                <p className="mt-2 text-xs italic text-red-500">
                  {errors.password?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label
                className="block text-sm font-bold text-gray-700"
                htmlFor="c_password"
              >
                Confirm Password
              </label>
              <input
                className={`w-full border px-3 py-2 text-sm leading-tight text-gray-700 ${
                  errors.confirmPassword && "border-red-500"
                } focus:shadow-outline appearance-none rounded focus:outline-none`}
                id="c_password"
                type="password"
                placeholder="password..."
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="mt-2 text-xs italic text-red-500">
                  {errors.confirmPassword?.message}
                </p>
              )}
            </div>
          </div>
          <hr />
          <span className="text-purple-500">
            {mode === AUTH_OPERATIONS.LOGIN && (
              <>
                Don&apos;t have an account?{" "}
                <button
                  className="underline underline-offset-4 hover:text-purple-600"
                  onClick={toggleMode}
                >
                  Sign Up
                </button>
              </>
            )}
            {mode === AUTH_OPERATIONS.SIGN_UP && (
              <>
                Already have an account?{" "}
                <button
                  className="underline underline-offset-4 hover:text-purple-600"
                  onClick={toggleMode}
                >
                  Login
                </button>
              </>
            )}
          </span>
          {mode === AUTH_OPERATIONS.SIGN_UP && message && (
            <span className="text-green-300">{message}</span>
          )}
        </div>
        {Footer && <Footer />}
      </form>
    </>
  );
};

export default AuthForm;
