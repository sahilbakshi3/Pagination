import { USER_ROLES } from '../utils/constants';

class ApiService {
  // Simulate API delay
  async delay(ms = 500) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Generate mock user data
  generateMockUser(id) {
    const roles = Object.values(USER_ROLES);
    return {
      id,
      name: `User ${id}`,
      email: `user${id}@example.com`,
      role: roles[Math.floor(Math.random() * roles.length)],
      createdAt: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
      status: Math.random() > 0.3 ? 'Active' : 'Inactive'
    };
  }

  async fetchUsers(page = 1, limit = 10, sortBy = 'id', sortOrder = 'asc') {
    await this.delay();

    const totalUsers = 150;
    const startIndex = (page - 1) * limit;
    const endIndex = Math.min(startIndex + limit, totalUsers);

    const users = [];
    for (let i = startIndex; i < endIndex; i++) {
      users.push(this.generateMockUser(i + 1));
    }

    // Simple sorting simulation
    users.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return {
      data: users,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalUsers / limit),
        totalItems: totalUsers,
        itemsPerPage: limit,
        hasNext: page < Math.ceil(totalUsers / limit),
        hasPrev: page > 1
      }
    };
  }
}

export default new ApiService();