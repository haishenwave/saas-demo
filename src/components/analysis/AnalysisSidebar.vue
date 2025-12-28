<template>
  <el-aside width="260px" class="analysis-aside">
    <div class="aside-header">
      <div class="logo-box">
        <el-icon :size="24" color="#0056b3"><ChatLineRound /></el-icon>
        <span class="logo-text">GEO</span>
      </div>
      <el-icon class="collapse-btn"><Fold /></el-icon>
    </div>

    <div style="padding: 0 20px;">
      <!-- 触发父组件重置 -->
      <div class="create-task-btn" :class="{ analyzing: isAnalyzing }" @click="$emit('reset')">
        <el-icon><Plus /></el-icon> 创建GEO任务
      </div>
      <div class="points-text">
        剩余GEO权益点：<span class="blue-num">42690.5</span> 点
      </div>
    </div>

    <div class="history-list">
      <div class="history-divider"></div>
      <div
          v-for="(item, index) in historyList"
          :key="index"
          class="history-item"
          :class="{ active: index === activeIndex }"
          @click="$emit('selectHistory', index)"
      >
        <el-icon class="item-icon"><Document /></el-icon>
        <span class="item-text">{{ item }}</span>
      </div>
      <div class="history-end">到底了</div>
    </div>

    <div class="user-profile">
      <el-avatar :size="32" style="background:#e0e0e0; color:#666">艾</el-avatar>
      <span class="user-name">dxsgeo</span>
      <el-icon style="margin-left:auto; color:#999; cursor:pointer;"><SwitchButton /></el-icon>
    </div>
  </el-aside>
</template>

<script setup>
import { ChatLineRound, Fold, Plus, Document, SwitchButton } from '@element-plus/icons-vue'

defineProps({
  historyList: { type: Array, default: () => [] },
  activeIndex: { type: Number, default: -1 },
  isAnalyzing: Boolean
})

defineEmits(['reset', 'selectHistory'])
</script>

<style scoped>
/* 侧边栏样式 (完全保留) */
.analysis-aside {
  background: linear-gradient(
    180deg,
    #eaf3ff 0%,
    #f4f9ff 100%
  );
  border-right: 1px solid #dbeafe;
  display: flex;
  flex-direction: column; }
.aside-header { height: 60px; display: flex; align-items: center; justify-content: space-between; padding: 0 20px; }
.logo-box { display: flex; align-items: center; gap: 10px; }
.fake-logo { width: 24px; height: 24px; background: #409EFF; color: white; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: bold; }
.logo-text {  font-size: 18px; color: #333; }
.collapse-btn { font-size: 18px; color: #999; cursor: pointer; }

.create-task-btn { margin-top: 20px; background: #f0f2f5; height: 50px; border-radius: 8px; display: flex; align-items: center; justify-content: center; gap: 8px; font-weight: bold; font-size: 18px; color: #606266; cursor: pointer; transition: 0.3s; }
.create-task-btn:hover { background: #e6e8eb; color: #303133; }
.create-task-btn.analyzing {
  background: #d6e8ff;  /* 蓝色背景 */
  color: #1f3a5f;       /* 深蓝文字 */
}
.points-text { font-size: 15px; color: #909399; margin-top: 10px; }
.blue-num { color: #0056b3; font-weight: 900; font-family: Arial, sans-serif; }

.history-list { flex: 1; overflow-y: auto; padding: 0 10px; }
.history-item { display: flex; align-items: center; padding: 20px 20px; color: #333; font-size: 14px; cursor: pointer; border-radius: 6px; }
.history-item:hover { background: #f5f7fa; }
.history-item.active {
  background: #ffffff;
  color: #0056b3;
}
.history-divider {
  height: 1px;
  background: #e5e7eb; /* 浅灰色，和你整体风格很搭 */
  margin: 10px 10px 8px;
}
.history-item.active .item-icon {
  color: #0056b3;
}
.item-icon { margin-right: 8px; color: #666; }
.item-text { font-size: 18px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.history-end { text-align: center; color: #ccc; font-size: 15px; margin-top: 20px; }

.user-profile { padding: 15px 20px; display: flex; align-items: center; border-top: 1px solid #f0f0f0; }
.user-name { margin-left: 10px; font-size: 14px; color: #333; }
</style>