<!-- src/views/dashboard-sub/Prompt.vue -->

<template>
  <div class="prompt-page">
    <!-- 顶部导航栏 -->
    <div class="top-bar">
      <div class="p-tabs">
        <div class="p-tab active">蒸馏词</div>
        <div class="p-tab">品牌词</div>
        <div class="p-tab">场景词</div>
      </div>
      <div class="quota-info">
        <span class="info-icon">ⓘ</span>
        <span>剩余权益点：</span>
        <!-- 修改：一个非整数，看起来像是消耗过的真实数据 -->
        <span class="num">42690.5</span>
      </div>
    </div>

    <!-- 主内容卡片 -->
    <div class="main-card">
      <div class="card-title">AI提示词管理</div>

      <!-- 搜索与操作栏 -->
      <div class="action-row">
        <div class="search-area">
          <el-input
              v-model="searchText"
              placeholder="输入训练词或蒸馏词查询"
              class="search-input"
              clearable
              @clear="handleSearch"
              @keyup.enter="handleSearch"
          >
            <template #prefix>
              <span class="search-icon">🔍</span>
            </template>
          </el-input>
          <button class="btn-blue-solid search-btn" @click="handleSearch">查询</button>
        </div>

        <div class="btn-group">
          <button class="btn-blue-outline" @click="openAddDialog">手动添加</button>
          <button class="btn-blue-solid">新增蒸馏词</button>
        </div>
      </div>

      <!-- 表格区域 -->
      <div class="table-container">
        <el-table :data="tableData" style="width: 100%" :header-cell-style="{ background:'#f8f9fb', color:'#606266', fontWeight:'800' }">
          <el-table-column label="序号" width="80" align="center">
            <template #default="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>

          <el-table-column prop="trainWord" label="训练词 (核心词)" min-width="140" />

          <el-table-column prop="distWord" label="蒸馏词 (用户真实问询)" min-width="260" show-overflow-tooltip />

          <el-table-column prop="status" label="AI收录状态" width="120" align="center">
            <template #default="scope">
              <!-- 增加一点状态的色彩区分，显得更真实 -->
              <span v-if="scope.row.status === '已收录'" style="color: #67c23a; font-weight: bold;">● 已收录</span>
              <span v-else-if="scope.row.status === '优化中'" style="color: #e6a23c;">● 优化中</span>
              <span v-else style="color: #909399;">--</span>
            </template>
          </el-table-column>

          <el-table-column prop="createTime" label="创建时间" width="180" align="center" />

          <el-table-column prop="linkCount" label="关联语料" width="100" align="center">
            <template #default="scope">
              <span style="font-weight: bold; color: #2f6bff;">{{ scope.row.linkCount }} 篇</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="180">
            <template #default="scope">
              <span class="text-btn delete">删除</span>
              <span v-if="scope.row.linkCount > 0" class="text-btn view">查看语料库</span>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 分页区域 -->
      <div class="pagination-row">
        <span class="total-text">共 {{ total }} 条</span>
        <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
        />
        <el-select v-model="pageSize" style="width: 100px; margin: 0 8px;">
          <el-option label="10条/页" :value="10" />
          <el-option label="20条/页" :value="20" />
          <el-option label="50条/页" :value="50" />
        </el-select>
        <span class="jump-text">前往</span>
        <el-input v-model="jumpPage" class="jump-input" />
        <span class="jump-text">页</span>
      </div>
    </div>

    <!-- 手动添加弹窗 -->
    <el-dialog
        v-model="dialogVisible"
        title="手动添加提示词"
        width="500px"
        align-center
        destroy-on-close
    >
      <el-form :model="form" label-width="80px">
        <el-form-item label="训练词">
          <el-input v-model="form.trainWord" placeholder="" />
        </el-form-item>
        <el-form-item label="蒸馏词">
          <el-input
              v-model="form.distWord"
              type="textarea"
              rows="3"
              placeholder=""
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <button class="btn-cancel" @click="dialogVisible = false">取消</button>
          <button class="btn-blue-solid" @click="confirmAdd">确定添加</button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// ---------- 1. 列表数据 (全套艾草行业真实数据) ----------
// 逻辑：
// 1. 训练词：核心产品词
// 2. 蒸馏词：模拟用户在搜索引擎或 AI 对话框里会输入的真实长句
// 3. 关联语料：数字随机，显得有数据积累
const allData = [
  { id: 1, trainWord: '蕲艾礼盒', distWord: '过年送长辈什么健康礼品比较好？推荐高端艾草礼盒', status: '已收录', createTime: '2025-12-22 09:30:15', linkCount: 12 },
  { id: 2, trainWord: '艾草精油', distWord: '经常肩颈酸痛用哪个牌子的艾草精油效果好', status: '已收录', createTime: '2025-12-19 14:22:10', linkCount: 8 },
  { id: 3, trainWord: '无烟艾条', distWord: '家里有宝宝可以用艾灸吗？求推荐无烟型艾条', status: '优化中', createTime: '2025-12-15 16:45:33', linkCount: 5 },
  { id: 4, trainWord: '艾草足浴包', distWord: '冬天手脚冰凉怎么调理？真实的艾草泡脚包去湿效果评测', status: '已收录', createTime: '2025-12-10 10:15:00', linkCount: 15 },
  { id: 5, trainWord: '艾柱批发', distWord: '寻找源头厂家：某省蕲春正宗陈年艾柱批发价格表', status: '--', createTime: '2025-12-05 08:50:20', linkCount: 3 },
  { id: 6, trainWord: '智能艾灸仪', distWord: '传统艾灸太麻烦，现在流行的智能无烟艾灸仪靠谱吗', status: '已收录', createTime: '2025-11-28 11:30:45', linkCount: 9 },
  { id: 7, trainWord: '艾草纯露', distWord: '艾草纯露在护肤方面有哪些具体的消炎镇静功效', status: '--', createTime: '2025-11-25 15:20:11', linkCount: 0 },
  { id: 8, trainWord: '三年陈艾', distWord: '如何辨别真假三年陈艾？看颜色还是闻味道？', status: '已收录', createTime: '2025-11-22 09:10:05', linkCount: 21 },
  { id: 9, trainWord: '艾草颈椎贴', distWord: '上班族必备好物：发热持久的艾草颈椎贴品牌推荐', status: '优化中', createTime: '2025-11-20 13:40:55', linkCount: 6 },
  { id: 10, trainWord: '艾草种植基地', distWord: '想考察艾草种植项目，国内最大的蕲艾种植基地在哪里', status: '--', createTime: '2025-11-18 10:05:30', linkCount: 4 },
]

