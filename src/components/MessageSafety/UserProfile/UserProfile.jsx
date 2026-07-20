import React from 'react';
import { UserX} from 'lucide-react';
import { Trash2 } from 'lucide-react';

import './UserProfile.css';

const UserProfile = ({ onBlockSender, onDeleteReport }) => {
  return (
    <div className="user-profile-actions">
      <button  className="user-profile-btn" aria-label="Block sender" title="Block sender"
        type="button" onClick={onBlockSender}>
        <UserX size={18} />
      </button>
      <button className="user-profile-btn" aria-label="Delete message"
        title="Delete message" type="button" onClick={onDeleteReport}>
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default UserProfile;
