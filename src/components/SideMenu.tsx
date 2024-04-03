// Sidebar.js

import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Button, Icon, PinIcon, UnpinIcon, DeleteIcon, UploadIcon, MultiSelectIcon, Tooltip, MenuIcon } from 'evergreen-ui';
import { SideBarSCProps, MenuItemsSCProps } from '../types';

// Styled component that accepts global theme object and isOpen boolean prop to conditionally transition/pin the sidebar
const SidebarContainer = styled.div<SideBarSCProps>(({ theme, $isOpen }) => ({
	display: 'flex',
	flexDirection: 'column',
	position: 'absolute',
	bottom: '50%',
	left: '-6rem',
	zIndex: '1000',
	width: '7.5rem',
	height: '30vh',
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: theme.primary,
	borderTop: '1px solid white',
	borderBottom: '1px solid white',
	borderRight: '1px solid white',
	borderTopRightRadius: '6px',
	borderBottomRightRadius: '6px',
	transition: 'transform 0.3s ease',
	transform: $isOpen ? 'translateX(6rem)' : 'translateX(0%)',
	// '&:hover': $isOpen
	// 	? {}
	// 	: {
	// 			transform: 'translateX(6rem)',
	// 	  },
}));

// const InnerWrap = styled.div<InnerWrapProps>(({ theme, $isOpen }) => ({
// 	display: 'flex',
// 	flexDirection: 'column',
// 	alignItems: 'center',
// 	justifyContent: 'center',
// 	backgroundColor: theme.primary,
// 	borderTop: '1px solid white',
// 	borderBottom: '1px solid white',
// 	borderRight: '1px solid white',
// 	borderTopRightRadius: '6px',
// 	borderBottomRightRadius: '6px',
// 	width: '100%',
// }));

// Styled evergreen button
// const ArrowButton = styled(Button)`
// 	display: flex;
// 	padding: 0rem;
// 	margin: 0rem;
// 	background-color: transparent;

// 	/* &.hover,
// 	&:hover,
// 	&.active,
// 	&:active &:focus,
// 	&.focus,
// 	&:visited,
// 	&.visited {
// 		background-color: transparent;
// 		border: none;
// 		box-shadow: none;
// 	} */
// `;

// Styled evergreen button
const ControlBtn = styled(Button)`
	position: absolute;
	top: 0px;
	right: -3px;
	padding: 0rem;
	margin: 0rem;
	background-color: transparent;
	display: flex;
	&.hover,
	&:hover,
	&.active,
	&:active &:focus,
	&.focus,
	&:visited,
	&.visited {
		background-color: transparent;
		border: none;
		box-shadow: none;
	}
`;

// Styled component that accepts isOpen boolean prop to conditionally display the menu items
const MenuItems = styled.div<MenuItemsSCProps>(
	({ $isOpen }) => `
		
	 display: ${$isOpen ? 'flex' : 'none'};
	 flex-direction: column;
	 align-items: center;
	 justify-content: space-evenly;
	 height: 75%;
	 width: 100%;
	
	 ${SidebarContainer}:hover & {
		 display: flex;
		};
		
		`
);

// Styled evergreen button
const MenuOptionBtn = styled(Button)(({}) => ({
	width: '80%',
	color: 'white',
	border: '1px solid white',
	'&.hover, &:hover, &.active, &:active, &:focus, &.focus,	&:visited, &.visited': {
		backgroundColor: 'transparent',
	},
}));

const ToolTipTxt = styled.p`
	font-size: 12px;
	color: white;
	line-height: 0;
`;

export default function SideMenu({
	propertyName,
	handleUploadOverlay,
	handleSetSelectAll,
	handleDeleteSelected,
}: Readonly<{
	propertyName: string;
	handleUploadOverlay: (show: boolean) => void;
	handleSetSelectAll: () => void;
	handleDeleteSelected: () => void;
}>) {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isPinned, setIsPinned] = useState<boolean>(false);
	const menuRef = useRef<HTMLDivElement>(null);

	const handlePinSidebar = (event: any) => {
		event.preventDefault();
		setIsPinned(!isPinned);
	};

	useEffect(() => {
		if (propertyName) {
			console.log('propertyName', propertyName);
		}
	}, [propertyName]);

	const handleOpenMenu = () => {
		setIsOpen(true);
	};

	const handleCloseMenu = () => {
		if (!isPinned) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		if (menuRef.current) {
			console.log('menuRef.current', menuRef.current);
		}
	}, [menuRef.current]);

	return (
		<SidebarContainer ref={menuRef} $isOpen={isOpen} onMouseEnter={handleOpenMenu} onMouseLeave={handleCloseMenu}>
			<Tooltip content={<ToolTipTxt>Pin Menu</ToolTipTxt>} position='right'>
				<ControlBtn $isOpen={isOpen} appearance='minimal' onClick={handlePinSidebar}>
					{isOpen ? <>{isPinned ? <Icon icon={UnpinIcon} color='white' size={12} /> : <Icon icon={PinIcon} color='white' size={12} />}</> : <Icon icon={MenuIcon} color='white' size={12} />}
				</ControlBtn>
			</Tooltip>
			{/* <ControlBtn $isOpen={isOpen} appearance='minimal' onClick={handleSidebarToggle}>
				{isOpen ? <Icon icon={UnpinIcon} color='white' size={12} /> : <Icon icon={PinIcon} color='white' size={12} />}
			</ControlBtn> */}
			<MenuItems $isOpen={isOpen}>
				<MenuOptionBtn onClick={() => handleUploadOverlay(true)} iconAfter={UploadIcon} appearance='minimal'>
					Upload
				</MenuOptionBtn>
				<MenuOptionBtn onClick={handleDeleteSelected} iconAfter={DeleteIcon} appearance='minimal'>
					Delete
				</MenuOptionBtn>
				<MenuOptionBtn onClick={handleSetSelectAll} iconAfter={MultiSelectIcon} appearance='minimal'>
					Select All
				</MenuOptionBtn>
			</MenuItems>
			{/* <Tooltip
				content={
					isOpen ? (
						<ToolTipTxt style={{ fontSize: '12px', color: 'white', padding: '0rem', lineHeight: 0 }}>Close</ToolTipTxt>
					) : (
						<ToolTipTxt style={{ fontSize: '12px', color: 'white', padding: '0rem', lineHeight: 0 }}>Open</ToolTipTxt>
					)
				}
				position='top'>
				<ArrowButton appearance='minimal' onClick={handleSidebarToggle}>
					{isOpen ? <Icon icon={CircleArrowLeftIcon} color={'#81580e'} size={16} /> : <Icon icon={CircleArrowRightIcon} color='#81580e' size={16} />}
				</ArrowButton>
			</Tooltip> */}
		</SidebarContainer>
	);
}
