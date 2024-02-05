import { gql } from "@apollo/client";

// Posts
export const QUERY_GET_ALL_POSTS = gql`
  query getAllPosts {
    id
    title
    content
    created_at
  }
`;

// Auth
export const MUTATION_LOGIN = gql`
  mutation login($login: String!, $password: String!) {
    success
    accessToken
  }
`;

export const MUTATION_SIGN_UP = gql`
  mutation signUp($login: String!, $password: String!) {
    success
  }
`;
