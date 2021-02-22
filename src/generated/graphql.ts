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
  deleted?: Maybe<Scalars['Boolean']>;
  pinned: Scalars['Boolean'];
  archived: Scalars['Boolean'];
};

export type ContentPreview = {
  __typename?: 'ContentPreview';
  ogSiteName?: Maybe<Scalars['String']>;
  ogTitle?: Maybe<Scalars['String']>;
  ogDescription?: Maybe<Scalars['String']>;
  ogImageUrl?: Maybe<Scalars['String']>;
  embeddedUrl?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type Entry = {
  __typename?: 'Entry';
  _id: Scalars['String'];
  id: Scalars['String'];
  updatedAt: Scalars['String'];
  createdAt: Scalars['String'];
  deleted?: Maybe<Scalars['Boolean']>;
  pinned: Scalars['Boolean'];
  archived: Scalars['Boolean'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  url: Scalars['String'];
  type: Scalars['String'];
  preview?: Maybe<ContentPreview>;
  calendarDate: Scalars['String'];
  hashedKey: Scalars['String'];
  processing: Scalars['Boolean'];
  categories: Array<Scalars['String']>;
  user: User;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  id: Scalars['String'];
  updatedAt: Scalars['String'];
  createdAt: Scalars['String'];
  deleted?: Maybe<Scalars['Boolean']>;
  pinned: Scalars['Boolean'];
  archived: Scalars['Boolean'];
  email: Scalars['String'];
  username: Scalars['String'];
  verified: Scalars['Boolean'];
  entries: User;
};

export type SharedList = {
  __typename?: 'SharedList';
  list: List;
  entries: Array<Entry>;
};

export type List = {
  __typename?: 'List';
  _id: Scalars['String'];
  id: Scalars['String'];
  updatedAt: Scalars['String'];
  createdAt: Scalars['String'];
  deleted?: Maybe<Scalars['Boolean']>;
  pinned: Scalars['Boolean'];
  archived: Scalars['Boolean'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  calendarDate: Scalars['String'];
  hashedKey: Scalars['String'];
  processing: Scalars['Boolean'];
  categories: Array<Scalars['String']>;
  user: User;
  entries: Array<Scalars['String']>;
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

export type EntryInput = {
  id: Scalars['String'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  url: Scalars['String'];
  preview?: Maybe<ContentPreviewInput>;
  type: Scalars['String'];
  categories: Array<Scalars['String']>;
  calendarDate: Scalars['String'];
  updatedAt: Scalars['String'];
  hashedKey: Scalars['String'];
  processing: Scalars['Boolean'];
  deleted?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['String']>;
  pinned: Scalars['Boolean'];
  archived: Scalars['Boolean'];
};

export type ContentPreviewInput = {
  ogSiteName?: Maybe<Scalars['String']>;
  ogTitle?: Maybe<Scalars['String']>;
  ogDescription?: Maybe<Scalars['String']>;
  ogImageUrl?: Maybe<Scalars['String']>;
  embeddedUrl?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type ListInput = {
  id: Scalars['String'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  categories: Array<Scalars['String']>;
  entries: Array<Scalars['String']>;
  calendarDate: Scalars['String'];
  updatedAt: Scalars['String'];
  hashedKey: Scalars['String'];
  processing: Scalars['Boolean'];
  deleted?: Maybe<Scalars['Boolean']>;
  pinned?: Maybe<Scalars['Boolean']>;
  archived?: Maybe<Scalars['Boolean']>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  rxEntryReplication: Array<Entry>;
  getSharedEntry: Entry;
  users: Array<User>;
  me: User;
  rxListReplication: Array<List>;
  getSharedList: SharedList;
};


export type QueryRxEntryReplicationArgs = {
  limit: Scalars['Float'];
  minUpdatedAt: Scalars['String'];
  lastId: Scalars['String'];
};


export type QueryGetSharedEntryArgs = {
  id: Scalars['String'];
};


export type QueryRxListReplicationArgs = {
  limit: Scalars['Float'];
  minUpdatedAt: Scalars['String'];
  lastId: Scalars['String'];
};


export type QueryGetSharedListArgs = {
  id: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  setEntry: Entry;
  revokeRefreshToken: Scalars['Boolean'];
  logout: Scalars['Boolean'];
  setList: List;
  login: LoginResponse;
  requestResetPassword: ValidResponse;
  verifyPasswordReset: ValidResponse;
  resetPasswort: ValidResponse;
  changePassword: ValidResponse;
  register: UserResponse;
  verifyEmailCode: LoginResponse;
  verifySecretKey: Scalars['Boolean'];
};


export type MutationSetEntryArgs = {
  entry: EntryInput;
};


export type MutationRevokeRefreshTokenArgs = {
  userId: Scalars['String'];
};


export type MutationSetListArgs = {
  list: ListInput;
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


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
  email: Scalars['String'];
};


export type MutationRegisterArgs = {
  secret: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationVerifyEmailCodeArgs = {
  code: Scalars['String'];
  id: Scalars['String'];
};


export type MutationVerifySecretKeyArgs = {
  key: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  changedEntry: Entry;
  changedList: List;
};


export type SubscriptionChangedEntryArgs = {
  token: Scalars['String'];
};


export type SubscriptionChangedListArgs = {
  token: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'email' | 'username' | 'verified' | 'id'>
    )>, errors?: Maybe<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
  secret: Scalars['String'];
}>;


export type RegisterMutation = (
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

export type VerifySecretKeyMutationVariables = Exact<{
  key: Scalars['String'];
}>;


export type VerifySecretKeyMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'verifySecretKey'>
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
      & Pick<User, 'email' | 'id' | 'verified' | 'username'>
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

export type CreateEntryMutationVariables = Exact<{
  entry: EntryInput;
}>;


export type CreateEntryMutation = (
  { __typename?: 'Mutation' }
  & { setEntry: (
    { __typename?: 'Entry' }
    & Pick<Entry, 'id' | 'updatedAt'>
  ) }
);

export type GetSharedEntryQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetSharedEntryQuery = (
  { __typename?: 'Query' }
  & { getSharedEntry: (
    { __typename?: 'Entry' }
    & Pick<Entry, 'id' | 'title' | 'description' | 'url' | 'type' | 'categories' | 'calendarDate' | 'processing' | 'updatedAt' | 'hashedKey' | 'deleted' | 'createdAt' | 'pinned' | 'archived'>
    & { preview?: Maybe<(
      { __typename?: 'ContentPreview' }
      & Pick<ContentPreview, 'ogSiteName' | 'ogTitle' | 'ogDescription' | 'ogImageUrl' | 'embeddedUrl' | 'type'>
    )> }
  ) }
);

export type OnEntryChangedSubscriptionVariables = Exact<{
  token: Scalars['String'];
}>;


export type OnEntryChangedSubscription = (
  { __typename?: 'Subscription' }
  & { changedEntry: (
    { __typename?: 'Entry' }
    & Pick<Entry, 'id'>
  ) }
);

export type RxEntryReplicationQueryVariables = Exact<{
  lastId: Scalars['String'];
  minUpdatedAt: Scalars['String'];
  limit: Scalars['Float'];
}>;


export type RxEntryReplicationQuery = (
  { __typename?: 'Query' }
  & { rxEntryReplication: Array<(
    { __typename?: 'Entry' }
    & Pick<Entry, 'id' | 'title' | 'description' | 'url' | 'type' | 'categories' | 'calendarDate' | 'processing' | 'updatedAt' | 'hashedKey' | 'deleted' | 'createdAt' | 'pinned' | 'archived'>
    & { preview?: Maybe<(
      { __typename?: 'ContentPreview' }
      & Pick<ContentPreview, 'ogSiteName' | 'ogTitle' | 'ogDescription' | 'ogImageUrl' | 'embeddedUrl' | 'type'>
    )> }
  )> }
);

export type GetSharedListQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetSharedListQuery = (
  { __typename?: 'Query' }
  & { getSharedList: (
    { __typename?: 'SharedList' }
    & { list: (
      { __typename?: 'List' }
      & Pick<List, 'id' | 'updatedAt' | 'deleted' | 'title' | 'description' | 'calendarDate' | 'hashedKey' | 'processing' | 'categories' | 'entries' | 'pinned' | 'archived'>
    ), entries: Array<(
      { __typename?: 'Entry' }
      & Pick<Entry, 'id' | 'title' | 'description' | 'url' | 'type' | 'categories' | 'calendarDate' | 'processing' | 'updatedAt' | 'hashedKey' | 'deleted' | 'createdAt' | 'pinned' | 'archived'>
      & { preview?: Maybe<(
        { __typename?: 'ContentPreview' }
        & Pick<ContentPreview, 'ogSiteName' | 'ogTitle' | 'ogDescription' | 'ogImageUrl' | 'embeddedUrl' | 'type'>
      )> }
    )> }
  ) }
);

export type ChangedListSubscriptionVariables = Exact<{
  token: Scalars['String'];
}>;


export type ChangedListSubscription = (
  { __typename?: 'Subscription' }
  & { changedList: (
    { __typename?: 'List' }
    & Pick<List, 'id'>
  ) }
);

export type RxListReplicationQueryVariables = Exact<{
  lastId: Scalars['String'];
  minUpdatedAt: Scalars['String'];
  limit: Scalars['Float'];
}>;


export type RxListReplicationQuery = (
  { __typename?: 'Query' }
  & { rxListReplication: Array<(
    { __typename?: 'List' }
    & Pick<List, 'id' | 'updatedAt' | 'deleted' | 'title' | 'description' | 'calendarDate' | 'hashedKey' | 'processing' | 'categories' | 'entries' | 'pinned' | 'archived'>
  )> }
);

export type SetListMutationVariables = Exact<{
  list: ListInput;
}>;


export type SetListMutation = (
  { __typename?: 'Mutation' }
  & { setList: (
    { __typename?: 'List' }
    & Pick<List, 'id' | 'updatedAt'>
  ) }
);


export const LoginDocument = gql`
    mutation login($email: String!, $password: String!) {
  login(input: {email: $email, password: $password}) {
    user {
      email
      username
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
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useLoginMutation({
 *   variables: {
 *     email: // value for 'email'
 *     password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(options: VueApolloComposable.UseMutationOptions<LoginMutation, LoginMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<LoginMutation, LoginMutationVariables>>) {
  return VueApolloComposable.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
}
export type LoginMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation logout {
  logout
}
    `;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useLogoutMutation();
 */
export function useLogoutMutation(options: VueApolloComposable.UseMutationOptions<LogoutMutation, LogoutMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<LogoutMutation, LogoutMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
}
export type LogoutMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation register($email: String!, $password: String!, $username: String!, $secret: String!) {
  register(
    email: $email
    password: $password
    username: $username
    secret: $secret
  ) {
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
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useRegisterMutation({
 *   variables: {
 *     email: // value for 'email'
 *     password: // value for 'password'
 *     username: // value for 'username'
 *     secret: // value for 'secret'
 *   },
 * });
 */
export function useRegisterMutation(options: VueApolloComposable.UseMutationOptions<RegisterMutation, RegisterMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<RegisterMutation, RegisterMutationVariables>>) {
  return VueApolloComposable.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
}
export type RegisterMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<RegisterMutation, RegisterMutationVariables>;
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
export const VerifySecretKeyDocument = gql`
    mutation verifySecretKey($key: String!) {
  verifySecretKey(key: $key)
}
    `;

/**
 * __useVerifySecretKeyMutation__
 *
 * To run a mutation, you first call `useVerifySecretKeyMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useVerifySecretKeyMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useVerifySecretKeyMutation({
 *   variables: {
 *     key: // value for 'key'
 *   },
 * });
 */
export function useVerifySecretKeyMutation(options: VueApolloComposable.UseMutationOptions<VerifySecretKeyMutation, VerifySecretKeyMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<VerifySecretKeyMutation, VerifySecretKeyMutationVariables>>) {
  return VueApolloComposable.useMutation<VerifySecretKeyMutation, VerifySecretKeyMutationVariables>(VerifySecretKeyDocument, options);
}
export type VerifySecretKeyMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<VerifySecretKeyMutation, VerifySecretKeyMutationVariables>;
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
      username
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
export const CreateEntryDocument = gql`
    mutation createEntry($entry: EntryInput!) {
  setEntry(entry: $entry) {
    id
    updatedAt
  }
}
    `;

/**
 * __useCreateEntryMutation__
 *
 * To run a mutation, you first call `useCreateEntryMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateEntryMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateEntryMutation({
 *   variables: {
 *     entry: // value for 'entry'
 *   },
 * });
 */
export function useCreateEntryMutation(options: VueApolloComposable.UseMutationOptions<CreateEntryMutation, CreateEntryMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateEntryMutation, CreateEntryMutationVariables>>) {
  return VueApolloComposable.useMutation<CreateEntryMutation, CreateEntryMutationVariables>(CreateEntryDocument, options);
}
export type CreateEntryMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreateEntryMutation, CreateEntryMutationVariables>;
export const GetSharedEntryDocument = gql`
    query getSharedEntry($id: String!) {
  getSharedEntry(id: $id) {
    id
    title
    description
    url
    type
    preview {
      ogSiteName
      ogTitle
      ogDescription
      ogImageUrl
      embeddedUrl
      type
    }
    categories
    calendarDate
    processing
    updatedAt
    hashedKey
    deleted
    createdAt
    pinned
    archived
  }
}
    `;

/**
 * __useGetSharedEntryQuery__
 *
 * To run a query within a Vue component, call `useGetSharedEntryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSharedEntryQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetSharedEntryQuery({
 *   id: // value for 'id'
 * });
 */
export function useGetSharedEntryQuery(variables: GetSharedEntryQueryVariables | VueCompositionApi.Ref<GetSharedEntryQueryVariables> | ReactiveFunction<GetSharedEntryQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetSharedEntryQuery, GetSharedEntryQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetSharedEntryQuery, GetSharedEntryQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetSharedEntryQuery, GetSharedEntryQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetSharedEntryQuery, GetSharedEntryQueryVariables>(GetSharedEntryDocument, variables, options);
}
export type GetSharedEntryQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetSharedEntryQuery, GetSharedEntryQueryVariables>;
export const OnEntryChangedDocument = gql`
    subscription onEntryChanged($token: String!) {
  changedEntry(token: $token) {
    id
  }
}
    `;

/**
 * __useOnEntryChangedSubscription__
 *
 * To run a query within a Vue component, call `useOnEntryChangedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnEntryChangedSubscription` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the subscription
 * @param options that will be passed into the subscription, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/subscription.html#options;
 *
 * @example
 * const { result, loading, error } = useOnEntryChangedSubscription({
 *   token: // value for 'token'
 * });
 */
export function useOnEntryChangedSubscription(variables: OnEntryChangedSubscriptionVariables | VueCompositionApi.Ref<OnEntryChangedSubscriptionVariables> | ReactiveFunction<OnEntryChangedSubscriptionVariables>, options: VueApolloComposable.UseSubscriptionOptions<OnEntryChangedSubscription, OnEntryChangedSubscriptionVariables> | VueCompositionApi.Ref<VueApolloComposable.UseSubscriptionOptions<OnEntryChangedSubscription, OnEntryChangedSubscriptionVariables>> | ReactiveFunction<VueApolloComposable.UseSubscriptionOptions<OnEntryChangedSubscription, OnEntryChangedSubscriptionVariables>> = {}) {
  return VueApolloComposable.useSubscription<OnEntryChangedSubscription, OnEntryChangedSubscriptionVariables>(OnEntryChangedDocument, variables, options);
}
export type OnEntryChangedSubscriptionCompositionFunctionResult = VueApolloComposable.UseSubscriptionReturn<OnEntryChangedSubscription, OnEntryChangedSubscriptionVariables>;
export const RxEntryReplicationDocument = gql`
    query rxEntryReplication($lastId: String!, $minUpdatedAt: String!, $limit: Float!) {
  rxEntryReplication(lastId: $lastId, minUpdatedAt: $minUpdatedAt, limit: $limit) {
    id
    title
    description
    url
    type
    preview {
      ogSiteName
      ogTitle
      ogDescription
      ogImageUrl
      embeddedUrl
      type
    }
    categories
    calendarDate
    processing
    updatedAt
    hashedKey
    deleted
    createdAt
    pinned
    archived
  }
}
    `;

/**
 * __useRxEntryReplicationQuery__
 *
 * To run a query within a Vue component, call `useRxEntryReplicationQuery` and pass it any options that fit your needs.
 * When your component renders, `useRxEntryReplicationQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useRxEntryReplicationQuery({
 *   lastId: // value for 'lastId'
 *   minUpdatedAt: // value for 'minUpdatedAt'
 *   limit: // value for 'limit'
 * });
 */
export function useRxEntryReplicationQuery(variables: RxEntryReplicationQueryVariables | VueCompositionApi.Ref<RxEntryReplicationQueryVariables> | ReactiveFunction<RxEntryReplicationQueryVariables>, options: VueApolloComposable.UseQueryOptions<RxEntryReplicationQuery, RxEntryReplicationQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<RxEntryReplicationQuery, RxEntryReplicationQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<RxEntryReplicationQuery, RxEntryReplicationQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<RxEntryReplicationQuery, RxEntryReplicationQueryVariables>(RxEntryReplicationDocument, variables, options);
}
export type RxEntryReplicationQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<RxEntryReplicationQuery, RxEntryReplicationQueryVariables>;
export const GetSharedListDocument = gql`
    query getSharedList($id: String!) {
  getSharedList(id: $id) {
    list {
      id
      updatedAt
      deleted
      title
      description
      calendarDate
      hashedKey
      processing
      categories
      entries
      calendarDate
      categories
      processing
      pinned
      archived
    }
    entries {
      id
      title
      description
      url
      type
      preview {
        ogSiteName
        ogTitle
        ogDescription
        ogImageUrl
        embeddedUrl
        type
      }
      categories
      calendarDate
      processing
      updatedAt
      hashedKey
      deleted
      createdAt
      pinned
      archived
    }
  }
}
    `;

/**
 * __useGetSharedListQuery__
 *
 * To run a query within a Vue component, call `useGetSharedListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSharedListQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetSharedListQuery({
 *   id: // value for 'id'
 * });
 */
export function useGetSharedListQuery(variables: GetSharedListQueryVariables | VueCompositionApi.Ref<GetSharedListQueryVariables> | ReactiveFunction<GetSharedListQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetSharedListQuery, GetSharedListQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetSharedListQuery, GetSharedListQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetSharedListQuery, GetSharedListQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetSharedListQuery, GetSharedListQueryVariables>(GetSharedListDocument, variables, options);
}
export type GetSharedListQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetSharedListQuery, GetSharedListQueryVariables>;
export const ChangedListDocument = gql`
    subscription changedList($token: String!) {
  changedList(token: $token) {
    id
  }
}
    `;

/**
 * __useChangedListSubscription__
 *
 * To run a query within a Vue component, call `useChangedListSubscription` and pass it any options that fit your needs.
 * When your component renders, `useChangedListSubscription` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the subscription
 * @param options that will be passed into the subscription, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/subscription.html#options;
 *
 * @example
 * const { result, loading, error } = useChangedListSubscription({
 *   token: // value for 'token'
 * });
 */
export function useChangedListSubscription(variables: ChangedListSubscriptionVariables | VueCompositionApi.Ref<ChangedListSubscriptionVariables> | ReactiveFunction<ChangedListSubscriptionVariables>, options: VueApolloComposable.UseSubscriptionOptions<ChangedListSubscription, ChangedListSubscriptionVariables> | VueCompositionApi.Ref<VueApolloComposable.UseSubscriptionOptions<ChangedListSubscription, ChangedListSubscriptionVariables>> | ReactiveFunction<VueApolloComposable.UseSubscriptionOptions<ChangedListSubscription, ChangedListSubscriptionVariables>> = {}) {
  return VueApolloComposable.useSubscription<ChangedListSubscription, ChangedListSubscriptionVariables>(ChangedListDocument, variables, options);
}
export type ChangedListSubscriptionCompositionFunctionResult = VueApolloComposable.UseSubscriptionReturn<ChangedListSubscription, ChangedListSubscriptionVariables>;
export const RxListReplicationDocument = gql`
    query rxListReplication($lastId: String!, $minUpdatedAt: String!, $limit: Float!) {
  rxListReplication(lastId: $lastId, minUpdatedAt: $minUpdatedAt, limit: $limit) {
    id
    updatedAt
    deleted
    title
    description
    calendarDate
    hashedKey
    processing
    categories
    entries
    calendarDate
    categories
    processing
    pinned
    archived
  }
}
    `;

/**
 * __useRxListReplicationQuery__
 *
 * To run a query within a Vue component, call `useRxListReplicationQuery` and pass it any options that fit your needs.
 * When your component renders, `useRxListReplicationQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useRxListReplicationQuery({
 *   lastId: // value for 'lastId'
 *   minUpdatedAt: // value for 'minUpdatedAt'
 *   limit: // value for 'limit'
 * });
 */
export function useRxListReplicationQuery(variables: RxListReplicationQueryVariables | VueCompositionApi.Ref<RxListReplicationQueryVariables> | ReactiveFunction<RxListReplicationQueryVariables>, options: VueApolloComposable.UseQueryOptions<RxListReplicationQuery, RxListReplicationQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<RxListReplicationQuery, RxListReplicationQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<RxListReplicationQuery, RxListReplicationQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<RxListReplicationQuery, RxListReplicationQueryVariables>(RxListReplicationDocument, variables, options);
}
export type RxListReplicationQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<RxListReplicationQuery, RxListReplicationQueryVariables>;
export const SetListDocument = gql`
    mutation setList($list: ListInput!) {
  setList(list: $list) {
    id
    updatedAt
  }
}
    `;

/**
 * __useSetListMutation__
 *
 * To run a mutation, you first call `useSetListMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useSetListMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useSetListMutation({
 *   variables: {
 *     list: // value for 'list'
 *   },
 * });
 */
export function useSetListMutation(options: VueApolloComposable.UseMutationOptions<SetListMutation, SetListMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<SetListMutation, SetListMutationVariables>>) {
  return VueApolloComposable.useMutation<SetListMutation, SetListMutationVariables>(SetListDocument, options);
}
export type SetListMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<SetListMutation, SetListMutationVariables>;