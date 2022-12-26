import React from 'react';
import UserList from '../components/UserList';
import {NavigationTabs} from '../utils/navigation';

const Homepage = () => {
  return (
    <div>
      <p className="text-3xl my-6 font-semibold">Company Settings</p>
      <div className="Navigation rounded w-fit overflow-hidden shadow-lg">
        {NavigationTabs.map(tab => (
          <button
            id={tab.id}
            key={tab.id}
            className="px-4 py-2 bg-white hover:bg-gray-200 hover:font-semibold focus:bg-gray-200 border"
          >
            {tab.title}
          </button>
        ))}
      </div>
      <UserList />
    </div>
  );
};

export default Homepage;
