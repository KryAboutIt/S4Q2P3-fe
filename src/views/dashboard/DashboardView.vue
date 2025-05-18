<template>
  <div>
    <CashierDashboard v-if="userRole === 0" />
    <ManagerDashboard v-else-if="userRole === 1" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CashierDashboard from './CashierDashboard.vue'
import ManagerDashboard from './ManagerDashboard.vue'

const userRole = ref(null)

onMounted(() => {
  userRole.value = parseInt(localStorage.getItem('userRole'))
})
</script>