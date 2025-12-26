// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

import Login from '@/views/Login.vue' // 1. 引入登录页

// Dashboard 下的子页面
import Workbench from '@/views/dashboard-sub/Workbench.vue'
import ArticleCreate from '@/views/dashboard-sub/ArticleCreate.vue'
import ArticleFeed from '@/views/dashboard-sub/ArticleFeed.vue'
import KnowLedge from '@/views/dashboard-sub/Knowledge.vue'
import Prompt from '@/views/dashboard-sub/Prompt.vue'
import ResultView from '@/views/dashboard-sub/ResultView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        // 2. 添加登录路由
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/',
            component: () => import('../views/DashBoard.vue'),
            children: [
                { path: '', name: 'home', redirect: { name: 'workbench' } },
                { path: 'workbench', name: 'workbench', component: Workbench },
                { path: 'knowledge', name: 'knowledge', component: KnowLedge },
                { path: 'prompt', name: 'prompt', component: Prompt },
                { path: 'article-create', name: 'article-create', component: ArticleCreate },
                { path: 'article-feed', name: 'article-feed', component: ArticleFeed },
                { path: 'result-track', name: 'result-track', component: ResultView },
            ],
        },
        {
            path: '/analysis',
            name: 'analysis',
            component: () => import('../views/Analysis.vue'),
        },
    ],
})

// 3. 添加路由守卫：没有Token则强制跳回登录页
router.beforeEach((to, from, next) => {
    // 模拟从 localStorage 获取 token
    const token = localStorage.getItem('geo_token')

    // 如果要去的是登录页，且已经有 token，直接去工作台
    if (to.name === 'login' && token) {
        next({ name: 'workbench' })
    }
    // 如果要去非登录页，且没有 token，强制去登录页
    else if (to.name !== 'login' && !token) {
        next({ name: 'login' })
    }
    // 其他情况放行
    else {
        next()
    }
})

export default router
