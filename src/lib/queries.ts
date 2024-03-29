// import { gql } from './__generated__/gql';
import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql(/* GraphQL */ `
	query GetAllUsers {
		getAllUsers {
			firstName
			lastName
			username
		}
	}
`);

export const QUERY_BOOKINGS_BY_PROPERTY = gql(/* GraphQL */ `
	query QueryBookingsByProperty($propertyName: String!) {
		queryBookingsByProperty(propertyName: $propertyName) {
			_id
			dateValue
			propertyName
		}
	}
`);

export const GET_HOME_IMGS = gql(/* GraphQL */ `
	query GetHomePgImgs {
		getHomePgImgs {
			headerImgUrl
			hideawayImgUrl
			cottageImgUrl
		}
	}
`);

export const GET_HIDEAWAY_IMGS = gql(/* GraphQL */ `
	query GetHideawayImgs {
		getHideawayImgs {
			headerImgUrl
			galleryArray {
				original
				thumbnail
				originalAlt
				thumbnailAlt
			}
		}
	}
`);

export const GET_COTTAGE_IMGS = gql(/* GraphQL */ `
	query GetCottageImgs {
		getCottageImgs {
			headerImgUrl
			galleryArray {
				original
				thumbnail
				originalAlt
				thumbnailAlt
			}
		}
	}
`);

export const GET_ABOUT_IMGS = gql(/* GraphQL */ `
	query GetAboutImgs {
		getAboutImg
	}
`);
