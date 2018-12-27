<template>
    <div class="dashboard-container">
    <el-card class="card-head">
        <h2 class="title">来源分类（{{defaultdate}}）</h2>
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
    <CustomTagForm v-on:handleTagForm = 'handleTagForm'/>
    <!-- 表格数据列表 -->
    <el-card shadow="never" v-loading="loading" class="card-table">
        <div class="tablestyle sourcetype">
            <foldTable :tableList = 'tabledata' :showColumes = 'showColumes'></foldTable>
        </div>
    </el-card>
  </div>
</template>
<script>
import {total, chart, targetdata} from '@/api/base/source'
import SelectRegion from '@/components/SelectRegion'
import TotalData from '@/components/TotalData'
import foldTable from '@/components/foldTable'
import SelectMenu from '@/components/SelectMenu'
import CustomTagForm from '@/components/CustomTagForm'
import ChartGroup from './../components/ChartGroup'

export default {
    components: { SelectRegion, TotalData, foldTable, ChartGroup, SelectMenu, CustomTagForm },
    data() {
        return {
            loading: false,
            defaultdate: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
            range: '1',
            side: '',
            visitor: '',
            date: '',
            target: '',
            tabledata: [],
            totalsData: {},
            chartdata: {},
            targetData: {},
            showColumes: [true, false, false, true, false, false, true, true, true, true],
            showRowNum: 6,
            directAccessData: {},
            searchEngineData: [], // 搜索引擎数据
            externalLinksData: [], // 外部链接数据
            newSearchEngineData: [], // 搜索引擎新数据
            newExternalLinksData: [] // 外部链接新数据
        }
    },
    methods: {
        // 业务请求：合计
        async doQueryTotal(range = 1, side, visitor, date, sourceID) {
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
        async doQueryChart(range, side, visitor, date, sourceID, target = 1) {
            this.loading = true
            this.chartdata = {}
            await chart({
                range, side, visitor, date, sourceID, target
            }).then(res => {
                this.chartdata = res.data
            })
            this.loading = false
        },
        // 业务请求：表格数据
        async doQueryTargetData(range, side, visitor, date, tages) {
            this.loading = true
            this.targetData = {}
            await targetdata({
                range, side, visitor, date, tages
            }).then(res => {
                this.targetData = res.data

                this.totalsData = res.data.totals // 全部总计
                this.tabledata = res.data.domains // 域名列表
                this.directAccessData = res.data.directAccess // 直接访问
                this.externalLinksData = res.data.externalLinks // 外部链接

                this.totalsData.source = '全部总计'
                this.tabledata.splice(0, 0, this.totalsData)


                // let searchEngine = this.searchEngineData
                // let externalLinks = this.externalLinksData
               

                // let searchEngineModule = this.ArrayTotal(searchEngine)
                // let externalLinksModule = this.ArrayTotal(externalLinks)

                // let name1 = '搜索引擎'
                // let name2 = '外部链接'
                
                // let searchEngineObject = {
                //     name1, 
                //     TimeBrowseTotal: searchEngineModule.TimeBrowseTotal,
                //     independentVisitorsTotal: searchEngineModule.independentVisitorsTotal,
                //     IPTotal: searchEngineModule.IPTotal,
                //     averageAccessDepthTotal: searchEngineModule.averageAccessDepthTotal,
                //     averageAccessTimeTotal: searchEngineModule.averageAccessTimeTotal,
                //     bounceRateTotal: searchEngineModule.bounceRateTotal
                // }
                // let externalLinksObject = {
                //     name2, 
                //     TimeBrowseTotal: externalLinksModule.TimeBrowseTotal,
                //     independentVisitorsTotal: externalLinksModule.independentVisitorsTotal,
                //     IPTotal: externalLinksModule.IPTotal,
                //     averageAccessDepthTotal: externalLinksModule.averageAccessDepthTotal,
                //     averageAccessTimeTotal: externalLinksModule.averageAccessTimeTotal,
                //     bounceRateTotal: externalLinksModule.bounceRateTotal
                // }            
                // this.newSearchEngineData = [searchEngineObject]
                // this.newExternalLinksData = [externalLinksObject]          
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
        // 获取数组total
        ArrayTotal(array) {
            let TimeBrowseData = []
            let independentVisitorsData = []
            let IPData = []
            let averageAccessDepthData = []
            let averageAccessTimeData = []
            let bounceRateData = []

            for (let item of array) {
                TimeBrowseData.push(item.timesOfBrowsing)
                independentVisitorsData.push(item.independentVisitors)
                IPData.push(item.IP)
                averageAccessDepthData.push(item.averageAccessDepth)
                averageAccessTimeData.push(item.averageAccessTime)
                bounceRateData.push(item.bounceRate)
            }

            return {
                TimeBrowseTotal: this.sum(TimeBrowseData),
                independentVisitorsTotal: this.sum(independentVisitorsData),
                IPTotal: this.sum(IPData),
                averageAccessDepthTotal: this.sum(averageAccessDepthData),
                averageAccessTimeTotal: this.sum(averageAccessTimeData),
                bounceRateTotal: this.sum(bounceRateData)
            }
        },
        // 求和
        sum(arr) {
            var s = 0
            arr.forEach(function(val, idx, arr) {
                s += val
            }, 0)
        
            return s
        },
        // 交互操作
        handleTotalData (range, side, visitor, date, sourceID, target) {
            if (range !== '') {
                this.date = ''
            }
            this.doQueryTotal(range, side, visitor, date)
            this.doQueryChart(range, side, visitor, date, sourceID, this.target)

            this.doQueryTargetData(range, side, visitor, date, sourceID, this.tages)
        },
        handleSelect(target) {
            this.target = target
            this.doQueryChart(this.range, this.side, this.visitor, this.date, this.sourceID, this.target)
        },
        handleTagForm(currenttages) {
            this.tages = currenttages
            this.showRowNum = currenttages.length
            this.doQueryTargetData(this.range, this.side, this.visitor, this.date, this.sourceID, this.tages)
            for (let i = 0; i < this.showColumes.length; i++) {
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
        // 路由：去搜索引擎详情页
        handleGoSeDetail(index, sourceID) {
            this.$router.push({
                path: '/source/sedetail',
                name: 'source-sedetail',
                params: { 
                    id: 'id',
                    dataObj: sourceID
                }
            })
        },
        // 路由：去搜索引擎主页
        handleGoSe() {
            this.$router.push({
                path: '/source/se',
                name: 'source-se'
            })
        },
        // 路由：去外部链接
        handleGoSelink() {
            this.$router.push({
                path: '/source/selink',
                name: 'source-selink'
            })
        }
    },
    // 创建完毕状态
    created() {
        this.setuptotalData()
        this.setupchartData()
        this.setuptargetData()
    },
    mounted() {
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
}
</style>