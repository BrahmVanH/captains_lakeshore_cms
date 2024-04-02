// import { useCallback, useEffect, useState } from 'react';
// import { useLazyQuery } from '@apollo/client';
// import { GET_HIDEAWAY_IMGS, GET_COTTAGE_IMGS } from '../lib/queries';
// // import { PropertyInformation } from '../types';
// import ImageGallery from '../components/ImageGallery';
// import UploadImage from '../components/UploadImage';
// import { GalImg } from '../types';

// export default function Property({ propertyName }: { propertyName: string }) {
// 	// const [propertyInformation, setPropertyInformation] = useState<PropertyInformation | null>(null);

// 	// const { loading, error, data } = useQuery(GET_PROPERTY_INFO, {
// 	// 	variables: {
// 	// 		propertyName,
// 	// 	},
// 	// });

// 	const [galleryArray, setGalleryArray] = useState<GalImg[] | null>([]);
// 	const [getCottageImages, { loading: cotImgLoading, error: cotImgError, data: cotImgData }] = useLazyQuery(GET_COTTAGE_IMGS);
// 	const [getHideawayImages, { loading: hideImgLoading, error: hideImgError, data: hideImgData }] = useLazyQuery(GET_HIDEAWAY_IMGS);

// 	// useEffect(() => {
// 	// 	if (data?.getPropertyInfo) {
// 	// 		setPropertyInformation(data?.getPropertyInfo as PropertyInformation);
// 	// 	}
// 	// }, [data]);

// 	const handleFetchImgs = useCallback(
// 		async (propertyName: string) => {
// 			try {
// 				if (propertyName === 'hideaway') {
// 					await getHideawayImages();
// 				} else if (propertyName === 'cottage') {
// 					await getCottageImages();
// 				}
// 			} catch (error) {
// 				console.error(error);
// 				throw new Error('Error fetching images');
// 			}
// 		},
// 		[propertyName]
// 	);

// 	useEffect(() => {
// 		if (propertyName) {
// 			handleFetchImgs(propertyName);
// 		}
// 	}, [propertyName]);

// 	useEffect(() => {
// 		if (cotImgData && !cotImgLoading && !cotImgError) {
// 			console.log(cotImgData);
// 		}
// 	}, [cotImgData, cotImgLoading, cotImgError]);

// 	useEffect(() => {
// 		if (hideImgData && !hideImgLoading && !hideImgError) {
// 			setGalleryArray(hideImgData.getHideawayImgs.galleryArray as GalImg[]);
// 		}
// 	}, [hideImgData, hideImgLoading, hideImgError]);

// 	return (
// 		<>
// 			{galleryArray ? <ImageGallery displayBtns={false} rowHeight={100} enableImageSelection={false} galleryArray={galleryArray} /> : <>Loading...</>}
// 			<UploadImage propertyName={propertyName} />
// 		</>
// 	);
// }

export {};
