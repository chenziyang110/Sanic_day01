<template>
     <div class="dashboard-container">
        <!-- 工具栏 -->
        <el-card class="card-head">
            <h2 class="title">地域分布（{{defaultdate}}）</h2>
            <div class="choose">
                <el-form :inline="true" >

                    <el-form-item class="subtitle" label="时间：">
                    <div class="radios">
                        <el-button round   @click="handleOpenTime">打开</el-button>
                            <el-radio-group  v-model="range" @change="handleToolData">
                                <el-radio-button label="0" :disabled="timedisabled">今天</el-radio-button>
                                <el-radio-button label="1" :disabled="timedisabled">昨天</el-radio-button>
                                <el-radio-button label="7" :disabled="timedisabled">最近7日</el-radio-button>
                                <el-radio-button label="30" :disabled="timedisabled">最近30日</el-radio-button>
                            </el-radio-group>
                        </div>
                    </el-form-item>
                    <el-button type="text" class="definite-btn"  @click="handleDefiniteDate"  :disabled="definitedisable" >自定义日期：</el-button>
                    <el-form-item  class="subtitle" label="">
                        <el-date-picker
                            v-model="date"
                            @change="handleToolData"
                            :disabled="datedisabled"
                            type="date"
                            format= "yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <br />

                     <el-form-item   class="subtitle" label="来源：">

                         <el-select v-model="sourceType" @change="handleToolData" placeholder="请选择">
                            <el-option
                            v-for="item in sourceTypes"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item  class="subtitle" label="访客：">
                        <div class="radios">
                            <el-radio-group  v-model="visitor"  @change="handleToolData">                             
                                <el-radio-button label="0" >全部</el-radio-button>
                                <el-radio-button label="1" >新访客</el-radio-button>
                                <el-radio-button label="2">老访客</el-radio-button>
                            </el-radio-group>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
        <!-- 总计 -->
        <el-card class="card-total">
             <TotalData :totalList = 'totalData'/>
        </el-card>
        <!-- 图表 -->
        <el-card shadow="never"   class="card-module">
            <!-- 下拉框 -->
            <el-select v-model="target" placeholder="选择指示" @change="handleSelectTarget">
                <el-option
                    v-for="item in targetitems"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    class="selectoption"
                >
                <el-radio :label='1'>{{ item.label }}</el-radio>
                </el-option>
            </el-select>
            <el-row>
                <el-col :span="15" >
                    <div  id="map" style="min-height: 400px; width: 99%"></div>
                </el-col>
                <el-col :span="9">
                    <div  id="barchart" style="min-height: 400px; width: 99%"></div>
                </el-col>
            </el-row>
        </el-card>
        <!-- 限制栏 -->
        <div class="card-search">
            <el-row :gutter="20">
                <el-col :span="10">
                    <el-form ref="searchform" :model="formSearch">
                        <el-input  placeholder="请输入" v-model="formSearch.keyword" style="width: 300px;"></el-input>
                        <el-button type="warning" class="filter-item" size="medium"  @click="handleSearch">搜索</el-button>
                    </el-form>
                </el-col>
            </el-row>
        </div>
        <!-- 自定义指标 -->
        <CustomTagForm v-on:handleTagForm = 'handleTagForm'/>
        <div class="table-box">
            <!-- 表格数据列表 -->
            <el-card shadow="never" v-loading="loading" class="card-item card-table">
                <div class="tablestyle">
                    <el-table  :data="tableData" >
                        <el-table-column type="expand">
                            <template slot-scope="props">
                                <el-table
                                    :data="props.row.citys"
                                    class="innertable"
                                    style="width: 100%">
                                    <el-table-column label="地区" prop="province" >
                                        <template slot-scope="scope">
                                            <span style="margin-left: 10px">{{scope.row.city}}</span>
                                            <!-- <i class="el-icon-document" @click="handleGoSeDetail(scope.$index, scope.row.sourceID)"></i> -->
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="timesOfBrowsing" label="浏览次数" v-if="showColumes[0]"></el-table-column>
                                    <el-table-column prop="independentVisitors" label="独立访客" v-if="showColumes[1]"></el-table-column>
                                    <el-table-column prop="newIndependentVisitors" label="新独立访客数" v-if="showColumes[2]"></el-table-column>
                                    <el-table-column prop="IP" label="IP" v-if="showColumes[3]"></el-table-column>
                                    <el-table-column prop="averageAccessDepth" label="平均访问深度" v-if="showColumes[4]"></el-table-column>
                                    <el-table-column prop="averageAccessTime" label="平均访问时长" v-if="showColumes[5]"></el-table-column>
                                    <el-table-column prop="bounceRate" label="跳出率" v-if="showColumes[6]"></el-table-column>
                                    <el-table-column prop="browsingVolume" label="浏览量占比" v-if="showColumes[7]"></el-table-column>
                                    <el-table-column prop="timesOfVisite" label="访问次数" v-if="showColumes[8]"></el-table-column>
                                    <el-table-column prop="independentNewVisitorsRate" label="新访客比率" v-if="showColumes[9]"></el-table-column>

                                </el-table>
                            </template>
                        </el-table-column>
                        <el-table-column prop="province" label="地区">
                            <template slot-scope="scope">
                                <span>{{scope.row.province}}</span>
                                <!-- <i class="el-icon-document" @click="handleSourceLink(scope.$index, scope.row.sourceID)"></i> -->
                            </template>
                        </el-table-column>
                        <el-table-column prop="timesOfBrowsing" label="浏览次数" v-if="showColumes[0]"></el-table-column>
                        <el-table-column prop="independentVisitors" label="独立访客" v-if="showColumes[1]"></el-table-column>
                        <el-table-column prop="newIndependentVisitors" label="新独立访客数" v-if="showColumes[2]"></el-table-column>
                        <el-table-column prop="IP" label="IP" v-if="showColumes[3]"></el-table-column>
                        <el-table-column prop="averageAccessDepth" label="平均访问深度" v-if="showColumes[4]"></el-table-column>
                        <el-table-column prop="averageAccessTime" label="平均访问时长" v-if="showColumes[5]"></el-table-column>
                        <el-table-column prop="bounceRate" label="跳出率" v-if="showColumes[6]"></el-table-column>
                        <el-table-column prop="browsingVolume" label="浏览量占比" v-if="showColumes[7]"></el-table-column>
                        <el-table-column prop="timesOfVisite" label="访问次数" v-if="showColumes[8]"></el-table-column>
                        <el-table-column prop="independentNewVisitorsRate" label="新访客比率" v-if="showColumes[9]"></el-table-column>
                        
                        
                    
                    </el-table>
                </div>
            </el-card>
        </div>
    
         
     </div>
