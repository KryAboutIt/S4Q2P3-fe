<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold text-gray-800 dark:text-white">
      Cashier Dashboard
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
        <p class="text-gray-600 dark:text-gray-400">
          Loading dashboard data...
        </p>
      </div>
    </div>

    <div v-else>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
                Today's Sales
              </p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">
                {{ formatCurrency(todaySales) }}
              </p>
            </div>
            <div class="bg-primary/10 dark:bg-dark-primary/20 rounded-full p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-primary dark:text-dark-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <div class="mt-4 flex items-center">
            <span
              :class="[
                todaySalesChange >= 0 ? 'text-green-500' : 'text-red-500',
                'text-sm font-medium flex items-center',
              ]"
            >
              <svg
                v-if="todaySalesChange >= 0"
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
              {{ Math.abs(todaySalesChange).toFixed(1) }}% from yesterday
            </span>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
                Transactions
              </p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">
                {{ todayTransactions }}
              </p>
            </div>
            <div class="bg-blue-100 dark:bg-blue-900/30 rounded-full p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-blue-600 dark:text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            </div>
          </div>
          <div class="mt-4 flex items-center">
            <span
              :class="[
                todayTransactionsChange >= 0
                  ? 'text-green-500'
                  : 'text-red-500',
                'text-sm font-medium flex items-center',
              ]"
            >
              <svg
                v-if="todayTransactionsChange >= 0"
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
              {{ Math.abs(todayTransactionsChange).toFixed(1) }}% from yesterday
            </span>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
                Low Stock Items
              </p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">
                {{ lowStockItems }}
              </p>
            </div>
            <div class="bg-yellow-100 dark:bg-yellow-900/30 rounded-full p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-yellow-600 dark:text-yellow-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
          </div>
          <div class="mt-4">
            <router-link
              to="/items"
              class="text-primary dark:text-dark-primary text-sm font-medium hover:underline"
              >View inventory</router-link
            >
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
                Categories
              </p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">
                {{ categories.length }}
              </p>
            </div>
            <div class="bg-green-100 dark:bg-green-900/30 rounded-full p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-green-600 dark:text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
            </div>
          </div>
          <div class="mt-4">
            <router-link
              to="/categories"
              class="text-primary dark:text-dark-primary text-sm font-medium hover:underline"
              >Explore categories</router-link
            >
          </div>
        </div>
      </div>

      <div class="mt-8">
        <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Recent Sales
        </h2>
        <div
          class="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden"
        >
          <div
            v-if="recentSales.length === 0"
            class="p-6 text-center text-gray-500 dark:text-gray-400"
          >
            No recent sales found
          </div>
          <table
            v-else
            class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
          >
            <thead class="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  ID
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Customer
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Items
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Total
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Time
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody
              class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700"
            >
              <tr
                v-for="sale in recentSales"
                :key="sale.id"
                class="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white"
                >
                  #{{ sale.id }}
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
                >
                  {{ sale.customer?.first_name || "Walk-in" }}
                  {{ sale.customer?.last_name || "" }}
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
                >
                  {{ sale.sale_details?.length || 0 }} items
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white"
                >
                  {{ formatCurrency(sale.final_price) }}
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
                >
                  {{ formatTime(sale.created_at) }}
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                >
                  <router-link
                    :to="`/sales/${sale.id}`"
                    class="text-primary dark:text-dark-primary hover:text-primary-hover dark:hover:text-dark-primary-hover"
                  >
                    View
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
          <div
            class="bg-white dark:bg-gray-800 px-6 py-4 border-t border-gray-200 dark:border-gray-700"
          >
            <router-link
              to="/sales"
              class="text-primary dark:text-dark-primary text-sm font-medium hover:underline"
            >
              View all sales
            </router-link>
          </div>
        </div>
      </div>

      <div class="mt-8">
        <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Popular Items
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="item in popularItems"
            :key="item.id"
            class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden"
          >
            <div class="h-40 bg-gray-200 dark:bg-gray-700">
              <img
                v-if="item.picture"
                :src="`https://pos-api.buahbibir.co.id/storage/pictures/${item.picture}`"
                :alt="item.name"
                class="h-full w-full object-cover"
              />
              <div
                v-else
                class="h-full w-full flex items-center justify-center text-gray-400 dark:text-gray-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
            <div class="p-4">
              <h3
                class="text-sm font-medium text-gray-900 dark:text-white truncate"
              >
                {{ item.name }}
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ formatCurrency(item.sell_price) }}
              </p>
              <div class="flex items-center justify-between mt-3">
                <span
                  :class="{
                    'text-green-600 dark:text-green-400': item.quantity > 10,
                    'text-yellow-600 dark:text-yellow-400':
                      item.quantity > 0 && item.quantity <= 10,
                    'text-red-600 dark:text-red-400': item.quantity === 0,
                  }"
                  class="text-xs font-medium"
                >
                  {{
                    item.quantity > 0
                      ? `Stock: ${item.quantity}`
                      : "Out of Stock"
                  }}
                </span>
                <span class="text-xs text-gray-500 dark:text-gray-400"
                  >Sold: {{ item.sold || 0 }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import apiService from "../../services/api";

const isLoading = ref(true);

const recentSales = ref([]);
const popularItems = ref([]);
const categories = ref([]);

const todaySales = ref(0);
const todaySalesChange = ref(0);
const todayTransactions = ref(0);
const todayTransactionsChange = ref(0);
const lowStockItems = ref(0);

const formatCurrency = (value) => {
  if (value === null || value === undefined) return "Rp 0";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
};

const formatTime = (timestamp) => {
  if (!timestamp) return "";

  const date = new Date(timestamp);
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    month: "short",
    day: "numeric",
  }).format(date);
};

