<template>
  <div class="top-process-bar">
    <div
        v-for="(step, index) in steps"
        :key="index"
        class="step-card"
        @click="handleClick(index)"
    >
      <div class="step-icon-bg">
        <el-icon :size="20" color="#0056b3">
          <component :is="step.icon" />
        </el-icon>
      </div>

      <div class="step-info">
        <div class="s-title">{{ step.title }}</div>
        <div class="s-desc">{{ step.desc }}</div>
      </div>

      <el-icon v-if="index === 0" class="hover-arrow"><TopRight /></el-icon>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import {
  TopRight,
  DataLine,
  Collection,
  ChatDotRound,
  EditPen,
  Promotion,
  TrendCharts,
} from '@element-plus/icons-vue'

const router = useRouter()

const steps = [
  { title: '网站分析', desc: '通过官网一键生成GEO分析报告', icon: DataLine },
  { title: '构建企业知识库', desc: '上传资料构建专属企业的知识库', icon: Collection },
  { title: '完善AI提示词', desc: '通过AI能力完善企业提示词', icon: ChatDotRound },
  { title: '创作文章', desc: '通过企业知识库生成GEO文章', icon: EditPen },
  { title: '文章投喂', desc: '快速投喂AI内容完成提示词覆盖', icon: Promotion },
  { title: '效果跟踪', desc: '看板表跟踪上词效果及时调整内容', icon: TrendCharts },
]

const handleClick = (index) => {
  // 第一步：分析页，独立页面
  if (index === 0) {
    window.open(window.location.origin + '/analysis', '_blank')
    return
  }

  // ✅ 注意：这里全部是不带 /dashboard 的真实路径
  const map = {
    1: { name: 'knowledge' },
    2: { name: 'prompt' },
    3: { name: 'article-create' },
    4: { name: 'article-feed' },
    5: { name: 'result-track' },
  }

  router.push(map[index] || { name: 'workbench' })
}
</script>

<style scoped>
.top-process-bar {
  display: flex;
  width: 100%;
  margin-bottom: 25px;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.06));
}

.step-card {
  flex: 1;
  min-width: 0;
  background: white;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  margin-right: 4px;
  padding-left: 25px;
  padding-right: 20px;
  clip-path: polygon(
      0% 0%,
      calc(100% - 12px) 0%,
      100% 50%,
      calc(100% - 12px) 100%,
      0% 100%,
      12px 50%
  );
}

.step-card:first-child {
  padding-left: 20px;
  clip-path: polygon(
      0% 0%,
      calc(100% - 12px) 0%,
      100% 50%,
      calc(100% - 12px) 100%,
      0% 100%
  );
  border-radius: 4px 0 0 4px;
}

.step-card:last-child {
  margin-right: 0;
  padding-right: 20px;
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 12px 50%);
  border-radius: 0 4px 4px 0;
}

.step-card:hover {
  background-color: #fdfdfd;
  z-index: 2;
}
.step-card:hover .s-title {
  color: #409EFF;
}
.step-card:hover .step-icon-bg {
  background: #409EFF;
}
.step-card:hover .step-icon-bg .el-icon {
  color: white !important;
}

.step-icon-bg {
  min-width: 40px;
  height: 40px;
  background: #ecf5ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  transition: all 0.3s;
}
.step-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 2;
}
.s-title {
  font-size: 20px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 6px;
  max-width: 6.5em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.s-desc {
  font-size: 15px;
  color: #999;
  line-height: 1.5;
  width: 8em;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.hover-arrow {
  position: absolute;
  right: 20px;
  top: 10px;
  color: #409EFF;
  z-index: 5;
  opacity: 0.8;
}
</style>
