import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from '@vue/composition-api';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type ReactiveFunction<TParam> = () => TParam;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  users: Array<User>;
  logout: Scalars['String'];
  me: User;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  id: Scalars['String'];
  updatedAt: Scalars['String'];
  createdAt: Scalars['String'];
  deleted: Scalars['Boolean'];
  email: Scalars['String'];
  verified: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
  login: LoginResponse;
  revokeRefreshToken: Scalars['Boolean'];
  verifyEmailCode: LoginResponse;
};


export type MutationRegisterArgs = {
  options: LoginInput;
};


export type MutationLoginArgs = {
  options: LoginInput;
};


export type MutationRevokeRefreshTokenArgs = {
  userId: Scalars['String'];
};


export type MutationVerifyEmailCodeArgs = {
  code: Scalars['String'];
  email: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<FieldError>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: ErrorMessage;
};

export enum ErrorMessage {
  EmailInvalid = 'EMAIL_INVALID',
  EmailExists = 'EMAIL_EXISTS',
  EmailNotFound = 'EMAIL_NOT_FOUND',
  PasswordInvalid = 'PASSWORD_INVALID',
  UserNotVeriified = 'USER_NOT_VERIIFIED',
  VerificationInvalid = 'VERIFICATION_INVALID'
}

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  errors?: Maybe<FieldError>;
  accessToken?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type AuthenticateUserMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type AuthenticateUserMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'email' | 'id'>
    )>, errors?: Maybe<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )> }
  ) }
);

export type RegisterUserMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterUserMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'email' | 'id'>
    )>, errors?: Maybe<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )> }
  ) }
);


export const AuthenticateUserDocument = gql`
    mutation authenticateUser($email: String!, $password: String!) {
  login(options: {email: $email, password: $password}) {
    user {
      email
      id
    }
    accessToken
    errors {
      field
      message
    }
  }
}
    `;

/**
 * __useAuthenticateUserMutation__
 *
 * To run a mutation, you first call `useAuthenticateUserMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useAuthenticateUserMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useAuthenticateUserMutation({
 *   variables: {
 *     email: // value for 'email'
 *     password: // value for 'password'
 *   },
 * });
 */
export function useAuthenticateUserMutation(options: VueApolloComposable.UseMutationOptions<AuthenticateUserMutation, AuthenticateUserMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<AuthenticateUserMutation, AuthenticateUserMutationVariables>>) {
  return VueApolloComposable.useMutation<AuthenticateUserMutation, AuthenticateUserMutationVariables>(AuthenticateUserDocument, options);
}
export type AuthenticateUserMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<AuthenticateUserMutation, AuthenticateUserMutationVariables>;
export const RegisterUserDocument = gql`
    mutation registerUser($email: String!, $password: String!) {
  register(options: {email: $email, password: $password}) {
    user {
      email
      id
    }
    errors {
      field
      message
    }
  }
}
    `;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useRegisterUserMutation({
 *   variables: {
 *     email: // value for 'email'
 *     password: // value for 'password'
 *   },
 * });
 */
export function useRegisterUserMutation(options: VueApolloComposable.UseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>>) {
  return VueApolloComposable.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, options);
}
export type RegisterUserMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<RegisterUserMutation, RegisterUserMutationVariables>;