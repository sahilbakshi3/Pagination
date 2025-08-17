import React from 'react';
import { PAGINATION_CONSTANTS } from '../../utils/constants';

const ItemsPerPageSelector = ({ itemsPerPage, onItemsPerPageChange, className = '' }) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <label htmlFor="itemsPerPage" className="text-sm text-gray-700 whitespace-nowrap">
        Show:
      </label>
      <select
        id="itemsPerPage"
        value={itemsPerPage}
        onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
        className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {PAGINATION_CONSTANTS.PAGE_SIZE_OPTIONS.map(size => (
          <option key={size} value={size}>{size}</option>
        ))}
      </select>
      <span className="text-sm text-gray-700">entries</span>
    </div>
  );
};

export default ItemsPerPageSelector;