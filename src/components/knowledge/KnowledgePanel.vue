<template>
  <div class="panel">
    <!-- 左侧：库列表 -->
    <div class="panel-left">
      <div class="left-head">
        <div class="left-title">企业知识库</div>

        <div class="left-add" @click="showAddInput">
          <span class="plus">＋</span>
          <span>添加知识库</span>
        </div>
      </div>

      <div v-if="adding" class="add-box">
        <input
            ref="addInputRef"
            v-model="addText"
            class="add-input"
            @keydown.enter.prevent="confirmAdd"
            @blur="confirmAdd"
        />
      </div>

      <div class="kb-list">
        <div
            v-for="item in libraries"
            :key="item"
            class="kb-item"
            :class="{ active: activeLib === item }"
            @click="activeLib = item"
        >
          {{ item }}
        </div>
      </div>
    </div>

    <!-- 右侧：三段状态 -->
    <KnowledgeRightPane
        :stage="stage"
        v-model:brandWords="brandWordsProxy"
        @open-upload="$emit('open-upload')"
    >
    </KnowledgeRightPane>
  </div>
</template>

<script setup>
import { computed, nextTick, ref } from 'vue'
import KnowledgeRightPane from '@/components/knowledge/KnowledgeRightPane.vue'

const props = defineProps({
  stage: { type: String, default: 'upload' }, // 'upload' | 'parsing' | 'done'
  brandWords: { type: Array, default: () => ['', '', ''] },
})
const emit = defineEmits(['open-upload', 'update:brandWords'])

/** 左侧：知识库列表（指定输入输出） */
const libraries = ref(['艾草','艾草产品','艾草原料','某省'])
const activeLib = ref('艾草')

const adding = ref(false)
const addText = ref('')
const addInputRef = ref(null)

const showAddInput = async () => {
  adding.value = true
  addText.value = ''
  await nextTick()
  addInputRef.value?.focus()
}

const confirmAdd = () => {
  if (!adding.value) return
  const v = (addText.value || '').trim()

  if (v !== '艾草产品') {
    adding.value = false
    return
  }

  if (!libraries.value.includes(v)) {
    libraries.value.push(v)
  }
  activeLib.value = v
  adding.value = false
}

/** 品牌词 v-model 代理 */
const brandWordsProxy = computed({
  get() {
    const a = Array.isArray(props.brandWords) ? props.brandWords : ['', '', '']
    return [a[0] ?? '', a[1] ?? '', a[2] ?? '']
  },
  set(v) {
    emit('update:brandWords', v)
  },
})
</script>

<style scoped>
.panel {
  background: rgba(255, 255, 255, 0.92);
  border-radius: 14px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
  display: flex;
  overflow: hidden;
  min-height: 620px;
}

/* left */
.panel-left {
  width: 290px;
  border-right: 1px solid rgba(0, 0, 0, 0.06);
  padding: 26px 22px;
}

.left-head {
  display: flex;
  gap: 18px;
  font-size: 20px;
  align-items: center;
}

.left-title {
  font-weight: 900;
  color: #303133;
}

.left-add {
  color: #2f6bff;
  font-weight: 800;
  cursor: pointer;
  user-select: none;
}

.add-box { margin-top: 14px; }
.add-input {
  width: 100%;
  height: 36px;
  border-radius: 8px;
  border: 1px solid rgba(47, 107, 255, 0.25);
  background: rgba(47, 107, 255, 0.04);
  padding: 0 12px;
  outline: none;
  font-weight: 700;
  box-sizing: border-box;
}
.add-input:focus {
  border-color: rgba(47, 107, 255, 0.55);
  background: rgba(47, 107, 255, 0.06);
}

.kb-list {
  margin-top: 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.kb-item {
  height: 44px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 19px;
  color: #2f6bff;
  background: rgba(47, 107, 255, 0.08);
  cursor: pointer;
  user-select: none;
}
.kb-item.active {
  background: rgba(47, 107, 255, 0.14);
  border: 1px solid rgba(47, 107, 255, 0.35);
}

.corp-placeholder {
  color: #606266;
  line-height: 1.9;
}
</style>
