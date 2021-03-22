<template>
    <div>
        <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
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

      }
    },
    created(){
        
    },
    //挂载完成后自动执行
    mounted(){
         this.drawLine();
        //获取验证码接口调用
        console.log(getToken())
        let data = 1
        GetSms(data).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
    },
    methods: {
        drawLine(){
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('myChart'))
            // 绘制图表
            myChart.setOption({
                title: { text: '在Vue中使用echarts' },
                tooltip: {},
                xAxis: {
                    data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            });
        }
    }
}
</script>
<style lang="scss" scoped>

</style>