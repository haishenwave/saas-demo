<template>
  <div class="article-create-page">
    <!-- ================== 1. 主页面 ================== -->
    <div class="top-header">
      <div class="page-title">创作文章</div>
      <div class="quota-info">
        <span class="info-icon">ⓘ</span>
        <span>剩余权益点：</span>
        <span class="num">42690.5</span>
      </div>
    </div>

    <div class="main-card">
      <!-- 搜索栏 -->
      <div class="filter-row">
        <div class="inputs-area">
          <el-input v-model="searchKeyword" placeholder="输入AI提示词搜索" class="search-input" clearable>
            <template #prefix>🔍</template>
          </el-input>
          <el-input v-model="searchTaskName" placeholder="输入任务名称搜索" class="search-input" clearable>
            <template #prefix>🔍</template>
          </el-input>
          <button class="btn-blue search-btn">查询</button>
        </div>
        <button class="btn-blue create-btn" @click="openCreateDialog">批量创作</button>
      </div>

      <!-- 表格 -->
      <el-table
          :data="tableData"
          style="width: 100%; min-height: 500px;"
          :header-cell-style="{ background:'#f5f7fa', color:'#606266', fontWeight:'800' }"
      >
        <el-table-column prop="taskName" label="任务名称" min-width="150" />
        <el-table-column prop="prompt" label="AI提示词" min-width="120" />
        <el-table-column prop="kb" label="关联知识库" min-width="120" />
        <el-table-column prop="assets" label="图片素材" min-width="100" />
        <el-table-column prop="cost" label="消耗权益" min-width="100" />

        <!-- 动态变化的列 -->
        <el-table-column label="生成中" min-width="80" align="center">
          <template #default="scope">
            <span :class="{ 'text-orange': scope.row.generating > 0 }">{{ scope.row.generating }}</span>
          </template>
        </el-table-column>

        <el-table-column label="生成完成" min-width="80" align="center">
          <template #default="scope">
            <span :class="{ 'text-green': scope.row.done > 0 }">{{ scope.row.done }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="fail" label="生成失败" min-width="80" align="center" />
        <el-table-column prop="time" label="创建时间" min-width="160" />

        <!-- ✅ 修改：操作列增加投喂按钮 -->
        <el-table-column label="操作" min-width="120" fixed="right">
          <template #default="scope">
            <button
                class="feed-btn"
                :class="scope.row.isLoading ? 'btn-gray' : 'btn-blue-small'"
                @click="goToFeed(scope.row)"
            >
              {{ scope.row.isLoading ? '生成中...' : '投喂' }}
            </button>
          </template>
        </el-table-column>

        <template #empty>
          <div class="empty-wrap"><div class="empty-text">暂无数据</div></div>
        </template>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-row">
        <span class="total-text">共 {{ tableData.length }} 条</span>
        <el-pagination background layout="prev, pager, next" :total="tableData.length" />
        <el-select v-model="pageSize" style="width: 100px; margin: 0 8px;">
          <el-option label="20条/页" :value="20" />
        </el-select>
        <span class="jump-text">前往</span>
        <el-input class="jump-input" model-value="1" />
        <span class="jump-text">页</span>
      </div>
    </div>

    <!-- ================== 2. 批量创作弹窗 ================== -->
    <el-dialog v-model="createVisible" width="700px" class="create-dialog" :show-close="false" align-center>
      <template #header="{ close }">
        <div class="custom-header">
          <div class="header-left">
            <span class="blue-bar"></span><span class="header-title">创作文章</span>
          </div>
          <div class="header-right">
            <span class="header-quota">剩余权益点：<span class="hq-num">42690.5</span></span>
            <span class="close-icon" @click="close">✕</span>
          </div>
        </div>
      </template>

      <div class="form-body">
        <div class="form-item">
          <div class="label">任务名称</div>
          <div class="content"><el-input v-model="createForm.taskName" placeholder="请输入任务名称" maxlength="50" show-word-limit /></div>
        </div>
        <div class="form-item">
          <div class="label">选择创作类型</div>
          <div class="content">
            <el-radio-group v-model="createForm.type">
              <el-radio label="distill">蒸馏词</el-radio>
              <el-radio label="brand">品牌词</el-radio>
              <el-radio label="scene">场景词</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="form-item">
          <div class="label">设置AI提示词</div>
          <div class="content col">
            <div class="tags-input-box">
              <el-tag closable type="info" class="custom-tag">精油蚊香液</el-tag>
            </div>
            <div class="add-link">＋ 新建AI提示词</div>
          </div>
        </div>
        <div class="form-item">
          <div class="label">设置企业知识库</div>
          <div class="content col">
            <el-select v-model="createForm.kb" style="width: 100%"><el-option label="艾草" value="aicao" /></el-select>
            <div class="add-link">＋ 新建企业知识库</div>
          </div>
        </div>
        <div class="form-item">
          <div class="label">选择图片素材 ⓘ</div>
          <div class="content">
            <el-select v-model="createForm.picCount" style="width: 100%">
              <el-option label="1张" :value="1" /><el-option label="3张" :value="3" />
            </el-select>
          </div>
        </div>

        <!-- 设置图片素材 -->
        <div class="form-item top-align">
          <div class="label">设置图片素材</div>
          <div class="content col">
            <div class="assets-picker-row">
              <div class="add-asset-btn" @click="openAssetDialog"><span class="plus">＋</span></div>
              <div v-for="(img, index) in selectedAssets" :key="index" class="selected-asset-item">
                <img v-if="img.type === 'image'" :src="img.src" class="asset-thumb" />
                <svg v-else width="40" height="40" viewBox="0 0 100 100">
                  <rect width="100" height="100" fill="#f0f9eb" />
                  <text x="50" y="60" font-size="40" text-anchor="middle">📁</text>
                </svg>
                <div class="asset-name-mini">{{ img.name }}</div>
              </div>
            </div>
            <div class="tips-text">
              系统将会选中素材库中图片随机选择插入文章<br>(1) 建议图片大小500*600px；<br>(2) 图片上不带各类型联系方式
            </div>
          </div>
        </div>

        <div class="form-item">
          <div class="label">内容要求</div>
          <div class="content">
            <el-radio-group v-model="createForm.requirement">
              <el-radio label="default">默认生成</el-radio><el-radio label="command">指令库生成</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="form-item">
          <div class="label">设置指令库</div>
          <div class="content">
            <el-select v-model="createForm.commandLib" style="width: 100%"><el-option label="榜单类" value="rank" /></el-select>
          </div>
        </div>
        <div class="form-item">
          <div class="label">设置生成文章数</div>
          <div class="content">
            <span class="prefix-label">每个提示词生成</span>
            <el-select v-model="createForm.articleNum" style="width: 120px; margin: 0 10px;">
              <el-option label="1篇文章" :value="1" /><el-option label="5篇文章" :value="5" />
            </el-select>
          </div>
          <div class="hint-right">预计生成 {{ createForm.articleNum }} 篇文章</div>
        </div>
      </div>
      <div class="dialog-footer">
        <div class="calc-info">ⓘ 本次生成预计消耗权益点：<span class="blue-text">{{ createForm.articleNum }}</span> 生成后剩余权益点：...</div>
        <button class="btn-blue big-btn" @click="handleGenerate">生成内容</button>
      </div>
    </el-dialog>

    <!-- ================== 3. 资源库弹窗 ================== -->
    <el-dialog v-model="assetVisible" fullscreen class="asset-dialog" :show-close="false">
      <div class="asset-header">
        <div class="asset-title">资源库</div><div class="asset-close" @click="assetVisible = false">✕</div>
      </div>
      <div class="asset-body">
        <div class="asset-toolbar">
          <div class="tabs-left">
            <div class="at-tab active">图片库</div><div class="at-tab">臻图</div><div class="at-tab">臻视</div>
          </div>
          <div class="tools-right">
            <div class="icon-btn">⇅</div><div class="icon-btn">⚙</div><div class="icon-btn">🏷️</div><div class="icon-btn">💻</div><div class="icon-btn">⊞</div><button class="btn-dark">批量创作</button>
          </div>
        </div>
        <div class="asset-alert">ⓘ 温馨提示：一次最多可上传50个文件...</div>
        <div class="asset-filter">
          <div class="filter-left">
            <el-button round size="small">来源 ▼</el-button><span class="f-label">格式 ▼</span><span class="f-label">尺寸 ▼</span><span class="f-label">大小 ▼</span><span class="f-label">标签 ▼</span><span class="f-label">排序 ▼</span>
          </div>
          <div class="filter-right">
            <button class="btn-white">智能制图</button><button class="btn-white">新建文件夹</button>
            <el-input placeholder="搜索文件夹/文件名称" style="width: 200px" prefix-icon="Search" />
            <div class="toggle-switch"><span>不显示文件夹</span><el-switch v-model="hideFolder" style="margin-left: 8px" /></div>
          </div>
        </div>
        <div class="check-all-row"><el-checkbox>全选</el-checkbox></div>

        <div class="asset-grid">
          <div class="upload-card">
            <div class="blue-text">↑ 本地上传</div><div class="blue-text" style="margin-top:10px">⛶ 扫码上传</div>
          </div>
          <div
              v-for="item in assetList" :key="item.id"
              class="asset-item"
              :class="{ active: tempSelectedAssets.includes(item.id) }"
              @click="toggleSelectAsset(item)"
          >
            <svg v-if="item.type === 'folder'" width="80" height="70" viewBox="0 0 100 80" class="folder-icon">
              <path d="M5 10 L40 10 L50 20 L95 20 A5 5 0 0 1 100 25 L100 75 A5 5 0 0 1 95 80 L5 80 A5 5 0 0 1 0 75 L0 15 A5 5 0 0 1 5 10 Z" fill="#ffd04b" />
              <path d="M5 25 L95 25 L95 75 L5 75 Z" fill="#ffe082" />
            </svg>
            <div v-else class="img-wrap"><img :src="item.src" class="real-img" /></div>
            <div class="asset-name">{{ item.name }}</div>
          </div>
        </div>
      </div>
      <div class="asset-footer">
        <div class="storage-info">
          <div class="storage-bar"><div class="bar-inner" style="width: 30%"></div></div><span class="storage-text">存储空间 4.32G / 11G</span>
        </div>
        <div class="af-right">
          <div class="af-count">共 {{ assetList.length }} 条</div><el-pagination layout="prev, pager, next" :total="assetList.length" small />
          <div class="af-btns"><button class="btn-white" @click="assetVisible = false">取消</button><button class="btn-dark" @click="confirmAssets">确认</button></div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router' // 1. 引入 Router
import { ElMessage } from 'element-plus'

const router = useRouter() // 2. 获取 Router 实例

const getImageUrl = (name) => {
  return new URL(`../../assets/pics/${name}`, import.meta.url).href
}

const searchKeyword = ref('')
const searchTaskName = ref('')
const tableData = ref([])
const pageSize = ref(20)

const createVisible = ref(false)
const createForm = reactive({
  taskName: '艾草宣传推广', type: 'distill', kb: 'aicao', picCount: 1, requirement: 'default', commandLib: 'rank', articleNum: 1
})
const selectedAssets = ref([])
const openCreateDialog = () => { createVisible.value = true }

// 3. 升级生成逻辑
const handleGenerate = () => {
  createVisible.value = false

  // 创建新行数据，状态为：生成中=1，完成=0，isLoading=true
  const newRow = reactive({
    taskName: createForm.taskName,
    prompt: '精油蚊香液',
    kb: '艾草',
    assets: selectedAssets.value.length + '个素材',
    cost: createForm.articleNum,
    generating: 1, // 初始：生成中
    done: 0,
    fail: '-',
    time: new Date().toLocaleString(),
    isLoading: true // 内部状态：控制按钮
  })

  tableData.value.unshift(newRow)
  ElMessage.success('任务已提交生成，请等待...')

  // 模拟 10秒后完成
  setTimeout(() => {
    newRow.generating = 0
    newRow.done = 1
    newRow.isLoading = false // 状态翻转，按钮变蓝
    ElMessage.success('文章生成完成！')
  }, 10000)
}

// 4. 跳转逻辑
const goToFeed = (row) => {
  if (row.isLoading) return // 生成中不可点

  // 跳转到 ArticleFeed 页面
  // 请确保您的路由配置中有 name: 'ArticleFeed' 或者 path: '/article/feed'
  router.push({ name: 'article-feed' }).catch(err => {
    console.warn('跳转失败，请检查路由配置中是否有 name: "article-feed"', err)
    ElMessage.warning('跳转失败，请检查路由配置')
  })
}

const assetVisible = ref(false)
const hideFolder = ref(false)
const tempSelectedAssets = ref([])
const openAssetDialog = () => { assetVisible.value = true }

const assetList = ref([
  { id: 101, name: 'XX名牌', type: 'image', src: getImageUrl('1.png') },
  { id: 102, name: '高新技术企业', type: 'image', src: getImageUrl('3.png') },
  { id: 103, name: '地理标志保护产品', type: 'image', src: getImageUrl('10.png') },
  { id: 1, name: '120802', type: 'folder' },
  { id: 2, name: '120801', type: 'folder' },
  { id: 3, name: '1208小红书', type: 'folder' },
  { id: 4, name: '小红书1023', type: 'folder' },
])

const toggleSelectAsset = (item) => {
  const idx = tempSelectedAssets.value.indexOf(item.id)
  if (idx > -1) tempSelectedAssets.value.splice(idx, 1)
  else tempSelectedAssets.value.push(item.id)
}
const confirmAssets = () => {
  selectedAssets.value = assetList.value.filter(item => tempSelectedAssets.value.includes(item.id))
  assetVisible.value = false
}
</script>

<style scoped>
/* 按钮样式补充 */
.feed-btn {
  border-radius: 4px; padding: 6px 12px; font-weight: 600; cursor: pointer; font-size: 13px; border: none; transition: all 0.3s;
}
.btn-gray {
  background: #f4f4f5; color: #a8abb2; cursor: not-allowed;
}
.btn-blue-small {
  background: #2f6bff; color: white;
}
.btn-blue-small:hover {
  opacity: 0.9;
}

/* 文本颜色 */
.text-orange { color: #ff9900; font-weight: 800; }
.text-green { color: #67c23a; font-weight: 800; }

/* 其他样式保持不变 */
.btn-blue { background: #2f6bff; color: white; border: none; border-radius: 4px; padding: 8px 16px; font-weight: 700; cursor: pointer; }
.btn-blue:hover { opacity: 0.9; }
.btn-white { background: white; border: 1px solid #dcdfe6; color: #606266; padding: 6px 16px; border-radius: 4px; cursor: pointer; }
.btn-dark { background: #303133; color: white; border: none; border-radius: 4px; padding: 6px 16px; cursor: pointer; }

.article-create-page { padding: 0 4px; }
.top-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.page-title { font-size: 20px; font-weight: 900; color: #303133; }
.quota-info { color: #909399; font-size: 14px; }
.quota-info .num { color: #2f6bff; font-weight: 800; font-size: 16px; margin-left: 4px; }
.main-card { background: #fff; padding: 20px; border-radius: 8px; min-height: 600px; }
.filter-row { display: flex; justify-content: space-between; margin-bottom: 20px; }
.inputs-area { display: flex; gap: 10px; }
.search-input { width: 220px; }
.search-btn { border-radius: 0 4px 4px 0; }
.empty-wrap { padding: 60px 0; text-align: center; color: #909399; }
.pagination-row { margin-top: 20px; display: flex; justify-content: flex-end; align-items: center; }
.total-text { font-size: 14px; color: #606266; margin-right: 10px; }
.jump-text { font-size: 14px; color: #606266; }
.jump-input { width: 44px; margin: 0 4px; :deep(.el-input__inner) { text-align: center; padding: 0; } }

/* 弹窗样式 */
:deep(.create-dialog .el-dialog__header) { padding: 0; margin: 0; }
:deep(.create-dialog .el-dialog__body) { padding: 0; }
.custom-header { height: 50px; background: linear-gradient(90deg, #eef4ff, #fff); display: flex; justify-content: space-between; align-items: center; padding: 0 20px; }
.header-left { display: flex; align-items: center; gap: 10px; }
.blue-bar { width: 4px; height: 16px; background: #2f6bff; border-radius: 2px; }
.header-title { font-size: 18px; font-weight: 800; color: #303133; }
.header-right { display: flex; align-items: center; gap: 20px; color: #909399; font-size: 14px; }
.hq-num { color: #2f6bff; font-weight: 700; }
.close-icon { cursor: pointer; font-size: 18px; font-weight: bold; }
.form-body { padding: 20px 30px; max-height: 550px; overflow-y: auto; }
.form-item { display: flex; align-items: center; margin-bottom: 20px; }
.form-item.top-align { align-items: flex-start; }
.label { width: 120px; color: #606266; font-size: 15px; font-weight: 500; }
.content { flex: 1; display: flex; align-items: center; }
.content.col { flex-direction: column; align-items: flex-start; gap: 8px; }
.tags-input-box { border: 1px solid #dcdfe6; border-radius: 4px; padding: 4px; width: 100%; min-height: 36px; display: flex; align-items: center; }
.custom-tag { margin-right: 6px; }
.add-link { color: #2f6bff; font-size: 14px; cursor: pointer; margin-top: 4px; }
.assets-picker-row { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 8px; }
.add-asset-btn { width: 100px; height: 100px; border: 1px dashed #dcdfe6; border-radius: 4px; display: flex; align-items: center; justify-content: center; cursor: pointer; }
.add-asset-btn .plus { font-size: 30px; color: #909399; font-weight: 100; }
.selected-asset-item { width: 100px; height: 100px; border: 1px solid #eee; border-radius: 4px; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #f9f9f9; overflow: hidden; position: relative;}
.asset-thumb { width: 100%; height: 100%; object-fit: cover; }
.asset-name-mini { font-size: 12px; color: #606266; margin-top: 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 90px; text-align: center; position: absolute; bottom: 0; background: rgba(255,255,255,0.8); width: 100%; }
.tips-text { font-size: 12px; color: #909399; line-height: 1.6; }
.prefix-label { color: #303133; font-weight: 600; font-size: 14px; }
.hint-right { margin-left: auto; color: #909399; font-size: 12px; }
.dialog-footer { border-top: 1px solid #eee; padding: 16px 30px; display: flex; flex-direction: column; align-items: center; gap: 16px; }
.calc-info { color: #606266; font-size: 14px; }
.blue-text { color: #2f6bff; font-weight: 700; margin: 0 4px; }
.big-btn { width: 140px; height: 40px; font-size: 16px; }

/* 全屏资源库 */
:deep(.asset-dialog .el-dialog__header) { display: none; }
:deep(.asset-dialog .el-dialog__body) { padding: 0; display: flex; flex-direction: column; height: 100vh; background: #f2f4f7;}
.asset-header { height: 48px; background: #2d303b; display: flex; justify-content: space-between; align-items: center; padding: 0 20px; color: #fff; }
.asset-title { font-weight: 700; font-size: 16px; }
.asset-close { cursor: pointer; font-size: 18px; opacity: 0.8; }
.asset-body { flex: 1; padding: 16px 20px; overflow-y: auto; background: #fff; margin: 16px; border-radius: 4px; display: flex; flex-direction: column;}
.asset-toolbar { display: flex; justify-content: space-between; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-bottom: 10px; }
.tabs-left { display: flex; gap: 24px; font-weight: 700; font-size: 16px; color: #606266; }
.at-tab.active { color: #2f6bff; border-bottom: 2px solid #2f6bff; padding-bottom: 8px; }
.tools-right { display: flex; gap: 10px; align-items: center; }
.icon-btn { width: 32px; height: 32px; border: 1px solid #dcdfe6; border-radius: 4px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #606266; }
.asset-alert { background: #e6f7ff; border: 1px solid #91d5ff; color: #1890ff; padding: 8px 12px; font-size: 13px; border-radius: 4px; margin-bottom: 16px; }
.asset-filter { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; background: #f8f9fb; padding: 10px; border-radius: 4px; }
.filter-left { display: flex; gap: 20px; align-items: center; font-size: 14px; color: #606266; }
.f-label { cursor: pointer; }
.filter-right { display: flex; gap: 10px; align-items: center; }
.toggle-switch { display: flex; align-items: center; font-size: 13px; color: #606266; margin-left: 10px; }
.check-all-row { margin-bottom: 10px; }
.asset-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 16px; flex: 1; align-content: start; }
.upload-card { height: 120px; border: 1px dashed #dcdfe6; border-radius: 6px; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; background: #f9f9f9; }
.asset-item { height: 120px; border-radius: 6px; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; border: 1px solid transparent; transition: all 0.2s; position: relative; overflow: hidden; }
.asset-item:hover { background: #f5f7fa; }
.asset-item.active { background: #eaf2ff; border: 1px solid #2f6bff; }
.folder-icon { margin-bottom: 8px; }
.img-wrap { width: 100%; height: 90px; display: flex; align-items: center; justify-content: center; overflow: hidden; }
.real-img { max-width: 100%; max-height: 100%; object-fit: contain; }
.asset-name { font-size: 13px; color: #606266; text-align: center; padding: 4px; width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.asset-footer { height: 50px; border-top: 1px solid #eee; display: flex; justify-content: space-between; align-items: center; padding-top: 10px; }
.storage-info { display: flex; flex-direction: column; width: 200px; gap: 4px; }
.storage-bar { width: 100%; height: 6px; background: #eee; border-radius: 3px; overflow: hidden; }
.bar-inner { background: #2f6bff; height: 100%; }
.storage-text { font-size: 12px; color: #909399; }
.af-right { display: flex; align-items: center; gap: 16px; }
.af-count { color: #606266; font-size: 13px; }
.af-btns { display: flex; gap: 10px; margin-left: 10px; }
</style>