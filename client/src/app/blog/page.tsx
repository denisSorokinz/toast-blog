import { gql } from "@apollo/client";
import { getClient } from "@/lib/apollo/rsc";
import PostList from "./PostList";
import { IPost } from "@/types";
import Heading from "@/components/ui/Heading";
import { QUERY_GET_ALL_POSTS } from "@/queries";

export default async function Blog() {
  // fetch all posts w/ Apollo Client
  const { error, loading, data } = await getClient().query<{
    getPosts: IPost[];
  }>({
    query: QUERY_GET_ALL_POSTS,
  });

  // handle loading, error
  if (loading) return <Heading>Loading posts...</Heading>;

  if (error) return <Heading>Error loading posts: {error.message}</Heading>;

  // render all posts
  return (
    <>
      <PostList posts={data.getPosts} />
    </>
  );
}
