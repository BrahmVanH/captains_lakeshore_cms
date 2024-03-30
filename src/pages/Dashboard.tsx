// import { useEffect, useState } from 'react';
import * as Auth from '../lib/auth';

import Login from '../components/Login';
import Property from './Property';

export default function Dashboard() {
	return <>{Auth.loggedIn() ? <Property propertyName="hideaway" /> : <Login />}</>;
}
