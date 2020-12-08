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

export type BaseEntity = {
  __typename?: 'BaseEntity';
  _id: Scalars['String'];
  id: Scalars['String'];
  updatedAt: Scalars['String'];
  createdAt: Scalars['String'];
  deleted: Scalars['Boolean'];
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

export type BasicResponse = {
  __typename?: 'BasicResponse';
  errors?: Maybe<FieldError>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<FieldError>;
  user?: Maybe<User>;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  errors?: Maybe<FieldError>;
  accessToken?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type ValidResponse = {
  __typename?: 'ValidResponse';
  errors?: Maybe<FieldError>;
  message?: Maybe<Scalars['String']>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  users: Array<User>;
  logout: Scalars['String'];
  me: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  revokeRefreshToken: Scalars['Boolean'];
  login: LoginResponse;
  requestResetPassword: ValidResponse;
  verifyPasswordReset: ValidResponse;
  resetPasswort: ValidResponse;
  register: UserResponse;
  verifyEmailCode: LoginResponse;
};


export type MutationRevokeRefreshTokenArgs = {
  userId: Scalars['String'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRequestResetPasswordArgs = {
  email: Scalars['String'];
};


export type MutationVerifyPasswordResetArgs = {
  token: Scalars['String'];
};


export type MutationResetPasswortArgs = {
  password: Scalars['String'];
  token: Scalars['String'];
};


export type MutationRegisterArgs = {
  secret: Scalars['String'];
  input: LoginInput;
};


export type MutationVerifyEmailCodeArgs = {
  code: Scalars['String'];
  id: Scalars['String'];
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
      & Pick<User, 'email' | 'verified' | 'id'>
    )>, errors?: Maybe<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )> }
  ) }
);

export type RegisterUserMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  secret: Scalars['String'];
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

export type RequestResetPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type RequestResetPasswordMutation = (
  { __typename?: 'Mutation' }
  & { requestResetPassword: (
    { __typename?: 'ValidResponse' }
    & Pick<ValidResponse, 'message'>
    & { errors?: Maybe<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )> }
  ) }
);

export type ResetPasswordMutationVariables = Exact<{
  password: Scalars['String'];
  token: Scalars['String'];
}>;


export type ResetPasswordMutation = (
  { __typename?: 'Mutation' }
  & { resetPasswort: (
    { __typename?: 'ValidResponse' }
    & Pick<ValidResponse, 'message'>
    & { errors?: Maybe<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )> }
  ) }
);

export type VerifyAccountByEmailMutationVariables = Exact<{
  id: Scalars['String'];
  code: Scalars['String'];
}>;


export type VerifyAccountByEmailMutation = (
  { __typename?: 'Mutation' }
  & { verifyEmailCode: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
    & { errors?: Maybe<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'message' | 'field'>
    )>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'email' | 'id' | 'verified'>
    )> }
  ) }
);

export type VerifyPasswordResetMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type VerifyPasswordResetMutation = (
  { __typename?: 'Mutation' }
  & { verifyPasswordReset: (
    { __typename?: 'ValidResponse' }
    & Pick<ValidResponse, 'message'>
    & { errors?: Maybe<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )> }
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & Pick<User, 'email' | 'id'>
  ) }
);


export const AuthenticateUserDocument = gql`
    mutation authenticateUser($email: String!, $password: String!) {
  login(input: {email: $email, password: $password}) {
    user {
      email
      verified
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
    mutation registerUser($email: String!, $password: String!, $secret: String!) {
  register(input: {email: $email, password: $password}, secret: $secret) {
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
 *     secret: // value for 'secret'
 *   },
 * });
 */
export function useRegisterUserMutation(options: VueApolloComposable.UseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>>) {
  return VueApolloComposable.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, options);
}
export type RegisterUserMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<RegisterUserMutation, RegisterUserMutationVariables>;
export const RequestResetPasswordDocument = gql`
    mutation requestResetPassword($email: String!) {
  requestResetPassword(email: $email) {
    errors {
      field
      message
    }
    message
  }
}
    `;

/**
 * __useRequestResetPasswordMutation__
 *
 * To run a mutation, you first call `useRequestResetPasswordMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useRequestResetPasswordMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useRequestResetPasswordMutation({
 *   variables: {
 *     email: // value for 'email'
 *   },
 * });
 */
