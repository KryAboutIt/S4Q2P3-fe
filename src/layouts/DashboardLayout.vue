<template>
  <div class="flex h-screen bg-gray-100 dark:bg-gray-900">
    <div
      class="relative bg-white dark:bg-gray-800 shadow-md flex-shrink-0 transition-all duration-300"
      :class="{ 'w-20': collapsed, 'w-64': !collapsed }"
    >
      <div
        class="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700"
      >
        <div class="flex items-center">
          <div
            class="h-8 w-8 rounded bg-primary dark:bg-dark-primary flex items-center justify-center text-white font-bold"
          >
            POS
          </div>
          <h1
            v-if="!collapsed"
            class="text-lg font-semibold text-gray-800 dark:text-white ml-2"
          >
            System
          </h1>
        </div>
        <button
          @click="collapsed = !collapsed"
          class="text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg p-1"
        >
          <svg
            v-if="collapsed"
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 5l7 7-7 7M5 5l7 7-7 7"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
        </button>
      </div>

      <div
        class="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center"
      >
        <div
          class="w-10 h-10 rounded-full bg-primary dark:bg-dark-primary flex items-center justify-center text-white font-medium"
        >
          {{ userInitials }}
        </div>
        <div v-if="!collapsed" class="ml-3 overflow-hidden">
          <p class="text-sm font-medium text-gray-800 dark:text-white truncate">
            {{ userName }}
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
            {{ isManager ? "Manager" : "Cashier" }}
          </p>
        </div>
      </div>

      <div
        class="overflow-y-auto"
        :style="{ height: 'calc(100vh - 150px)', paddingBottom: '80px' }"
      >
        <nav class="mt-4">
          <router-link
            to="/dashboard"
            class="flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            :class="{ 'justify-center': collapsed }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span v-if="!collapsed" class="ml-3">Dashboard</span>
          </router-link>

          <router-link
            to="/dashboard/sales"
            class="flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            :class="{ 'justify-center': collapsed }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
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
            <span v-if="!collapsed" class="ml-3">Sales</span>
          </router-link>

          <router-link
            to="/dashboard/customers"
            class="flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            :class="{ 'justify-center': collapsed }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span v-if="!collapsed" class="ml-3">Customers</span>
          </router-link>

          <template v-if="isManager">
            <router-link
              to="/dashboard/items"
              class="flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              :class="{ 'justify-center': collapsed }"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
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
              <span v-if="!collapsed" class="ml-3">Items</span>
            </router-link>

            <router-link
              to="/dashboard/suppliers"
              class="flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              :class="{ 'justify-center': collapsed }"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
              <span v-if="!collapsed" class="ml-3">Suppliers</span>
            </router-link>

            <router-link
              to="/dashboard/reports"
              class="flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              :class="{ 'justify-center': collapsed }"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span v-if="!collapsed" class="ml-3">Reports</span>
            </router-link>

            <router-link
              to="/dashboard/logistics"
              class="flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              :class="{ 'justify-center': collapsed }"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                />
              </svg>
              <span v-if="!collapsed" class="ml-3">Logistics</span>
            </router-link>

            <router-link
              to="/dashboard/employees"
              class="flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              :class="{ 'justify-center': collapsed }"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span v-if="!collapsed" class="ml-3">Employees</span>
            </router-link>

            <router-link
              to="/dashboard/configuration"
              class="flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              :class="{ 'justify-center': collapsed }"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span v-if="!collapsed" class="ml-3">Configuration</span>
            </router-link>
          </template>
        </nav>

        <div
          class="absolute bottom-0 w-full border-t border-gray-200 dark:border-gray-700 py-2"
        >
          <button
            @click="toggleDarkMode"
            class="flex items-center px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 w-full"
            :class="{ 'justify-center': collapsed }"
          >
            <svg
              v-if="isDarkMode"
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
            <span v-if="!collapsed" class="ml-3">{{
              isDarkMode ? "Light Mode" : "Dark Mode"
            }}</span>
          </button>

          <button
            @click="logout"
            :disabled="isLoggingOut"
            class="flex items-center px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 w-full"
            :class="{ 'justify-center': collapsed, 'opacity-50': isLoggingOut }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span v-if="!collapsed" class="ml-3">
              {{ isLoggingOut ? "Logging out..." : "Logout" }}
            </span>
          </button>
        </div>
      </div>
    </div>

    <div class="flex-1 flex flex-col overflow-hidden">
      <header class="bg-white dark:bg-gray-800 shadow-sm z-10">
        <div class="flex items-center justify-between px-4 py-3">
          <div class="flex items-center">
            <h2 class="text-lg font-medium text-gray-800 dark:text-white">
              {{ pageTitle }}
            </h2>
          </div>

          <div class="flex items-center space-x-4">
            <button
              class="text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 relative"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span
                class="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"
              ></span>
            </button>

            <div class="relative">
              <button
                class="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                <span class="mr-2">{{ userName }}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main class="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import apiService from "../services/api";

const router = useRouter();
const route = useRoute();

const isManager = ref(true);
const userName = ref("John Tor");
const userInitials = computed(() => {
  const names = userName.value.split(" ");
  if (names.length > 1) {
    return `${names[0][0]}${names[1][0]}`.toUpperCase();
  }
  return names[0].substring(0, 2).toUpperCase();
});

const collapsed = ref(false);
const isDarkMode = ref(false);
const isLoggingOut = ref(false);

const logout = async () => {
  if (isLoggingOut.value) return;

  isLoggingOut.value = true;
  try {
    await apiService.logout();
    console.log("Logged out successfully");
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");

    router.push("/login");
    isLoggingOut.value = false;
  }
};

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;

  document.documentElement.classList.toggle("dark");

  if (document.documentElement.classList.contains("dark")) {
    localStorage.setItem("color-theme", "dark");
  } else {
    localStorage.setItem("color-theme", "light");
  }
};

const pageTitle = computed(() => {
  return route.meta.title || "Dashboard";
});

onMounted(() => {
  if (
    localStorage.getItem("color-theme") === "dark" ||
    (!("color-theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
    isDarkMode.value = true;
  }

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  if (user) {
    userName.value =
      `${user.first_name || ""} ${user.last_name || ""}`.trim() || "User";
    isManager.value = user.role === 0;
  } else {
    router.push("/login");
  }
});
</script>
