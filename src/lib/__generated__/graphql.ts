/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
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

export type Amenity = {
  __typename?: 'Amenity';
  amenityIconJSX: Scalars['String']['output'];
  amenityName: Scalars['String']['output'];
};

export type AmenityInput = {
  amenityIconJSX: Scalars['String']['input'];
  amenityName: Scalars['String']['input'];
};

export type Auth = {
  __typename?: 'Auth';
  token: Scalars['ID']['output'];
  user: User;
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
  createBooking: Booking;
  createUser: Auth;
  loginUser: Auth;
  removeBooking: Booking;
  removeUser: Auth;
  updatePropertyInfo: Property;
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


export type MutationUpdatePropertyInfoArgs = {
  input?: InputMaybe<UpdatePropertyInput>;
};

export type Property = {
  __typename?: 'Property';
  amenities?: Maybe<Array<Amenity>>;
  headerImgKey: Scalars['String']['output'];
  propertyDescription: Scalars['String']['output'];
  propertyName: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  getAboutPgImg: Scalars['String']['output'];
  getAllUsers?: Maybe<Array<User>>;
  getCottageImgs: CottageImgPack;
  getHideawayImgs: HideawayImgPack;
  getHomePgImgs: HomePgImgPack;
  getPresignedS3Url: Scalars['String']['output'];
  getPropertyInfo: Property;
  queryBookingsByProperty?: Maybe<Array<Booking>>;
};


export type QueryGetPresignedS3UrlArgs = {
  altTag: Scalars['String']['input'];
  commandType: Scalars['String']['input'];
  imgKey: Scalars['String']['input'];
};


export type QueryGetPropertyInfoArgs = {
  propertyName: Scalars['String']['input'];
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

export type Update = {
  amenities?: InputMaybe<Array<AmenityInput>>;
  headerImgKey: Scalars['String']['input'];
  propertyDescription: Scalars['String']['input'];
};

export type UpdatePropertyInput = {
  propertyName: Scalars['String']['input'];
  update: Update;
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
  galleryArray: Array<ImageObject>;
  headerUrl: Scalars['String']['output'];
};

export type HideawayImgPack = {
  __typename?: 'hideawayImgPack';
  galleryArray: Array<ImageObject>;
  headerUrl: Scalars['String']['output'];
};

export type HomePgImgPack = {
  __typename?: 'homePgImgPack';
  cottageImgUrl: Scalars['String']['output'];
  headerImgUrl: Scalars['String']['output'];
  hideawayImgUrl: Scalars['String']['output'];
};

export type ImageObject = {
  __typename?: 'imageObject';
  imgKey: Scalars['String']['output'];
  original: Scalars['String']['output'];
  originalAlt: Scalars['String']['output'];
  thumbnail: Scalars['String']['output'];
  thumbnailAlt: Scalars['String']['output'];
};

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'Auth', token: string, user: { __typename?: 'User', _id?: string | null, firstName: string, lastName: string, username: string } } };

export type LoginUserMutationVariables = Exact<{
  input: LoginUserInput;
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'Auth', token: string, user: { __typename?: 'User', _id?: string | null, firstName: string, lastName: string, username: string } } };

export type RemoveUserMutationVariables = Exact<{
  input: RemoveUserInput;
}>;


export type RemoveUserMutation = { __typename?: 'Mutation', removeUser: { __typename?: 'Auth', token: string, user: { __typename?: 'User', _id?: string | null, firstName: string, lastName: string, username: string } } };

export type CreateBookingMutationVariables = Exact<{
  input: CreateBookingInput;
}>;


export type CreateBookingMutation = { __typename?: 'Mutation', createBooking: { __typename?: 'Booking', dateValue: string, propertyName: string } };

export type RemoveBookingMutationVariables = Exact<{
  input: RemoveBookingInput;
}>;


