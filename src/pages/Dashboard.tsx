import { useEffect, useState, useCallback } from 'react';
import * as Auth from '../lib/auth';

import Login from '../components/Login';
import { useQuery, useLazyQuery } from '@apollo/client';
import { GET_PROPERTIES, GET_HIDEAWAY_IMGS, GET_COTTAGE_IMGS } from '../lib/queries';
import { Property } from '../lib/__generated__/graphql';
import { GalImg } from '../types';
import Card from '../components/Card';
import styled from 'styled-components';
import Loading from '../components/LoadingAnimation';

const LoginCardContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 2rem;
	width: 100%;
`;

export default function Dashboard() {
	const [properties, setProperties] = useState<Property[] | null>(null);
	const [isMediumScreen, setIsMediumScreen] = useState<boolean>(false);

	const [galleryArray, setGalleryArray] = useState<GalImg[] | null>(null);

	// Lazy queries to call image fetches for two properties
	const [getCottageImages] = useLazyQuery(GET_COTTAGE_IMGS);
	const [getHideawayImages] = useLazyQuery(GET_HIDEAWAY_IMGS);

	const { loading, error, data } = useQuery(GET_PROPERTIES);

	// Fetch images through Apollo API from S3
	const handleFetchImgs = useCallback(
		async (propertyName: string) => {
			if (isMediumScreen) return console.log('medium screen');
			console.log('fetching images');
			try {
				if (propertyName === "Captain's Hideaway") {
					const { loading, error, data } = await getHideawayImages();

					if (!loading && data) {
						setGalleryArray(data.getHideawayImgs.galleryArray as GalImg[]);
					}

					if (error) {
						console.error(error);
						throw new Error('Error fetching images');
					}
				} else if (propertyName === "Captain's Cottage") {
					const { loading, error, data } = await getCottageImages();
					if (!loading && data) {
						setGalleryArray(data.getCottageImgs.galleryArray as GalImg[]);
					}
					if (error) {
						console.error(error);
						throw new Error('Error fetching images');
					}
				}
			} catch (error) {
				console.error(error);
				throw new Error('Error fetching images');
			}
		},
		[isMediumScreen]
	);

	useEffect(() => {
		if (window.innerWidth < 768) {
			setIsMediumScreen(true);
		}
	}, []);

	useEffect(() => {
		if (data?.getProperties && !loading && !error) {
			setProperties(data.getProperties as Property[]);
		}
	}, [data]);

	useEffect(() => {
		if (error) {
			console.error(error);
		}
	}, [error]);

	useEffect(() => {
		if (properties && !isMediumScreen) {
			properties.forEach((property) => {
				handleFetchImgs(property.propertyName);
			});
		}
	}, [properties]);

	return (
		<>
			{Auth.loggedIn() ? (
				<>
					{loading ? (
						// <Loading />
						<></>
					) : (
						<>
							{properties && galleryArray ? (
								<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '2rem' }}>
									{properties.map((property) => (
										<Card key={property._id} galleryArray={galleryArray} property={property} />
									))}
								</div>
							) : (
								<Loading />
							)}
						</>
					)}
				</>
			) : (
				<LoginCardContainer>
					<Login />
				</LoginCardContainer>
			)}
		</>
	);
}
