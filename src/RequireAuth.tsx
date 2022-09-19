import React, { useEffect } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from './hooks/useAuth';

type RolesProps = {
  allowedRoles: string[]
};

const RequireAuth = ({ allowedRoles }: RolesProps) => {
  const { auth } = useAuth();
  const location = useLocation();

  useEffect(() => {
    console.log(auth);
  });

  return (
  // eslint-disable-next-line no-nested-ternary
    auth?.roles?.split(' ').find((role:string) => allowedRoles?.includes(role))
      ? <Outlet />
      : auth?.user
        ? <Navigate to="/seller/register" state={{ from: location }} replace />
        : <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
