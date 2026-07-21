import React, { useState, useRef, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { Smile, Paperclip, Send } from 'lucide-react';
import './ChatInput.css';

const ChatInput = ({ onSendMessage, placeholder = "Type a message..." }) => {
  const [text, setText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const containerRef = useRef(null);
  const inputRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleEmojiClick = (emojiData) => {
    const emoji = emojiData.emoji;
    const input = inputRef.current;
    if (input) {
      const start = input.selectionStart || text.length;
      const end = input.selectionEnd || text.length;
      const newText = text.substring(0, start) + emoji + text.substring(end);
      setText(newText);

      setTimeout(() => {
        input.focus();
        input.setSelectionRange(start + emoji.length, start + emoji.length);
      }, 0);
    } else {
      setText((prev) => prev + emoji);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    if (onSendMessage) {
      onSendMessage(text.trim());
    }
    setText('');
    setShowEmojiPicker(false);
  };

  return (
    <div className="chat-input-wrapper position-relative p-3" ref={containerRef}>
      {showEmojiPicker && (
        <div className="chat-input-emoji-picker-popup">
          <EmojiPicker onEmojiClick={handleEmojiClick} autoFocusSearch={false}
            width={340} height={400}previewConfig={{ showPreview: false }}/>
        </div>
      )}
      <form onSubmit={handleFormSubmit} className="chat-input-form d-flex align-items-center gap-2">
        <button type="button" className={`chat-input-icon-btn ${showEmojiPicker ? 'active' : ''}`}
          onClick={() => setShowEmojiPicker(!showEmojiPicker)} title="Add Emoji">
          <Smile size={22} />
        </button>
        <button type="button" className="chat-input-icon-btn"
          title="Attach File">
          <Paperclip size={22} />
        </button>

        <input ref={inputRef} type="text"
          className="form-control chat-input-text-field shadow-none flex-grow-1"
          placeholder={placeholder} value={text} onChange={(e) => setText(e.target.value)}/>
        <button
          type="submit"
          className="chat-input-send-btn d-flex align-items-center justify-content-center"
          title="Send Message">
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
