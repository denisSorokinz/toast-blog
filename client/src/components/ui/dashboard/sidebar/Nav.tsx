"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { twMerge } from "tailwind-merge";

export type SidebarNavItem = {
  href: string;
  title: string;
};
type Props = {
  items: SidebarNavItem[];
};

const SidebarNav: FC<Props> = ({ items }) => {
  const pathname = usePathname();

  if (items.length === 0)
    return <span className="text-slate-200">No items</span>;

  return (
    <ul className="flex flex-col gap-3">
      {items.map(({ href, title }, idx) => (
        <li key={idx}>
          <Link
            href={href}
            className={twMerge(
              "block rounded-md border-2 border-slate-500 text-center text-lg font-semibold text-slate-500 transition-colors hover:border-slate-400 hover:text-slate-400",
              pathname === href &&
                "border-slate-100 text-slate-100 hover:border-slate-100 hover:text-slate-100",
            )}
          >
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SidebarNav;
