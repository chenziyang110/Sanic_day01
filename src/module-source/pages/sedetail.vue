<template>
    <div  class="dashboard-container">
        <el-card class="card-head">
            <h2 class="title">搜索引擎({{defaultdate}}）</h2>
            <!-- 工具栏 -->
            <SelectRegion v-on:handleTotalData = 'handleTotalData'/>
        </el-card>
        <!-- 总计栏 -->
        <TotalData :totalList = 'totaldata'/>

        <el-card shadow="never" v-loading="loading"  class="chart">
            <!-- 下拉框 -->
            <SelectMenu v-on:handleSelect = "handleSelect"/>
            <!-- 图表 -->
            <lineChart :lineChartData = 'linechartData'/>
            <!-- <ChartGroup :chartList = 'chartdata'/> -->
        </el-card>
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
import {total, chart, targetdata, setargetdata} from '@/api/base/source'
import SelectRegion from '@/components/SelectRegion'
import TotalData from '@/components/TotalData'
import SelectMenu from '@/components/SelectMenu'
import CustomTagForm from '@/components/CustomTagForm'
import lineChart from '@/components/Charts/lineChart'
// import ChartGroup from './../components/ChartGroup'


export default {
    components: { SelectRegion, TotalData, lineChart, SelectMenu, CustomTagForm },
    data() {
        return {
            loading: false,
            defaultdate: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
            range: '1',
            side: '0',
            visitor: '0',
            date: '',
            target: '',
            totaldata: {},
            linechartData: {}, // 图表数据
            targetData: {},
            showColumes: [true, false, false, true, false, false, true, true, true, true],
            sourceID: this.$route.params.dataObj
        }
    },
    methods: {
         // 业务请求：合计
        async doQueryTotal(range, side, visitor, date, sourceID) {
            this.loading = true
            this.totaldata = {}
            await total({
                range, side, visitor, date, sourceID
            }).then(res => {
                this.totaldata = res.data
            })
            this.loading = false
        },
        // 业务请求：图表
        async doQueryChart(range, side, visitor, date, target, sourceID) {
            this.loading = true
            this.chartdata = {}
            await chart({
                range, side, visitor, date, target, sourceID
            }).then(res => {
                this.linechartData = res.data
            })
            this.loading = false
        },
        // 业务请求：表格数据
        async doQueryTargetData(range, side, visitor, date, sourceID) {
            this.loading = true
            this.targetData = {}
            await setargetdata({
                range, side, visitor, date, sourceID
            }).then(res => {
                this.targetData = res.data
            })
            this.loading = false
        },
        // 初始total数据
        async setuptotalData(range, side, visitor, date, sourceID) {
            await this.doQueryTotal(this.range, this.side, this.visitor, this.date, this.sourceID)
        },
        // 初始chart数据
        async setupchartData(range, side, visitor, date, sourceID) {
            await this.doQueryChart(this.range, this.side, this.visitor, this.date, this.sourceID)
        },
         // 初始target数据
        async setuptargetData(range, side, visitor, date, sourceID) {
            await this.doQueryTargetData(this.range, this.side, this.visitor, this.date, this.sourceID)
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
        handleSourceLink() {
            
        }
    },
    created() {
        this.setuptotalData()
        this.setupchartData()
        this.setuptargetData()
    }
}
</script>
<style lang="scss" scoped>
.dashboard-container {
    .chart {
        margin-top: -20px;
        margin-left: 20px;
        margin-right: 20px;
        border-radius: 0;   
    }
    .card-table {
        border-top: 0;
        margin-left: 20px;
        margin-right: 20px;
    }
}
</style>

