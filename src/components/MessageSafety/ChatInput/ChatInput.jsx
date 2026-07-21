import React, { useState, useRef, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { Smile, Send, X} from 'lucide-react';
import { FileText } from 'lucide-react';
import {Music} from 'lucide-react';
import {Image as ImageIcon, Video as VideoIcon } from 'lucide-react';
import AttachmentMenu from '../AttachmentMenu/AttachmentMenu';
import './ChatInput.css';

const ChatInput = ({ onSendMessage, placeholder = "Type a message..." }) => {
  const [text, setText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

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

  const handleSelectFile = (fileObj) => {
    setSelectedFile(fileObj);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() && !selectedFile) return;

    let sendContent = text.trim();
    if (selectedFile) {
      if (selectedFile.type === 'document') {
        sendContent = `📄 [Document Attachment] ${selectedFile.name} (${selectedFile.size}) ${sendContent ? '- ' + sendContent : ''}`;
      } else if (selectedFile.type === 'audio') {
        sendContent = `🎵 [Audio Attachment] ${selectedFile.name} ${sendContent ? '- ' + sendContent : ''}`;
      } else if (selectedFile.type === 'image') {
        sendContent = `📷 [Photo Attachment] ${selectedFile.name} ${sendContent ? '- ' + sendContent : ''}`;
      } else if (selectedFile.type === 'video') {
        sendContent = `🎥 [Video Attachment] ${selectedFile.name} ${sendContent ? '- ' + sendContent : ''}`;
      }
    }

    if (onSendMessage) {
      onSendMessage(sendContent);
    }

    setText('');
    setSelectedFile(null);
    setShowEmojiPicker(false);
  };

  return (
    <div className="chat-input-wrapper position-relative p-3" ref={containerRef}>
      {showEmojiPicker && (
        <div className="chat-input-emoji-picker-popup">
          <EmojiPicker
            onEmojiClick={handleEmojiClick} autoFocusSearch={false}
            width={340} height={400} previewConfig={{ showPreview: false }} />
        </div>
      )}
      {selectedFile && (
        <div className="chat-input-preview-bar d-flex align-items-center justify-content-between p-2 mb-2 rounded border background-surface-offset">
          <div className="d-flex align-items-center gap-3 overflow-hidden">
            {selectedFile.type === 'document' && (
              <div className="chat-input-file-badge p-2 rounded background-primary-highlight text-primary">
                <FileText size={22} />
              </div>
            )}

            {selectedFile.type === 'image' && (
              <img
                src={selectedFile.previewUrl}
                alt="Image Preview"
                className="chat-input-preview-thumbnail rounded border"/>
            )}

            {selectedFile.type === 'video' && (
              <video
                src={selectedFile.previewUrl}
                className="chat-input-preview-thumbnail rounded border"
              />
            )}

            {selectedFile.type === 'audio' && (
              <div className="d-flex align-items-center gap-2">
                <div className="p-2 rounded bg-warning text-dark">
                  <Music size={20} />
                </div>
                <audio controls src={selectedFile.previewUrl} className="chat-input-audio-player" />
              </div>
            )}

            <div className="text-truncate">
              <div className="fw-bold fs-7 text-truncate mb-0">{selectedFile.name}</div>
              <small className="text-muted fs-8">{selectedFile.size}</small>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-sm btn-link text-muted p-1"
            onClick={() => setSelectedFile(null)} title="Remove attachment">
            <X size={18} />
          </button>
        </div>
      )}
      <form onSubmit={handleFormSubmit} className="chat-input-form d-flex align-items-center gap-2">
        <button
          type="button"
          className={`chat-input-icon-btn ${showEmojiPicker ? 'active' : ''}`}
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          title="Add Emoji">
          <Smile size={22} />
        </button>
        <AttachmentMenu onSelectFile={handleSelectFile} />
        <input ref={inputRef} type="text"
          className="form-control chat-input-text-field shadow-none flex-grow-1"
          placeholder={placeholder} value={text} onChange={(e) => setText(e.target.value)}/>
        <button
          type="submit"
          className="chat-input-send-btn d-flex align-items-center justify-content-center"title="Send Message">
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
