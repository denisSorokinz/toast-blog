import { gql } from "@apollo/client";

// Posts
export const QUERY_GET_ALL_POSTS = gql`
  query {
    getAllPosts {
      id
      title
      content
      createdAt
    }
  }
`;
export const MUTATION_EDIT_POST_BY_ID = gql`
  mutation editPostById($id: ID!, $post: PostInput!) {
    editPostById(id: $id, post: $post) {
      success
    }
  }
`;

export const QUERY_GET_POST_BY_ID = gql`
  query getPostById($id: ID!) {
    getPostById(id: $id) {
      id
      title
      content
      createdAt
    }
  }
`;

// Auth
export const MUTATION_LOGIN = gql`
  mutation login($login: String!, $password: String!) {
    login(login: $login, password: $password) {
      success
      accessToken
    }
  }
`;

export const MUTATION_SIGN_UP = gql`
  mutation signUp($login: String!, $password: String!) {
    signUp(login: $login, password: $password) {
      success
    }
  }
`;
