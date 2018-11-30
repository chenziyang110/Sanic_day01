<template>
     <div class="dashboard-container">
        <!-- 工具栏 -->
        <el-card class="card-head">
            <h2 class="title">新老访客（{{defaultdate}}）</h2>
            <div class="choose">
                <el-form :inline="true" >
                    <el-form-item class="subtitle" label="时间：">
                    <div class="radios">
                            <el-radio-group  v-model="range" @change="handleData">
                                <el-radio-button label="0">最近1个月</el-radio-button>
                                <el-radio-button label="1">最近2个月</el-radio-button>
                                <el-radio-button label="7">最近3个月</el-radio-button>
                                <el-radio-button label="30">最近半年</el-radio-button>
                            </el-radio-group>
                        </div>
                    </el-form-item>
                    <el-form-item  class="subtitle" label="日期：">
                        <el-date-picker
                            v-model="date"
                            @change="handleData"
                            type="date"
                            format= "yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item  class="subtitle" label="访客：">
                        <div class="radios">
                            <el-radio-group  v-model="side"  @change="handleData">                             
                                <el-radio-button label="0" >全部</el-radio-button>
                                <el-radio-button label="1" >计算机</el-radio-button>
                                <el-radio-button label="2">移动端</el-radio-button>
                            </el-radio-group>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
        <!-- 用户占比 -->
        <!-- <el-card shadow="never"  class="card-total">
            <el-table
                :data="totalData"
                style="width: 100%">
                <el-table-column
                    prop="title"
                    label="">
                </el-table-column>
                <el-table-column
                    prop="newVisitor"
                    label="新访客">
                </el-table-column>
                <el-table-column
                    prop="oldVisitors"
                    label="老访客">
                </el-table-column>
            </el-table>
        </el-card> -->
        <el-card shadow="never"  class="card-total">
           <el-row>
               <el-col :span="6" class="total-title">
                   {{total0.title}}
               </el-col>
               <el-col :span="6" class="total-item">
                   <i class="fa fa-users"></i>
                   <div class="text">
                       <span class="percent">{{total0.newVisitor}}</span>
                       <span class="name">新访客</span>
                   </div>
                   
               </el-col>
               <el-col :span="6" class="total-item">
                   <i class="fa fa-users"></i>
                   <div class="text">
                       <span class="percent">{{total0.oldVisitors}}</span>
                       <span class="name">老访客</span>
                   </div>
               </el-col>
           </el-row>
        </el-card>
        <el-card shadow="never" class="card-newold">
            <el-row>
                <el-col :offset="6" :span="7">{{total1.title}}：{{total1.newVisitor}}</el-col>
                <el-col :span="9">{{total1.title}}：{{total1.oldVisitors}}</el-col>
            </el-row>
            <el-row>
                <el-col :offset="6" :span="7">{{total2.title}}：{{total2.newVisitor}}</el-col>
                <el-col :span="9">{{total2.title}}：{{total2.oldVisitors}}</el-col>
            </el-row>
            <el-row>
                <el-col :offset="6" :span="7">{{total3.title}}：{{total3.newVisitor}}</el-col>
                <el-col :span="9">{{total3.title}}：{{total3.oldVisitors}}</el-col>
            </el-row>
            <el-row>
                <el-col :offset="6" :span="7">{{total4.title}}：{{total4.newVisitor}}</el-col>
                <el-col :span="9">{{total4.title}}：{{total4.oldVisitors}}</el-col>
            </el-row>
            <el-row>
                <el-col :offset="6" :span="7">{{total5.title}}：{{total5.newVisitor}}</el-col>
                <el-col :span="9">{{total5.title}}：{{total5.oldVisitors}}</el-col>
            </el-row>
           
        </el-card>
        <!-- 图表 -->
        <el-card shadow="never"   class="card-module">
            <!-- 下拉框 -->
            <el-select v-model="target" placeholder="选择指示" @change="handleSelect">
                <el-option
                    v-for="item in targetitems"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                <el-radio :label='1'>{{ item.label }}</el-radio>
                </el-option>
            </el-select>
             <div  id="chart" style="min-height: 400px; width: 99%"></div>
        </el-card>
       
        <!-- 数据列表 -->
        <el-card shadow="never" class="card-module">
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="date"
                    label="日期">
                </el-table-column>
                <el-table-column
                    prop="newVisitor"
                    label="新用户数">
                </el-table-column>
                <el-table-column
                    prop="newVisitorRatio"
                    label="新用户占比">
                </el-table-column>
                <el-table-column
                    prop="oldVisitors"
                    label="老用户数">
                </el-table-column>
                <el-table-column
                    prop="oldVisitorsRatio"
                    label="老用户数占比">
                </el-table-column>
            </el-table>
        </el-card>
         
     </div>
</template>
<script>

import {totals, targetDatas, chart} from '@/api/base/visitor'
import echarts from 'echarts'
import resize from './../../components/Charts/mixins/resize'

