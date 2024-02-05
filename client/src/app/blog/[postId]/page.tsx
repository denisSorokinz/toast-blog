import { isAuthenticated } from "@/lib/auth";
import { WithNextRouteParams } from "@/types";

export default function SinglePost({
  params: { postId },
}: WithNextRouteParams<{ postId: number }>) {
  isAuthenticated();

  return <h3>postId: {postId}</h3>;
}
