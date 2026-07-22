import React, { useState, useRef, useEffect } from 'react';
import { Paperclip, Headphones } from 'lucide-react';
import { FileText } from 'lucide-react';
import { Image } from 'lucide-react';
import './AttachmentMenu.css';

const ATTACHMENT_OPTIONS = [
  { 
    id: 'document', 
    title: 'Document',
    icon: FileText, 
    color: '#7f56d9', 
    bg: '#f4ebff'
  },
  { 
    id: 'photos',
    title: 'Photos & Videos', 
    icon: Image,
    color: '#0066ff', 
    bg: '#e6f0ff' 
  },
  {
    id: 'audio', 
    title: 'Audio', 
    icon: Headphones, 
    color: '#ff9800', 
    bg: '#fff3e0' 
  }
];

const AttachmentMenu = ({ onSelectFile }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef(null);
  const docInputRef = useRef(null);
  const mediaInputRef = useRef(null);
  const audioInputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionClick = (optionId) => {
    setIsOpen(false);

    if (optionId === 'document') {
      docInputRef.current?.click();
    } else if (optionId === 'photos') {
      mediaInputRef.current?.click();
    } else if (optionId === 'audio') {
      audioInputRef.current?.click();
    }
  };

  const handleDocChange = (e) => {
    const file = e.target.files[0];
    if (file && onSelectFile) {
      onSelectFile({
        type: 'document',
        file: file,
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
        previewUrl: null
      });
    }
    e.target.value = '';
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file && onSelectFile) {
      const isVideo = file.type.startsWith('video/');
      const previewUrl = URL.createObjectURL(file);
      onSelectFile({
        type: isVideo ? 'video' : 'image',
        file: file,
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
        previewUrl: previewUrl
      });
    }
    e.target.value = '';
  };

  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    if (file && onSelectFile) {
      const previewUrl = URL.createObjectURL(file);
      onSelectFile({
        type: 'audio',
        file: file,
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
        previewUrl: previewUrl
      });
    }
    e.target.value = '';
  };

  return (
    <div className="attachment-menu-container position-relative" ref={menuRef}>
      <input ref={docInputRef}
        type="file" accept=".pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx,.zip"
        onChange={handleDocChange} className="d-none"/>
      <input ref={mediaInputRef} type="file"
        accept="image/*,video/*" onChange={handleMediaChange}
        className="d-none"/>
      <input ref={audioInputRef}
        type="file" accept="audio/*,.mp3,.wav,.m4a,.ogg"
        onChange={handleAudioChange} className="d-none"/>
      {isOpen && (
        <div className="attachment-menu-popup">
          <div className="attachment-menu-list d-flex flex-column">
            {ATTACHMENT_OPTIONS.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id} type="button"
                  className="attachment-menu-item d-flex align-items-center gap-3 w-100"
                  onClick={() => handleOptionClick(item.id)}>
                  <div 
                    className="attachment-menu-icon-circle d-flex align-items-center justify-content-center"
                    style={{ backgroundColor: item.bg, color: item.color }}>
                    <IconComponent size={20} />
                  </div>
                  <span className="attachment-menu-item-title">{item.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
      <button
        type="button"
        className={`attachment-menu-toggle-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)} title="Attach File">
        <Paperclip size={22} />
      </button>
    </div>
  );
};

export default AttachmentMenu;

