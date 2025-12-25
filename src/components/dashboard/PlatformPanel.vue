<template>
  <div class="content-panel" style="position: relative;">
    <div class="section-sub-title">平台上词数</div>

    <el-row :gutter="15">
      <el-col :span="4" v-for="(pf, idx) in platforms" :key="idx">
        <div class="platform-card">
          <div class="pf-header">
            <div class="pf-logo" :style="{ background: pf.color }">
              <el-icon color="#fff"><component :is="pf.icon" /></el-icon>
            </div>
            <span class="pf-name">{{ pf.name }}</span>
          </div>
          <div class="pf-row">
            <span class="pf-label">移动端</span>
            <span class="pf-num">0</span>
          </div>
          <div class="pf-row">
            <span class="pf-label">电脑端</span>
            <span class="pf-num">0</span>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- 悬浮按钮 -->
    <div class="circle-nav-btn btn-left"><el-icon><ArrowLeft /></el-icon></div>
    <div class="circle-nav-btn btn-right"><el-icon><ArrowRight /></el-icon></div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { Platform, Goblet, Opportunity, Coin, ChatLineSquare, Cpu, ArrowLeft, ArrowRight } from '@element-plus/icons-vue'

const platforms = reactive([
  { name: 'DeepSeek', color: '#409EFF', icon: 'Platform' },
  { name: '豆包', color: '#F56C6C', icon: 'Goblet' },
  { name: '通义千问', color: '#8e44ad', icon: 'Opportunity' },
  { name: '腾讯元宝', color: '#2ecc71', icon: 'Coin' },
  { name: '文心一言', color: '#3498db', icon: 'ChatLineSquare' },
  { name: '纳米AI', color: '#e74c3c', icon: 'Cpu' },
])
</script>

<style scoped>
.content-panel { background: #f5f7fa; border-radius: 16px; padding: 20px 25px; box-shadow: 0 4px 16px rgba(0,0,0,0.02); margin-bottom: 20px; }
.section-sub-title { font-size: 20px; font-weight: 900; color: #1a1a1a; margin-bottom: 20px; }

.platform-card { background: white; padding: 20px; border-radius: 12px; min-height: 100px; transition: all 0.3s; border: 1px solid transparent; box-shadow: 0 2px 6px rgba(0,0,0,0.02); }
.platform-card:hover { border-color: #e6f7ff; box-shadow: 0 4px 12px rgba(0,0,0,0.08); transform: translateY(-2px); }
.pf-header { display: flex; align-items: center; margin-bottom: 20px; }
.pf-logo { width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 8px; }
.pf-name { font-size: 18px; color: #303133; }
.pf-row { display: flex; justify-content: space-between; align-items: center; font-size: 18px; color: #909399; background: #f7f8fa; height: 50px; padding: 0 12px; border-radius: 4px; margin-bottom: 10px; }
.pf-num { font-size: 25px; font-family: "Helvetica Neue", Arial, sans-serif; font-weight: bold; color: #303133; }

.circle-nav-btn { position: absolute; top: 60%; transform: translateY(-50%); width: 50px; height: 50px; border-radius: 50%; background: white; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.1); border: 1px solid #ebeef5; z-index: 20; transition: all 0.3s; color: #909399; }
.circle-nav-btn:hover { color: #409EFF; background: #ecf5ff; border-color: #b3d8ff; box-shadow: 0 6px 16px rgba(64,158,255,0.2); }
.btn-left { left: -25px; }
.btn-right { right: -25px; }
</style>