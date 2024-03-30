import { gql } from './__generated__/gql';

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
			headerUrl
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
			headerUrl
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
	query GetAboutPgImg {
		getAboutPgImg
	}
`);

export const GET_PROPERTY_INFO = gql(/* GraphQL */ `
	query GetPropertyInfo($propertyName: String!) {
		getPropertyInfo(propertyName: $propertyName) {
			propertyName
			propertyDescription
			amenities {
				amenityName
				amenityIconJSX
			}
			headerImgKey
		}
	}
`);

export const GET_PRESEIGNED_URL = gql(/* GraphQL */ `
	query GetPresignedS3Url($imgKey: String!, $commandType: String!) {
		getPresignedS3Url(imgKey: $imgKey, commandType: $commandType)
	}
`);
