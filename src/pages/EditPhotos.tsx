import { useLocation } from 'react-router-dom';
import ImageGallery from '../components/ImageGallery';
import SideMenu from '../components/SideMenu';
import { useCallback, useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_COTTAGE_IMGS, GET_HIDEAWAY_IMGS } from '../lib/queries';
import { GalImg } from '../types';
import ImgUploadOverlay from '../components/ImgUploadOverlay';
import Loading from '../components/LoadingAnimation';

export default function EditPhotos() {
	// const { propertyName } = useParams<{ propertyName: string }>();
	const location = useLocation();
	const { propertyName } = location.state as { propertyName: string };

	const [galleryArray, setGalleryArray] = useState<any>([]);
	const [error, setError] = useState<any>(null);
	const [isShown, setIsShown] = useState<boolean>(false);
	const [selectAllImages, setSelectAllImages] = useState<boolean>(false);
	const [deleteSelectedImages, setDeleteSelectedImages] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const [imgsLoading, setImgsLoading] = useState<boolean>(true);

	const [getHideawayImages] = useLazyQuery(GET_HIDEAWAY_IMGS);
	const [getCottageImages] = useLazyQuery(GET_COTTAGE_IMGS);

	const galleryViewportStyle: React.CSSProperties = {
		margin: 'auto',
		width: '80%',
		overflowY: 'scroll',
		maxHeight: '80vh',
	};

	useEffect(() => {
		if (error) {
			console.error(error);
		}
	}, [error]);

	

	const handleUploadOverlay = useCallback((show: boolean) => {
		if (show) {
			setIsShown(true);
		} else {
			setIsShown(false);
		}
	}, []);

	const handleSetSelectAll = useCallback(() => {
		setSelectAllImages(!selectAllImages);
	}, [selectAllImages]);

	const handleDeleteSelected = useCallback(() => {
		setDeleteSelectedImages(true);
	}, []);

	const handleFetchImgs = useCallback(
		async (propertyName: string) => {
			console.log('fetching images');
			try {
				if (propertyName === "Captain's Hideaway") {
					const { loading, error, data } = await getHideawayImages();
					if (!loading && data) {
						setGalleryArray(data.getHideawayImgs.galleryArray as GalImg[]);
						console.log('setting hideaway loading false');
						setImgsLoading(false);
					}

					if (error) {
						setError(error);
						throw new Error('Error fetching images');
					}
				} else if (propertyName === "Captain's Cottage") {
					const { loading, error, data } = await getCottageImages();
					if (!loading && data) {
						setGalleryArray(data.getCottageImgs.galleryArray as GalImg[]);
						console.log('setting cottage loading false');
						setImgsLoading(false);
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
		if (!imgsLoading) {
			console.log('setting loading false');
			setLoading(false);
		} else {
			console.log('setting loading true');
			console.log('imgsLoading:', imgsLoading);
			setLoading(true);
		}
	}, [galleryArray]);

	useEffect(() => {
		if (propertyName) {
			console.log('property name:', propertyName);
		}
	}, [propertyName]);

	useEffect(() => {
		if (propertyName) {
			handleFetchImgs(propertyName);
		}
	}, [propertyName, handleFetchImgs]);

	// prop to hold images that are selected
	return (
		<div>
			{loading ? (
				<Loading />
			) : (
				<>
					<SideMenu handleDeleteSelected={handleDeleteSelected} handleSetSelectAll={handleSetSelectAll} handleUploadOverlay={handleUploadOverlay} propertyName={propertyName} />
					<div>
						<ImageGallery
							deleteSelectedImages={deleteSelectedImages}
							selectAllImages={selectAllImages}
							enableImageSelection={true}
							galleryViewportStyle={galleryViewportStyle}
							rowHeight={300}
							galleryArray={galleryArray}
						/>
					</div>
					<ImgUploadOverlay handleUploadOverlay={handleUploadOverlay} isShown={isShown} propertyName={propertyName} />
				</>
			)}
		</div>
	);
}
