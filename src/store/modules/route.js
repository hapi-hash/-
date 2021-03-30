

const state = {
    activeIndex:sessionStorage.getItem('activeIndex') || '/'
}

const getters = {
    
}

const mutations = {
    ACTIVE_INDEX(state,value) {
        state.activeIndex = value
        sessionStorage.setItem('activeIndex',value)
    }
}

const actions = { //可以回调处理事情
    
}
export default {
    namespaced:true,
    state,
    getters,
    mutations,
    actions
}
