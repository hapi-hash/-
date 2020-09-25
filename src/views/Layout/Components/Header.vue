<template>
    <div id="header-wrap">
        <div class="pull-left header-icon" @click="navMenuState"><svg-icon iconClass="menu" className="menu" /></div>
        <div class="pull-right">
            <div class="user-info">
                <img src="@/icons/morentouxiang.png" alt="" class="user-img">
                管理员
            </div>
            <div class="header-icon" @click="exit()"><svg-icon iconClass="exit" className="exit" /></div>
        </div>
    </div>
</template>
<script>
import { computed } from '@vue/composition-api'
export default {
    name:'Header',
    setup(props, { root }){
        //获取用户 的名字
        const username = computed(() => root.$store.state.app.username);
        //退出
        const exit = () =>{
            root.$store.dispatch('app/exit').then(() => {
                root.$router.push({
                    name: 'Login'
                })
            })
        }

        const navMenuState = () => {
            root.$store.commit('app/SET_COLLAPSE')
            // root.$store.dispatch('setMenuStatus', {"name":"aaa"}) 
        }


        return {
            navMenuState,
            username,
            exit
        }
    }
}
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#header-wrap{
    position: fixed;
    top:0;
    right:0;
    left:$navMenu;
    height:75px;
    background: #fff;
    @include webkit(box-shadow, 0 3px 16px 0 rgba(0,0,0,.1));
    @include webkit(transition, all .3s ease 0s);
    line-height: 75px;
}
.open{
    #header-wrap{ left:$navMenu }
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
    float: right;
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