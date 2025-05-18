import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import DashboardLayout from "../layouts/DashboardLayout.vue";

const routes = [
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
