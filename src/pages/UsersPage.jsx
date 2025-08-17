import React from 'react';
import { usePagination } from '../hooks/usePagination';
import apiService from '../services/apiService';
import PageLayout from '../components/layout/PageLayout';
import UserTable from '../components/table/UserTable';
import Pagination from '../components/common/Pagination';
import ItemsPerPageSelector from '../components/common/ItemsPerPageSelector';

const UsersPage = () => {
  const {
    data: users,
    pagination,
    loading,
    error,
    sortBy,
    sortOrder,
    handlePageChange,
    handleItemsPerPageChange,
    handleSort,
    refetch
  } = usePagination(apiService.fetchUsers.bind(apiService));

  const getPaginationInfo = () => {
    if (users.length === 0) return "No users found";
    
    const startItem = ((pagination.currentPage - 1) * pagination.itemsPerPage) + 1;
    const endItem = Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems);
    
    return `Showing ${startItem} to ${endItem} of ${pagination.totalItems} users`;
  };

  return (
    <PageLayout title="Pagination example(using hardcoded data)">
      <div className="space-y-6">
        {/* Controls Bar */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-700">
            {getPaginationInfo()}
          </div>
          <ItemsPerPageSelector 
            itemsPerPage={pagination.itemsPerPage}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex justify-between items-center">
              <p className="text-red-800">{error}</p>
              <button 
                onClick={refetch}
                className="text-red-600 hover:text-red-800 underline text-sm font-medium"
              >
                Try again
              </button>
            </div>
          </div>
        )}

        {/* Users Table */}
        <UserTable 
          users={users}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSort={handleSort}
          loading={loading}
        />

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="text-sm text-gray-700">
            Page {pagination.currentPage} of {pagination.totalPages}
          </div>
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default UsersPage;