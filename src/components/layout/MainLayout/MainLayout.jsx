import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import './MainLayout.css';
const MainLayout = () => (
  <div className="d-flex vh-100 overflow-hidden">
    <Sidebar />
    <main className="main">
      <Outlet />
    </main>
  </div>
);

export default MainLayout;
