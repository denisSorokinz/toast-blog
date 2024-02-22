import { PostFormData } from "@/components/ui/dashboard/widgets/posts/EditPost";
import { OnlyPropertiesLens } from "../lenses";
import { IPost } from "@/types";

export const serializePost = <T = Partial<IPost>>(fd: PostFormData) => {
  const mapped = { ...fd, created_at: fd.created_at.getTime() };

  const postProperties = ["id", "title", "content", "created_at"] as Array<
    keyof PostFormData
  >;
  const lens = OnlyPropertiesLens.from(postProperties);

  const res = lens.view(mapped) as Pick<IPost, "id"> & T;
  return res;
};
