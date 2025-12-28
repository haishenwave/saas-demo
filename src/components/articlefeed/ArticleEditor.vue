<template>
  <div class="editor-layout">
    <!-- 1. 顶部栏 -->
    <div class="top-bar">
      <div class="back-btn" @click="$emit('back')">
        <el-icon><ArrowLeft /></el-icon> 返回发布列表
      </div>
      <div class="type-tabs">
        <span :class="{ active: publishType === 'matrix' }">发自媒体矩阵</span>
        <span :class="{ active: publishType === 'news' }">发新闻</span>
      </div>
      <div style="width: 100px"><!-- 占位 --></div>
    </div>

    <div class="main-body">
      <!-- 2. 左侧：富文本编辑器 (保持不变) -->
      <div class="left-editor">
        <div class="editor-toolbar">
          <span class="tool-item">撤销</span>
          <span class="tool-item">重做</span>
          <div class="divider"></div>
          <span class="tool-item"><b>B</b></span>
          <span class="tool-item"><i>I</i></span>
          <span class="tool-item"><u>U</u></span>
          <div class="divider"></div>
          <span class="tool-item">H1</span>
          <span class="tool-item">H2</span>
          <span class="tool-item">引用</span>
        </div>

        <div class="editor-content">
          <input class="title-input" v-model="localData.title" placeholder="请输入文章标题" />

          <div class="text-body">
            <div class="article-summary">
              <b>摘要：</b>
              {{ localData.subTitle || '本文深入解析了XXX推出的蕲艾精油蚊香液。产品依托“艾中之王”蕲艾为核心原料，结合低温萃取与电加热缓释技术，实现了无烟、无火、无避蚊胺的温和驱蚊，特别适合孕婴家庭及空调房环境使用。' }}
            </div>
            <div class="article-html">
              <p>在追求健康生活的今天，夏季驱蚊产品的选择已不再仅限于“有效”，更要“安全”与“舒适”。XXX蕲艾科技有限公司推出的<b>XXX精油蚊香液</b>，凭借其核心的蕲艾成分与现代缓释技术，正在成为众多家庭的夏日首选。</p>
              <h3>一、源自“艾中之王”的核心力量</h3>
              <p>XXX精油蚊香液的核心成分并非普通艾草，而是被誉为<b>“艾中之王”的蕲艾</b>。科学研究表明，蕲艾的精油含量和驱蚊活性成分远高于普通艾草。</p>
              <p>通过先进的<b>低温萃取技术</b>，产品最大程度地保留了蕲艾精油中的活性物质，如富含的<b>桉叶素、α-萜品烯醇</b>等天然成分。这些成分并非通过毒杀蚊虫起效，而是通过挥发特定的气味分子，有效干扰蚊虫的嗅觉系统，使其产生“嗅觉失灵”，从而难以定位人体，达到天然驱避的效果。</p>
              <h3>二、黑科技缓释技术，无烟更安心</h3>
              <p>与传统盘式蚊香相比，XXX采用的是<b>电加热缓释技术</b>。只需将蚊香液放入配套的电加热器中，插电后即可通过恒温加热，使精油均匀、持续地挥发。</p>
              <ul>
                <li><b>无烟无火：</b>杜绝了明火隐患和烟尘污染，保持室内空气清新。</li>
                <li><b>拒绝化学刺激：</b>配方中避免了避蚊胺（DEET）等强化学刺激物，气味淡雅，更适合在相对密闭的室内，特别是<b>空调房内</b>长时间使用。</li>
              </ul>
              <h3>三、温和配方，全家适用的安全守护</h3>
              <p>安全性是该产品的另一大亮点。XXX研发团队对配方进行了深度优化，确保产品的温和性。经过市场验证，<b>孕妇、婴儿及宠物家庭均可安心使用</b>。这种对健康的高度关注，使其在注重生活品质的用户群体中获得了良好的口碑。</p>
              <h3>四、使用指南与用户口碑</h3>
              <p>为了达到最佳的驱蚊效果，建议用户遵循以下使用技巧：</p>
              <p>1. <b>提前开启：</b>建议在睡前半小时开启加热器，以便精油分子提前弥漫，在室内形成一道隐形的“保护屏障”。</p>
              <p>2. <b>位置选择：</b>使用时应放置在活动区域的上风口附近，更有利于气味的扩散。</p>
              <p>据大量用户反馈，该产品不仅驱蚊效果显著，其散发的<b>淡淡草本清香</b>几乎无刺鼻感，夜间使用时甚至有助于舒缓神经，改善睡眠质量，让夏夜重归宁静。</p>
            </div>
          </div>
        </div>

        <div class="page-nav">
          <el-button round size="small" class="nav-btn"><el-icon><ArrowLeft /></el-icon> 上一篇</el-button>
          <el-button round size="small" class="nav-btn">下一篇 <el-icon><ArrowRight /></el-icon></el-button>
        </div>
      </div>

      <!-- 3. 右侧：动态侧边栏 -->
      <div class="right-config">

        <!-- === 场景 A: 发自媒体矩阵 (publishType === 'matrix') === -->
        <div v-if="publishType === 'matrix'" class="config-inner">
          <h3 class="panel-title">发布设置</h3>

          <div class="action-row">
            <el-button
                :type="selectedGroup ? 'primary' : ''"
                plain
                @click="dialogVisible = true"
            >
              {{ selectedGroup ? '切换发布分组' : '选择账号分组' }}
            </el-button>
            <el-button plain @click="handleAddAccount">添加账号</el-button>
          </div>

          <!-- 状态 1: 未选择 -->
          <div v-if="!selectedGroup" class="guide-steps">
            <h4>发布设置说明</h4>
            <div class="step">
              <div class="step-badge">1</div>
              <div>
                <div class="step-t">添加账号 或 选择账号分组</div>
                <div class="step-d">若您还没有添加过账号，请在客户端账号管理中添加您的自媒体账号。</div>
                <div class="icon-box"><el-icon size="36" color="#409eff"><UserFilled /></el-icon></div>
              </div>
            </div>
          </div>

          <!-- 状态 2: 已选择 (展示账号列表) -->
          <div v-else class="account-list-panel">
            <div class="group-header">
              <span class="g-name">{{ selectedGroup.name }}</span>
              <el-tag size="small" effect="dark" type="success">{{ selectedGroup.count }} 个账号</el-tag>
            </div>

            <p class="list-label">
              <el-icon><Connection /></el-icon> 任务将同步分发至以下达人/KOC账号：
            </p>

            <div class="account-items">
              <div class="ac-item" v-for="(ac, idx) in accountList" :key="idx">
                <!-- 修改点 1：使用真实图标 -->
                <div class="ac-logo">
                  <img :src="`https://www.google.com/s2/favicons?domain=${ac.domain}&sz=128`" :alt="ac.platform" />
                </div>

                <div class="ac-info">
                  <div class="ac-name-row">
                    <span class="ac-name">{{ ac.name }}</span>
                    <el-tag v-if="ac.tag" size="small" :type="ac.tagType" effect="plain" style="margin-left:5px; height: 18px; font-size: 10px; transform: scale(0.9);">{{ ac.tag }}</el-tag>
                  </div>
                  <div class="ac-plat">
                    <!-- 这里可以用一个小点颜色区分，或者直接去掉 platClass -->
                    <span :class="['plat-dot', ac.platClass]"></span> {{ ac.platform }}
                  </div>
                </div>
                <div class="ac-status">
                  <el-icon color="#67C23A" size="16"><CircleCheckFilled /></el-icon>
                </div>
              </div>
            </div>
          </div>

          <div class="bottom-btns">
            <el-button
                type="primary"
                round
                class="pub-btn"
                :disabled="!selectedGroup"
                @click="handleMatrixPublish"
            >
              <el-icon><Promotion /></el-icon> &nbsp;立即发布
            </el-button>
            <div class="sub-btns">
              <el-button round size="small">智能检测</el-button>
              <el-button round size="small">AI生成</el-button>
            </div>
          </div>
        </div>

        <!-- === 场景 B: 发新闻 (保持不变) === -->
        <div v-if="publishType === 'news'" class="config-inner news-mode">
          <div class="news-types">
            <span class="active">权威媒体</span>
            <span>臻选媒体</span>
            <span>自媒体</span>
            <span>联盟新闻</span>
          </div>
          <div class="warning-box">
            温馨提示：我们将在1-3个工作日内完成审核，如审核未通过或发布未成功，已扣除的条数将返回至您的账户中。
          </div>
          <p class="label">设置发布媒体</p>
          <div class="media-grid">
            <div class="media-item selected">
              <img src="https://www.google.com/s2/favicons?domain=sina.com.cn&sz=64" class="media-icon" />
              新浪新闻
            </div>
            <div class="media-item">
              <img src="https://www.google.com/s2/favicons?domain=163.com&sz=64" class="media-icon" />
              网易新闻
            </div>
            <div class="media-item">
              <img src="https://www.google.com/s2/favicons?domain=sohu.com&sz=64" class="media-icon" />
              搜狐新闻
            </div>
            <div class="media-item">
              <img src="https://www.google.com/s2/favicons?domain=qq.com&sz=64" class="media-icon" />
              腾讯新闻
            </div>
          </div>
          <div class="cost-info">
            <div class="row"><span>预计消耗点数：</span><span class="blue">400点</span></div>
            <div class="row"><span>当前可用点数：</span><span class="blue">42679.5点</span></div>
            <p class="tip">温馨提示：一篇文稿只能选择一个权威媒体</p>
          </div>
          <div class="news-footer">
            <p class="footer-note">本次发布预计消耗400点，实际消耗以发布成功为准</p>
            <div class="f-btns">
              <el-button plain>保存文章</el-button>
              <el-button type="primary" @click="handlePublish">发布</el-button>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- 弹窗 1：选择账号分组 (更加 SaaS 化的命名) -->
    <el-dialog
        v-model="dialogVisible"
        title="选择发布账号分组"
        width="480px"
        align-center
        destroy-on-close
    >
      <div class="group-select-list">
        <div
            v-for="group in mockGroups"
            :key="group.id"
            class="group-option"
            :class="{ active: tempSelectedId === group.id }"
            @click="tempSelectedId = group.id"
        >
          <div class="g-radio">
            <div class="radio-inner" v-if="tempSelectedId === group.id"></div>
          </div>
          <div class="g-info">
            <div class="g-head">
              <span class="g-title">{{ group.name }}</span>
              <!-- 不同分组显示不同的标签颜色 -->
              <el-tag size="small" :type="group.tagType" effect="plain">{{ group.count }}个账号</el-tag>
            </div>
            <div class="g-desc">{{ group.desc }}</div>
          </div>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmGroupSelection">
            确认并应用
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 弹窗 2：发布成功大反馈 -->
    <el-dialog
        v-model="successVisible"
        width="420px"
        align-center
        :show-close="false"
        class="success-dialog"
    >
      <div class="success-content">
        <div class="pulse-icon">
          <el-icon class="success-icon" color="#67C23A"><SuccessFilled /></el-icon>
        </div>
        <h3>矩阵分发任务已启动</h3>
        <p class="s-main">正在同步文章至 <b>{{ selectedGroup?.name }}</b></p>
        <div class="s-detail">
          <div class="sd-row">
            <span class="label">覆盖平台：</span>
            <span class="val">小红书 / 抖音 / 头条 / 公众号</span>
          </div>
          <div class="sd-row">
            <span class="label">账号类型：</span>
            <span class="val">居家博主 / 生活KOC / 测评达人</span>
          </div>
          <div class="sd-row">
            <span class="label">预计曝光：</span>
            <span class="val highlight">15w+ 阅读量</span>
          </div>
        </div>
        <el-button type="primary" size="large" @click="finishPublish" style="width: 100%; margin-top: 24px;">
          完成，返回列表
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { ArrowLeft, ArrowRight, UserFilled, Promotion, CircleCheckFilled, Connection, SuccessFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const props = defineProps({
  publishType: String,
  articleData: Object
})

const emit = defineEmits(['back'])

// 本地数据
const localData = ref({
  title: '夏日守护 | XXX精油蚊香液：蕲艾黑科技，打造无蚊舒睡空间',
  subTitle: '',
  content: ''
})

watch(() => props.articleData, (newVal) => {
  if (newVal && newVal.title) {
    // localData.value = { ...newVal }
  }
}, { immediate: true })

// === 逻辑部分：账号分组选择 ===
const dialogVisible = ref(false)
const selectedGroup = ref(null)
const tempSelectedId = ref(1)

// 升级后的 Mock 数据：更侧重于“投放”和“种草”的 SaaS 风格
const mockGroups = [
  {
    id: 1,
    name: '居家/生活 KOC 矩阵 (A组)',
    count: 15,
    desc: '覆盖小红书、抖音中腰部素人账号，侧重生活场景种草',
    tagType: 'danger'
  },
  {
    id: 2,
    name: '母婴/亲子 垂类达人池',
    count: 8,
    desc: '精选宝妈人设高权重账号，粉丝粘性高，适合安全类产品',
    tagType: 'warning'
  },
  {
    id: 3,
    name: '好物测评/种草 混合组',
    count: 12,
    desc: '包含头条、公众号等图文平台，侧重功能深度测评',
    tagType: 'primary'
  },
  {
    id: 4,
    name: '泛知识/生活百科 铺量组',
    count: 20,
    desc: '用于SEO关键词占位，快速提升全网搜索热度',
    tagType: 'info'
  }
]

// 选中后的账号展示 (大众化、无品牌关联的账号名)
const accountList = ref([
  {
    name: '娜娜的生活日记',
    platform: '快手',
    domain: 'kuaishou.com',  // 小红书官网
    platClass: 'bg-ks',
    tag: '居家博主',
    tagType: 'danger'
  },
  {
    name: '大白测评',
    platform: '抖音',
    domain: 'douyin.com', // 抖音官网
    platClass: 'bg-dy',
    tag: '好物分享',
    tagType: ''
  },
  {
    name: '每日好物精选',
    platform: '微信公众号',
    domain: 'mp.weixin.qq.com', // 微信公众平台
    platClass: 'bg-wx',
    tag: '高权重',
    tagType: 'success'
  },
  {
    name: '90后宝妈CC',
    platform: '今日头条',
    domain: 'toutiao.com', // 今日头条
    platClass: 'bg-tt',
    tag: '育儿达人',
    tagType: 'warning'
  }
])

const handleAddAccount = () => {
  ElMessage.info('演示模式：请先选择已有分组')
}

const confirmGroupSelection = () => {
  const group = mockGroups.find(g => g.id === tempSelectedId.value)
  selectedGroup.value = group
  dialogVisible.value = false
  ElMessage.success(`已应用投放策略：${group.name}`)
}

// === 逻辑部分：发布 ===
const successVisible = ref(false)

const handleMatrixPublish = () => {
  successVisible.value = true
}

const handlePublish = () => {
  ElMessage.success('新闻发布任务已提交')
  setTimeout(() => emit('back'), 1000)
}

const finishPublish = () => {
  successVisible.value = false
  emit('back')
}
</script>

<style scoped>
.editor-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #fff;
}

