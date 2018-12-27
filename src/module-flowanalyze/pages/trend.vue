<template>
    <div class="dashboard-container">
    <el-card class="card-head">
        <h2 class="title">趋势分析（{{defaultdate}}）</h2>
        <!-- 工具栏 -->
        <SelectRegionCompare 
          v-on:handleToolData = 'handleToolData' 
          v-on:handleCompareData = 'handleCompareData'/>
    </el-card>
    <!-- 总计栏 -->
    <TotalData :totalList = 'totaldata'/>

    <el-card shadow="never" v-loading="loading"  class="chart">
        <!-- 下拉框 -->
        <SelectMenu v-on:handleSelect = "handleSelect"/>
        <!-- 图表 -->
        <!-- <ChartGroup :chartList = 'chartdata'/> -->
        <div id="chart" style="width: 100%;min-height: 400px;"></div>
    </el-card>
    <!-- 自定义指标 -->
    <CustomTagForm v-on:handleTagForm = 'handleTagForm'/>
    <!-- 表格数据列表 -->
    <div shadow="never" v-loading="loading" class="card-table ">
        <div class="tablestyle trendcomparetable" >
            <!-- <div class="btn-scroll"  v-if="date2 != ''">
                <span class="left" @click="scrollLeft"><i class="el-icon-caret-left"></i></span>
                <span class="right"  @click="scrollRight"><i class="el-icon-caret-right"></i></span>
            </div> -->
            <el-table :data="CompareData" style="width: 100%" v-if="date2 != ''">
                <el-table-column prop="date" fixed  align="center"  label="日期"  width="100" ></el-table-column>
                <el-table-column  label="浏览次数" align="center" v-if="showColumes[0]">
                    <el-table-column prop="date1timesOfBrowsing" align="center" width="400" >
                        <template slot="header" slot-scope="scope">
                            <span>{{date}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column  prop="date2timesOfBrowsing"  align="center"  width="400" >
                        <template slot="header" slot-scope="scope">
                            <span>{{date2}}</span>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column  label="独立访客" align="center"  v-if="showColumes[3]">>
                    <el-table-column prop="date1independentVisitors"  align="center"  width="400">
                        <template slot="header" slot-scope="scope">
                            <span>{{date}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="date2independentVisitors"  align="center"  width="400">
                        <template slot="header" slot-scope="scope">
                            <span>{{date2}}</span>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column label="IP" align="center"  v-if="showColumes[6]">
                    <el-table-column  prop="date1IP" width="400"  align="center" >
                        <template slot="header" slot-scope="scope">
                            <span>{{date}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column  prop="date2IP" width="400"  align="center" >
                        <template slot="header" slot-scope="scope">
                            <span>{{date2}}</span>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column label="平均访问深度" align="center"  v-if="showColumes[8]">
                    <el-table-column  prop="date1averageAccessDepth"  align="center"  width="400" >
                        <template slot="header" slot-scope="scope">
                            <span>{{date}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column  prop="date2averageAccessDepth"  align="center"  width="400" >
                        <template slot="header" slot-scope="scope">
                            <span>{{date2}}</span>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column label="平均访问时长" align="center"  v-if="showColumes[9]">
                    <el-table-column  prop="date1averageAccessTime"  align="center"  width="400">
                        <template slot="header" slot-scope="scope">
                            <span>{{date}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column  prop="date2averageAccessTime"  align="center"  width="400">
                        <template slot="header" slot-scope="scope">
                            <span>{{date2}}</span>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column label="跳出率" align="center" v-if="showColumes[7]">
                    <el-table-column  prop="date1bounceRate"  align="center"  width="400" >
                        <template slot="header" slot-scope="scope" >
                            <span>{{date}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column  prop="date2bounceRate"  align="center"  width="400" >
                        <template slot="header" slot-scope="scope">
                            <span>{{date2}}</span>
                        </template>
                    </el-table-column>
                </el-table-column>
            </el-table>

            <el-table :data="targetData" v-if="date2 === ''" class="trendtable">
                <el-table-column prop="datetime" label="日期"></el-table-column>
                <el-table-column prop="timesOfBrowsing" label="浏览次数" v-if="showColumes[0]"></el-table-column>
                <el-table-column prop="browsingVolume" label="浏览量占比" v-if="showColumes[1]"></el-table-column>
                <el-table-column prop="timesOfVisite" label="访问次数" v-if="showColumes[2]"></el-table-column>
                <el-table-column prop="independentVisitors" label="独立访客" v-if="showColumes[3]"></el-table-column>
                <el-table-column prop="independentNewVisitors" label="新独立访客数" v-if="showColumes[4]"></el-table-column>
                <el-table-column prop="independentNewVisitorsRate" label="新独立访比率" v-if="showColumes[5]"></el-table-column>
                <el-table-column prop="IP" label="IP" v-if="showColumes[6]"></el-table-column>
                <el-table-column prop="bounceRate" label="跳出率" v-if="showColumes[7]"></el-table-column>
                <el-table-column prop="averageAccessDepth" label="平均访问深度" v-if="showColumes[8]"></el-table-column>
                <el-table-column prop="averageAccessTime" label="平均访问时长" v-if="showColumes[9]"></el-table-column>
            </el-table>
        </div>
    </div>
    

  </div>
</template>
<script>
import {total, chart, targetdata, contrastdata} from '@/api/base/flowanalyze'
import SelectRegionCompare from '@/components/SelectRegionCompare'
import TotalData from '@/components/TotalData'
import SelectMenu from '@/components/SelectMenu'
import CustomTagForm from '@/components/CustomTagForm'
import echarts from 'echarts'
import { debounce } from '@/utils'

export default {
    components: { SelectRegionCompare, TotalData, SelectMenu, CustomTagForm },
    data() {
        return {
            loading: false,
            defaultdate: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
            currentdate2: '',
            range: '1',
            side: '',
            visitor: '',
            date: '',
            target: '',
            tages: ['1', '4', '7', '8', '9', '10'],
            totaldata: {},
            chartdata: {},
            targetData: [],
            contrastData: [],
            date2: '',
            showColumes: [true, false, false, true, false, false, true, true, true, true],
            CompareData: [],
            chart: null
        }
    },
    methods: {
        // 业务请求：合计
        async doQueryTotal(range, side, visitor, date) {
            this.loading = true
            this.totaldata = {}
            await total({
                range, side, visitor, date
            }).then(res => {
                this.totaldata = res.data
                
            })
            this.loading = false
        },
        // 业务请求：图表
        async doQueryChart(range, side, visitor, date1, date2, target) {
            this.loading = true
            this.chartdata = {}
            await chart({
                range, side, visitor, date1, date2, target
            }).then(res => {
                this.chartdata = res.data
            // 图表模型
            // x轴数据整理
            
            let xdata = []
            let getxdata = this.chartdata.xAxis
            for (let xitem of getxdata) {
              xdata.push(xitem.data)
            }
            // series数据整理
            let seriesdata1 = []
            let getseriesdata1 = this.chartdata.series[0].items
            let chartname1 = this.chartdata.series[0].name

            for (let seriesitem1 of getseriesdata1) {
              seriesdata1.push(seriesitem1.data)
            }


            let seriesdata2 = []
            let getseriesdata2 = this.chartdata.series[1].items
            let chartname2 = this.chartdata.series[1].name

            for (let seriesitem2 of getseriesdata2) {
              seriesdata2.push(seriesitem2.data)
            }

            this.chart = echarts.init(document.getElementById('chart'))
            this.chart.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: '{b} <br/>{a} : {c}'
                },
                legend: {
                    bottom: 'bottom',
                    data: [chartname1, chartname2]
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: xdata
                },
                grid: {
                    left: '1%',
                    right: '2%',
                    containLabel: true
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                    formatter: function(value, index) {
                        return value / 10000 + '万'
                    }
                    }
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
            })
            this.loading = false
        },
        // 业务请求：表格数据
        async doQueryTargetData(range, side, visitor, date, tages) {
            this.loading = true
            this.targetData = []
            await targetdata({
                range, side, visitor, date, tages
            }).then(res => {
                this.targetData = res.data.items

                let totalsdata = {}
                totalsdata.datetime = '全部总计'
                totalsdata.timesOfBrowsing = this.totaldata.timesOfBrowsing
                totalsdata.independentVisitors = this.totaldata.independentVisitors
                totalsdata.IP = this.totaldata.IP
                totalsdata.averageAccessDepth = this.totaldata.averageAccessDepth
                totalsdata.averageAccessTime = this.totaldata.averageAccessTime
                totalsdata.bounceRate = this.totaldata.bounceRate

                this.targetData.splice(0, 0, totalsdata)
            })
            this.loading = false
        },
        // 业务请求：对比表格数据
        async doQueryContrastData(range, side, visitor, date, tages, date2) {
            this.loading = true
            this.targetData = {}
            await contrastdata({
                range, side, visitor, date, tages, date2
            }).then(res => {
                this.contrastData = res.data.items

                let CompareData = []
                let Object = {}
                for (let item of this.contrastData) {
                    CompareData.push({
                        date: item.date,
                        date1timesOfBrowsing: item.date1.timesOfBrowsing,
                        date2timesOfBrowsing: item.date2.timesOfBrowsing,
                        date1independentVisitors: item.date1.independentVisitors,
                        date2independentVisitors: item.date2.independentVisitors,
                        date1IP: item.date1.IP,
                        date2IP: item.date2.IP,
                        date1averageAccessDepth: item.date1.averageAccessDepth,
                        date2averageAccessDepth: item.date2.averageAccessDepth,
                        date1averageAccessTime: item.date1.averageAccessTime,
                        date2averageAccessTime: item.date2.averageAccessTime,
                        date1bounceRate: item.date1.bounceRate,
                        date2bounceRate: item.date2.bounceRate
                    })
                }
                this.CompareData = CompareData
            })
            this.loading = false
        },
        // 初始total数据
        async setuptotalData(range = 1, side, visitor, date) {
            await this.doQueryTotal(range, side, visitor, date)
        },
        // 初始chart数据
        async setupchartData(range = 1, side, visitor, date, date2, target) {
            await this.doQueryChart(range, side, visitor, date, date2, target)
        },
         // 初始target数据
        async setuptargetData(range = 1, side, visitor, date, tages) {
            await this.doQueryTargetData(range, side, visitor, date, tages)
        },
        // 交互操作
        // 日期选择---
        handleToolData (range, side, visitor, date, tages, date1, date2) {
            if (range !== '') {
                date = ''
            }
            this.doQueryTotal(range, side, visitor, date)
            this.doQueryChart(range, side, visitor, date1 = date)
            this.doQueryTargetData(range, side, visitor, date, tages)

        },
        // 点击对比---
        handleCompareData(range, side, visitor, date, date2, target, tages) {
            range = ''
            tages = this.tages
            this.date = date
            this.date2 = date2
            this.doQueryChart(range, side, visitor, date, date2, target)
            this.doQueryContrastData(range, side, visitor, date, tages, date2)
        },
        handleSelect(target) {
            this.target = target
            this.doQueryChart(this.range, this.side, this.visitor, this.date, this.date2, this.target)
        },
        // echart
        echartCreate(data) {
            let echartView = this.$echarts.init(document.getElementById('chart'))     
            echartView.setOption(data)
        },
        handleTagForm(currenttages) {
            this.tages = currenttages
            this.doQueryTargetData(this.range, this.side, this.visitor, this.date, this.tages)
            for (let i = 0; i < this.showColumes.length; i++) {
                // debugger
                let numArray = this.tages.map((value) => {
                    return parseInt(value)
                })
                if (!this.ArrayContains(numArray, i + 1)) {
                    this.showColumes[i] = false
                } else {
                    this.showColumes[i] = true
                }
            }
        },
        ArrayContains(array, val) {
            for (var i = 0; i < array.length; i++) {
                if (array[i] === val) {
                    return true
                }
            }
            return false
        },
        // 按钮控制滚动条
        handleScroll() {
            console.log(123)
        },
        scrollLeft() {
            
        },
        scrollRight() {
            console.log(123)
        }
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
    },
    // 创建完毕状态
    created() {
        this.setuptotalData()
        this.setupchartData()
        this.setuptargetData()
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-container {
    .chart {
        margin-top: 15px;
        margin-left: 20px;
        margin-right: 20px;
        border-radius: 0;   
    }
    .card-table {
        border-top: 0;
        margin-left: 20px;
        margin-right: 20px;
    }
    .tablestyle {
        position: relative;
        .btn-scroll {
            position: absolute;
            z-index: 999;
            right: 10px;
            top: 7px;
            span {
                display: inline-block;
                padding: 3px 5px;
                border: 1px solid #cecece;
                border-radius: 3px;
                margin-right: 5px;
                cursor: pointer;
                i {
                    font-size: 24px;
                    line-height: 24px;
                    color: #012989;
                }
            }
        }
    }
    
}
</style>
