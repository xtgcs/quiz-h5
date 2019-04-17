import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: '谁是少数派？瓜分积分换大奖！'
      }
    },
    {
      path: '/author',
      name: 'author',
      component: () => import(/* webpackChunkName: "about" */ './views/Author.vue'),
      meta: {
        title: '活动授权'
      }
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import(/* webpackChunkName: "about" */ './views/detail.vue'),
      meta: {
        title: '竞猜详情'
      }
    },
    {
      path: '/prizeList',
      name: 'prizeList',
      component: () => import(/* webpackChunkName: "about" */ './views/prizeList.vue'),
      meta: {
        title: '往期记录'
      }
    },
    {
      path: '/record',
      name: 'record',
      component: () => import(/* webpackChunkName: "about" */ './views/record.vue'),
      meta: {
        title: '首页'
      }
    },
    {
      path: '/record-weixin',
      name: 'record-weixin',
      component: () => import(/* webpackChunkName: "about" */ './views/record-weixin.vue'),
      meta: {
        title: '竞猜记录'
      }
    },
    {
      path: '/quizRecord',
      name: 'quizRecord',
      component: () => import(/* webpackChunkName: "about" */ './views/quizRecord.vue'),
      meta: {
        title: '竞猜记录'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {//beforeEach是router的钩子函数，在进入路由前执行
  if (to.meta.title) {//判断是否有标题
    document.title = to.meta.title
  }
  next()//执行进入路由，如果不写就不会进入目标页
})

export default router