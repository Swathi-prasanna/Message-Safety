import React from 'react';
import { Menu, ArrowLeft, Search, Bell, CircleHelp } from 'lucide-react';

import './DashboardHeader.css';
const DashboardHeader = ({ title = 'Dashboard Overview', showBack = false, onBack }) => (
  <div className="topbar">
    <button className="menu-toggle" id="menu-toggle" aria-label="Toggle sidebar">
      <Menu />
    </button>
    <button 
      className={`back-btn ${showBack ? 'show' : ''}`} 
      id="back-btn" 
      aria-label="Go back"
      onClick={onBack}
    >
      <ArrowLeft />
    </button>
    <div className="page-title" id="page-title">{title}</div>
    <div className="topbar-actions">
      <div className="search-box">
        <Search />
        <input type="text" placeholder="Search users, posts, reports..." />
      </div>
      <button className="icon-btn" aria-label="Notifications">
        <Bell />
      </button>
      <button className="icon-btn" aria-label="Help">
        <CircleHelp />
      </button>
    </div>
  </div>
);

export default DashboardHeader;
