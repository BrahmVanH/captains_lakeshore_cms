import { Image } from 'react-grid-gallery';
import { Property } from './lib/__generated__/graphql';
import { ImageObject } from './lib/__generated__/graphql';

export interface PropertyInformation extends Property {
	galleryImages?: string[];
}

export interface GalImg extends ImageObject {
	isSelected: boolean;
}



export interface SideBarSCProps {
	$isOpen: boolean;
}

export interface MenuItemsSCProps {
	$isOpen: boolean;
}

export interface InnerWrapProps {
	$isOpen: boolean;
	
}


