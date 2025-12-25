<template>
  <div class="content-panel">
    <div class="section-sub-title">创作数据</div>

    <div class="five-column-layout">
      <div class="data-card-wrapper" v-for="(item, key) in statsData" :key="key">
        <div class="data-card">
          <div class="dc-left">
            <div class="icon-circle" :style="{ background: item.bg }">
              <el-icon :size="24" color="#fff"><component :is="item.icon" /></el-icon>
            </div>
          </div>
          <div class="dc-right">
            <div class="dc-label">{{ item.label }}</div>
            <div class="dc-value">{{ item.value }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { MagicStick, Files, Edit, UploadFilled, Trophy } from '@element-plus/icons-vue'

const statsData = reactive([
  { label: '提示词数', value: 27, icon: 'MagicStick', bg: 'linear-gradient(135deg, #85ce61, #529b2e)' },
  { label: '企业知识库', value: 1, icon: 'Files', bg: 'linear-gradient(135deg, #a0cfff, #409eff)' },
  { label: '创作文章数', value: 71, icon: 'Edit', bg: 'linear-gradient(135deg, #79bbff, #337ecc)' },
  { label: '投喂文章数', value: 381, icon: 'UploadFilled', bg: 'linear-gradient(135deg, #fab6b6, #f56c6c)' },
  { label: '累计上词数', value: 0, icon: 'Trophy', bg: 'linear-gradient(135deg, #4dd0e1, #00acc1)' }
])
</script>

<style scoped>
.content-panel {
  background: #f5f7fa; border-radius: 16px; padding: 20px 25px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.02); margin-bottom: 20px;
}
.section-sub-title {
  font-size: 20px; font-weight: 900; color: #1a1a1a; margin-bottom: 20px;
}
.five-column-layout { display: flex; gap: 20px; width: 100%; }
.data-card-wrapper { flex: 1; min-width: 0; }

.data-card {
  background: white; padding: 20px; border-radius: 12px; display: flex; align-items: center;
  transition: all 0.3s; box-shadow: 0 2px 6px rgba(0,0,0,0.02);
}
.data-card:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
.icon-circle { width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
.dc-label { font-size: 18px; color: #606266; margin-bottom: 2px; font-weight: 500; }
.dc-value { font-size: 38px; font-family: "Helvetica Neue", "Arial", sans-serif; font-weight: bold; color: #303133; line-height: 1.2; }
</style>