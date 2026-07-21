import React, { useState, useEffect } from 'react';
import { CheckCircle, X, ArrowLeft } from 'lucide-react';
import MessageHeader from '../MessageHeader/MessageHeader';
import ConversationList from '../ConversationList/ConversationList';
import ConversationWindow from '../ConversationWindow/ConversationWindow';
import './MessageSafety.css';

const formatDateTime = (date = new Date()) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const day = String(date.getDate()).padStart(2, '0');
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const formattedHours = String(hours).padStart(2, '0');

  return `${day} ${month} ${year} • ${formattedHours}:${minutes}:${seconds} ${ampm}`;
};

const INITIAL_REPORTS = [
  {
    id: 1,
    sender: '@weiz',
    recipient: '@spammer99',
    time: '10m',
    description: 'Reported: scam link shared in DM',
    severity: 'Medium',
    type: 'Scam',
    messages: [
      {
        id: 101,
        senderId: 'USR-8821',
        senderName: 'Wei Zhang',
        sender: '@weiz',
        receiverId: 'USR-9943',
        receiverName: 'Spammer99',
        recipient: '@spammer99',
        text: 'Hey! Check this out, easy money 💰 bit.ly/xyz123',
        dateTime: '17 Jul 2026 • 05:20:15 PM',
        isRight: false
      },
      {
        id: 102,
        senderId: 'USR-9943',
        senderName: 'Spammer99',
        sender: '@spammer99',
        receiverId: 'USR-8821',
        receiverName: 'Wei Zhang',
        recipient: '@weiz',
        text: 'Not interested, please stop messaging me.',
        dateTime: '17 Jul 2026 • 05:22:04 PM',
        isRight: true
      },
      {
        id: 103,
        senderId: 'USR-8821',
        senderName: 'Wei Zhang',
        sender: '@weiz',
        receiverId: 'USR-9943',
        receiverName: 'Spammer99',
        recipient: '@spammer99',
        text: 'Come on, everyone doing it. Last chance!',
        dateTime: '17 Jul 2026 • 05:25:30 PM',
        isRight: false
      }
    ]
  },
  {
    id: 2,
    sender: '@priya.n',
    recipient: '@sofia.r',
    time: '32m',
    description: 'Reported: threatening language',
    severity: 'High',
    type: 'Threat',
    messages: [
      {
        id: 201,
        senderId: 'USR-4412',
        senderName: 'Priya Nambiar',
        sender: '@priya.n',
        receiverId: 'USR-3301',
        receiverName: 'Sofia Rodriguez',
        recipient: '@sofia.r',
        text: 'You will regret ignoring me.',
        dateTime: '17 Jul 2026 • 04:45:10 PM',
        isRight: false
      },
      {
        id: 202,
        senderId: 'USR-3301',
        senderName: 'Sofia Rodriguez',
        sender: '@sofia.r',
        receiverId: 'USR-4412',
        receiverName: 'Priya Nambiar',
        recipient: '@priya.n',
        text: 'Please stop, I am blocking you.',
        dateTime: '17 Jul 2026 • 04:48:22 PM',
        isRight: true
      },
      {
        id: 203,
        senderId: 'USR-4412',
        senderName: 'Priya Nambiar',
        sender: '@priya.n',
        receiverId: 'USR-3301',
        receiverName: 'Sofia Rodriguez',
        recipient: '@sofia.r',
        text: 'This is not over.',
        dateTime: '17 Jul 2026 • 04:50:00 PM',
        isRight: false
      }
    ]
  },
  {
    id: 3,
    sender: '@meera_i',
    recipient: '@kabirm',
    time: '1h',
    description: 'Reported: unwanted contact after block',
    severity: 'High',
    type: 'Harassment',
    messages: [
      {
        id: 301,
        senderId: 'USR-7729',
        senderName: 'Meera Iyer',
        sender: '@meera_i',
        receiverId: 'USR-1154',
        receiverName: 'Kabir Mehta',
        recipient: '@kabirm',
        text: 'Why did you block me??',
        dateTime: '17 Jul 2026 • 03:15:44 PM',
        isRight: false
      },
      {
        id: 302,
        senderId: 'USR-1154',
        senderName: 'Kabir Mehta',
        sender: '@kabirm',
        receiverId: 'USR-7729',
        receiverName: 'Meera Iyer',
        recipient: '@meera_i',
        text: 'I need space, please respect that.',
        dateTime: '17 Jul 2026 • 03:18:12 PM',
        isRight: true
      },
      {
        id: 303,
        senderId: 'USR-7729',
        senderName: 'Meera Iyer',
        sender: '@meera_i',
        receiverId: 'USR-1154',
        receiverName: 'Kabir Mehta',
        recipient: '@kabirm',
        text: 'Fine, I will just make a new account.',
        dateTime: '17 Jul 2026 • 03:22:05 PM',
        isRight: false
      }
    ]
  },
  {
    id: 4,
    sender: '@fnoor',
    recipient: '@growthbot1',
    time: '3h',
    description: 'Reported: repeated spam messages',
    severity: 'Low',
    type: 'Spam',
    messages: [
      {
        id: 401,
        senderId: 'USR-6608',
        senderName: 'Fatima Noor',
        sender: '@fnoor',
        receiverId: 'USR-5520',
        receiverName: 'GrowthBot1',
        recipient: '@growthbot1',
        text: 'Follow for follow?? DM me!!',
        dateTime: '17 Jul 2026 • 02:05:11 PM',
        isRight: false
      },
      {
        id: 402,
        senderId: 'USR-5520',
        senderName: 'GrowthBot1',
        sender: '@growthbot1',
        receiverId: 'USR-6608',
        receiverName: 'Fatima Noor',
        recipient: '@fnoor',
        text: 'Not interested.',
        dateTime: '17 Jul 2026 • 02:07:33 PM',
        isRight: true
      },
      {
        id: 403,
        senderId: 'USR-6608',
        senderName: 'Fatima Noor',
        sender: '@fnoor',
        receiverId: 'USR-5520',
        receiverName: 'GrowthBot1',
        recipient: '@growthbot1',
        text: 'Special offer just for you 🔥',
        dateTime: '17 Jul 2026 • 02:10:48 PM',
        isRight: false
      }
    ]
  }
];

