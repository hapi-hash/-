<template>
    <div id="infoIndex">
        <div class="tableList">
            <Table :config="configTable" :isSelection="selection">
                <template v-slot:operation="scopeData">
                    <el-button size="small" type="danger" @click="operation(scopeData.data)">删除</el-button>
                    <el-button size="small" type="danger">编辑</el-button>
                </template>
            </Table>
        </div>
    </div>
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.14.1/lodash.min.js"></script>
<script>
import Table from '../Components/elCompenents/elTable'
export default {
    name: 'infoIndex',
    components: {
        Table
    },
    data() {
        return {
            //table组件配置参数
            configTable: [
                {
                    label: "姓名",
                    field: "name"
                },
                {
                    label: "小程序",
                    field: "Applets"
                },
                {
                    label: "订单信息",
                    field: "orderInformation"
                },
                {
                    label: "操作",
                    columnType: "slot",
                    slotName: "operation"
                }
            ],
            //多选框
            selection: false
        }
    },
    mounted: function mounted () {
     },
     methods: {
      
     }
}
</script>
<style lang="scss" scoped>
   .tableList{
       width:100%;
   }
</style>