<template>
    <div class="dashboard-container">
        <el-card class="card-head">
            <h2 class="title">外部链接({{defaultdate}}）</h2>
            <!-- 工具栏 -->
            <SelectRegion v-on:handleTotalData = 'handleTotalData'/>
        </el-card>
        <!-- 总计栏 -->
        <TotalData :totalList = 'totaldata'/>

        <el-card shadow="never" v-loading="loading"  class="chart">
            <!-- 下拉框 -->
            <SelectMenu v-on:handleSelect = "handleSelect"/>
            <!-- 图表 -->
            <ChartGroup :chartList = 'chartdata'/>
        </el-card>
        <!-- 自定义指标 -->
        <!-- <CustomTagForm v-on:handleTagForm = 'handleTagForm'/> -->
        <!-- 表格数据列表 -->
        <el-card shadow="never" v-loading="loading" class="card-item card-table">
            <div class="tablestyle">
                <el-table :data="targetData.items">
                <el-table-column prop="datetime" label="日期">
                    <template slot-scope="scope">
                            <span class="datelink" @click="handleSourceLink(scope.$index, scope.row.sourceID)">{{scope.row.datetime}}</span>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="source" label="来源类型" >
                    <template slot-scope="scope">
                        <span>{{scope.row.source}}</span>
                        <i class="el-icon-document"></i>
                    </template>
                </el-table-column> -->
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
        </el-card>

  </div>
</template>
<script>
import {total, chart, targetdata, keywordstarget, keywordsse, domainchart, domaintargetdata, domainranklist} from '@/api/base/source'
import SelectRegion from '@/components/SelectRegion'
import TotalData from '@/components/TotalData'
import SelectMenu from '@/components/SelectMenu'
import CustomTagForm from '@/components/CustomTagForm'
import ChartGroup from './../components/ChartGroup'

export default {
    // name: 'seLink',
    components: { SelectRegion, TotalData, ChartGroup, SelectMenu, CustomTagForm },
    data() {
        return {
            loading: false,
            defaultdate: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
            range: '0',
            side: '0',
            visitor: '0',
            date: '',
            target: '',
            totaldata: {},
            chartdata: {},
            targetData: {},
            showColumes: [true, false, false, true, false, false, true, true, true, true],
            sourceID: ''
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
        async doQueryChart(range, side, visitor, date, target) {
            this.loading = true
            this.chartdata = {}
            await chart({
                range, side, visitor, date, target
            }).then(res => {
                this.chartdata = res.data
            })
            this.loading = false
        },
        // 业务请求：表格数据
        async doQueryTargetData(range, side, visitor, date, tages, sourceID) {
            this.loading = true
            this.targetData = {}
            await targetdata({
                range, side, visitor, date, tages, sourceID
            }).then(res => {
                this.targetData = res.data
            })
            this.loading = false
        },
        // 初始total数据
        async setuptotalData() {
            await this.doQueryTotal()
        },
        // 初始chart数据
        async setupchartData() {
            await this.doQueryChart()
        },
         // 初始target数据
        async setuptargetData() {
            await this.doQueryTargetData()
        },

        // 交互操作
        handleTotalData (currentrange, currentside, currentvisitor, currentdate) {
            this.range = currentrange
            this.side = currentside 
            this.visitor = currentvisitor
            this.date = currentdate
            this.doQueryTotal(this.range, this.side, this.visitor, this.date)  
        },
        handleSelect(currenttarget) {
            this.target = currenttarget
            this.doQueryChart(this.range, this.side, this.visitor, this.date, this.target)
        },
        handleTagForm(currenttages) {
            this.tages = currenttages
            if (this.tages.length > 6) {

            }
            this.doQueryTargetData(this.range, this.side, this.visitor, this.date, this.tages, this.sourceID)
            for (let i = 0; i < this.showColumes.length; i++) {
                // debugger
                let numArray = this.tages.map((value) => {
                    return parseInt(value)
                })
                if (!this.ArrayContains(this.tages, i + 1)) {
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
        // 来源链接
        handleSourceLink(index, sourceID) {
            this.$router.push({
                path: '/selink',
                name: 'source-selink',
                params: { 
                    id: 'id',
                    dataObj: sourceID
                }
            })
        }
        
    },
    
    // 创建完毕状态
    created() {
        this.setuptotalData()
        this.setupchartData()
        this.setuptargetData()
        this.sourceID = this.$route.params.dataObj
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-container {
    // layout
    .title {
        font-size: 20px;
        color: #012989;
        font-weight: normal;
    }
    .chart {
        margin-top: -4em;
        margin-left: 20px;
        margin-right: 20px;
        border-radius: 0;   
    }
    .el-icon-document {
        float: right;
        line-height: 26px;
        margin-right: 15px;
        font-size: 16px;
        color: #f75426;
        cursor: pointer;
    }
    .datelink {
        cursor: pointer;
        color: #012989
    }
    // child style
    
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
    .total {
        margin-top: 15px;
        padding: 20px 0 6em;
        background: #012989;
        color: #fff;
        .target {
            margin-left: -15px;
            text-align: center;
            h1 {
                font-size: 3em;
                line-height: 1;
                margin-top: 0.2em;
                margin-bottom: 0.2em;
                font-weight: normal;
            }
            p {
                font-size: 1.2em;
                color: #7b9de8;
            }
        }
    }
    .defaultdate {
        margin-left: 20px;
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
