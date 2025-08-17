import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const UserTableHeader = ({ sortBy, sortOrder, onSort }) => {
  const SortIcon = ({ column }) => {
    if (sortBy !== column) return <ChevronUp className="opacity-30" size={16} />;
    return sortOrder === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
  };

  const columns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'createdAt', label: 'Created At', sortable: true }
  ];

  return (
    <thead className="bg-gray-50">
      <tr>
        {columns.map(column => (
          <th
            key={column.key}
            className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
              column.sortable ? 'cursor-pointer select-none hover:bg-gray-100' : ''
            }`}
            onClick={column.sortable ? () => onSort(column.key) : undefined}
          >
            <div className="flex items-center space-x-1">
              <span>{column.label}</span>
              {column.sortable && <SortIcon column={column.key} />}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default UserTableHeader;