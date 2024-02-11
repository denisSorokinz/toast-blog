"use client";

import { usePathname } from "next/navigation";
import { FC } from "react";

type Props = {
  items: {
    [key: string]: React.ReactNode;
  };
  displayPaths?: string[];
};
const WidgetList: FC<Props> = ({ items, displayPaths }) => {
  const pathname = usePathname();

  if (displayPaths && !displayPaths.includes(pathname)) return null;

  const wdgtNodes = Object.values(items);
  return (
    <>
      {wdgtNodes.length > 0 ? (
        <div className="grid min-h-1/4 w-full grid-cols-2 gap-2">
          {wdgtNodes.map((widget, idx) => (
            <div key={idx} className="rounded-xl bg-slate-700 p-2">
              {widget}
            </div>
          ))}
        </div>
      ) : (
        <h1>No widgets available</h1>
      )}
    </>
  );
};

export default WidgetList;
