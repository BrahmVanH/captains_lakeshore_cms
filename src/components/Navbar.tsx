import { useEffect, useState } from 'react';
import * as Auth from '../lib/auth';
import { RxHamburgerMenu } from 'react-icons/rx';

import mobileLogoSvg from '../assets/logo.svg';
import logoSvg from '../assets/log_no_trees.svg';

function Navbar() {
	const [mobileViewport, setMobileViewport] = useState(false);
	const [brandLogo, setBrandLogo] = useState({
		image: mobileLogoSvg,
		width: 100,
	});

	const isMediumViewport = () => {
		return window.innerWidth < 766;
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
		<>
			<nav className=''>
				<div className='.flex .justify-between .p-2'>
					<a className='' href={'/'}>
						<img alt='Captains Lake Superior branding' src={brandLogo.image} width={brandLogo.width} />
					</a>
					{mobileViewport ? (
						<button data-collapse-toggle='navbar-dropdown' type='button' className='.bg-transparent .border-none .shadow-none' aria-controls='navbar-dropdown' aria-expanded='false'>
							<RxHamburgerMenu size={'20px'} />
						</button>
					) : (
						<div className='link-container'>
							<a href={'/'} className='navbar-link'>
								Home
							</a>
							<a href={'/about'} className='navbar-link'>
								About Us
							</a>
							<a href={'/contact'} className='navbar-link'>
								Contact
							</a>
							{Auth.loggedIn() ? (
								<a href='/' onClick={() => Auth.logout()} className='navbar-link'>
									Log Out
								</a>
							) : (
								<></>
							)}
						</div>
					)}
				</div>
			</nav>
			<div id='navbar-dropdown' className='hidden .flex .items-center .flex-col .m-auto .w-full .border .rounded-bl-lg .rounded-br-lg .bg-blue-500 .text-white .absolute .z-50'>
				<a href={'/'} className='navbar-link'>
					Home
				</a>
				<a href={'/about'} className='navbar-link'>
					About Us
				</a>
				<a href={'/contact'} className='navbar-link'>
					Contact
				</a>
				{Auth.loggedIn() ? (
					<a href='/' onClick={() => Auth.logout()} className='navbar-link'>
						Log Out
					</a>
				) : (
					<></>
				)}
			</div>
		</>
	);
}

export default Navbar;
