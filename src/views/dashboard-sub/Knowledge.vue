<template>
  <div class="kb-page">
    <KnowledgeHeader v-model:activeTab="activeTab" :quota="quota" />

    <KnowledgePanel
        :stage="stage"
        v-model:brandWords="brandWords"
        @open-upload="uploadDialogVisible = true"
    />

    <UploadDialog
        v-model="uploadDialogVisible"
        @saved="startParsing"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

import KnowledgeHeader from '@/components/knowledge/KnowledgeHeader.vue'
import KnowledgePanel from '@/components/knowledge/KnowledgePanel.vue'
import UploadDialog from '@/components/knowledge/UploadDialog.vue'

const activeTab = ref('info')
const quota = ref('42690.5')

const uploadDialogVisible = ref(false)

/** ✅ 三段状态：刚进来必须是 upload */
const stage = ref('upload') // 'upload' | 'parsing' | 'done'
const brandWords = ref(['', '', ''])

let timer = null

const startParsing = () => {
  // 保存后：进入解析企业信息（生成中）
  stage.value = 'parsing'

  const ms = 10000 + Math.floor(Math.random() * 5001) // 10~15秒
  if (timer) clearTimeout(timer)

  timer = setTimeout(() => {
    stage.value = 'done'
  }, ms)
}
</script>

<style scoped>
.kb-page { width: 100%; }
</style>
