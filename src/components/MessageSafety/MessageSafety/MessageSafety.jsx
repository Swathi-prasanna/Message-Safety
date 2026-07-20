import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
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

const MessageSafety = () => {
  const [activeTab, setActiveTab] = useState('reported');
  const [selectedId, setSelectedId] = useState(1);
  const [reports, setReports] = useState(INITIAL_REPORTS);

  const [toast, setToast] = useState(null);
  const [triggerOpenModal, setTriggerOpenModal] = useState(false);

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
  const [rateLimiting, setRateLimiting] = useState(true);
  const [restrictDMs, setRestrictDMs] = useState(false);

<<<<<<< HEAD
  const reports = [
    {
      id: 1,
      sender: '@weiz',
      recipient: '@spammer99',
      time: '10m',
      description: 'Reported: scam link shared in DM',
      severity: 'Medium',
      type: 'Scam',
      messages: [
        { id: 101, 
          sender: '@weiz', 
          text: 'Hey! Check this out, easy money 💰 bit.ly/xyz123', 
          isRight: false 
        },
        { id: 102, 
          sender: '@spammer99',
           text: 'Not interested, please stop messaging me.', 
           isRight: true 
          },
        { 
          id: 103,
           sender: '@weiz', 
           text: 'Come on, everyone doing it. Last chance!',
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
          sender: '@priya.n', 
          text: 'You will regret ignoring me.',
           isRight: false 
          },
        { 
          id: 202,
           sender: '@sofia.r',
           text: 'Please stop, I am blocking you.', 
           isRight: true 
          },
        { 
          id: 203, 
          sender: '@priya.n',
           text: 'This is not over.',
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
        { id: 301,
           sender: '@meera_i',
            text: 'Why did you block me??', 
            isRight: false },
        { id: 302,
          sender: '@kabirm', 
          text: 'I need space, please respect that.', 
          isRight: true
         },
        { id: 303, 
          sender: '@meera_i',
           text: 'Fine, I will just make a new account.', 
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
=======
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
    setTimeout(() => {
      const responseDateTime = formatDateTime();
      const sampleResponses = [
        "I have received your message. Thank you for reaching out.",
        "Please stop contacting me regarding this.",
        "Understood. I am looking into this matter now.",
        "I will get back to you as soon as possible.",
        "Thank you for the update. Duly noted."
      ];
      const replyText = sampleResponses[Math.floor(Math.random() * sampleResponses.length)];

      setReports((prevReports) =>
        prevReports.map((report) => {
          if (report.id === selectedId) {
            const firstMsg = report.messages[0] || {};
            const receiverReply = {
              id: Date.now() + 1,
              senderId: targetRec.id,
              senderName: targetRec.name,
              sender: targetRec.handle,
              receiverId: firstMsg.senderId || 'USR-4412',
              receiverName: firstMsg.senderName || report.sender.replace('@', ''),
              recipient: report.sender,
              text: replyText,
              dateTime: responseDateTime,
              isRight: true
            };
            return {
              ...report,
              messages: [...report.messages, receiverReply]
            };
          }
          return report;
        })
      );
    }, 1000);
  };

  const handleAddNewReport = (newRec) => {
    const newReportId = Date.now();
    const nowFormatted = formatDateTime();

    const newReport = {
      id: newReportId,
      sender: '@admin',
      recipient: newRec.handle,
      time: 'Just now',
      description: `Direct message thread with ${newRec.name}`,
>>>>>>> a6444eb (chat)
      severity: 'Low',
      type: 'Direct',
      messages: [
<<<<<<< HEAD
        { id: 401,
           sender: '@fnoor', 
           text: 'Follow for follow?? DM me!!',
            isRight: false 
          },
        { id: 402, 
          sender: '@growthbot1', 
          text: 'Not interested.', 
          isRight: true },
        {
           id: 403, 
          sender: '@fnoor',
           text: 'Special offer just for you 🔥', 
           isRight: false }
=======
        {
          id: Date.now() + 1,
          senderId: 'USR-0001',
          senderName: 'Admin',
          sender: '@admin',
          receiverId: newRec.id,
          receiverName: newRec.name,
          recipient: newRec.handle,
          text: `Conversation initialized with ${newRec.name} (${newRec.handle})`,
          dateTime: nowFormatted,
          isRight: false
        }
>>>>>>> a6444eb (chat)
      ]
    };

    setReports((prev) => [newReport, ...prev]);
    setSelectedId(newReportId);
    showToast(`Created new chat with ${newRec.handle}`);
  };

  const handleOpenAddUserModal = () => {
    setTriggerOpenModal(true);
  };

  const activeReport = reports.find(r => r.id === selectedId) || reports[0];

  return (
    <div className="message-safety-page-container">
      <MessageHeader />
      <div className="message-safety-content-wrapper flex-grow-1">
        <div className="message-safety-tabs">
          <button className={`message-safety-tab ${activeTab === 'reported' ? 'active' : ''}`}
<<<<<<< HEAD
            onClick={() => setActiveTab('reported')}type="button">
=======
            onClick={() => setActiveTab('reported')} type="button">
>>>>>>> a6444eb (chat)
            Reported Messages
          </button>
          <button className={`message-safety-tab ${activeTab === 'spam' ? 'active' : ''}`}
            onClick={() => setActiveTab('spam')} type="button">
            Spam Manager
          </button>
          <button 
            className={`message-safety-tab ${activeTab === 'rules' ? 'active' : ''}`}
            onClick={() => setActiveTab('rules')} type="button">
            Safety Rules
          </button>
        </div>

        {activeTab === 'reported' && (
          <div className="message-safety-main-card">
            <div className="message-safety-main-layout">
              <div className="message-safety-list-panel">
<<<<<<< HEAD
                <ConversationList reports={reports} selectedId={selectedId} 
                  onSelect={setSelectedId} />
=======
                <ConversationList 
                  reports={reports} 
                  selectedId={selectedId} 
                  onSelect={setSelectedId} 
                  onOpenAddUserModal={handleOpenAddUserModal}
                />
>>>>>>> a6444eb (chat)
              </div>
              <div className="message-safety-window-panel">
                <ConversationWindow 
                  report={activeReport} 
                  onShowToast={showToast} 
                  onSendMessage={handleSendMessage}
                  onAddNewReport={handleAddNewReport}
                  triggerOpenAddModal={triggerOpenModal}
                  onResetTriggerModal={() => setTriggerOpenModal(false)}
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
              <textarea id="message-safety-blocked-input" className="message-safety-textarea"
                value={blockedWords} onChange={(e) => setBlockedWords(e.target.value)}
                rows={3}/>
            </div>
            
            <div className="message-safety-row">
              <div className="message-safety-info">
                <h5 className="message-safety-row-title">Link scanning</h5>
                <p className="message-safety-row-desc">Scan shared links for known scam domains</p>
              </div>
              <label className="message-safety-toggle-switch" aria-label="Toggle link scanning">
                <input type="checkbox" checked={linkScanning} onChange={(e) => setLinkScanning(e.target.checked)} 
                  className="message-safety-toggle-input" />
                <span className="message-safety-toggle-slider"></span>
              </label>
            </div>
          </div>
        )}

        {activeTab === 'rules' && (
          <div className="message-safety-rules-card">
            <div className="message-safety-row">
              <div className="message-safety-info">
                <h5 className="message-safety-row-title">Rate limiting</h5>
                <p className="message-safety-row-desc">Limit messages per minute for new accounts</p>
              </div>
              <label className="message-safety-toggle-switch" aria-label="Toggle rate limiting">
                <input type="checkbox" checked={rateLimiting} onChange={(e) => setRateLimiting(e.target.checked)} 
                  className="message-safety-toggle-input" />
                <span className="message-safety-toggle-slider"></span>
              </label>
            </div>

            <div className="message-safety-row">
              <div className="message-safety-info">
                <h5 className="message-safety-row-title">Restrict unverified DMs</h5>
                <p className="message-safety-row-desc">Block messages from unverified accounts to verified users by default</p>
              </div>
              <label className="message-safety-toggle-switch" aria-label="Toggle restrict unverified DMs">
                <input type="checkbox" checked={restrictDMs} onChange={(e) => setRestrictDMs(e.target.checked)} 
                  className="message-safety-toggle-input" />
                <span className="message-safety-toggle-slider"></span>
              </label>
            </div>
          </div>
        )}
      </div>
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
