import React from 'react';
import { MessageSquareOff, Ban, CheckCircle } from 'lucide-react';
import MessageDetails from '../MessageDetails/MessageDetails';
import UserProfile from '../UserProfile/UserProfile';
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
      {/* Header utilizing sub-components for modularity */}
      <div className="conversation-window-header">
        <MessageDetails 
          sender={report.sender} 
          recipient={report.recipient} 
          type={report.type} 
        />
        <UserProfile 
          onBlockSender={handleBlockSender} 
          onDeleteReport={handleDeleteReport} 
        />
      </div>

      {/* Messages thread */}
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

      {/* Footer Actions */}
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
