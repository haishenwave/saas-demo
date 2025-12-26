<template>
  <div class="topbar">
    <div class="tabs">
      <div class="tab" :class="{ active: activeTab === 'info' }" @click="setTab('info')">
        企业信息库
      </div>
      <div class="tab" :class="{ active: activeTab === 'img' }" @click="setTab('img')">
        企业图片素材
      </div>
    </div>

    <div class="quota">
      <span class="quota-icon">ⓘ</span>
      <span class="quota-text">剩余权益点：</span>
      <span class="quota-num">{{ quota }}</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  activeTab: { type: String, default: 'info' },
  quota: { type: [String, Number], default: '0' },
})

const emit = defineEmits(['update:activeTab'])

const setTab = (v) => {
  emit('update:activeTab', v)
}
</script>

<style scoped>
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 6px 14px 6px;
}

/* tabs */
.tabs {
  display: flex;
  gap: 18px;
}
.tab {
  font-size: 20px;
  padding: 10px 22px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.7);
  font-weight: 700;
  cursor: pointer;
  user-select: none;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
}
.tab.active {
  color: #2f6bff;
  background: #eaf2ff;
  border: 1px solid rgba(47, 107, 255, 0.25);
}

/* quota */
.quota {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #909399;
  font-size: 14px;
}
.quota-num {
  color: #2f6bff;
  font-weight: 800;
  font-size: 16px;
}
</style>
