<template>
  <el-row :gutter="20" style="margin-top: 0; flex: 1;">
    <!-- 左侧：最新投喂文章 -->
    <el-col :span="14">
      <div class="bottom-panel">
        <div class="panel-header">
          <span class="p-main-title">最新投喂文章</span>
          <div class="p-link">查看更多 <el-icon><ArrowRight /></el-icon></div>
        </div>
        <div class="panel-tabs">
          <span class="tab-item active">自媒体矩阵</span>
          <span class="tab-item">权威媒体</span>
          <span class="tab-item">臻选媒体</span>
          <span class="tab-item">自媒体</span>
          <span class="tab-item">联盟新闻</span>
        </div>
        <div class="custom-table-header">
          <div style="flex: 2">文章标题</div>
          <div style="flex: 1; text-align:center;">投喂平台</div>
          <div style="flex: 1; text-align:center;">推送状态</div>
          <div style="flex: 1; text-align:center;">投喂时间</div>
        </div>
        <div class="empty-list">
          <div style="padding: 20px; text-align: center; color: #ccc;">暂无数据</div>
        </div>
      </div>
    </el-col>

    <!-- 右侧：热门关键词排名 -->
    <el-col :span="10">
      <div class="bottom-panel">
        <div class="panel-header">
          <span class="p-main-title">热门关键词排名</span>
          <div class="p-link">查看更多 <el-icon><ArrowRight /></el-icon></div>
        </div>
        <div class="panel-tabs" style="border-bottom: none;"></div>
        <div class="custom-table-header">
          <div style="flex: 1">拓展关键词</div>
          <div style="flex: 1; text-align:center;">训练词</div>
          <div style="flex: 1; text-align:center;">平台上词情况</div>
        </div>
        <div class="empty-placeholder">
          暂无数据
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script setup>
import { ArrowRight } from '@element-plus/icons-vue'
</script>

<style scoped>
.bottom-panel { background: white; border-radius: 12px; padding: 25px; height: 100%; min-height: 350px; box-shadow: 0 2px 6px rgba(0,0,0,0.02); display: flex; flex-direction: column; }
.panel-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.p-main-title { font-size: 20px; font-weight: 900; color: #1a1a1a; }
.p-link { font-size: 15px; color: #0056b3; cursor: pointer; display: flex; align-items: center; gap: 4px; }
.panel-tabs { display: flex; gap: 30px; margin-bottom: 20px; border-bottom: 1px solid #f0f0f0; padding-bottom: 2px; }
.tab-item { font-size: 18px; font-weight: bold; color: #606266; cursor: pointer; padding-bottom: 10px; position: relative; }
.tab-item.active { color: #409EFF; }
.tab-item.active::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 100%; height: 3px; background: #409EFF; border-radius: 2px; }
.custom-table-header { display: flex; background: #f5f7fa; padding: 12px 20px; border-radius: 4px; }
.custom-table-header div { font-size: 18px; font-weight: bold; color: #303133; }
.empty-list, .empty-placeholder { flex: 1; display: flex; align-items: center; justify-content: center; color: #909399; font-size: 14px; min-height: 150px; }
</style>