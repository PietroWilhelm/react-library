import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginPage = () => {
  const { loginWithRedirect } = useAuth0();

  const onError = (err) => {
    console.error('Login failed', err);
  }

  return (
    <div>
      <button onClick={() => loginWithRedirect().catch(onError)}>Log In</button>
    </div>
  );
};

export default LoginPage;