import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  getAllPost: Array<Post>;
  findPostById: Post;
  findPostsByIds: Array<Post>;
  findManyPost: Array<Post>;
  findOnePost: Post;
  getAllUser: Array<User>;
  findUserById: User;
  findUsersByIds: Array<User>;
  findManyUser: Array<User>;
  findOneUser: User;
};


export type QueryFindPostByIdArgs = {
  id: Scalars['ID'];
};


export type QueryFindPostsByIdsArgs = {
  ids: Array<Scalars['ID']>;
};


export type QueryFindManyPostArgs = {
  input: Array<SimpleKeyValueArgs>;
};


export type QueryFindOnePostArgs = {
  input: Array<SimpleKeyValueArgs>;
};


export type QueryFindUserByIdArgs = {
  id: Scalars['ID'];
};


export type QueryFindUsersByIdsArgs = {
  ids: Array<Scalars['ID']>;
};


export type QueryFindManyUserArgs = {
  input: Array<SimpleKeyValueArgs>;
};


export type QueryFindOneUserArgs = {
  input: Array<SimpleKeyValueArgs>;
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  title: Scalars['String'];
  description: Scalars['String'];
  creator: User;
  creatorId: Scalars['ID'];
};


export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  name: Scalars['String'];
  posts: Array<Post>;
};

export type SimpleKeyValueArgs = {
  key: Scalars['String'];
  value: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
  updateOnePost: Scalars['Boolean'];
  removeOnePostById: Scalars['Boolean'];
  removeManyPostByIds: Scalars['Boolean'];
  removePostBy: Scalars['Boolean'];
  createUser: User;
  updateOneUser: Scalars['Boolean'];
  removeOneUserById: Scalars['Boolean'];
  removeManyUserByIds: Scalars['Boolean'];
  removeUserBy: Scalars['Boolean'];
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


export type MutationUpdateOnePostArgs = {
  input: Array<UpdaterArgs>;
};


export type MutationRemoveOnePostByIdArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveManyPostByIdsArgs = {
  ids: Array<Scalars['ID']>;
};


export type MutationRemovePostByArgs = {
  input: Array<SimpleKeyValueArgs>;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationUpdateOneUserArgs = {
  input: Array<UpdaterArgs>;
};


export type MutationRemoveOneUserByIdArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveManyUserByIdsArgs = {
  ids: Array<Scalars['ID']>;
};


export type MutationRemoveUserByArgs = {
  input: Array<SimpleKeyValueArgs>;
};

export type CreatePostInput = {
  title: Scalars['String'];
  description: Scalars['String'];
  creatorId: Scalars['ID'];
};

export type UpdaterArgs = {
  where: Array<SimpleKeyValueArgs>;
  updater: Array<SimpleKeyValueArgs>;
};

export type CreateUserInput = {
  name: Scalars['String'];
};

export type GetAllUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUserQuery = (
  { __typename?: 'Query' }
  & { getAllUser: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
  )> }
);


export const GetAllUserDocument = gql`
    query GetAllUser {
  getAllUser {
    id
  }
}
    `;

/**
 * __useGetAllUserQuery__
 *
 * To run a query within a React component, call `useGetAllUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUserQuery(baseOptions?: Apollo.QueryHookOptions<GetAllUserQuery, GetAllUserQueryVariables>) {
        return Apollo.useQuery<GetAllUserQuery, GetAllUserQueryVariables>(GetAllUserDocument, baseOptions);
      }
export function useGetAllUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUserQuery, GetAllUserQueryVariables>) {
          return Apollo.useLazyQuery<GetAllUserQuery, GetAllUserQueryVariables>(GetAllUserDocument, baseOptions);
        }
export type GetAllUserQueryHookResult = ReturnType<typeof useGetAllUserQuery>;
export type GetAllUserLazyQueryHookResult = ReturnType<typeof useGetAllUserLazyQuery>;
export type GetAllUserQueryResult = Apollo.QueryResult<GetAllUserQuery, GetAllUserQueryVariables>;