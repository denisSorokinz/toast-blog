import { FC, PropsWithChildren } from "react";

const WidgetContainer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="h-full w-full rounded-xl bg-slate-500 p-2">{children}</div>
  );
};

export default WidgetContainer;
