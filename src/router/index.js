import { createRouter, createWebHistory } from 'vue-router'

import Workbench from '@/views/dashboard-sub/Workbench.vue'
import ArticleCreate from '@/views/dashboard-sub/ArticleCreate.vue'
import ArticleFeed from '@/views/dashboard-sub/ArticleFeed.vue'
import KnowLedge from '@/views/dashboard-sub/Knowledge.vue'
import Prompt from '@/views/dashboard-sub/Prompt.vue'
import ResultView from '@/views/dashboard-sub/ResultView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: () => import('../views/DashBoard.vue'),
            children: [
                // ✅ 关键：默认进入工作台（不带 /dashboard）
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

export default router
