import { useEffect, useState } from 'react';
import * as Auth from '../lib/auth';

import Login from '../components/Login';
import { useQuery } from '@apollo/client';
import { GET_PROPERTY_INFO } from '../lib/queries';
import { Property } from '../lib/__generated__/graphql';
import Card from '../components/Card';
import styled from 'styled-components';

const LoginCardContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 2rem;
	width: 100%;
`;

export default function Dashboard() {
	const [propertyInfo, setPropertyInfo] = useState<Property[] | null>(null);

	const { loading, error, data } = useQuery(GET_PROPERTY_INFO);

	useEffect(() => {
		if (data?.getPropertyInfo && !loading && !error) {
			setPropertyInfo(data.getPropertyInfo as Property[]);
		}
	}, [data]);

	useEffect(() => {
		if (error) {
			console.error(error);
		}
	}, [error]);

	useEffect(() => {
		console.log(propertyInfo);
	}, [propertyInfo]);

	return (
		<>
			{Auth.loggedIn() ? (
				<>
					{propertyInfo ? (
						<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '2rem' }}>
							{propertyInfo.map((property) => (
								<Card propertyName={property.propertyName} propertyDescription={property.propertyDescription} amenities={property.amenities} />
							))}
						</div>
					) : (
						<h1>Loading...</h1>
					)}
				</>
			) : (
				<LoginCardContainer>
					<Login />
				</LoginCardContainer>
			)}
		</>
	);
}
