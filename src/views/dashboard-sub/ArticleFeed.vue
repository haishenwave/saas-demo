<template>
  <div class="feed-wrapper">
    <!-- 模式 A：列表视图 -->
    <Transition name="fade" mode="out-in">
      <ArticleList
          v-if="viewMode === 'list'"
          @go-publish="handleGoPublish"
      />

      <!-- 模式 B：编辑/发布视图 -->
      <ArticleEditor
          v-else
          :article-data="currentArticle"
          :publish-type="publishType"
          @back="handleBack"
      />
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// 引入拆分的组件
import ArticleList from '@/components/articlefeed/ArticleList.vue'
import ArticleEditor from '@/components/articlefeed/ArticleEditor.vue'

// 状态管理
const viewMode = ref('list') // 'list' | 'editor'
const publishType = ref('matrix') // 'matrix' (矩阵) | 'news' (新闻)
const currentArticle = ref({}) // 当前选中的文章数据

// 切换到发布编辑页
const handleGoPublish = (row, type) => {
  currentArticle.value = row
  publishType.value = type
  viewMode.value = 'editor'
}

// 返回列表页
const handleBack = () => {
  viewMode.value = 'list'
  currentArticle.value = {}
}
</script>

<style scoped>
.feed-wrapper {
  min-height: 100vh;
  background-color: #f5f7fa;
}

/* 简单的过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>