import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Button, Icon, PinIcon, UnpinIcon, DeleteIcon, UploadIcon, MultiSelectIcon, Tooltip, MenuIcon } from 'evergreen-ui';
import { SideBarSCProps, MenuItemsSCProps } from '../../types';

// Styled component that accepts global theme object and isOpen boolean prop to conditionally transition/pin the sidebar
const SidebarContainer = styled.div<SideBarSCProps>(({ theme, $isOpen }) => ({
	display: 'flex',
	flexDirection: 'column',
	position: 'absolute',
	bottom: '50%',
	left: '-6rem',
	zIndex: '15',
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
const MenuOptionBtn = styled(Button)`
	width: 80%;
	color: white;
	border: 1px solid white;
	&:hover,
	&:active,
	&:focus,
	&:visited {
		background-color: transparent;
	}
`;

const ToolTipTxt = styled.p`
	font-size: 12px;
	color: white;
	line-height: 0;
`;


export default function SideMenu() {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isPinned, setIsPinned] = useState<boolean>(false);
	const menuRef = useRef<HTMLDivElement>(null);
	const addBookingsBtn = useRef<HTMLButtonElement>(null);
	const deleteBookingsBtn = useRef<HTMLButtonElement>(null);

	// Sets the isPinned state value to the opposite of its current value
	// Triggered by pin button in menu ui
	const handlePinSidebar = (event: any) => {
		event.preventDefault();
		setIsPinned(!isPinned);
	};

	// This will enable the menu buttons when the menu is open through refs to the buttons
	// because the buttons are accidentally clicked when the menu is closed
	const handleEnableMenuBtns = useCallback(() => {
		if (addBookingsBtn.current && deleteBookingsBtn.current) {
			addBookingsBtn.current.disabled = false;
			deleteBookingsBtn.current.disabled = false;
		}
	}, []);

	// This will disable the menu buttons when the menu is closed through refs to the buttons
	const handleDisableMenuBtns = useCallback(() => {
		if (addBookingsBtn.current && deleteBookingsBtn.current) {
			addBookingsBtn.current.disabled = true;
			deleteBookingsBtn.current.disabled = true;
		}
	}, []);

	// Open side menu - called on mouse enter event from side menu
	const handleOpenMenu = () => {
		setIsOpen(true);
		handleEnableMenuBtns();
	};

	// Close side menu - called on mouse exit event from side menu
	const handleCloseMenu = () => {
		if (!isPinned) {
			setIsOpen(false);
			handleDisableMenuBtns();
		}
	};

  
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
				<MenuOptionBtn onClick={() => handleUploadOverlay(true)} ref={uploadBtn} iconAfter={UploadIcon} appearance='minimal'>
					Add Bookings
				</MenuOptionBtn>
				<MenuOptionBtn onClick={handleDeleteSelected} ref={deleteBtn} iconAfter={DeleteIcon} appearance='minimal'>
					Delete Bookings
				</MenuOptionBtn>
				<MenuOptionBtn onClick={handleSetSelectAll} ref={selectAllBtn} iconAfter={MultiSelectIcon} appearance='minimal'>
					
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