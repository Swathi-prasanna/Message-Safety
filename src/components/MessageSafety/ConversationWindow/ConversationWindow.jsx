import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquareOff, 
  Ban, 
  CheckCircle, 
  Send, 
  Smile, 
  Paperclip, 
  CheckCheck, 
  UserX,
  Trash2,
  FileText,
  Search,
  Bell,
  BellOff,
  MoreVertical,
  Info,
  CheckSquare,
  Star,
  Download,
  Archive,
  Trash,
  AlertTriangle,
  X,
  ShieldAlert,
  ShieldCheck,
  Heart,
  CircleMinus,
  Flag
} from 'lucide-react';
import ChatInput from '../ChatInput/ChatInput';
import './ConversationWindow.css';

const DEFAULT_RECEIVERS = [
  { id: 'USR-3301', name: 'Sofia Rodriguez', handle: '@sofia.r' },
  { id: 'USR-9943', name: 'Spammer99', handle: '@spammer99' },
  { id: 'USR-1154', name: 'Kabir Mehta', handle: '@kabirm' },
  { id: 'USR-5520', name: 'GrowthBot1', handle: '@growthbot1' },
  { id: 'USR-6610', name: 'Alex Morgan', handle: '@alex.m' },
  { id: 'USR-8840', name: 'David Kim', handle: '@david.k' }
];

