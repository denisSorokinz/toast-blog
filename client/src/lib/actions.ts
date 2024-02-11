"use server";

import { AUTH_OPERATIONS } from "./../types/index";
import { MUTATION_LOGIN, MUTATION_SIGN_UP } from "@/queries";
import { getClient } from "./apollo/rsc";
import { AuthResponse, LoginResponse } from "@/types";
import { cookies } from "next/headers";
import { isAuthenticated } from "./auth";

export async function authAction({
  operation,
  login,
  password,
}: {
  operation: AUTH_OPERATIONS;
  login: string;
  password: string;
}) {
  let mutation = MUTATION_LOGIN;
  if (operation === AUTH_OPERATIONS.SIGN_UP) mutation = MUTATION_SIGN_UP;

  const { data, errors } = await getClient().mutate<AuthResponse>({
    mutation,
    variables: { login, password },
  });

  if (
    !errors &&
    operation === AUTH_OPERATIONS.LOGIN &&
    (data as LoginResponse).login.success
  ) {
    cookies().set("accessToken", (data as LoginResponse).login.accessToken);
  }

  return data;
}

export async function logoutAction() {
  if (!isAuthenticated) return false;

  cookies().delete("accessToken");

  return true;
}
