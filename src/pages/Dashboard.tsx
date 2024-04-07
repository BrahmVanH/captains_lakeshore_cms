import { useEffect, useState } from 'react';
import * as Auth from '../lib/auth';

import Login from '../components/Login';
import { useQuery } from '@apollo/client';
import { GET_PROPERTIES } from '../lib/queries';
import { Property } from '../lib/__generated__/graphql';
import Card from '../components/Card';
import styled from 'styled-components';
import Loading from '../components/LoadingAnimation';

const LoginCardContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 2rem;
	width: 100%;
`;

export default function Dashboard() {
	const [properties, setProperties] = useState<Property[] | null>(null);

	const { loading, error, data } = useQuery(GET_PROPERTIES);

	useEffect(() => {
		if (data?.getProperties && !loading && !error) {
			setProperties(data.getProperties as Property[]);
		}
	}, [data]);

	useEffect(() => {
		if (error) {
			console.error(error);
		}
	}, [error]);

	return (
		<>
			{Auth.loggedIn() ? (
				<>
					{loading ? (
						<Loading />
					) : (
						<>
							{properties ? (
								<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '2rem' }}>
									{properties.map((property) => (
										<Card key={property._id} property={property} />
									))}
								</div>
							) : (
								<h1>Loading...</h1>
							)}
						</>
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
