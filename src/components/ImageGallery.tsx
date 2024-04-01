import { useCallback, useEffect, useRef, useState } from 'react';
import { Gallery, Image } from 'react-grid-gallery';
// import { useMutation } from '@apollo/client';
// import { DELETE_IMAGES } from '../lib/mutations';
import { GalImg } from '../types';
import { useLazyQuery } from '@apollo/client';
import { GET_PRESEIGNED_URL } from '../lib/queries';
import { deleteImgFromS3 } from '../lib/s3';
import { Button, EditIcon } from 'evergreen-ui';

export default function ImageGallery({
	displayBtns,
	galleryArray,
	rowHeight,
	galleryViewportStyle,
}: {
	displayBtns: boolean;
	galleryArray: GalImg[];
	rowHeight: number;
	galleryViewportStyle: React.CSSProperties;
}) {
	const [formattedGalArr, setFormattedGalArr] = useState<Image[] | null>(null);
	const [selectedImages, setSelectedImages] = useState<Image[]>([]);
	const hasSelected = galleryArray.some((img) => img.isSelected);
	const btnsRef = useRef<HTMLButtonElement>(null);

	const [deleteImages] = useLazyQuery(GET_PRESEIGNED_URL);

	const handleImageFormat = useCallback(() => {
		const formattedImages: Image[] = galleryArray.map((img) => {
			return {
				src: img.original ?? '',
				width: 174,
				height: 120,
				alt: img.originalAlt ?? '',
				isSelected: img.isSelected,
				key: img.imgKey,
			};
		});

		setFormattedGalArr(formattedImages);
	}, [galleryArray]);

	useEffect(() => {
		if (displayBtns) {
			btnsRef.current?.classList.remove('hidden');
		} else {
			btnsRef.current?.classList.add('hidden');
		}
	}, [displayBtns]);

	const handleSelect = useCallback(
		(index: number) => {
			console.log('index:', index);
			if (!formattedGalArr) return;

			const nextImages = formattedGalArr.map((img, i) => {
				console.log('mapping images:', img, i, index);
				if (i === index) {
					return { ...img, isSelected: !img.isSelected };
				}
				return img;
			});
			console.log('setting formattedGalArr:', nextImages);
			const selectedImages = nextImages.filter((img) => img.isSelected);
			setFormattedGalArr(nextImages);
			setSelectedImages(selectedImages);
		},
		[formattedGalArr]
	);

	const handleSelectAll = useCallback(() => {
		if (!formattedGalArr) return;
		const nextImages = formattedGalArr.map((img) => {
			return { ...img, isSelected: !hasSelected };
		});
		const selectedImages = nextImages.filter((img) => img.isSelected);
		setFormattedGalArr(nextImages);
		setSelectedImages(selectedImages);
	}, [formattedGalArr, hasSelected]);

	const handleDeleteSelected = useCallback(async () => {
		try {
			if (selectedImages.length < 1) return;
			if (!selectedImages[0].key) return;
			console.log('selectedImages:', selectedImages);
			console.log('deleting selected image from s3 bucket');
			const { data, error } = await deleteImages({
				variables: {
					imgKey: `${selectedImages[0].key}` ?? '',
					commandType: 'delete',
					altTag: selectedImages[0].alt ?? '',
				},
			});

			if (error || !data) {
				throw new Error('Error fetching presigned URL' + error?.message);
			}

			const imageDeleted = await deleteImgFromS3(`${selectedImages[0].key}`, data.getPresignedS3Url);

			if (!imageDeleted) {
				throw new Error('Error deleting image');
			}

			console.log('Image deleted successfully', data);
		} catch (error) {
			console.error(error);
			throw new Error('Error deleting image');
		}
	}, [selectedImages]);

	useEffect(() => {
		console.log('formattedGalArr:', formattedGalArr);
	}, [formattedGalArr]);

	useEffect(() => {
		handleImageFormat();
	}, [galleryArray]);

	useEffect(() => {
		console.log('selectedImages:', selectedImages);
	}, [selectedImages]);

	return (
		<div id='imageGallery' style={{maxHeight: '100vh'}}>
			{formattedGalArr ? (
				<>
					<div style={galleryViewportStyle}>
						<Gallery images={formattedGalArr} onSelect={handleSelect} rowHeight={rowHeight} defaultContainerWidth={50} />
					</div>
					{/* <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: '1rem' }}>
						<Button ref={btnsRef} onClick={handleSelectAll} className='hidden'>
						Select All
						</Button>
						<Button ref={btnsRef} onClick={handleDeleteSelected} className='hidden'>
						Delete Selected
						</Button>
					</div> */}
				</>
			) : (
				<></>
			)}
		</div>
	);
}
