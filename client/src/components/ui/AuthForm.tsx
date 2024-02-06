"use client";

import { SubmitHandler, set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FC, useState } from "react";
import { useMutation } from "@apollo/client";
import { MUTATION_LOGIN, MUTATION_SIGN_UP } from "@/queries";
import useAuthStore from "@/stores/auth";

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

type Props = {
  onAuthSuccess?: () => void;
  Heading?: FC;
  Footer?: FC;
};

type BaseResponse = {
  success: boolean;
  error?: string;
};
type LoginResponse = {
  login: BaseResponse & {
    accessToken: string;
  };
};
type SignUpResponse = {
  signUp: BaseResponse;
};
type AuthResponse = LoginResponse | SignUpResponse;

const AuthForm: FC<Props> = ({ onAuthSuccess, Heading, Footer }) => {
  const [mode, setMode] = useState<MODES>(MODES.LOGIN);
  const toggleMode = () =>
    setMode(mode === MODES.LOGIN ? MODES.SIGN_UP : MODES.LOGIN);

  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const [mutationLogin, loginData] = useMutation<LoginResponse>(MUTATION_LOGIN);
  const [mutationSignUp, signUpData] =
    useMutation<SignUpResponse>(MUTATION_SIGN_UP);

  const onSubmit: SubmitHandler<ValidationSchema> = ({
    login,
    password,
    ...rest
  }) => {
    const fetcher = mode === MODES.LOGIN ? mutationLogin : mutationSignUp;

    const onCompleted = (response: AuthResponse) => {
      if (mode === MODES.LOGIN) {
        const tRes = response as LoginResponse;

        if (tRes.login.success) setAccessToken(tRes.login.accessToken);

        onAuthSuccess && onAuthSuccess();
      }
      if (mode === MODES.SIGN_UP) {
        setMode(MODES.LOGIN);
        form.reset();
      }
    };

    fetcher({
      variables: {
        login,
        password,
      },
      onCompleted,
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    ...form
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          {mode === MODES.LOGIN && loginData.data?.login.success && (
            <span className="text-green-300">Logged in successfully</span>
          )}
          {mode === MODES.SIGN_UP && signUpData.data?.signUp.success && (
            <span className="text-green-300">Signed up successfully</span>
          )}
        </div>
        {Footer && <Footer />}
      </form>
    </>
  );
};

export default AuthForm;