</template>
<script>

import {areatotals, areachart, areatargetData} from '@/api/base/visitor'
import TotalData from '@/components/TotalData'
import CustomTagForm from '@/components/CustomTagForm'
import 'echarts/map/js/china.js'
import echarts from 'echarts'
import resize from './../../components/Charts/mixins/resize'

export default {
    components: { TotalData, CustomTagForm },
    data() {
        return {
            loading: false,
            defaultdate: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
            range: '0',
            date: '',
            visitor: '0',
            // 日期控制
            definitedisable: false,
            datedisabled: true,
            timedisabled: false,
            totalData: {},
            tableData: [],
            chart: null,
            chart2: null,
            showColumes: [true, true, true, true, true, true, true, false, false, false],
            sourceType: '',
            sourceTypes: [
                {
                    value: '1',
                    label: '直接访问 '
                }, {
                    value: '2',
                    label: '搜索引擎'
                }, {
                    value: '3',
                    label: '外部链接'
                }],
            target: '浏览次数',
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
            formSearch: {
                keyword: ''
            },
            areatabledata: []           
        }
    },
    watch: {
        
    },
    methods: {
        // 总计业务请求
        async doQueryTotal(range, visitor, date, sourceType) {
            this.loading = true
            await areatotals({
                range, visitor, date, sourceType
            }).then(res => {
                this.totalData = res.data
            })
            this.loading = false
        },
        // 图表业务请求
        async doQueryChart(range, visitor, date, sourceType, target) {
            this.loading = true
            await areachart({
                range, visitor, date, sourceType, target
            }).then(res => {
                // this.totalData = res.data
                let totaldata = res.data.series.total

                let usexdata = []
                let getxdata = res.data.series.items
                for (let xitem of getxdata) {
                    usexdata.push(xitem.name)
                }

                let useseriesdata = []
                let getseriesdata = res.data.series.items
                for (let yitem of getseriesdata) {
                    useseriesdata.push(yitem.value)
                }

                let maxvalue = Math.max.apply(null, useseriesdata)
                // 地图
                this.chart2 = echarts.init(document.getElementById('map'))
                this.chart2.setOption({
                tooltip: {
                    trigger: 'item'
                },
            
                visualMap: {
                    min: 0,
                    max: maxvalue,
                    left: 'left',
                    top: 'bottom',
                    text: ['高', '低'], // 文本，默认为数值文本
                    calculable: true
                },
                
                series: [
                    {
                        name: '浏览量',
                        type: 'map',
                        mapType: 'china',
                        roam: true,
                        label: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        data: getseriesdata
                    }
                ]
                })
                // 条形图
                this.chart = echarts.init(document.getElementById('barchart'))
                this.chart.setOption({
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        x: 100,
                        y: 10,
                        y2: 70
                    },
                    xAxis: {
                        type: 'category',
                        axisLabel: {
                            interval: 0,
                            rotate: 45,
                            margin: 5,
                            textStyle: {
                              color: '#222'
                         }},
                        data: usexdata
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: useseriesdata,
                        type: 'bar'
                    }]
                })
            })
            this.loading = false
        },
        // 数据列表业务请求
        async doQueryTable(range, visitor, date, sourceType, tages) {
            this.loading = true
            await areatargetData({
                range, visitor, date, sourceType, tages
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
        // 交互操作
        handleOpenTime() {
          this.datedisabled = true
          this.range = '0'
          this.timedisabled = false
          this.handleToolData()
        },
        handleDefiniteDate() {
          this.timedisabled = true
          this.range = ''
          this.date = ''
          this.datedisabled = false
        },
        handleToolData(range, visitor, date, sourceType) {
            this.doQueryTotal(this.range, this.visitor, this.date, this.sourceType)
            this.doQueryChart(this.range, this.visitor, this.date, this.sourceType)
            this.doQueryTable(this.range, this.visitor, this.date, this.sourceType)
        },
        handleSelectTarget(range, visitor, date, sourceType, target) {
            this.doQueryChart(this.range, this.visitor, this.date, this.sourceType, this.target)
        },
        handleSearch() {},
        handleTagForm(currenttages) {
            this.targets = currenttages
            
            this.doQueryTable(this.range, this.visitor, this.date, this.sourceType)

            for (let i = 0; i < this.showColumes.length; i++) {
                // debugger
                let numArray = this.targets.map((value) => {
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
        }
        //  图表
       
        
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
    .definite-btn {
    font-size: 16px;
    padding-right: 0
}
    // layout
    .title {
        font-size: 20px;
        color: #012989;
        font-weight: normal;
    }
    .card-total {
        margin-top: 20px;
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
        margin-top: -30px;
    }
    .card-table, .card-search{
        margin: 20px 20px 0;
    }
    .filter-item {
        background-color: #f75426;
        color: #fff;
        border: 1px solid transparent;
        border-radius: 20px;
        font-size: 1.1em;
        padding-left: 30px;
        padding-right: 30px;
    }
    .targets  .card-item {
        padding: 0
    }
    .table-box {
        margin-top: 10px;
    }
    
}
</style>


