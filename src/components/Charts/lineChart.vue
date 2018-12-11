<template>
  <div id="chart" class="chart"></div>
  <!-- <div id="chart"  style="min-height:400px,width:100%">123</div> -->
</template>
<script>
import echarts from 'echarts'
import { debounce } from '@/utils'


export default {
    name: 'lineChart',
    props: {
        lineChartData: Object,
        required: true
    },
    data() {
        return {
            chart: null,
            chartData: {},
            xData: [],
            oneSeries: [],
            twoSeries: [],
            threeSeries: [],
            oneChartName: '',
            twoChartName: '',
            threeChartName: '',
            oneChartTotal: '',
            twoChartTotal: '',
            threeChartTotal: ''
        }
    },
    watch: {
        
        lineChartData(value) {
            this.chartData = value
            console.log(this.chartData)

            //  数据处理
            // xAxis数据
            let usexdata = []
            let getxdata = this.chartData.xAxis
                for (let xitem of getxdata) {
                 usexdata.push(xitem.data)
            }
            this.xData = usexdata
            console.log(this.xData)

            // series数据整理
            let seriesdata0 = []
            let getseriesdata0 = this.chartData.series[0].items
            let chartname0 = this.chartData.series[0].name
            for (let seriesitem0 of getseriesdata0) {
              seriesdata0.push(seriesitem0.data)
            }
            this.oneSeries = seriesdata0
            console.log(this.oneSeries)

            // chartname 数据
            let getchartname0 = this.chartData.series[0].name
            this.oneChartName = getchartname0
           

            // chartname 数据
            let getcharttotal0 = this.chartData.series[0].total
            this.oneChartTotal = getcharttotal0

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
                    bottom: 'bottom',
                    data: [this.oneChartName]
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: this.xData
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: function(value, index) {
                            return value / 10000 + '万'
                        }
                    }
                },
                series: [
                    {
                        name: this.oneChartName,
                        type: 'line',
                        stack: '总量',
                        data: this.oneSeries
                    }
                ]
            })
            

            // if (value != null) { 
                this.initLineChart()
            // }
        }
    },
    methods: {
        initLineChart() {
            
        }
    },
    created: function() {
    },
    mounted() {
        this.__resizeHanlder = debounce(() => {
            if (this.chart) {
                this.chart.resize()
            }
        }, 100)
        window.addEventListener('resize', this.__resizeHanlder)
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.__resizeHanlder)
    }
    
}
</script>
<style lang="scss" scoped>
.chart{
    height: 400px;
    width: 100%
}
</style>
