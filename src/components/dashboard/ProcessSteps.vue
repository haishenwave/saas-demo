<template>
  <div class="top-process-bar">
    <!-- 定义全局渐变 (只需定义一次) -->
    <svg style="position: absolute; width: 0; height: 0; overflow: hidden;" aria-hidden="true">
      <defs>
        <!-- 蓝色渐变：用于主图标 -->
        <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#4facfe; stop-opacity:1" />
          <stop offset="100%" style="stop-color:#00f2fe; stop-opacity:1" />
        </linearGradient>
        <!-- 紫蓝混合：用于悬停或其他效果 -->
        <linearGradient id="purple-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#667eea; stop-opacity:1" />
          <stop offset="100%" style="stop-color:#764ba2; stop-opacity:1" />
        </linearGradient>
      </defs>
    </svg>

    <div
        v-for="(step, index) in steps"
        :key="index"
        class="step-card"
        @click="handleClick(index)"
    >
      <div class="step-icon-bg">

        <!-- 1. 网站分析: 扫描雷达 (双层结构) -->
        <svg v-if="index === 0" class="step-svg" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor" opacity="0.3"/> <!-- 外圈浅色 -->
          <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="currentColor"/> <!-- 内圈深色 -->
        </svg>

        <!-- 2. 企业知识库: 堆叠服务器 (层次感) -->
        <svg v-else-if="index === 1" class="step-svg" viewBox="0 0 24 24">
          <path d="M20 13H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zM7 19c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM20 3H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1zM7 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" fill="currentColor"/>
          <path d="M7 19c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" fill="white" opacity="0.4"/> <!-- 加个高光点 -->
        </svg>

        <!-- 3. AI 提示词: 魔法闪耀 (科技感) -->
        <svg v-else-if="index === 2" class="step-svg" viewBox="0 0 24 24">
          <path d="M7.5 5.6L10 7 7.5 8.4 6.1 10.9 4.7 8.4 2.2 7l2.5-1.4L6.1 3.1l1.4 2.5zM19 13l-2.5 1.4L15.1 17l-1.4-2.6-2.5-1.4 2.5-1.4 1.4-2.6 1.4 2.6 2.5 1.4z" fill="currentColor" opacity="0.6"/> <!-- 小星星浅色 -->
          <path d="M11.5 9.5L9 14l4.5-1.5L11 20l5.5-9.5h-4l3-5.5z" fill="currentColor"/> <!-- 闪电深色 -->
        </svg>

        <!-- 4. 创作文章: 羽毛笔 (优雅感) -->
        <svg v-else-if="index === 3" class="step-svg" viewBox="0 0 24 24">
          <path d="M12 19.24c.15.15.34.24.54.24H22v-2h-8.75l-4.75-4.75-6.25-6.25a2.12 2.12 0 0 0-3 3l9.75 9.76z" fill="currentColor"/>
          <path d="M7 12l5.75-5.75L10.75 4.5 5 10.25V12h2z" fill="currentColor" opacity="0.4"/> <!-- 笔尖阴影 -->
        </svg>

        <!-- 5. 文章投喂: 纸飞机 (冲破感) -->
        <svg v-else-if="index === 4" class="step-svg" viewBox="0 0 24 24">
          <path d="M10 18l1.7-4.6L20.5 4.6 4.3 10.8 10 13.4V18zM22 3l-7.7 18.3L11.6 14 3.7 11.2 22 3z" fill="currentColor" opacity="0.3"/> <!-- 轮廓 -->
          <path d="M10.8 14.6L20.5 4.6l-8.8 8.8 1.4 1.4.3-.2-.6-.4z" fill="currentColor"/> <!-- 核心实心 -->
        </svg>

        <!-- 6. 效果跟踪: 柱状增长 (数据感) -->
        <svg v-else-if="index === 5" class="step-svg" viewBox="0 0 24 24">
          <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" fill="currentColor"/>
          <path d="M5 19h14v2H5z" fill="currentColor" opacity="0.4"/> <!-- 底部基线 -->
        </svg>

      </div>

      <div class="step-info">
        <div class="s-title">{{ step.title }}</div>
        <div class="s-desc">{{ step.desc }}</div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// 数据里不再需要 icon 字段了，因为直接在 template 里写了 SVG
