import { isAuthorizedFor } from "@/lib/auth";
import { IPost, PERMISSIONS, WithNextRouteParams } from "@/types";
import { getClient } from "@/lib/apollo/rsc";
import { QUERY_GET_POST_BY_ID } from "@/queries";
import UnauthorizedView from "@/components/ui/Unauthorized";

export default async function SinglePost({
  params: { postId },
}: WithNextRouteParams<{ postId: number }>) {
  const shouldShow = isAuthorizedFor(PERMISSIONS.READ_POSTS);

  if (!shouldShow) return <UnauthorizedView />;

  const {
    error,
    data: { getPostById: post },
  } = await getClient().query<{ getPostById: IPost }>({
    query: QUERY_GET_POST_BY_ID,
    variables: { id: postId },
  });

  let content = null;
  if (error)
    content = (
      <span className="text-red-300">Unable to get post: {error.message}</span>
    );

  content = (
    <article className="prose">
      <h2 className="mb-2">{post.title}</h2>
      {post.content && <p className="text-xl text-slate-700">{post.content}</p>}
      <span>created at: {new Date(post.createdAt).toLocaleDateString()}</span>
    </article>
  );

  return <section>{content}</section>;
}
