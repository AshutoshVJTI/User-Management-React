import React from 'react';
import DownloadCSV from './DownloadCSV';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {UserListHeaderProps} from '../types/@types';

const UserListHeader = (props: UserListHeaderProps) => {
  const {users, handleCreate} = props;
  return (
    <div>
      <div className="flex justify-between items-center px-7">
        <div>
          <div className="flex gap-4 items-center">
            <p className="text-xl font-bold">Users</p>
            <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900 h-fit">
              {users.length} users
            </span>
          </div>
          <p className="text-sm text-gray-500">
            Manage your team members and their account permissions here.
          </p>
        </div>
        <div className="flex gap-2">
          <DownloadCSV data={users} />
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 border border-blue-700 rounded text-sm h-fit"
            onClick={handleCreate}
          >
            <FontAwesomeIcon icon={faPlus} /> Add User
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserListHeader;
