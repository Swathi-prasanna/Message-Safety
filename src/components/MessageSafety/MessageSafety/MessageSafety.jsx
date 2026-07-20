import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import MessageHeader from '../MessageHeader/MessageHeader';
import ConversationList from '../ConversationList/ConversationList';
import ConversationWindow from '../ConversationWindow/ConversationWindow';
import './MessageSafety.css';

const MessageSafety = () => {
  const [activeTab, setActiveTab] = useState('reported');
  const [selectedId, setSelectedId] = useState(1);

  const [toast, setToast] = useState(null);

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
      severity: 'Low',
      type: 'Spam',
      messages: [
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
      ]
    }
  ];

  const activeReport = reports.find(r => r.id === selectedId) || reports[0];

  return (
    <div className="message-safety-page-container">
      <MessageHeader />
      <div className="message-safety-content-wrapper flex-grow-1">
        <div className="message-safety-tabs">
          <button className={`message-safety-tab ${activeTab === 'reported' ? 'active' : ''}`}
            onClick={() => setActiveTab('reported')}type="button">
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
                <ConversationList reports={reports} selectedId={selectedId} 
                  onSelect={setSelectedId} />
              </div>
              <div className="message-safety-window-panel">
                <ConversationWindow report={activeReport} onShowToast={showToast} />
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
