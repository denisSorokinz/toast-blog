"use client";

import makeClient from "@/lib/apollo/makeClient";
import { ApolloNextAppProvider } from "@apollo/experimental-nextjs-app-support/ssr";
import { FC, PropsWithChildren } from "react";

const ApolloWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
};

export default ApolloWrapper;
