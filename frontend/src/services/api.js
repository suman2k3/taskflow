import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  getUserByEmail: (email) => api.post('/auth/user-by-email', { email })
};

// Projects APIs
export const projectsAPI = {
  createProject: (data) => api.post('/projects', data),
  getProjects: () => api.get('/projects'),
  getProjectById: (id) => api.get(`/projects/${id}`),
  addMember: (projectId, memberId) => api.post(`/projects/${projectId}/members`, { memberId }),
  removeMember: (projectId, memberId) => api.delete(`/projects/${projectId}/members`, { data: { memberId } }),
  deleteProject: (projectId) => api.delete(`/projects/${projectId}`)
};

// Tasks APIs
export const tasksAPI = {
  createTask: (data) => api.post('/tasks', data),
  getTasksByProject: (projectId) => api.get(`/tasks/project/${projectId}`),
  updateTask: (taskId, data) => api.put(`/tasks/${taskId}`, data),
  deleteTask: (taskId) => api.delete(`/tasks/${taskId}`),
  getTaskStats: (projectId) => api.get(`/tasks/stats/${projectId}`)
};

export default api;
