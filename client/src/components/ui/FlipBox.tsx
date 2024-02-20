"use client";

import { cn } from "@/lib/utils";
import { FC, PropsWithChildren } from "react";

export const noFlipClassName = "prevent-3d-flip";

type Props = {
  front: React.ReactNode;
  back: React.ReactNode;
  isFlipped?: boolean;
  dispatchFlip?: () => void;
};
const FlipBox: FC<PropsWithChildren<Props>> = ({
  front,
  back,
  isFlipped = false,
  dispatchFlip,
}) => {
  const handleClick = (ev: React.MouseEvent<HTMLDivElement>) => {
    if (!dispatchFlip) return;

    const target = ev.target as HTMLElement;

    if (
      !(
        target.classList.contains(noFlipClassName) ||
        target.closest(`.${noFlipClassName}`)
      )
    )
      dispatchFlip();
  };

  return (
    <div
      className="perspective group h-full w-full"
      onClick={handleClick}
    >
      <div
        className={cn(
          "preserve-3d prose relative h-full w-full rounded-md bg-slate-300 p-2 shadow-md shadow-slate-700 duration-500",
          isFlipped && "rotate-y-180 shadow-none",
        )}
      >
        <div className="backface-hidden h-full w-full bg-slate-200 p-2 shadow-lg">
          {front}
        </div>
        <div className="rotate-y-180 backface-hidden relative -top-full h-full w-full overflow-hidden bg-slate-200 p-2 shadow-md">
          {back}
        </div>
      </div>
    </div>
  );
};

export default FlipBox;
