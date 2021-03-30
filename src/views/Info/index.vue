<template>
    <div id="infoIndex">
        11111
        <!-- <transition-group name="flip-list">
            <div v-for="item in items" :key="item" draggable="true" class="items" @dragstart="dragstart(item)" @dragenter="dragenter(item)" @dragend="dragend(item)">{{item}}</div>
        </transition-group>
        <div @click="btn">提交</div> -->
    </div>
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.14.1/lodash.min.js"></script>
<script>
export default {
    name: 'infoIndex',
    data() {
        return {
            //  items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            // oldNum: 0,
            // newNum: 0
        }
    },
    mounted: function mounted () {
     },
     methods: {
    //   shuffle: function() {
    //    this.items = _.shuffle(this.items);
    //   },
    //   // 记录初始信息
    //   dragstart: function(value) {
    //    this.oldNum = value;
    //   },
    //   // 做最终操作
    //   dragend: function(value) {
    //    if (this.oldNum != this.newNum) {
    //     let oldIndex = this.items.indexOf(this.oldNum);
    //     let newIndex = this.items.indexOf(this.newNum);
    //     let newItems = [...this.items];
    //     // 删除老的节点
    //     newItems.splice(oldIndex, 1); 
    //     // 在列表中目标位置增加新的节点
    //     newItems.splice(newIndex, 0, this.oldNum);
    //     // this.items一改变，transition-group就起了作用
    //     this.items = [...newItems];
    //    }
    //   },
    //   // 记录移动过程中信息
    //   dragenter: function(value) {
    //    this.newNum = value;
    //   },
    //   btn() {
    //       console.log(this.items)
    //   }
     }
}
</script>
<style lang="scss" scoped>
    .flip-list-move {
    transition: transform 1s;
   }
   .items {
    width: 300px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border: 1px solid red;
   }
</style>