import { useEffect, useCallback, useState } from 'react';

import { useLazyQuery } from '@apollo/client';
import { GET_HIDEAWAY_IMGS, GET_COTTAGE_IMGS } from '../lib/queries';

import { Button, EditIcon, Tooltip } from 'evergreen-ui';

import ImageGallery from './ImageGallery';
import EditPropertyOverlay from './EditPropertyOverlay';

import { GalImg, IProperty } from '../types';
import styled from 'styled-components';
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

export default function Card({ propertyName }: Readonly<{ propertyName: string }>) {
	const [galleryArray, setGalleryArray] = useState<GalImg[] | null>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<any>(null);
	const [getCottageImages] = useLazyQuery(GET_COTTAGE_IMGS);
	const [getHideawayImages] = useLazyQuery(GET_HIDEAWAY_IMGS);
	const [openEditPropertyOverlay, setOpenEditPropertyOverlay] = useState<boolean>(false);

	const galleryViewportStyles: React.CSSProperties = {
		maxHeight: 'calc(3 * (100px + 10px))',
		overflowY: 'scroll',
	};

	// useEffect(() => {
	// 	if (data?.getPropertyInfo) {
	// 		setPropertyInformation(data?.getPropertyInfo as PropertyInformation);
	// 	}
	// }, [data]);

	const handleOpenEditPropertyOverlay = useCallback((openOverlay: boolean) => {
		if (openOverlay) {
			setOpenEditPropertyOverlay(true);
		} else {
			setOpenEditPropertyOverlay(false);
		}
	}, []);

	useEffect(() => {
		console.log('property name:', propertyName);
	}, [propertyName]);

	const handleFetchImgs = useCallback(
		async (propertyName: string) => {
			console.log('fetching images');
			try {
				if (propertyName === "Captain's Hideaway") {
					const { loading, error, data } = await getHideawayImages();
					if (loading && !data) {
						setLoading(loading);
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
			{/* {galleryArray && !loading ? <ImgUploadOverlay galleryArray={galleryArray} isShown={showOverlay} /> : <></>} */}
			{propertyName ? (
				<CardContainer>
					<TitleContainer>
						<div>
							<h1>{propertyName}</h1>
						</div>
						<BtnContainer>
							<Tooltip content={<p style={{ fontSize: '12px', color: 'white', lineHeight: 0 }}>Edit property name and description</p>} position='right'>
								<StyledBtn onClick={handleOpenEditPropertyOverlay} iconBefore={EditIcon}>
									Property Info
								</StyledBtn>
							</Tooltip>
							<Tooltip content={<p style={{ fontSize: '12px', color: 'white', lineHeight: 0 }}>Upload and delete property photos</p>} position='right'>
								<Link to={`/photos/${propertyName}`} state={{ propertyName: propertyName }}>
									<StyledBtn iconBefore={EditIcon}>Photos</StyledBtn>
								</Link>
							</Tooltip>
						</BtnContainer>
					</TitleContainer>
					{galleryArray && !loading ? (
						<ImgGalContainer>
							<ImageGallery enableImageSelection={false} galleryViewportStyle={galleryViewportStyles} rowHeight={100} galleryArray={galleryArray} />
						</ImgGalContainer>
					) : (
						<h2>Loading Images</h2>
					)}
				</CardContainer>
			) : (
				<></>
			)}
			<EditPropertyOverlay isShown={openEditPropertyOverlay} propertyName={propertyName} handleOpenEditPropertyOverlay={handleOpenEditPropertyOverlay} />
		</StyledCard>
	);
}
