import UnauthorizedView from "@/components/ui/Unauthorized";
import Widgets from "@/components/ui/dashboard/widgets/WidgetList";
import Sidebar from "@/components/ui/dashboard/sidebar";
import { SidebarNavItem } from "@/components/ui/dashboard/sidebar/Nav";
import { isAuthenticated, isAuthorizedFor } from "@/lib/auth";
import { PERMISSIONS } from "@/types";
import { noParamsLens } from "@/utils/lenses";

const sidebarNavItems: SidebarNavItem[] = [
  { href: "/dashboard", title: "Main" },
  { href: "/dashboard/users", title: "Users" },
  { href: "/dashboard/posts", title: "Posts" },
];
const widgetDisplayPaths = ["/dashboard"];

export default function DashboardLayout({
  children,
  ...rest
}: Readonly<{
  children: React.ReactNode;
  users: React.ReactNode;
  posts: React.ReactNode;
  params: {};
}>) {
  const isAuthed = isAuthenticated();
  const shouldShow = isAuthorizedFor(PERMISSIONS.GOTO_DASHBOARD);

  if (!shouldShow) return <UnauthorizedView showModal={!isAuthed} />;

  const widgets = noParamsLens.view(rest);

  return (
    <div className="flex h-full w-full gap-2">
      <Sidebar navItems={sidebarNavItems} />
      <div className="flex w-full flex-col gap-2">
        <Widgets items={widgets} displayPaths={widgetDisplayPaths} />
        <section className="h-full">{children}</section>
      </div>
    </div>
  );
}
