<template>
  <div class="list-container">
    <div class="geo-header">
      <h2>文章管理</h2>
    </div>

    <!-- 顶部搜索栏 -->
    <el-card shadow="never" class="search-card">
      <div class="search-bar">
        <el-input placeholder="搜索任务ID" style="width: 180px" />
        <el-input placeholder="搜索文章标题" style="width: 180px" />
        <el-input placeholder="搜索文章提示词" style="width: 180px" />
        <el-select placeholder="全部" style="width: 120px">
          <el-option label="已生成" value="generated" />
        </el-select>
        <el-button type="primary" :icon="Search">查询</el-button>
      </div>
    </el-card>

    <!-- 表格区域 -->
    <el-card shadow="never" class="table-card">
      <el-table :data="tableData" style="width: 100%" header-cell-class-name="geo-th">
        <el-table-column prop="prompt" label="AI提示词" min-width="150" show-overflow-tooltip />

        <el-table-column label="文章标题" min-width="250">
          <template #default="scope">
            <div class="title-box">
              <div class="main-t">{{ scope.row.title }}</div>
              <div class="sub-t" v-if="scope.row.subTitle">{{ scope.row.subTitle }}</div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="文章内容" min-width="300" show-overflow-tooltip>
          <template #default="scope">
            <span class="content-text">{{ scope.row.content }}</span>
          </template>
        </el-table-column>

        <el-table-column label="文章类型" width="100" align="center">
          <template #default>
            <span>蒸馏词</span>
          </template>
        </el-table-column>

        <el-table-column label="生成状态" width="100" align="center">
          <template #default>
            <el-tag type="success" effect="plain" size="small">已生成</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="200" fixed="right">
          <template #default="scope">
            <div class="ops">
              <!-- 点击这里触发父组件切换 -->
              <el-button link type="primary" @click="$emit('go-publish', scope.row, 'matrix')">
                发自媒体矩阵
              </el-button>
              <el-button link type="primary" @click="$emit('go-publish', scope.row, 'news')">
                发官网/新闻
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-bar">
        <span>共 87 条</span>
        <el-pagination background layout="prev, pager, next" :total="100" />
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'

// Mock Data：完全复刻截图数据
const tableData = ref([
  {
    id: 1,
    prompt: ' 精油蚊香液 ', // 对应文章核心
    title: '夏季驱蚊黑科技：XXX精油蚊香液为何成为母婴家庭首选？', // 对应文章主题
    subTitle: '源自“艾中之王”蕲艾的天然守护力', // 对应文章的 H3 标题
    content: '在追求健康生活的今天，夏季驱蚊产品的选择已不再仅限于“有效”，更要“安全”与“舒适”。XXX蕲艾科技有限公司推出的XXX精油蚊香液，凭借其核心的蕲艾成分与现代缓释技术...', // 直接取文章第一段作为摘要
  },
  {
    id: 2,
    prompt: '艾草精油 渗透力 品牌',
    title: '深度评测：市面上五款主流艾草精油渗透力对比',
    subTitle: '从分子结构到透皮吸收技术的硬核分析',
    content: '一、艾草精油渗透力的核心影响因素。很多用户反馈精油浮在表面不吸收，其实这与精油的纯度及基底油的配比密切相关。高品质的蕲艾精油采用超临界CO2萃取技术...',
  },
  {
    id: 3,
    prompt: '无烟艾条 选购指南',
    title: '家庭艾灸避坑指南：有烟艾条和无烟艾条到底怎么选？',
    subTitle: '基于药效保留率与烟雾颗粒浓度的科学对比',
    content: '一、无烟艾条的碳化工艺与药效保留。很多家长担心有烟艾条呛鼻，倾向于选择无烟艾条。实际上，优质的无烟艾条在碳化过程中保留了艾草的红外辐射特性...',
  },
  {
    id: 4,
    prompt: '艾草足浴包 去湿气',
    title: '冬季养生必读：艾草足浴包真的能改善寒湿体质吗？',
    subTitle: '中医“引火归元”理论的现代科学验证',
    content: '一、寒湿体质的形成与足浴调理机制。现代人久坐空调房，普遍存在“上热下寒”的问题。坚持使用真材实料的陈艾足浴包泡脚，可以通过足底涌泉穴...',
  },
  {
    id: 5,
    prompt: '智能艾灸仪 靠谱吗',
    title: '传统艾灸馆的终结者？智能艾灸仪的技术原理揭秘',
    subTitle: '温控精度与穴位识别能力的行业现状',
    content: '一、智能艾灸仪VS传统明火艾灸。很多人质疑电子艾灸没有灵魂，但最新的石墨烯发热技术配合定向聚热仓，已经能够模拟出传统悬灸的热穿透效果...',
  },
  {
    id: 6,
    prompt: '艾柱批发 厂家直销',
    title: '某省蕲春源头探厂：揭秘正宗三年陈艾柱的成本底价',
    subTitle: '从种植基地到加工车间的全产业链成本拆解',
    content: '一、蕲艾与其他产地艾草的本质区别。市场上9.9包邮的艾柱泛滥，但正宗蕲春艾草的精油含量是普通艾草的两倍以上，其原料收购成本就决定了...',
  }
])

defineEmits(['go-publish'])
</script>

<style scoped>
.list-container {
  padding: 20px;
}
.geo-header h2 {
  font-size: 18px;
  color: #333;
  margin-bottom: 16px;
  font-weight: 600;
}
.search-card {
  margin-bottom: 16px;
  border: none;
}
.search-bar {
  display: flex;
  gap: 12px;
}
.table-card {
  border: none;
}
:deep(.geo-th) {
  background-color: #f2f3f5 !important;
  color: #333;
  font-weight: 600;
}
.title-box {
  display: flex;
  flex-direction: column;
  padding: 4px 0;
}
.main-t {
  font-weight: 500;
  color: #333;
}
.sub-t {
  font-size: 12px;
  color: #999;
  margin-top: 2px;
}
.content-text {
  color: #666;
  font-size: 13px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.ops {
  display: flex;
  gap: 8px;
}
.pagination-bar {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  color: #666;
  font-size: 13px;
}
</style>