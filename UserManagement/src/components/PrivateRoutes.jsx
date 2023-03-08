import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Context } from '../context/context';

export default function PrivateRoute() {
  const { auth } = useContext(Context);

  return (
      auth ?  <Outlet/> : <Navigate to="/login"/>
  );
}