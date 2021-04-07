<template>
    <div id="User">
        <div class="headerForm">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="订单号">
                    <el-input v-model="formInline.order_sn" placeholder="请输入订单号"></el-input>
                </el-form-item>
                <el-form-item label="订单状态">
                    <el-select v-model="formInline.pay_type" placeholder="请选择订单状态">
                    <el-option label="待支付" value="1"></el-option>
                    <el-option label="待收货" value="2"></el-option>
                    <el-option label="已收货" value="3"></el-option>
                    <el-option label="已取消" value="4"></el-option>
                    <el-option label="申请退款" value="5"></el-option>
                    <el-option label="退款完成" value="6"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="支付方式">
                    <el-select v-model="formInline.Payment" placeholder="活动区域">
                    <el-option label="微信支付" value="1"></el-option>
                    <el-option label="余额支付" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="tableBox">
            <el-table
                :data="tableData"
                align="center"
                border
                style="width: 100%">
                <el-table-column label="订单号" width="120" prop="order_sn" align="center"></el-table-column>
                <el-table-column label="用户" width="100" prop="username" align="center"></el-table-column>
                <el-table-column label="小程序" width="100" prop="applets_name" align="center"></el-table-column>
                <el-table-column label="商品信息" align="center">
                    <template  slot-scope="props">
                        <!-- {{props.row.children}} -->
                        <el-table style="width: 100%" :data="props.row.ordersgoods" align="center" :header-cell-style="{background:'#ddd',color:'#000','border-right':'none'}" :cell-style="{'border-right':'none'}" :row-style="{background:'#ddd',color:'#000'}">
                            <el-table-column align="center" label="供应商" prop="supplier_name"></el-table-column>
                            <el-table-column align="center" label="商品图片">
                                <template slot-scope="scope">
                                    <img :src="scope.row.imgurl" style="width:70px;height:70px;" alt="">
                                </template>
                                
                            </el-table-column>
                            <el-table-column align="center" label="商品名称" prop="goods_title"></el-table-column>
                            <el-table-column align="center" label="单价*数量">
                                <template slot-scope="scope">
                                    <div>{{scope.row.price}}</div>
                                    <div>*{{scope.row.num}}</div>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="商品规格" prop="goods_desc_txt"></el-table-column>
                            <el-table-column align="center" label="发货与物流">
                                <template slot-scope="scope">
                                    <div>{{scope.row.logistics_company}}</div>
                                    <div>{{scope.row.logistics_order}}</div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </el-table-column>
                <el-table-column label="收货地址" width="170" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.province}}{{scope.row.city}}{{scope.row.area}}{{scope.row.address}}{{scope.row.nickname}}{{scope.row.mobile}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="70" label="状态" align="center">
                    <template slot-scope="scope">
                        <div v-if="scope.row.status == 1">待支付</div>
                        <div v-if="scope.row.status == 2">待发货</div>
                        <div v-if="scope.row.status == 3">待收货</div>
                        <div v-if="scope.row.status == 4">已收货</div>
                        <div v-if="scope.row.status == 5">已取消</div>
                        <div v-if="scope.row.status == 6">申请退款</div>
                        <div v-if="scope.row.status == 7">退款完成</div>
                    </template>
                </el-table-column>
                <el-table-column width="100" label="时间" prop="create_time" align="center"></el-table-column>
                
            </el-table>
        </div>
        <div class="pages">
             <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[5, 20, 30, 40]"
                :current-page="pageData.page"
                :page-size="10"
                layout="sizes, prev, pager, next"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import { productOrder } from "@/api/login";
export default {
    name: 'User',
    data() {
        return {
            //筛选条件
            formInline: {
                order_sn: '',
                pay_type: '',
                status: ''
            },
            pageData : {
                page: 1,
                list_rows:5,
            },
            //table数据
            tableData: [],
            total:9
        }
    },
    mounted() {
        this.tableList(this.formInline,this.pageData)
    },
    methods: {
        onSubmit() {
            this.tableList()
        },
        tableList() {
            productOrder(this.formInline,this.pageData).then((response) => {
                console.log(response.data.total)
                this.tableData = response.data.data;
                this.total = response.data.total
            }).catch((error) => {

            })
        },
        //每页显示多少条数据
        handleSizeChange(val) {
            this.pageData.list_rows = val;
            this.tableList(this.formInline,this.pageData)
        },
        //切换到第几页
        handleCurrentChange(val) {
            this.pageData.page = val;
            this.tableList(this.formInline,this.pageData)
        }
    }
}
</script>
<style>
    #User{
        width:100%;
        height:100%;
    }
    .headerForm{
        width:100%;
        height:70px;
    }
    .pages{
        margin-top: 20px;
        text-align: right;
    }
  .tableBox{
      width: 100%;
      height:calc(100vh - 300px);
      overflow: auto;
  }
   .tableBox::-webkit-scrollbar {
  /*滚动条整体样式*/
  width : 10px;  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
  }
  .tableBox::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius   : 10px;
  background-color: skyblue;
  background-image: -webkit-linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.2) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.2) 75%,
      transparent 75%,
      transparent
  );
  }
  .tableBox::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
  background   : #ededed;
  border-radius: 10px;
  }
</style>