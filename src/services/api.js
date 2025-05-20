import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://pos-api.buahbibir.co.id/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: false,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const isLoginRequest = error.config?.url?.endsWith("/login");
      const errorMessage = error.response.data?.message || "";
      const isLoginFailure =
        errorMessage.includes("Invalid credentials") ||
        errorMessage.includes("login") ||
        errorMessage.includes("password");

      if (isLoginRequest || isLoginFailure) {
        return Promise.reject(error);
      }

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default {
  login(credentials) {
    return apiClient.post("/login", credentials);
  },
  logout() {
    return apiClient.post("/logout");
  },

  getUsers(params = {}) {
    return apiClient.get("/users", { params });
  },
  getCustomers(params = {}) {
    return apiClient.get("/users", {
      params: {
        ...params,
        role: "customer",
      },
    });
  },
  createCustomer(customerData) {
    return apiClient.post("/users", customerData);
  },
  updateCustomer(id, customerData) {
    return apiClient.patch(`/users/${id}`, customerData);
  },

  getItems(params = {}) {
    return apiClient.get("/items", { params });
  },
  createItem(itemData) {
    return apiClient.post("/items", itemData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  updateItem(id, itemData) {
    return apiClient.post(`/items/${id}?_method=PUT`, itemData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  deleteItem(id) {
    return apiClient.delete(`/items/${id}`);
  },

  getCategories(params = {}) {
    return apiClient.get("/categories", { params });
  },
  getCategory(id) {
    return apiClient.get(`/categories/${id}`);
  },
  createCategory(categoryData) {
    return apiClient.post("/categories", categoryData);
  },
  updateCategory(id, categoryData) {
    return apiClient.put(`/categories/${id}`, categoryData);
  },
  deleteCategory(id) {
    return apiClient.delete(`/categories/${id}`);
  },

  getPaymentMethods() {
    return apiClient.get("/payments");
  },
  createPaymentMethod(paymentData) {
    return apiClient.post("/payments", paymentData);
  },
  updatePaymentMethod(id, paymentData) {
    return apiClient.put(`/payments/${id}`, paymentData);
  },
  deletePaymentMethod(id) {
    return apiClient.delete(`/payments/${id}`);
  },

  getSales(params = {}) {
    return apiClient.get("/sales", { params });
  },
  getSale(id) {
    return apiClient.get(`/sales/${id}`);
  },
  createSale(saleData) {
    return apiClient.post("/sales", saleData);
  },

  getUsers(params = {}) {
    return apiClient.get("/users", { params });
  },
  createUser(userData) {
    return apiClient.post("/users", userData);
  },
  updateUser(id, userData) {
    return apiClient.put(`/users/${id}`, userData);
  },
  deleteUser(id) {
    return apiClient.delete(`/users/${id}`);
  },
};
