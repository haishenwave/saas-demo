<template>
  <div class="right-wrap">
    <!-- 步骤条 -->
    <div class="steps">
      <!-- 步骤1：上传资料 -->
      <div class="step" :class="getStepClass(1)">
        <div class="num" :class="{ 'done-num': stage !== 'upload', 'active-num': stage === 'upload' }">
          {{ stage !== 'upload' ? '✓' : '1' }}
        </div>
        <div class="label" :class="{ 'done-label': stage !== 'upload', 'active-label': stage === 'upload' }">
          上传资料
        </div>
        <div class="arrow" :class="{ 'active-arrow': stage === 'upload' }"></div>
      </div>

      <!-- 步骤2：解析企业信息 -->
      <div class="step" :class="getStepClass(2)">
        <div class="num" :class="{ 'done-num': isFinalStep, 'active-num': (stage === 'parsing' || (stage === 'done' && !isFinalStep)) }">
          {{ isFinalStep ? '✓' : '2' }}
        </div>
        <div class="label" :class="{ 'done-label': isFinalStep, 'active-label': (stage === 'parsing' || (stage === 'done' && !isFinalStep)) }">
          解析企业信息
        </div>
        <div class="arrow" :class="{ 'active-arrow': (stage === 'parsing' || (stage === 'done' && !isFinalStep)) }"></div>
      </div>

      <!-- 步骤3：查看企业信息 -->
      <div class="step last" :class="getStepClass(3)">
        <div class="num" :class="{ 'active-num': isFinalStep }">3</div>
        <div class="label" :class="{ 'active-label': isFinalStep }">查看企业信息</div>
      </div>
    </div>

    <!-- 阶段一：初始上传 -->
    <div v-if="stage === 'upload'" class="upload-stage">
      <div class="empty-icon-placeholder">
        <svg width="120" height="120" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
          <path fill="#e6e8eb" d="M192 128q-64 0-64 64v640q0 64 64 64h640q64 0 64-64V192q0-64-64-64H192zm-64 64h640v640H128V192zm160 352l128 160 192-224 224 288H192l96-224z"/>
        </svg>
      </div>
      <div class="empty-text">暂无企业信息，请先上传资料</div>
      <button class="btn-primary" @click="$emit('open-upload')">
        上传资料
      </button>
      <div class="import">
        <span>或</span>
        <span style="cursor: pointer; text-decoration: underline;" @click="$emit('open-upload')">从其他知识库导入</span>
      </div>
    </div>

    <!-- 阶段二：Loading 动画 -->
    <div v-else-if="stage === 'parsing'" class="generating">
      <div class="gen-title">企业资料生成中</div>
      <div class="gen-sub">正在解析上传内容并生成企业信息，请稍候…</div>
      <div class="spinner"></div>
    </div>

    <!-- 阶段二（下半场）：预览/编辑确认页 -->
    <div v-else-if="stage === 'done' && !isFinalStep" class="preview-view">
      <div class="brand-title">
        品牌词
        <span class="brand-desc">（用您公司的简称或全称，后续AI将会根据品牌词来跟踪您的上词效果）</span>
      </div>

      <!-- ✅ 修复：改为直接绑定并监听 input 事件，确保输入有效 -->
      <div class="brand-inputs">
        <el-input
            :model-value="safeGet(0)"
            @input="(val) => updateWord(0, val)"
            class="brand-input"
            placeholder="输入品牌词"
            clearable
        />
        <el-input
            :model-value="safeGet(1)"
            @input="(val) => updateWord(1, val)"
            class="brand-input"
            placeholder="输入品牌词"
            clearable
        />
        <el-input
            :model-value="safeGet(2)"
            @input="(val) => updateWord(2, val)"
            class="brand-input"
            placeholder="输入品牌词"
            clearable
        />
        <div class="brand-plus">＋</div>
      </div>

      <div class="split-line"></div>

      <div class="corp-title">企业知识库</div>

      <!-- 预览内容框 -->
      <div class="corp-box">
        <div class="content">
          <p>艾奇宝精油蚊香液是湖北艾奇宝蕲艾科技有限公司推出的一款以蕲艾精油为核心成分的天然驱蚊产品。</p>
          <p>该产品以被誉为“艾中之王”的蕲艾为原料，其精油含量和驱蚊活性成分远高于普通艾草。</p>
          <p>通过低温萃取技术提取的蕲艾精油，富含桉叶素、α-萜品烯醇等天然成分，这些成分能有效干扰蚊虫的嗅觉系统，使其难以定位人体。</p>
          <p>采用电加热缓释技术，通电后恒温挥发精油，实现无烟、无火的持续驱蚊。</p>
          <p>这种技术相比传统蚊香，避免了避蚊胺（DEET）等化学刺激物，气味淡雅，更适合在室内，特别是空调房内使用。</p>
          <p>用户反馈其驱蚊效果显著，同时散发出淡淡的草本清香，几乎无刺鼻感，夜间使用还有助于舒缓神经、改善睡眠。</p>
        </div>
      </div>

      <!-- 底部提示与按钮 -->
      <div class="bottom-action">
        <div class="hint-text">AI根据您知识库资料为您生成了企业信息，是否需要更新到企业知识库？</div>
        <button class="confirm-btn" @click="goToFinalStep">更新到企业知识库</button>
      </div>
    </div>

    <!-- 阶段三：最终查看页 -->
    <div v-else class="final-view">
      <!-- 头部：标题与按钮 -->
      <div class="final-header">
        <div class="final-title">艾草</div>
        <div class="final-btns">
          <button class="btn-outline">编辑</button>
          <button class="btn-blue">使用资料重新生成(10点/次)</button>
        </div>
      </div>

      <!-- 品牌词展示 -->
      <div class="final-brand-row">
        <span class="fb-label">品牌词：</span>
        <span class="fb-text">{{ brandWordsDisplay }}</span>
      </div>

      <!-- 结构化内容区域 -->
      <div class="final-main">
        <div class="final-content-wrap">
          <div class="collapse-header">
            <span>企业知识库</span>
            <span class="collapse-action">收起 ︿</span>
          </div>

          <div class="final-doc-content">
            <div class="doc-title">湖北艾奇宝蕲艾科技有限公司企业知识图谱</div>

            <div class="doc-h3">1.1 基础画像</div>
            <div class="doc-p">公司全称：湖北艾奇宝蕲艾科技有限公司</div>
            <div class="doc-p">统一社会信用代码/纳税人识别号：91420111MABMGGPT4G</div>

            <div class="doc-h3">1.3 产品与服务矩阵</div>
            <div class="doc-h4">设计与技术服务：</div>
            <div class="doc-p">产品单元列表：</div>
            <div class="doc-p indent">产品名称：艾奇宝精油蚊香液</div>
            <div class="doc-p indent">产品/服务定位：提供天然蕲艾精油驱蚊支持</div>
            <div class="doc-p indent">目标场景痛点：传统蚊香气味刺鼻、化学残留、明火隐患</div>

            <div class="doc-h4">关键差异化价值：</div>
            <div class="doc-p indent">[服务交付]：低温萃取蕲艾精油，确保有效成分活性。</div>

            <div class="doc-h4">核心功能：</div>
            <div class="doc-p indent">驱蚊服务：干扰蚊虫嗅觉系统 -> 实现隐形蚊帐效果</div>
            <div class="doc-p indent">健康服务：无烟无DEET -> 孕婴宠物适用</div>

            <div class="doc-h4">标杆案例与成果：</div>
            <div class="doc-p indent">案例客户/场景：家庭卧室、空调房</div>
            <div class="doc-p indent">实施效果：驱蚊效果显著，草本清香助眠</div>
          </div>
        </div>

        <!-- 右侧锚点侧边栏 -->
        <div class="right-anchor">
          <div class="anchor-line"></div>
          <div class="anchor-item active">
            <span class="dot"></span>
            <span>企业知识库</span>
          </div>
          <div class="anchor-item">
            <span class="dot hollow"></span>
            <span>产品知识文档</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  stage: { type: String, default: 'upload' },
  brandWords: { type: Array, default: () => ['', '', ''] },
})
const emit = defineEmits(['update:brandWords', 'open-upload'])

