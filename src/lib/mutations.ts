import { gql } from './__generated__/gql';

export const CREATE_USER = gql(/* GraphQL */ `
	mutation CreateUser($input: CreateUserInput!) {
		createUser(input: $input) {
			token
			user {
				_id
				firstName
				lastName
				username
			}
		}
	}
`);

export const LOGIN_USER = gql(/* GraphQL */ `
	mutation LoginUser($input: LoginUserInput!) {
		loginUser(input: $input) {
			token
			user {
				_id
				firstName
				lastName
				username
			}
		}
	}
`);

export const DELETE_USER = gql(/* GraphQL */ `
	mutation removeUser($input: RemoveUserInput!) {
		removeUser(input: $input) {
			token
			user {
				_id
				firstName
				lastName
				username
			}
		}
	}
`);

export const CREATE_BOOKING = gql(/* GraphQL */ `
	mutation CreateBooking($input: CreateBookingInput!) {
		createBooking(input: $input) {
			dateValue
			propertyName
		}
	}
`);

export const DELETE_BOOKING = gql(/* GraphQL */ `
	mutation removeBooking($input: RemoveBookingInput!) {
		removeBooking(input: $input) {
			dateValue
			propertyName
		}
	}
`);

export const UPDATE_PROPERTY_INFO = gql(/* GraphQL */ `
	mutation UpdatePropertyInfo($input: UpdatePropertyInput!) {
		updatePropertyInfo(input: $input) {
			propertyName
			propertyDescription
			amenities {
				amenityName
				amenityType
			}
			headerImgKey
		}
	}
`);