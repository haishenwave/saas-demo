<template>
  <el-dialog
      v-model="visible"
      class="upload-dialog"
      header-class="upload-dialog-header"
      width="84%"
      top="6vh"
      :close-on-click-modal="true"
      :close-on-press-escape="true"
      :show-close="true"
      align-center
  >
    <template #header>
      <div class="dlg-title">
        <span class="blue-bar"></span>
        <span>上传资料</span>
      </div>
    </template>

    <!-- 顶部四卡 -->
    <div class="mode-row">
      <div class="mode-card active" @click="triggerFilePick">
        <div class="mode-text">
        <div class="mode-title-line">
        <div class="mode-icon">⬆</div>

          <div class="mode-main">导入本地文档</div>
        </div>
        </div>
      </div>

      <div class="mode-card disabled">
        <div class="mode-text">
        <div class="mode-title-line">
        <div class="mode-icon">✎</div>
          <div class="mode-main">输入文本</div>
        </div>
        </div>
      </div>

      <div class="mode-card disabled">
        <div class="mode-text">
        <div class="mode-title-line">
        <div class="mode-icon">⌁</div>
          <div class="mode-main">网址解析</div>
        </div>
          <div class="mode-sub">解析单个网址内容，支持周期自动更新</div>
        </div>
      </div>

      <div class="mode-card disabled">
        <div class="mode-text">
        <div class="mode-title-line">
        <div class="mode-icon">⬆</div>
          <div class="mode-main">整站导入</div>
        </div>
          <div class="mode-sub">整站内容解析，支持批量替换导入</div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">选择资料类型</div>
      <el-radio-group v-model="docType" class="radio-row">
        <el-radio value="default">默认分类</el-radio>
        <el-radio value="company">企业资料</el-radio>
        <el-radio value="product">产品资料</el-radio>
      </el-radio-group>
    </div>

    <div class="section">
      <div class="section-title">上传文件</div>

      <div class="drop-area" @click="triggerFilePick">
        <div class="cloud-icon">☁</div>
        <div class="drop-text">
          <div class="drop-main">选择文件或拖动文件至输入框</div>
        </div>

        <div v-if="selectedFile" class="file-chip">
          <span class="file-name">{{ selectedFile.fullName }}</span>

        </div>
      </div>

      <input ref="fileInputRef" class="hidden-file" type="file" @change="onFileChange" />
    </div>

    <template #footer>
      <!-- ✅ footer 按钮居中 -->
      <div class="footer-center">
        <button class="save-btn" type="button" @click="onSave">保存到知识库</button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue', 'saved'])

const visible = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
})

const docType = ref('default')

const fileInputRef = ref(null)
const rawFile = ref(null)
const onSave = () => {
  emit('update:modelValue', false) // 关闭弹窗
  emit('saved')                    // 通知外面开始解析流程
}
const selectedFile = computed(() => {
  if (!rawFile.value) return null
  const name = rawFile.value.name || ''
  const lastDot = name.lastIndexOf('.')
  const ext = lastDot > -1 ? name.slice(lastDot + 1) : ''
  return { fullName: name, ext: ext ? `.${ext}` : '' }
})

const triggerFilePick = () => {
  fileInputRef.value?.click()
}

const onFileChange = (e) => {
  const files = e?.target?.files
  if (!files || files.length === 0) return
  rawFile.value = files[0]
}
</script>

<style scoped>
:deep(.upload-dialog .el-dialog) {
  border-radius: 10px;
  overflow: hidden;
}

.dlg-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 25px;
  font-weight: 800;
  color: #303133;
}
.blue-bar {
  width: 4px;
  height: 18px;
  background: #2f6bff;
  border-radius: 2px;
}

/* 顶部四卡 */
.mode-row {
  display: flex;
  gap: 18px;
  padding: 10px 6px 8px 6px;
}

.mode-card {
  flex: 1;
  min-height: 84px;
  border-radius: 10px;
  background: #f7f8fa;
  display: flex;
  align-items: center;    /* ✅ 水平居中 */
  justify-content: center;/* ✅ 垂直居中 */

  padding: 16px 10px;
  user-select: none;
  text-align: center;     /* ✅ 文案居中 */
}

.mode-title-line {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

/* 图标样式保持即可 */
.mode-icon {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  background: rgba(47, 107, 255, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  color: #2f6bff;
}

.mode-text {
  display: flex;
  flex-direction: column;
  align-items: center;  /* ✅ 让小字也居中 */
  justify-content: center;
  gap: 6px;
}

.mode-main {
  font-weight: 900;
  color: #303133;
  line-height: 1.1;
  font-size: 20px;
  white-space: nowrap;
}

.mode-sub {
  font-size: 15px;
  color: #909399;
  line-height: 1.3;
  text-align: center;
}

.mode-card.active {
  background: rgba(47, 107, 255, 0.06);
  border: 1px solid rgba(47, 107, 255, 0.55);
  cursor: pointer;
}
.mode-card.disabled {
  cursor: default;
}

/* 分段 */
.section {
  padding: 6px 6px 0 6px;
}
.section-title {
  font-weight: 800;
  color: #303133;
  margin: 14px 0 10px 0;
  font-size: 20px;
}
.radio-row {
  padding-left: 6px;
}
:deep(.el-radio__label) {
  font-size: 18px; /* 你想要的大小 */
}
/* 上传区域 */
.drop-area {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  height: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  background: #fff;
  cursor: pointer;
  position: relative;
}
.cloud-icon {
  font-size: 28px;
  color: #2f6bff;
}
.drop-text {
  text-align: center;
}
.drop-main {
  font-weight: 800;
  color: #303133;
  font-size: 20px;
}

.file-chip {
  position: absolute;
  bottom: 18px;
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 10px 12px;
  border-radius: 10px;
  background: rgba(47, 107, 255, 0.06);
  border: 1px solid rgba(47, 107, 255, 0.18);
}
.file-name {
  font-weight: 800;
  color: #303133;
  max-width: 520px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 20px;
}

.hidden-file {
  display: none;
}

/* ✅ footer 按钮居中 */
.footer-center{
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px 0 2px 0;
}

.save-btn {
  width: 160px;
  height: 42px;
  border-radius: 8px;
  background: #2f6bff;
  color: #fff;
  border: none;
  font-weight: 900;
  font-size: 20px;
  cursor: default;
}

</style>
