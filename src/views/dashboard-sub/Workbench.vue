<template>
  <!-- 顶部流程条 -->
  <ProcessSteps />

  <!-- 数据总览 Header -->
  <div class="section-header" style="margin-bottom: 20px;">
    <div class="header-left">
      <span class="title">数据总览</span>
      <span class="link">查看上词数据</span>
    </div>
    <div class="header-right">
      <span class="filter-tag active">全部</span>
      <span class="filter-tag">今天</span>
      <span class="filter-tag">昨天</span>
      <span class="filter-tag">近7天</span>
      <span class="filter-tag">近30天</span>
    </div>
  </div>

  <!-- 创作数据 -->
  <StatsPanel />

  <!-- 平台数据 -->
  <PlatformPanel />

  <!-- 底部表格 -->
  <BottomTables />
</template>

<script setup>
import ProcessSteps from '@/components/dashboard/ProcessSteps.vue'
import StatsPanel from '@/components/dashboard/StatsPanel.vue'
import PlatformPanel from '@/components/dashboard/PlatformPanel.vue'
import BottomTables from '@/components/dashboard/BottomTables.vue'
</script>

<style scoped>
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}
.section-header .title {
  font-size: 20px;
  font-weight: bold;
  color: #303133;
  margin-right: 15px;
}
.section-header .link {
  font-size: 15px;
  color: #0056b3;
  cursor: pointer;
}
.filter-tag {
  font-size: 18px;
  color: #606266;
  margin-left: 15px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
}
.filter-tag.active {
  color: #409EFF;
  background: #ecf5ff;
  font-weight: bold;
}
</style>
