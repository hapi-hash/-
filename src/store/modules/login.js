import { Login } from "@/api/login";

const state = {
    isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false
}

const getters = {
    isCollapse: state => state.isCollapse
}

const mutations = {
    SET_COLLAPSE(state){ //必须的 同步 没有回调处理事情
    state.isCollapse = !state.isCollapse
    //html5本地存储
    sessionStorage.setItem('isCollapse',JSON.stringify(state.isCollapse))
    },
}

const actions = { //可以回调处理事情
    login(content, requestData){
    return new Promise((resolve, reject) => {
        //登录接口
        Login(requestData).then((response) => {
        resolve(response)
        }).catch((error) => {
        reject(error)
        })
    })
    }
}
export default {
    state,
    getters,
    mutations,
    actions
}
