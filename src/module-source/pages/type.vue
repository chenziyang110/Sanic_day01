<template>
    <div class="dashboard-container">
    <el-card class="card-head">
        <h2 class="title">来源分类（{{defaultdate}}）</h2>
        <SelectRegion v-on:handleTotalData = 'handleTotalData'/>
    </el-card>
    <TotalData :totalList = 'totaldata'/>
    <el-card shadow="never" v-loading="loading"  class="chart">
        <ChartGroup :chartList = 'chartdata'/>
    </el-card>
    
  </div>
</template>
<script>
import {total, chart, targetdata, keywordstarget, keywordsse, domainchart, domaintargetdata, domainranklist} from '@/api/base/source'
import SelectRegion from '@/components/SelectRegion'
import TotalData from '@/components/TotalData'
import ChartGroup from './../components/ChartGroup'

export default {
    components: { SelectRegion, TotalData, ChartGroup },
    data() {
        return {
            loading: false,
            defaultdate: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
            range: '0',
            side: '0',
            visitor: '0',
            date: '',
            totaldata: {},
            chartdata: {}
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
        async doQueryChart(range, side, visitor, date) {
            this.loading = true
            this.chartdata = {}
            await chart({
                range, side, visitor, date
            }).then(res => {
                this.chartdata = res.data
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

        // 交互操作
        handleTotalData (currentrange, currentside, currentvisitor, currentdate) {
            this.range = currentrange
            this.side = currentside 
            this.visitor = currentvisitor
            this.date = currentdate
        
            this.doQueryTotal(this.range, this.side, this.visitor, this.date)  
        },
        handleChartData() {}
    },
    // 创建完毕状态
    created() {
        this.setuptotalData()
        this.setupchartData()
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
