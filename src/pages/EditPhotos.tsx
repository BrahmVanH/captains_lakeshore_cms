import { useParams } from 'react-router-dom';
import ImageGallery from '../components/ImageGallery';
import SideMenu from '../components/SideMenu';
import { useCallback, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_COTTAGE_IMGS, GET_HIDEAWAY_IMGS } from '../lib/queries';
import { GalImg } from '../types';

export default function EditPhotos() {
	const { propertyName } = useParams<{ propertyName: string }>();

  const [galleryArray, setGalleryArray] = useState<any>([]);
  const [error, setError] = useState<any>(null);

  const [getHideawayImages] = useLazyQuery(GET_HIDEAWAY_IMGS);
  const [getCottageImages] = useLazyQuery(GET_COTTAGE_IMGS);

	const galleryViewportStyle: React.CSSProperties = {
		margin: 'auto',
		width: '80%',
		overflowY: 'scroll',
		maxHeight: '80vh',
	};

  
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
	return (
		<div>
			<SideMenu />
			<div>
				<ImageGallery galleryViewportStyle={galleryViewportStyle} rowHeight={300} displayBtns={true} galleryArray={galleryArray} />
			</div>
		</div>
	);
}