import { useState } from 'react';
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import styled from 'styled-components';

import { ThemeProvider } from 'styled-components';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';

const link = new HttpLink({
	uri: process.env.NODE_ENV === 'production' ? import.meta.env.LAMBDA_FUNCTION_URI : import.meta.env.LOCALHOST,
});

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link,
});

function App() {
	const theme = {
		primary: '#5f8fa5',
		primaryStroke: ['#ffffff', '#abccd8', '#5f8fa5', '#abccd8', '#ffffff'],
		secondary: 'rgb(200, 188, 167, 0.6)',
	};

	return (
		<Router>
			<ApolloProvider client={client}>
				<ThemeProvider theme={theme}>
					<Navbar />
					<Routes>
						<Route path='/' element={<Dashboard />} />
					</Routes>
				</ThemeProvider>
			</ApolloProvider>
		</Router>
	);
}

export default App;
