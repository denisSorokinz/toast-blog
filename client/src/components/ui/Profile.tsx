"use client";

import useAuthStore from "@/stores/auth";
import { twMerge } from "tailwind-merge";
import { FC } from "react";
import useModalStore from "@/stores/modal";

type Props = {
  className?: string;
};

const Profile: FC<Props> = ({ className }) => {
  const showModal = useModalStore((state) => state.show);
  const { isAuthenticated, logout } = useAuthStore();

  const button = (
    <button onClick={isAuthenticated ? logout : showModal}>
      {isAuthenticated ? "Logout" : "Login"}
    </button>
  );

  return <div className={twMerge(className, "prose text-slate-100 font-bold")}>{button}</div>;
};

export default Profile;
