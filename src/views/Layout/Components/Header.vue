<template>
    <div id="header-wrap">
        <div class="pull-left header-icon" @click="navMenuState"><svg-icon iconClass="menu" className="menu" /></div>
        <div class="headerNav">
            <!-- {{activeMenu}} -->
        </div>
        <div class="pull-right">
            <el-row>
                <el-col :span="14">
                
                    <el-menu
                        :default-active="$route.name"
                        class="el-menu-demo"
                        mode="horizontal"
                        active-text-color="#000"
                        @select="handleSelect"
                        :router="true"
                    > 
                        <!-- <el-menu-item index="/home/index">评优系统</el-menu-item> -->
                        <template v-for="item in routers">
                            <el-menu-item :index="item.path" v-if="!item.hidden" :key="item.id" >{{ item.meta.name }}</el-menu-item>
                        </template>
                        <!-- <el-menu-item index="/dict">过程管理</el-menu-item> -->
                        <!-- <el-menu-item index="/info">信息管理</el-menu-item>
                        <el-menu-item index="/user">用户管理</el-menu-item> -->
                    </el-menu>
                
                </el-col>
                <el-col :span="10">
                    <div class="user-info">
                        <img src="@/icons/morentouxiang.png" alt="" class="user-img">
                        管理员
                    </div>
                    <div class="header-icon" @click="exit()"><svg-icon iconClass="exit" className="exit" /></div>
                </el-col>
            </el-row>
            
        </div>
    </div>
</template>
<script>
import {reactive, computed } from '@vue/composition-api'
// import { reactive, ref, isRef, toRefs, onMounted, computed } from '@vue//composition-api'
export default {
    name:'Header',
    data() {
        return {
            routers: reactive(this.$router.options.routes),
            defaultActiveIndex: '/',
            activeIndex: "/"
        }
    },
    created() {
        const route = this.$route
         const { meta, path, name, redirectedFrom } = route
        this.activeIndex = redirectedFrom
        console.log(redirectedFrom)
        // console.log(this.$store.state.route.activeIndex)
        // activeMenu() {
        //     const route = this.$route
        //     const { meta, path, name } = route
        //     console.log(name)
        //     // if set path, the sidebar will highlight the path you set
        //     // console.log( meta, path)
        //     if (meta.activeMenu) {
        //         return meta.activeMenu
        //     }
        //     console.log(path)
        //     this.$store.commit('app/ROU_CHILDER',path)
        //     return name
        // }
    },
    computed: {
        activeMenu() {
        const route = this.$route
        const { meta, path, name } = route
        // console.log(path)
        // if set path, the sidebar will highlight the path you set
        // console.log( meta, path)
        if (meta.activeMenu) {
            return meta.activeMenu
        }
        // console.log(path)
        this.$store.commit('app/ROU_CHILDER',path)
        return path
        
        },
    },
    watch: {
        $route: function(to, from) {
            
        // 路由改变时执行
        //console.info("to.path:" + to.path);
        // this.defaultActiveIndex ='/'+ this.$route.name
        
        // this.activeIndex = to.redirectedFrom
        console.log(this.activeIndex)
        this.$store.commit('app/ROU_CHILDER',to)
        this.fetchNavData();
        this.setCurrentRoute();
        }
    },
    mounted() {
    },
    methods: {
        setCurrentRoute() {
            this.activeIndex= this.$route.path; // 通过他就可以监听到当前路由状态并激活当前菜单
        },
        exit() {
            this.$store.dispatch('app/exit').then(() => {
                this.$router.push({
                    name: 'Login'
                })
            })
        },
        navMenuState() {
            this.$store.commit('app/SET_COLLAPSE')
            // root.$store.dispatch('setMenuStatus', {"name":"aaa"}) 
        },
        handleSelect(index) {
            this.defaultActiveIndex = index;
            
            
        },
        fetchNavData() {
            // 初始化菜单激活项
            let cur_path = this.$route.path; //获取当前路由
            let routers = this.$router.options.routes; // 获取路由对象
            // console.log(cur_path.split('/'))
            let nav_type = "",
                nav_name = "";
            for (var i = 0; i < routers.length; i++) {
                let children = routers[i].children;
                // console.log((routers[i].type))
                //如果有childer
                if (children) {
                for (let j = 0; j < children.length; j++) {

                    // console.log(children[j])
                    if (children[j].path === cur_path) {
                        console.log(routers[i].name)
                    nav_type = routers[i].type;
                    nav_name = routers[i].name;
                    break;
                    }
                    // 如果该菜单下还有子菜单
                    if (children[j].children) {
                    let grandChildren = children[j].children;
                    for (let z = 0; z < grandChildren.length; z++) {
                        if (grandChildren[z].path === cur_path) {
                        nav_type = routers[i].type;
                        nav_name = routers[i].name;
                        // 
                        break;
                        }
                    }
                    }
                }
                }
            }
            // console.log(cur_path,routers)
            this.$store.state.topNavState = nav_type;
            this.$store.commit('app/TOPNAVSRTATE',nav_type)
            this.$store.state.leftNavState = nav_name;
            // console.log(nav_type)
            if (nav_type == "home") {
                this.defaultActiveIndex = "/";
            } else {
                this.defaultActiveIndex = "/" + nav_name + "Manager";
            }
        },
    },
    // setup(props, { root }){
    //     const routers = reactive(root.$router.options.routes)
    //     console.log(routers)
    //     const defaultActiveIndex = '/'
    //     //获取用户 的名字
        
    //     const username = computed(() => root.$store.state.app.username);
    //     const activeMenu = computed(() =>{
    //         const route = root.$route
    //         const { meta, path } = route
    //         // if set path, the sidebar will highlight the path you set
    //         console.log( meta, path)
    //         if (meta.activeMenu) {
    //             return meta.activeMenu
    //         }
    //         return path
    //     } )
    //     //退出
    //     const exit = () =>{
    //         root.$store.dispatch('app/exit').then(() => {
    //             root.$router.push({
    //                 name: 'Login'
    //             })
    //         })
    //     }

    //     const navMenuState = () => {
    //         root.$store.commit('app/SET_COLLAPSE')
    //         // root.$store.dispatch('setMenuStatus', {"name":"aaa"}) 
    //     }
    //     const handleSelect = (index) => {
    //         root.defaultActiveIndex = index;
    //         console.log(root.defaultActiveIndex)
    //     }

    //     return {
    //         navMenuState,
    //         username,
    //         exit,
    //         handleSelect,
    //         activeMenu,
    //         routers
    //     }
    // }
}
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#header-wrap{
    position: fixed;
    top:0;
    right:0;
    left:0;
    height:75px;
    background: #fff;
    @include webkit(box-shadow, 0 3px 16px 0 rgba(0,0,0,.1));
    @include webkit(transition, all .3s ease 0s);
    line-height: 75px;
}
.open{
    // #header-wrap{ left:$navMenu }
}
.close{
    #header-wrap{ left:$navMenuMin }
}
.header-icon{
    padding:0 32px;
    svg{
        margin-bottom:-8px;
        font-size: 25px;
        cursor: pointer;
    }
}
.pull-right{
    div{
        display: inline-block;
    }
}
.pull-left{
    float: left;
}
.pull-right{
    // float: right;
}
.user-info{
    height:100%;
    padding:0 32px;
    border-right:1px solid #ededed;
}
.user-img{
    width:50px;
    height:50px;
    border-radius: 50%;
    vertical-align:middle;
    margin-right:20px;
}
</style>