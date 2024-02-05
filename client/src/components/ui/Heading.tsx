import { FC, PropsWithChildren } from "react";

const Heading: FC<PropsWithChildren> = ({ children }) => (
  <div className="prose">
    <h1 className="text-center text-cyan-400">{children}</h1>
  </div>
);

export default Heading;
