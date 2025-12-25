<template>
  <div class="report-overlay">
    <!-- 顶部装饰栏 -->
    <div class="top-nav-decoration">
      <div class="nav-content">
        <span class="report-title">GEO全域报告</span>
      </div>
    </div>

    <!-- 中间空状态内容 -->
    <div class="center-content">
      <div class="icon-placeholder">
        <!-- 模拟图中那个文档图标 -->
        <div class="doc-shape">
          <div class="lines"></div>
          <div class="lines short"></div>
          <div class="lines"></div>
        </div>
        <!-- 装饰星星 -->
        <div class="star-dec top-right">✦</div>
        <div class="star-dec bottom-left">✦</div>
      </div>

      <div class="text-status">暂未生成上词数据</div>
      <div class="text-desc">
        您当前还未进行内容发布操作。请先成功发布 1 篇文章后，系统将自动开始统计您的上词数据
      </div>

      <div class="action-area">
        <a class="back-link" @click.prevent="$emit('close')">返回工作台</a>
      </div>
    </div>
  </div>
</template>

<script setup>
defineEmits(['close'])
</script>

<style scoped>
.report-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999; /* 保证覆盖所有层级 */
  background: radial-gradient(circle at center, #2e2365 0%, #110e35 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
}

/* 顶部标题栏：模拟图中的紫色发光弧形条 */
.top-nav-decoration {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  position: relative;
  /* 顶部发光背景 */
  background: linear-gradient(180deg, rgba(118, 74, 255, 0.2) 0%, rgba(118, 74, 255, 0) 100%);
  border-top: 1px solid rgba(118, 74, 255, 0.3);
}

.nav-content {
  background: linear-gradient(90deg, #5838cc, #7c4dff);
  height: 40px;
  padding: 0 60px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 15px rgba(88, 56, 204, 0.4);
}

.report-title {
  font-weight: bold;
  font-size: 16px;
  letter-spacing: 1px;
}

/* 中心内容 */
.center-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: -40px;
}

/* 图标绘制 */
.icon-placeholder {
  position: relative;
  width: 100px;
  height: 100px;
  margin-bottom: 24px;
}
.doc-shape {
  width: 70px;
  height: 90px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  backdrop-filter: blur(4px);
}
.lines {
  width: 40px;
  height: 3px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
}
.lines.short {
  width: 24px;
}
.star-dec {
  position: absolute;
  color: #a78bfa;
  font-size: 18px;
  animation: pulse 2s infinite ease-in-out;
}
.top-right { top: 0; right: 10px; }
.bottom-left { bottom: 0; left: 10px; animation-delay: 1s; }

@keyframes pulse {
  0%, 100% { opacity: 0.3; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.1); }
}

.text-status {
  font-size: 16px;
  margin-bottom: 12px;
  color: #e5e7eb;
}

.text-desc {
  font-size: 13px;
  color: #9ca3af;
  max-width: 450px;
  text-align: center;
  line-height: 1.6;
  margin-bottom: 30px;
}

.back-link {
  font-size: 14px;
  color: #3b82f6;
  cursor: pointer;
  text-decoration: none;
}
.back-link:hover {
  text-decoration: underline;
  color: #60a5fa;
}
</style>