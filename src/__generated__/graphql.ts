/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Auth = {
  __typename?: 'Auth';
  token: Scalars['ID']['output'];
  user?: Maybe<User>;
};

export type Booking = {
  __typename?: 'Booking';
  _id: Scalars['ID']['output'];
  dateValue: Scalars['String']['output'];
  propertyName: Scalars['String']['output'];
};

export type CreateBookingInput = {
  dateValue: Scalars['String']['input'];
  propertyName: Scalars['String']['input'];
};

export type CreateUserInput = {
  adminCode: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  userPassword: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type LoginUserInput = {
  userPassword: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBooking?: Maybe<Booking>;
  createUser?: Maybe<Auth>;
  loginUser?: Maybe<Auth>;
  removeBooking?: Maybe<Booking>;
  removeUser?: Maybe<Auth>;
};


export type MutationCreateBookingArgs = {
  input?: InputMaybe<CreateBookingInput>;
};


export type MutationCreateUserArgs = {
  input?: InputMaybe<CreateUserInput>;
};


export type MutationLoginUserArgs = {
  input?: InputMaybe<LoginUserInput>;
};


export type MutationRemoveBookingArgs = {
  input?: InputMaybe<RemoveBookingInput>;
};


export type MutationRemoveUserArgs = {
  input?: InputMaybe<RemoveUserInput>;
};

export type Query = {
  __typename?: 'Query';
  getAboutPgImg?: Maybe<Scalars['String']['output']>;
  getAllUsers?: Maybe<Array<Maybe<User>>>;
  getCottageImgs?: Maybe<CottageImgPack>;
  getHideawayImgs?: Maybe<HideawayImgPack>;
  getHomePgImgs?: Maybe<HomePgImgPack>;
  getS3UploadUrl?: Maybe<Scalars['String']['output']>;
  queryBookingsByProperty?: Maybe<Array<Maybe<Booking>>>;
};


export type QueryGetS3UploadUrlArgs = {
  imgKey: Scalars['String']['input'];
};


export type QueryQueryBookingsByPropertyArgs = {
  propertyName: Scalars['String']['input'];
};

export type RemoveBookingInput = {
  dateValue: Scalars['String']['input'];
  propertyName: Scalars['String']['input'];
};

export type RemoveUserInput = {
  userPassword: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  _id?: Maybe<Scalars['ID']['output']>;
  firstName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  password?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
};

export type CottageImgPack = {
  __typename?: 'cottageImgPack';
  galleryArray?: Maybe<Array<Maybe<ImageObject>>>;
  headerUrl?: Maybe<Scalars['String']['output']>;
};

export type HideawayImgPack = {
  __typename?: 'hideawayImgPack';
  galleryArray?: Maybe<Array<Maybe<ImageObject>>>;
  headerUrl?: Maybe<Scalars['String']['output']>;
};

export type HomePgImgPack = {
  __typename?: 'homePgImgPack';
  cottageImgUrl?: Maybe<Scalars['String']['output']>;
  headerImgUrl?: Maybe<Scalars['String']['output']>;
  hideawayImgUrl?: Maybe<Scalars['String']['output']>;
};

export type ImageObject = {
  __typename?: 'imageObject';
  original?: Maybe<Scalars['String']['output']>;
  originalAlt?: Maybe<Scalars['String']['output']>;
  thumbnail?: Maybe<Scalars['String']['output']>;
  thumbnailAlt?: Maybe<Scalars['String']['output']>;
};

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Auth = {
  __typename?: 'Auth';
  token: Scalars['ID']['output'];
  user?: Maybe<User>;
};

export type Booking = {
  __typename?: 'Booking';
  _id: Scalars['ID']['output'];
  dateValue: Scalars['String']['output'];
  propertyName: Scalars['String']['output'];
};

export type CreateBookingInput = {
  dateValue: Scalars['String']['input'];
  propertyName: Scalars['String']['input'];
};

export type CreateUserInput = {
  adminCode: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  userPassword: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type LoginUserInput = {
  userPassword: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBooking?: Maybe<Booking>;
  createUser?: Maybe<Auth>;
  loginUser?: Maybe<Auth>;
  removeBooking?: Maybe<Booking>;
  removeUser?: Maybe<Auth>;
};


export type MutationCreateBookingArgs = {
  input?: InputMaybe<CreateBookingInput>;
};


export type MutationCreateUserArgs = {
  input?: InputMaybe<CreateUserInput>;
};


export type MutationLoginUserArgs = {
  input?: InputMaybe<LoginUserInput>;
};


export type MutationRemoveBookingArgs = {
  input?: InputMaybe<RemoveBookingInput>;
};


export type MutationRemoveUserArgs = {
  input?: InputMaybe<RemoveUserInput>;
};

export type Query = {
  __typename?: 'Query';
  getAboutPgImg?: Maybe<Scalars['String']['output']>;
  getAllUsers?: Maybe<Array<Maybe<User>>>;
  getCottageImgs?: Maybe<CottageImgPack>;
  getHideawayImgs?: Maybe<HideawayImgPack>;
  getHomePgImgs?: Maybe<HomePgImgPack>;
  getS3UploadUrl?: Maybe<Scalars['String']['output']>;
  queryBookingsByProperty?: Maybe<Array<Maybe<Booking>>>;
};


export type QueryGetS3UploadUrlArgs = {
  imgKey: Scalars['String']['input'];
};


export type QueryQueryBookingsByPropertyArgs = {
  propertyName: Scalars['String']['input'];
};

export type RemoveBookingInput = {
  dateValue: Scalars['String']['input'];
  propertyName: Scalars['String']['input'];
};

export type RemoveUserInput = {
  userPassword: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  _id?: Maybe<Scalars['ID']['output']>;
  firstName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  password?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
};

export type CottageImgPack = {
  __typename?: 'cottageImgPack';
  galleryArray?: Maybe<Array<Maybe<ImageObject>>>;
  headerUrl?: Maybe<Scalars['String']['output']>;
};

export type HideawayImgPack = {
  __typename?: 'hideawayImgPack';
  galleryArray?: Maybe<Array<Maybe<ImageObject>>>;
  headerUrl?: Maybe<Scalars['String']['output']>;
};

export type HomePgImgPack = {
  __typename?: 'homePgImgPack';
  cottageImgUrl?: Maybe<Scalars['String']['output']>;
  headerImgUrl?: Maybe<Scalars['String']['output']>;
  hideawayImgUrl?: Maybe<Scalars['String']['output']>;
};

export type ImageObject = {
  __typename?: 'imageObject';
  original?: Maybe<Scalars['String']['output']>;
  originalAlt?: Maybe<Scalars['String']['output']>;
  thumbnail?: Maybe<Scalars['String']['output']>;
  thumbnailAlt?: Maybe<Scalars['String']['output']>;
};
