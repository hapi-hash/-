<template>
    <div id="supplierList">
        <div class="tableBox">
            <ElTable :data="tableData" height="100%" :config="configTable" :isSelection="selection">
                 <template v-slot:icon="scopeData">
                    <img src="../../icons/11111.jpg" alt="" style="width:50px;height:50px">
                </template>
                <template v-slot:operation="scopeData">
                    <el-button size="small" type="danger">编辑</el-button>
                    <el-button size="small" type="danger">供应商修改</el-button>
                    <el-button size="small" @click="operation(scopeData.data)">删除</el-button>
                    
                </template>
            </ElTable>
        </div>
    </div>
</template>
<script>
import ElTable from "../Components/elCompenents/elTable"
import { supplierList } from "@/api/login"
export default({
    name: "supplierList",
    components: {
        ElTable
    },
    data() {
        return {
            //分页
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
            //table组件数据
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
                ,
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
                ,
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
    mounted() {
        // console.log(this.config)
        supplierList(this.pageData).then((response) => {
            console.log(response)
        }).catch((error) => {

        })
    },
    methods: {

    },
})
</script>
<style>
#supplierList{
    width:100%;
    height: calc(100vh - 150px);
    
}
.tableBox{
    width:100%;
    height:100%;
}
</style>