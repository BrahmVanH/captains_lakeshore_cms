import { Overlay } from 'evergreen-ui';
import { useState } from 'react';
import styled from 'styled-components';
import ImageGallery from './ImageGallery';
import { GalImg } from '../types';

const StyledOverlay = styled(Overlay)`
	z-index: 10000 !important;
`;

export default function ImgGalOverlay({ isShown, galleryArray }: { isShown: boolean; galleryArray: GalImg[] }) {
	const galleryViewportStyle: React.CSSProperties = {
    margin: 'auto',
		width: '80%',
		overflowY: 'scroll',
		maxHeight: '80vh',
	};
	return (
		<StyledOverlay shouldCloseOnEscapePress={true} preventBodyScrolling={true} isShown={isShown}>
			<ImageGallery galleryViewportStyle={galleryViewportStyle} rowHeight={300} displayBtns={true} galleryArray={galleryArray} />
		</StyledOverlay>
	);
}