const INITIAL_SAFETY_RULES = [
  { id: 'rateLimiting', 
    title: 'Rate Limiting',
     desc: 'Limit the number of messages new accounts can send per minute.', 
     enabled: true },
  {
     id: 'restrictUnverified', 
     title: 'Restrict Unverified DMs', 
     desc: 'Block direct messages from unverified accounts to verified users.', 
     enabled: false },
  { 
    id: 'blockSuspiciousLinks',
     title: 'Block Suspicious Links',
      desc: 'Automatically detect and block malicious or phishing URLs.', 
      enabled: true },
  { 
    id: 'spamKeywordFilter', 
    title: 'Spam Keyword Filter',
     desc: 'Detect and filter messages containing spam keywords.',
      enabled: true },
  {
     id: 'duplicateDetection',
      title: 'Duplicate Message Detection',
       desc: 'Prevent users from repeatedly sending the same message.',
        enabled: true },
  {
     id: 'floodProtection', 
     title: 'Flood Protection', 
     desc: 'Temporarily limit messaging when too many messages are sent in a short time.',
      enabled: true },
  {
     id: 'maxMsgLength', 
     title: 'Maximum Message Length',
     desc: 'Restrict the maximum number of characters per message.', 
     enabled: true },
  { 
    id: 'fileUploadRestrictions', 
    title: 'File Upload Restrictions', 
    desc: 'Allow only approved file types and enforce maximum upload size.', 
    enabled: false },
  { 
    id: 'offensiveWordFilter',
    title: 'Offensive Word Filter',
     desc: 'Automatically detect and block abusive or inappropriate language.',
     enabled: true 
    },
  { 
    id: 'autoHideReported', 
    title: 'Auto Hide Reported Messages', 
    desc: 'Automatically hide messages that exceed the report threshold until reviewed.',
    enabled: true
   },
  {
     id: 'captchaNewAccounts',
      title: 'CAPTCHA for New Accounts', 
      desc: 'Require CAPTCHA verification before sending messages.', 
      enabled: false 
    },
  { 
    id: 'profanityDetection',
    title: 'Profanity Detection', 
    desc: 'Detect and filter offensive language in real time.', 
    enabled: true 
  },
  {
     id: 'linkPreviewProtection', 
     title: 'Link Preview Protection',
      desc: 'Scan URLs before generating previews to prevent malicious content.', 
      enabled: true 
    },
  { 
    id: 'mediaScanning', 
    title: 'Media Content Scanning', 
    desc: 'Scan uploaded images and files for unsafe or prohibited content.',
    enabled: true }
];

