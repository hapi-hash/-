<template>
    <div id="main-wrap">
        <div class="main-content">
            <div class="content">
                <router-view />
            </div>
        </div>
    </div>
</template>
<script>
import { ref, reactive } from '@vue/composition-api'
export default {
    name:"layoutMain",
    setup(){
        // const str = ref('{"name":"哈哈", "title":"12313"}')
        // console.log(str.value)
        // //字符串转对象
        // const json = reactive(JSON.parse(str.value))
        // console.log(jspn)
    }
}
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#main-wrap{
    position:fixed;
    left:$navMenu;
    top:75px;
    right:0;
    bottom:0;
    border:30px solid #f7f7f7;
    border-bottom:none;
    -webkit-box-shadow:border;
    // @include webkit(box-shadow, 0 3px 16px 0 rgba(0,0,0,.1));
    @include webkit(transition, all .3s ease 0s);
}
.open{
    #main-wrap{ left:$navMenu }
}
.close{
    #main-wrap{ left:$navMenuMin }
}
.content{
    width:100%;
    height:100%;
    padding:30px 30px 0 30px;
    -webkit-box-sizing:border-box;
    box-sizing: border-box;
    background-color: #fff;;
}
</style>