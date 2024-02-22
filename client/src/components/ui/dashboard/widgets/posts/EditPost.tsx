"use client";

import { z } from "zod";
import { useForm, useWatch } from "react-hook-form";
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
import { Button } from "@/components/ui/shadcn/button";
import { zodResolver } from "@hookform/resolvers/zod";

export const postValidationSchema = z.object({
  id: z.number(),
  title: z.string().min(5, { message: "should be 5+ characters" }),
  content: z.string().min(20, { message: "should be 20+ characters" }),
  created_at: z
    .date()
    .min(new Date("2024-01-01"), { message: "2024 only" })
    .default(new Date()),
});
export type PostFormData = z.infer<typeof postValidationSchema>;

type Props = {
  post: IPost;
  onInput: (fd: PostFormData) => void;
};

const parsePost = (post: IPost): PostFormData => ({
  ...post,
  created_at: new Date(post.created_at),
  content: post?.content || "",
});

// todo: reuse for CreatePost - provide props { post, serverAction }
const EditPost: FC<Props> = ({ post, onInput }) => {
  const form = useForm<PostFormData>({
    defaultValues: {
      ...parsePost(post),
    },
    mode: "onChange",
    resolver: zodResolver(postValidationSchema),
  });

  const { title, content, created_at } = form.watch();
  useEffect(() => {
    const autosave = form.handleSubmit(onInput);
    autosave();
  }, [title, content, created_at]);

  const onValid = () => {
    console.log("[valid]");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onInput)}
        className="flex flex-wrap gap-2"
      >
        <div className="flex min-w-[40%] max-w-[50%] shrink grow basis-0 flex-col gap-1">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className={noFlipClassName}>
                <FormLabel>Title:</FormLabel>
                <FormControl className="border border-slate-300">
                  <Input placeholder="title..." {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
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
                <FormControl className="border border-slate-300">
                  <Input placeholder="content..." {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full">
          <FormField
            control={form.control}
            name="created_at"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className={noFlipClassName}>Created at:</FormLabel>
                <DatePicker value={field.value} onChange={field.onChange} />
                <FormMessage className="text-xs" />
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
