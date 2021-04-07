<template>
    <div id="infoIndex">
        <div class="tableList">
            <Table :data="tableData" :config="configTable" :isSelection="selection">
                 <template v-slot:icon="scopeData">
                    <img src="../../icons/11111.jpg" alt="" style="width:50px;height:50px">
                </template>
                <template v-slot:operation="scopeData">
                    <el-button size="small" type="danger">编辑</el-button>
                    <el-button size="small" type="danger">供应商修改</el-button>
                    <el-button size="small" @click="operation(scopeData.data)">删除</el-button>
                    
                </template>
            </Table>
        </div>
    </div>
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.14.1/lodash.min.js"></script>
<script>
import Table from '../Components/elCompenents/elTable'
import { goodsBrand } from "@/api/login";
export default {
    name: 'infoIndex',
    components: {
        Table
    },
    data() {
        return {
            pageData: {
                page: 1,
                limit: 10
            },
            //table组件配置参数
            configTable: [
                {
                    label: "id",
                    field: "id"
                },
                {
                    label: "名称",
                    field: "name"
                },
                {
                    label: "图标",
                    field: "thumb",
                    slotName: "icon"
                },
                {
                    label: "排序",
                    field: "sort",
                },
                {
                    label: "操作",
                    columnType: "slot",
                    slotName: "operation"
                }
            ],
            tableData: [
                {
                    name: '王小虎',
                    Applets: '小程序',
                    orderInformation: '订单信息',
                    isDisabled: true
                },
                {
                    name: '王小虎',
                    Applets: '小程序',
                    orderInformation: '订单信息',
                    isDisabled: false
                },
                {
                    name: '王小虎',
                    Applets: '小程序',
                    orderInformation: '订单信息',
                    isDisabled:true
                },
                {
                    name: '王小虎',
                    Applets: '小程序',
                    orderInformation: '订单信息',
                    isDisabled: false
                },
            ],
            //多选框
            selection: false
        }
    },
    mounted () {
        goodsBrand(this.pageData).then((response) => {
            console.log(response)
        }).catch((error) => {

        })
    },
    methods: {
      operation(data) {
          console.log(data)
      }
    }
}
</script>
<style lang="scss" scoped>
   .tableList{
       width:100%;
   }
</style>