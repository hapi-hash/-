<template>
    <div id="messer">
        <div class="table">
            <Table :config="configTable" :isSelection="selection">
                <template v-slot:status="scopeData">
                    <el-switch v-model="scopeData.data.isDisabled" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                </template>
                <template v-slot:operation="scopeData">
                    <el-button size="small" type="danger" @click="operation(scopeData.data)">删除</el-button>
                    <el-button size="small" type="danger">编辑</el-button>
                </template>
            </Table>
        </div>
    </div>
</template>
<script>
import Table from '../Components/elCompenents/elTable'
export default({
    name: 'messer',
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
                    label: "禁启用状态",
                    field: "status",
                    columnType: "slot",
                    slotName: "status"
                },
                {
                    label: "操作",
                    columnType: "slot",
                    slotName: "operation"
                }
            ],
            //多选框
            selection: true
        }
    },
    mounted() {
        
    },
    methods: {
        operation(data) {
            console.log(data)
        }
    },
})
</script>
<style scoped>

</style>