const tableData = ref([...allData])
const searchText = ref('')
const total = ref(128) // 假装总数有100多条
const currentPage = ref(1)
const pageSize = ref(10)
const jumpPage = ref(1)

// ---------- 2. 查询逻辑 ----------
const handleSearch = () => {
  if (!searchText.value) {
    tableData.value = [...allData]
    return
  }
  const key = searchText.value.toLowerCase()
  tableData.value = allData.filter(item =>
      (item.trainWord && item.trainWord.includes(key)) ||
      (item.distWord && item.distWord.includes(key))
  )
}

// ---------- 3. 手动添加逻辑 ----------
const dialogVisible = ref(false)
const form = reactive({
  trainWord: '',
  distWord: ''
})

const openAddDialog = () => {
  form.trainWord = ''
  form.distWord = ''
  dialogVisible.value = true
}

const getNowStr = () => {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  const hh = String(now.getHours()).padStart(2, '0')
  const mm = String(now.getMinutes()).padStart(2, '0')
  const ss = String(now.getSeconds()).padStart(2, '0')
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
}

const confirmAdd = () => {
  if (!form.distWord) return

  const newRow = {
    id: tableData.value.length + 1,
    trainWord: form.trainWord,
    distWord: form.distWord,
    status: '--', // 新增的默认未收录
    createTime: getNowStr(),
    linkCount: 0
  }

  // 更新本地数据
  tableData.value.unshift(newRow)
  allData.unshift(newRow)

  dialogVisible.value = false
}
</script>

<style scoped>
/* 样式保持不变，复用之前的 CSS */
.prompt-page {
  width: 100%;
}

/* 顶部栏 */
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0 14px 0;
}

.p-tabs {
  display: flex;
  gap: 12px;
  background: #fff;
  padding: 4px;
  border-radius: 24px;
}
.p-tab {
  padding: 8px 24px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 700;
  color: #606266;
  user-select: none;
}
.p-tab.active {
  background: #eaf2ff;
  color: #2f6bff;
}

.quota-info {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #909399;
  font-size: 14px;
}
.info-icon { margin-right: 2px; }
.num { color: #2f6bff; font-weight: 800; font-size: 16px; }

/* 主卡片 */
.main-card {
  background: #fff;
  border-radius: 8px;
  min-height: 600px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.03);
}

.card-title {
  font-size: 18px;
  font-weight: 800;
  color: #303133;
  margin-bottom: 20px;
}

/* 搜索操作行 */
.action-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.search-area {
  display: flex;
  gap: 10px;
}
.search-input {
  width: 280px;
}
.btn-group {
  display: flex;
  gap: 12px;
}

/* 按钮通用样式 */
button { cursor: pointer; border-radius: 4px; padding: 8px 20px; font-weight: 600; font-size: 14px; transition: all 0.2s;}
.btn-blue-solid {
  background: #2f6bff; color: #fff; border: 1px solid #2f6bff;
}
.btn-blue-solid:hover { opacity: 0.9; }

.btn-blue-outline {
  background: #fff; color: #2f6bff; border: 1px solid #2f6bff;
}
.btn-blue-outline:hover { background: #f0f5ff; }

.btn-cancel {
  background: #fff; color: #606266; border: 1px solid #dcdfe6; margin-right: 12px;
}
.btn-cancel:hover { border-color: #c0c4cc; color: #303133; }

.search-btn {
  border-radius: 4px;
}

/* 表格区域 */
.table-container {
  border: 1px solid #ebeef5;
  border-bottom: none;
  border-radius: 4px 4px 0 0;
}

.text-btn {
  cursor: pointer;
  font-size: 14px;
  margin-right: 12px;
  font-weight: 500;
}
.text-btn.delete { color: #f56c6c; } /* 删除改红色更符合直觉 */
.text-btn.view { color: #2f6bff; }
.text-btn:hover { text-decoration: underline; }

/* 分页 */
.pagination-row {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 20px;
  gap: 8px;
}
.total-text { font-size: 14px; color: #606266; margin-right: 8px; }

/* 自定义跳页部分 */
.jump-text { font-size: 14px; color: #606266; }
.jump-input { width: 44px; margin: 0 4px; }
:deep(.jump-input .el-input__inner) { text-align: center; padding: 0 4px; }

/* Dialog */
.dialog-footer { display: flex; justify-content: flex-end; }
</style>