const MessageSafety = () => {
  const [activeTab, setActiveTab] = useState('reported');
  const [selectedId, setSelectedId] = useState(1);
  const [reports, setReports] = useState(INITIAL_REPORTS);

  const [toast, setToast] = useState(null);
  const [confirmModal, setConfirmModal] = useState(null);

  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newSender, setNewSender] = useState('');
  const [newRecipient, setNewRecipient] = useState('');
  const [newMessageText, setNewMessageText] = useState('');
  const [newCategory, setNewCategory] = useState('Spam');
  const [newSeverity, setNewSeverity] = useState('Medium');

  const handleAddUserSubmit = (e) => {
    e.preventDefault();
    if (!newSender.trim() || !newRecipient.trim() || !newMessageText.trim()) {
      showToast('Please fill in all required fields');
      return;
    }

    const formattedSender = newSender.startsWith('@') ? newSender.trim() : `@${newSender.trim()}`;
    const formattedRecipient = newRecipient.startsWith('@') ? newRecipient.trim() : `@${newRecipient.trim()}`;
    const newId = Date.now();

    const newReportObj = {
      id: newId,
      sender: formattedSender,
      recipient: formattedRecipient,
      time: '1m',
      description: `Reported: ${newMessageText.trim()}`,
      severity: newSeverity,
      type: newCategory,
      messages: [
        {
          id: newId + 1,
          senderId: 'USR-' + Math.floor(1000 + Math.random() * 9000),
          senderName: formattedSender.replace('@', ''),
          sender: formattedSender,
          receiverId: 'USR-' + Math.floor(1000 + Math.random() * 9000),
          receiverName: formattedRecipient.replace('@', ''),
          recipient: formattedRecipient,
          text: newMessageText.trim(),
          dateTime: formatDateTime(),
          isRight: false
        }
      ]
    };

    setReports((prev) => [newReportObj, ...prev]);
    setSelectedId(newId);
    setShowAddUserModal(false);

    setNewSender('');
    setNewRecipient('');
    setNewMessageText('');
    setNewCategory('Spam');
    setNewSeverity('Medium');

    showToast(`Added conversation for ${formattedSender}`);
  };

  const showToast = (message) => {
    setToast({ message, id: Date.now() });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const [blockedWords, setBlockedWords] = useState('crypto giveaway, easy money, dm for followers, bit.ly');
  const [linkScanning, setLinkScanning] = useState(true);

  const [safetyRules, setSafetyRules] = useState(INITIAL_SAFETY_RULES);

  const handleSendMessage = (text, activeReceiverObj) => {
    if (!text || !text.trim()) return;

    const nowFormatted = formatDateTime();
    const targetRec = activeReceiverObj || {
      id: 'USR-3301',
      name: 'Sofia Rodriguez',
      handle: '@sofia.r'
    };

    setReports((prevReports) =>
      prevReports.map((report) => {
        if (report.id === selectedId) {
          const firstMsg = report.messages[0] || {};
          const newMessage = {
            id: Date.now(),
            senderId: firstMsg.senderId || 'USR-4412',
            senderName: firstMsg.senderName || report.sender.replace('@', ''),
            sender: report.sender,
            receiverId: targetRec.id,
            receiverName: targetRec.name,
            recipient: targetRec.handle,
            text: text.trim(),
            dateTime: nowFormatted,
            isRight: false
          };
          return {
            ...report,
            recipient: targetRec.handle,
            messages: [...report.messages, newMessage]
          };
        }
        return report;
      })
    );
  };

  const handleOpenConfirmModal = (actionType, reportObj) => {
    setConfirmModal({
      actionType,
      report: reportObj || reports.find((r) => r.id === selectedId)
    });
  };

  const handleExecuteConfirmedAction = () => {
    if (!confirmModal) return;

    const { actionType, report } = confirmModal;

    if (actionType === 'Delete') {
      setReports((prev) => prev.filter((r) => r.id !== report.id));
      showToast(`Deleted conversation with ${report.sender}`);
      if (selectedId === report.id) {
        const remaining = reports.filter((r) => r.id !== report.id);
        if (remaining.length > 0) setSelectedId(remaining[0].id);
      }
    } else if (actionType === 'Restrict') {
      showToast(`Messaging restricted for ${report.sender}`);
    } else if (actionType === 'Ban') {
      showToast(`User ${report.sender} banned permanently`);
    } else if (actionType === 'Resolve') {
      showToast(`Report for ${report.sender} marked as resolved`);
    } else if (actionType === 'Block') {
      showToast(`User ${report.sender} blocked`);
    } else if (actionType === 'Clear') {
      setReports((prev) =>
        prev.map((r) => (r.id === report.id ? { ...r, messages: [] } : r))
      );
      showToast(`Cleared messages in conversation with ${report.sender}`);
    } else if (actionType === 'Report') {
      showToast(`Submitted report for user ${report.sender}`);
    }

    setConfirmModal(null);
  };

  const toggleSafetyRule = (ruleId) => {
    setSafetyRules((prev) =>
      prev.map((rule) =>
        rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule
      )
    );
    showToast('Updated security settings');
  };

  const activeReport = reports.find((r) => r.id === selectedId) || reports[0];

  return (
    <div className="message-safety-page-container">
      <MessageHeader />
      <div className="message-safety-content-wrapper flex-grow-1">
        {activeTab === 'reported' && (
          <div className="message-safety-main-card">
            <div className="message-safety-main-layout">
              <div className="message-safety-list-panel">
                <ConversationList
                  reports={reports}
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                  onOpenAddUser={() => setShowAddUserModal(true)}
                />
              </div>
              <div className="message-safety-window-panel">
                <ConversationWindow
                  report={activeReport}
                  onShowToast={showToast}
                  onSendMessage={handleSendMessage}
                  onOpenConfirmModal={handleOpenConfirmModal}
                  onSelectTab={setActiveTab}
                />
              </div>
            </div>
          </div>
        )}
        {activeTab === 'spam' && (
          <div className="message-safety-spam-card">
            <div className="message-safety-section">
              <label className="message-safety-label" htmlFor="message-safety-blocked-input">
                Blocked words / phrases
              </label>
              <textarea
                id="message-safety-blocked-input"
                className="message-safety-textarea"
                value={blockedWords}
                onChange={(e) => setBlockedWords(e.target.value)}
                rows={3}
              />
            </div>
            <div className="message-safety-row">
              <div className="message-safety-info">
                <h5 className="message-safety-row-title">Link scanning</h5>
                <p className="message-safety-row-desc">Scan shared links for known scam domains</p>
              </div>
              <label className="message-safety-toggle-switch" aria-label="Toggle link scanning">
                <input
                  type="checkbox"
                  checked={linkScanning}
                  onChange={(e) => setLinkScanning(e.target.checked)}
                  className="message-safety-toggle-input"
                />
                <span className="message-safety-toggle-slider"></span>
              </label>
            </div>
          </div>
        )}
        {activeTab === 'rules' && (
          <div className="d-flex flex-column gap-3">
            <div>
              <button
                className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center gap-2"
                onClick={() => setActiveTab('reported')}
                type="button"
              >
                <ArrowLeft size={16} />
                <span>Back to Conversation</span>
              </button>
            </div>
            <div className="message-safety-rules-card">
              {safetyRules.map((rule) => (
                <div key={rule.id} className="message-safety-row">
                  <div className="message-safety-info">
                    <h5 className="message-safety-row-title">{rule.title}</h5>
                    <p className="message-safety-row-desc">{rule.desc}</p>
                  </div>
                  <label className="message-safety-toggle-switch" aria-label={`Toggle ${rule.title}`}>
                    <input
                      type="checkbox"
                      checked={rule.enabled}
                      onChange={() => toggleSafetyRule(rule.id)}
                      className="message-safety-toggle-input"
                    />
                    <span className="message-safety-toggle-slider"></span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {confirmModal && (
        <div className="message-safety-modal-overlay">
          <div className="message-safety-modal-card">
            <div className="message-safety-modal-header d-flex justify-content-between align-items-center pb-2 border-bottom">
              <h5 className="message-safety-modal-title mb-0">
                Confirm {confirmModal.actionType} Action
              </h5>
              <button
                className="message-safety-modal-close"
                onClick={() => setConfirmModal(null)}
                type="button"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="message-safety-modal-body py-3">
              <p className="mb-1">
                Are you sure you want to <strong>{confirmModal.actionType.toLowerCase()}</strong> for{' '}
                <code>{confirmModal.report?.sender}</code>?
              </p>
              <small className="text-muted">This action will be logged in the audit trail.</small>
            </div>

            <div className="message-safety-modal-footer d-flex justify-content-end gap-2 pt-2 border-top">
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setConfirmModal(null)}
                type="button"
              >
                Cancel
              </button>
              <button
                className={`btn btn-sm ${confirmModal.actionType === 'Delete' || confirmModal.actionType === 'Ban' || confirmModal.actionType === 'Block' ? 'btn-danger' : 'btn-primary'}`}
                onClick={handleExecuteConfirmedAction}
                type="button"
              >
                Confirm {confirmModal.actionType}
              </button>
            </div>
          </div>
        </div>
      )}
      {showAddUserModal && (
        <div className="message-safety-modal-overlay">
          <div className="message-safety-modal-card" style={{ width: '460px', maxWidth: '90vw' }}>
            <div className="message-safety-modal-header d-flex justify-content-between align-items-center pb-2 border-bottom">
              <h5 className="message-safety-modal-title mb-0">Add New User Conversation</h5>
              <button
                className="message-safety-modal-close"
                onClick={() => setShowAddUserModal(false)}
                type="button"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddUserSubmit}>
              <div className="message-safety-modal-body py-3 d-flex flex-column gap-3">
                <div className="row g-2">
                  <div className="col-6">
                    <label className="form-label fs-7 fw-bold mb-1">Sender Handle</label>
                    <input
                      type="text"
                      className="form-control fs-7"
                      placeholder="e.g., @alex.m"
                      value={newSender}
                      onChange={(e) => setNewSender(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label fs-7 fw-bold mb-1">Recipient Handle</label>
                    <input
                      type="text"
                      className="form-control fs-7"
                      placeholder="e.g., @sofia.r"
                      value={newRecipient}
                      onChange={(e) => setNewRecipient(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="form-label fs-7 fw-bold mb-1">Initial Message</label>
                  <textarea
                    className="form-control fs-7"
                    rows={3}
                    placeholder="Enter reported message content..."
                    value={newMessageText}
                    onChange={(e) => setNewMessageText(e.target.value)}
                    required
                  />
                </div>
                <div className="row g-2">
                  <div className="col-6">
                    <label className="form-label fs-7 fw-bold mb-1">Category</label>
                    <select
                      className="form-select fs-7"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                    >
                      <option value="Spam">Spam</option>
                      <option value="Scam">Scam</option>
                      <option value="Threat">Threat</option>
                      <option value="Harassment">Harassment</option>
                      <option value="Phishing">Phishing</option>
                      <option value="Safe">Safe</option>
                    </select>
                  </div>

                  <div className="col-6">
                    <label className="form-label fs-7 fw-bold mb-1">Severity</label>
                    <select
                      className="form-select fs-7"
                      value={newSeverity}
                      onChange={(e) => setNewSeverity(e.target.value)}
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="message-safety-modal-footer d-flex justify-content-end gap-2 pt-2 border-top">
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => setShowAddUserModal(false)}
                  type="button"
                >
                  Cancel
                </button>
                <button className="btn btn-primary btn-sm px-3" type="submit">
                  Add Conversation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {toast && (
        <div className="message-safety-toast" key={toast.id}>
          <CheckCircle className="message-safety-toast-icon" size={16} />
          <span className="message-safety-toast-text">{toast.message}</span>
        </div>
      )}
    </div>
  );
};

export default MessageSafety;
