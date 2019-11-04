import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    { path: '/', name: 'login', component: () => import('../pages/login') },
    { path: '/login', name: 'login', component: () => import('../pages/login') },
    {
        path: '/home/',
        name: 'home',
        component: () => import('../pages/home'),
        children: [
            { path: '/home/', name: 'order', component: () => import('../pages/home/orderManage') },
            { path: '/home/order', name: 'order', component: () => import('../pages/home/orderManage') },
            { path: '/home/account', name: 'account', component: () => import('../pages/home/accountManage') },
            { path: '/home/*', name: 'error', component: () => import('../pages/error') }
        ]
    }, // 首页
    { path: '/*', name: 'error', component: () => import('../pages/error') }
]

const router = new VueRouter({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes
})

// router.beforeEach((to, from , next) => {
//     // 用户信息
//     const userInfo = localStorage.getItem('userName');
//     if(userInfo || to.name === 'login'){
//         // 如果存在用户信息，或者进入的是登录页面，则直接进入
//         next()
//     }else{
//         // 不存在用户信息，未登录
//         next({
//             name: 'login',
//             query: {
//                 redirect: '/login'
//             }
//         })
//     }
// })

export default router;