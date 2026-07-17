import React from 'react';
import ModerationHeader from '../ModerationHeader/ModerationHeader';
import ModerationQueue from '../ModerationQueue/ModerationQueue';
import ReviewPanel from '../ReviewPanel/ReviewPanel';
import ContentPreview from '../ContentPreview/ContentPreview';
import ActionDialog from '../ActionDialog/ActionDialog';
import Appeals from '../Appeals/Appeals';
import UserHistory from '../UserHistory/UserHistory';

import './ContentModeration.css';
const ContentModeration = () => {
  return (
    <div className="d-flex flex-column h-100">
      <ModerationHeader />
      <div className="flex-grow-1 p-4 overflow-auto">
        <div className="hero-panel">
          <div className="hero-box glass-card">
            <div className="hero-title">Content moderation command center</div>
            <div className="hero-copy">Review high-risk content faster with clear queue ownership, model confidence context, and a clean reviewer workspace.</div>
          </div>
        </div>
        
        <ModerationQueue />
        
        {/* Placeholders for other moderation components */}
        <div className="d-none">
          <ReviewPanel />
          <ContentPreview />
          <ActionDialog />
          <Appeals />
          <UserHistory />
        </div>
      </div>
    </div>
  );
};

export default ContentModeration;
