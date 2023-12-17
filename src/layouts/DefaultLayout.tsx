import React from 'react';
import { Outlet } from 'react-router-dom';
import { DefaultMenu } from '../components/DefaultMenu';

export function DefaultLayout() {
  return (
    <DefaultMenu>
      <Outlet />
    </DefaultMenu>
  );
}