// 内部状态：是否进入最终查看页
const isFinalStep = ref(false)

// 监听 stage 变化，重置内部状态
watch(() => props.stage, (val) => {
  if (val !== 'done') {
    isFinalStep.value = false
  }
})

// 点击“更新到企业知识库”
const goToFinalStep = () => {
  isFinalStep.value = true
}

// ✅ 修复输入逻辑：安全获取数组元素
const safeGet = (index) => {
  if (!props.brandWords || !Array.isArray(props.brandWords)) return ''
  return props.brandWords[index] || ''
}

// ✅ 修复输入逻辑：更新单个词并 emit 整个数组
const updateWord = (index, value) => {
  const newArr = [...(props.brandWords || [])]
  // 补齐数组长度防止空洞
  while (newArr.length <= index) {
    newArr.push('')
  }
  newArr[index] = value
  emit('update:brandWords', newArr)
}

// 格式化展示品牌词 (Step 3 用)
const brandWordsDisplay = computed(() => {
  const words = props.brandWords.filter(w => w && w.trim())
  if (words.length === 0) return '艾草、艾奇宝'
  return words.join('、')
})

// 步骤条样式计算
const getStepClass = (stepNum) => {
  const s = props.stage
  const isFinal = isFinalStep.value

  // 步骤1：上传
  if (stepNum === 1) {
    return (s === 'upload') ? 'active' : 'done'
  }
  // 步骤2：解析
  if (stepNum === 2) {
    if (s === 'upload') return ''
    if (s === 'parsing') return 'active'
    if (s === 'done' && !isFinal) return 'active'
    return 'done'
  }
  // 步骤3：查看
  if (stepNum === 3) {
    if (isFinal) return 'active'
    return ''
  }
}
</script>

