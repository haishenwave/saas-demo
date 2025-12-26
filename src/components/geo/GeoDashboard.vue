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
        <!-- 1. 全部 (保持原样，作为汇总项) -->
        <div class="ai-item total-item">
          <div class="icon-wrap gradient-icon">
            <el-icon><Menu /></el-icon>
          </div>
          <div class="info">
            <div class="label">全部</div>
            <div class="num">0</div>
          </div>
        </div>

        <!-- 2. 循环渲染各个模型 (使用真实图标) -->
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

          <!-- Logo 修改点：使用 img 标签 -->
          <div class="icon-wrap img-wrap">
            <img
                :src="`https://www.google.com/s2/favicons?domain=${item.domain}&sz=128`"
                :alt="item.name"
            />
          </div>

          <div class="info">
            <div class="label">{{ item.name }}</div>
            <div class="num">0</div>
          </div>
        </div>
      </div>
    </el-card>

    <!-- 底部：关键词列表 (保持不变) -->
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
import { Menu, Monitor, Iphone, Search } from '@element-plus/icons-vue'

defineEmits(['view-report'])

// 修改点：数据结构调整，移除 color/bg/logoText，改为 domain
const aiModels = ref([
  // DeepSeek
  { name: 'DeepSeek', domain: 'chat.deepseek.com', device: 'pc' },
  { name: 'DeepSeek', domain: 'chat.deepseek.com', device: 'mobile' },
  // 豆包
  { name: '豆包', domain: 'doubao.com', device: 'pc' },
  { name: '豆包', domain: 'doubao.com', device: 'mobile' },
  // 通义千问
  { name: '通义千问', domain: 'tongyi.aliyun.com', device: 'pc' },
  { name: '通义千问', domain: 'tongyi.aliyun.com', device: 'mobile' },
  // 腾讯元宝
  { name: '腾讯元宝', domain: 'yuanbao.tencent.com', device: 'pc' },
  { name: '腾讯元宝', domain: 'yuanbao.tencent.com', device: 'mobile' },
  // 文心一言
  { name: '文心一言', domain: 'yiyan.baidu.com', device: 'pc' },
  { name: '文心一言', domain: 'yiyan.baidu.com', device: 'mobile' },
  // 纳米AI
  { name: '纳米AI', domain: 'n.cn', device: 'pc' },
  { name: '纳米AI', domain: 'n.cn', device: 'mobile' },
  // Kimi (新增了 Mobile 端)
  { name: 'Kimi', domain: 'kimi.moonshot.cn', device: 'pc' },
  { name: 'Kimi', domain: 'kimi.moonshot.cn', device: 'mobile' },
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
  transform: translateY(-2px); /* 加一点点上浮效果 */
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

/* 图标容器通用样式 */
.icon-wrap {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  flex-shrink: 0;
}

/* 修改点：专门针对真实图片的样式 */
.img-wrap {
  background: #fff;      /* 纯白背景，避免透明图标在灰底上看不清 */
  border: 1px solid #eee;/* 极淡的边框，界定图标范围 */
  padding: 4px;          /* 内边距，让图标不要撑满圆，看起来更精致 */
  overflow: hidden;
}

.img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: contain;   /* 保持图片比例 */
  border-radius: 50%;    /* 如果图片本身是方的，强制变圆 */
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