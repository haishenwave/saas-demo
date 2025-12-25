<template>
  <div class="result-view-container">
    <!-- 状态 A：数据看板 (默认显示) -->
    <GeoDashboard @view-report="handleOpenReport" />

    <!-- 状态 B：全屏深色报告 (点击后覆盖) -->
    <Transition name="fade-slide">
      <GeoReport
          v-if="showReport"
          @close="handleCloseReport"
      />
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import GeoDashboard from '@/components/geo/GeoDashboard.vue'
import GeoReport from '@/components/geo/GeoReport.vue'

const showReport = ref(false)

const handleOpenReport = () => {
  showReport.value = true
}

const handleCloseReport = () => {
  showReport.value = false
}
</script>

<style scoped>
.result-view-container {
  min-height: 100vh;
  background-color: #f5f7fa;
  position: relative;
}

/* 进场动画：类似于 PPT 的向上浮入 */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>