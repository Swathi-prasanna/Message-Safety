import React from 'react';
import SettingsSidebar from '../SettingsSidebar/SettingsSidebar';
import GeneralSettings from '../GeneralSettings/GeneralSettings';
import SecuritySettings from '../SecuritySettings/SecuritySettings';
import NotificationSettings from '../NotificationSettings/NotificationSettings';
import IntegrationSettings from '../IntegrationSettings/IntegrationSettings';
import './Settings.css';
const Settings = () => {
  return (
    <div className="d-flex flex-column h-100">
      <div className="topbar">
        <div className="page-title">Settings</div>
      </div>
      <div className="flex-grow-1 p-4 overflow-auto">
        <div className="d-flex gap-4">
          <div className="w-250">
            <SettingsSidebar />
          </div>
          <div className="flex-grow-1 d-flex flex-column gap-4">
            <GeneralSettings />
            <SecuritySettings />
            <NotificationSettings />
            <IntegrationSettings />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
