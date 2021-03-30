<template>
    <div id="nav-wrap">
        <h1 class="logo"><img src="@/assets/logo.png" alt=""></h1>   
        <!-- <div>
            <el-menu
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            default-active="/user/index"
            router
            >
            {{$route.path}}
            <NavSide :navMenus="routers"></NavSide>
            </el-menu>
            
        </div> -->
          <el-menu 
            :default-active="$route.path" 
            class="el-menu-vertical-demo" 
            :collapse="isCollapse" 
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :router='true'>

            <template v-for="(item, index) in routers">
                <el-submenu v-if="item.children" :key="index" :index="index + ''">
                  <!-- 一级菜单 -->
                    <template slot="title" v-if="item.children">
                        <svg-icon :iconClass="item.meta.icon" :classNmae="item.meta.icon" />
                        <span slot="title">{{ item.meta.name }}</span>
                    </template>
                    <!-- 子级菜单 -->
                    <el-menu-item v-for="subItem in item.children" :key="subItem.id" :index="subItem.path">{{ subItem.meta.name }}</el-menu-item>
                </el-submenu>
                <el-menu-item v-else :index="item.path" :key="index+'a'">{{ item.meta.name }}</el-menu-item>
            </template>
        </el-menu>
        <!-- <div class="navMenu">
            <label v-for="(navMenu,index) in routers" :key="index">
            <el-menu-item v-if="navMenu.childs==null&&navMenu.entity&&navMenu.entity.state==='ENABLE'"
                            :key="navMenu.entity.id" :data="navMenu" :index="navMenu.entity.name" :route="navMenu.entity.value"
                            disabled="">
                <i :class="navMenu.entity.icon"></i>
                <span slot="title">{{navMenu.entity.alias}}</span>
            </el-menu-item>
        
            <el-submenu v-if="navMenu.childs&&navMenu.entity&&navMenu.entity.state==='ENABLE'"
                        :key="navMenu.entity.id" :data="navMenu" :index="navMenu.entity.name">
                <template slot="title">
                <i :class="navMenu.entity.icon"></i>
                <span> {{navMenu.entity.alias}}</span>
                </template>
                <NavMenu :navMenus="navMenu.childs"></NavMenu>
            </el-submenu>
            </label>
        </div> -->
    </div>
   
</template>
<script>
import { reactive, ref, isRef, toRefs, onMounted, computed } from '@vue//composition-api'
import { mapState, mapActions } from "vuex";
import NavSide from './NavSide' 
export default {
    name: 'navMenu',
    components:{
        NavSide
    },
    data() {
        return {
            routers: {},
            routname: '',
            activeIndex: '/Components/index'
        }
    },
    computed: {
        isCollapse() {
            this.$store.state.app.isCollapse
        },
        routData(){
      		return this.$store.state.app.rouChilder
    	},
        topName() {
            return this.$store.state.app.topNavState
        }
       
    },
    watch: {
        routers(val){
            console.log(val)
        },
        routData(newVal,oldVal){
            // console.log(newVal.matched)
        },
        topName(newVal,oldVal) {
            // console.log(newVal)
            this.init(newVal)
        }
    },
    // setup(props, { root }){
    //     /**
    //      * data数据
    //      */
    //     // const isCollapse = ref(false)
    //     const routers = reactive(root.$router.options.routes)
    //     // console.log(routers)
    //     /***
    //      * computed监听
    //      */
    //     const isCollapse = computed(() => root.$store.state.app.isCollapse)
    //     /**
    //      * 函数
    //      */

    //     return{
    //         isCollapse,
    //         routers
    //     }
    // }


    //2.0写法
    // data(){
    //     return{
    //         isCollapse: false
    //     }
    // },
    // //挂载完成后自动执行
    mounted(){
        // console.log(this.$router.options.routes)
        // console.log(this.topName)
        this.init(this.topName)
    },

    methods:{
        // handleOpen(key, keyPath) {
        //     console.log(key, keyPath);
        // },
        // handleClose(key, keyPath) {
        //     console.log(key, keyPath);
        // }
        init(val) {
            // console.log(val)
            // console.log(this.$router.options.routes)
            let child = this.$router.options.routes;
            for(var i in child){
                if(child[i].type == val){
                    this.routers = child[i].children
                }
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#nav-wrap{
    position: fixed;
    top:75px;
    left:0;
    width:$navMenu; 
    height: calc(100vh - 75px);
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