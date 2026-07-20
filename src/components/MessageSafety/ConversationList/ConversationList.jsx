import React from 'react';
import { UserPlus } from 'lucide-react';
import './ConversationList.css';

const ConversationList = ({ reports = [], selectedId, onSelect, onOpenAddUserModal }) => {
  return (
    <div className="conversation-list-container">
<<<<<<< HEAD
      {
      reports.map((report) => {
        const isActive = report.id === selectedId;
        const severityClass = `conversation-list-badge-severity-${report.severity.toLowerCase()}`;
        const reasonClass = `conversation-list-badge-reason-${report.type.toLowerCase()}`;

        return (
          <button
            key={report.id} className={`conversation-list-item ${isActive ? 'active' : ''}`}onClick={() => onSelect(report.id)}
            type="button">
            <div className="conversation-list-item-header">
              <span className="conversation-list-item-title">
                {report.sender} &rarr; {report.recipient}
              </span>
              <span className="conversation-list-item-time">{report.time}</span>
            </div>
            <div className="conversation-list-item-desc">
              {report.description}
            </div>
            <div className="conversation-list-item-badges">
              <span className={`conversation-list-badge ${severityClass}`}>
                {report.severity}
              </span>
              <span className={`conversation-list-badge ${reasonClass}`}>
                {report.type}
              </span>
            </div>
          </button>
        );
      })}
=======
      <div className="conversation-list-header-row">
        <h5 className="conversation-list-title">Conversations</h5>
        <button
          className="conversation-list-add-user-btn"
          onClick={onOpenAddUserModal}
          title="Add New User / Chat"
          type="button"
        >
          <UserPlus size={14} />
          <span>Add User</span>
        </button>
      </div>

      <div className="conversation-list-items-wrapper">
        {reports.map((report) => {
          const isActive = report.id === selectedId;
          const severityClass = `conversation-list-badge-severity-${(report.severity || 'low').toLowerCase()}`;
          const reasonClass = `conversation-list-badge-reason-${(report.type || 'direct').toLowerCase()}`;

          return (
            <button
              key={report.id}
              className={`conversation-list-item ${isActive ? 'active' : ''}`}
              onClick={() => onSelect(report.id)}
              type="button"
            >
              <div className="conversation-list-item-header">
                <span className="conversation-list-item-title">
                  {report.sender} &rarr; {report.recipient}
                </span>
                <span className="conversation-list-item-time">{report.time}</span>
              </div>
              <div className="conversation-list-item-desc">
                {report.description}
              </div>
              <div className="conversation-list-item-badges">
                <span className={`conversation-list-badge ${severityClass}`}>
                  {report.severity}
                </span>
                <span className={`conversation-list-badge ${reasonClass}`}>
                  {report.type}
                </span>
              </div>
            </button>
          );
        })}
      </div>
>>>>>>> a6444eb (chat)
    </div>
  );
};

export default ConversationList;
