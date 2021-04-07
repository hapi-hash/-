import { getRoute } from "@/api/login";
import { defaultRouterMap, asnycRouterMap } from "@/router"
import Layout from "@/views/Layout/index.vue"
// import Console from "@/views/Console/index.vue"
function filterAsyncRouter(asyncRouterMap) { //遍历后台传来的路由字符串，转换为组件对象
    const accessedRouters = asyncRouterMap.filter(route => {
      if (route.component) {
        if (route.component === "Layout") { //Layout组件特殊处理
          route.component = Layout
        }else {
          route.component = loadView(route.component)
        }
      }
      if (route.children && route.children.length>0) {
        route.children = filterAsyncRouter(route.children)
      }
      return true
    })
    return accessedRouters
  }
  export const loadView = (view) => { // 路由懒加载
    return (resolve) => require([`@/views${view}.vue`] ,resolve)
  }
  
const state = {
    roles: [],
    addRouters:[],
    allRouters: defaultRouterMap
}

const getters = {
   roles: state => state.roles,
   addRouters: state => state.addRouters, //后台获取的路由
   allRouters: state => state.allRouters //所有的路由
}

const mutations = {
    SET_ROLES(state, value) {
        state.roles = value
    },
    SET_ROUTER(state, router) {
        state.addRouters = router
        state.allRouters = defaultRouterMap.concat(router)
    }
}

const actions = { 
    /**
     * 获取动态路由
     * @param {*} param0 
     * @param {*} requestData 
     * @returns 
     */
    getRoutes({ commit }, requestData){
        return new Promise((resolve, reject) => {
            //动态获取路由
            getRoute().then(response => {
                // console.log(response.data)
                let role = response.data;//动态获取的路由数组
                commit('SET_ROLES',role)//储存获取的数组
                resolve(role) //返回获取的数据
            })
            
        }) 
    },
    createRouter({ commit }, data){
        return new Promise((resolve, reject) => {
            //更新路由
            
            let addRouters = filterAsyncRouter(asnycRouterMap)
            addRouters.push({ path: '*', redirect: '/404', hidden: true })
            console.log(addRouters);
            commit('SET_ROUTER', addRouters)
            resolve()
            // const addRouters = asnycRouterMap.filter(item => {
            //     console.log(item)
            // })
        }) 
    },
   
}

export default {
    namespaced:true,
    state,
    getters,
    mutations,
    actions
}
