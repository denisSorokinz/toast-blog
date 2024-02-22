"use server";

import {
  MUTATION_UPDATE_POST,
  MUTATION_LOGIN,
  MUTATION_SIGN_UP,
} from "@/queries";
import { getClient } from "./apollo/rsc";
import {
  AuthResponse,
  LoginResponse,
  AUTH_OPERATIONS,
  IPost,
  PERMISSIONS,
} from "@/types";
import { cookies } from "next/headers";
import { isAuthenticated, isAuthorizedFor } from "./auth";
import { PostFormData } from "@/components/ui/dashboard/widgets/posts/EditPost";
import { serializePost } from "./posts";

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

export async function editPost(nextPost: PostFormData) {
  if (!isAuthorizedFor(PERMISSIONS.WRITE_POSTS))
    return { success: false, error: { message: "insufficient permissions" } };

  const post = serializePost(nextPost);

  const res = await getClient().mutate<{
    updatePost: { success: boolean; error?: string; data?: IPost };
  }>({
    mutation: MUTATION_UPDATE_POST,
    variables: {
      post,
    },
  });

  return {
    success: !res.errors && !res.data?.updatePost.error,
    data: res.data?.updatePost.data,
    error: (res.errors && res.errors[0].message) || res.data?.updatePost.error,
  };
}
