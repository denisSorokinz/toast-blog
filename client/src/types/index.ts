interface IPost {
  id: number;
  title: string;
  created_at: string;
  content?: string;
}

type WithNextRouteParams<T> = {
  params: T;
};

export { type IPost, type WithNextRouteParams };
