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
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
  __typename?: 'Query';
  connectionTest: Scalars['String'];
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
  analyseVocabPron: AnalysisVocabRaw;
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


export type MutationAnalyseVocabPronArgs = {
  audFile: Scalars['Upload'];
  input: AnalyseVocabPronArgs;
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

export type AnalysisVocabRaw = {
  __typename?: 'AnalysisVocabRaw';
  status: Scalars['String'];
  text_score: AudAnalysisResult;
};

export type AudAnalysisResult = {
  __typename?: 'AudAnalysisResult';
  text: Scalars['String'];
  quality_score: Scalars['Float'];
  word_score_list: Array<Maybe<WordScore>>;
  fidelity_class: Scalars['String'];
};

export type WordScore = {
  __typename?: 'WordScore';
  word: Scalars['String'];
  quality_score: Scalars['Float'];
  phone_score_list: Array<PhoneScore>;
  syllable_score_list: Array<SyllableScore>;
};

export type PhoneScore = {
  __typename?: 'PhoneScore';
  stress_level?: Maybe<Scalars['Float']>;
  extent: Array<Scalars['Int']>;
  quality_score: Scalars['Float'];
  stress_score?: Maybe<Scalars['Float']>;
  phone: Scalars['String'];
  sound_most_like?: Maybe<Scalars['String']>;
};

export type SyllableScore = {
  __typename?: 'SyllableScore';
  stress_level?: Maybe<Scalars['Float']>;
  extent: Array<Scalars['Int']>;
  quality_score: Scalars['Float'];
  stress_score?: Maybe<Scalars['Float']>;
  phone_count: Scalars['Int'];
  letters: Scalars['String'];
};


export type AnalyseVocabPronArgs = {
  text: Scalars['String'];
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

export type TestConnectionQueryVariables = Exact<{ [key: string]: never; }>;


export type TestConnectionQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'connectionTest'>
);

export type GetAllUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUserQuery = (
  { __typename?: 'Query' }
  & { getAllUser: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
  )> }
);

export type AnalyseVocabProunMutationVariables = Exact<{
  input: AnalyseVocabPronArgs;
  file: Scalars['Upload'];
}>;


export type AnalyseVocabProunMutation = (
  { __typename?: 'Mutation' }
  & { analyseVocabPron: (
    { __typename?: 'AnalysisVocabRaw' }
    & Pick<AnalysisVocabRaw, 'status'>
    & { text_score: (
      { __typename?: 'AudAnalysisResult' }
      & TextScoreInfoFragment
    ) }
  ) }
);

export type TextScoreInfoFragment = (
  { __typename?: 'AudAnalysisResult' }
  & Pick<AudAnalysisResult, 'text' | 'quality_score' | 'fidelity_class'>
  & { word_score_list: Array<Maybe<(
    { __typename?: 'WordScore' }
    & WordScoreInfoFragment
  )>> }
);

export type WordScoreInfoFragment = (
  { __typename?: 'WordScore' }
  & Pick<WordScore, 'word' | 'quality_score'>
  & { phone_score_list: Array<(
    { __typename?: 'PhoneScore' }
    & PhoneScoreInfoFragment
  )>, syllable_score_list: Array<(
    { __typename?: 'SyllableScore' }
    & SyllableScoreInfoFragment
  )> }
);

export type PhoneScoreInfoFragment = (
  { __typename?: 'PhoneScore' }
  & Pick<PhoneScore, 'stress_level' | 'extent' | 'quality_score' | 'stress_score' | 'phone' | 'sound_most_like'>
);

export type SyllableScoreInfoFragment = (
  { __typename?: 'SyllableScore' }
  & Pick<SyllableScore, 'stress_level' | 'extent' | 'quality_score' | 'stress_score' | 'phone_count' | 'letters'>
);

export const PhoneScoreInfoFragmentDoc = gql`
    fragment PhoneScoreInfo on PhoneScore {
  stress_level
  extent
  quality_score
  stress_score
  phone
  sound_most_like
}
    `;
export const SyllableScoreInfoFragmentDoc = gql`
    fragment SyllableScoreInfo on SyllableScore {
  stress_level
  extent
  quality_score
  stress_score
  phone_count
  letters
}
    `;
export const WordScoreInfoFragmentDoc = gql`
    fragment WordScoreInfo on WordScore {
  word
  quality_score
  phone_score_list {
    ...PhoneScoreInfo
  }
  syllable_score_list {
    ...SyllableScoreInfo
  }
}
    ${PhoneScoreInfoFragmentDoc}
${SyllableScoreInfoFragmentDoc}`;
export const TextScoreInfoFragmentDoc = gql`
    fragment TextScoreInfo on AudAnalysisResult {
  text
  quality_score
  word_score_list {
    ...WordScoreInfo
  }
  fidelity_class
}
    ${WordScoreInfoFragmentDoc}`;
export const TestConnectionDocument = gql`
    query TestConnection {
  connectionTest
}
    `;

/**
 * __useTestConnectionQuery__
 *
 * To run a query within a React component, call `useTestConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useTestConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTestConnectionQuery({
 *   variables: {
 *   },
 * });
 */
export function useTestConnectionQuery(baseOptions?: Apollo.QueryHookOptions<TestConnectionQuery, TestConnectionQueryVariables>) {
        return Apollo.useQuery<TestConnectionQuery, TestConnectionQueryVariables>(TestConnectionDocument, baseOptions);
      }
export function useTestConnectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TestConnectionQuery, TestConnectionQueryVariables>) {
          return Apollo.useLazyQuery<TestConnectionQuery, TestConnectionQueryVariables>(TestConnectionDocument, baseOptions);
        }
export type TestConnectionQueryHookResult = ReturnType<typeof useTestConnectionQuery>;
export type TestConnectionLazyQueryHookResult = ReturnType<typeof useTestConnectionLazyQuery>;
export type TestConnectionQueryResult = Apollo.QueryResult<TestConnectionQuery, TestConnectionQueryVariables>;
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
export const AnalyseVocabProunDocument = gql`
    mutation AnalyseVocabProun($input: AnalyseVocabPronArgs!, $file: Upload!) {
  analyseVocabPron(audFile: $file, input: $input) {
    status
    text_score {
      ...TextScoreInfo
    }
  }
}
    ${TextScoreInfoFragmentDoc}`;
export type AnalyseVocabProunMutationFn = Apollo.MutationFunction<AnalyseVocabProunMutation, AnalyseVocabProunMutationVariables>;

/**
 * __useAnalyseVocabProunMutation__
 *
 * To run a mutation, you first call `useAnalyseVocabProunMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAnalyseVocabProunMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [analyseVocabProunMutation, { data, loading, error }] = useAnalyseVocabProunMutation({
 *   variables: {
 *      input: // value for 'input'
 *      file: // value for 'file'
 *   },
 * });
 */
export function useAnalyseVocabProunMutation(baseOptions?: Apollo.MutationHookOptions<AnalyseVocabProunMutation, AnalyseVocabProunMutationVariables>) {
        return Apollo.useMutation<AnalyseVocabProunMutation, AnalyseVocabProunMutationVariables>(AnalyseVocabProunDocument, baseOptions);
      }
export type AnalyseVocabProunMutationHookResult = ReturnType<typeof useAnalyseVocabProunMutation>;
export type AnalyseVocabProunMutationResult = Apollo.MutationResult<AnalyseVocabProunMutation>;
export type AnalyseVocabProunMutationOptions = Apollo.BaseMutationOptions<AnalyseVocabProunMutation, AnalyseVocabProunMutationVariables>;