const loadDashboardData = async () => {
  isLoading.value = true;

  try {
    const salesResponse = await apiService.getSales({ limit: 5 });
    if (salesResponse.data && salesResponse.data.data) {
      recentSales.value = salesResponse.data.data.data;

      const today = new Date().toISOString().split("T")[0];
      const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
        .toISOString()
        .split("T")[0];

      const todaySalesData = salesResponse.data.data.data.filter((sale) =>
        sale.created_at.startsWith(today)
      );

      const yesterdaySalesData = salesResponse.data.data.data.filter((sale) =>
        sale.created_at.startsWith(yesterday)
      );

      todaySales.value = todaySalesData.reduce(
        (sum, sale) => sum + parseFloat(sale.final_price),
        0
      );
      todayTransactions.value = todaySalesData.length;

      const yesterdaySalesTotal = yesterdaySalesData.reduce(
        (sum, sale) => sum + parseFloat(sale.final_price),
        0
      );
      const yesterdayTransactions = yesterdaySalesData.length;

      if (yesterdaySalesTotal > 0) {
        todaySalesChange.value =
          ((todaySales.value - yesterdaySalesTotal) / yesterdaySalesTotal) *
          100;
      } else {
        todaySalesChange.value = 100;
      }

      if (yesterdayTransactions > 0) {
        todayTransactionsChange.value =
          ((todayTransactions.value - yesterdayTransactions) /
            yesterdayTransactions) *
          100;
      } else {
        todayTransactionsChange.value = 100;
      }
    }

    const itemsResponse = await apiService.getItems({
      limit: 4,
      sort: "popularity",
    });
    if (itemsResponse.data && itemsResponse.data.data) {
      popularItems.value = itemsResponse.data.data.data;

      lowStockItems.value = itemsResponse.data.data.data.filter(
        (item) => item.quantity <= 10
      ).length;
    }

    const categoriesResponse = await apiService.getCategories();
    if (categoriesResponse.data && categoriesResponse.data.data) {
      categories.value = categoriesResponse.data.data.data;
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
