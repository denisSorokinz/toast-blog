import { FC } from "react";
import SidebarNav, { SidebarNavItem } from "./Nav";

type Props = {
  navItems: SidebarNavItem[];
};
const Sidebar: FC<Props> = ({ navItems }) => (
  <aside className="flex min-w-44 flex-col gap-4 rounded-md bg-slate-700 px-3 py-6">
    <h3 className="m-0 text-2xl font-bold leading-6 text-slate-100">Views</h3>
    <hr className="mb-0 h-[2px] bg-slate-200" />
    <SidebarNav items={navItems} />
  </aside>
);

export default Sidebar;
