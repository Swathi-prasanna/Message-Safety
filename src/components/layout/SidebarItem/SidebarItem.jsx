import React from 'react';
import { NavLink } from 'react-router-dom';
import './SidebarItem.css';
const SidebarItem = ({ to, icon: Icon, label, badge }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `nav-item ${isActive ? 'active' : ''}`
    }
  >
    {Icon && (
      <Icon strokeWidth={2} />
    )}
    <span className="flex-grow-1 text-truncate">{label}</span>
    {badge != null && (
      <span className="nav-badge">
        {badge}
      </span>
    )}
  </NavLink>
);

export default SidebarItem;
