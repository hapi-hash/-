import Vue from "vue";
import Router from "vue-router";

//引入布局组件

import Layout from "@/views/Layout/index.vue"
import Console from "@/views/Console/index.vue"

Vue.use(Router);
/**
 * 默认路由
 */
export const defaultRouterMap = [
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
  {
    path: "/page404",
    name: "404",
    meta: {
      name: "404",
      icon:"404"
    },
    hidden: true,
    component: Layout,
    children: [
      {
        path: "/404",
        name: "404",
        meta: {
          name: "404"
        },
        component: () => import("../views/404.vue"),
      },
      
    ]
  },
  // { path: "*", redirect: "/404", hidden: true}
]
export const asnycRouterMap = [
  /**
     *  所有子级（children 无限级）的name要和一级path一样，子路由跳转的时候根据name设置一级的选中
     * children：子级的数组
     * type：根据一级的type来获取当前选中的所有子级
     * redirect：一级的 redirect是重定向到当前子级的页面，地址一定是子级的path
     * component：一级component是确定在某个模板上显示内容，子级的component是引入当前页面的路径（如果有三级，第二级的component和第一级的名字一样，是显示内容的模板）
     * 子级的path是访问地址域名后面的地址，可以随意更改，如果有重定向（redirect）需要注意的是要和一级的redirect一致
     * name：一级的meta下的name是渲染出来头部导航的名字，子级的meta下的name是左侧菜单栏的名字
     * icon：目前只有一级有，暂定和type一样
     */
       /**
     * 控制台
     */
    {
      path: "/console", //一级访问地址
      name: "/Console/index", //根据name选中状态（头部导航）
      type:'console', //根据type获取子级路由
      redirect: "/console/index",
      meta: {
        name: "控制台",
        icon:"console"
      },
      component: 'Layout',
      children: [
        {
          path: "/console/index",
          name: "/console", //根据name来确定一级是否选中
          meta: {
            name: "企业模块"
          },
          component: 'Layout',
          redirect: "/Console/messer",
          children: [
            {
              path: "/Console/messer",
              name: "/console",
              meta: {
                name: "企业信息"
              },
              component:"/Console/messer",
            },
            {
              path: "/Console/aaa",
              name: "/console",
              meta: {
                name: "公司信息"
              },
              component: "/Console/aaa",
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
    name: "/Info",
    type:'info',
    redirect: "/Info/index",
    meta: {
      name: "伙伴管理",
      icon:"info"
    },
    component: 'Layout',
    children: [
      {
        path: "/Info/index",
        name: "/info",
        meta: {
          name: "伙伴等级管理"
        },
        component: "/Info/index",
      },
      {
        path: "/Info/category",
        name: "/info",
        meta: {
          name: "信息分类"
        },
        component: "/Info/category",
      },
      {
        path: "/Info/supplierList",
        name: "/info",
        meta: {
          name: "供应商列表"
        },
        component: "/Info/supplierList",
      }
    ]
  },
  /**
   * 用户管理
   */
  {
    path: "/user",
    name: "/User",
    type:'user',
    redirect: "/User/index",
    meta: {
      name: "订单管理",
      icon:"user"
    },
    component: 'Layout',
    children: [
      {
        path: "/User/index",
        name: "/user",
        meta: {
          name: "商品订单"
        },
        component: "/User/index",
      },
      {
        path: "/User/userlist",
        name: "/user",
        meta: {
          name: "品牌列表"
        },
        component: "/User/userlist",
      }
    ]
  }
]
export default new Router({
  routes : defaultRouterMap
})


