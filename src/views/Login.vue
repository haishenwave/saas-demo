<!-- src/views/Login.vue -->
<template>
  <div class="login-container">
    <!-- 左侧品牌区 -->
    <div class="brand-section">
      <div class="brand-content">
        <div class="logo-text">GEO AI SYSTEM</div>
        <div class="slogan-large">新一代<br>企业内容增长引擎</div>
        <div class="slogan-sub">基于 AI 的全链路内容生成与 GEO 效果分析平台</div>
        <div class="decoration-circle"></div>
      </div>
    </div>

    <!-- 右侧表单区 -->
    <div class="form-section">
      <div class="form-wrapper">
        <div class="welcome-text">欢迎登录</div>
        <div class="sub-welcome">请输入您的账号和密码</div>

        <div class="input-group">
          <div class="label">账号</div>
          <el-input
              v-model="form.username"
              placeholder="请输入账号"
              size="large"
              class="custom-input"
          >
            <template #prefix>
              <svg class="input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 22H18V20C18 18.3431 16.6569 17 15 17H9C7.34315 17 6 18.3431 6 20V22H4V20C4 17.2386 6.23858 15 9 15H15C17.7614 15 20 17.2386 20 20V22ZM12 13C8.68629 13 6 10.3137 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7C18 10.3137 15.3137 13 12 13ZM12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"></path></svg>
            </template>
          </el-input>
        </div>

        <div class="input-group">
          <div class="label">密码</div>
          <el-input
              v-model="form.password"
              type="password"
              placeholder="请输入密码"
              show-password
              size="large"
              class="custom-input"
              @keyup.enter="handleLogin"
          >
            <template #prefix>
              <svg class="input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6 8V7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7V8H20C20.5523 8 21 8.44772 21 9V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V9C3 8.44772 3.44772 8 4 8H6ZM19 10H5V20H19V10ZM11 15.7324C10.4022 15.3866 10 14.7403 10 14C10 12.8954 10.8954 12 12 12C13.1046 12 14 12.8954 14 14C14 14.7403 13.5978 15.3866 13 15.7324V18H11V15.7324ZM8 8H16V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V8Z"></path></svg>
            </template>
          </el-input>
        </div>

        <div class="action-row">
          <el-checkbox v-model="form.remember">记住密码</el-checkbox>
          <span class="forgot-pwd">忘记密码？</span>
        </div>

        <button
            class="login-btn"
            :class="{ 'is-loading': loading }"
            @click="handleLogin"
        >
          {{ loading ? '登录中...' : '立即登录' }}
        </button>

        <div class="footer-tip">
          还没有账号？ <span class="register-link">立即注册企业版</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const loading = ref(false)

const form = reactive({
  username: '',
  password: '',
  remember: true
})

const handleLogin = () => {
  if (!form.username || !form.password) {
    ElMessage.warning('请输入账号和密码')
    return
  }

  loading.value = true

  // 模拟登录请求延迟
  setTimeout(() => {
    loading.value = false

    // 简单的模拟验证
    // 在这里修改账号和密码
    if (form.username === 'dxsgeo' && form.password === 'dxsgeo') {
      // 1. 存储 Token (模拟)
      sessionStorage.setItem('geo_token', 'mock_token')

      ElMessage.success('登录成功')

      // 2. 跳转到工作台
      router.push({ name: 'workbench' })
    } else {
      ElMessage.error('账号或密码错误 (默认: admin / 123456)')
    }
  }, 1000)
}
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100vh;
  display: flex;
  background: #fff;
  overflow: hidden;
}

/* --- 左侧品牌区 --- */
.brand-section {
  flex: 1;
  background: linear-gradient(135deg, #1c2438 0%, #2f6bff 100%);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px;
  overflow: hidden;
}

/* 装饰背景圆 */
.decoration-circle {
  position: absolute;
  top: -100px;
  right: -100px;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  z-index: 1;
}
.brand-section::after {
  content: "";
  position: absolute;
  bottom: -150px;
  left: -100px;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: rgba(47, 107, 255, 0.2);
  filter: blur(80px);
  z-index: 1;
}

.brand-content {
  position: relative;
  z-index: 10;
  color: #fff;
  max-width: 500px;
}

.logo-text {
  font-size: 24px;
  font-weight: 900;
  letter-spacing: 2px;
  margin-bottom: 40px;
  opacity: 0.8;
}

.slogan-large {
  font-size: 56px;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 24px;
  text-shadow: 0 4px 20px rgba(0,0,0,0.2);
}

.slogan-sub {
  font-size: 20px;
  opacity: 0.8;
  font-weight: 300;
  line-height: 1.6;
}

/* --- 右侧表单区 --- */
.form-section {
  width: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
}

.form-wrapper {
  width: 380px;
  padding: 40px;
}

.welcome-text {
  font-size: 32px;
  font-weight: 900;
  color: #303133;
  margin-bottom: 10px;
}

.sub-welcome {
  color: #909399;
  margin-bottom: 40px;
  font-size: 16px;
}

.input-group {
  margin-bottom: 24px;
}

.label {
  font-size: 14px;
  color: #606266;
  font-weight: 700;
  margin-bottom: 8px;
}

:deep(.custom-input .el-input__wrapper) {
  background-color: #f5f7fa;
  box-shadow: none;
  border: 1px solid transparent;
  border-radius: 8px;
  padding: 4px 12px;
}
:deep(.custom-input .el-input__wrapper:hover),
:deep(.custom-input .el-input__wrapper.is-focus) {
  background-color: #fff;
  border-color: #2f6bff;
  box-shadow: 0 0 0 1px #2f6bff inset;
}

.action-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}
.forgot-pwd {
  color: #2f6bff;
  cursor: pointer;
  font-size: 14px;
}

.login-btn {
  width: 100%;
  height: 50px;
  background: #2f6bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 10px 20px rgba(47, 107, 255, 0.15);
}
.login-btn:hover {
  background: #1e5add;
  transform: translateY(-2px);
  box-shadow: 0 14px 24px rgba(47, 107, 255, 0.25);
}
.login-btn.is-loading {
  opacity: 0.7;
  cursor: not-allowed;
}

.footer-tip {
  margin-top: 30px;
  text-align: center;
  color: #909399;
  font-size: 14px;
}
.register-link {
  color: #2f6bff;
  font-weight: 700;
  cursor: pointer;
}

.input-icon {
  width: 16px;
  height: 16px;
  fill: #909399; /* 灰色 */
}
</style>
