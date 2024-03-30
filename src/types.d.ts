import { Image } from 'react-grid-gallery';
import { Property } from './generated/graphql';
import { ImageObject } from './lib/__generated__/graphql';

export interface PropertyInformation extends Property {
	galleryImages?: string[];
}

export interface GalImg extends ImageObject {
	isSelected: boolean;
}