export type RemoveBookingMutation = { __typename?: 'Mutation', removeBooking: { __typename?: 'Booking', dateValue: string, propertyName: string } };

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'Query', getAllUsers?: Array<{ __typename?: 'User', firstName: string, lastName: string, username: string }> | null };

export type QueryBookingsByPropertyQueryVariables = Exact<{
  propertyName: Scalars['String']['input'];
}>;


export type QueryBookingsByPropertyQuery = { __typename?: 'Query', queryBookingsByProperty?: Array<{ __typename?: 'Booking', _id: string, dateValue: string, propertyName: string }> | null };

export type GetHomePgImgsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHomePgImgsQuery = { __typename?: 'Query', getHomePgImgs: { __typename?: 'homePgImgPack', headerImgUrl: string, hideawayImgUrl: string, cottageImgUrl: string } };

export type GetHideawayImgsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHideawayImgsQuery = { __typename?: 'Query', getHideawayImgs: { __typename?: 'hideawayImgPack', headerUrl: string, galleryArray: Array<{ __typename?: 'imageObject', imgKey: string, original: string, thumbnail: string, originalAlt: string, thumbnailAlt: string }> } };

export type GetCottageImgsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCottageImgsQuery = { __typename?: 'Query', getCottageImgs: { __typename?: 'cottageImgPack', headerUrl: string, galleryArray: Array<{ __typename?: 'imageObject', original: string, thumbnail: string, originalAlt: string, thumbnailAlt: string }> } };

export type GetAboutPgImgQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAboutPgImgQuery = { __typename?: 'Query', getAboutPgImg: string };

export type GetPropertyInfoQueryVariables = Exact<{
  propertyName: Scalars['String']['input'];
}>;


export type GetPropertyInfoQuery = { __typename?: 'Query', getPropertyInfo: { __typename?: 'Property', propertyName: string, propertyDescription: string, headerImgKey: string, amenities?: Array<{ __typename?: 'Amenity', amenityName: string, amenityIconJSX: string }> | null } };

export type GetPresignedS3UrlQueryVariables = Exact<{
  imgKey: Scalars['String']['input'];
  commandType: Scalars['String']['input'];
  altTag: Scalars['String']['input'];
}>;


export type GetPresignedS3UrlQuery = { __typename?: 'Query', getPresignedS3Url: string };


