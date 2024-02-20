"use client";

import FlipBox from "@/components/ui/FlipBox";
import { IPost } from "@/types";
import { FC, useEffect, useRef, useState } from "react";
import EditPost, { PostFormData, postValidationSchema } from "./EditPost";
import ObservableMap from "@/lib/observableMap";
import { editPost } from "@/lib/actions";

export type PostFormRefList = ObservableMap<
  keyof PostFormData,
  HTMLElement | null
>;

type Props = {
  items: IPost[];
};
const PostList: FC<Props> = ({ items: posts }) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const onEditIdChange = (nextId: number) =>
    setEditingId(nextId !== editingId ? nextId : null);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);

    return () => setIsMounted(false);
  }, []);

  return (
    <div className="flex flex-wrap gap-2">
      {posts.map((post) => (
        <div
          key={post.id}
          className="flex min-h-40 w-full min-w-[40%] max-w-[50%] shrink grow basis-0 cursor-pointer flex-col"
          // onClick={() => (onEditIdChange(post.id))}
        >
          <FlipBox
            front={
              <div className="flex h-full flex-col">
                <h3 className="m-0">{post.title}</h3>
                <p>{post.content}</p>
                <span className="mt-auto text-right text-slate-400">
                  {isMounted && new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>
            }
            back={
              <EditPost
                post={post}
                onSubmit={editPost}
              />
            }
            isFlipped={editingId === post.id}
            dispatchFlip={() => onEditIdChange(post.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default PostList;
