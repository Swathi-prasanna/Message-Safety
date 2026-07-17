import React from 'react';
import { UserX, Trash2, MessageSquareOff, Ban, CheckCircle } from 'lucide-react';
import './ConversationWindow.css';

const ConversationWindow = ({ report, onShowToast }) => {
  if (!report) {
    return (
      <div className="conversation-window-container d-flex align-items-center justify-content-center h-100">
        <span className="text-muted">Select a conversation to moderate</span>
      </div>
    );
  }

  const handleDeleteReport = () => {
    if (onShowToast) onShowToast('Message deleted');
  };

  const handleBanSender = () => {
    if (onShowToast) onShowToast('Sender banned');
  };

  const handleRestrictMessaging = () => {
    if (onShowToast) onShowToast('Messaging restricted for this user');
  };

  const handleMarkResolved = () => {
    if (onShowToast) onShowToast('Marked as resolved');
  };

  const handleBlockSender = () => {
    if (onShowToast) onShowToast('Sender blocked');
  };

  return (
    <div className="conversation-window-container">
      <div className="conversation-window-header">
        <div className="conversation-window-header-info">
          <h4 className="conversation-window-header-title">
            {report.sender} &rarr; {report.recipient}
          </h4>
          <span className="conversation-window-header-sub">
            Reported for: {report.type}
          </span>
        </div>
        <div className="conversation-window-header-actions">
          <button 
            className="conversation-window-header-btn" 
            aria-label="Block sender"
            title="Block sender"
            type="button"
            onClick={handleBlockSender}
          >
            <UserX size={18} />
          </button>
          <button 
            className="conversation-window-header-btn" 
            aria-label="Delete message"
            title="Delete message"
            type="button"
            onClick={handleDeleteReport}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      <div className="conversation-window-messages">
        {report.messages.map((message) => {
          const isRight = message.isRight;
          return (
            <div 
              key={message.id} 
              className={`conversation-window-message-row ${isRight ? 'conversation-window-message-row-right' : 'conversation-window-message-row-left'}`}
            >
              <div className={`conversation-window-message-bubble ${isRight ? 'right' : 'left'}`}>
                <div className="conversation-window-message-text">
                  {message.text}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="conversation-window-footer">
        <button 
          className="conversation-window-footer-btn" 
          type="button"
          onClick={handleRestrictMessaging}
        >
          <MessageSquareOff size={16} />
          <span>Restrict messaging</span>
        </button>
        <button 
          className="conversation-window-footer-btn" 
          type="button"
          onClick={handleBanSender}
        >
          <Ban size={16} />
          <span>Ban sender</span>
        </button>
        <button 
          className="conversation-window-footer-btn-resolve" 
          type="button"
          onClick={handleMarkResolved}
        >
          <CheckCircle size={16} />
          <span>Mark resolved</span>
        </button>
      </div>
    </div>
  );
};

export default ConversationWindow;