export function useRequestResetPasswordMutation(options: VueApolloComposable.UseMutationOptions<RequestResetPasswordMutation, RequestResetPasswordMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<RequestResetPasswordMutation, RequestResetPasswordMutationVariables>>) {
  return VueApolloComposable.useMutation<RequestResetPasswordMutation, RequestResetPasswordMutationVariables>(RequestResetPasswordDocument, options);
}
export type RequestResetPasswordMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<RequestResetPasswordMutation, RequestResetPasswordMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation resetPassword($password: String!, $token: String!) {
  resetPasswort(password: $password, token: $token) {
    errors {
      field
      message
    }
    message
  }
}
    `;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useResetPasswordMutation({
 *   variables: {
 *     password: // value for 'password'
 *     token: // value for 'token'
 *   },
 * });
 */
export function useResetPasswordMutation(options: VueApolloComposable.UseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>>) {
  return VueApolloComposable.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
}
export type ResetPasswordMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const VerifyAccountByEmailDocument = gql`
    mutation verifyAccountByEmail($id: String!, $code: String!) {
  verifyEmailCode(id: $id, code: $code) {
    errors {
      message
      field
    }
    accessToken
    user {
      email
      id
      verified
    }
  }
}
    `;

/**
 * __useVerifyAccountByEmailMutation__
 *
 * To run a mutation, you first call `useVerifyAccountByEmailMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useVerifyAccountByEmailMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useVerifyAccountByEmailMutation({
 *   variables: {
 *     id: // value for 'id'
 *     code: // value for 'code'
 *   },
 * });
 */
export function useVerifyAccountByEmailMutation(options: VueApolloComposable.UseMutationOptions<VerifyAccountByEmailMutation, VerifyAccountByEmailMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<VerifyAccountByEmailMutation, VerifyAccountByEmailMutationVariables>>) {
  return VueApolloComposable.useMutation<VerifyAccountByEmailMutation, VerifyAccountByEmailMutationVariables>(VerifyAccountByEmailDocument, options);
}
export type VerifyAccountByEmailMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<VerifyAccountByEmailMutation, VerifyAccountByEmailMutationVariables>;
export const VerifyPasswordResetDocument = gql`
    mutation verifyPasswordReset($token: String!) {
  verifyPasswordReset(token: $token) {
    errors {
      field
      message
    }
    message
  }
}
    `;

/**
 * __useVerifyPasswordResetMutation__
 *
 * To run a mutation, you first call `useVerifyPasswordResetMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useVerifyPasswordResetMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useVerifyPasswordResetMutation({
 *   variables: {
 *     token: // value for 'token'
 *   },
 * });
 */
export function useVerifyPasswordResetMutation(options: VueApolloComposable.UseMutationOptions<VerifyPasswordResetMutation, VerifyPasswordResetMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<VerifyPasswordResetMutation, VerifyPasswordResetMutationVariables>>) {
  return VueApolloComposable.useMutation<VerifyPasswordResetMutation, VerifyPasswordResetMutationVariables>(VerifyPasswordResetDocument, options);
}
export type VerifyPasswordResetMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<VerifyPasswordResetMutation, VerifyPasswordResetMutationVariables>;
export const MeDocument = gql`
    query me {
  me {
    email
    id
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a Vue component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useMeQuery();
 */
export function useMeQuery(options: VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<MeQuery, MeQueryVariables>(MeDocument, {}, options);
}
export type MeQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<MeQuery, MeQueryVariables>;