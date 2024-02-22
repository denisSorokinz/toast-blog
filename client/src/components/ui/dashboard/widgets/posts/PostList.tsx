"use client";

import FlipBox from "@/components/ui/FlipBox";
import { IPost } from "@/types";
import {
  FC,
  useCallback,
  useEffect,
  useOptimistic,
  useState,
  useTransition,
} from "react";
import EditPost, { PostFormData } from "./EditPost";
import ObservableMap from "@/lib/observableMap";
import { editPost as editPostAction } from "@/lib/actions";
import { serializePost } from "@/lib/posts";
import { debounce } from "@/lib/utils";

export type PostFormRefList = ObservableMap<
  keyof PostFormData,
  HTMLElement | null
>;

type Props = {
  items: IPost[];
};
const PostList: FC<Props> = ({ items: initialPosts }) => {
  const [posts, setPosts] = useState(initialPosts);

  // const [optimisticPosts, addOptimisticPost] = useOptimistic<typeof posts>(posts, (state, newPost) => [...state])

  const editPost = (state: IPost[], nextPost: IPost) => {
    const existingIdx = state.findIndex((item) => item.id === nextPost.id);

    if (existingIdx === -1) return state;

    const nextState = [...state];
    nextState[existingIdx] = { ...nextState[existingIdx], ...nextPost };

    return nextState;
  };

  const [optmstPosts, updateOptmstPosts] = useOptimistic<
    IPost[],
    { action: "UPDATE" | "DELETE"; nextPost: IPost }
  >(posts, (state, { action, nextPost }) => {
    if (action === "UPDATE") return editPost(state, nextPost);

    return state;
  });
  const [isPending, startTransition] = useTransition();

  const [editingId, setEditingId] = useState<number | null>(null);
  const onEditIdChange = (nextId: number) =>
    setEditingId(nextId !== editingId ? nextId : null);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);

    return () => setIsMounted(false);
  }, []);

  const serverAction = useCallback(debounce(editPostAction), []);

  const handleEditPost = async (fd: PostFormData) => {
    const old = Object.assign(
      {},
      posts.find((item) => item.id === fd.id),
    );

    startTransition(() =>
      updateOptmstPosts({
        action: "UPDATE",
        nextPost: serializePost<IPost>(fd),
      }),
    );

    try {
      console.log("action-started");
      const { success, data } = await editPostAction(fd);
      console.log("action-finished");

      if (success && data) {
        const nextPosts = editPost(posts, data);
        setPosts(nextPosts);
      }
    } catch (err) {
      console.log("post-edit-optimistic-catch", err);
      startTransition(() =>
        updateOptmstPosts({ action: "UPDATE", nextPost: old }),
      );
    }
  };

  useEffect(() => console.log({ posts, optmstPosts }), [posts, optmstPosts]);

  return (
    <div className="flex flex-wrap gap-2">
      {JSON.stringify(posts)}
      <hr />
      {JSON.stringify(optmstPosts)}
      {optmstPosts.map((post) => (
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
                  {isMounted && new Date(post.created_at).toLocaleDateString()}
                </span>
              </div>
            }
            back={<EditPost post={post} onInput={handleEditPost} />}
            isFlipped={editingId === post.id}
            dispatchFlip={() => onEditIdChange(post.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default PostList;
