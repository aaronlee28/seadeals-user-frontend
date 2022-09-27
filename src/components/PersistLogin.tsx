import { Outlet } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    const accessToken:any = localStorage.getItem('access_token');
    if (!accessToken) { // if no access_token found, get one.
      verifyRefreshToken();
    }

    const createUserFromToken = async () => {
      try {
        const decode:any = jwt_decode(accessToken);
        const { user, scope } = decode;

        await setAuth({ user, roles: scope.split(' '), accessToken });
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    if (!auth?.accessToken) { // if no user state found, create one from token
      createUserFromToken();
    }

    setIsLoading(false);

    return () => { isMounted = false; };
  }, []);

  return (
  // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isLoading
        ? <p>Loading..</p>
        : <Outlet />}
    </>
  );
};

export default PersistLogin;
