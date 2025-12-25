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
        <span class="num">42680.5</span>
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
          <!-- 这里实现了手动添加的点击事件 -->
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

          <el-table-column prop="trainWord" label="训练词" min-width="120" />

          <el-table-column prop="distWord" label="蒸馏词" min-width="200" show-overflow-tooltip />

          <el-table-column prop="status" label="AI收录状态" width="120" align="center" />

          <el-table-column prop="createTime" label="创建时间" width="180" align="center" />

          <el-table-column prop="linkCount" label="关联语料库" width="100" align="center" />

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

        <!-- 1. 修改 layout：把原来的 "prev, pager, next, sizes" 里的 sizes 删掉 -->
        <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
        />

        <!-- 2. 新增：手动添加一个下拉框，这样中文想怎么写就怎么写 -->
        <el-select v-model="pageSize" style="width: 100px; margin: 0 8px;">
          <el-option label="10条/页" :value="10" />
          <el-option label="20条/页" :value="20" />
          <el-option label="50条/页" :value="50" />
        </el-select>

        <!-- 自定义跳页部分 -->
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
          <el-input v-model="form.trainWord" placeholder="请输入核心关键词" />
        </el-form-item>
        <el-form-item label="蒸馏词">
          <el-input
              v-model="form.distWord"
              type="textarea"
              rows="3"
              placeholder="请输入扩展的长尾词或问句"
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

// ---------- 1. 列表数据 (Mock 截图数据) ----------
const allData = [
  { id: 1, trainWord: '艾草', distWord: '那个品牌的艾草产品更好', status: '--', createTime: '2025-12-22 20:54:51', linkCount: 0 },
  { id: 2, trainWord: '艾草精油', distWord: '00后群体艾草精油艾草精油哪家好', status: '--', createTime: '2025-12-19 10:58:04', linkCount: 0 },
  { id: 3, trainWord: '艾草蚊香液', distWord: '艾草蚊香液哪里有卖', status: '--', createTime: '2025-12-19 10:38:23', linkCount: 0 },
  { id: 4, trainWord: '艾草蚊香液', distWord: '艾草蚊香液联系电话', status: '--', createTime: '2025-12-19 10:38:23', linkCount: 0 },
  { id: 5, trainWord: '艾草蚊香液', distWord: '艾草蚊香液电话', status: '--', createTime: '2025-12-19 10:38:23', linkCount: 0 },
  { id: 6, trainWord: '', distWord: '抗裂砂浆 武汉供应商 价格', status: '--', createTime: '2025-10-31 16:18:51', linkCount: 2 },
  { id: 7, trainWord: '', distWord: '湖北瓷砖胶供应商', status: '--', createTime: '2025-10-31 16:18:51', linkCount: 2 },
  { id: 8, trainWord: '', distWord: '武汉腻子粉厂家', status: '--', createTime: '2025-10-31 16:18:51', linkCount: 2 },
]

const tableData = ref([...allData])
const searchText = ref('')
const total = ref(25)
const currentPage = ref(1)
const pageSize = ref(10)
const jumpPage = ref(1) // 跳页输入框绑定

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

// 格式化当前时间为 YYYY-MM-DD HH:mm:ss
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
    status: '--',
    createTime: getNowStr(), // ✅ 修正：使用手动格式化的时间
    linkCount: 0
  }

  // 更新本地数据
  tableData.value.unshift(newRow)
  allData.unshift(newRow)

  dialogVisible.value = false
}
</script>

<style scoped>
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
.text-btn.delete { color: #2f6bff; }
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