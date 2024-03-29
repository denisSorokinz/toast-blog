import { ApolloServer } from '@apollo/server';
import gql from 'graphql-tag';
import { startStandaloneServer } from '@apollo/server/standalone';
import { GraphQLScalarType, Kind } from 'graphql';
import PostsDataSource from './datasources/posts';
import env from 'dotenv';
import AuthService from './services/auth';

env.config();

const app = () => {
  // Apollo GraphQL server
  const server = new ApolloServer<{ dataSources: { postsAPI: PostsDataSource; authService: AuthService } }>({
    typeDefs: gql`
      scalar Date

      type Post {
        id: Int!
        title: String!
        content: String
        created_at: Date
      }
      type SignUpResponse {
        success: Boolean!
        error: String
      }
      type LoginResponse {
        success: Boolean!
        error: String
        accessToken: String
      }

      type Query {
        getAllPosts: [Post]
        getPostById(id: ID!): Post
      }
      type Mutation {
        signUp(login: String, password: String): SignUpResponse
        login(login: String, password: String): LoginResponse
      }
    `,
    resolvers: {
      Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        serialize(value) {
          if (value instanceof Date) {
            return value.getTime();
          }
          throw new Error('GraphQL Date Scalar serializer expected a `Date` object');
        },
        parseValue(value) {
          if (typeof value === 'number') {
            return new Date(value);
          }
          throw new Error('GraphQL Date Scalar parser expected a `number`');
        },
        parseLiteral(ast) {
          if (ast.kind === Kind.INT) {
            return new Date(parseInt(ast.value, 10));
          }
          return null;
        },
      }),
      Post: {
        created_at: (parent) => parent.created_at,
      },
      Query: {
        getAllPosts: async (parent, args, { dataSources }) => {
          const posts = await dataSources.postsAPI.getAllPosts();
          return posts;
        },
        getPostById: async (parent, { id }, { dataSources }) => {
          const post = await dataSources.postsAPI.getPostById(id);
          return post;
        },
      },
      Mutation: {
        signUp: async (_, { login, password }, { dataSources }) => {
          try {
            await dataSources.authService.signUp(login, password);
          } catch (error) {
            return { success: false, error };
          }

          return { success: true };
        },
        login: async (_, { login, password }, { dataSources }) => {
          let data;
          try {
            data = await dataSources.authService.login(login, password);
          } catch (error) {
            return { success: false, error };
          }

          return data;
        },
      },
    },
  });
  startStandaloneServer(server, {
    context: async () => {
      return {
        dataSources: {
          postsAPI: new PostsDataSource(),
          authService: new AuthService(),
        },
      };
    },
  });
};

app();
