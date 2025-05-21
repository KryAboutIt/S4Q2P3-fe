<template>
  <div>
    <CashierDashboard v-if="userRole == 1" />
    <ManagerDashboard v-else-if="userRole == 0" />
    <div v-else class="text-center py-12">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h2 class="text-xl font-medium text-gray-900 dark:text-white mb-2">Welcome to POS System</h2>
      <p class="text-gray-600 dark:text-gray-400">Please select a menu item to continue</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CashierDashboard from './CashierDashboard.vue'
import ManagerDashboard from './ManagerDashboard.vue'

const userRole = ref(null)

onMounted(() => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  if (user) {
    userRole.value = user.role === 0;
    console.log(user.role);
    
  } else {
    router.push("/login");
  }
})
</script>