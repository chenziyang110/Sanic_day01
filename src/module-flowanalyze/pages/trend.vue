<template>
  <div class="dashboard-container">
    <el-card class="card-head">
        <h2 class="title">趋势分析（{{defaultdate}}）</h2>
        <div class="choose">
            <el-row>
                <el-col :span="2" class="subtitle">时间：</el-col>
                <el-col :span="22">
                    <div class="radios">
                        <el-radio-group v-model="range" @change="handleData">
                            <el-radio-button label="0">今天</el-radio-button>
                            <el-radio-button label="1">昨天</el-radio-button>
                            <el-radio-button label="7">最近7日</el-radio-button>
                            <el-radio-button label="30">最近30日</el-radio-button>
                        </el-radio-group>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                 <el-col :span="2" class="subtitle">日期：</el-col>
                 <el-col :span="22">
                     <el-date-picker
                            v-model="begindate"
                            type="date"
                            format= "yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            @change="handleData"
                            placeholder="选择日期">
                        </el-date-picker>
                        <el-checkbox class="compare" v-model="checked" @change="handleControl" >对比</el-checkbox>
                        <el-date-picker
                            v-model="enddate"
                            format= "yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            type="date"
                            :disabled="disabled"
                            @change = "handleCompare"
                            placeholder="选择日期">
                        </el-date-picker>
                 </el-col>
            </el-row>
            <el-row>
                <el-col :span="2" class="subtitle">设备：</el-col>
                <el-col :span="22">
                    <div class="radios">
                            <el-radio-group v-model="side" @change="handleData">
                                <el-radio-button label="0">全部</el-radio-button>
                                <el-radio-button label="1">计算机</el-radio-button>
                                <el-radio-button label="2">移动端</el-radio-button>
                            </el-radio-group>
                        </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="2" class="subtitle">访客：</el-col>
                <el-col :span="22">
                    <div class="radios">
                            <el-radio-group v-model="visitor" @change="handleData">
                                <el-radio-button label="0">全部</el-radio-button>
                                <el-radio-button label="1">新访客</el-radio-button>
                                <el-radio-button label="2">老访客</el-radio-button>
                            </el-radio-group>
                        </div>
                </el-col>
            </el-row>
        </div>

    </el-card>
    <div class="total">
        <el-row>
            <el-col :span="4" class="target">
                <h1>{{totaldata.timesOfBrowsing}}</h1>
                <p>浏览次数</p>
            </el-col>
            <el-col :span="4" class="target">
                <h1>{{totaldata.independentVisitors}}</h1>
                <p>独立访客</p>
            </el-col>
            <el-col :span="4" class="target">
                <h1>{{totaldata.IP}}</h1>
                <p>IP数量</p>
            </el-col>
            <el-col :span="4" class="target">
                <h1>{{totaldata.averageAccessDepth}}</h1>
                <p>平均访问深度</p>
            </el-col>
            <el-col :span="4" class="target">
                <h1>{{totaldata.averageAccessTime}}</h1>
                <p>平均访问时长</p>
            </el-col>
            <el-col :span="4" class="target">
                <h1>{{totaldata.bounceRate}}</h1>
                <p>跳出率</p>
            </el-col>
        </el-row>
    </div>
    <el-card shadow="never" v-loading="loading"  class="chart">

        <div id="chart" style="width: 100%;min-height:400px;"></div>
    </el-card>
    <!-- 自定义指标 -->
    <el-card shadow="never" v-loading="loading" class="card-item">
        <div slot="header" class="clearfix">
            <el-button class="definetarget">自定义指标</el-button>
        </div>
        <div class="formbody">
            <span class="tip"><i class="el-icon-warning"></i>最多可同时选择7项指标</span>
            <div class="checkbox">
                <el-checkbox-group 
                   v-model="tages" 
                    :min="1"
                    :max="7">
                    <div class="target">
                        <el-button type="text">网站基础指标： </el-button>
                        <el-checkbox label="1">浏览次数</el-checkbox>
                        <el-checkbox label="2">浏览量占比</el-checkbox>
                        <el-checkbox label="3">访问次数</el-checkbox>
                        <el-checkbox label="4">访客数</el-checkbox>
                        <el-checkbox label="5">新访客数</el-checkbox>
                        <el-checkbox label="6">新访客比率</el-checkbox>
                        <el-checkbox label="7">IP数</el-checkbox>
                    </div>
                    <div  class="target">
                        <el-button type="text">流量质量指标： </el-button>
                        <el-checkbox label="8">跳出率</el-checkbox>
                        <el-checkbox label="9">平均访问时长</el-checkbox>
                        <el-checkbox label="10">平均访问深度</el-checkbox>
                    </div>
                </el-checkbox-group>
                <div class="submit">
                    <el-button type="warning" class="submit-btn" @click="handleSubmitTarget">确定</el-button>
                </div>
            </div>


        </div>
    </el-card>
    <!-- 表格数据 -->
    <el-card shadow="never" v-loading="loading" class="card-item">
        <div class="tablestyle">
            <!-- 数据表格 -->
            <el-table :data="targetData.items">
              <el-table-column prop="datetime" label="日期"></el-table-column>
              <el-table-column prop="timesOfBrowsing" label="浏览次数"></el-table-column>
              <el-table-column prop="independentVisitors" label="独立访客"></el-table-column>
              <el-table-column prop="IP" label="IP"></el-table-column>
              <el-table-column prop="averageAccessDepth" label="平均访问深度"></el-table-column>
              <el-table-column prop="averageAccessTime" label="平均访问时长"></el-table-column>
              <el-table-column prop="bounceRate" label="跳出率"></el-table-column>
            </el-table>
          </div>
    </el-card>
  </div>
