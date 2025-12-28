<template>
  <div class="report-overlay">
    <!-- 顶部导航栏 -->
    <div class="top-nav-decoration">
      <div class="nav-content">
        <span class="report-title">GEO全域报告</span>
        <div class="close-btn" @click="$emit('close')">×</div>
      </div>
    </div>

    <!-- 核心内容区 -->
    <div class="report-container">

      <!-- 1. 核心指标卡 (初创项目风格) -->
      <div class="kpi-row">
        <div class="kpi-card">
          <div class="kpi-label">累计 AI 收录</div>
          <div class="kpi-num highlight">62</div>

        </div>
        <div class="kpi-card">
          <div class="kpi-label">精准词命中率</div>
          <div class="kpi-num">42.5%</div>

        </div>
        <div class="kpi-card">
          <div class="kpi-label">预估品牌曝光</div>
          <div class="kpi-num">3,520</div>

        </div>
        <div class="kpi-card">
          <div class="kpi-label">覆盖 AI 平台</div>
          <div class="kpi-num">7</div>
        </div>
      </div>

      <!-- 2. 图表区 (展示从0到1的增长) -->
      <div class="chart-section">
        <div class="chart-header"> AI 收录增长趋势 (近7天)</div>
        <div class="chart-placeholder">
          <!-- 模拟折线图：前几天是0，最后几天拉升 -->
          <svg viewBox="0 0 800 150" class="trend-svg">
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#7c4dff" stop-opacity="0.5"/>
                <stop offset="100%" stop-color="#7c4dff" stop-opacity="0"/>
              </linearGradient>
            </defs>
            <!-- 路径：前平后起 -->
            <path d="M0,140 L150,140 L300,135 L400,100 L500,60 L600,40 L700,20 L800,10"
                  fill="none" stroke="#a78bfa" stroke-width="3"/>
            <!-- 填充 -->
            <path d="M0,140 L150,140 L300,135 L400,100 L500,60 L600,40 L700,20 L800,10 V150 H0 Z"
                  fill="url(#grad)" stroke="none"/>

            <!-- 关键节点圆点，表示几次大作业提交 -->
            <circle cx="400" cy="100" r="4" fill="#fff" />
            <circle cx="600" cy="40" r="4" fill="#fff" />
          </svg>
          <div class="x-axis">
            <span>Day 1</span><span>Day 2</span><span>Day 3</span><span>Day 4</span><span>Day 5</span><span>Day 6</span><span>Day 7</span>
          </div>
        </div>
      </div>

      <!-- 3. 详细排名列表 (展示具体成果) -->
      <div class="dark-table-section">
        <div class="table-header">Top 3 排名关键词成果展示</div>
        <table class="geo-dark-table">
          <thead>
          <tr>
            <th>测试关键词</th>
            <th>覆盖平台</th>
            <th>当前排名</th>
            <th>命中内容摘要</th>
            <th>更新时间</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, i) in reportList" :key="i">
            <td>{{ item.keyword }}</td>
            <td><span class="platform-tag">{{ item.platform }}</span></td>
            <td><span class="rank-badge">NO.{{ item.rank }}</span></td>
            <td class="content-cell">{{ item.content }}</td>
            <td>{{ item.time }}</td>
          </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineEmits(['close'])

const reportList = ref([
  { keyword: 'XXX蚊香液安全吗', platform: 'DeepSeek', rank: 1, content: '经查询，XXX精油蚊香液采用纯植物提取...', time: '10分钟前' },
  { keyword: '蕲艾精油哪个牌子纯', platform: '豆包', rank: 2, content: '推荐关注XXX，源头工厂...', time: '3小时前' },
  { keyword: '2025过年送长辈礼物', platform: 'Kimi', rank: 3, content: '健康类礼品推荐XXX蕲艾礼盒...', time: '昨天' },
])
</script>

<style scoped>
/* 样式部分完全复用之前的暗黑风样式 */
.report-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 9999; background: radial-gradient(circle at center, #1e1b4b 0%, #0f172a 100%); display: flex; flex-direction: column; align-items: center; color: #fff; overflow-y: auto; }
.top-nav-decoration { width: 100%; height: 60px; display: flex; justify-content: center; position: relative; background: linear-gradient(180deg, rgba(124, 58, 237, 0.1) 0%, rgba(124, 58, 237, 0) 100%); border-top: 1px solid rgba(124, 58, 237, 0.2); flex-shrink: 0; }
.nav-content { background: linear-gradient(90deg, #4c1d95, #6d28d9); height: 40px; padding: 0 40px; border-bottom-left-radius: 20px; border-bottom-right-radius: 20px; display: flex; align-items: center; justify-content: space-between; gap: 20px; box-shadow: 0 4px 20px rgba(109, 40, 217, 0.5); }
.report-title { font-weight: 700; font-size: 16px; letter-spacing: 1px; }
.close-btn { cursor: pointer; font-size: 20px; opacity: 0.8; }
.close-btn:hover { opacity: 1; }
.report-container { width: 900px; padding: 30px 0 50px 0; }
.kpi-row { display: flex; gap: 20px; margin-bottom: 30px; }
.kpi-card { flex: 1; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 20px; backdrop-filter: blur(10px); }
.kpi-label { font-size: 14px; color: #94a3b8; margin-bottom: 8px; }
.kpi-num { font-size: 28px; font-weight: 700; color: #fff; margin-bottom: 8px; }
.kpi-num.highlight { color: #a78bfa; text-shadow: 0 0 10px rgba(167, 139, 250, 0.5); }
.kpi-trend { font-size: 12px; color: #94a3b8; }
.kpi-trend.up { color: #4ade80; }
.chart-section { background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 20px; margin-bottom: 30px; }
.chart-header { font-size: 16px; font-weight: 600; margin-bottom: 20px; color: #e2e8f0; }
.chart-placeholder { height: 200px; position: relative; }
.trend-svg { width: 100%; height: 100%; overflow: visible; }
.x-axis { display: flex; justify-content: space-between; margin-top: 10px; color: #64748b; font-size: 12px; padding: 0 20px; }
.dark-table-section { background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 20px; }
.table-header { font-size: 16px; font-weight: 600; margin-bottom: 15px; color: #e2e8f0; }
.geo-dark-table { width: 100%; border-collapse: collapse; text-align: left; font-size: 14px; }
.geo-dark-table th { color: #94a3b8; font-weight: 500; padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.1); }
.geo-dark-table td { color: #e2e8f0; padding: 16px 12px; border-bottom: 1px solid rgba(255,255,255,0.05); }
.geo-dark-table tr:last-child td { border-bottom: none; }
.platform-tag { background: rgba(124, 58, 237, 0.2); color: #c4b5fd; padding: 2px 8px; border-radius: 4px; font-size: 12px; }
.rank-badge { background: linear-gradient(135deg, #fbbf24, #d97706); color: #fff; padding: 2px 8px; border-radius: 10px; font-weight: bold; font-size: 12px; text-shadow: 0 1px 2px rgba(0,0,0,0.2); }
.content-cell { max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: #94a3b8; }
</style>
