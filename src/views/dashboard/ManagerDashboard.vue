<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold text-gray-800 dark:text-white">
      Manager Dashboard
    </h1>

    <div v-if="isLoading" class="flex justify-center items-center h-64">
      <div class="flex flex-col items-center">
        <svg
          class="animate-spin h-10 w-10 text-primary dark:text-dark-primary mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <p class="text-gray-600 dark:text-gray-400">Loading dashboard data...</p>
      </div>
    </div>

    <div v-else>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ formatCurrency(totalRevenue) }}</p>
            </div>
            <div class="bg-primary/10 dark:bg-dark-primary/20 rounded-full p-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary dark:text-dark-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div class="mt-4 flex items-center">
            <span :class="[revenueChange >= 0 ? 'text-green-500' : 'text-red-500', 'text-sm font-medium flex items-center']">
              <svg v-if="revenueChange >= 0" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              {{ Math.abs(revenueChange).toFixed(1) }}% from last week
            </span>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Employees</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ employeeCount }}</p>
            </div>
            <div class="bg-blue-100 dark:bg-blue-900/30 rounded-full p-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <div class="mt-4">
            <router-link to="/employees" class="text-primary dark:text-dark-primary text-sm font-medium hover:underline">Manage employees</router-link>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Inventory Value</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ formatCurrency(inventoryValue) }}</p>
            </div>
            <div class="bg-green-100 dark:bg-green-900/30 rounded-full p-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>
          <div class="mt-4">
            <router-link to="/items" class="text-primary dark:text-dark-primary text-sm font-medium hover:underline">View inventory</router-link>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Low Stock Items</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ lowStockItems }}</p>
            </div>
            <div class="bg-yellow-100 dark:bg-yellow-900/30 rounded-full p-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
          <div class="mt-4">
            <router-link to="/logistics" class="text-primary dark:text-dark-primary text-sm font-medium hover:underline">Order inventory</router-link>
          </div>
        </div>
      </div>

      <div class="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div class="lg:col-span-3 bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Revenue Trends</h2>
          <div class="h-64 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <p class="text-gray-500 dark:text-gray-400">I'm sorry, we didn't have enough time to complete the chart :(</p>
          </div>
        </div>

        <div class="lg:col-span-2 bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 class="text-lg font-medium text-gray-900 dark:text-white">Recent Supply Orders</h2>
          </div>
          <div class="divide-y divide-gray-200 dark:divide-gray-700">
            <div v-if="recentLogistics.length === 0" class="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
              No recent logistics found
            </div>
            <div v-else v-for="logistic in recentLogistics" :key="logistic.id" class="p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
              <div class="flex justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-900 dark:text-white mb-1">
                    {{ logistic.supplier?.company_name || 'Unknown Supplier' }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    {{ formatDate(logistic.created_at) }}
                  </p>
                </div>
                <p class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ formatCurrency(logistic.final_price) }}
                </p>
              </div>
              <div class="mt-2 flex justify-between items-center">
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  {{ logistic.total_quantity }} items via {{ logistic.delivery_service }}
                </p>
                <router-link :to="`/logistics/${logistic.id}`" class="text-xs text-primary dark:text-dark-primary hover:underline">
                  View details
                </router-link>
              </div>
            </div>
          </div>
          <div class="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <router-link to="/logistics" class="text-primary dark:text-dark-primary text-sm font-medium hover:underline">
              View all supply orders
            </router-link>
          </div>
        </div>
      </div>

      <div class="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 class="text-lg font-medium text-gray-900 dark:text-white">Best Selling Products</h2>
          </div>
          <div class="p-6">
            <div v-if="topProducts.length === 0" class="text-center text-gray-500 dark:text-gray-400">
              No products data available
            </div>
            <ul v-else class="space-y-4">
              <li v-for="(product, index) in topProducts" :key="product.id" class="flex items-center">
                <span class="flex-shrink-0 w-8 text-sm font-bold text-gray-500 dark:text-gray-400">
                  #{{ index + 1 }}
                </span>
                <div class="flex-shrink-0 h-10 w-10 rounded-md overflow-hidden bg-gray-200 dark:bg-gray-700">
                  <img
                    v-if="product.picture"
                    :src="`https://pos-api.buahbibir.co.id/storage/${product.picture}`" 
                    :alt="product.name"
                    class="h-full w-full object-cover"
                  />
                  <div v-else class="h-full w-full flex items-center justify-center text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div class="ml-4 flex-grow">
                  <p class="text-sm font-medium text-gray-900 dark:text-white">{{ product.name }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">{{ formatCurrency(product.sell_price) }}</p>
                </div>
                <div class="text-right">
                  <p class="text-sm font-medium text-gray-900 dark:text-white">{{ product.sold || 0 }} sold</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">{{ formatCurrency(product.revenue || 0) }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 class="text-lg font-medium text-gray-900 dark:text-white">Top Customers</h2>
          </div>
          <div class="p-6">
            <div v-if="topCustomers.length === 0" class="text-center text-gray-500 dark:text-gray-400">
              No customer data available
            </div>
            <ul v-else class="space-y-4">
              <li v-for="(customer, index) in topCustomers" :key="customer.id" class="flex items-center">
                <span class="flex-shrink-0 w-8 text-sm font-bold text-gray-500 dark:text-gray-400">
                  #{{ index + 1 }}
                </span>
                <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400">
                  {{ getInitials(customer.first_name + ' ' + customer.last_name) }}
                </div>
                <div class="ml-4 flex-grow">
                  <p class="text-sm font-medium text-gray-900 dark:text-white">{{ customer.first_name }} {{ customer.last_name }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">{{ customer.email }}</p>
                </div>
                <div class="text-right">
                  <p class="text-sm font-medium text-gray-900 dark:text-white">{{ customer.purchases || 0 }} orders</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">{{ formatCurrency(customer.spent || 0) }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import apiService from "../../services/api";

const isLoading = ref(true);

const recentLogistics = ref([]);
const topProducts = ref([]);
const topCustomers = ref([]);

const totalRevenue = ref(0);
const revenueChange = ref(0);
const employeeCount = ref(0);
const inventoryValue = ref(0);
const lowStockItems = ref(0);

const formatCurrency = (value) => {
  if (value === null || value === undefined) return "Rp 0";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
};

const formatDate = (timestamp) => {
  if (!timestamp) return '';
  
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
};

const getInitials = (name) => {
  if (!name) return "";
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
};

const loadDashboardData = async () => {
  isLoading.value = true;
  
  try {
    const salesResponse = await apiService.getSales({ limit: 100 });
    if (salesResponse.data && salesResponse.data.data) {
      const sales = salesResponse.data.data.data;
      
      totalRevenue.value = sales.reduce((sum, sale) => sum + parseFloat(sale.final_price), 0);
      
      const today = new Date();
      const oneWeekAgo = new Date(today);
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const twoWeeksAgo = new Date(oneWeekAgo);
      twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 7);
      
      const thisWeekSales = sales.filter(sale => new Date(sale.created_at) >= oneWeekAgo);
      const lastWeekSales = sales.filter(sale => 
        new Date(sale.created_at) >= twoWeeksAgo && 
        new Date(sale.created_at) < oneWeekAgo
      );
      
      const thisWeekRevenue = thisWeekSales.reduce((sum, sale) => sum + parseFloat(sale.final_price), 0);
      const lastWeekRevenue = lastWeekSales.reduce((sum, sale) => sum + parseFloat(sale.final_price), 0);
      
      if (lastWeekRevenue > 0) {
        revenueChange.value = ((thisWeekRevenue - lastWeekRevenue) / lastWeekRevenue) * 100;
      } else {
        revenueChange.value = 100;
      }
      
      const productSales = {};
      const customerSales = {};
      
      sales.forEach(sale => {
        if (sale.customer_id) {
          if (!customerSales[sale.customer_id]) {
            customerSales[sale.customer_id] = {
              id: sale.customer_id,
              first_name: sale.customer?.first_name || 'Unknown',
              last_name: sale.customer?.last_name || '',
              email: sale.customer?.email || '',
              purchases: 0,
              spent: 0
            };
          }
          customerSales[sale.customer_id].purchases++;
          customerSales[sale.customer_id].spent += parseFloat(sale.final_price);
        }
        
        if (sale.sale_details && Array.isArray(sale.sale_details)) {
          sale.sale_details.forEach(detail => {
            if (!productSales[detail.item_id]) {
              productSales[detail.item_id] = {
                id: detail.item_id,
                name: detail.item?.name || 'Unknown Product',
                picture: detail.item?.picture || '',
                sell_price: detail.item?.sell_price || 0,
                sold: 0,
                revenue: 0
              };
            }
            productSales[detail.item_id].sold += parseInt(detail.quantity);
            productSales[detail.item_id].revenue += parseFloat(detail.final_price);
          });
        }
      });
      
      topProducts.value = Object.values(productSales)
        .sort((a, b) => b.sold - a.sold || b.revenue - a.revenue)
        .slice(0, 5);
      
      topCustomers.value = Object.values(customerSales)
        .sort((a, b) => b.spent - a.spent || b.purchases - a.purchases)
        .slice(0, 5);
    }
    
    const employeesResponse = await apiService.getUsers({ role: 1 });
    if (employeesResponse.data && employeesResponse.data.data) {
      employeeCount.value = employeesResponse.data.data.data.filter(user => 
        parseInt(user.role) === 1
      ).length;
    }
    
    const itemsResponse = await apiService.getItems({ limit: 100 });
    if (itemsResponse.data && itemsResponse.data.data) {
      const items = itemsResponse.data.data.data;
      
      inventoryValue.value = items.reduce((sum, item) => {
        return sum + (parseFloat(item.buy_price) * parseInt(item.quantity));
      }, 0);
      
      lowStockItems.value = items.filter(item => item.quantity <= 10).length;
    }
    
    const logisticsResponse = await apiService.getLogistics({ limit: 5 });
    if (logisticsResponse.data && logisticsResponse.data.data) {
      recentLogistics.value = logisticsResponse.data.data.data;
    }
    
  } catch (error) {
    console.error("Failed to load dashboard data:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadDashboardData();
});
</script>