const ConversationWindow = ({ 
  report, 
  onShowToast, 
  onSendMessage,
  onOpenConfirmModal,
  onSelectTab
}) => {
  const [inputText, setInputText] = useState('');
  const [receivers] = useState(DEFAULT_RECEIVERS);
  const [selectedHandle, setSelectedHandle] = useState(report?.recipient || '@sofia.r');

  const [showDropdown, setShowDropdown] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [showInChatSearch, setShowInChatSearch] = useState(false);
  const [inChatSearchQuery, setInChatSearchQuery] = useState('');
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedMsgIds, setSelectedMsgIds] = useState([]);
  const [isMuted, setIsMuted] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const [showSpamManagerModal, setShowSpamManagerModal] = useState(false);
  const [enableSpamFilter, setEnableSpamFilter] = useState(true);
  const [spamBlockedWords, setSpamBlockedWords] = useState('crypto giveaway, easy money, dm for followers, bit.ly');
  const [spamBlockedDomains, setSpamBlockedDomains] = useState('bit.ly, tinyurl.com');
  const [spamLinkScanning, setSpamLinkScanning] = useState(true);
  const [autoHideSuspicious, setAutoHideSuspicious] = useState(true);
  const [warnSuspiciousLinks, setWarnSuspiciousLinks] = useState(true);
  const [spamDetectionLevel, setSpamDetectionLevel] = useState('Medium');

  const dropdownRef = useRef(null);
  const messagesEndRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (report?.recipient) {
      setSelectedHandle(report.recipient);
    }
  }, [report]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [report?.messages]);

  if (!report) {
    return (
      <div className="conversation-window-empty d-flex align-items-center justify-content-center h-100">
        <span className="text-muted">Select a conversation to moderate</span>
      </div>
    );
  }

  const activeReceiverObj = receivers.find((r) => r.handle === selectedHandle) || {
    id: 'USR-3301',
    name: selectedHandle.replace('@', ''),
    handle: selectedHandle
  };

  const getAvatarInitials = (handle = '') => {
    const clean = handle.replace('@', '');
    if (!clean) return 'U';
    return clean.slice(0, 2).toUpperCase();
  };

  const handleActionClick = (actionType) => {
    setShowDropdown(false);
    setShowOffcanvas(false);
    if (onOpenConfirmModal) {
      onOpenConfirmModal(actionType, report);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    if (onSendMessage) {
      onSendMessage(inputText, activeReceiverObj);
    }
    setInputText('');
  };

  const handleExportChat = () => {
    setShowDropdown(false);
    const content = report.messages
      .map((m) => `[${m.dateTime}] ${m.senderName} (${m.sender}): ${m.text}`)
      .join('\n');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `chat_export_${report.sender.replace('@', '')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    if (onShowToast) onShowToast('Exported chat history file');
  };

  const toggleSelectMessage = (msgId) => {
    setSelectedMsgIds((prev) =>
      prev.includes(msgId) ? prev.filter((id) => id !== msgId) : [...prev, msgId]
    );
  };

  const filteredMessages = report.messages.filter((m) => {
    if (!inChatSearchQuery.trim()) return true;
    return m.text.toLowerCase().includes(inChatSearchQuery.toLowerCase());
  });

  return (
    <div className="conversation-window-container d-flex flex-column h-100 position-relative">
      <div className="conversation-window-header d-flex align-items-center justify-content-between p-3">
        <div 
          className="conversation-window-header-user-info d-flex align-items-center gap-3 cursor-pointer"
          onClick={() => setShowOffcanvas(true)}
          title="Click to view conversation info"
        >
          <div className="conversation-window-header-avatar">
            {getAvatarInitials(report.sender)}
          </div>
          <div>
            <h5 className="conversation-window-header-title mb-0 d-flex align-items-center gap-2">
              <span>{report.sender}</span>
              <span className="conversation-window-header-arrow">&rarr;</span>
              <span>{activeReceiverObj.handle}</span>
              {isFavorite && <Heart size={14} className="text-danger fill-danger" />}
            </h5>
            <span className="conversation-window-header-subtitle">
              Reported for: <strong>{report.type}</strong> ({report.severity} Severity)
              {isMuted && <span className="ms-2 badge bg-secondary">Muted</span>}
            </span>
          </div>
        </div>
        <div className="conversation-window-header-actions d-flex align-items-center gap-1 position-relative" ref={dropdownRef}>
          <button 
            className={`conversation-window-icon-btn ${showInChatSearch ? 'active' : ''}`}
            type="button" 
            onClick={() => setShowInChatSearch(!showInChatSearch)}
            title="Search Messages"
          >
            <Search size={18} />
          </button>

          <button 
            className={`conversation-window-icon-btn ${isMuted ? 'active' : ''}`}
            type="button" 
            onClick={() => {
              setIsMuted(!isMuted);
              if (onShowToast) onShowToast(isMuted ? 'Unmuted notifications' : 'Muted notifications');
            }}
            title={isMuted ? 'Unmute Notifications' : 'Mute Notifications'}
          >
            {isMuted ? <BellOff size={18} /> : <Bell size={18} />}
          </button>

          <button 
            className={`conversation-window-icon-btn ${showDropdown ? 'active' : ''}`}
            type="button" 
            onClick={() => setShowDropdown(!showDropdown)}
            title="More Options"
          >
            <MoreVertical size={19} />
          </button>
          {showDropdown && (
            <div className="conversation-window-dropdown-menu">
              <button 
                className="conversation-window-dropdown-item" 
                onClick={() => { setShowOffcanvas(true); setShowDropdown(false); }}
                type="button"
              >
                <Info size={16} />
                <span>Conversation Info</span>
              </button>

              <button 
                className="conversation-window-dropdown-item" 
                onClick={() => { setShowInChatSearch(true); setShowDropdown(false); }}
                type="button"
              >
                <Search size={16} />
                <span>Search Messages</span>
              </button>

              <button 
                className="conversation-window-dropdown-item" 
                onClick={() => { setIsSelectMode(!isSelectMode); setShowDropdown(false); }}
                type="button"
              >
                <CheckSquare size={16} />
                <span>{isSelectMode ? 'Cancel Selection' : 'Select Messages'}</span>
              </button>

              <div className="conversation-window-dropdown-divider"></div>

              <button 
                className="conversation-window-dropdown-item" 
                onClick={() => {
                  if (onSelectTab) onSelectTab('rules');
                  setShowDropdown(false);
                }}
                type="button"
              >
                <ShieldCheck size={16} />
                <span>Safety Rules</span>
              </button>

              <div className="conversation-window-dropdown-divider"></div>

              <button 
                className="conversation-window-dropdown-item" 
                onClick={() => {
                  setIsMuted(!isMuted);
                  setShowDropdown(false);
                  if (onShowToast) onShowToast(isMuted ? 'Unmuted notifications' : 'Muted notifications');
                }}
                type="button"
              >
                {isMuted ? <Bell size={16} /> : <BellOff size={16} />}
                <span>{isMuted ? 'Unmute Notifications' : 'Mute Notifications'}</span>
              </button>

              <button 
                className="conversation-window-dropdown-item" 
                onClick={() => {
                  setIsFavorite(!isFavorite);
                  setShowDropdown(false);
                  if (onShowToast) onShowToast(isFavorite ? 'Removed from favorites' : 'Added to favorites');
                }}
                type="button"
              >
                <Heart size={16} className={isFavorite ? 'text-danger fill-danger' : ''} />
                <span>{isFavorite ? 'Remove Favorite' : 'Add to Favorites'}</span>
              </button>

              <button 
                className="conversation-window-dropdown-item" 
                onClick={handleExportChat}
                type="button"
              >
                <Download size={16} />
                <span>Export Chat</span>
              </button>

              <button 
                className="conversation-window-dropdown-item" 
                onClick={() => {
                  setShowDropdown(false);
                  if (onShowToast) onShowToast('Conversation archived');
                }}
                type="button"
              >
                <Archive size={16} />
                <span>Archive Conversation</span>
              </button>

              <button 
                className="conversation-window-dropdown-item" 
                onClick={() => {
                  setShowSpamManagerModal(true);
                  setShowDropdown(false);
                }}
                type="button"
              >
                <ShieldAlert size={16} />
                <span>Spam Manager</span>
              </button>

              <div className="conversation-window-dropdown-divider"></div>

              <button 
                className="conversation-window-dropdown-item text-danger" 
                onClick={() => handleActionClick('Clear')}
                type="button"
              >
                <CircleMinus size={16} />
                <span>Clear Conversation</span>
              </button>

              <button 
                className="conversation-window-dropdown-item text-danger" 
                onClick={() => handleActionClick('Delete')}
                type="button"
              >
                <Trash2 size={16} />
                <span>Delete Conversation</span>
              </button>

              <div className="conversation-window-dropdown-divider"></div>

              <button 
                className="conversation-window-dropdown-item text-danger" 
                onClick={() => handleActionClick('Report')}
                type="button"
              >
                <Flag size={16} />
                <span>Report User</span>
              </button>

              <button 
                className="conversation-window-dropdown-item text-danger" 
                onClick={() => handleActionClick('Block')}
                type="button"
              >
                <Ban size={16} />
                <span>Block User</span>
              </button>
            </div>
          )}
        </div>
      </div>
      {showInChatSearch && (
        <div className="conversation-window-in-chat-search p-2 border-bottom d-flex align-items-center gap-2">
          <Search size={16} className="text-muted ms-2" />
          <input 
            type="text" 
            className="form-control form-control-sm border-0 bg-transparent shadow-none" 
            placeholder="Search within this chat..." 
            value={inChatSearchQuery}
            onChange={(e) => setInChatSearchQuery(e.target.value)}
          />
          {inChatSearchQuery && (
            <button 
              className="btn btn-sm btn-link text-muted p-0 me-2" 
              onClick={() => setInChatSearchQuery('')}
              type="button"
            >
              Clear
            </button>
          )}
          <button 
            className="btn btn-sm btn-close me-1" 
            onClick={() => { setShowInChatSearch(false); setInChatSearchQuery(''); }}
            type="button"
          />
        </div>
      )}
      <div className="conversation-window-messages flex-grow-1 p-3 overflow-y-auto d-flex flex-column gap-3">
        {filteredMessages.map((msg) => {
          const isSelected = selectedMsgIds.includes(msg.id);

          return (
            <div 
              key={msg.id}
              className={`d-flex align-items-end gap-2 ${msg.isRight ? 'justify-content-end' : 'justify-content-start'}`}
            >
              {isSelectMode && (
                <input 
                  type="checkbox" 
                  className="form-check-input mb-2 cursor-pointer"
                  checked={isSelected}
                  onChange={() => toggleSelectMessage(msg.id)}
                />
              )}

              <div className={`conversation-window-message-bubble ${msg.isRight ? 'right' : 'left'} ${isSelected ? 'selected' : ''}`}>
                <div className="conversation-window-message-header d-flex justify-content-between align-items-center mb-1">
                  <span className="conversation-window-message-sender-name">
                    {msg.senderName} ({msg.sender})
                  </span>
                </div>
                <div className="conversation-window-message-text mb-1">
                  {msg.text}
                </div>
                <div className="conversation-window-message-footer d-flex align-items-center justify-content-end gap-1">
                  <span className="conversation-window-message-timestamp">{msg.dateTime}</span>
                  {msg.isRight && <CheckCheck size={14} className="conversation-window-read-icon" />}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput
        onSendMessage={(msgText) => {
          if (onSendMessage) {
            onSendMessage(msgText, activeReceiverObj);
          }
        }}
        placeholder={`Type a message to ${activeReceiverObj.handle}...`}
      />
      {showOffcanvas && (
        <div className="conversation-window-offcanvas-backdrop" onClick={() => setShowOffcanvas(false)}>
          <div className="conversation-window-offcanvas-panel p-3" onClick={(e) => e.stopPropagation()}>
            <div className="d-flex justify-content-between align-items-center pb-3 border-bottom mb-3">
              <h5 className="mb-0 font-bold">Contact Info</h5>
              <button className="btn-close" onClick={() => setShowOffcanvas(false)} type="button" />
            </div>

            <div className="d-flex flex-column align-items-center text-center py-3 border-bottom mb-3">
              <div className="conversation-window-offcanvas-avatar mb-2">
                {getAvatarInitials(report.sender)}
              </div>
              <h5 className="mb-1">{report.sender}</h5>
              <p className="text-muted fs-7 mb-2">Report ID: #{report.id}</p>
              <div className="d-flex gap-2">
                <span className="badge bg-danger">{report.severity} Severity</span>
                <span className="badge bg-secondary">{report.type}</span>
              </div>
            </div>

            <div className="py-2">
              <h6 className="text-muted text-uppercase fs-8 fw-bold mb-3">Quick Actions</h6>
              <div className="conversation-window-offcanvas-action-list">
                <button 
                  className="conversation-window-offcanvas-action-row" 
                  onClick={() => handleActionClick('Restrict')}
                  type="button"
                >
                  <ShieldAlert size={18} className="conversation-window-offcanvas-icon" />
                  <span>Restrict Messaging</span>
                </button>

                <button 
                  className="conversation-window-offcanvas-action-row" 
                  onClick={() => {
                    setIsMuted(!isMuted);
                    if (onShowToast) onShowToast(isMuted ? 'Unmuted notifications' : 'Muted notifications');
                  }}
                  type="button"
                >
                  <BellOff size={18} className="conversation-window-offcanvas-icon" />
                  <span>Mute Notifications</span>
                </button>

                <button 
                  className="conversation-window-offcanvas-action-row" 
                  onClick={() => {
                    setIsFavorite(!isFavorite);
                    if (onShowToast) onShowToast(isFavorite ? 'Removed from favorites' : 'Added to favorites');
                  }}
                  type="button"
                >
                  <Heart size={18} className={`conversation-window-offcanvas-icon ${isFavorite ? 'text-danger fill-danger' : ''}`} />
                  <span>Add to Favorites</span>
                </button>

                <button 
                  className="conversation-window-offcanvas-action-row" 
                  onClick={() => {
                    setShowOffcanvas(false);
                    if (onShowToast) onShowToast('Conversation archived');
                  }}
                  type="button"
                >
                  <Archive size={18} className="conversation-window-offcanvas-icon" />
                  <span>Archive Conversation</span>
                </button>

                <button 
                  className="conversation-window-offcanvas-action-row" 
                  onClick={handleExportChat}
                  type="button"
                >
                  <Download size={18} className="conversation-window-offcanvas-icon" />
                  <span>Export Chat</span>
                </button>

                <div className="conversation-window-offcanvas-divider"></div>

                <button 
                  className="conversation-window-offcanvas-action-row danger" 
                  onClick={() => handleActionClick('Clear')}
                  type="button"
                >
                  <CircleMinus size={18} className="conversation-window-offcanvas-icon" />
                  <span>Clear Chat</span>
                </button>

                <button 
                  className="conversation-window-offcanvas-action-row danger" 
                  onClick={() => handleActionClick('Block')}
                  type="button"
                >
                  <Ban size={18} className="conversation-window-offcanvas-icon" />
                  <span>Block User</span>
                </button>

                <button 
                  className="conversation-window-offcanvas-action-row danger" 
                  onClick={() => handleActionClick('Report')}
                  type="button"
                >
                  <Flag size={18} className="conversation-window-offcanvas-icon" />
                  <span>Report User</span>
                </button>

                <button 
                  className="conversation-window-offcanvas-action-row danger" 
                  onClick={() => handleActionClick('Delete')}
                  type="button"
                >
                  <Trash2 size={18} className="conversation-window-offcanvas-icon" />
                  <span>Delete Chat</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showSpamManagerModal && (
        <div className="message-safety-modal-overlay">
          <div className="message-safety-modal-card" style={{ width: '520px', maxWidth: '95vw' }}>
            <div className="message-safety-modal-header d-flex justify-content-between align-items-start pb-2 border-bottom">
              <div>
                <h5 className="message-safety-modal-title mb-1 d-flex align-items-center gap-2">
                  <ShieldAlert size={20} className="text-primary" />
                  <span>Spam Manager</span>
                </h5>
                <p className="text-muted fs-7 mb-0">
                  Manage spam protection and filtering settings for this conversation.
                </p>
              </div>
              <button
                className="message-safety-modal-close"
                onClick={() => setShowSpamManagerModal(false)}
                type="button"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="message-safety-modal-body py-3 d-flex flex-column gap-3" style={{ maxHeight: '70vh', overflowY: 'auto' }}>

              <div className="d-flex justify-content-between align-items-center p-3 rounded border background-surface-offset">
                <div>
                  <h6 className="mb-0 fw-bold fs-7">Enable Spam Filter</h6>
                  <small className="text-muted fs-8">Turn on platform spam filtering for incoming messages</small>
                </div>
                <label className="message-safety-toggle-switch">
                  <input
                    type="checkbox"
                    checked={enableSpamFilter}
                    onChange={(e) => setEnableSpamFilter(e.target.checked)}
                    className="message-safety-toggle-input"
                  />
                  <span className="message-safety-toggle-slider"></span>
                </label>
              </div>
              <div>
                <label className="form-label fs-7 fw-bold mb-1">Blocked Words / Phrases</label>
                <textarea
                  className="form-control fs-7"
                  rows={2}
                  placeholder="Enter comma-separated words or phrases"
                  value={spamBlockedWords}
                  onChange={(e) => setSpamBlockedWords(e.target.value)}
                />
              </div>
              <div>
                <label className="form-label fs-7 fw-bold mb-1">Blocked Domains</label>
                <textarea
                  className="form-control fs-7"
                  rows={2}
                  placeholder="e.g., bit.ly, tinyurl.com"
                  value={spamBlockedDomains}
                  onChange={(e) => setSpamBlockedDomains(e.target.value)}
                />
              </div>
              <div className="d-flex justify-content-between align-items-center p-3 rounded border background-surface-offset">
                <div>
                  <h6 className="mb-0 fw-bold fs-7">Link Scanning</h6>
                  <small className="text-muted fs-8">Scan shared links for known scam or malicious domains.</small>
                </div>
                <label className="message-safety-toggle-switch">
                  <input
                    type="checkbox"
                    checked={spamLinkScanning}
                    onChange={(e) => setSpamLinkScanning(e.target.checked)}
                    className="message-safety-toggle-input"
                  />
                  <span className="message-safety-toggle-slider"></span>
                </label>
              </div>
              <div className="d-flex justify-content-between align-items-center p-3 rounded border background-surface-offset">
                <div>
                  <h6 className="mb-0 fw-bold fs-7">Automatically Hide Suspicious Messages</h6>
                  <small className="text-muted fs-8">Shadow-hide DMs flagged with high spam confidence</small>
                </div>
                <label className="message-safety-toggle-switch">
                  <input
                    type="checkbox"
                    checked={autoHideSuspicious}
                    onChange={(e) => setAutoHideSuspicious(e.target.checked)}
                    className="message-safety-toggle-input"
                  />
                  <span className="message-safety-toggle-slider"></span>
                </label>
              </div>
              <div className="d-flex justify-content-between align-items-center p-3 rounded border background-surface-offset">
                <div>
                  <h6 className="mb-0 fw-bold fs-7">Warn Before Opening Suspicious Links</h6>
                  <small className="text-muted fs-8">Show safety prompt before navigating external URLs</small>
                </div>
                <label className="message-safety-toggle-switch">
                  <input
                    type="checkbox"
                    checked={warnSuspiciousLinks}
                    onChange={(e) => setWarnSuspiciousLinks(e.target.checked)}
                    className="message-safety-toggle-input"
                  />
                  <span className="message-safety-toggle-slider"></span>
                </label>
              </div>
              <div>
                <label className="form-label fs-7 fw-bold mb-2">Spam Detection Level</label>
                <div className="btn-group w-100" role="group">
                  {['Low', 'Medium', 'High'].map((level) => (
                    <button
                      key={level}
                      type="button"
                      className={`btn btn-sm ${spamDetectionLevel === level ? 'btn-primary' : 'btn-outline-secondary'}`}
                      onClick={() => setSpamDetectionLevel(level)}
                    >
                      {level} {level === 'Medium' && '(Default)'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="message-safety-modal-footer d-flex justify-content-end gap-2 pt-3 border-top">
              <button
                className="btn btn-outline-secondary btn-sm px-3"
                onClick={() => setShowSpamManagerModal(false)}
                type="button"
              >
                Cancel
              </button>
              <button
                className="btn btn-primary btn-sm px-4"
                onClick={() => {
                  setShowSpamManagerModal(false);
                  if (onShowToast) onShowToast('Spam Manager settings updated successfully.');
                }}
                type="button"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversationWindow;
