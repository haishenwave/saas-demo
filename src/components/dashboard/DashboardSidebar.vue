<template>
  <el-aside width="240px" class="home-aside">
    <!-- Logo 区域 -->
    <div class="logo-area">
      <div class="logo-left">
        <div class="fake-logo">GEO</div>
        <span style="font-size: 18px; font-weight: 900; color: #303133;">GEO分析</span>
      </div>
      <el-icon class="collapse-icon"><Fold /></el-icon>
    </div>

    <!-- 菜单区域 -->
    <div class="menu-scroll-container">
      <el-menu
          class="home-menu"
          :unique-opened="true"
          :default-active="activeIndex"
      >
        <!-- GEO分析 -->
        <div class="menu-main-title">
          <span>GEO分析</span>
          <el-icon class="group-arrow"><ArrowDown /></el-icon>
        </div>

        <!-- 无功能：无响应 -->
        <el-menu-item index="1-1" disabled>
          <el-icon><DataAnalysis /></el-icon>品牌分析
        </el-menu-item>

        <!-- 有功能：新开网站分析（已完成） -->
        <el-menu-item index="1-add" @click.stop.prevent="goToAnalysis">
          <el-icon><Aim /></el-icon>网站分析
        </el-menu-item>

        <!-- 无功能：无响应 -->
        <el-menu-item index="1-2" disabled>
          <el-icon><Document /></el-icon>网站分析报告
        </el-menu-item>

        <!-- GEO智能助手 -->
        <div class="menu-main-title" style="margin-top: 15px;">
          <span>GEO智能助手</span>
          <el-icon class="group-arrow"><ArrowDown /></el-icon>
        </div>

        <!-- ✅ 工作台：可点击回到 Workbench -->
        <el-menu-item index="2-1" @click="goToWorkbench">
          <el-icon><Monitor /></el-icon>工作台
        </el-menu-item>

        <!-- 知识库管理 -->
        <div class="menu-sub-title">
          <span>知识库管理</span>
          <el-icon class="sub-arrow"><ArrowDown /></el-icon>
        </div>

        <!-- ✅ 企业知识库：演示页 -->
        <el-menu-item index="3-1" @click.stop.prevent="go('/knowledge')">
          <el-icon><Collection /></el-icon>企业知识库
        </el-menu-item>

        <!-- 无功能：无响应 -->
        <el-menu-item index="3-2" disabled>
          <el-icon><Files /></el-icon>资源库
        </el-menu-item>

        <!-- ✅ 提示词库：演示页 -->
        <el-menu-item index="3-3" @click.stop.prevent="go('/prompt')">
          <el-icon><MagicStick /></el-icon>提示词库
        </el-menu-item>

        <!-- 无功能：无响应 -->
        <el-menu-item index="3-add" disabled>
          <el-icon><Cpu /></el-icon>指令库
        </el-menu-item>

        <!-- 内容创作 -->
        <div class="menu-sub-title">
          <span>内容创作</span>
          <el-icon class="sub-arrow"><ArrowDown /></el-icon>
        </div>

        <!-- ✅ 创作文章：演示页 -->
        <el-menu-item index="4-1" @click.stop.prevent="go('/article-create')">
          <el-icon><EditPen /></el-icon>创作文章
        </el-menu-item>

        <!-- 无功能：无响应 -->
        <el-menu-item index="4-2" disabled>
          <el-icon><CopyDocument /></el-icon>文章管理
        </el-menu-item>

        <!-- 媒体投喂 -->
        <div class="menu-sub-title">
          <span>媒体投喂</span>
          <el-icon class="sub-arrow"><ArrowDown /></el-icon>
        </div>

        <!-- ✅ 文章投喂：演示页 -->
        <el-menu-item index="5-1" @click.stop.prevent="go('/article-feed')">
          <el-icon><Promotion /></el-icon>文章投喂
        </el-menu-item>

        <!-- 数据报表 -->
        <div class="menu-sub-title">
          <span>数据报表</span>
          <el-icon class="sub-arrow"><ArrowDown /></el-icon>
        </div>

        <!-- ✅ 效果跟踪：演示页 -->
        <el-menu-item index="6-1" @click.stop.prevent="go('/result-track')">
          <el-icon><TrendCharts /></el-icon>效果跟踪
        </el-menu-item>
      </el-menu>
    </div>

    <!-- 底部用户信息（无功能：不绑定点击） -->
    <div class="user-profile">
      <el-avatar :size="32" style="background:#0056b3">武</el-avatar>
      <span style="margin-left:10px; font-size:14px; color:#333;">zdwh2ying</span>
      <el-icon class="logout-icon"><SwitchButton /></el-icon>
    </div>
  </el-aside>
