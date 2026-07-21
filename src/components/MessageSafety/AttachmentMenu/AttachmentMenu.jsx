import React, { useState, useRef, useEffect } from 'react';
import { Paperclip} from 'lucide-react';
import { FileText} from 'lucide-react';
import { Image} from 'lucide-react';
import { Camera} from 'lucide-react';
import {Headphones} from 'lucide-react';
import {X} from 'lucide-react';
import {RotateCcw} from 'lucide-react';
import { Check,AlertCircle } from 'lucide-react';
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
      bg: '#e6f0ff' },
  { 
    id: 'camera', 
    title: 'Camera',
     icon: Camera,
      color: '#e91e63',
       bg: '#fce4ec' },
  {
     id: 'audio', 
     title: 'Audio', 
     icon: Headphones, 
     color: '#ff9800', 
     bg: '#fff3e0' }
];

const AttachmentMenu = ({ onSelectFile }) => {
  const [isOpen, setIsOpen] = useState(false);


  const [showCameraModal, setShowCameraModal] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);

  const menuRef = useRef(null);
  const docInputRef = useRef(null);
  const mediaInputRef = useRef(null);
  const audioInputRef = useRef(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const mediaStreamRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const stopCameraStream = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      stopCameraStream();
    };
  }, []);


  const handleOptionClick = (optionId) => {
    setIsOpen(false);

    if (optionId === 'document') {
      docInputRef.current?.click();
    } else if (optionId === 'photos') {
      mediaInputRef.current?.click();
    } else if (optionId === 'audio') {
      audioInputRef.current?.click();
    } else if (optionId === 'camera') {
      startCamera();
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

  const startCamera = async () => {
    setShowCameraModal(true);
    setCameraError(null);
    setCapturedPhoto(null);

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError('Camera access is not supported by your browser.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } } 
      });
      mediaStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Camera permission error:', err);
      setCameraError('Unable to access camera. Please allow camera permissions in your browser.');
    }
  };

  const handleCapturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
    setCapturedPhoto(dataUrl);
    stopCameraStream();
  };

  const handleConfirmPhoto = () => {
    if (capturedPhoto && onSelectFile) {
      onSelectFile({
        type: 'image',
        file: null,
        name: `camera_photo_${Date.now()}.jpg`,
        size: 'Captured Photo',
        previewUrl: capturedPhoto
      });
    }
    closeCameraModal();
  };

  const handleRetakePhoto = () => {
    setCapturedPhoto(null);
    startCamera();
  };

  const closeCameraModal = () => {
    stopCameraStream();
    setShowCameraModal(false);
    setCapturedPhoto(null);
    setCameraError(null);
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
      {showCameraModal && (
        <div className="attachment-menu-camera-modal-overlay">
          <div className="attachment-menu-camera-modal-card">
            <div className="attachment-menu-camera-header d-flex justify-content-between align-items-center p-3 border-bottom">
              <h5 className="mb-0 fw-bold fs-6">Take Photo</h5>
              <button
                className="btn-close"
                onClick={closeCameraModal}
                type="button"
                aria-label="Close"
              />
            </div>

            <div className="attachment-menu-camera-body position-relative d-flex align-items-center justify-content-center">
              {cameraError ? (
                <div className="p-4 text-center text-danger d-flex flex-column align-items-center gap-2">
                  <AlertCircle size={36} />
                  <p className="mb-0 fs-7">{cameraError}</p>
                </div>
              ) : capturedPhoto ? (
                <img 
                  src={capturedPhoto} 
                  alt="Captured Preview" 
                  className="attachment-menu-camera-preview-img w-100 h-100" 
                />
              ) : (
                <video 
                  ref={videoRef} autoPlay 
                  playsInline className="attachment-menu-camera-video w-100 h-100" />
              )}
              <canvas ref={canvasRef} className="d-none" />
            </div>

            <div className="attachment-menu-camera-footer p-3 d-flex justify-content-center gap-3 border-top">
              {!cameraError && !capturedPhoto && (
                <button
                  type="button"
                  className="btn btn-primary rounded-circle p-0 d-flex align-items-center justify-content-center shadow"
                  style={{ width: '54px', height: '54px' }}
                  onClick={handleCapturePhoto}
                  title="Capture Photo"
                >
                  <div style={{ width: '42px', height: '42px', borderRadius: '50%', border: '2px solid white' }} />
                </button>
              )}

              {capturedPhoto && (
                <>
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center gap-1 px-3"
                    onClick={handleRetakePhoto}
                  >
                    <RotateCcw size={16} />
                    <span>Retake</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm d-inline-flex align-items-center gap-1 px-4"
                    onClick={handleConfirmPhoto}
                  >
                    <Check size={16} />
                    <span>Attach Photo</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttachmentMenu;
