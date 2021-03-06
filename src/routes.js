import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '系统设置',
        iconCls: 'fa fa-cog',
        children: [
            { 
                path: '/user',
                component: () => import('@/views/system/user/list'),
                name: '用户管理'
            },
            {
                path: '/role',
                component: () => import('@/views/system/role/list'),
                name: '角色管理'
            },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '普通用户管理',
        iconCls: 'fa fa-user',
        children: [
            { 
                path: '/common-user',
                component: () => import('@/views/customer/list'),
                name: '用户清单'
            },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '店家管理',
        iconCls: 'fa fa-home',
        children: [
            { 
                path: '/store',
                component: () => import('@/views/store/list'),
                name: '店家清单'
            },
            { 
                path: '/coupon',
                component: () => import('@/views/store/coupon'),
                name: '体验券管理'
            },
            {
                path: '/discountCoupon',
                component: () => import('@/views/store/discountCoupon'),
                name: '折扣券管理'
            }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '订单管理',
        iconCls: 'fa fa-suitcase',
        children: [
            { 
                path: '/order',
                component: () => import('@/views/order/list'),
                name: '订单清单'
            },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '邀请函管理',
        iconCls: 'fa fa-send',
        children: [
            { 
                path: '/invite',
                component: () => import('@/views/invite/list'),
                name: '邀请函清单'
            },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '论坛管理',
        iconCls: 'fa fa-forumbee',
        children: [
            { 
                path: '/forum',
                component: () => import('@/views/forum/list'),
                name: '论坛清单'
            },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '备注',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { 
                path: '/remark',
                component: () => import('@/views/remark'),
                name: '备注'
            },
        ]
    },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '导航一',
    //     iconCls: 'el-icon-message',//图标样式class
    //     children: [
    //         { path: '/main', component: Main, name: '主页', hidden: true },
    //         { path: '/table', component: Table, name: 'Table' },
    //         { path: '/form', component: Form, name: 'Form' },
    //         { path: '/user', component: user, name: '列表' },
    //     ]
    // },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '导航二',
    //     iconCls: 'fa fa-id-card-o',
    //     children: [
    //         { path: '/page4', component: Page4, name: '页面4' },
    //         { path: '/page5', component: Page5, name: '页面5' }
    //     ]
    // },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '',
    //     iconCls: 'fa fa-address-card',
    //     leaf: true,//只有一个节点
    //     children: [
    //         { path: '/page6', component: Page6, name: '导航三' }
    //     ]
    // },
    // {
    //     path: '/',
    //     component: Home,
    //     name: 'Charts',
    //     iconCls: 'fa fa-bar-chart',
    //     children: [
    //         { path: '/echarts', component: echarts, name: 'echarts' }
    //     ]
    // },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;