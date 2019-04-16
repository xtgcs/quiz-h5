import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import(/* webpackChunkName: "about" */ './views/detail.vue')
    },
    {
      path: '/prizeList',
      name: 'prizeList',
      component: () => import(/* webpackChunkName: "about" */ './views/prizeList.vue')
    },
    {
      path: '/record',
      name: 'record',
      component: () => import(/* webpackChunkName: "about" */ './views/record.vue')
    },
    {
      path: '/quizRecord',
      name: 'quizRecord',
      component: () => import(/* webpackChunkName: "about" */ './views/quizRecord.vue')
    }
  ]
})