/* 顶部栏 */
.top-bar {
  height: 56px;
  border-bottom: 1px solid #e4e7ed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  background-color: #fff;
  flex-shrink: 0;
}
.back-btn { cursor: pointer; display: flex; align-items: center; gap: 6px; color: #606266; font-size: 14px; transition: color 0.2s; }
.back-btn:hover { color: #409eff; }
.type-tabs { display: flex; gap: 40px; height: 100%; }
.type-tabs span { display: flex; align-items: center; height: 100%; cursor: pointer; color: #909399; font-size: 15px; border-bottom: 2px solid transparent; padding: 0 4px; transition: all 0.2s; }
.type-tabs span.active { color: #409eff; border-bottom-color: #409eff; font-weight: 500; }

/* 主体内容区 */
.main-body { flex: 1; display: flex; overflow: hidden; }

/* 左侧编辑器 */
.left-editor { flex: 1; display: flex; flex-direction: column; background: #fff; position: relative; min-width: 0; }
.editor-toolbar { height: 42px; background: #f5f7fa; border-bottom: 1px solid #e4e7ed; display: flex; align-items: center; padding: 0 24px; gap: 16px; flex-shrink: 0; }
.tool-item { cursor: pointer; color: #606266; font-size: 14px; }
.divider { width: 1px; height: 16px; background: #dcdfe6; }
.editor-content { flex: 1; padding: 30px 15%; overflow-y: auto; }
.title-input { width: 100%; font-size: 26px; font-weight: 600; border: none; margin-bottom: 24px; outline: none; color: #303133; }
.article-summary { background-color: #fdf6ec; color: #e6a23c; padding: 16px; border-radius: 4px; font-size: 14px; line-height: 1.6; margin-bottom: 30px; }
.article-html { font-size: 16px; line-height: 1.8; color: #333; }
.article-html :deep(h3) { font-size: 18px; font-weight: 600; color: #303133; margin: 32px 0 16px; padding-left: 10px; border-left: 4px solid #409eff; }
.article-html :deep(p) { margin-bottom: 16px; text-align: justify; }
.article-html :deep(ul) { margin-bottom: 16px; padding-left: 20px; }
.page-nav { position: absolute; bottom: 24px; left: 50%; transform: translateX(-50%); display: flex; gap: 16px; opacity: 0.8; }

/* 右侧配置栏 */
.right-config { width: 380px; border-left: 1px solid #e4e7ed; background: #fff; display: flex; flex-direction: column; flex-shrink: 0; }
.config-inner { padding: 24px; height: 100%; overflow-y: auto; display: flex; flex-direction: column; }
.panel-title { font-size: 16px; font-weight: 600; margin: 0 0 24px; }
.action-row { display: flex; gap: 12px; margin-bottom: 24px; }
.action-row .el-button { flex: 1; }

/* 引导样式 */
.guide-steps { background: #f5f7fa; padding: 20px; border-radius: 8px; }
.guide-steps h4 { margin: 0 0 20px; font-size: 14px; color: #606266; }
.step { display: flex; gap: 12px; margin-bottom: 24px; }
.step-badge { width: 20px; height: 20px; background: #409eff; color: #fff; border-radius: 50%; text-align: center; line-height: 20px; font-size: 12px; flex-shrink: 0; margin-top: 2px; }
.step-t { font-size: 14px; font-weight: 500; margin-bottom: 6px; }
.step-d { font-size: 12px; color: #909399; line-height: 1.5; }
.icon-box { background: #fff; border: 1px dashed #dcdfe6; height: 80px; border-radius: 6px; display: flex; align-items: center; justify-content: center; margin-top: 12px; }

/* 账号列表面板 (SaaS 风格) */
.account-list-panel { background: #f0f5fa; border-radius: 8px; padding: 16px; margin-bottom: 20px; border: 1px solid #e1eaf5; }
.group-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid #dcdfe6; }
.g-name { font-weight: 600; color: #303133; font-size: 15px; }
.list-label { font-size: 12px; color: #606266; margin-bottom: 12px; display: flex; align-items: center; gap: 4px; }
.ac-item { display: flex; align-items: center; background: #fff; padding: 12px; border-radius: 6px; margin-bottom: 10px; box-shadow: 0 1px 4px rgba(0,0,0,0.03); transition: transform 0.2s; }
.ac-item:hover { transform: translateY(-1px); box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
.ac-logo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
  flex-shrink: 0;
  background: white;
  border: 1px solid #eee;
  overflow: hidden; /* 确保图片圆角 */
  display: flex;
  align-items: center;
  justify-content: center;
}
.ac-logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.ac-info { flex: 1; }
.ac-name-row { display: flex; align-items: center; margin-bottom: 4px; }
.ac-name { font-size: 14px; font-weight: 500; color: #303133; }
.ac-plat { font-size: 12px; color: #909399; display: flex; align-items: center; gap: 6px; }
.plat-dot { width: 6px; height: 6px; border-radius: 50%; display: inline-block; }
.bg-wx { background: #07c160; } .bg-dy { background: #000; } .bg-xhs { background: #ff2442; } .bg-tt { background: #f85959; }

/* 底部按钮 */
.bottom-btns { margin-top: auto; padding-top: 24px; display: flex; flex-direction: column; gap: 16px; }
.pub-btn { width: 100%; height: 44px; font-size: 16px; font-weight: 500; box-shadow: 0 4px 12px rgba(64,158,255,0.3); }
.sub-btns { display: flex; justify-content: center; gap: 12px; }

/* 弹窗：分组选择 (美化版) */
.group-select-list { max-height: 300px; overflow-y: auto; padding: 4px; }
.group-option { display: flex; gap: 12px; padding: 16px; border: 1px solid #dcdfe6; border-radius: 8px; margin-bottom: 12px; cursor: pointer; transition: all 0.2s; align-items: flex-start; }
.group-option:hover { border-color: #409eff; background-color: #f9faff; }
.group-option.active { border-color: #409eff; background-color: #ecf5ff; box-shadow: 0 2px 8px rgba(64,158,255,0.1); }
.g-radio { margin-top: 4px; width: 16px; height: 16px; border: 1px solid #dcdfe6; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: #fff; }
.group-option.active .g-radio { border-color: #409eff; }
.radio-inner { width: 8px; height: 8px; background: #409eff; border-radius: 50%; }
.g-info { flex: 1; }
.g-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
.g-title { font-weight: 600; color: #303133; font-size: 15px; }
.g-desc { font-size: 13px; color: #909399; line-height: 1.4; }

/* 弹窗：成功展示 */
.success-content { text-align: center; padding: 30px 10px; }
.pulse-icon { display: inline-block; animation: pulse 2s infinite; }
.success-icon { font-size: 72px; margin-bottom: 20px; }
.success-content h3 { font-size: 22px; margin-bottom: 16px; color: #303133; }
.s-main { font-size: 16px; color: #606266; margin-bottom: 20px; }
.s-detail { background: #f5f7fa; padding: 20px; border-radius: 8px; text-align: left; font-size: 14px; color: #606266; line-height: 2; width: 90%; margin: 0 auto; }
.sd-row { display: flex; justify-content: space-between; border-bottom: 1px dashed #e4e7ed; padding-bottom: 4px; margin-bottom: 4px; }
.sd-row:last-child { border-bottom: none; margin-bottom: 0; }
.val { font-weight: 500; color: #303133; }
.val.highlight { color: #ff9800; font-weight: bold; }
@keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }

/* News 保持 */
.news-types { display: flex; gap: 24px; border-bottom: 1px solid #e4e7ed; margin-bottom: 24px; padding-bottom: 12px; }
.news-types span { font-size: 14px; cursor: pointer; color: #606266; }
.news-types span.active { color: #409eff; font-weight: 600; }
.warning-box { background: #ecf5ff; border: 1px solid #d9ecff; color: #409eff; padding: 12px; font-size: 12px; border-radius: 4px; margin-bottom: 24px; }
.label { font-size: 14px; color: #303133; margin-bottom: 12px; font-weight: 500; }
.media-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 24px; }
.media-item { border: 1px solid #dcdfe6; height: 64px; display: flex; align-items: center; justify-content: center; gap: 8px; border-radius: 4px; font-size: 14px; color: #606266; cursor: pointer; }
.media-item.selected { border-color: #409eff; background: #ecf5ff; color: #409eff; }
.media-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
  border-radius: 3px;
  object-fit: contain;
}

.cost-info { border-top: 1px solid #e4e7ed; padding-top: 24px; }
.cost-info .row { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 14px; color: #606266; }
.blue { color: #409eff; font-weight: 500; }
.news-footer { margin-top: auto; padding-top: 20px; }
.footer-note { font-size: 12px; color: #909399; margin-bottom: 16px; text-align: right; }
.f-btns { display: flex; justify-content: flex-end; gap: 12px; }
</style>