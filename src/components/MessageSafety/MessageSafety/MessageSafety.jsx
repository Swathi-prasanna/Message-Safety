import React from 'react';
import MessageHeader from '../MessageHeader/MessageHeader';
import ConversationList from '../ConversationList/ConversationList';
import ConversationWindow from '../ConversationWindow/ConversationWindow';
import MessageDetails from '../MessageDetails/MessageDetails';
import UserProfile from '../UserProfile/UserProfile';
import './MessageSafety.css';
const MessageSafety = () => {
  return (
    <div className="d-flex flex-column h-100">
      <MessageHeader />
      <div className="flex-grow-1 p-4 overflow-auto">
        <div className="d-flex gap-4 h-100">
          <div className="w-300">
            <ConversationList />
          </div>
          <div className="flex-grow-1 d-flex flex-column gap-4">
            <ConversationWindow />
            <div className="d-flex gap-4 h-100">
              <div className="flex-grow-1">
                <MessageDetails />
              </div>
              <div className="w-300">
                <UserProfile />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageSafety;
