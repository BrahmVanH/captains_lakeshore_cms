import { useCallback, useEffect, useState } from 'react';
import { Gallery, Image } from 'react-grid-gallery';
import { GalImg } from '../types';

export default function ImageGallery({ galleryArray }: { galleryArray: GalImg[] }) {
	const [formattedGalArr, setFormattedGalArr] = useState<Image[] | null>(null);
	const hasSelected = galleryArray.some((img) => img.isSelected);

	const handleImageFormat = useCallback(() => {
		const formattedImages: Image[] = galleryArray.map((img) => {
			return {
				src: img.original ?? '',
				width: 320,
				height: 174,
				alt: img.originalAlt ?? '',
				isSelected: img.isSelected,
			};
		});

		setFormattedGalArr(formattedImages);
	}, [galleryArray]);

	const handleSelect = useCallback(
		(index: number) => {
			if (!formattedGalArr) return;

			const nextImages = formattedGalArr.map((img, i) => {
				if (i === index) {
					return { ...img, isSelected: !img.isSelected };
				}
				return img;
			});
			setFormattedGalArr(nextImages);
		},
		[galleryArray]
	);

	useEffect(() => {
		handleImageFormat();
	}, [galleryArray]);

	return <>{formattedGalArr ? <Gallery images={formattedGalArr} onSelect={handleSelect} enableImageSelection={hasSelected} rowHeight={300} /> : <></>}</>;
}
