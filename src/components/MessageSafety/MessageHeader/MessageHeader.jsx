import React from 'react';
import { Menu, ArrowLeft, Search, Bell, CircleHelp } from 'lucide-react';
import './MessageHeader.css';

const MessageHeader = ({ showBack = false, onBack }) => {
  return (
    <div className="topbar message-header-topbar">
      <button 
        className="menu-toggle message-header-menu-toggle" 
        id="menu-toggle" 
        aria-label="Toggle sidebar" 
        type="button"
      >
        <Menu />
      </button>
      <button 
        className={`back-btn ${showBack ? 'show' : ''} message-header-back-btn`} 
        id="back-btn" 
        aria-label="Go back"
        onClick={onBack}
        type="button"
      >
        <ArrowLeft />
      </button>
      <div className="page-title message-header-title" id="page-title">Message Safety</div>
      <div className="topbar-actions message-header-actions">
        <div className="search-box message-header-search-box">
          <Search />
          <input 
            type="text" 
            placeholder="Search users, posts, reports..." 
            className="message-header-search-input" 
          />
        </div>
        <button 
          className="icon-btn message-header-icon-btn" 
          aria-label="Notifications" 
          type="button"
        >
          <Bell />
        </button>
        <button 
          className="icon-btn message-header-icon-btn" 
          aria-label="Help" 
          type="button"
        >
          <CircleHelp />
        </button>
      </div>
    </div>
  );
};

export default MessageHeader;
