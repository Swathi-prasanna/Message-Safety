import React from 'react';
import SupportHeader from '../SupportHeader/SupportHeader';
import TicketList from '../TicketList/TicketList';
import TicketDetails from '../TicketDetails/TicketDetails';
import TicketHistory from '../TicketHistory/TicketHistory';
import ReplySection from '../ReplySection/ReplySection';
import InternalNotes from '../InternalNotes/InternalNotes';
import './SupportAgentDesk.css';
const SupportAgentDesk = () => {
  return (
    <div className="d-flex flex-column h-100">
      <SupportHeader />
      <div className="flex-grow-1 p-4 overflow-auto">
        <div className="d-flex gap-4 h-100">
          <div className="w-350">
            <TicketList />
          </div>
          <div className="flex-grow-1 d-flex flex-column gap-4">
            <TicketDetails />
            <TicketHistory />
            <div className="d-flex gap-4 mt-auto">
              <div className="flex-grow-1">
                <ReplySection />
              </div>
              <div className="w-300">
                <InternalNotes />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportAgentDesk;
