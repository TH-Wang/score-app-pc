import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../layout/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/index',
    component: Home,
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import(
          /* webpackChunkName: "Index" */
          '@/views/index/index.vue'
        )
      }
    ]
  },
  {
    path: '/auth',
    name: 'Auth',
    redirect: '/auth/login',
    component: () => import(/* webpackChunkName: "Auth" */ '@/layout/Auth'),
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import(
          /* webpackChunkName: "Login" */
          '@/views/Login.vue'
        )
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import(
          /* webpackChunkName: "Register" */
          '@/views/Register.vue'
        )
      }
    ]
  },
  {
    path: '/work',
    name: 'Work',
    component: () => import(/* webpackChunkName: "Work" */ '@/layout/Work')
  },
  {
    path: '/config',
    name: 'Config',
    component: () => import(/* webpackChunkName: "Config" */ '@/layout/Config'),
    children: [
      {
        path: 'edit',
        name: 'Edit',
        component: () => import(/* webpackChunkName: "Edit" */ '@/views/Edit')
      }
    ]
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
