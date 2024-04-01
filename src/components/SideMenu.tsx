// Sidebar.js

import { useState } from 'react';
import styled from 'styled-components';
import { Button } from 'evergreen-ui';

const SidebarContainer = styled.div<{ isOpen: boolean }>`
	position: fixed;
	bottom: 0;
	left: 200;
	width: 10rem;
	height: 100vh;
	background-color: #333;
	transition: transform 0.3s ease;
	transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
`;

const MenuItems = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 1rem;
`;

export default function SideMenu() {
	const [isOpen, setIsOpen] = useState(false);

	const handleSidebarToggle = () => {
		setIsOpen(!isOpen);
	};

	return (
		<SidebarContainer isOpen={isOpen}>
			<MenuItems>
				<Button appearance='minimal' iconBefore='menu' onClick={handleSidebarToggle}>
					Toggle
				</Button>
				<Button appearance='minimal' >
					Home
				</Button>
				<Button appearance='minimal' >
					Profile
				</Button>
				{/* Add more menu items as needed */}
			</MenuItems>
		</SidebarContainer>
	);
}
