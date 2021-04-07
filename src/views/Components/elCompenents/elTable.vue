<template>
    <div id="eltable">
        <el-table :data="data" border style="width: 100%" :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
            <!-- 多选框 -->
            <el-table-column v-if="isSelection" type="selection" width="55"></el-table-column>
            <!-- 文本数据渲染 -->
            <template v-for="item in config">
                <!--v-slot-->
                <el-table-column :key="item.field" :prop="item.field" :label="item.label" v-if="item.columnType === 'slot'">
                    <template slot-scope="scope">
                        <slot :name="item.slotName" :data="scope.row"></slot>
                    </template>
                </el-table-column>
                <el-table-column v-else :key="item.field" :prop="item.field" :label="item.label"></el-table-column>
            </template>
            
        </el-table>
    </div>
</template>
<script>

export default({
    name: 'eltable',
    props: {
        //表头数据
        config: {
            type: Array,
            default: () => {

            }
        },
        //多选框是否显示
        isSelection: {
            type: Boolean,
            default: true
        },
        data: {
            type: Array,
            default: () => {

            }
        }
    },
    data() {
        return {
            
        }
    },
    mounted() {
        // console.log(this.config)
    },
    methods: {

    },
})
</script>
<style scoped>

</style>
