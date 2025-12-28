<template>
  <div class="running-view fade-in">
    <!-- 聊天流 -->
    <div class="chat-list">
      <!-- 1. 用户消息 -->
      <div class="chat-item user">
        <div class="avatar-slot"></div>
        <div class="chat-content-wrapper user-wrapper">
          <!-- 时间在前，名字在后 -->
          <div class="user-name-row">
            <span class="chat-time">{{ time }}</span>
            <span class="user-name">营销推广中心</span>
          </div>

          <!-- 外层占满用于对齐，内层才画气泡背景 -->
          <div class="chat-content user-bg">
            <div class="user-bubble-inner">
              <div class="user-info-row">
                <span class="label">AI大模型：</span>
                <span class="value">{{ modelNames }}</span>
              </div>
              <div class="user-info-row">
                <span class="label">官网信息：</span>
                <span class="value link">{{ url }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="avatar-slot right">
          <el-avatar :size="40" style="background:#e0e0e0; color:#666;">艾</el-avatar>
        </div>
      </div>

      <!-- 2. AI 规划消息 -->
      <div class="chat-item ai" v-if="showPlan">
        <div class="avatar-slot left">
          <el-icon :size="40" color="#0056b3"><ChatLineRound /></el-icon>
        </div>
        <div class="chat-content-wrapper">
          <div class="ai-name-row">
            <span class="ai-name">GEO营销大师</span>
            <span class="chat-time">{{ time }}</span>
          </div>
          <div class="chat-content ai-bg">
            <p>本次目标任务是浏览官网信息，得到企业详细信息后收集全网AI咨询结果生成企业定制的GEO报告，以下是为您生成的研究方案：</p>
            <p>任务1：网站爬取 - 自动浏览企业官网，获取所有子页面链接</p>
            <p>任务2：信息提取 - 深度分析子页面内容，了解企业详细信息</p>
            <p>任务3：问题生成 - 基于企业详细信息智能生成针对性调研咨询问题</p>
            <p>任务4：信息收集 - 咨询全网AI大模型来收集AI咨询结果</p>
            <p>任务5：报告输出 - 综合分析全网咨询结果，生成企业专属的GEO报告</p>
          </div>
        </div>
        <div class="avatar-slot"></div>
      </div>

      <!-- 3. 任务卡片 任务1 -->
      <div class="chat-item ai" v-if="showTask1">
        <div class="avatar-slot left">
          <el-icon :size="40" color="#0056b3"><ChatLineRound /></el-icon>
        </div>

        <div class="chat-content-wrapper">
          <div class="ai-name-row">
            <span class="ai-name">GEO营销大师</span>
            <span class="chat-time">{{ time }}</span>
          </div>

          <div class="task-card">
            <div class="task-header">
              <div class="status-badge" :class="{ done: task1Done }">
                <el-icon><Select /></el-icon> {{ task1Done ? '已完成' : '进行中' }}
              </div>
              <div class="task-title">
                任务1：完成浏览【{{ url }}】本次获取1个页面，AI将抽样浏览1个界面
              </div>
              <el-icon class="expand-icon"><CaretTop /></el-icon>
            </div>
            <div class="task-body">
              <div class="info-row">
                <span class="label">分析网址：</span>
                <a :href="url" target="_blank" class="link">{{ url }}</a>
              </div>
              <div class="info-row">
                <span class="label" style="color:#333; font-weight:bold;">发现1个页面</span>
              </div>
              <div class="info-row">
                <a :href="url" target="_blank" class="link">{{ url }}</a>
              </div>
            </div>
          </div>
        </div>

        <div class="avatar-slot"></div>
      </div>

      <!-- 4. 任务卡片 任务2 -->
      <div class="chat-item ai" v-if="showTask2">
        <div class="avatar-slot left">
          <el-icon :size="40" color="#0056b3"><ChatLineRound /></el-icon>
        </div>

        <div class="chat-content-wrapper">
          <div class="ai-name-row">
            <span class="ai-name">GEO营销大师</span>
            <span class="chat-time">{{ time }}</span>
          </div>

          <div class="task-card">
            <div class="task-header">
              <div class="status-badge" :class="{ done: task2Done }">
                <el-icon><Select /></el-icon> {{ task2Done ? '已完成' : '进行中' }}
              </div>
              <div class="task-title">
                任务2：浏览任务已完成，本次发现1个页面，完成浏览1个页面
              </div>
              <el-icon class="expand-icon"><CaretTop /></el-icon>
            </div>
            <div class="task-mid">
              正在使用网页工具 Web Tools
            </div>
            <div class="task-body">
              <div class="info-row">
                <span class="label">获取到以下链接：</span>
              </div>
              <div class="info-row">
                <a :href="url" target="_blank" class="link">{{ url }}</a>
              </div>
            </div>
          </div>
        </div>

        <div class="avatar-slot"></div>
      </div>

      <!-- 5. 任务卡片 任务3（正文留空） -->
      <div class="chat-item ai" v-if="showTask3">
        <div class="avatar-slot left">
          <el-icon :size="40" color="#0056b3"><ChatLineRound /></el-icon>
        </div>

        <div class="chat-content-wrapper">
          <div class="ai-name-row">
            <span class="ai-name">GEO营销大师</span>
            <span class="chat-time">{{ time }}</span>
          </div>

          <div class="task-card">
            <div class="task-header">
              <div class="status-badge" :class="{ done: task3Done }">
                <el-icon><Select /></el-icon> {{ task3Done ? '已完成' : '进行中' }}
              </div>
              <div class="task-title">
                任务3：已完成用户常见问题列表生成并生成报告
              </div>
              <el-icon class="expand-icon"><CaretTop /></el-icon>
            </div>

            <div class="task-body task3-body-blue">
              <div class="task3-inner-box task3-report-box">
              <blockquote class="report-quote">
                <div class="report-content">
                  <h3>任务三执行结果：用户常见问题列表生成与分析报告</h3>

                  <p>
                    基于对「XXX精油蚊香液」产品信息的系统分析，结合当前家庭健康类驱蚊产品在生成式搜索、
                    AI 问答及内容平台中的高频咨询场景，已完成目标用户常见问题的整理，并形成如下分析报告。
                  </p>

                  <h4>一、目标用户画像与核心关注点分析</h4>
                  <p>
                    XXX精油蚊香液的核心用户主要集中在注重家庭健康、安全性与生活品质的消费群体，
                    包括有婴幼儿、孕妇、老人或宠物的家庭用户。这类用户在选择驱蚊产品时，
                    对成分天然性、安全等级以及长期使用的舒适度具有较高敏感度。
                  </p>
                  <p>
                    同时，随着消费者对传统燃烧型蚊香和化学驱蚊产品认知的提升，
                    越来越多用户开始主动搜索和咨询“无烟”“草本”“精油驱蚊”等关键词，
                    希望在保证驱蚊效果的前提下，减少对室内空气质量和人体健康的潜在影响。
                  </p>

                  <h4>二、用户常见问题（FAQ）整理结果</h4>

                  <p><strong>1. 关于驱蚊效果的常见问题</strong></p>
                  <ul>
                    <li>蕲艾精油的驱蚊效果是否优于普通艾草或传统蚊香？</li>
                    <li>在夜间睡眠场景下，驱蚊效果是否能够持续整晚？</li>
                    <li>在空调房、密闭空间中使用是否仍然有效？</li>
                  </ul>

                  <p><strong>2. 关于成分与安全性的常见问题</strong></p>
                  <ul>
                    <li>产品是否含有避蚊胺（DEET）等刺激性化学成分？</li>
                    <li>孕妇、婴幼儿及宠物是否可以长期使用？</li>
                    <li>是否会对呼吸道、皮肤或神经系统造成不良影响？</li>
                  </ul>

                  <p><strong>3. 关于使用方式与体验的常见问题</strong></p>
                  <ul>
                    <li>是否必须搭配专用电加热器使用？</li>
                    <li>建议在睡前多久开启，才能达到最佳驱蚊效果？</li>
                    <li>产品在使用过程中是否会产生刺鼻气味或烟雾？</li>
                  </ul>

                  <h4>三、产品优势与问题回应总结</h4>
                  <p>
                    针对上述用户关注问题，XXX精油蚊香液在原料选择、技术路径及使用体验方面
                    均具备较为明确的优势。产品选用被誉为“艾中之王”的蕲艾作为核心原料，
                    通过低温萃取工艺保留高含量的天然活性成分，
                    在干扰蚊虫嗅觉定位方面具有良好的天然驱避效果。
                  </p>
                  <p>
                    电加热恒温缓释技术实现了无烟、无火的持续挥发过程，
                    相比传统燃烧型蚊香，有效减少了烟尘与刺激性气味，
                    更适合长时间室内使用，尤其是在卧室及空调房环境中。
                  </p>

                  <h4>四、结论与后续内容建议</h4>
                  <p>
                    综合分析结果表明，XXX精油蚊香液在“安全性”“天然成分”“驱蚊效果”及“使用舒适度”等
                    用户高频关注维度上具备较强竞争力。建议在后续内容建设与生成式搜索优化中，
                    持续围绕真实使用场景、家庭健康诉求及用户关心的问题进行结构化输出，
                    以提升产品在 AI 问答与搜索推荐场景中的可信度与曝光率。
                  </p>

                </div>
              </blockquote>
              </div>
              <div class="task3-inner-box task3-source-box">
                <!-- 上半块：说明 + 展开/收起图标 -->
                <div class="source-header">
                  <span class="source-text">
                  信息来源链接：来自1个链接分析后生成
                  </span>
                </div>

                <!-- 下半块：具体来源链接 -->
                <div class="source-body">
                  <a :href="url" target="_blank" class="source-link">
                    {{ url }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="avatar-slot"></div>
      </div>
    </div>

    <!-- 右侧时间轴 -->
    <div class="right-timeline" v-if="showPlan">
      <div class="timeline-step" :class="{ active: activeStep === 1 }">
        <div class="dot" :class="{ gray: activeStep !== 1 }"></div>
        <div class="step-info">
          <div class="step-name">任务1:网站爬取</div>
          <div class="step-date">{{ time.slice(0, 10).replace(/-/g, '.') }}</div>
        </div>
      </div>

      <div class="timeline-step" :class="{ active: activeStep === 2 }">
        <div class="dot" :class="{ gray: activeStep !== 2 }"></div>
        <div class="step-info">
          <div class="step-name">任务2:信息提取</div>
          <div class="step-date">{{ time.slice(0, 10).replace(/-/g, '.') }}</div>
        </div>
      </div>

      <div class="timeline-step" :class="{ active: activeStep === 3 }">
        <div class="dot" :class="{ gray: activeStep !== 3 }"></div>
        <div class="step-info">
          <div class="step-name">任务3:问题生成</div>
          <div class="step-date">{{ time.slice(0, 10).replace(/-/g, '.') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { ChatLineRound, Select, CaretTop } from '@element-plus/icons-vue'

const props = defineProps({
  url: String,
  models: Array,
  time: String
})

const showPlan = ref(false)

const showTask1 = ref(false)
const showTask2 = ref(false)
const showTask3 = ref(false)

const task1Done = ref(false)
const task2Done = ref(false)
const task3Done = ref(false)

const activeStep = ref(1)

const modelNames = computed(() => {
  return props.models.map(m => `【${m.label}】`).join('、')
})



onMounted(() => {

  // 规划出现
  setTimeout(() => { showPlan.value = true }, 600)

  // 任务1：出现 -> 延时完成 -> 切到任务2
  setTimeout(() => {
    showTask1.value = true
    activeStep.value = 1

    setTimeout(() => {
      task1Done.value = true

      // 任务2
      showTask2.value = true
      activeStep.value = 2

      setTimeout(() => {
        task2Done.value = true

        // 任务3
        showTask3.value = true
        activeStep.value = 3

        setTimeout(() => {
          task3Done.value = true
        }, 1800) // 任务3完成延时（你可调）
      }, 3000) // 任务2完成延时（你可调）
    }, 4000) // 任务1完成延时（你可调）
  }, 7000)
})
</script>

<style scoped>
/* 动态界面样式 */
.fade-in { animation: fadeIn 0.5s ease; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

.chat-list { max-width: 1200px; margin: 0 auto; width: 100%; padding-right: 160px; }
.chat-item{
  display: grid;
  grid-template-columns: 50px 1fr 50px; /* 两侧头像固定，中间气泡统一 */
  column-gap: 15px;
  margin-bottom: 30px;
  align-items: start;
}
.avatar-slot{
  width: 50px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}
.avatar-slot.left{ justify-content: flex-start; }
.avatar-slot.right{ justify-content: flex-end; }

/* AI 行：中间列要撑满，让右边界统一 */
.chat-item.ai .chat-content-wrapper{ width: 100%; }

/* AI 气泡、任务卡：依旧占满中间列 */
.ai-bg{ width: 100%; }
.task-card{ width: 100%; }

.user-wrapper{
  width: 100%;
}
.user-name-row{
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  justify-content: flex-end; /* ✅ 用户在右侧 */
  gap: 15px;
}
.user-name{
  font-weight: bold;
  font-size: 18px;
  color: #333;
}
/* 用户行：让用户气泡贴中间列的右边界（与 AI 右边界一致） */
.chat-item.user .chat-content{
  width: 100%;       /* 按内容宽度显示 */
  text-align: right;
  background: transparent; /* 外层不画背景 */
  padding: 0;              /* 外层不加 padding */
}
.user-bubble-inner{
  display: inline-block;
  text-align: right;
  background: #eaf3ff;
  border-radius: 12px 0 12px 12px;
  padding: 15px;
}

.ai-name-row { margin-bottom: 5px; display: flex; align-items: center; gap: 15px; }
.ai-name { font-weight: bold; color: #333; font-size: 18px; }
.chat-time { font-size: 15px; color: #999; }

.chat-content { padding: 15px; border-radius: 12px; font-size: 18px; line-height: 1.6; max-width: 100%; }
.user-bg {
  background: #eaf3ff;      /* 浅蓝 */
  border-radius: 12px 0 12px 12px; /* 右上角直角，更像对话 */
  padding: 15px;
}
.ai-bg { background: white; border: 1px solid #eee; border-radius: 0 12px 12px 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.03); width: 100%;}
.chat-content,
.ai-bg,
.task-card {
  box-sizing: border-box;
}
.user-info-row { margin-bottom: 5px; }
.user-info-row .label { color: #333; font-weight: bold; }
.user-info-row .value { color: #333; font-weight: bold; }
.user-info-row .link { color: #0056b3; text-decoration: underline; }

.task-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px;
  margin-top: 10px;
  width: 100%;
}
.task-header {
  background: linear-gradient(
      90deg,
      #fde2e2 0%,
      #e6f7ff 50%,
      #fde2e2 100%
  );
  border: 1px solid #f3f4f6;
  border-radius: 8px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}
.status-badge { background: white; color: #67C23A; font-size: 12px; font-weight: bold; padding: 4px 10px; border-radius: 15px; display: flex; align-items: center; gap: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
.task-title { font-size: 18px; color: #333; font-weight: bold; flex: 1; margin: 0 15px; }
.expand-icon { background: white; padding: 4px; border-radius: 4px; cursor: pointer; }
.task-body {
  background: #e6f7ff;          /* 去掉浅蓝 */
  border: 1px solid #f3f4f6;    /* 第二个小框 */
  border-radius: 8px;
  padding: 16px;
}
.info-row { margin-bottom: 10px; font-size: 18px; color: #666; display: flex; align-items: center; }
.info-row .label { min-width: 70px; }
.info-row .link { font-size: 14px; color: #0056b3; text-decoration: none; word-break: break-all; }

.right-timeline {
  position: fixed;
  top: 100px;
  right: 0;
  transform: translateX(-20px);
  width: 140px;
  background: white;
  padding: 20px 10px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}
.timeline-step { display: flex; margin-bottom: 20px; position: relative; }
.timeline-step::before { content: ''; position: absolute; left: 5px; top: 10px; bottom: -20px; width: 1px; background: #eee; z-index: 0; }
.timeline-step:last-child::before { display: none; }
.dot { width: 10px; height: 10px; border-radius: 50%; background: #0056b3; margin-right: 10px; position: relative; z-index: 1; margin-top: 5px; }
.dot.gray { background: #e0e0e0; }
.step-name { font-size: 15px; color: #0056b3; font-weight: bold; margin-bottom: 2px; }
.step-date { font-size: 12px; color: #999; }

.report-quote {
  margin: 0;
  padding: 16px 18px;
  background: #f8fafc;
  border-left: 4px solid #93c5fd;
  border-radius: 6px;
}

.report-content h3 {
   font-size: 16px;
   font-weight: bold;
   margin: 16px 0 8px;
   color: #1f3a5f;
 }

.report-content h4 {
  font-size: 14px;
  font-weight: bold;
  margin: 12px 0 6px;
  color: #333;
}

.report-content p {
  font-size: 14px;
  line-height: 1.7;
  color: #555;
  margin-bottom: 8px;
}

.report-content ul,
.report-content ol {
  padding-left: 18px;
  margin-bottom: 10px;
}

.report-content li {
  font-size: 14px;
  line-height: 1.6;
  color: #555;
}

.task-mid{
  background: #ffffff;
  border: 1px solid #dbeafe;
  border-radius: 8px;
  padding: 12px 16px;
  margin: 0 0 12px; /* 与 task-card padding 对齐 */
  color: #1f3a5f;
  font-size: 14px;
  font-weight: 600;

}

/* 任务三：body 蓝色大框 */
.task3-body-blue{
  background: #e6f7ff;
  border: 1px solid #dbeafe;
  border-radius: 8px;
  padding: 12px;
}

/* body 蓝框内：两个内容小框（白色） */
.task3-inner-box{
  background: #ffffff;
  border: 1px solid #dbeafe;
  border-radius: 8px;
  padding: 12px;
}

/* 两个小框之间的间距 */
.task3-inner-box + .task3-inner-box{
  margin-top: 12px;
}

/* 报告正文小框：在这里滚动（不是整个 task-body 滚动） */
.task3-report-box{
  max-height: 420px;   /* 你要展示范围就调这个 */
  overflow-y: auto;
}

.task3-source-box{
  padding: 0; /* 由内部两块控制 padding */
  overflow: hidden;
}

/* 上半块：白色背景 */
.source-header{
  background: #ffffff;
  padding: 10px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f3f4f6;
}

.source-text{
  font-size: 14px;
  color: #1f3a5f;
  font-weight: 600;
}

/* 下半块：品红/粉红背景 */
.source-body{
  background: #fde2e2;   /* 品红/浅粉 */
  padding: 10px 12px;
}

.source-body .source-link{
  font-size: 14px;
  color: #1d4ed8;
  text-decoration: underline;
  word-break: break-all;
}

</style>