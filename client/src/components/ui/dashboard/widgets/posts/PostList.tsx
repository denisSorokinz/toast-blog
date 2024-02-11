"use client";

import FlipBox from "@/components/ui/FlipBox";
import { IPost } from "@/types";
import { FC, useEffect, useRef, useState } from "react";
import EditPost, { PostFormData } from "./EditPost";

export type PostFormRefList = Map<keyof PostFormData, HTMLElement | null>;

type Props = {
  items: IPost[];
};
const PostList: FC<Props> = ({ items: posts }) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const onEditIdChange = (nextId: number) =>
    setEditingId(nextId !== editingId ? nextId : null);

  const noFlipRefs = useRef<PostFormRefList>(new Map());

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);

    // todo: observable or accumulator pattern until refList.current.length === 3
    setInterval(() => console.log({ noFlipRefs }), 1000);

    return () => setIsMounted(false);
  }, []);

  return (
    <div className="flex flex-wrap gap-2">
      {posts.map((post) => (
        <div
          key={post.id}
          className="flex min-h-40 w-full min-w-[40%] max-w-[50%] shrink grow basis-0 cursor-pointer flex-col"
          onClick={(ev) => (console.log({ ev }), onEditIdChange(post.id))}
        >
          <FlipBox
            front={
              <div className="flex h-full flex-col">
                <h3 className="m-0">{post.title}</h3>
                <p>{post.content}</p>
                <span className="mt-auto text-right text-slate-400">
                  {isMounted && new Date(post.created_at).toLocaleDateString()}
                </span>
              </div>
            }
            back={<EditPost ref={noFlipRefs} />}
            isFlipped={editingId === post.id}
          />
        </div>
      ))}
    </div>
  );
};

export default PostList;
