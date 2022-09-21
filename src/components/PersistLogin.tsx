import { Outlet } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

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
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

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
