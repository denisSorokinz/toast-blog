import { cookies } from "next/headers";
import { verify, decode } from "jsonwebtoken";
import { PERMISSIONS } from "@/types";

export const isAuthenticated = () => {
  const token = cookies().get("accessToken")?.value;

  if (!token) return false;

  const isTokenValid = verify(token, process.env.TOKEN_SECRET);
  return !!isTokenValid;
};

export const isAuthorizedFor = (permission: PERMISSIONS) => {
  if (!isAuthenticated()) return;

  const token = cookies().get("accessToken")?.value!;

  const { permissions } = decode(token) as {
    userId: number;
    permissions: PERMISSIONS[];
  };

  return permissions.includes(permission);
};
