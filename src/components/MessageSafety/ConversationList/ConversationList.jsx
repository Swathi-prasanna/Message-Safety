import React, { useState } from 'react';
import { Search, MessageCircle, Filter, ArrowUpDown, Plus } from 'lucide-react';
import './ConversationList.css';

const ConversationList = ({ reports = [], selectedId, onSelect, onOpenAddUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  const filteredReports = reports
    .filter((report) => {
      const query = searchTerm.toLowerCase();
      const matchesSearch =
        report.sender?.toLowerCase().includes(query) ||
        report.recipient?.toLowerCase().includes(query) ||
        report.description?.toLowerCase().includes(query) ||
        report.type?.toLowerCase().includes(query);

      const matchesSeverity =
        severityFilter === 'All' ||
        (report.severity || '').toLowerCase() === severityFilter.toLowerCase();

      const matchesCategory =
        categoryFilter === 'All' ||
        (report.type || '').toLowerCase() === categoryFilter.toLowerCase();

      return matchesSearch && matchesSeverity && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return b.id - a.id;
      if (sortBy === 'oldest') return a.id - b.id;
      return 0;
    });

  const getAvatarInitials = (handle = '') => {
    const clean = handle.replace('@', '');
    if (!clean) return 'U';
    const parts = clean.split(/[._-]/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return clean.slice(0, 2).toUpperCase();
  };

  return (
    <div className="conversation-list-container d-flex flex-column h-100">
      <div className="conversation-list-header-row d-flex align-items-center justify-content-between p-3">
        <div className="conversation-list-header-title-box d-flex align-items-center gap-2">
          <div className="conversation-list-user-avatar-circle">
            <MessageCircle size={18} />
          </div>
          <h5 className="conversation-list-title mb-0">Conversations</h5>
        </div>
        {onOpenAddUser && (
          <button
            className="btn btn-sm btn-primary rounded-circle p-1 d-flex align-items-center justify-content-center"
            style={{ width: '28px', height: '28px' }}
            onClick={onOpenAddUser}
            title="Add New User Conversation"
            type="button"
          >
            <Plus size={16} />
          </button>
        )}
      </div>
      <div className="conversation-list-search-wrapper px-3 py-2">
        <div className="conversation-list-search-box d-flex align-items-center gap-2 px-3 py-1">
          <Search size={15} className="conversation-list-search-icon" />
          <input
            type="text"
            className="conversation-list-search-input border-0 w-100"
            placeholder="Search or start new chat"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}/>
        </div>
      </div>
      {showFilters && (
        <div className="conversation-list-filter-bar px-3 py-2 d-flex flex-wrap gap-2 border-bottom">
          <div className="conversation-list-filter-item flex-grow-1">
            <label className="conversation-list-filter-label">Severity</label>
            <select
              className="conversation-list-filter-select w-100"
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}>
              <option value="All">All Severities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="conversation-list-filter-item flex-grow-1">
            <label className="conversation-list-filter-label">Category</label>
            <select
              className="conversation-list-filter-select w-100"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)} >
              <option value="All">All Categories</option>
              <option value="Scam">Scam</option>
              <option value="Threat">Threat</option>
              <option value="Harassment">Harassment</option>
              <option value="Spam">Spam</option>
              <option value="Direct">Direct</option>
            </select>
          </div>

          <div className="conversation-list-filter-item flex-grow-1">
            <label className="conversation-list-filter-label">Sort</label>
            <select
              className="conversation-list-filter-select w-100"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>
      )}

    
      <div className="conversation-list-items-wrapper flex-grow-1 overflow-auto px-2 py-1">
        {filteredReports.length === 0 ? (
          <div className="conversation-list-empty text-center py-4 text-muted fs-7">
            No matching conversations found
          </div>
        ) : (
          filteredReports.map((report) => {
            const isActive = report.id === selectedId;
            const severityClass = `conversation-list-badge-severity-${(report.severity || 'low').toLowerCase()}`;
            const reasonClass = `conversation-list-badge-reason-${(report.type || 'direct').toLowerCase()}`;
            const lastMsg =
              report.messages && report.messages.length > 0
                ? report.messages[report.messages.length - 1].text
                : report.description;

            return (
              <button
                key={report.id}
                className={`conversation-list-item d-flex align-items-start gap-3 w-100 border-0 text-start ${isActive ? 'active' : ''}`}
                onClick={() => onSelect(report.id)}
                type="button"
              >
                <div className="conversation-list-item-avatar-circle flex-shrink-0">
                  {getAvatarInitials(report.sender)}
                </div>

                <div className="conversation-list-item-content-box flex-grow-1 min-w-0">
                  <div className="conversation-list-item-header d-flex justify-content-between align-items-center mb-1">
                    <span className="conversation-list-item-title text-truncate">
                      {report.sender} &rarr; {report.recipient}
                    </span>
                    <span className="conversation-list-item-time flex-shrink-0 ms-2">{report.time}</span>
                  </div>

                  <div className="conversation-list-item-desc text-truncate mb-2">
                    {lastMsg}
                  </div>

                  <div className="conversation-list-item-badges d-flex gap-1">
                    <span className={`conversation-list-badge ${severityClass}`}>
                      {report.severity}
                    </span>
                    <span className={`conversation-list-badge ${reasonClass}`}>
                      {report.type}
                    </span>
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ConversationList;
