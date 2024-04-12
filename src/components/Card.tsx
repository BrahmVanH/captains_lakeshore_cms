import { useEffect, useCallback, useState, lazy, Suspense } from 'react';

import { useLazyQuery } from '@apollo/client';
import { GET_HIDEAWAY_IMGS, GET_COTTAGE_IMGS } from '../lib/queries';

import { Button, EditIcon, Tooltip, CalendarIcon } from 'evergreen-ui';

import ImageGallery from './ImageGallery';

import { GalImg } from '../types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Property } from '../lib/__generated__/graphql';
import Loading from './LoadingAnimation';

const CalendarOverlay = lazy(() => import('./CalendarOverlay'));
const EditPropertyOverlay = lazy(() => import('./EditPropertyOverlay'));

// STyled components

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

// Takes in them from global theme provider in App component
const TitleContainer = styled.div<{ $isMediumScreen: boolean }>(
	({ theme, $isMediumScreen }) => `
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	padding-right: 2rem;
	margin: 2rem 0rem 2rem 2rem;
	border-right: ${$isMediumScreen ? 'none' : '3px solid transparent'};
	border=bottom: ${$isMediumScreen ? '3px solid transparent' : 'none'};
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

// STyled Evergreen ui button
const StyledBtn = styled(Button)`
	margin-bottom: 1rem;
`;

// Component takes in property object fetched by parent component
export default function Card({ property }: Readonly<{ property: Property }>) {
	const [galleryArray, setGalleryArray] = useState<GalImg[] | null>([]);
	const [imgsLoading, setImgsLoading] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<any>(null);
	const [openEditPropertyOverlay, setOpenEditPropertyOverlay] = useState<boolean>(false);
	const [openCalendarOverlay, setOpenCalendarOverlay] = useState<boolean>(false);
	const [isMediumScreen, setIsMediumScreen] = useState<boolean>(false);

	// Lazy queries to call image fetches for two properties
	const [getCottageImages] = useLazyQuery(GET_COTTAGE_IMGS);
	const [getHideawayImages] = useLazyQuery(GET_HIDEAWAY_IMGS);

	// Image gallery required custom styling depending on which parent is rendering it
	const galleryViewportStyles: React.CSSProperties = {
		maxHeight: 'calc(3 * (100px + 10px))',
		overflowY: 'scroll',
	};

	// Open overlay to edit property name and description
	const handleOpenEditPropertyOverlay = useCallback((openOverlay: boolean) => {
		if (openOverlay) {
			setOpenEditPropertyOverlay(true);
		} else {
			setOpenEditPropertyOverlay(false);
		}
	}, []);

	const handleOpenCalendarOverlay = useCallback((openOverlay: boolean) => {
		if (openOverlay) {
			setOpenCalendarOverlay(true);
		} else {
			setOpenCalendarOverlay(false);
		}
	}, []);

	// Fetch images through Apollo API from S3
	const handleFetchImgs = useCallback(
		async (propertyName: string) => {
			if (isMediumScreen) return console.log('medium screen');
			console.log('fetching images');
			try {
				if (propertyName === "Captain's Hideaway") {
					const { loading, error, data } = await getHideawayImages();
					if (loading && !data) {
						setImgsLoading(loading);
					}
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
		[isMediumScreen]
	);

	useEffect(() => {
		if (window.innerWidth < 768) {
			setIsMediumScreen(true);
		}
	}, []);

	useEffect(() => {
		if (property.propertyName && !isMediumScreen) {
			handleFetchImgs(property.propertyName);
		}
	}, [property]);

	useEffect(() => {
		if (!imgsLoading || isMediumScreen) {
			setLoading(false);
		} else {
			setLoading(true);
		}
	}, [imgsLoading, isMediumScreen]);

	useEffect(() => {
		if (error) {
			console.error(error);
		}
	}, [error]);

	return (
		<Suspense fallback={<Loading />}>
			<StyledCard id='card'>
				{property.propertyName && galleryArray && !loading ? (
					<CardContainer>
						<TitleContainer $isMediumScreen={isMediumScreen}>
							<div>
								<h1>{property.propertyName}</h1>
							</div>
							<BtnContainer>
								<Tooltip content={<p style={{ fontSize: '12px', color: 'white', lineHeight: 0 }}>Edit property name and description</p>} position='right'>
									<StyledBtn onClick={handleOpenEditPropertyOverlay} iconBefore={EditIcon}>
										Property Info
									</StyledBtn>
								</Tooltip>
								<Tooltip content={<p style={{ fontSize: '12px', color: 'white', lineHeight: 0 }}>Upload and delete property photos</p>} position='right'>
									<Link to={`/photos/${property.propertyName}`} state={{ propertyName: property.propertyName }}>
										<StyledBtn iconBefore={EditIcon}>Photos</StyledBtn>
									</Link>
								</Tooltip>
								<Tooltip content={<p style={{ fontSize: '12px', color: 'white', lineHeight: 0 }}>Edit availability calendar</p>} position='right'>
									<StyledBtn onClick={handleOpenCalendarOverlay} iconBefore={CalendarIcon}>
										Calendar
									</StyledBtn>
								</Tooltip>
							</BtnContainer>
						</TitleContainer>

						{isMediumScreen ? (
							<> </>
						) : (
							<ImgGalContainer>
								<ImageGallery enableImageSelection={false} galleryViewportStyle={galleryViewportStyles} rowHeight={100} galleryArray={galleryArray} />
							</ImgGalContainer>
						)}
					</CardContainer>
				) : (
					<Loading />
				)}
				<EditPropertyOverlay isShown={openEditPropertyOverlay} property={property} handleOpenEditPropertyOverlay={handleOpenEditPropertyOverlay} />
				<CalendarOverlay isShown={openCalendarOverlay} property={property} handleOpenCalendarOverlay={handleOpenCalendarOverlay} />
			</StyledCard>
		</Suspense>
	);
}
