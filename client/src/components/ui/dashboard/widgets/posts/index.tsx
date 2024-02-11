import WidgetContainer from "@/components/ui/dashboard/widgets/Container";
import { getClient } from "@/lib/apollo/rsc";
import { QUERY_GET_ALL_POSTS } from "@/queries";
import { IPost } from "@/types";
import PostList from "./PostList";

const PostsWidget = async () => {
  const {
    error,
    data: { getAllPosts: posts },
  } = await getClient().query<{ getAllPosts: IPost[] }>({
    query: QUERY_GET_ALL_POSTS,
  });

  let content = <></>;

  if (error)
    content = (
      <span className="text-slate-300">
        Error loading widget: {error.message}
      </span>
    );

  if (posts) {
    content =
      posts.length > 0 ? (
        <PostList items={posts} />
      ) : (
        <span className="block p-1 text-slate-300">No posts found</span>
      );
  }

  return <WidgetContainer>{content}</WidgetContainer>;
};

export default PostsWidget;
