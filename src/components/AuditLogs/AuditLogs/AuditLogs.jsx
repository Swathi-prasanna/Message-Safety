import React from 'react';
import AuditHeader from '../AuditHeader/AuditHeader';
import AuditFilters from '../AuditFilters/AuditFilters';
import AuditTable from '../AuditTable/AuditTable';
import AuditDetails from '../AuditDetails/AuditDetails';
import './AuditLogs.css';
const AuditLogs = () => {
  return (
    <div className="d-flex flex-column h-100">
      <AuditHeader />
      <div className="flex-grow-1 p-4 overflow-auto">
        <AuditFilters />
        <div className="d-flex gap-4 mt-4">
          <div className="flex-grow-1">
            <AuditTable />
          </div>
          <div className="w-400">
            <AuditDetails />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditLogs;
