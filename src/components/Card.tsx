import { useEffect, useCallback, useState } from 'react';

import { useLazyQuery } from '@apollo/client';
import { GET_HIDEAWAY_IMGS, GET_COTTAGE_IMGS } from '../lib/queries';

import { Button, EditIcon, Overlay } from 'evergreen-ui';

import ImageGallery from './ImageGallery';

import { GalImg, IProperty } from '../types';
import styled from 'styled-components';
import ImgGalOverlay from './ImgGalOverlay';
import { Link } from 'react-router-dom';

const StyledCard = styled.div`
	width: 80%;
	margin-bottom: 2rem;
	background-color: white;
	padding: 1rem;
`;
const CardContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
`;

const TitleContainer = styled.div(
	({ theme }) => `
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	padding-right: 2rem;
	margin: 2rem 0rem 2rem 2rem;
	border-right: 3px solid transparent;
	border-image-source: linear-gradient(${theme.primaryStroke});
	border-image-slice: 1;
	border-image-outset: 0;
	border-image-repeat: stretch;
	`
);
const ImgGalContainer = styled.div`
	width: 60%;
	margin: 2rem 2rem 2rem 0rem;
`;
const BtnContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
`;

const StyledBtn = styled(Button)`
	margin-bottom: 1rem;
`;

export default function Card({ propertyName, propertyDescription, amenities }: Readonly<IProperty>) {
	const [galleryArray, setGalleryArray] = useState<GalImg[] | null>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<any>(null);
	const [data, setData] = useState<any>(null);
	const [showOverlay, setShowOverlay] = useState<boolean>(false);
	const [getCottageImages] = useLazyQuery(GET_COTTAGE_IMGS);
	const [getHideawayImages] = useLazyQuery(GET_HIDEAWAY_IMGS);

	const galleryViewportStyles: React.CSSProperties = {
		maxHeight: 'calc(3 * (100px + 10px))',
		overflowY: 'scroll',
	};

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

	const handleShowOverlay = useCallback(() => {
		setShowOverlay(!showOverlay);
	}, [showOverlay]);

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
		<StyledCard id='card'>
			{galleryArray && !loading ? <ImgGalOverlay galleryArray={galleryArray} isShown={showOverlay} /> : <></>}
			{propertyName && propertyDescription && amenities ? (
				<CardContainer>
					<TitleContainer>
						<div>
							<h1>{propertyName}</h1>
						</div>
						<BtnContainer>
							<StyledBtn iconBefore={EditIcon}>Property Name</StyledBtn>
							<StyledBtn iconBefore={EditIcon}>Description</StyledBtn>
							<Link to={`/photos/${propertyName}`} state={{ propertyName: propertyName }}>
								<StyledBtn iconBefore={EditIcon}>Photos</StyledBtn>
							</Link>
						</BtnContainer>
					</TitleContainer>
					{galleryArray && !loading ? (
						<ImgGalContainer>
							<ImageGallery galleryViewportStyle={galleryViewportStyles} rowHeight={100} displayBtns={false} galleryArray={galleryArray} />
						</ImgGalContainer>
					) : (
						<h2>Loading Images</h2>
					)}
				</CardContainer>
			) : (
				<></>
			)}
		</StyledCard>
	);
}
