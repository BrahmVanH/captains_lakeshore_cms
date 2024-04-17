import { useEffect, useCallback, useState, lazy, Suspense } from 'react';

import { Button, EditIcon, Tooltip, CalendarIcon } from 'evergreen-ui';

import ImageGallery from './ImageGallery';

import { GalImg } from '../types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Property } from '../lib/__generated__/graphql';
import Loading from './LoadingAnimation';


// Lazy import overlay components
const CalendarOverlay = lazy(() => import('./CalendarOverlay/index'));
const EditPropertyOverlay = lazy(() => import('./EditPropertyOverlay/index'));

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
export default function Card({ galleryArray, property }: Readonly<{ galleryArray: GalImg[]; property: Property }>) {
	// const [imgsLoading, setImgsLoading] = useState<boolean>(true);
	// const [error, setError] = useState<any>(null);
	const [openEditPropertyOverlay, setOpenEditPropertyOverlay] = useState<boolean>(false);
	const [openCalendarOverlay, setOpenCalendarOverlay] = useState<boolean>(false);
	const [isMediumScreen, setIsMediumScreen] = useState<boolean>(false);

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

	// useEffect(() => {
	// 	if (property.propertyName && !isMediumScreen) {
	// 		handleFetchImgs(property.propertyName);
	// 	}
	// }, [property]);

	// useEffect(() => {
	// 	if (!imgsLoading || isMediumScreen) {
	// 		setLoading(false);
	// 	} else {
	// 		setLoading(true);
	// 	}
	// }, [imgsLoading, isMediumScreen]);


	useEffect(() => {
		if (window.innerWidth < 768) {
			setIsMediumScreen(true);
		}
	}, []);

	return (
		<Suspense fallback={<Loading />}>
			<StyledCard id='card'>
				{galleryArray ? (
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
