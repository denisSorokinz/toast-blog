"use server";

import {
  MUTATION_EDIT_POST_BY_ID,
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

const parsePost = (fd: PostFormData): IPost => ({
  id: fd.id,
  title: fd.title,
  createdAt: fd.createdAt.getTime(),
  content: fd.content,
});
export async function editPost(nextPost: PostFormData) {
  console.log("action", parsePost(nextPost));
  if (!isAuthorizedFor(PERMISSIONS.WRITE_POSTS))
    return { success: false, error: { message: "insufficient permissions" } };

  const post = parsePost(nextPost);
  const res = await getClient().mutate<{
    editPostById: { success: boolean; error?: string; data?: IPost };
  }>({
    mutation: MUTATION_EDIT_POST_BY_ID,
    variables: {
      id: post.id,
      post: {
        title: post.title,
        content: post.content,
        createdAt: post.createdAt,
      },
    },
  });

  console.log("edit-res", res);

  return {
    success: !res.errors && !res.data?.editPostById.error,
    data: res.data?.editPostById.data,
    error:
      (res.errors && res.errors[0].message) || res.data?.editPostById.error,
  };
}
