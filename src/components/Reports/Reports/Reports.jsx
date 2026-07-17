import React from 'react';
import ReportsHeader from '../ReportsHeader/ReportsHeader';
import ReportFilters from '../ReportFilters/ReportFilters';
import ReportsTable from '../ReportsTable/ReportsTable';
import ReportDetails from '../ReportDetails/ReportDetails';
import ReportTimeline from '../ReportTimeline/ReportTimeline';
import './Reports.css';
const Reports = () => {
  return (
    <div className="d-flex flex-column h-100">
      <ReportsHeader />
      <div className="flex-grow-1 p-4 overflow-auto">
        <ReportFilters />
        <div className="d-flex gap-4 mt-4">
          <div className="flex-grow-1">
            <ReportsTable />
          </div>
          <div className="w-350">
            <ReportDetails />
            <div className="mt-4">
              <ReportTimeline />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