export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const LoginUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]} as unknown as DocumentNode<LoginUserMutation, LoginUserMutationVariables>;
export const RemoveUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RemoveUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]} as unknown as DocumentNode<RemoveUserMutation, RemoveUserMutationVariables>;
export const CreateBookingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateBooking"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateBookingInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBooking"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dateValue"}},{"kind":"Field","name":{"kind":"Name","value":"propertyName"}}]}}]}}]} as unknown as DocumentNode<CreateBookingMutation, CreateBookingMutationVariables>;
export const RemoveBookingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeBooking"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RemoveBookingInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeBooking"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dateValue"}},{"kind":"Field","name":{"kind":"Name","value":"propertyName"}}]}}]}}]} as unknown as DocumentNode<RemoveBookingMutation, RemoveBookingMutationVariables>;
export const GetAllUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<GetAllUsersQuery, GetAllUsersQueryVariables>;
export const QueryBookingsByPropertyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"QueryBookingsByProperty"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"propertyName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"queryBookingsByProperty"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"propertyName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"propertyName"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"dateValue"}},{"kind":"Field","name":{"kind":"Name","value":"propertyName"}}]}}]}}]} as unknown as DocumentNode<QueryBookingsByPropertyQuery, QueryBookingsByPropertyQueryVariables>;
export const GetHomePgImgsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetHomePgImgs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getHomePgImgs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"headerImgUrl"}},{"kind":"Field","name":{"kind":"Name","value":"hideawayImgUrl"}},{"kind":"Field","name":{"kind":"Name","value":"cottageImgUrl"}}]}}]}}]} as unknown as DocumentNode<GetHomePgImgsQuery, GetHomePgImgsQueryVariables>;
export const GetHideawayImgsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetHideawayImgs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getHideawayImgs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"headerUrl"}},{"kind":"Field","name":{"kind":"Name","value":"galleryArray"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imgKey"}},{"kind":"Field","name":{"kind":"Name","value":"original"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"originalAlt"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailAlt"}}]}}]}}]}}]} as unknown as DocumentNode<GetHideawayImgsQuery, GetHideawayImgsQueryVariables>;
export const GetCottageImgsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCottageImgs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCottageImgs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"headerUrl"}},{"kind":"Field","name":{"kind":"Name","value":"galleryArray"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"original"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"originalAlt"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailAlt"}}]}}]}}]}}]} as unknown as DocumentNode<GetCottageImgsQuery, GetCottageImgsQueryVariables>;
export const GetAboutPgImgDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAboutPgImg"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAboutPgImg"}}]}}]} as unknown as DocumentNode<GetAboutPgImgQuery, GetAboutPgImgQueryVariables>;
export const GetPropertyInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPropertyInfo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"propertyName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPropertyInfo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"propertyName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"propertyName"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"propertyName"}},{"kind":"Field","name":{"kind":"Name","value":"propertyDescription"}},{"kind":"Field","name":{"kind":"Name","value":"amenities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amenityName"}},{"kind":"Field","name":{"kind":"Name","value":"amenityIconJSX"}}]}},{"kind":"Field","name":{"kind":"Name","value":"headerImgKey"}}]}}]}}]} as unknown as DocumentNode<GetPropertyInfoQuery, GetPropertyInfoQueryVariables>;
export const GetPresignedS3UrlDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPresignedS3Url"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"imgKey"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commandType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"altTag"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPresignedS3Url"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"imgKey"},"value":{"kind":"Variable","name":{"kind":"Name","value":"imgKey"}}},{"kind":"Argument","name":{"kind":"Name","value":"commandType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commandType"}}},{"kind":"Argument","name":{"kind":"Name","value":"altTag"},"value":{"kind":"Variable","name":{"kind":"Name","value":"altTag"}}}]}]}}]} as unknown as DocumentNode<GetPresignedS3UrlQuery, GetPresignedS3UrlQueryVariables>;
/** All built-in and custom scalars, mapped to their actual values */
// export type Scalars = {
//   ID: { input: string; output: string; }
//   String: { input: string; output: string; }
//   Boolean: { input: boolean; output: boolean; }
//   Int: { input: number; output: number; }
//   Float: { input: number; output: number; }
// };

// export type Amenity = {
//   __typename?: 'Amenity';
//   amenityIconJSX: Scalars['String']['output'];
//   amenityName: Scalars['String']['output'];
// };

// export type AmenityInput = {
//   amenityIconJSX: Scalars['String']['input'];
//   amenityName: Scalars['String']['input'];
// };

// export type Auth = {
//   __typename?: 'Auth';
//   token: Scalars['ID']['output'];
//   user: User;
// };

// export type Booking = {
//   __typename?: 'Booking';
//   _id: Scalars['ID']['output'];
//   dateValue: Scalars['String']['output'];
//   propertyName: Scalars['String']['output'];
// };

// export type CreateBookingInput = {
//   dateValue: Scalars['String']['input'];
//   propertyName: Scalars['String']['input'];
// };

// export type CreateUserInput = {
//   adminCode: Scalars['String']['input'];
//   firstName: Scalars['String']['input'];
//   lastName: Scalars['String']['input'];
//   userPassword: Scalars['String']['input'];
//   username: Scalars['String']['input'];
// };

// export type LoginUserInput = {
//   userPassword: Scalars['String']['input'];
//   username: Scalars['String']['input'];
// };

