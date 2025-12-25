<template>
  <div class="setup-view fade-in">

    <!-- 欢迎语区域 -->
    <div class="welcome-section">
      <h1 class="welcome-title" style="margin-bottom: 60px">
        您好，武汉第二营销中心 <br>
        想通过AI营销推广什么产品？
      </h1>

      <div class="pill-tabs">
        <div class="pill-btn active"><el-icon><Aim /></el-icon> 网站分析</div>
        <div class="pill-btn"><el-icon><Monitor /></el-icon> GEO智能助手</div>
        <div class="pill-btn"><el-icon><Service /></el-icon> GEO运营托管服务</div>
      </div>
    </div>

    <!-- 核心输入卡片 (容器变宽) -->
    <div class="input-card">
      <div class="input-row">
        <span class="tag-label">网站分析</span>
        <span class="hint-text">请输入您的“期望推广的大模型”，例如</span>

        <el-dropdown trigger="click" @command="handleSelectModel">
          <div class="custom-select-trigger">
            <span>{{ selectedModels.length === 0 ? '请选择模型' : '已选择' }}</span>
            <el-icon><ArrowDown /></el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="item in availableModels" :key="item.value" :command="item">{{ item.label }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <div class="selected-tags-area">
          <div v-for="(tag, index) in selectedModels" :key="tag.value" class="model-tag">
            <span>{{ tag.label }}</span>
            <el-icon class="tag-close-btn" @click="removeModel(index)"><Close /></el-icon>
          </div>
        </div>

        <div class="mini-plus-btn"><el-icon><Plus /></el-icon></div>
      </div>

      <div class="input-row" style="margin-top: 15px;">
        <span class="hint-text">请输入您的“官网信息”，例如</span>
        <div class="url-input-wrapper">
          <el-input v-model="url" placeholder="https://www.marketingforce.com/" class="no-border-input" clearable />
        </div>
      </div>

      <div class="send-action-area">
        <div class="points-tip">
          剩余GEO权益点：<span class="blue-num">42690.5</span> 点
        </div>
        <div class="send-btn" @click="handleStart">
          <el-icon color="white" :size="20"><Position /></el-icon>
        </div>
      </div>
    </div>

    <div class="disclaimer">
      内容由AI生成 <span class="blue-link">《免责声明》</span>
    </div>

    <div class="preview-section">
      <el-divider content-position="center">GEO效果预览</el-divider>
      <div class="preview-image-wrap">
        <img class="preview-image" :src="previewImageSrc" alt="GEO效果预览" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Aim, Monitor, Service, ArrowDown, Plus, Close, Position, Connection, Camera, Microphone } from '@element-plus/icons-vue'
import previewNanoPng from '@/assets/Nanoforview.png'
const previewImageSrc = ref(previewNanoPng)
const emit = defineEmits(['start'])

const url = ref('')
const selectedModels = ref([])

const allAiModels = [
  { label: 'DeepSeek', value: 'deepseek' },
  { label: '豆包', value: 'doubao' },
  { label: '通义千问', value: 'tongyi' },
  { label: '腾讯元宝', value: 'tencent' },
  { label: '文心一言', value: 'wenxin' },
  { label: '纳米AI', value: 'nano' },
  { label: 'Kimi', value: 'kimi' }
]

const availableModels = computed(() => {
  return allAiModels.filter(item => {
    return !selectedModels.value.find(selected => selected.value === item.value)
  })
})

const handleSelectModel = (item) => selectedModels.value.push(item)
const removeModel = (index) => selectedModels.value.splice(index, 1)

const handleStart = () => {
  emit('start')
}
</script>

