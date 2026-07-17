import React from 'react';
import './SystemHealth.css';
const getStatusBadge = (status) => {
  const map = {
    Active: 'badge-success',
    Suspended: 'badge-warning',
    Banned: 'badge-error',
    Restricted: 'badge-neutral',
    Pending: 'badge-warning',
    Resolved: 'badge-success',
    Escalated: 'badge-error',
    'Auto-hidden': 'badge-neutral',
    Approved: 'badge-success',
    Rejected: 'badge-error',
    'Needs resubmission': 'badge-warning',
    High: 'badge-error',
    Medium: 'badge-warning',
    Low: 'badge-neutral',
    Open: 'badge-warning',
    'In progress': 'badge-blue',
    Unassigned: 'badge-neutral',
  };
  return map[status] || 'badge-neutral';
};

const getStatusDotClass = (status) => {
  if (status === 'Active' || status === 'Resolved' || status === 'Approved') return 'dot-success';
  if (status === 'Suspended' || status === 'Pending' || status === 'Medium') return 'dot-warning';
  if (status === 'Banned' || status === 'Escalated' || status === 'Rejected' || status === 'High') return 'dot-error';
  return 'dot-neutral';
};

const SystemHealth = ({ healthData = [] }) => {
  return (
    <div className="health-card">
      <div className="health-card-head">
        <div className="health-card-title">System health</div>
        <div className="health-card-sub">Live status of core services</div>
      </div>
      
      {healthData.map((item, idx) => (
        <div key={idx} className="health-row">
          <span>
            <span 
              className={`health-dot ${getStatusDotClass(item.status)}`}
            ></span>
            {item.name}
          </span>
          <span className={`status-badge ${getStatusBadge(item.status)}`}>
            {item.status}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SystemHealth;
