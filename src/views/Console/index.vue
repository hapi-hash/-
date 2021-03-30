<template>
    <div id="login">
        <router-view />
        <!-- <div id="myChart" :style="{width: '300px', height: '300px'}"></div> -->
        <!-- <div tag="div" class="container">
            <div class="item" v-for="(item,index) in items" :key="item.key" :style="{background:item.color,width:'80px',height:'80px'}"
                draggable="true"
                @dragstart="handleDragStart($event, item)"
                @dragover.prevent="handleDragOver($event, item)"
                @dragenter="handleDragEnter($event, item)"
                @dragend="handleDragEnd($event, item)" >
            </div>
            <div @click="btn">提交</div>
        </div> -->
    </div>
</template>
<script>
import { GetSms } from "@/api/login";
import { getToken } from "@/utils/app";
require('echarts/lib/chart/bar')
export default {
     name:'login',
    data(){
      return {
        items: [
            { key: 1, color: 'red'},
            { key: 2, color: 'blue'},
            { key: 3, color: 'pink'}
        ],
        dragging: null
      }
    },
    created(){
        
    },
    //挂载完成后自动执行
    mounted(){
        //  this.drawLine();
        //获取验证码接口调用
        console.log(getToken())
        let data = 1
        // GetSms(data).then(response => {
        //     console.log(response)
        // }).catch(error => {
        //     console.log(error)
        // })
    },
    methods: {
        handleDragStart(e,item){
            this.dragging = item;
        },
        handleDragEnd(e,item){
            this.dragging = null
        },
        //首先把div变成可以放置的元素，即重写dragenter/dragover
        handleDragOver(e) {
            e.dataTransfer.dropEffect = 'move'// e.dataTransfer.dropEffect="move";//在dragenter中针对放置目标来设置!
        },
        handleDragEnter(e,item){
            e.dataTransfer.effectAllowed = "move"//为需要移动的元素设置dragstart事件
            if(item === this.dragging){
            return
            }
            const newItems = [...this.items]
            console.log(newItems)
            const src = newItems.indexOf(this.dragging)
            const dst = newItems.indexOf(item)
        
            newItems.splice(dst, 0, ...newItems.splice(src, 1))
        
            this.items = newItems
        },
        btn() {
            console.log(this.items)
        },
    }
}
</script>
<style lang="scss" scoped>
    .container{
    width: 80px;
    height: 300px;
    position: absolute;
    left: 0;
    display:flex;
    flex-direction: column;
    padding: 0;
  }
  .item {
   margin-top: 10px;
   transition: all linear .3s
  }
</style>