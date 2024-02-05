"use client";

import Heading from "@/components/ui/Heading";
import useAuthStore from "@/stores/auth";
import useModalStore from "@/stores/modal";
import { IPost } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, MouseEvent } from "react";

const PostList: FC<{ posts: IPost[] }> = ({ posts }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const showModal = useModalStore((state) => state.show);

  const handleClick = (ev: MouseEvent) => {
    if (isAuthenticated) return;

    ev.preventDefault();
    showModal();
  };

  if (posts.length === 0) return <Heading>No posts found</Heading>;

  return (
    <ul className="grid grid-cols-3 gap-4">
      {posts.map((post) => (
        <li
          key={post.id}
          className="flex cursor-pointer flex-col gap-2 rounded bg-slate-200 p-4 shadow-lg"
        >
          <Link href={`/blog/${post.id}`} onClick={handleClick}>
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
