"use client";

import useModalStore from "@/stores/modal";
import { FC, useEffect } from "react";

type Props = { showModal?: boolean };

const UnauthorizedView: FC<Props> = ({ showModal = true }) => {
  const showModalCb = useModalStore((state) => state.show);

  useEffect(() => {
    showModal && showModalCb();
  }, []);

  return <div>unauthorized</div>;
};

export default UnauthorizedView;
