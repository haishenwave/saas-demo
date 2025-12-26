<template>
  <el-aside width="240px" class="home-aside">
    <!-- Logo 区域 -->
    <div class="logo-area">
      <div class="logo-left">
        <div class="fake-logo">GEO</div>
        <span style="font-size: 18px; font-weight: 900; color: #303133;">GEO分析</span>
      </div>
      <svg class="menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M21 3C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H21ZM15 5H4V19H15V5ZM20 5H17V19H20V5Z"></path></svg>
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
          <svg class="menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M2.00488 19H22.0049V21H2.00488V19ZM2.00488 5L7.00488 8.5L12.0049 2L17.0049 8.5L22.0049 5V17H2.00488V5ZM4.00488 8.84131V15H20.0049V8.84131L16.5854 11.2349L12.0049 5.28024L7.42435 11.2349L4.00488 8.84131Z"></path></svg>
          品牌分析
        </el-menu-item>

        <!-- 有功能：新开网站分析（已完成） -->
        <el-menu-item index="1-add" @click.stop.prevent="goToAnalysis">
          <svg class="menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17 2H20C20.5523 2 21 2.44772 21 3V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V3C3 2.44772 3.44772 2 4 2H7V0H9V2H15V0H17V2ZM17 4V6H15V4H9V6H7V4H5V20H19V4H17ZM7 8H17V10H7V8ZM7 12H17V14H7V12Z"></path></svg>
          网站分析
        </el-menu-item>

        <!-- 无功能：无响应 -->
        <el-menu-item index="1-2" disabled>
          <svg class="menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3.08697 9H20.9134C21.4657 9 21.9134 9.44772 21.9134 10C21.9134 10.0277 21.9122 10.0554 21.9099 10.083L21.0766 20.083C21.0334 20.6013 20.6001 21 20.08 21H3.9203C3.40021 21 2.96695 20.6013 2.92376 20.083L2.09042 10.083C2.04456 9.53267 2.45355 9.04932 3.00392 9.00345C3.03155 9.00115 3.05925 9 3.08697 9ZM4.84044 19H19.1599L19.8266 11H4.17377L4.84044 19ZM13.4144 5H20.0002C20.5525 5 21.0002 5.44772 21.0002 6V7H3.00017V4C3.00017 3.44772 3.44789 3 4.00017 3H11.4144L13.4144 5Z"></path></svg>
          网站分析报告
        </el-menu-item>

        <!-- GEO智能助手 -->
        <div class="menu-main-title" style="margin-top: 15px;">
          <span>GEO智能助手</span>
          <el-icon class="group-arrow"><ArrowDown /></el-icon>
        </div>

        <!-- ✅ 工作台：可点击回到 Workbench -->
        <el-menu-item index="2-1" @click="goToWorkbench">
          <svg class="menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19H18V9.15745L12 3.7029L6 9.15745V19ZM19 21H5C4.44772 21 4 20.5523 4 20V11L1 11L11.3273 1.6115C11.7087 1.26475 12.2913 1.26475 12.6727 1.6115L23 11L20 11V20C20 20.5523 19.5523 21 19 21ZM7.5 13H9.5C9.5 14.3807 10.6193 15.5 12 15.5C13.3807 15.5 14.5 14.3807 14.5 13H16.5C16.5 15.4853 14.4853 17.5 12 17.5C9.51472 17.5 7.5 15.4853 7.5 13Z" ></path></svg>
          工作台
        </el-menu-item>

        <!-- 知识库管理 -->
        <div class="menu-sub-title">
          <span>知识库管理</span>
          <el-icon class="sub-arrow"><ArrowDown /></el-icon>
        </div>

        <!-- ✅ 企业知识库：演示页 -->
        <el-menu-item index="3-1" @click.stop.prevent="go('/knowledge')">
          <svg class="menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5 12.5C5 12.8134 5.46101 13.3584 6.53047 13.8931C7.91405 14.5849 9.87677 15 12 15C14.1232 15 16.0859 14.5849 17.4695 13.8931C18.539 13.3584 19 12.8134 19 12.5V10.3287C17.35 11.3482 14.8273 12 12 12C9.17273 12 6.64996 11.3482 5 10.3287V12.5ZM19 15.3287C17.35 16.3482 14.8273 17 12 17C9.17273 17 6.64996 16.3482 5 15.3287V17.5C5 17.8134 5.46101 18.3584 6.53047 18.8931C7.91405 19.5849 9.87677 20 12 20C14.1232 20 16.0859 19.5849 17.4695 18.8931C18.539 18.3584 19 17.8134 19 17.5V15.3287ZM3 17.5V7.5C3 5.01472 7.02944 3 12 3C16.9706 3 21 5.01472 21 7.5V17.5C21 19.9853 16.9706 22 12 22C7.02944 22 3 19.9853 3 17.5ZM12 10C14.1232 10 16.0859 9.58492 17.4695 8.89313C18.539 8.3584 19 7.81342 19 7.5C19 7.18658 18.539 6.6416 17.4695 6.10687C16.0859 5.41508 14.1232 5 12 5C9.87677 5 7.91405 5.41508 6.53047 6.10687C5.46101 6.6416 5 7.18658 5 7.5C5 7.81342 5.46101 8.3584 6.53047 8.89313C7.91405 9.58492 9.87677 10 12 10Z"></path></svg>
          企业知识库
        </el-menu-item>

        <!-- 无功能：无响应 -->
        <el-menu-item index="3-2" disabled>
          <svg class="menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3 21C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H10.4142L12.4142 5H20C20.5523 5 21 5.44772 21 6V9H19V7H11.5858L9.58579 5H4V16.998L5.5 11H22.5L20.1894 20.2425C20.0781 20.6877 19.6781 21 19.2192 21H3ZM19.9384 13H7.06155L5.56155 19H18.4384L19.9384 13Z"></path></svg>
          资源库
        </el-menu-item>

        <!-- ✅ 提示词库：演示页 -->
        <el-menu-item index="3-3" @click.stop.prevent="go('/prompt')">
          <svg class="menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19.5 4.7832V7.6709L22 9.11426V14.8867L19.499 16.3311L19.5 19.2178L14.5 22.1045L12 20.6611L9.5 22.1045L4.5 19.2178V16.3311L2 14.8877L2.00098 9.11328L4.5 7.66992V4.78418L9.5 1.89746L11.999 3.34082L14.501 1.89648L19.5 4.7832ZM13 5.07227V7H11V5.07324L9.5 4.20703L6.49902 5.93848V8.8252L4 10.2676V13.7334L6.5 15.1768V18.0635L9.5 19.7959L11 18.9287V17H13V18.9297L14.5 19.7959L17.5 18.0625V15.1768L20 13.7324V10.2695L17.499 8.8252L17.5 5.9375L14.501 4.20605L13 5.07227ZM14.2646 13.1602C14.3529 12.9473 14.6472 12.9473 14.7354 13.1602L14.8623 13.4648C15.0783 13.986 15.4807 14.4027 15.9873 14.6279L16.3457 14.7871C16.5511 14.8784 16.5511 15.1773 16.3457 15.2686L15.9658 15.4375C15.4721 15.6571 15.0761 16.0586 14.8564 16.5625L14.7334 16.8447C14.6432 17.0517 14.3569 17.0517 14.2666 16.8447L14.1436 16.5625C13.9239 16.0586 13.5279 15.6571 13.0342 15.4375L12.6543 15.2686C12.4489 15.1773 12.4489 14.8784 12.6543 14.7871L13.0127 14.6279C13.5193 14.4027 13.9217 13.986 14.1377 13.4648L14.2646 13.1602ZM9.58789 7.7793C9.74239 7.40671 10.2577 7.4067 10.4121 7.7793L10.6338 8.31445C11.0118 9.22695 11.7161 9.95624 12.6025 10.3506L13.2305 10.6289C13.5899 10.7887 13.5897 11.3117 13.2305 11.4717L12.5654 11.7676C11.7013 12.152 11.0086 12.8548 10.624 13.7373L10.4082 14.2324C10.2504 14.5948 9.74973 14.5948 9.5918 14.2324L9.37598 13.7373C8.99143 12.8548 8.29875 12.152 7.43457 11.7676L6.76953 11.4717C6.41033 11.3117 6.41022 10.7887 6.76953 10.6289L7.39746 10.3506C8.2839 9.95624 8.98832 9.22697 9.36621 8.31445L9.58789 7.7793Z"></path></svg>
          提示词库
        </el-menu-item>

        <!-- 无功能：无响应 -->
        <el-menu-item index="3-add" disabled>
          <svg class="menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7 5V2C7 1.44772 7.44772 1 8 1H16C16.5523 1 17 1.44772 17 2V5H21C21.5523 5 22 5.44772 22 6V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V6C2 5.44772 2.44772 5 3 5H7ZM20 13H4V19H20V13ZM20 7H4V11H7V9H9V11H15V9H17V11H20V7ZM9 3V5H15V3H9Z"></path></svg>
          指令库
        </el-menu-item>

        <!-- 内容创作 -->
        <div class="menu-sub-title">
          <span>内容创作</span>
          <el-icon class="sub-arrow"><ArrowDown /></el-icon>
        </div>

        <!-- ✅ 创作文章：演示页 -->
        <el-menu-item index="4-1" @click.stop.prevent="go('/article-create')">
          <svg class="menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4.7134 7.12811L4.46682 7.69379C4.28637 8.10792 3.71357 8.10792 3.53312 7.69379L3.28656 7.12811C2.84706 6.11947 2.05545 5.31641 1.06767 4.87708L0.308047 4.53922C-0.102682 4.35653 -0.102682 3.75881 0.308047 3.57612L1.0252 3.25714C2.03838 2.80651 2.84417 1.97373 3.27612 0.930828L3.52932 0.319534C3.70578 -0.106511 4.29417 -0.106511 4.47063 0.319534L4.72382 0.930828C5.15577 1.97373 5.96158 2.80651 6.9748 3.25714L7.69188 3.57612C8.10271 3.75881 8.10271 4.35653 7.69188 4.53922L6.93228 4.87708C5.94451 5.31641 5.15288 6.11947 4.7134 7.12811ZM6.33421 15.8154C6.51032 15.233 6.7072 14.6562 6.93912 14.0327C8.99484 8.50636 12.4197 5.08172 18.0129 4.21479C17.5 5.35838 17.0151 6.15301 16.5858 6.58237C16.2521 6.91603 15.9185 7.24993 15.5848 7.58407L14.1721 8.99878L15.6279 10.4535C14.4976 12.5384 12.2652 14.1979 9.75193 14.512C8.43544 14.6766 7.29345 15.1188 6.33421 15.8154ZM18 9.99658L17 8.99728C17.3331 8.66372 17.6662 8.33039 18.0027 7.99391C19.0018 6.99303 20.0009 4.99392 21 1.99658C6.31105 1.99658 4.08854 15.422 3.06361 21.6132C3.0419 21.7443 3.02074 21.8722 3 21.9966H4.99824C5.66421 18.6635 7.33146 16.8301 10 16.4966C14 15.9966 17 12.9966 18 9.99658Z"></path></svg>
          创作文章
        </el-menu-item>

        <!-- 无功能：无响应 -->
        <el-menu-item index="4-2" disabled>
          <svg class="menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 22H4C3.44772 22 3 21.5523 3 21V3C3 2.44772 3.44772 2 4 2H20C20.5523 2 21 2.44772 21 3V21C21 21.5523 20.5523 22 20 22ZM19 20V4H5V20H19ZM7 6H11V10H7V6ZM7 12H17V14H7V12ZM7 16H17V18H7V16ZM13 7H17V9H13V7Z"></path></svg>
          文章管理
        </el-menu-item>

        <!-- 媒体投喂 -->
        <div class="menu-sub-title">
          <span>媒体投喂</span>
          <el-icon class="sub-arrow"><ArrowDown /></el-icon>
        </div>

        <!-- ✅ 文章投喂：演示页 -->
        <el-menu-item index="5-1" @click.stop.prevent="go('/article-feed')">
          <svg class="menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M21.7267 2.95694L16.2734 22.0432C16.1225 22.5716 15.7979 22.5956 15.5563 22.1126L11 13L1.9229 9.36919C1.41322 9.16532 1.41953 8.86022 1.95695 8.68108L21.0432 2.31901C21.5716 2.14285 21.8747 2.43866 21.7267 2.95694ZM19.0353 5.09647L6.81221 9.17085L12.4488 11.4255L15.4895 17.5068L19.0353 5.09647Z"></path></svg>
          文章投喂
        </el-menu-item>

        <!-- 数据报表 -->
        <div class="menu-sub-title">
          <span>数据报表</span>
          <el-icon class="sub-arrow"><ArrowDown /></el-icon>
        </div>

        <!-- ✅ 效果跟踪：演示页 -->
        <el-menu-item index="6-1" @click.stop.prevent="go('/result-track')">
          <svg class="menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3V19H21V21H3V3H5ZM20.2929 6.29289L21.7071 7.70711L16 13.4142L13 10.415L8.70711 14.7071L7.29289 13.2929L13 7.58579L16 10.585L20.2929 6.29289Z"></path></svg>
          效果跟踪
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
.menu-icon {
  width: 25px; /* 调整大小 */
  height: 25px;
  margin-right: 10px; /* 图标和文字的间距 */
  fill: currentColor; /* 让图标颜色跟随文字颜色变化 */
}
</style>