export default {
    data() {
        return {
            loading: false,
            defaultdate: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
            range: '0',
            date: '',
            side: '0',
            totalData: [],
            tableData: [],
            chart: null,
            target: '',
            targetitems: [{
                value: '1',
                label: '浏览次数'
            }, {
                value: '2',
                label: '访客次数'
            }, {
                value: '3',
                label: 'IP'
            }, {
                value: '4',
                label: '新独立访客数'
            }, {
                value: '5',
                label: '平均访客深度'
            }, {
                value: '6',
                label: '平均访客时长'
            }, {
                value: '7',
                label: '跳出率'
            }],
            total0: {},
            total1: {},
            total2: {},
            total3: {},
            total4: {}, 
            total5: {}        
        }
    },
    methods: {
        // 总计业务请求
        async doQueryTotal(range, date, side) {
            this.loading = true
            await totals({
                range, date, side
            }).then(res => {
                this.totalData = res.data.items

                this.total0 = this.totalData[0]
                this.total1 = this.totalData[1]
                this.total2 = this.totalData[2]
                this.total3 = this.totalData[3]
                this.total4 = this.totalData[4]
                this.total5 = this.totalData[5]
            })
            this.loading = false
        },
        // 图表业务请求
        async doQueryChart(target, range, date, side) {
            this.loading = true
            await chart({
                target, range, date, side
            }).then(res => {
                this.chartData = res.data

                let usexdata = []
                let getxdata = this.chartData.xAxis
                    for (let xitem of getxdata) {
                    usexdata.push(xitem.data)
                }


                let seriesdata0 = []
                let getseriesdata0 = this.chartData.series[0].items
                for (let seriesitem0 of getseriesdata0) {
                    seriesdata0.push(seriesitem0.data)
                }

                let seriesdata1 = []
                let getseriesdata1 = this.chartData.series[1].items
                for (let seriesitem1 of getseriesdata1) {
                    seriesdata1.push(seriesitem1.data)
                }


                this.chart = echarts.init(document.getElementById('chart'))
                this.chart.setOption({
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: usexdata
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: '邮件营销',
                            type: 'line',
                            stack: '总量',
                            data: seriesdata0
                        },
                        {
                            name: '联盟广告',
                            type: 'line',
                            stack: '总量',
                            data: seriesdata1
                        }
                    ]
                })
            })
            this.loading = false
        },
        // 数据列表业务请求
        async doQueryTable(range, date) {
            this.loading = true
            await targetDatas({
                range, date
            }).then(res => {
                this.tableData = res.data.items
            })
            this.loading = false
        },
        // 初始数据
        async setuptotalData() {
            await this.doQueryTotal()
        },
        async setupchartData() {
            await this.doQueryChart()
        },
        async setuptableData() {
            await this.doQueryTable()
        },
        // 图表
        newOldsChart() {
            this.chart = echarts.init(document.getElementById('chart'))
            this.chart.setOption({
                 xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [120, 200, 150, 80, 70, 110, 130],
                    type: 'bar'
                }]
            })
        },
        // 交互操作
        handleData(range, date, side) {
            this.doQueryTotal(this.range, this.date, this.side)
            this.doQueryChart(this.target, this.range, this.date, this.side)
            this.doQueryTable(this.range, this.date) 
        },
        handleSelect(target, range, date, side) {
            this.doQueryChart(this.target, this.range, this.date, this.side)
        },
        //  图表
       
        // 学历chart
        educationChart() {
            this.chart = echarts.init(document.getElementById('educationchart'))
            this.chart.setOption({
                tooltip: {
                trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: [
                            {value: 335, name: '直接访问'},
                            {value: 310, name: '邮件营销'},
                            {value: 234, name: '联盟广告'},
                            {value: 135, name: '视频广告'},
                            {value: 1548, name: '搜索引擎'}
                        ]
                    }
                ]
            })
        }
    },
    created() {
        this.setuptotalData()
        this.setupchartData()
        this.setuptableData()
        
    },
    mounted() {
        // this.newOldsChart()
    }
}
</script>
<style lang="scss" scoped>
.dashboard-container {
    // layout
    .title {
        font-size: 20px;
        color: #012989;
        font-weight: normal;
    }
    .card-total {
        margin-top: 20px;
        padding: 20px 20px 30px;
        background: #012989;
        .total-title {
            line-height: 2.5;
            font-size: 24px;
            color: #4ed6fe
        }
        .total-item {
            .fa-users {
                float: left;
                margin-right: 15px;
                line-height: 1.8;
                font-size: 40px;
                color: #0c40be;
            }
            .text {
                float: left;
                text-align: center;
                line-height: 1.2
            }
            span {
                display: block;
                &.percent {
                    font-size: 36px;
                    color: #fff;
                }
                &.name {
                    font-size: 20px;
                    color: #87aaf5;
                }
            }
        }
    }
    .card-module {
        margin-left: 20px;
        margin-right: 20px;
        margin-top: 20px;
    }
    .card-newold {
        margin-left: 20px;
        margin-right: 20px;
        margin-top: -20px;
        line-height: 2;
        font-size: 15px;
    }
}
</style>


