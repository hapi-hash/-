import Vue from "vue";
import Router from "vue-router";

//引入布局组件

import Layout from "@/views/Layout/index.vue"
import Console from "@/views/Console/index.vue"

Vue.use(Router);

export default new Router({
  routes : [
    {
      path: "/",
      redirect: "login",
      hidden:true,
      meta: {
        name: "主页"
      }
    },
    /**
     * 登录
     */
    {
      path: "/login",
      name: "Login",
      hidden:true,
      meta: {
        name: "登录"
      },
      component: () => import("../views/Login/index.vue")
    },
    /**
     * 首页
     */
    {
      path: "/components",
      name: "Components",
      type:'components',
      redirect: "/Components/index",
      meta: {
        name: "首页",
        icon:"components"
      },
      component: Layout,
      children: [
        {
          path: "/Components/index",
          name: "/components",
          meta: {
            name: "首页"
          },
          component: () => import("../views/Components/index.vue"),
        },
        
      ]
    },
    /**
     * 控制台
     */
    {
      path: "/console",
      name: "Console",
      type:'console',
      index:'1',
      redirect: "/console/index",
      meta: {
        name: "控制台",
        icon:"console"
      },
      component: Layout,
      children: [
        {
          index:'1-1',
          path: "/console/index",
          name: "/console",
          meta: {
            name: "首页"
          },
          component: Console,
          redirect: "/b/messer",
          children: [
            {
              index:'1-1-1',
              path: "/b/messer",
              name: "/console",
              meta: {
                name: "企业信息"
              },
              component: () => import("../views/Console/messer.vue"),
            },
            {
              index:'1-1-2',
              path: "/b/aaa",
              name: "/console",
              meta: {
                name: "公司信息"
              },
              component: () => import("../views/Console/aaa.vue"),
            },
          ],
        }
      ]
    },
    /**
     * 信息管理
     */
    {
      path: "/info",
      name: "Info",
      type:'info',
      redirect: "/info/index",
      meta: {
        name: "信息管理",
        icon:"info"
      },
      component: Layout,
      children: [
        {
          path: "/info/index",
          name: "/info",
          meta: {
            name: "信息列表"
          },
          component: () => import("../views/Info/index.vue"),
        },
        {
          path: "/info/category",
          name: "/info",
          meta: {
            name: "信息分类"
          },
          component: () => import("../views/Info/category.vue"),
        }
      ]
    },
    /**
     * 用户管理
     */
    {
      path: "/user",
      name: "User",
      type:'user',
      redirect: "/user/index",
      meta: {
        name: "用户管理",
        icon:"user"
      },
      component: Layout,
      children: [
        {
          path: "/user/index",
          name: "/user",
          meta: {
            name: "用户列表"
          },
          component: () => import("../views/User/index.vue"),
        },
        {
          path: "/user/userlist",
          name: "/user",
          meta: {
            name: "用户列表"
          },
          component: () => import("../views/User/userlist.vue"),
        }
      ]
    }
  ]
})

