import React, { useState, useRef, useEffect } from 'react';
import { MessageSquareOff, Ban, CheckCircle, Send, Search } from 'lucide-react';
import MessageDetails from '../MessageDetails/MessageDetails';
import UserProfile from '../UserProfile/UserProfile';
import './ConversationWindow.css';

const DEFAULT_RECEIVERS = [
  { id: 'USR-3301',
     name: 'Sofia Rodriguez',
      handle: '@sofia.r' 
    },
  { id: 'USR-9943',
     name: 'Spammer99', 
     handle: '@spammer99' 
    },
  { id: 'USR-1154',
     name: 'Kabir Mehta', 
     handle: '@kabirm' 
    },
  { id: 'USR-5520', 
    name: 'GrowthBot1', 
    handle: '@growthbot1'
   },
  { id: 'USR-6610', 
    name: 'Alex Morgan', 
    handle: '@alex.m' 
  },
  { id: 'USR-8840',
     name: 'David Kim',
      handle: '@david.k' 
    }
];

const ConversationWindow = ({ 
  report, 
  onShowToast, 
  onSendMessage, 
  onAddNewReport,
  triggerOpenAddModal,
  onResetTriggerModal 
}) => {
  const [inputText, setInputText] = useState('');
  const [receivers, setReceivers] = useState(DEFAULT_RECEIVERS);
  const [selectedHandle, setSelectedHandle] = useState(report?.recipient || '@sofia.r');
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRecName, setNewRecName] = useState('');
  const [newRecHandle, setNewRecHandle] = useState('');
  const [newRecId, setNewRecId] = useState('');

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (triggerOpenAddModal) {
      setShowAddModal(true);
      if (onResetTriggerModal) onResetTriggerModal();
    }
  }, [triggerOpenAddModal, onResetTriggerModal]);

  useEffect(() => {
    if (report?.recipient) {
      setSelectedHandle(report.recipient);
    }
  }, [report?.recipient]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [report?.messages]);

  if (!report) {
    return (
      <div className="conversation-window-container d-flex align-items-center justify-content-center h-100">
        <span className="text-muted">Select a conversation to moderate</span>
      </div>
    );
  }

  const activeReceiverObj = receivers.find((r) => r.handle === selectedHandle) || {
    id: 'USR-3301',
    name: selectedHandle.replace('@', ''),
    handle: selectedHandle
  };

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

  const handleSendSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    if (onSendMessage) {
      onSendMessage(inputText, activeReceiverObj);
    }
    setInputText('');
  };

  const handleAddNewReceiverSubmit = (e) => {
    e.preventDefault();
    if (!newRecHandle.trim()) return;

    const formattedHandle = newRecHandle.startsWith('@') ? newRecHandle.trim() : `@${newRecHandle.trim()}`;
    const formattedId = newRecId.trim() || `USR-${Math.floor(1000 + Math.random() * 9000)}`;
    const formattedName = newRecName.trim() || formattedHandle.replace('@', '');

    const newRec = {
      id: formattedId,
      name: formattedName,
      handle: formattedHandle
    };

    setReceivers((prev) => [...prev, newRec]);
    setSelectedHandle(newRec.handle);
    setNewRecName('');
    setNewRecHandle('');
    setNewRecId('');
    setShowAddModal(false);

    if (onAddNewReport) {
      onAddNewReport(newRec);
    } else if (onShowToast) {
      onShowToast(`Created new chat with ${newRec.handle}`);
    }
  };

  return (
    <div className="conversation-window-container">
<<<<<<< HEAD
=======

>>>>>>> a6444eb (chat)
      <div className="conversation-window-header">
        <MessageDetails sender={report.sender} recipient={activeReceiverObj.handle} 
          type={report.type} />
        <UserProfile 
          onBlockSender={handleBlockSender} 
          onDeleteReport={handleDeleteReport} 
        />
      </div>
<<<<<<< HEAD

=======
>>>>>>> a6444eb (chat)
      <div className="conversation-window-messages">
        {
        report.messages.map((message) => {
          const isRight = message.isRight;
          const sId = message.senderId || 'USR-1001';
          const sName = message.senderName || message.sender || report.sender;
          const rId = message.receiverId || activeReceiverObj.id;
          const rName = message.receiverName || message.recipient || activeReceiverObj.handle;
          const dateTimeStr = message.dateTime || '17 Jul 2026 • 05:20:15 PM';

          return (
            <div 
              key={message.id} 
              className={`conversation-window-message-row ${isRight ? 'conversation-window-message-row-right' : 'conversation-window-message-row-left'}`}
            >
              <div className={`conversation-window-message-bubble ${isRight ? 'right' : 'left'}`}>
                <div className="conversation-window-message-meta">
                  <span className="conversation-window-meta-item">
                    <span className="conversation-window-meta-label">From:</span> {sName} <span className="conversation-window-meta-id">({sId})</span>
                  </span>
                  <span className="conversation-window-meta-separator">&rarr;</span>
                  <span className="conversation-window-meta-item">
                    <span className="conversation-window-meta-label">To:</span> {rName} <span className="conversation-window-meta-id">({rId})</span>
                  </span>
                </div>
                <div className="conversation-window-message-text">
                  {message.text}
                </div>
                <div className="conversation-window-message-timestamp">
                  {dateTimeStr}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <div className="conversation-window-footer">
        {/* Search & Input Bar on Left Side */}
        <form className="conversation-window-footer-input-box" onSubmit={handleSendSubmit}>
          <div className="conversation-window-footer-search">
            <Search size={15} />
            <input 
              type="text" 
              className="conversation-window-footer-search-input" 
              placeholder="Search or type a message..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>
          <button className="conversation-window-footer-send-btn" 
            type="submit" aria-label="Send message">
            <Send size={15} />
          </button>
        </form>

        <button 
          className="conversation-window-footer-btn" 
          type="button" onClick={handleRestrictMessaging}>
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
      {showAddModal && (
        <div className="conversation-window-modal-overlay">
          <form className="conversation-window-modal-box" onSubmit={handleAddNewReceiverSubmit}>
            <h5 className="conversation-window-modal-title">Add New Receiver</h5>
            <div className="conversation-window-modal-field">
              <label>Receiver Name</label>
              <input type="text" placeholder="e.g. Sarah Connor"
                value={newRecName} onChange={(e) => setNewRecName(e.target.value)} 
                required />
            </div>
            <div className="conversation-window-modal-field">
              <label>Username / Handle</label>
              <input 
                type="text" placeholder="e.g. @sarah_c" value={newRecHandle} 
                onChange={(e) => setNewRecHandle(e.target.value)} required />
            </div>
            <div className="conversation-window-modal-field">
              <label>Receiver ID</label>
              <input type="text" placeholder="e.g. USR-9088 (optional)" value={newRecId} 
                onChange={(e) => setNewRecId(e.target.value)} />
            </div>
            <div className="conversation-window-modal-actions">
              <button type="button" 
                className="conversation-window-modal-btn-cancel"
                onClick={() => setShowAddModal(false)}>
                Cancel
              </button>
              <button type="submit" className="conversation-window-modal-btn-save">
                Save & Select
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ConversationWindow;
