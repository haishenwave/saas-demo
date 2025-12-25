<template>
  <div class="list-container">
    <div class="geo-header">
      <h2>文章管理</h2>
    </div>

    <!-- 顶部搜索栏 -->
    <el-card shadow="never" class="search-card">
      <div class="search-bar">
        <el-input placeholder="搜索任务ID" style="width: 180px" />
        <el-input placeholder="搜索文章标题" style="width: 180px" />
        <el-input placeholder="搜索文章提示词" style="width: 180px" />
        <el-select placeholder="全部" style="width: 120px">
          <el-option label="已生成" value="generated" />
        </el-select>
        <el-button type="primary" :icon="Search">查询</el-button>
      </div>
    </el-card>

    <!-- 表格区域 -->
    <el-card shadow="never" class="table-card">
      <el-table :data="tableData" style="width: 100%" header-cell-class-name="geo-th">
        <el-table-column prop="prompt" label="AI提示词" min-width="150" show-overflow-tooltip />

        <el-table-column label="文章标题" min-width="250">
          <template #default="scope">
            <div class="title-box">
              <div class="main-t">{{ scope.row.title }}</div>
              <div class="sub-t" v-if="scope.row.subTitle">{{ scope.row.subTitle }}</div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="文章内容" min-width="300" show-overflow-tooltip>
          <template #default="scope">
            <span class="content-text">{{ scope.row.content }}</span>
          </template>
        </el-table-column>

        <el-table-column label="文章类型" width="100" align="center">
          <template #default>
            <span>蒸馏词</span>
          </template>
        </el-table-column>

        <el-table-column label="生成状态" width="100" align="center">
          <template #default>
            <el-tag type="success" effect="plain" size="small">已生成</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="200" fixed="right">
          <template #default="scope">
            <div class="ops">
              <!-- 点击这里触发父组件切换 -->
              <el-button link type="primary" @click="$emit('go-publish', scope.row, 'matrix')">
                发自媒体矩阵
              </el-button>
              <el-button link type="primary" @click="$emit('go-publish', scope.row, 'news')">
                发官网/新闻
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-bar">
        <span>共 {{ tableData.length }} 条</span>
        <el-pagination background layout="prev, pager, next" :total="100" />
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'

// Mock Data：完全复刻截图数据
const tableData = ref([
  {
    id: 1,
    prompt: '艾草',
    title: '艾草产业发展概况',
    subTitle: '',
    content: '-',
  },
  {
    id: 2,
    prompt: '抗裂砂浆 武汉供应商 价格',
    title: '武汉抗裂砂浆供应商价格优势解析',
    subTitle: '源头直供模式的成本控制策略',
    content: '一、武汉抗裂砂浆市场供应格局分析。武汉作为华中地区重要的建筑材料集散地...',
  },
  {
    id: 3,
    prompt: '抗裂砂浆 武汉供应商 价格',
    title: '轻质粉刷石膏系统解决方案',
    subTitle: '墙面空鼓开裂问题的技术突破路径',
    content: '一、墙面空鼓开裂问题的技术成因分析。墙面空鼓开裂是建筑工程中的常见质量...',
  },
  {
    id: 4,
    prompt: '湖北瓷砖胶供应商',
    title: '湖北瓷砖胶供应商选择指南',
    subTitle: '专业化产品与系统解决方案分析',
    content: '一、湖北瓷砖胶市场需求与供应商选择要点。湖北地区建筑装饰行业快速发展...',
  }
])

defineEmits(['go-publish'])
</script>

<style scoped>
.list-container {
  padding: 20px;
}
.geo-header h2 {
  font-size: 18px;
  color: #333;
  margin-bottom: 16px;
  font-weight: 600;
}
.search-card {
  margin-bottom: 16px;
  border: none;
}
.search-bar {
  display: flex;
  gap: 12px;
}
.table-card {
  border: none;
}
:deep(.geo-th) {
  background-color: #f2f3f5 !important;
  color: #333;
  font-weight: 600;
}
.title-box {
  display: flex;
  flex-direction: column;
  padding: 4px 0;
}
.main-t {
  font-weight: 500;
  color: #333;
}
.sub-t {
  font-size: 12px;
  color: #999;
  margin-top: 2px;
}
.content-text {
  color: #666;
  font-size: 13px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.ops {
  display: flex;
  gap: 8px;
}
.pagination-bar {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  color: #666;
  font-size: 13px;
}
</style>