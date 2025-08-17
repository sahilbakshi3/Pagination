import { useState, useEffect, useCallback } from 'react';
import { PAGINATION_CONSTANTS } from '../utils/constants';

export const usePagination = (fetchFunction, dependencies = []) => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: PAGINATION_CONSTANTS.DEFAULT_PAGE_SIZE,
    hasNext: false,
    hasPrev: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');

  const fetchData = useCallback(async (page = 1, limit = pagination.itemsPerPage) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetchFunction(page, limit, sortBy, sortOrder);
      
      setData(response.data);
      setPagination(response.pagination);
    } catch (err) {
      setError('Failed to fetch data. Please try again.');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  }, [fetchFunction, sortBy, sortOrder, ...dependencies]);

  const handlePageChange = useCallback((newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchData(newPage, pagination.itemsPerPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [fetchData, pagination.totalPages, pagination.itemsPerPage]);

  const handleItemsPerPageChange = useCallback((newItemsPerPage) => {
    fetchData(1, newItemsPerPage);
  }, [fetchData]);

  const handleSort = useCallback((column) => {
    const newSortOrder = sortBy === column && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortBy(column);
    setSortOrder(newSortOrder);
  }, [sortBy, sortOrder]);

  useEffect(() => {
    fetchData(pagination.currentPage, pagination.itemsPerPage);
  }, [sortBy, sortOrder]);

  return {
    data,
    pagination,
    loading,
    error,
    sortBy,
    sortOrder,
    handlePageChange,
    handleItemsPerPageChange,
    handleSort,
    refetch: () => fetchData(pagination.currentPage, pagination.itemsPerPage)
  };
};