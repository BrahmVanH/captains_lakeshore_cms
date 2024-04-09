/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n\tmutation CreateUser($input: CreateUserInput!) {\n\t\tcreateUser(input: $input) {\n\t\t\ttoken\n\t\t\tuser {\n\t\t\t\t_id\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t\tusername\n\t\t\t}\n\t\t}\n\t}\n": types.CreateUserDocument,
    "\n\tmutation LoginUser($input: LoginUserInput!) {\n\t\tloginUser(input: $input) {\n\t\t\ttoken\n\t\t\tuser {\n\t\t\t\t_id\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t\tusername\n\t\t\t}\n\t\t}\n\t}\n": types.LoginUserDocument,
    "\n\tmutation removeUser($input: RemoveUserInput!) {\n\t\tremoveUser(input: $input) {\n\t\t\ttoken\n\t\t\tuser {\n\t\t\t\t_id\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t\tusername\n\t\t\t}\n\t\t}\n\t}\n": types.RemoveUserDocument,
    "\n\tmutation CreateBooking($input: CreateBookingInput!) {\n\t\tcreateBooking(input: $input) {\n\t\t\tdateValue\n\t\t\tpropertyId\n\t\t}\n\t}\n": types.CreateBookingDocument,
    "\n\tmutation removeBooking($input: RemoveBookingInput!) {\n\t\tremoveBooking(input: $input) {\n\t\t\tdeletedCount\n\t\t}\n\t}\n": types.RemoveBookingDocument,
    "\n\tmutation UpdatePropertyInfo($input: UpdatePropertyInput!) {\n\t\tupdatePropertyInfo(input: $input) {\n\t\t\t_id\n\t\t\tpropertyName\n\t\t\tpropertyDescription\n\t\t\tamenities {\n\t\t\t\tamenityName\n\t\t\t\tamenityType\n\t\t\t}\n\t\t\theaderImgKey\n\t\t}\n\t}\n": types.UpdatePropertyInfoDocument,
    "\n\tmutation DeleteS3Objects($input: DeleteS3ObjectInput!) {\n\t\tdeleteS3Objects(input: $input) {\n\t\t\tstatus\n\t\t\tmessage\n\t\t}\n\t}\n": types.DeleteS3ObjectsDocument,
    "\n\tquery GetAllUsers {\n\t\tgetAllUsers {\n\t\t\tfirstName\n\t\t\tlastName\n\t\t\tusername\n\t\t}\n\t}\n": types.GetAllUsersDocument,
    "\n\tquery QueryBookingsByProperty($propertyId: ID!) {\n\t\tqueryBookingsByProperty(propertyId: $propertyId) {\n\t\t\t_id\n\t\t\tdateValue\n\t\t\tpropertyId\n\t\t}\n\t}\n": types.QueryBookingsByPropertyDocument,
    "\n\tquery GetHomePgImgs {\n\t\tgetHomePgImgs {\n\t\t\theaderImgUrl\n\t\t\thideawayImgUrl\n\t\t\tcottageImgUrl\n\t\t}\n\t}\n": types.GetHomePgImgsDocument,
    "\n\tquery GetHideawayImgs {\n\t\tgetHideawayImgs {\n\t\t\theaderUrl\n\t\t\tgalleryArray {\n\t\t\t\timgKey\n\t\t\t\toriginal\n\t\t\t\tthumbnail\n\t\t\t\toriginalAlt\n\t\t\t\tthumbnailAlt\n\t\t\t}\n\t\t}\n\t}\n": types.GetHideawayImgsDocument,
    "\n\tquery GetCottageImgs {\n\t\tgetCottageImgs {\n\t\t\theaderUrl\n\t\t\tgalleryArray {\n\t\t\t\toriginal\n\t\t\t\tthumbnail\n\t\t\t\toriginalAlt\n\t\t\t\tthumbnailAlt\n\t\t\t}\n\t\t}\n\t}\n": types.GetCottageImgsDocument,
    "\n\tquery GetAboutPgImg {\n\t\tgetAboutPgImg\n\t}\n": types.GetAboutPgImgDocument,
    "\n\tquery GetPropertyInfo($_id: ID!) {\n\t\tgetPropertyInfo(_id: $_id) {\n\t\t\t_id\n\t\t\tpropertyName\n\t\t\tpropertyDescription\n\t\t\tamenities {\n\t\t\t\tamenityName\n\t\t\t\tamenityType\n\t\t\t}\n\t\t\theaderImgKey\n\t\t}\n\t}\n": types.GetPropertyInfoDocument,
    "\n\tquery GetProperties {\n\t\tgetProperties {\n\t\t\t_id\n\t\t\tpropertyName\n\t\t\tpropertyDescription\n\t\t\tamenities {\n\t\t\t\tamenityName\n\t\t\t\tamenityType\n\t\t\t}\n\t\t\theaderImgKey\n\t\t}\n\t}\n": types.GetPropertiesDocument,
    "\n\tquery GetPresignedS3Url($imgKey: String!, $commandType: String!, $altTag: String!) {\n\t\tgetPresignedS3Url(imgKey: $imgKey, commandType: $commandType, altTag: $altTag)\n\t}\n": types.GetPresignedS3UrlDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation CreateUser($input: CreateUserInput!) {\n\t\tcreateUser(input: $input) {\n\t\t\ttoken\n\t\t\tuser {\n\t\t\t\t_id\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t\tusername\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation CreateUser($input: CreateUserInput!) {\n\t\tcreateUser(input: $input) {\n\t\t\ttoken\n\t\t\tuser {\n\t\t\t\t_id\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t\tusername\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation LoginUser($input: LoginUserInput!) {\n\t\tloginUser(input: $input) {\n\t\t\ttoken\n\t\t\tuser {\n\t\t\t\t_id\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t\tusername\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation LoginUser($input: LoginUserInput!) {\n\t\tloginUser(input: $input) {\n\t\t\ttoken\n\t\t\tuser {\n\t\t\t\t_id\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t\tusername\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation removeUser($input: RemoveUserInput!) {\n\t\tremoveUser(input: $input) {\n\t\t\ttoken\n\t\t\tuser {\n\t\t\t\t_id\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t\tusername\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation removeUser($input: RemoveUserInput!) {\n\t\tremoveUser(input: $input) {\n\t\t\ttoken\n\t\t\tuser {\n\t\t\t\t_id\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t\tusername\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation CreateBooking($input: CreateBookingInput!) {\n\t\tcreateBooking(input: $input) {\n\t\t\tdateValue\n\t\t\tpropertyId\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation CreateBooking($input: CreateBookingInput!) {\n\t\tcreateBooking(input: $input) {\n\t\t\tdateValue\n\t\t\tpropertyId\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation removeBooking($input: RemoveBookingInput!) {\n\t\tremoveBooking(input: $input) {\n\t\t\tdeletedCount\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation removeBooking($input: RemoveBookingInput!) {\n\t\tremoveBooking(input: $input) {\n\t\t\tdeletedCount\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation UpdatePropertyInfo($input: UpdatePropertyInput!) {\n\t\tupdatePropertyInfo(input: $input) {\n\t\t\t_id\n\t\t\tpropertyName\n\t\t\tpropertyDescription\n\t\t\tamenities {\n\t\t\t\tamenityName\n\t\t\t\tamenityType\n\t\t\t}\n\t\t\theaderImgKey\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation UpdatePropertyInfo($input: UpdatePropertyInput!) {\n\t\tupdatePropertyInfo(input: $input) {\n\t\t\t_id\n\t\t\tpropertyName\n\t\t\tpropertyDescription\n\t\t\tamenities {\n\t\t\t\tamenityName\n\t\t\t\tamenityType\n\t\t\t}\n\t\t\theaderImgKey\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation DeleteS3Objects($input: DeleteS3ObjectInput!) {\n\t\tdeleteS3Objects(input: $input) {\n\t\t\tstatus\n\t\t\tmessage\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation DeleteS3Objects($input: DeleteS3ObjectInput!) {\n\t\tdeleteS3Objects(input: $input) {\n\t\t\tstatus\n\t\t\tmessage\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery GetAllUsers {\n\t\tgetAllUsers {\n\t\t\tfirstName\n\t\t\tlastName\n\t\t\tusername\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetAllUsers {\n\t\tgetAllUsers {\n\t\t\tfirstName\n\t\t\tlastName\n\t\t\tusername\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery QueryBookingsByProperty($propertyId: ID!) {\n\t\tqueryBookingsByProperty(propertyId: $propertyId) {\n\t\t\t_id\n\t\t\tdateValue\n\t\t\tpropertyId\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery QueryBookingsByProperty($propertyId: ID!) {\n\t\tqueryBookingsByProperty(propertyId: $propertyId) {\n\t\t\t_id\n\t\t\tdateValue\n\t\t\tpropertyId\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery GetHomePgImgs {\n\t\tgetHomePgImgs {\n\t\t\theaderImgUrl\n\t\t\thideawayImgUrl\n\t\t\tcottageImgUrl\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetHomePgImgs {\n\t\tgetHomePgImgs {\n\t\t\theaderImgUrl\n\t\t\thideawayImgUrl\n\t\t\tcottageImgUrl\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery GetHideawayImgs {\n\t\tgetHideawayImgs {\n\t\t\theaderUrl\n\t\t\tgalleryArray {\n\t\t\t\timgKey\n\t\t\t\toriginal\n\t\t\t\tthumbnail\n\t\t\t\toriginalAlt\n\t\t\t\tthumbnailAlt\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetHideawayImgs {\n\t\tgetHideawayImgs {\n\t\t\theaderUrl\n\t\t\tgalleryArray {\n\t\t\t\timgKey\n\t\t\t\toriginal\n\t\t\t\tthumbnail\n\t\t\t\toriginalAlt\n\t\t\t\tthumbnailAlt\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery GetCottageImgs {\n\t\tgetCottageImgs {\n\t\t\theaderUrl\n\t\t\tgalleryArray {\n\t\t\t\toriginal\n\t\t\t\tthumbnail\n\t\t\t\toriginalAlt\n\t\t\t\tthumbnailAlt\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetCottageImgs {\n\t\tgetCottageImgs {\n\t\t\theaderUrl\n\t\t\tgalleryArray {\n\t\t\t\toriginal\n\t\t\t\tthumbnail\n\t\t\t\toriginalAlt\n\t\t\t\tthumbnailAlt\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery GetAboutPgImg {\n\t\tgetAboutPgImg\n\t}\n"): (typeof documents)["\n\tquery GetAboutPgImg {\n\t\tgetAboutPgImg\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery GetPropertyInfo($_id: ID!) {\n\t\tgetPropertyInfo(_id: $_id) {\n\t\t\t_id\n\t\t\tpropertyName\n\t\t\tpropertyDescription\n\t\t\tamenities {\n\t\t\t\tamenityName\n\t\t\t\tamenityType\n\t\t\t}\n\t\t\theaderImgKey\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetPropertyInfo($_id: ID!) {\n\t\tgetPropertyInfo(_id: $_id) {\n\t\t\t_id\n\t\t\tpropertyName\n\t\t\tpropertyDescription\n\t\t\tamenities {\n\t\t\t\tamenityName\n\t\t\t\tamenityType\n\t\t\t}\n\t\t\theaderImgKey\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery GetProperties {\n\t\tgetProperties {\n\t\t\t_id\n\t\t\tpropertyName\n\t\t\tpropertyDescription\n\t\t\tamenities {\n\t\t\t\tamenityName\n\t\t\t\tamenityType\n\t\t\t}\n\t\t\theaderImgKey\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetProperties {\n\t\tgetProperties {\n\t\t\t_id\n\t\t\tpropertyName\n\t\t\tpropertyDescription\n\t\t\tamenities {\n\t\t\t\tamenityName\n\t\t\t\tamenityType\n\t\t\t}\n\t\t\theaderImgKey\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery GetPresignedS3Url($imgKey: String!, $commandType: String!, $altTag: String!) {\n\t\tgetPresignedS3Url(imgKey: $imgKey, commandType: $commandType, altTag: $altTag)\n\t}\n"): (typeof documents)["\n\tquery GetPresignedS3Url($imgKey: String!, $commandType: String!, $altTag: String!) {\n\t\tgetPresignedS3Url(imgKey: $imgKey, commandType: $commandType, altTag: $altTag)\n\t}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;