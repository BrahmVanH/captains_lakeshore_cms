import * as Auth from '../lib/auth';

import Login from '../components/Login';

export default function Dashboard() {
  return (
    {Auth.loggedIn() ? (
      <div>
      <h1>Dashboard</h1>
      </div>
    ) : (
      <Login />)}
  );
}