<style scoped>
.fade-in { animation: fadeIn 0.5s ease; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

/* === 欢迎语区域 (加宽) === */
.welcome-section {
  text-align: left;
  margin-bottom: 20px;
  width: 100%;
  /* 修改：从 900px 增加到 1200px */
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}
.welcome-title { font-size: 30px; font-weight: 900; color: #1a1a1a; line-height: 1.4; margin-bottom: 10px; }

.pill-tabs { display: flex; justify-content: flex-start; gap: 15px; margin-bottom: 30px; }
.pill-btn { padding: 8px 20px; border-radius: 10px; border: 1px solid #dcdfe6; background: white; color: #606266; cursor: pointer; display: flex; align-items: center; gap: 5px;font-size: 18px; font-weight: bolder;}
.pill-btn.active { color: #0f2a4a; font-weight: 900; border: 2px solid transparent; background-image: linear-gradient(90deg, #ffe0f0 0%, #e0f2ff 100%), linear-gradient(90deg, #337ecc 0%, #c71585 100%); background-clip: padding-box, border-box; background-origin: padding-box, border-box; box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
.pill-btn.active .el-icon { color: #0f2a4a; }

/* === 核心输入卡片 (加宽) === */
.input-card {
  background: white; border-radius: 16px; padding: 30px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05); border: 1px solid #ebeef5;
  position: relative;
  width: 100%;

  /* 修改：从 900px 增加到 1200px */
  max-width: 1200px;
  margin: 0 auto;
}

.input-row { display: flex; align-items: center; font-size: 14px; }
.tag-label { background: #e6f7ff; color: #0056b3; padding: 2px 8px; border-radius: 4px; font-size: 15px; margin-right: 10px; }
.hint-text { color: #606266; margin-right: 10px; font-size: 15px; font-weight: bolder;}
.plus-mini-btn { margin-left: 5px; background: #e6f7ff; border: none; color: #0056b3; }

/* 输入框保持 350px */
.url-input-wrapper { background: #f2f3f5; padding: 0 10px; border-radius: 4px; flex: 1; max-width: 350px; }
:deep(.no-border-input .el-input__wrapper) { background-color: transparent !important; box-shadow: none !important; }

.send-action-area { display: flex; align-items: center; justify-content: flex-end; margin-top: 30px; }
.points-tip { font-size: 15px; color: #909399; margin-right: 15px; }
.blue-num { color: #0056b3; font-weight: 900; font-family: Arial, sans-serif; font-size: 15px; }
.send-btn { width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, #409EFF, #1890ff); display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 10px rgba(64,158,255,0.4); transition: transform 0.2s; }
.send-btn:hover { transform: scale(1.05); }

.selected-tags-area { display: flex; gap: 8px; margin-left: 8px; flex-wrap: wrap; }
.model-tag { background: #e6f7ff; color: #0056b3; font-size: 12px; font-weight: bold; padding: 4px 8px; border-radius: 4px; display: flex; align-items: center; gap: 4px; border: 1px solid rgba(0, 86, 179, 0.1); }
.tag-close-btn { cursor: pointer; font-size: 15px; border-radius: 50%; padding: 1px; }
.tag-close-btn:hover { background-color: rgba(0, 86, 179, 0.1); }
.custom-select-trigger { background: #e6f7ff; color: #0056b3; padding: 5px 10px; border-radius: 4px; display: flex; align-items: center; gap: 5px; font-size: 15px; cursor: pointer; font-weight: bold; user-select: none; }
.custom-select-trigger.disabled { background: #f5f7fa; color: #c0c4cc; cursor: not-allowed; }

.disclaimer { text-align: center; color: #ccc; font-size: 15px; margin-top: 15px; }
.blue-link { color: #0056b3; cursor: pointer; font-weight: bold; }

/* === 预览区域 (加宽) === */
.preview-section { margin-top: 40px; }
.mock-browser {
  background: white; border-radius: 8px; padding: 20px; border: 1px solid #eee; min-height: 400px;
  margin: 0 auto;
  /* 修改：同步加宽到 1200px */
  width: 100%; max-width: 1200px;
}
.preview-image-wrap{
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  border-radius: 8px;
  border: none;
  padding: 20px;
}
.preview-image{
  width: 100%;
  height: auto;
  display: block;
  border-radius: 6px;
}
.ai-tags .active { color: #333; font-weight: bold; border-bottom: 2px solid #333; padding-bottom: 2px; }
.case-study h3 { font-size: 18px; font-weight: bold; margin-bottom: 10px; }
.case-study .desc { color: #666; font-size: 14px; line-height: 1.6; margin-bottom: 20px; }
.point-item { margin-bottom: 15px; }
.point-item h4 { font-weight: bold; margin-bottom: 5px; font-size: 15px; }
.point-item p { color: #666; font-size: 14px; line-height: 1.6; }
</style>