// export type Mutation = {
//   __typename?: 'Mutation';
//   createBooking: Booking;
//   createUser: Auth;
//   loginUser: Auth;
//   removeBooking: Booking;
//   removeUser: Auth;
//   updatePropertyInfo: Property;
// };


// export type MutationCreateBookingArgs = {
//   input?: InputMaybe<CreateBookingInput>;
// };


// export type MutationCreateUserArgs = {
//   input?: InputMaybe<CreateUserInput>;
// };


// export type MutationLoginUserArgs = {
//   input?: InputMaybe<LoginUserInput>;
// };


// export type MutationRemoveBookingArgs = {
//   input?: InputMaybe<RemoveBookingInput>;
// };


// export type MutationRemoveUserArgs = {
//   input?: InputMaybe<RemoveUserInput>;
// };


// export type MutationUpdatePropertyInfoArgs = {
//   input?: InputMaybe<UpdatePropertyInput>;
// };

// export type Property = {
//   __typename?: 'Property';
//   amenities?: Maybe<Array<Amenity>>;
//   headerImgKey: Scalars['String']['output'];
//   propertyDescription: Scalars['String']['output'];
//   propertyName: Scalars['String']['output'];
// };

// export type Query = {
//   __typename?: 'Query';
//   getAboutPgImg: Scalars['String']['output'];
//   getAllUsers?: Maybe<Array<User>>;
//   getCottageImgs: CottageImgPack;
//   getHideawayImgs: HideawayImgPack;
//   getHomePgImgs: HomePgImgPack;
//   getPresignedS3Url: Scalars['String']['output'];
//   getPropertyInfo: Property;
//   queryBookingsByProperty?: Maybe<Array<Booking>>;
// };


// export type QueryGetPresignedS3UrlArgs = {
//   altTag: Scalars['String']['input'];
//   commandType: Scalars['String']['input'];
//   imgKey: Scalars['String']['input'];
// };


// export type QueryGetPropertyInfoArgs = {
//   propertyName: Scalars['String']['input'];
// };


// export type QueryQueryBookingsByPropertyArgs = {
//   propertyName: Scalars['String']['input'];
// };

// export type RemoveBookingInput = {
//   dateValue: Scalars['String']['input'];
//   propertyName: Scalars['String']['input'];
// };

// export type RemoveUserInput = {
//   userPassword: Scalars['String']['input'];
//   username: Scalars['String']['input'];
// };

// export type Update = {
//   amenities?: InputMaybe<Array<AmenityInput>>;
//   headerImgKey: Scalars['String']['input'];
//   propertyDescription: Scalars['String']['input'];
// };

// export type UpdatePropertyInput = {
//   propertyName: Scalars['String']['input'];
//   update: Update;
// };

// export type User = {
//   __typename?: 'User';
//   _id?: Maybe<Scalars['ID']['output']>;
//   firstName: Scalars['String']['output'];
//   lastName: Scalars['String']['output'];
//   password?: Maybe<Scalars['String']['output']>;
//   username: Scalars['String']['output'];
// };

// export type CottageImgPack = {
//   __typename?: 'cottageImgPack';
//   galleryArray: Array<ImageObject>;
//   headerUrl: Scalars['String']['output'];
// };

// export type HideawayImgPack = {
//   __typename?: 'hideawayImgPack';
//   galleryArray: Array<ImageObject>;
//   headerUrl: Scalars['String']['output'];
// };

// export type HomePgImgPack = {
//   __typename?: 'homePgImgPack';
//   cottageImgUrl: Scalars['String']['output'];
//   headerImgUrl: Scalars['String']['output'];
//   hideawayImgUrl: Scalars['String']['output'];
// };

// export type ImageObject = {
//   __typename?: 'imageObject';
//   imgKey: Scalars['String']['output'];
//   original: Scalars['String']['output'];
//   originalAlt: Scalars['String']['output'];
//   thumbnail: Scalars['String']['output'];
//   thumbnailAlt: Scalars['String']['output'];
// };

