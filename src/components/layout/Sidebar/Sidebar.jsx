import React from 'react';
import {
  LayoutDashboard,
  Flag,
  AlertTriangle,
  ShieldCheck,
  MessageSquareWarning,
  LifeBuoy,
  KeyRound,
  ScrollText,
  Settings,
  Moon,
  Sun,
} from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import SidebarItem from '../SidebarItem/SidebarItem';
import './Sidebar.css';
const NAV_SECTIONS = [
  {
    items: [
      { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    ],
  },
  {
    label: 'Trust & Safety',
    items: [
      { to: '/moderation', icon: Flag, label: 'Content Moderation', badge: 34 },
      { to: '/reports', icon: AlertTriangle, label: 'Reports', badge: 27 },
      { to: '/verification', icon: ShieldCheck, label: 'Verification', badge: 18 },
      { to: '/message-safety', icon: MessageSquareWarning, label: 'Message Safety' },
    ],
  },
  {
    label: 'Support',
    items: [
      { to: '/support', icon: LifeBuoy, label: 'Support Agent Desk', badge: 9 },
    ],
  },
  {
    label: 'Administration',
    items: [
      { to: '/roles-permissions', icon: KeyRound, label: 'Roles & Permissions' },
      { to: '/audit-logs', icon: ScrollText, label: 'Audit Logs' },
      { to: '/settings', icon: Settings, label: 'Settings' },
    ],
  },
];

const Sidebar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className="sidebar">
      {/* header */}
      <header className="sidebar-header">
        <svg
          className="logo"
          viewBox="0 0 32 32"
          fill="none"
          aria-hidden="true"
        >
          <rect x="2" y="2" width="28" height="28" rx="8" stroke="currentColor" strokeWidth="2" />
          <path
            d="M10 20L14 12L18 18L22 10"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="brand">
          Sentinel Admin
        </span>
      </header>

      {/* nav — flex 1 handles pushing the footer down, sidebar container handles scroll */}
      <nav className="sidebar-nav">
        {NAV_SECTIONS.map((section, idx) => (
          <div key={idx} className="nav-group">
            {section.label && (
              <div className="nav-label">
                {section.label}
              </div>
            )}
            <ul className="list-unstyled mb-0 pl-0">
              {section.items.map((item) => (
                <li key={item.to}>
                  <SidebarItem
                    to={item.to}
                    icon={item.icon}
                    label={item.label}
                    badge={item.badge}
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* footer */}
      <footer className="sidebar-footer">
        {/* avatar */}
        <div className="avatar">
          RK
        </div>

        <div className="admin-meta">
          <div className="admin-name">
            Riya Kapoor
          </div>
          <div className="admin-role">
            Super Admin
          </div>
        </div>

        {/* theme toggle */}
        <button
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          className="theme-toggle"
        >
          {theme === 'dark'
            ? <Sun className="theme-icon" />
            : <Moon className="theme-icon" />
          }
        </button>
      </footer>
    </aside>
  );
};

export default Sidebar;
