import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import SideMenu from './components/SideMenu';
import EditPhotos from './pages/EditPhotos';



const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: new HttpLink({
		uri: import.meta.env.PROD ? import.meta.env.VITE_LAMBDA_FUNCTION_URI : import.meta.env.VITE_LOCALHOST,
	}),
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
						<Route path='/photos/:property' element={<EditPhotos />} />
					</Routes>
				</ThemeProvider>
			</ApolloProvider>
		</Router>
	);
}

export default App;
