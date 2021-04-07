<template>
    <div id="nav-wrap"  >
        <h1 class="logo"><img src="@/assets/logo.png" alt=""></h1>
      
          <el-menu
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
           >

            <template v-for="(item, index) in routers" v-if="routers.length">
                <el-submenu v-if="item.children" :key="index" :index="index + ''">
                  <!-- 一级菜单 -->
                    <template slot="title" v-if="item.children">
                        <svg-icon :iconClass="item.meta.icon" :classNmae="item.meta.icon" />
                        <span slot="title">{{ item.meta.name }}</span>
                    </template>
                    <!-- 子级菜单 -->
                    <el-menu-item v-for="subItem in item.children" :key="subItem.id" :index="subItem.path">{{ subItem.meta.name }}</el-menu-item>
                </el-submenu>
                <el-menu-item v-else :index="item.path" :key="index">{{ item.meta.name }}</el-menu-item>
            </template>
        </el-menu>
    </div>

</template>
<script>
// import { reactive, ref, isRef, toRefs, onMounted, computed } from '@vue//composition-api'
// import { mapState, mapActions } from "vuex";
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
            activeIndex: '/'
        }
    },
    computed: {
        //所有路由
        routData(){
      		return this.$store.state.app.rouChilder
    	},
        //获取对应的children
        topName() {
            return this.$store.state.app.topNavState
        }

    },
    watch: {
        routData(newVal,oldVal){
        },
        topName(newVal,oldVal) {
            this.init(newVal)
        }
    },
   
    // //挂载完成后自动执行
    mounted(){
        this.init(this.topName)
    },

    methods:{
       //获取子路由
        init(val) {
            
            this.routers = []
            setTimeout(()=>{
                  let child = this.$router.options.routes;
                    for(var i in child){
                        if(child[i].type == val){
                            
                            this.routers = child[i].children
                        }
                    }
                    this.activeIndex =  this.routers[0].path
            },0)
          
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