// export type CreateUserMutationVariables = Exact<{
//   input: CreateUserInput;
// }>;


// export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'Auth', token: string, user: { __typename?: 'User', _id?: string | null, firstName: string, lastName: string, username: string } } };

// export type LoginUserMutationVariables = Exact<{
//   input: LoginUserInput;
// }>;


// export type LoginUserMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'Auth', token: string, user: { __typename?: 'User', _id?: string | null, firstName: string, lastName: string, username: string } } };

// export type RemoveUserMutationVariables = Exact<{
//   input: RemoveUserInput;
// }>;


// export type RemoveUserMutation = { __typename?: 'Mutation', removeUser: { __typename?: 'Auth', token: string, user: { __typename?: 'User', _id?: string | null, firstName: string, lastName: string, username: string } } };

// export type CreateBookingMutationVariables = Exact<{
//   input: CreateBookingInput;
// }>;


// export type CreateBookingMutation = { __typename?: 'Mutation', createBooking: { __typename?: 'Booking', dateValue: string, propertyName: string } };

// export type RemoveBookingMutationVariables = Exact<{
//   input: RemoveBookingInput;
// }>;


// export type RemoveBookingMutation = { __typename?: 'Mutation', removeBooking: { __typename?: 'Booking', dateValue: string, propertyName: string } };

// export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


// export type GetAllUsersQuery = { __typename?: 'Query', getAllUsers?: Array<{ __typename?: 'User', firstName: string, lastName: string, username: string }> | null };

// export type QueryBookingsByPropertyQueryVariables = Exact<{
//   propertyName: Scalars['String']['input'];
// }>;


// export type QueryBookingsByPropertyQuery = { __typename?: 'Query', queryBookingsByProperty?: Array<{ __typename?: 'Booking', _id: string, dateValue: string, propertyName: string }> | null };

// export type GetHomePgImgsQueryVariables = Exact<{ [key: string]: never; }>;


// export type GetHomePgImgsQuery = { __typename?: 'Query', getHomePgImgs: { __typename?: 'homePgImgPack', headerImgUrl: string, hideawayImgUrl: string, cottageImgUrl: string } };

// export type GetHideawayImgsQueryVariables = Exact<{ [key: string]: never; }>;


// export type GetHideawayImgsQuery = { __typename?: 'Query', getHideawayImgs: { __typename?: 'hideawayImgPack', headerUrl: string, galleryArray: Array<{ __typename?: 'imageObject', imgKey: string, original: string, thumbnail: string, originalAlt: string, thumbnailAlt: string }> } };

// export type GetCottageImgsQueryVariables = Exact<{ [key: string]: never; }>;


// export type GetCottageImgsQuery = { __typename?: 'Query', getCottageImgs: { __typename?: 'cottageImgPack', headerUrl: string, galleryArray: Array<{ __typename?: 'imageObject', original: string, thumbnail: string, originalAlt: string, thumbnailAlt: string }> } };

// export type GetAboutPgImgQueryVariables = Exact<{ [key: string]: never; }>;


// export type GetAboutPgImgQuery = { __typename?: 'Query', getAboutPgImg: string };

// export type GetPropertyInfoQueryVariables = Exact<{
//   propertyName: Scalars['String']['input'];
// }>;


// export type GetPropertyInfoQuery = { __typename?: 'Query', getPropertyInfo: { __typename?: 'Property', propertyName: string, propertyDescription: string, headerImgKey: string, amenities?: Array<{ __typename?: 'Amenity', amenityName: string, amenityIconJSX: string }> | null } };

// export type GetPresignedS3UrlQueryVariables = Exact<{
//   imgKey: Scalars['String']['input'];
//   commandType: Scalars['String']['input'];
//   altTag: Scalars['String']['input'];
// }>;


// export type GetPresignedS3UrlQuery = { __typename?: 'Query', getPresignedS3Url: string };
