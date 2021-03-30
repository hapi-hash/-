import router from "./index";
import store from "../store/index"
import { getToken, removeUsername, removeToken } from "@/utils/app";


const whiteRouter = ['/login']; //indexOf方法，判断数组中是否存住指定的某个对象，如果不存在，则返回-1
/**
 * 路由守卫
 */
router.beforeEach((to, from, next) => {
  console.log(to)
  if(getToken()){
    //token存在
    if(to.path === '/login'){
      removeToken()
      removeUsername()
      store.commit("app/SET_TOKEN", '')
      store.commit("app/SET_USERNAME", '')
      next()
    }
    next()
    console.log("存在")
  }else{
    //token不存在
    console.log("不存在")
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