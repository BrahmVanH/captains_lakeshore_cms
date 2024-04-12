import { useCallback, useEffect, useRef, useState } from 'react';
import * as Auth from '../lib/auth';
import { RxHamburgerMenu } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import mobileLogoSvg from '../assets/logo.svg';
import logoSvg from '../assets/log_no_trees.svg';
import styled from 'styled-components';

const Nav = styled.nav(
	({ theme }) => `
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	height: 10vh;
	max-height: 10%;
	overflow: hidden;
	border-bottom: 5px solid ${theme.secondary};
	z-index: 20;
	background-color: white;
	position: relative;
	`
);

const DropdownBtn = styled.button`
	background-color: transparent;
	border: none;
	box-shadow: none;
`;

const DropdownMenu = styled.div<{ $openDropdownMenu: boolean }>(
	({ $openDropdownMenu }) => `
	display: ${$openDropdownMenu ? 'flex' : 'none'};
	flex-direction: column;
	align-items: center;
	position: absolute;
	top: calc(10% + 5px); /* Position the dropdown below the navbar */
	left: 0;
	width: 100%;
	z-index: 10000;
	background-color: white;
  margin: auto;
  border: 1px solid transparent;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: #5f8fa5d8;
  color: white;
`
);

const LinkContainer = styled.div`
	display: flex;
	justify-content: space-around;
	padding: 0.5rem 2rem;
`;

const StyledLink = styled(Link)`
	color: black;
	text-decoration: none;
	padding: 1rem;
`;

function Navbar() {
	const [mobileViewport, setMobileViewport] = useState<boolean>(false);
	const [openDropdownMenu, setOpenDropdownMenu] = useState<boolean>(false);
	const [brandLogo, setBrandLogo] = useState({
		image: mobileLogoSvg,
		width: 100,
	});

	const dropdownRef = useRef<HTMLDivElement>(null);
	const navbarRef = useRef<HTMLDivElement>(null);

	const isMediumViewport = useCallback(() => {
		return window.innerWidth < 766;
	}, []);

	const toggleDropDown = useCallback(() => {
		setOpenDropdownMenu(!openDropdownMenu);
	}, [openDropdownMenu]);

	// This will detect when a use clicks anywhere outside of the opened dropdown menu
	// and close the menu
	const handleOffClick = useCallback(
		(event: any) => {
			console.log('clicked');
			event.preventDefault();
			if (dropdownRef.current && !dropdownRef.current.contains(event.target) && openDropdownMenu && navbarRef.current && !navbarRef.current.contains(event.target)) {
				console.log('dropdownRef.current and showDropdown are true, dropdownRef does not contain event.target');
				toggleDropDown();
			}

			console.log('dropdownRef.current or showDropdownMenu false, dropdownRef might contain event.target ');
		},
		[toggleDropDown, openDropdownMenu]
	);

	// Add event listened to document for off click function above this one
	useEffect(() => {
		if (openDropdownMenu) {
			document.addEventListener('click', handleOffClick);

			return () => {
				document.removeEventListener('click', handleOffClick);
			};
		}
	}, [handleOffClick, openDropdownMenu]);

	useEffect(() => {
		const mobile = isMediumViewport();
		mobile ? setMobileViewport(true) : setMobileViewport(false);
		mobile
			? setBrandLogo({
					image: mobileLogoSvg,
					width: 75,
			  })
			: setBrandLogo({
					image: logoSvg,
					width: 75,
			  });
	}, []);

	return (
		<>
			<Nav ref={navbarRef}>
				<StyledLink className='' to={'/'}>
					<img alt='Captains Lake Superior branding' src={brandLogo.image} width={brandLogo.width} />
				</StyledLink>
				{mobileViewport ? (
					<DropdownBtn onClick={toggleDropDown} data-collapse-toggle='navbar-dropdown' type='button' aria-controls='navbar-dropdown' aria-expanded='false'>
						<RxHamburgerMenu size={'20px'} />
					</DropdownBtn>
				) : (
					<LinkContainer>
						<StyledLink to={'/'} className='navbar-link'>
							Dashboard
						</StyledLink>
						<StyledLink to={'https://lakesuperiorcaptains.com'} target='_blank' className='navbar-link'>
							User Site
						</StyledLink>
						{Auth.loggedIn() ? (
							<StyledLink to='/' onClick={() => Auth.logout()} className='navbar-link'>
								Log Out
							</StyledLink>
						) : (
							<></>
						)}
					</LinkContainer>
				)}
			</Nav>
			<DropdownMenu $openDropdownMenu={openDropdownMenu} ref={dropdownRef} id='navbar-dropdown'>
				<StyledLink to={'/'} className='navbar-link'>
					Dashboard
				</StyledLink>
				<StyledLink to={'https://lakesuperiorcaptains.com'} target='_blank' className='navbar-link'>
					User Site
				</StyledLink>
				{Auth.loggedIn() ? (
					<StyledLink to='/' onClick={() => Auth.logout()} className='navbar-link'>
						Log Out
					</StyledLink>
				) : (
					<></>
				)}
			</DropdownMenu>
		</>
	);
}

export default Navbar;
