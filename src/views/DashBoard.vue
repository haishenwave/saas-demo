<template>
  <el-container class="dashboard-container">
    <DashboardSidebar />

    <el-main style="padding: 20px 40px 20px 30px;">
      <router-view />
    </el-main>
  </el-container>
</template>

<script setup>
import DashboardSidebar from '@/components/dashboard/DashboardSidebar.vue'
</script>

<style scoped>
.dashboard-container {
  height: 100vh;
  background: linear-gradient(to top right, #e6f2ff, #f3e9ff);
  overflow-x: hidden;
  width: 100%;
}
</style>
