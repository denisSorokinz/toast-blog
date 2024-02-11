import { isAuthorizedFor } from "@/lib/auth";
import { IPost, PERMISSIONS, WithNextRouteParams } from "@/types";
import { getClient } from "@/lib/apollo/rsc";
import { QUERY_GET_POST_BY_ID } from "@/queries";
import UnauthorizedView from "@/components/ui/Unauthorized";

export default async function Dashboard() {
  return (
    <div className="prose">
      <h1>Dashboard</h1>
    </div>
  );
}
