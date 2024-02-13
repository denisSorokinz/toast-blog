import Heading from "@/components/ui/Heading";
import { IPost } from "@/types";
import Link from "next/link";
import { FC } from "react";

const PostList: FC<{ posts: IPost[] }> = ({ posts }) => {
  console.log({ dbgPosts: posts });
  

  if (posts.length === 0) return <Heading>No posts found</Heading>;

  return (
    <ul className="grid grid-cols-3 gap-4">
      {posts.map((post) => (
        <li
          key={post.id}
          className="flex cursor-pointer flex-col gap-2 rounded bg-slate-200 p-4 shadow-lg text-slate-700"
        >
          <Link href={`/blog/${post.id}`}>
            <h2 className="font-bold">{post.title}</h2>
            {post.content && <p>{post.content}</p>}
            <span></span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default PostList;
