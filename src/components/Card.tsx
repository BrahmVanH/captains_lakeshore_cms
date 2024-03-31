import { useEffect, useCallback, useState } from 'react';

import { useLazyQuery } from '@apollo/client';
import { GET_HIDEAWAY_IMGS, GET_COTTAGE_IMGS } from '../lib/queries';

import { Button, EditIcon } from 'evergreen-ui';

import ImageGallery from './ImageGallery';

import { Amenity, Property } from '../lib/__generated__/graphql';
import { GalImg, IProperty } from '../types';

export default function Card({ propertyName, propertyDescription, amenities }: IProperty) {
	const [galleryArray, setGalleryArray] = useState<GalImg[] | null>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<any>(null);
	const [data, setData] = useState<any>(null);
	const [getCottageImages] = useLazyQuery(GET_COTTAGE_IMGS);
	const [getHideawayImages] = useLazyQuery(GET_HIDEAWAY_IMGS);

	// useEffect(() => {
	// 	if (data?.getPropertyInfo) {
	// 		setPropertyInformation(data?.getPropertyInfo as PropertyInformation);
	// 	}
	// }, [data]);

	useEffect(() => {
		console.log('property name:', propertyName);
	}, [propertyName]);

	useEffect(() => {
		console.log('property description:', propertyDescription);
	}, [propertyDescription]);

	useEffect(() => {
		console.log('amenities:', amenities);
	}, [amenities]);

	const handleFetchImgs = useCallback(
		async (propertyName: string) => {
			console.log('fetching images');
			try {
				if (propertyName === "Captain's Hideaway") {
					const { loading, error, data } = await getHideawayImages();
					if (!loading && data) {
						setGalleryArray(data.getHideawayImgs.galleryArray as GalImg[]);
					}

					if (error) {
						setError(error);
						throw new Error('Error fetching images');
					}
				} else if (propertyName === "Captain's Cottage") {
					const { loading, error, data } = await getCottageImages();
					if (!loading && data) {
						setGalleryArray(data.getCottageImgs.galleryArray as GalImg[]);
					}
					if (error) {
						setError(error);
						throw new Error('Error fetching images');
					}
				}
			} catch (error) {
				console.error(error);
				throw new Error('Error fetching images');
			}
		},
		[propertyName]
	);

	useEffect(() => {
		if (propertyName) {
			handleFetchImgs(propertyName);
		}
	}, [propertyName]);

	useEffect(() => {
		if (error) {
			console.error(error);
		}
	}, [error]);
	return (
		<div id='card' style={{ width: '80%', marginBottom: '2rem' }}>
			{propertyName && propertyDescription && amenities ? (
				<div style={{ display: 'flex', flexDirection: 'row' }}>
					<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
						<div>
							<h1>{propertyName}</h1>
						</div>
						<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'center' }}>
							<Button iconBefore={EditIcon}>Edit Property Name</Button>
							<Button iconBefore={EditIcon}>Edit Description</Button>
							<Button iconBefore={EditIcon}>Edit Photos</Button>
						</div>
					</div>
					{galleryArray && !loading ? (
						<div style={{ width: '60%' }}>
							<ImageGallery galleryArray={galleryArray} />
						</div>
					) : (
						<h2>Loading Images</h2>
					)}
				</div>
			) : (
				<></>
			)}
		</div>
	);
}
