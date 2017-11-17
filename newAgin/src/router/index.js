import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/FrontPage/Home.vue'

import HelloWorld from '@/components/HelloWorld'
import Fabout from '@/components/FrontPage/Fabout.vue'
import Fliuyan from '@/components/FrontPage/Fliuyan.vue'
import Fnote from '@/components/FrontPage/Fnote.vue'
import Fphoto from '@/components/FrontPage/Fphoto.vue'
//note里面的子路由
import CNote from '@/components/FrontPage/Tag/c3note.vue'
import EchartsNote from '@/components/FrontPage/Tag/EchartsNote.vue'
import HighchartsNote from '@/components/FrontPage/Tag/HighchartsNote.vue'
import HtmlNote from '@/components/FrontPage/Tag/HtmlNote.vue'
import jsNote from '@/components/FrontPage/Tag/jsNote.vue'
import vueNote from '@/components/FrontPage/Tag/vueNote.vue'
//note 子路由里面的子路由
import CNoteChild from '@/components/FrontPage/Tag/tagchild/c3noteChild.vue'
import EchartsChild from '@/components/FrontPage/Tag/tagchild/EchartsChild.vue'
import HighchartsChild from '@/components/FrontPage/Tag/tagchild/HighchartsChild.vue'
import Htmlchild from '@/components/FrontPage/Tag/tagchild/Htmlchild.vue'
import jschild from '@/components/FrontPage/Tag/tagchild/jschild.vue'
import vuechild from '@/components/FrontPage/Tag/tagchild/vuechild.vue'



Vue.use(Router);

export default new Router({
  linkActiveClass:'active',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'Fabout',
      component: Fabout
    },
    {
      path: '/liuyan',
      name: 'Fliuyan',
      component: Fliuyan
    },
    {
      path: '/note',
      name: 'Fnote',
      component: Fnote,
      children:[
        {
          path:'/',// 设置默认自路由
          redirect:'vnote',
          name:'vueNote',
          component:vueNote
        },
        {
          path:'vnote',
          name:'vueNote',
          component:vueNote,
        },
        {
          path:'vuechild/:id',
          name:'vuechild',
          component:vuechild
        },
        {
          path:'cnote',
          name:'CNote',
          component:CNote,
        },
        {
          path:'c3child/:id',
          name:'c3child',
          component:CNoteChild
        },
        {
          path:'echart',
          name:'EchartsNote',
          component:EchartsNote,

        },
        {
          path:'echild/:id',
          name:'EchartsChild',
          component:EchartsChild
        },
        {
          path:'highchart',
          name:'HighchartsNote',
          component:HighchartsNote,
        },
        {
          path:'hchild/:id',
          name:'HighchartsChild',
          component:HighchartsChild
        },
        {
          path:'hnote',
          name:'HtmlNote',
          component:HtmlNote,
        },
        {
          path:'hchild/:id',
          name:'Htmlchild',
          component:Htmlchild
        },
        {
          path:'jsnote',
          name:'jsNote',
          component:jsNote,
        },
        {
          path:'jschild/:id',
          name:'jschild',
          component:jschild
        }
      ]
    },
    {
      path: '/photo',
      name: 'Fphoto',
      component: Fphoto
    },

  ]
})
