import React from 'react';
import './ConversationList.css';

const ConversationList = ({ reports = [], selectedId, onSelect }) => {
  return (
    <div className="conversation-list-container">
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
    </div>
  );
};

export default ConversationList;