</template>

<script setup>
import {
  Fold, ArrowDown, DataAnalysis, Aim, Document, Monitor,
  Collection, Files, MagicStick, Cpu, EditPen, CopyDocument,
  Promotion, TrendCharts, SwitchButton
} from '@element-plus/icons-vue'

import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// 路由 -> 菜单高亮（只跟随演示页面）
const activeIndex = computed(() => {
  const p = route.path
  if (p === '/' || p === '' || p.startsWith('/workbench')) return '2-1'
  if (p.startsWith('/knowledge')) return '3-1'
  if (p.startsWith('/prompt')) return '3-3'
  if (p.startsWith('/article-create')) return '4-1'
  if (p.startsWith('/article-feed')) return '5-1'
  if (p.startsWith('/result-track')) return '6-1'
  return '2-1'
})

// 跳转到工作台
const goToWorkbench = () => {
  router.push({ name: 'workbench' })
}

// 用于其他页面跳转（企业知识库，提示词库等）
const go = (path) => {
  if (route.path !== path) router.push(path)
}

const goToAnalysis = () => {
  window.open(window.location.origin + '/analysis', '_blank')
}
</script>

<style scoped>
.home-aside {
  background: white; border-right: none;
  box-shadow: 4px 0 16px rgba(0,0,0,0.04);
  display: flex; flex-direction: column;
  position: relative; z-index: 10; height: 100vh;
}
.logo-area {
  height: 64px; flex-shrink: 0; display: flex; justify-content: space-between; align-items: center; padding: 0 20px;
}
.logo-left { display: flex; align-items: center; }
.fake-logo {
  width: 32px; height: 32px; background: #409EFF; color: white; border-radius: 8px;
  display: flex; align-items: center; justify-content: center; font-weight: bold;
  margin-right: 10px; font-size: 12px;
}
.collapse-icon { font-size: 20px; color: #909399; cursor: pointer; }

.menu-scroll-container { flex: 1; overflow-y: auto; scrollbar-width: none; -ms-overflow-style: none; }
.menu-scroll-container::-webkit-scrollbar { display: none; }
.home-menu { border-right: none; padding-top: 10px; padding-bottom: 20px; }

.menu-main-title {
  padding: 25px 20px 15px 20px; display: flex; justify-content: space-between; align-items: center;
  font-size: 20px; font-weight: 900; color: #1a1a1a;
}
.menu-sub-title {
  display: flex; justify-content: space-between; align-items: center;
  padding: 15px 20px 10px 20px; padding-left: 30px;
  font-size: 15px; font-weight: bold; color: #909399;
}
.menu-sub-title:hover { color: #409EFF; }
.sub-arrow { font-size: 12px; transform: scale(0.9); opacity: 0.7; }
.group-arrow { font-size: 14px; color: #909399; font-weight: normal; }

.el-menu-item { font-size: 18px; height: 44px; line-height: 44px; margin: 6px 10px; border-radius: 6px; }
.el-menu-item .el-icon { margin-right: 8px; font-size: 20px; }

.el-menu-item.is-active { background-color: #e6f7ff !important; color: #409EFF !important; font-weight: bold; }

.el-menu-item.is-disabled { opacity: 1 !important; cursor: default !important; }

.user-profile {
  flex-shrink: 0; padding: 20px; display: flex; align-items: center;
  border-top: 1px solid #f0f0f0; background: white;
}
.logout-icon { margin-left: auto; cursor: default; }
</style>
