"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { IPost } from "@/types";
import { FC, useCallback, useEffect, useRef } from "react";
import DatePicker from "@/components/ui/shadcn/datepicker";
import { noFlipClassName } from "@/components/ui/FlipBox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/shadcn/form";
import { Input } from "@/components/ui/shadcn/input";
import { debounce } from "@/lib/utils";

export const postValidationSchema = z.object({
  id: z.number(),
  title: z.string().min(5, { message: "should be 5+ characters" }),
  content: z.string().min(20, { message: "should be 20+ characters" }),
  createdAt: z
    .date()
    .min(new Date("2024-01-01"), { message: "2024 only" })
    .default(new Date()),
});
export type PostFormData = z.infer<typeof postValidationSchema>;

type Props = {
  post: IPost;
  onSubmit: (fd: PostFormData) => void;
};

const sanitizePost = (post: IPost): PostFormData => ({
  ...post,
  createdAt: new Date(post.createdAt),
  content: post?.content || "",
});

// todo: reuse for CreatePost - provide props { post, serverAction }
const EditPost: FC<Props> = ({ post, onSubmit }) => {
  const form = useForm<PostFormData>({
    defaultValues: {
      ...sanitizePost(post),
    },
  });

  const { title, content, createdAt } = form.watch();
  const autosaveCb = useCallback(
    debounce((fd: PostFormData) => onSubmit(fd)),
    [onSubmit],
  );
  useEffect(() => {
    if (!onSubmit) return;

    console.log("autosave-effect");

    const fd = { ...post, title, content, createdAt } as PostFormData;

    const autosave = async () => {
      const isValid = await form.trigger();

      if (isValid) autosaveCb(fd);
    };

    autosave();
  }, [title, content, createdAt]);

  const onValid = (fd: PostFormData) => onSubmit && onSubmit(fd);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onValid)}
        className="flex flex-wrap gap-2"
      >
        <div className="flex min-w-[40%] max-w-[50%] shrink grow basis-0 flex-col gap-1">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className={noFlipClassName}>
                <FormLabel>Title:</FormLabel>
                <FormControl>
                  <Input placeholder="title..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex min-w-[40%] max-w-[50%] shrink grow basis-0 flex-col gap-1">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className={noFlipClassName}>
                <FormLabel>Content:</FormLabel>
                <FormControl>
                  <Input placeholder="content..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full">
          <FormField
            control={form.control}
            name="createdAt"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className={noFlipClassName}>Created at:</FormLabel>
                <DatePicker value={field.value} onChange={field.onChange} />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};
EditPost.displayName = "EditPost";

export default EditPost;
