import { useCallback, useEffect, useState } from 'react';
import { Gallery, Image } from 'react-grid-gallery';
import { GalImg } from '../types';
import { useMutation } from '@apollo/client';
import { DELETE_S3_IMGS } from '../lib/mutations';

export default function ImageGallery({
	galleryArray,
	rowHeight,
	galleryViewportStyle,
	enableImageSelection,
	selectAllImages,
	deleteSelectedImages,
	handleSetImgDeleteSuccess,
}: Readonly<{
	galleryArray: GalImg[];
	rowHeight: number;
	galleryViewportStyle: React.CSSProperties;
	enableImageSelection: boolean;
	selectAllImages?: boolean;
	deleteSelectedImages?: boolean;
	handleSetImgDeleteSuccess?: () => void;
}>) {
	const [formattedGalArr, setFormattedGalArr] = useState<Image[] | null>(null);
	const [selectedImages, setSelectedImages] = useState<Image[]>([]);

	const hasSelected = galleryArray.some((img) => img.isSelected);

	const [deleteS3Images] = useMutation(DELETE_S3_IMGS);

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

	const handleSelect = useCallback(
		(index: number) => {
			console.log('index:', index);
			if (!formattedGalArr) return;

			const nextImages = formattedGalArr.map((img, i) => {
				if (i === index) {
					console.log('img:', img, 'isSelected:', img.isSelected);
					return { ...img, isSelected: !img.isSelected };
				}
				return img;
			});

			console.log('setting formattedGalArr:', nextImages);
			const selectedImages = nextImages.filter((img) => img.isSelected);
			console.log('selectedImages:', selectedImages);
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

	const handleDeselectAll = useCallback(() => {
		if (!formattedGalArr) return;
		const nextImages = formattedGalArr.map((img) => {
			return { ...img, isSelected: false };
		});
		setFormattedGalArr(nextImages);
		setSelectedImages([]);
	}, [formattedGalArr]);

	const handleDeleteSelected = useCallback(async () => {
		try {
			if (selectedImages.length < 1 || !selectedImages[0].key || !selectedImages[0].alt) return;
			const selectedImgKeys = selectedImages.map((img) => {
				if (img.key) {
					return img.key;
				}
				
			});
			console.log('selectedImgKeys:', selectedImgKeys);
			console.log('deleting selected image from s3 bucket');
			const { data } = await deleteS3Images({
				variables: {
					input: { imgKeys: selectedImgKeys.filter((key) => key !== undefined) as string[] },
				},
			});

			if (!data) {
				throw new Error('Error deleting image(s)');
			}
			if (handleSetImgDeleteSuccess) {
				handleSetImgDeleteSuccess();
			}
			console.log('Image(s) deleted successfully', data);
			return data;
		} catch (error: any) {
			console.error(error);
			throw new Error('Error deleting image, ' + error.message);
		}
	}, [selectedImages]);

	useEffect(() => {
		if (selectAllImages) {
			handleSelectAll();
		} else {
			handleDeselectAll();
		}
	}, [selectAllImages]);

	useEffect(() => {
		if (deleteSelectedImages) {
			handleDeleteSelected();
		}
	}, [deleteSelectedImages]);

	useEffect(() => {
		handleImageFormat();
	}, [galleryArray, handleImageFormat]);

	return (
		<div id='imageGallery' style={{ maxHeight: '100vh' }}>
			{formattedGalArr ? (
				<>
					<div style={galleryViewportStyle}>
						{/* <Button onClick={handleSelectAll}>Select All</Button>
						<Button onClick={handleDeselectAll}>Deselect All</Button> */}
						<Gallery images={formattedGalArr} enableImageSelection={enableImageSelection} onSelect={handleSelect} rowHeight={rowHeight} defaultContainerWidth={50} />
					</div>
					<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: '1rem' }}>
						{/* <Button ref={btnsRef} onClick={handleDeleteSelected} className='hidden'>
							Delete Selected
						</Button> */}
					</div>
				</>
			) : (
				<></>
			)}
		</div>
	);
}
