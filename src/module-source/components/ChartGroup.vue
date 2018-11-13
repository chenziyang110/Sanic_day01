<template>
    <el-row>
        <el-col :span="18">
            <!-- linechart -->
            <div  id="chart" style="min-height: 400px; width: 90%"></div>
        </el-col>
        <el-col :span="6">234</el-col>
    </el-row>
</template>
<script>
import echarts from 'echarts'
import resize from './../../components/Charts/mixins/resize'


export default {
    name: 'ChartGroup',
    mixins: [resize],
    props: {
        chartList: Object,
        required: true
    },
    data() {
        return {
             chart: null,
             linechartdata: {},
             realxdata: []
        }
    },
    mounted() {
        this.initChart()
    },
    beforeDestroy() {
        if (!this.chart) {
         return
        }
        this.chart.dispose()
        this.chart = null
    },
   created() {
       this.handleProcess()
   },
    methods: {
        // 处理数据
        handleProcess() {
        //    console.log(this.chartList)
            // let usexdata = []
            // let getxdata = []
            // // getxdata = this.chartList.xAxis
            // debugger
            // for (var xitem of this.chartList.xAxis) {
            //      usexdata.push(xitem.data)
            // }
            // this.realxdata = usexdata 
        },
        initChart() {
            this.linechartdata = this.chartList
            console.log(this.linechartdata)

            // 处理数据
            

            // series数据整理
            // let seriesdata0 = []
            // let getseriesdata0 = this.chartList.series[0].items
            // let chartname0 = this.chartList.series[0].name
            // for (let seriesitem1 of getseriesdata1) {
            //   seriesdata0.push(seriesitem1.data)
            // }
            // console.log(seriesdata0)

            // let seriesdata1 = []
            // let getseriesdata1 = this.chartList.series[1].items
            // let chartname1 = this.chartList.series[1].name
            // for (let seriesitem1 of getseriesdata1) {
            //   seriesdata1.push(seriesitem1.data)
            // }
            // console.log(seriesdata1)

            // let seriesdata2 = []
            // let getseriesdata2 = this.chartList.series[2].items
            // let chartname2 = this.chartList.series[2].name
            // for (let seriesitem2 of getseriesdata2) {
            //   seriesdata1.push(seriesitem2.data)
            // }
            // console.log(seriesdata2)



            this.chart = echarts.init(document.getElementById('chart'))

            this.chart.setOption({
                
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        lineStyle: {
                        color: '#57617B'
                        }
                    }
                },
                legend: {
                    top: 20,
                    icon: 'rect',
                    itemWidth: 14,
                    itemHeight: 5,
                    itemGap: 13,
                    data: ['CMCC', 'CTCC', 'CUCC'],
                    right: '4%',
                    textStyle: {
                        fontSize: 12,
                        color: '#F1F1F3'
                    }
                },
                grid: {
                    top: 100,
                    left: '3%',
                    right: '4%',
                    bottom: '2%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: this.realxdata
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: '邮件营销',
                        type: 'line',
                        stack: '总量',
                        data: this.realxdata
                    },
                    {
                        name: '联盟广告',
                        type: 'line',
                        stack: '总量',
                        data: this.realxdata
                    },
                    {
                        name: '视频广告',
                        type: 'line',
                        stack: '总量',
                        data: this.realxdata
                    }
                ]
            })
            }
        }
}
</script>
