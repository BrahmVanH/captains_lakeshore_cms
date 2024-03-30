import { useCallback, useEffect, useState } from 'react';
import { Gallery, Image } from 'react-grid-gallery';
// import { useMutation } from '@apollo/client';
// import { DELETE_IMAGES } from '../lib/mutations';
import { GalImg } from '../types';

export default function ImageGallery({ galleryArray }: { galleryArray: GalImg[] }) {
	const [formattedGalArr, setFormattedGalArr] = useState<Image[] | null>(null);
  const [selectedImages, setSelectedImages] = useState<Image[]>([]);
	const hasSelected = galleryArray.some((img) => img.isSelected);

	const handleImageFormat = useCallback(() => {
		const formattedImages: Image[] = galleryArray.map((img) => {
			return {
				src: img.original ?? '',
				width: 174,
				height: 120,
				alt: img.originalAlt ?? '',
				isSelected: img.isSelected,
			};
		});

		setFormattedGalArr(formattedImages);
	}, [galleryArray]);

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
		[galleryArray]
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

  const handleDeleteSelected = useCallback(() => {
    if (!selectedImages) return;
    console.log('selectedImages:', selectedImages);

  }, [selectedImages]);

	useEffect(() => {
		console.log('formattedGalArr:', formattedGalArr);
	}, [formattedGalArr]);

	useEffect(() => {
		handleImageFormat();
	}, [galleryArray]);

	return (
		<>
			{formattedGalArr ? (
				<>
          <button onClick={handleSelectAll}>Select All</button>
					<Gallery images={formattedGalArr} onSelect={handleSelect} rowHeight={300} />{' '}
				</>
			) : (
				<></>
			)}
		</>
	);
}
