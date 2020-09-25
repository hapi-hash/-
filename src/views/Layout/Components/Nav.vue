<template>
    <div id="nav-wrap">
        <h1 class="logo"><img src="@/assets/logo.png" alt=""></h1>   
        <el-menu 
            default-active="1-4-1" 
            class="el-menu-vertical-demo" 
            :collapse="isCollapse" 
            background-color="transparent" 
            text-color="#fff" 
            active-text-color="#fff"
            router>

            <template v-for="(item, index) in routers">
                <el-submenu v-if="!item.hidden" :key="item.id" :index="index + ''">
                    <!-- 一级菜单 -->
                    <template slot="title">
                        <svg-icon :iconClass="item.meta.icon" :classNmae="item.meta.icon" />
                        <span slot="title">{{ item.meta.name }}</span>
                    </template>
                    <!-- 子级菜单 -->
                    <el-menu-item v-for="subItem in item.children" :key="subItem.id" :index="subItem.path">{{ subItem.meta.name }}</el-menu-item>
                </el-submenu>
            </template>
        </el-menu>
        
    </div>
</template>
<script>
import { reactive, ref, isRef, toRefs, onMounted, computed } from '@vue//composition-api'
export default {
    name: 'navMenu',
    setup(props, { root }){
        /**
         * data数据
         */
        // const isCollapse = ref(false)
        const routers = reactive(root.$router.options.routes)
        // console.log(routers)
        /***
         * computed监听
         */
        const isCollapse = computed(() => root.$store.state.app.isCollapse)
        /**
         * 函数
         */

        return{
            isCollapse,
            routers
        }
    }


    //2.0写法
    // data(){
    //     return{
    //         isCollapse: false
    //     }
    // },
    // //挂载完成后自动执行
    // mounted(){
    //     console.log(this.$router.options.routes)
    // },

    // methods:{
    //     handleOpen(key, keyPath) {
    //         console.log(key, keyPath);
    //     },
    //     handleClose(key, keyPath) {
    //         console.log(key, keyPath);
    //     }
    // }
}
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#nav-wrap{
    position: fixed;
    top:0;
    left:0;
    width:$navMenu; 
    height: 100vh;
    background:#344a5f;
    @include webkit(transition, all .3s ease 0s);
    svg {
        font-size: 20px;
        margin-right: 10px;
    }
}
.logo{
    text-align: center;
    img{
        @include webkit(transition, all .3s ease 0s);
        margin:0 auto;
        width:92px;
        display: block;
    }
}
.open{
    #nav-wrap{ width:$navMenu }
}
.close{
    #nav-wrap{ width:$navMenuMin }
    .logo img{ width: 70%; }
}
</style>