</template>

<script>
import {total, chart, targetdata} from '@/api/base/flowanalyze'
import lineChart from './../../components/Charts/lineChart'

export default {
    name: 'flowanalyze-trend',
    components: {
        lineChart
    },
  data() {
    return {
        loading: false,
        range: '0',
        side: '0',
        visitor: '0',
        checked: false,
        currentrange: '',
        currentside: '',
        defaultdate: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
        begindate: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
        enddate: '',
        totaldata: {},
        echartData: null,
        tages: ['1', '3', '4', '5', '9', '10'],
        targetData: {},
        disabled: true
    }
  },
  methods: {
    // 总计数据业务请求
    async doQueryTotal(range, date = this.begindate, side, visitor) {
        this.currentrange = range
        this.loading = true
        this.totaldata = {}
        await total({
            range, date, side, visitor
        }).then(res => {
            this.totaldata = res.data
        })
        this.loading = false
    },
    // 图表业务请求
    async doQueryChart(range, date1 = this.begindate, date2 = this.enddate, side, visitor) {
        this.loading = true
        this.echartData = null
        await chart({
            range, date1, date2, side, visitor
        }).then(res => {
            this.echartData = res.data
            // 图表模型
            // x轴数据整理
            
            let xdata = []
            let getxdata = this.echartData.xAxis
            for (let xitem of getxdata) {
              xdata.push(xitem.data)
            }
            // series数据整理
            let seriesdata1 = []
            let getseriesdata1 = this.echartData.series[0].items
            let chartname1 = this.echartData.series[0].name

            for (let seriesitem1 of getseriesdata1) {
              seriesdata1.push(seriesitem1.data)
            }
            let seriesdata2 = []
            let getseriesdata2 = this.echartData.series[0].items
            let chartname2 = this.echartData.series[1].name


            for (let seriesitem2 of getseriesdata2) {
              seriesdata2.push(seriesitem2.data)
            }
            console.log(seriesdata1)
            console.log(seriesdata2)
            // option定义
            let option = {
                // tooltip: {
                //     trigger: 'item',
                //     formatter: '{b} <br/>{a} : {c}'
                // },
                legend: {
                    bottom: 'bottom',
                    data: [chartname1, chartname2]
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: xdata
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
            }
            this.echartCreate(option)



        })
        this.loading = false
    },
    // 数据列表业务请求
    async doQuerytargetDatas(range, date = this.begindate, side, visitor, tages) {
        this.loading = true
        await targetdata({
            range, date, side, visitor, tages
        }).then(res => {
           this.targetData = res.data
        })
        this.loading = false
    },
    // 初始total数据
    async setuptotalData() {
        await this.doQueryTotal()
        // await this.doQueryChart()
    },
    // 初始图表数据
    async setupchartData() {
        await this.doQueryChart()
    },
    // 初始列表数据
    async setuptargetData() {
        await this.doQuerytargetDatas()
    },

    // 工具栏数据交互
    handleData(range, date, side, visitor) {
        this.doQueryTotal(range, this.begindate, this.side, this.visitor)
        this.doQueryChart(range, this.begindate, this.side, this.visitor)
    },
    // 指标数据
    handleSubmitTarget(range, date, side, visitor, tages) {
        this.doQuerytargetDatas(this.currentrange, this.begindate, this.side, this.visitor, this.tages)
    },
    // 操作类
    handleControl() {
       this.disabled = !this.disabled
    },
    handleCompare(range, date1, date2, side, visitor) {
        this.doQueryChart(this.currentrange, this.begindate, this.enddate, this.side, this.visitor)
    },
    // echart
    echartCreate(data) {
      let echartView = this.$echarts.init(document.getElementById('chart'))     
      echartView.setOption(data)
    }

    },
    // 挂载结束
    mounted() {
    },
    // 创建完毕状态
    created() {
        this.setuptotalData()
        this.setuptargetData()
        this.setupchartData()
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-container {
    .subtitle {
        line-height: 36px;
        font-size: 16px;
        text-align: center;
    }
    .title {
        font-size: 20px;
        color: #012989;
        font-weight: normal;
    }
    .radios {
        float: left;
    }
    .block {
        display: inline-block;
    }
    .compare {
        margin-left: 4%;
        margin-right: 10px;
    }
    .item2 {
        margin-top: 15px;
        .subtitle {
            float: left;
            margin-left: 10px;
            margin-right: 13px;
        }
    }
    
    .defaultdate {
        margin-left: 20px;
    }
    .chart {
        margin-top: -4em;
        margin-left: 20px;
        margin-right: 20px;
        border-radius: 0;   
    }
    .card-item {
        margin-left: 20px;
        margin-right: 20px;
        margin-top: 20px;
    }
    .definetarget {
        background-color: #f75426;
        color: #fff;
        border: 1px solid transparent;
        border-radius: 20px;
        font-size: 1.1em;
        padding-left: 30px;
        padding-right: 30px;
    }
    .choose {
        .el-row { margin-bottom: 10px;}
    } 
    .formbody {
        .tip {
            display: inline-block;
            margin-bottom: 15px;
            padding: 6px 6em 6px 14px;
            background: #f5f5f5;
            color: #666;
            .el-icon-warning {
                margin-right: 5px
            }
        }
        .form-item {
            margin-bottom: 0;
        }
        .checkbox {
            .target {
                margin-bottom: 5px;
            }
        }
        .submit { 
            text-align: center;
            .submit-btn { background:#f75426 }
        }
    }
}
</style>
