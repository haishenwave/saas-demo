<template>
  <el-container class="analysis-container">

    <!-- 1. 侧边栏 -->
    <AnalysisSidebar
        :historyList="sidebarHistory"
        :activeIndex="activeHistoryIndex"
        :isAnalyzing="isAnalyzing"
        @reset="resetTask"
        @selectHistory="activeHistoryIndex = $event"
    />

    <!-- 2. 主体内容 -->
    <el-main class="analysis-main">

      <!-- 场景 A: 配置界面 -->
      <!-- 这里的 handleStart 不再需要接收 payload，因为数据是假的 -->
      <SetupView
          v-if="!isAnalyzing"
          @start="startAnalysis"
      />

      <!-- 场景 B: 动态执行界面 -->
      <!-- 这里的 url 和 models 传进去的是写死的固定值 -->
      <RunningView
          v-else
          :url="fixedUrl"
          :models="fixedModels"
          :time="actionTime"
      />

    </el-main>
  </el-container>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import AnalysisSidebar from '@/components/analysis/AnalysisSidebar.vue'
import SetupView from '@/components/analysis/SetupView.vue'
import RunningView from '@/components/analysis/RunningView.vue'

const isAnalyzing = ref(false)
const actionTime = ref('')

// === ★★★ 核心修改：定义固定的剧本数据 ★★★ ===
const fixedUrl = ref('http://www.aqbqa.com/portal/list/index/id/32.html')

const fixedModels = ref([
  { label: 'DeepSeek', value: 'deepseek' },
  { label: '豆包', value: 'doubao' },
  { label: '通义千问', value: 'tongyi' },
  { label: '腾讯元宝', value: 'tencent' },
  { label: '文心一言', value: 'wenxin' }
])

//  侧边栏“全量历史”（包含你要隐藏/显示的那条）
const baseHistory = [
  '公司简介--某省XX...',
  '某地艾草种植基地...',
  '艾草精油产品的研...',
  '夏季艾草驱蚊产品...',
  '企业合作--艾草原...',
]

//  根据是否 analyzing 决定是否显示第一条
const sidebarHistory = computed(() => {
  return isAnalyzing.value ? baseHistory : baseHistory.slice(1)
})

//  active 下标：未切换时不高亮；切换后高亮“公司简介...”
//  注意：未切换时列表少了第一条，因此 activeIndex 设为 -1
const activeHistoryIndex = ref(-1)

watch(isAnalyzing, (val) => {
  if (val) {
    // 切换后：第一条出现，并设为 active（index=0）
    activeHistoryIndex.value = 0
  } else {
    // 复位：不高亮
    activeHistoryIndex.value = -1
  }
})

const getCurrentTime = () => {
  const now = new Date()
  const pad = (n) => n.toString().padStart(2, '0')
  return `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
}

// 开始分析：不再接收参数，直接运行剧本
const startAnalysis = () => {
  // 1. 记录当前点击时间
  actionTime.value = getCurrentTime()

  // 2. 切换界面
  isAnalyzing.value = true
}

const resetTask = () => {
  isAnalyzing.value = false
}
</script>

<style scoped>
.analysis-container {
  height: 100vh;
  background: linear-gradient(to bottom, #dbeafe 0%, #f7f9fc 40%, #f7f9fc 100%);
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
}
.analysis-main { padding: 40px 100px; display: flex; flex-direction: column; position: relative; }
</style>