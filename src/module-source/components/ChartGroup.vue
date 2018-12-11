<template>
    <el-row>
        <el-col :span="17">
            <!-- linechart -->
            <div  id="chart" style="min-height: 400px; width: 100%"></div>
        </el-col>
        <el-col :span="7" >
            <div  id="chart2" style="min-height: 400px; width: 100%"></div>

        </el-col>
    </el-row>
</template>
<script>
import echarts from 'echarts'
// import resize from './../../components/Charts/mixins/resize'
import { debounce } from '@/utils'


export default {
    name: 'ChartGroup',
    // mixins: [resize],
    props: {
        chartList: Object,
        required: true
    },
    data() {
        return {
             chart: null,
             chart2: null,
             linechartdata: {},
             realxdata: [],
             realseries0: [],
             realseries1: [],
             realseries2: [],
             realchartname0: '',
             realchartname1: '',
             realchartname2: '',
             realcharttotal0: '',
             realcharttotal1: '',
             realcharttotal2: ''
            
        }
    },
    watch: {
        chartList(val) {
            this.linechartdata = val

            //  数据处理
            // xAxis数据
            let usexdata = []
            let getxdata = this.linechartdata.xAxis
                for (let xitem of getxdata) {
                 usexdata.push(xitem.data)
            }
            this.realxdata = usexdata

            // series数据整理
            let seriesdata0 = []
            let getseriesdata0 = this.linechartdata.series[0].items
            let chartname0 = this.linechartdata.series[0].name
            for (let seriesitem0 of getseriesdata0) {
              seriesdata0.push(seriesitem0.data)
            }
            this.realseries0 = seriesdata0

            let seriesdata1 = []
            let getseriesdata1 = this.linechartdata.series[1].items
            let chartname1 = this.linechartdata.series[1].name
            for (let seriesitem1 of getseriesdata1) {
              seriesdata1.push(seriesitem1.data)
            }
            this.realseries1 = seriesdata1

            let seriesdata2 = []
            let getseriesdata2 = this.linechartdata.series[2].items
            let chartname2 = this.linechartdata.series[2].name
            for (let seriesitem2 of getseriesdata2) {
              seriesdata2.push(seriesitem2.data)
            }
            this.realseries2 = seriesdata2

            // chartname 数据
            let getchartname0 = this.linechartdata.series[0].name
            this.realchartname0 = getchartname0
            let getchartname1 = this.linechartdata.series[1].name
            this.realchartname1 = getchartname1
            let getchartname2 = this.linechartdata.series[2].name
            this.realchartname2 = getchartname2

            // chartname 数据
            let getcharttotal0 = this.linechartdata.series[0].total
            this.realcharttotal0 = getcharttotal0
            let getcharttotal1 = this.linechartdata.series[1].total
            this.realcharttotal1 = getcharttotal1
            let getcharttotal2 = this.linechartdata.series[2].total
            this.realcharttotal2 = getcharttotal2

            

            if (val != null) {
                this.initLineChart()
                this.initCircleChart()
            }
        }
    },
    methods: {
        initCircleChart() {
            this.chart2 = echarts.init(document.getElementById('chart2'))
            this.chart2.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                series: [
                    {
                        name: '来源分类',
                        type: 'pie',
                        radius: ['30%', '50%'],
                       
                        label: {
                            normal: {
                                formatter: '{b}',
                                rich: {
                                    b: {
                                        fontSize: 12,
                                        lineHeight: 12
                                    }
                                }
                            }
                        },
                        
                        data: [
                            {value: this.realcharttotal0, name: this.realchartname0},
                            {value: this.realcharttotal1, name: this.realchartname1},
                            {value: this.realcharttotal2, name: this.realchartname2}
                        ]
                    }
                ]
            })
        },
        initLineChart() {
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
                    data: [this.realchartname0, this.realchartname1, this.realchartname2]
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: this.realxdata
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
                        name: this.realchartname0,
                        type: 'line',
                        stack: '总量',
                        data: this.realseries0
                    },
                    {
                        name: this.realchartname1,
                        type: 'line',
                        stack: '总量',
                        data: this.realseries1
                    },
                    {
                        name: this.realchartname2,
                        type: 'line',
                        stack: '总量',
                        data: this.realseries2
                    }
                ]
            })
        }
            
    },
    mounted() {
        this.__resizeHanlder = debounce(() => {
            if (this.chart || this.chart2) {
                this.chart.resize()
                this.chart2.resize()
            }
        }, 100)
        window.addEventListener('resize', this.__resizeHanlder)
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.__resizeHanlder)
    }
       
}
</script>
