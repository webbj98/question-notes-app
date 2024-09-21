import React from 'react';
import { Outlet } from 'react-router-dom';

const RootLayoutPage: React.FC = () => {
  return (
    <div>
      <h1>ROOT PAGE</h1>
      <Outlet />
    </div>
  );
};

export default RootLayoutPage;
