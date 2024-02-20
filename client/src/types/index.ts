// Utils
export type WithNextRouteParams<T> = {
  params: T;
};

// Posts
export interface IPost {
  id: number;
  title: string;
  createdAt: number;
  content?: string;
};

// Auth
type BaseResponse = {
  success: boolean;
  error?: string;
};
export type LoginResponse = {
  login: BaseResponse & {
    accessToken: string;
  };
};
export type SignUpResponse = {
  signUp: BaseResponse;
};
export type AuthResponse = LoginResponse | SignUpResponse;
export enum AUTH_OPERATIONS {
  LOGIN,
  SIGN_UP,
}
export enum PERMISSIONS {
  READ_POSTS = "read:posts",
  WRITE_POSTS = "write:posts",
  GOTO_DASHBOARD = "goto:dashboard",
}
