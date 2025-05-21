import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import DashboardLayout from "../layouts/DashboardLayout.vue";

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/dashboard",
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    // meta: { title: 'Login' }
  },
  {
    path: '/dashboard',
    component: DashboardLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('../views/dashboard/DashboardView.vue'),
        meta: { title: 'Dashboard' }
      },
      {
        path: 'items',
        name: 'item-management',
        component: () => import('../views/dashboard/ItemsView.vue'),
        meta: { title: 'Item Management' }
      },
      {
        path: 'suppliers',
        name: 'supplier-management',
        component: () => import('../views/dashboard/SuppliersView.vue'),
        meta: { title: 'Supplier Management' }
      },
      {
        path: 'employees',
        name: 'employee-management',
        component: () => import('../views/dashboard/EmployeesView.vue'),
        meta: { title: 'Employee Management' }
      },
      {
        path: 'sales',
        name: 'sales-management',
        component: () => import('../views/dashboard/SalesView.vue'),
        meta: { title: 'Sales Management' }
      },
      {
        path: 'configuration',
        name: 'configuration',
        component: () => import('../views/dashboard/ConfigurationView.vue'),
        meta: { title: 'Configuration' }
      },
      {
        path: 'customers',
        name: 'customer-management',
        component: () => import('../views/dashboard/CustomersView.vue'),
        meta: { title: 'Customer Management' }
      },
      {
        path: 'logistics',
        name: 'logistics-management',
        component: () => import('../views/dashboard/LogisticsView.vue'),
        meta: { title: 'Logistics Management' }
      }
      // {
      //   path: 'profile',
      //   name: 'user-profile',
      //   component: () => import('../views/dashboard/ProfileView.vue'),
      //   meta: { title: 'My Profile' }
      // },
      // {
      //   path: 'pos',
      //   name: 'point-of-sale',
      //   component: () => import('../views/dashboard/POSView.vue'),
      //   meta: { title: 'Point of Sale', role: 0 }
      // },
      // {
      //   path: 'products',
      //   name: 'product-management',
      //   component: () => import('../views/dashboard/ProductsView.vue'),
      //   meta: { title: 'Product Management', role: 1 }
      // }
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
