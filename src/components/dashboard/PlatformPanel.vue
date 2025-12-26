<template>
  <div class="content-panel" style="position: relative;">
    <div class="section-sub-title">平台上词数</div>

    <el-row :gutter="15">
      <el-col :span="4" v-for="(pf, idx) in platforms" :key="idx">
        <div class="platform-card">
          <div class="pf-header">
            <div class="pf-logo">
              <img
                  :src="`https://www.google.com/s2/favicons?domain=${pf.domain}&sz=128`"
                  :alt="pf.name"
              />
            </div>
            <span class="pf-name">{{ pf.name }}</span>
          </div>
          <!-- 修改点1：绑定移动端数据 -->
          <div class="pf-row">
            <span class="pf-label">移动端</span>
            <span class="pf-num">{{ pf.mobile }}</span>
          </div>
          <!-- 修改点2：绑定电脑端数据 -->
          <div class="pf-row">
            <span class="pf-label">电脑端</span>
            <span class="pf-num">{{ pf.desktop }}</span>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- 悬浮按钮 -->
    <div class="circle-nav-btn btn-left"><el-icon><ArrowLeft /></el-icon></div>
    <div class="circle-nav-btn btn-right"><el-icon><ArrowRight /></el-icon></div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'

// 修改点：为每个平台添加移动端和电脑端的词数数据
const platforms = reactive([
  {
    name: 'DeepSeek',
    domain: 'chat.deepseek.com',
    mobile: 4,
    desktop: 3
  },
  {
    name: '豆包',
    domain: 'doubao.com',
    mobile: 6,
    desktop: 5
  },
  {
    name: '通义千问',
    domain: 'tongyi.aliyun.com',
    mobile: 6,
    desktop: 2
  },
  {
    name: '腾讯元宝',
    domain: 'yuanbao.tencent.com',
    mobile: 7,
    desktop: 8
  },
  {
    name: '文心一言',
    domain: 'yiyan.baidu.com',
    mobile: 5,
    desktop: 5
  },
  {
    name: '纳米AI',
    domain: 'bot.n.cn',
    mobile: 2,
    desktop: 2
  },
])
</script>

<style scoped>
.content-panel { background: #f5f7fa; border-radius: 16px; padding: 20px 25px; box-shadow: 0 4px 16px rgba(0,0,0,0.02); margin-bottom: 20px; }
.section-sub-title { font-size: 20px; font-weight: 900; color: #1a1a1a; margin-bottom: 20px; }

.platform-card { background: white; padding: 20px; border-radius: 12px; min-height: 100px; transition: all 0.3s; border: 1px solid transparent; box-shadow: 0 2px 6px rgba(0,0,0,0.02); }
.platform-card:hover { border-color: #e6f7ff; box-shadow: 0 4px 12px rgba(0,0,0,0.08); transform: translateY(-2px); }

.pf-header { display: flex; align-items: center; margin-bottom: 20px; }

/* 修改点：Logo 样式调整 */
.pf-logo {
  width: 32px;  /* 稍微加大一点尺寸，看着更清晰 */
  height: 32px;
  border-radius: 50%; /* 保持圆形 */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  background: #fff; /* 给一个白底，防止透明图标在灰色背景上看不清 */
  overflow: hidden; /* 裁剪超出圆角的图片 */
  border: 1px solid #eee; /* 加一个极淡的边框，让白色图标也能看清边界 */
}

/* 新增：图片样式 */
.pf-logo img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 或者 contain，取决于你想要填满还是完整显示 */
}

.pf-name { font-size: 18px; color: #303133; font-weight: 600; } /* 加了一点粗细 */
.pf-row { display: flex; justify-content: space-between; align-items: center; font-size: 18px; color: #909399; background: #f7f8fa; height: 50px; padding: 0 12px; border-radius: 4px; margin-bottom: 10px; }
.pf-num { font-size: 25px; font-family: "Helvetica Neue", Arial, sans-serif; font-weight: bold; color: #303133; }

.circle-nav-btn { position: absolute; top: 60%; transform: translateY(-50%); width: 50px; height: 50px; border-radius: 50%; background: white; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.1); border: 1px solid #ebeef5; z-index: 20; transition: all 0.3s; color: #909399; }
.circle-nav-btn:hover { color: #409EFF; background: #ecf5ff; border-color: #b3d8ff; box-shadow: 0 6px 16px rgba(64,158,255,0.2); }
.btn-left { left: -25px; }
.btn-right { right: -25px; }
</style>