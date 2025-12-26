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
          <svg class="dialog-mode-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M15 4H5V20H19V8H15V4ZM3 2.9918C3 2.44405 3.44749 2 3.9985 2H16L20.9997 7L21 20.9925C21 21.5489 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5447 3 21.0082V2.9918ZM13 12V16H11V12H8L12 8L16 12H13Z"></path></svg>

          <div class="mode-main">导入本地文档</div>
        </div>
        </div>
      </div>

      <div class="mode-card disabled">
        <div class="mode-text">
        <div class="mode-title-line">
          <svg class="dialog-mode-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16.7574 2.99678L14.7574 4.99678H5V18.9968H19V9.23943L21 7.23943V19.9968C21 20.5491 20.5523 20.9968 20 20.9968H4C3.44772 20.9968 3 20.5491 3 19.9968V3.99678C3 3.4445 3.44772 2.99678 4 2.99678H16.7574ZM20.4853 2.09729L21.8995 3.5115L12.7071 12.7039L11.2954 12.7064L11.2929 11.2897L20.4853 2.09729Z"></path></svg>
          <div class="mode-main">输入文本</div>
        </div>
        </div>
      </div>

      <div class="mode-card disabled">
        <div class="mode-text">
        <div class="mode-title-line">
          <svg class="dialog-mode-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM9.71002 19.6674C8.74743 17.6259 8.15732 15.3742 8.02731 13H4.06189C4.458 16.1765 6.71639 18.7747 9.71002 19.6674ZM10.0307 13C10.1811 15.4388 10.8778 17.7297 12 19.752C13.1222 17.7297 13.8189 15.4388 13.9693 13H10.0307ZM19.9381 13H15.9727C15.8427 15.3742 15.2526 17.6259 14.29 19.6674C17.2836 18.7747 19.542 16.1765 19.9381 13ZM4.06189 11H8.02731C8.15732 8.62577 8.74743 6.37407 9.71002 4.33256C6.71639 5.22533 4.458 7.8235 4.06189 11ZM10.0307 11H13.9693C13.8189 8.56122 13.1222 6.27025 12 4.24799C10.8778 6.27025 10.1811 8.56122 10.0307 11ZM14.29 4.33256C15.2526 6.37407 15.8427 8.62577 15.9727 11H19.9381C19.542 7.8235 17.2836 5.22533 14.29 4.33256Z"></path></svg>
          <div class="mode-main">网址解析</div>
        </div>
          <div class="mode-sub">解析单个网址内容，支持周期自动更新</div>
        </div>
      </div>

      <div class="mode-card disabled">
        <div class="mode-text">
        <div class="mode-title-line">
          <svg class="dialog-mode-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22 20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H21C21.5523 3 22 3.44772 22 4V20ZM11 15H4V19H11V15ZM20 11H13V19H20V11ZM11 5H4V13H11V5ZM20 5H13V9H20V5Z"></path></svg>
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

.dialog-mode-icon {
  width: 30px;
  height: 30px;
  fill: currentColor; /* 保持原来的蓝色 */
}
</style>