<style scoped>
.right-wrap{ flex:1; padding:26px 28px; display: flex; flex-direction: column; overflow: hidden; }

/* steps */
.steps{ width:820px; max-width:100%; margin:6px auto 0 auto; display:flex; background:#f3f4f6; border-radius:8px; overflow:hidden; flex-shrink: 0;}
.step{ flex:1; height:56px; display:flex; align-items:center; justify-content:center; font-weight:800; color:#606266; position:relative; }
.num{ width:26px; height:26px; border-radius:50%; background:#e5e7eb; display:flex; align-items:center; justify-content:center; margin-right:10px; font-weight:900; z-index: 2; }
.arrow{ position:absolute; right:-18px; border-top:28px solid transparent; border-bottom:28px solid transparent; border-left:18px solid #f3f4f6; z-index: 2; }
.last .arrow{ display:none; }

.step.active{ background:linear-gradient(90deg, rgba(168,130,255,0.18), rgba(47,107,255,0.10)); }
.active-num{ background:linear-gradient(180deg, #7b61ff, #2f6bff) !important; color:#fff; }
.active-label{ color:#2f6bff; }
.active-arrow{ border-left-color: rgba(47,107,255,0.10); }

.step.done .num.done-num{ background:rgba(47,107,255,0.15) !important; color:#2f6bff; }
.step.done .label.done-label{ color:#2f6bff; }

/* ------------------- Stage 1: Upload ------------------- */
.upload-stage{
  flex: 1; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:18px; min-height: 400px;
}
.empty-icon-placeholder { width: 140px; height: 140px; display: flex; align-items: center; justify-content: center; }
.empty-text{ font-weight:800; color:#303133; font-size: 18px;}
.btn-primary{
  width:140px; height:44px; border-radius:8px; background:#2f6bff; color:#fff; border:none;
  font-weight:900; cursor:pointer; font-size: 16px; box-shadow: 0 4px 12px rgba(47,107,255,0.3); transition: all 0.2s;
}
.btn-primary:hover{ opacity:.95; transform: translateY(-1px); }
.import{ display:flex; gap:8px; color:#909399; font-weight:600; font-size: 14px; margin-top: 6px; user-select:none; }

/* ------------------- Stage 2 (A): Generating ------------------- */
.generating{
  flex: 1; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; min-height: 400px;
}
.gen-title{ font-size:22px; font-weight:900; color:#303133; }
.gen-sub{ font-size:14px; color:#909399; }
.spinner{
  width:44px; height:44px; border-radius:50%; border:4px solid rgba(47,107,255,0.20);
  border-top-color: rgba(47,107,255,0.95); animation: spin 1s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ------------------- Stage 2 (B): Preview & Confirm ------------------- */
.preview-view{ padding: 22px 6px 0 6px; flex: 1; overflow-y: auto; display: flex; flex-direction: column; }
.brand-title{ font-size:18px; font-weight:900; color:#303133; }
.brand-desc{ font-size:13px; font-weight:600; color:#909399; margin-left:8px; }
.brand-inputs{ margin-top:14px; display:flex; align-items:center; gap:18px; }
.brand-input{ width:240px; }
.brand-plus{ color:#2f6bff; font-size:22px; font-weight:900; user-select:none; cursor: pointer;}
.split-line{ margin:24px 0; height:1px; background: rgba(0,0,0,0.06); }
.corp-title{ font-size:18px; font-weight:900; color:#303133; margin-bottom:10px; }

.corp-box{
  min-height:300px; max-height: 400px; overflow-y: auto;
  border:1px solid rgba(0,0,0,0.06); border-radius:10px; background:#fff;
  padding:18px; box-sizing:border-box;
}
.content p { margin-bottom: 12px; font-size: 16px; color: #303133; line-height: 1.8; text-align: justify; }

/* 底部操作区 */
.bottom-action {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding-bottom: 20px;
}
.hint-text { color: #909399; font-size: 14px; font-weight: 500; }
.confirm-btn {
  background: #2f6bff; color: white; border: none; padding: 10px 24px;
  border-radius: 6px; font-size: 16px; font-weight: 700; cursor: pointer;
  box-shadow: 0 4px 10px rgba(47, 107, 255, 0.25);
  transition: transform 0.1s;
}
.confirm-btn:hover { transform: scale(1.02); }

/* ------------------- Stage 3: Final View ------------------- */
.final-view {
  flex: 1; display: flex; flex-direction: column; padding-top: 20px; overflow: hidden;
}
.final-header {
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;
}
.final-title { font-size: 24px; font-weight: 900; color: #303133; }
.final-btns { display: flex; gap: 12px; }
.btn-outline {
  background: #fff; border: 1px solid #2f6bff; color: #2f6bff;
  padding: 8px 20px; border-radius: 4px; font-weight: 700; cursor: pointer;
}
.btn-blue {
  background: #2f6bff; border: 1px solid #2f6bff; color: #fff;
  padding: 8px 20px; border-radius: 4px; font-weight: 700; cursor: pointer;
}

.final-brand-row { margin-bottom: 16px; font-size: 16px; }
.fb-label { font-weight: 900; color: #303133; }
.fb-text { color: #606266; }

.final-main {
  flex: 1; display: flex; gap: 20px; border-top: 1px solid #f0f0f0; padding-top: 16px; overflow: hidden;
}

.final-content-wrap {
  flex: 1; background: #f8f9fb; border-radius: 4px; padding: 0; overflow-y: auto;
}
.collapse-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 12px 16px; cursor: pointer; user-select: none;
  font-weight: 700; color: #303133; font-size: 16px;
  border-bottom: 1px solid #eee;
}
.collapse-action { color: #909399; font-size: 13px; }

.final-doc-content {
  padding: 20px 24px; font-family: sans-serif;
}
.doc-title { font-size: 18px; font-weight: 800; margin-bottom: 16px; color: #303133; }
.doc-h3 { font-size: 16px; font-weight: 700; margin: 16px 0 8px 0; color: #606266; }
.doc-h4 { font-size: 15px; font-weight: 700; margin: 12px 0 6px 0; color: #303133; }
.doc-p { font-size: 14px; line-height: 1.8; color: #606266; margin-bottom: 4px; }
.indent { text-indent: 1em; }

.right-anchor {
  width: 120px; padding-top: 10px; position: relative;
}
.anchor-line {
  position: absolute; left: 6px; top: 18px; bottom: 20px; width: 2px; background: #e4e7ed; z-index: 1;
}
.anchor-item {
  position: relative; display: flex; align-items: center; gap: 10px;
  margin-bottom: 24px; cursor: pointer; z-index: 2;
  font-size: 13px; color: #909399;
}
.anchor-item.active { color: #2f6bff; font-weight: 700; }
.dot {
  width: 8px; height: 8px; border-radius: 50%; background: #2f6bff;
  margin-left: 3px; border: 2px solid #fff; box-sizing: content-box;
}
.dot.hollow {
  background: #fff; border: 2px solid #909399;
}
</style>