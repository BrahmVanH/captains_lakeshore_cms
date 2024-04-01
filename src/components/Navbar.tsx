import { useEffect, useRef, useState } from 'react';
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
	max-height: min-content;
	border-bottom: 5px solid ${theme.secondary};
	z-index: 20;
	background-color: white;
	`
);

const DropdownBtn = styled.button`
	background-color: transparent;
	border: none;
	box-shadow: none;
`;

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
	const [mobileViewport, setMobileViewport] = useState(false);
	const [brandLogo, setBrandLogo] = useState({
		image: mobileLogoSvg,
		width: 100,
	});

	const dropdownMenu = useRef<HTMLDivElement>(null);

	const isMediumViewport = () => {
		return window.innerWidth < 766;
	};

	const toggleDropDown = (event: any) => {
		event.preventDefault();

		dropdownMenu.current?.classList.toggle('hidden');
	};

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
		<Nav className=''>
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
						Home
					</StyledLink>
					<StyledLink to={'/about'} className='navbar-link'>
						About Us
					</StyledLink>
					<StyledLink to={'/contact'} className='navbar-link'>
						Contact
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
			<div ref={dropdownMenu} id='navbar-dropdown' className=' hidden .flex .items-center .flex-col .m-auto .w-full .border .rounded-bl-lg .rounded-br-lg .bg-blue-500 .text-white .absolute .z-50'>
				<StyledLink to={'/'} className='navbar-link'>
					Home
				</StyledLink>
				<StyledLink to={'/about'} className='navbar-link'>
					About Us
				</StyledLink>
				<StyledLink to={'/contact'} className='navbar-link'>
					Contact
				</StyledLink>
				{Auth.loggedIn() ? (
					<StyledLink to='/' onClick={() => Auth.logout()} className='navbar-link'>
						Log Out
					</StyledLink>
				) : (
					<></>
				)}
			</div>
		</Nav>
	);
}

export default Navbar;
