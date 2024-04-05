import { useEffect, useState } from 'react';
import styled from 'styled-components';

const LdsGrid = styled.div`
	display: inline-block;
	position: relative;
	width: 80px;
	height: 80px;
	div {
		position: absolute;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: #5f8fa5;
		animation: lds-grid 1.2s linear infinite;
	}

	div:nth-child(1) {
		top: 8px;
		left: 8px;
		animation-delay: 0s;
	}
	div:nth-child(2) {
		top: 8px;
		left: 32px;
		animation-delay: -0.4s;
	}
	div:nth-child(3) {
		top: 8px;
		left: 56px;
		animation-delay: -0.8s;
	}
	div:nth-child(4) {
		top: 32px;
		left: 8px;
		animation-delay: -0.4s;
	}
	div:nth-child(5) {
		top: 32px;
		left: 32px;
		animation-delay: -0.8s;
	}
	div:nth-child(6) {
		top: 32px;
		left: 56px;
		animation-delay: -1.2s;
	}
	div:nth-child(7) {
		top: 56px;
		left: 8px;
		animation-delay: -0.8s;
	}
	div:nth-child(8) {
		top: 56px;
		left: 32px;
		animation-delay: -1.2s;
	}
	div:nth-child(9) {
		top: 56px;
		left: 56px;
		animation-delay: -1.6s;
	}
	@keyframes lds-grid {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}
`;

const Loading = () => {
	const [message1Display, setMessage1Display] = useState('none');
	const [message2Display, setMessage2Display] = useState('none');

	const showMessage = () => {
		setMessage1Display('');
		setMessage2Display('');
	};

	useEffect(() => {
		setTimeout(showMessage, 15000);
	});
	return (
		<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
			<LdsGrid>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</LdsGrid>
			<div>
				<h4 style={{ display: message1Display }}>This is getting awkward</h4>
				<h5 style={{ display: message2Display }}>...try refreshing the page</h5>
			</div>
		</div>
	);
};

export default Loading;
