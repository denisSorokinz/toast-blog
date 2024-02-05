import { gql } from "@apollo/client";
import { getClient } from "@/lib/apollo/rsc";
import PostList from "./PostList";
import { IPost } from "@/types";
import Heading from "@/components/ui/Heading";

const query = gql`
  query getPosts {
    getPosts {
      id
      title
      content
    }
  }
`;

export default async function Blog() {
  // fetch all posts w/ Apollo Client
  const { error, loading, data } = await getClient().query<{
    getPosts: IPost[];
  }>({
    query,
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
