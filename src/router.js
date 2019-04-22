import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      redirect:'/home/album',
      component: () => import('./views/Home.vue'),
      children:[
        {
          path:'/home/album',
          component: ()=>import('./views/album/Album.vue')
        },
        {
          path:'/home/newalbum',
          component: ()=>import('./views/album/Newalbum.vue')
        },
        {
          path:'/home/hotalbum',
          component: ()=>import('./views/album/Hotalbum.vue')
        }
      ]
    },
    {
      path: '/about',
      component: () => import('./views/About.vue')
    },
    {
      path: '/search',
      component: () => import('./views/Search.vue')
    },
    { 
      path:'/historylist',
      component: () => import('./views/Historylist.vue')
    },
    {
      path: '/broadcast',
      component: () => import('./views/Broadcast.vue')
    },
    {
      path: '/singer',
      component: () => import('./views/Singer/Singer.vue'),
      children: [
        { 
        path: ':id', 
        component: () => import('./views/Singer/Singerdet.vue')
        }
      ]
    },
    {
      path: '/rank',
      component: () => import('./views/Rank.vue')
    },
    {
      path: '/suggest',
      component: () => import('./views/Suggest.vue')
    },
    {
      path:'/user',
      component: () => import('./views/Cuser.vue'),
      children:[
        {
          path:':id',
          component:() =>impotant('./views/user/User.vue')
        }
      ]
    },
    {
      path: '/singlist',
      component: () => import('./views/login/Login.vue'),
      children:[
        {
        path: ':id',
        component: () => import('./views/Singlist.vue')
        }
      ]
    },
    {
      path:"*",redirect:"/home/album",
    }

  ]
})
