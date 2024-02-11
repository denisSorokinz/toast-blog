import { z } from "zod";
import { useForm } from "react-hook-form";
import { IPost } from "@/types";
import { FC, MutableRefObject, forwardRef } from "react";
import { PostFormRefList } from "./PostList";

const validationSchema = z.object({
  title: z.string().min(5, { message: "should be 5+ characters" }),
  content: z.string().min(20, { message: "should be 20+ characters" }),
  createdAt: z
    .date()
    .min(new Date("2024-01-01"), { message: "2024 only" })
    .default(new Date()),
});
export type PostFormData = z.infer<typeof validationSchema>;

type Props = {
  post?: IPost;
};

const EditPost = forwardRef<PostFormRefList, Props>(({ post }, refList) => {
  const tRefList = refList as { current: PostFormRefList };

  // todo: reuse for CreatePost - provide props { post, serverAction }
  const { register, handleSubmit } = useForm<PostFormData>({
    defaultValues: {
      ...post,
    },
  });

  const { ref: refTitle, ...registerTitle } = register("title");
  const { ref: refContent, ...registerContent } = register("content");
  const { ref: refCreatedAt, ...registerCreatedAt } = register("createdAt");

  const onValid = () => {};

  return (
    <form onSubmit={handleSubmit(onValid)} className="flex flex-wrap gap-2">
      <div className="flex min-w-[40%] max-w-[50%] shrink grow basis-0 flex-col gap-1">
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          placeholder="title..."
          className="rounded px-2"
          {...registerTitle}
          ref={(r) => {
            refTitle(r);

            tRefList.current.set("title", r);
          }}
        />
      </div>
      <div className="flex min-w-[40%] max-w-[50%] shrink grow basis-0 flex-col gap-1">
        <label htmlFor="title">Content:</label>
        <input
          id="title"
          type="text"
          placeholder="title..."
          className="rounded px-2"
          {...register("title")}
        />
      </div>
    </form>
  );
});
EditPost.displayName = "EditPost";

export default EditPost;
