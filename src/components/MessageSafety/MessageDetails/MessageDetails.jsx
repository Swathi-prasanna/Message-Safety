import React from 'react';
import './MessageDetails.css';

const MessageDetails = ({ sender, recipient, type }) => {
  return (
    <div className="message-details-container">
      <h4 className="message-details-title">
        {sender} &rarr; {recipient}
      </h4>
      <span className="message-details-sub">
        Reported for: {type}
      </span>
    </div>
  );
};

export default MessageDetails;
