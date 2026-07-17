import React from 'react';
import VerificationHeader from '../VerificationHeader/VerificationHeader';
import VerificationTable from '../VerificationTable/VerificationTable';
import VerificationDetails from '../VerificationDetails/VerificationDetails';
import DocumentViewer from '../DocumentViewer/DocumentViewer';
import './Verification.css';
const Verification = () => {
  return (
    <div className="d-flex flex-column h-100">
      <VerificationHeader />
      <div className="flex-grow-1 p-4 overflow-auto">
        <div className="d-flex gap-4">
          <div className="flex-grow-1">
            <VerificationTable />
          </div>
          <div className="w-400">
            <VerificationDetails />
            <div className="mt-4">
              <DocumentViewer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verification;
