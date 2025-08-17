import React from 'react';
import UserTableHeader from './UserTableHeader';
import UserTableRow from './UserTableRow';

const UserTable = ({ users, sortBy, sortOrder, onSort, loading }) => {
  if (loading) {
    return (
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-500">Loading users...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <UserTableHeader 
            sortBy={sortBy} 
            sortOrder={sortOrder} 
            onSort={onSort} 
          />
          <tbody className="divide-y divide-gray-200">
            {users.length > 0 ? (
              users.map((user, index) => (
                <UserTableRow 
                  key={user.id} 
                  user={user} 
                  index={index}
                />
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;