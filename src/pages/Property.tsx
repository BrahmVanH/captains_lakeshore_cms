import { useCallback, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_HIDEAWAY_IMGS, GET_COTTAGE_IMGS } from '../lib/queries';
// import { PropertyInformation } from '../types';

export default function Property({ propertyName }: { propertyName: string }) {
	// const [propertyInformation, setPropertyInformation] = useState<PropertyInformation | null>(null);

	// const { loading, error, data } = useQuery(GET_PROPERTY_INFO, {
	// 	variables: {
	// 		propertyName,
	// 	},
	// });

	const [getCottageImages, { loading: cotImgLoading, error: cotImgError, data: cotImgData }] = useLazyQuery(GET_COTTAGE_IMGS);
	const [getHideawayImages, { loading: hideImgLoading, error: hideImgError, data: hideImgData }] = useLazyQuery(GET_HIDEAWAY_IMGS);

	// useEffect(() => {
	// 	if (data?.getPropertyInfo) {
	// 		setPropertyInformation(data?.getPropertyInfo as PropertyInformation);
	// 	}
	// }, [data]);

	const handleFetchImgs = useCallback(
		async (propertyName: string) => {
			try {
				if (propertyName === 'hideaway') {
					await getHideawayImages();
				} else if (propertyName === 'cottage') {
					await getCottageImages();
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
		if (cotImgData && !cotImgLoading && !cotImgError) {
			console.log(cotImgData);
		}
	}, [cotImgData, cotImgLoading, cotImgError]);

	useEffect(() => {
		if (hideImgData && !hideImgLoading && !hideImgError) {
			console.log(hideImgData);
		}
	}, [hideImgData, hideImgLoading, hideImgError]);

	return <></>;
}