const steps = [
  { title: '网站分析', desc: '通过官网一键生成GEO分析报告' },
  { title: '构建企业知识库', desc: '上传资料构建专属企业的知识库' },
  { title: '完善AI提示词', desc: '通过AI能力完善企业提示词' },
  { title: '创作文章', desc: '通过企业知识库生成GEO文章' },
  { title: '文章投喂', desc: '快速投喂AI内容完成提示词覆盖' },
  { title: '效果跟踪', desc: '看板表跟踪上词效果及时调整内容' },
]

const handleClick = (index) => {
  // 第一步：分析页，独立页面
  if (index === 0) {
    window.open(window.location.origin + '/analysis', '_blank')
    return
  }

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
  /* 增加一点阴影让它浮起来 */
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.05));
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
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); /* 更平滑的过渡 */
  margin-right: 4px; /* 间隙 */
  padding-left: 25px;
  padding-right: 20px;

  /* 核心：箭头形状的裁剪 */
  clip-path: polygon(
      0% 0%,
      calc(100% - 12px) 0%,
      100% 50%,
      calc(100% - 12px) 100%,
      0% 100%,
      12px 50%
  );
  position: relative; /* 为了定位箭头 */
}

/* 第一个卡片：左边是直的 */
.step-card:first-child {
  padding-left: 20px;
  clip-path: polygon(
      0% 0%,
      calc(100% - 12px) 0%,
      100% 50%,
      calc(100% - 12px) 100%,
      0% 100%
  );
  border-radius: 6px 0 0 6px;
}

/* 最后一个卡片：右边是直的 */
.step-card:last-child {
  margin-right: 0;
  padding-right: 20px;
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 12px 50%);
  border-radius: 0 6px 6px 0;
}

/* 悬停效果 */
.step-card:hover {
  background-color: #fdfdfd;
  /* 悬停时稍微放大并上浮，更具动感 */
  transform: translateY(-2px);
  z-index: 2;
}
.step-card:hover .s-title {
  color: #2f6bff; /* 你的品牌主色 */
}
.step-card:hover .step-icon-bg {
  /* 悬停时，背景色变成深一点的蓝色 */
  background: #0056b3;
  /* 加个发光阴影 */
  box-shadow: 0 4px 12px rgba(0, 86, 179, 0.4);
  transform: scale(1.05);
}
.step-card:hover .step-svg {
  fill: white;
  /* 悬停时，让所有部分都变白，且不透明度统一，显得很亮 */
  opacity: 1 !important;
}
.step-card:hover .step-svg path {
  opacity: 1 !important; /* 强制变白 */
}
.step-icon-bg {
  min-width: 48px; /* 稍微大一点 */
  height: 48px;
  background: #eef4ff; /* 极其淡的蓝色背景 */
  border-radius: 12px; /* 改成圆角矩形，比圆形更现代 */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 14px;
  transition: all 0.3s;
  color: #2f6bff;
}

.step-svg {
  width: 26px; /* 图标大一点 */
  height: 26px;
  fill: currentColor;
  transition: all 0.3s;
}
.step-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 2;
  flex: 1; /* 撑满剩余空间 */
}
.s-title {
  font-size: 18px; /* 调大一点点 */
  font-weight: 800; /* 加粗 */
  color: #303133;
  margin-bottom: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.s-desc {
  font-size: 13px; /* 调小更精致 */
  color: #909399;
  line-height: 1.4;
  /* 多行省略 */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.hover-arrow {
  position: absolute;
  right: 15px;
  top: 15px;
  color: #2f6bff;
  z-index: 5;
  opacity: 0.6;
}
</style>
