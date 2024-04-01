// Sidebar.js

import { useEffect, useRef, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { Button, CircleArrowRightIcon, CircleArrowLeftIcon, Icon, PinIcon, UnpinIcon, DeleteIcon, UploadIcon, MultiSelectIcon, Tooltip } from 'evergreen-ui';
import { SideBarSCProps, MenuItemsSCProps } from '../types';
const SidebarContainer = styled.div<SideBarSCProps>(({ theme, $isOpen }) => ({
	position: 'absolute',
	bottom: '50%',
	left: '-5rem',
	zIndex: '1000',
	width: '7rem',
	height: '30vh',
	backgroundColor: theme.primary,
	border: '1px solid white',
	transition: 'transform 0.3s ease',
	transform: $isOpen ? 'translateX(5rem)' : 'translateX(0%)',
	'&:hover': $isOpen
		? {}
		: {
				transform: 'translateX(5rem)',
		  },
}));

const MenuItems = styled.div<MenuItemsSCProps>(
	({ $isOpen }) => `
	
 display: ${$isOpen ? 'flex' : 'none'};
 flex-direction: column;
 align-items: center;
 justify-content: space-evenly;
 padding: 1rem;
 height: 75%;

 ${SidebarContainer}:hover & {
	 display: flex;
	};
	
	`
);

const MenuButton = styled(Button)`
	position: relative;
	top: 80px;
	right: -30px;
	padding: 0rem;
	margin: 0rem;
	background-color: transparent;

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

const ButtonS = styled(Button)(({ theme }) => ({
	color: 'white',
	'&.hover, &:hover, &.active, &:active, &:focus, &.focus,	&:visited, &.visited': {
		backgroundColor: 'transparent',
	},
}));

export default function SideMenu() {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isPinned, setIsPinned] = useState<boolean>(false);
	const menuRef = useRef<HTMLDivElement>(null);
	const theme = useTheme();

	const handleSidebarToggle = (event: any) => {
		event.preventDefault();
		setIsOpen(!isOpen);
	};

	const handlePinMenu = (event: any) => {
		event.preventDefault();
		setIsPinned(!isPinned);
	};

	useEffect(() => {
		if (menuRef.current) {
			console.log('menuRef.current', menuRef.current);
		}
	}, [menuRef.current]);

	return (
		<>
			<SidebarContainer ref={menuRef} $isOpen={isOpen}>
				<MenuItems $isOpen={isOpen}>
					<ButtonS iconAfter={UploadIcon} appearance='minimal'>
						Upload
					</ButtonS>
					<ButtonS iconAfter={DeleteIcon} appearance='minimal'>
						Delete
					</ButtonS>
					<ButtonS iconAfter={MultiSelectIcon} appearance='minimal'>
						Select All
					</ButtonS>
				</MenuItems>
			</SidebarContainer>
			<Tooltip content='Pin Menu' position='left'>
			<MenuButton appearance='minimal' onClick={handleSidebarToggle}>
				{isOpen ? <Icon icon={UnpinIcon} color={theme.secondary} size={16} /> : <Icon icon={PinIcon} color='#81580e' size={16} />}
			</MenuButton>
				</Tooltip>
		</>
	);
}
