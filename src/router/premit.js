import router, { defaultRouterMap } from "./index";
import store from "../store/index"
import { getToken, removeUsername, removeToken, removeAll } from "@/utils/app";
// import permission from "../store/modules/permission";


const whiteRouter = ['/login']; //indexOf方法，判断数组中是否存住指定的某个对象，如果不存在，则返回-1
/**
 * 路由守卫
 */
router.beforeEach((to, from, next) => {
  if(getToken()){
    //token存在
    if(to.path === '/login'){
      removeAll()
      store.commit("app/SET_TOKEN", '')
      store.commit("app/SET_USERNAME", '')
      next()
    }else{
      if(store.getters['permission/addRouters'].length === 0){
        store.dispatch('permission/getRoutes').then(response => {
          console.log(response)
          store.dispatch('permission/createRouter').then(response => {
            let addRouters = store.getters['permission/addRouters'];
            let allRouters = store.getters['permission/allRouters'];
            router.options.routes = allRouters;
            router.addRoutes(addRouters);
            next({...to,replace: true})
          })
        })
      }else{
        next()
      }
      
      
      //动态获取路由
      // if(store.getters['permission/roles'].length === 0) {
      //   //调用路由接口
      //   store.dispatch('permission/getRoutes').then(response => {
      //       let role = response;
      //       store.dispatch('permission/createRouter', role).then(response => {

      //       })
      //   })
      // }else{
      //   // next()
      //   console.log("存在")
      // }
      
      
    }
    
  }else{
    //token不存在
    // console.log("不存在")
    //防止死循环
    if(whiteRouter.indexOf(to.path) !== -1) {
      next()
    }else{
      next('/login')
    }
    
  }
    // console.log(to) //进入的页面（下一个页面）
    // console.log(from)//离开之前的页面（上一个）
    // console.log(next)
    // next()
  })