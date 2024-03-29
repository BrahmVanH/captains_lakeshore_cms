import { gql } from '../__generated__/gql';

export const CREATE_USER = gql(/* GraphQL */ `
	mutation CreateUser($input: CreateUserInput!) {
		createUser(input: $input) {
			_id
			firstName
			lastName
			username
		}
	}
`);

export const LOGIN_USER = gql(/* GraphQL */ `
	mutation LoginUser($input: LoginUserInput!) {
		loginUser(input: $input) {
			_id
			firstName
			lastName
			username
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
	mutation removeBooking($input: DeleteBookingInput!) {
		removeBooking(input: $input) {
			dateValue
			propertyName
		}
	}
`);
