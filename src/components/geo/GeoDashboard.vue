<template>
  <div class="dashboard-wrapper">
    <!-- 顶部：关键词报表 -->
    <el-card class="geo-card" shadow="never">
      <div class="card-header">
        <span class="header-title">关键词报表</span>
        <!-- 触发切换的入口 -->
        <span class="view-link" @click="$emit('view-report')">查看上词数据</span>
      </div>

      <!-- AI 模型卡片 Grid -->
      <div class="ai-grid">
        <!-- 1. 全部 (特殊样式) -->
        <div class="ai-item total-item">
          <div class="icon-wrap gradient-icon">
            <el-icon><Menu /></el-icon>
          </div>
          <div class="info">
            <div class="label">全部</div>
            <div class="num">0</div>
          </div>
        </div>

        <!-- 2. 循环渲染各个模型 -->
        <div
            v-for="(item, index) in aiModels"
            :key="index"
            class="ai-item"
        >
          <!-- 顶部角标：PC / Mobile -->
          <div class="corner-badge">
            <el-icon v-if="item.device === 'pc'"><Monitor /></el-icon>
            <el-icon v-else><Iphone /></el-icon>
          </div>

          <!-- Logo 模拟 -->
          <div class="icon-wrap" :style="{ color: item.color, background: item.bg }">
            <component :is="item.iconComp" v-if="item.iconComp" />
            <span v-else class="txt-logo">{{ item.logoText }}</span>
          </div>

          <div class="info">
            <div class="label">{{ item.name }}</div>
            <div class="num">0</div>
          </div>
        </div>
      </div>
    </el-card>

    <!-- 底部：关键词列表 -->
    <el-card class="geo-card list-card" shadow="never">
      <div class="card-header">
        <span class="header-title">关键词列表</span>
      </div>

      <!-- 筛选栏 -->
      <div class="filter-row">
        <el-input
            placeholder="请输入关键词"
            :prefix-icon="Search"
            style="width: 220px"
        />
        <div class="date-picker-box">
          <el-date-picker
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width: 260px"
          />
        </div>
        <el-button type="primary" class="query-btn">查询</el-button>
      </div>

      <!-- 空表格 -->
      <el-table :data="[]" style="width: 100%" empty-text="暂无数据">
        <el-table-column label="序号" width="80" />
        <el-table-column label="任务名称" min-width="150" />
        <el-table-column label="品牌词" min-width="120" />
        <el-table-column label="问题" min-width="200" />
        <el-table-column label="平台" width="100" />
        <el-table-column label="终端" width="100" />
        <el-table-column label="创建时间" width="180" />
        <el-table-column label="操作" width="100" />
      </el-table>

      <div class="empty-placeholder">
        暂无数据
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Menu, Monitor, Iphone, Search, Platform, Cloudy, StarFilled } from '@element-plus/icons-vue'

defineEmits(['view-report'])

// 复刻截图中的顺序和颜色
const aiModels = ref([
  { name: 'DeepSeek', logoText: 'D', color: '#409eff', bg: '#ecf5ff', device: 'pc' },
  { name: 'DeepSeek', logoText: 'D', color: '#409eff', bg: '#ecf5ff', device: 'mobile' },
  { name: '豆包', logoText: '豆', color: '#333', bg: '#f2f3f5', device: 'pc' }, // 模拟头像
  { name: '豆包', logoText: '豆', color: '#333', bg: '#f2f3f5', device: 'mobile' },
  { name: '通义千问', logoText: '通', color: '#7b1fa2', bg: '#f3e5f5', device: 'pc' },
  { name: '通义千问', logoText: '通', color: '#7b1fa2', bg: '#f3e5f5', device: 'mobile' },
  { name: '腾讯元宝', logoText: '腾', color: '#07c160', bg: '#e8f5e9', device: 'pc' },
  { name: '腾讯元宝', logoText: '腾', color: '#07c160', bg: '#e8f5e9', device: 'mobile' },
  { name: '文心一言', logoText: '文', color: '#1976d2', bg: '#e3f2fd', device: 'pc' },
  { name: '文心一言', logoText: '文', color: '#1976d2', bg: '#e3f2fd', device: 'mobile' },
  { name: '纳米AI', logoText: '纳', color: '#f44336', bg: '#ffebee', device: 'pc' },
  { name: '纳米AI', logoText: '纳', color: '#f44336', bg: '#ffebee', device: 'mobile' },
  { name: 'Kimi', logoText: 'K', color: '#000', bg: '#e0e0e0', device: 'pc' },
])
</script>

<style scoped>
.dashboard-wrapper {
  padding: 20px;
}

.geo-card {
  border: none;
  border-radius: 12px;
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.header-title {
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.view-link {
  font-size: 13px;
  color: #409eff;
  cursor: pointer;
}
.view-link:hover {
  text-decoration: underline;
}

/* AI Grid 布局 */
.ai-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  gap: 12px;
}

.ai-item {
  position: relative;
  background: #fff;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.2s;
}
.ai-item:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  border-color: #e6e6e6;
}

/* 全部卡片高亮 */
.total-item {
  border: 1px solid #a0cfff;
  background: linear-gradient(135deg, #ecf5ff 0%, #ffffff 100%);
}
.total-item .gradient-icon {
  background: #409eff;
  color: #fff;
}

.corner-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  color: #909399;
  font-size: 14px;
  opacity: 0.6;
}

.icon-wrap {
  width: 40px;
  height: 40px;
  border-radius: 50%; /* 圆形图标背景 */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
}

.info {
  display: flex;
  flex-direction: column;
}
.label {
  font-size: 13px;
  color: #666;
  margin-bottom: 2px;
}
.num {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

/* 列表筛选区 */
.list-card {
  min-height: 400px;
}
.filter-row {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}
.query-btn {
  background-color: #2f6bff;
  border-color: #2f6bff;
}
.empty-placeholder {
  text-align: center;
  color: #909399;
  padding: 40px 0;
  font-size: 14px;
}
</style>