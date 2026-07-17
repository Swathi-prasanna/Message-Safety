import React from 'react';
import RolesHeader from '../RolesHeader/RolesHeader';
import RolesList from '../RolesList/RolesList';
import RoleDetails from '../RoleDetails/RoleDetails';
import PermissionMatrix from '../PermissionMatrix/PermissionMatrix';
import './RolesPermissions.css';
const RolesPermissions = () => {
  return (
    <div className="d-flex flex-column h-100">
      <RolesHeader />
      <div className="flex-grow-1 p-4 overflow-auto">
        <div className="d-flex gap-4">
          <div className="w-350">
            <RolesList />
          </div>
          <div className="flex-grow-1 d-flex flex-column gap-4">
            <RoleDetails />
            <PermissionMatrix />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RolesPermissions;
