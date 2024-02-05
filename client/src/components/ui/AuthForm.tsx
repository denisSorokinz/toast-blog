"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { MUTATION_LOGIN, MUTATION_SIGN_UP } from "@/queries";

const validationSchema = z
  .object({
    login: z.string().min(1, { message: "Login is required" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match",
  });

type ValidationSchema = z.infer<typeof validationSchema>;

enum MODES {
  LOGIN,
  SIGN_UP,
}

const Form = () => {
  const [mode, setMode] = useState<MODES>(MODES.LOGIN);
  const toggleMode = () =>
    setMode(mode === MODES.LOGIN ? MODES.SIGN_UP : MODES.LOGIN);

  const {
    register,
    handleSubmit,
    formState: { errors },
    ...form
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const [loginMutationCb] = useMutation(MUTATION_LOGIN);
  const [signUpMutationCb] = useMutation(MUTATION_SIGN_UP);
  const onSubmit: SubmitHandler<ValidationSchema> = ({ login, password }) => {
    const fetcher = mode === MODES.LOGIN ? loginMutationCb : signUpMutationCb;

    fetcher({
      variables: {
        login,
        password,
      },
      onCompleted(data) {
        console.log("auth-request-completed:", data);
      },
    });
  };

  return (
    <form
      className="flex flex-col gap-2 md:gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
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
        {mode === MODES.LOGIN && (
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
        {mode === MODES.SIGN_UP && (
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
    </form>
  );
};

export default Form;
