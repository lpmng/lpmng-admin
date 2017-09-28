import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import About from '@/components/About'

import UserIndex from '@/components/user/UserIndex'
import UserDetail from '@/components/user/UserDetail'
import UserCreate from '@/components/user/UserCreate'
import UserDetailUniq from '@/components/user/UserDetailUniq'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/About',
      name: 'About',
      component: About
    },
    {
      path: '/user/detail/:pseudo',
      component: UserDetailUniq,
      name: 'UserDetailUniq'
    },
    {
      path: '/user/detail',
      name: 'UserDetail',
      component: UserDetail
    },
    {
      path: '/user/new',
      name: 'UserCreate',
      component: UserCreate
    },
    {
      path: '/user',
      name: 'UserIndex',
      component: UserIndex
    },
    {
      path: '/index',
      name: 'Hello',
      component: Hello
    }
  ]
})
