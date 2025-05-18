import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://pos-api.buahbibir.co.id/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const isLoginRequest = error.config && 
                           error.config.url && 
                           error.config.url.endsWith('/login');
      
      const errorMessage = error.response.data?.message || '';
      const isLoginFailure = errorMessage.includes('Invalid credentials') || 
                           errorMessage.includes('login') || 
                           errorMessage.includes('password');
      
      if (isLoginRequest || isLoginFailure) {
        return Promise.reject(error);
      }
      
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default {
  login(credentials) {
    return apiClient.post('/login', credentials);
  },
  logout() {
    return apiClient.post('/logout');
  },
  
  getUsers(page = 1) {
    return apiClient.get('/users', { params: { page } });
  },
//   getUser(id) {
//     return apiClient.get(`/users/${id}`);
//   },
//   createUser(userData) {
//     return apiClient.post('/users', userData);
//   },
//   updateUser(id, userData) {
//     return apiClient.put(`/users/${id}`, userData);
//   },
//   deleteUser(id) {
//     return apiClient.delete(`/users/${id}`);
//   },
  
//   getItems(page = 1) {
//     return apiClient.get('/items', { params: { page } });
//   },
//   getItem(id) {
//     return apiClient.get(`/items/${id}`);
//   },
//   createItem(itemData) {
//     return apiClient.post('/items', itemData);
//   },
//   updateItem(id, itemData) {
//     return apiClient.put(`/items/${id}`, itemData);
//   },
//   deleteItem(id) {
//     return apiClient.delete(`/items/${id}`);
//   },

//   getSuppliers(page = 1) {
//     return apiClient.get('/suppliers', { params: { page } });
//   },
//   getSupplier(id) {
//     return apiClient.get(`/suppliers/${id}`);
//   },
//   createSupplier(supplierData) {
//     return apiClient.post('/suppliers', supplierData);
//   },
//   updateSupplier(id, supplierData) {
//     return apiClient.put(`/suppliers/${id}`, supplierData);
//   },
//   deleteSupplier(id) {
//     return apiClient.delete(`/suppliers/${id}`);
//   },
};