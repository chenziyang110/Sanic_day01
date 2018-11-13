<template>
  <div class="chart" id="chart"  style="height:400px,width:100%"></div>
</template>
<script>
import echarts from 'echarts'
import resize from './mixins/resize'


export default {
    name: 'line-chart',
    props: ['echatData'],
    mixins: [resize],
    // props: {
    //     data: {

    //     },
    //     className: {
    //         type: String,
    //         default: 'chart'
    //     },
    //     id: {
    //         type: String,
    //         default: 'chart'
    //     },
    //     width: {
    //         type: String,
    //         default: '200px'
    //     },
    //     height: {
    //         type: String,
    //         default: '200px'
    //     }
    // },
    data() {
        return {
            chart: null
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
    methods: {
        initChart() {
            this.chart = echarts.init(document.getElementById('chart'))

            console.log(this.chart)
            console.log(this.echatData.series)
            console.log(this.echatData.xAxis)




            // x轴数据整理
            let usexdata = []
            let getxdata = this.echatData.xAxis
                for (let xitem of getxdata) {
                 usexdata.push(xitem.data)
            }
            console.log(usexdata)

             // series数据整理
            let seriesdata1 = []
            let getseriesdata1 = seriesdata[0].items
            let chartname1 = seriesdata[0].name

            for (let seriesitem1 of getseriesdata1) {
              seriesdata1.push(seriesitem1.data)
            }
            

            let seriesdata2 = []
            let getseriesdata2 = seriesdata[1].items
            let chartname2 = seriesdata[1].name

            for (let seriesitem2 of getseriesdata2) {
              seriesdata2.push(seriesitem2.data)
            }

            // console.log(seriesdata1)
            // console.log(seriesdata2)

            this.chart.setOption({
                title: {
                    text: '对比图'
                },
               tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    bottom: 'bottom',
                    data: [chartname1, chartname2]
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: usexdata
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    name: chartname1,
                    data: seriesdata1,
                    type: 'line'
                }, {
                    name: chartname2,
                    data: seriesdata2,
                    type: 'line'
                }]
            })
        }
    }
     
}
</script>