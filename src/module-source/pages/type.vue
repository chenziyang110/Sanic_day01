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
    <el-card shadow="never" v-loading="loading" class="card-item card-table">
        <div class="tablestyle">
           <!-- <el-table
                :data="newSearchEngineData"
                style="width: 100%">
                <el-table-column type="expand">
                <template >
                    <el-table
                        :data="searchEngineData"
                            class="innertable"
                        style="width: 100%">
                        <el-table-column label="来源类型" prop="source"></el-table-column>
                        <el-table-column label="浏览次数"  prop="timesOfBrowsing" v-if="showColumes[0]"> </el-table-column>
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
                </template>
                </el-table-column>
                <el-table-column label="来源类型"  prop="name1">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.name1 }}</span>
                         <i class="el-icon-document" @click="handleGoSe"></i>
                    </template>
                </el-table-column>
                <el-table-column label="浏览次数"  prop="TimeBrowseTotal" v-if="showColumes[0]"> </el-table-column>
                <el-table-column prop="browsingVolumeTotal" label="浏览量占比" v-if="showColumes[1]"></el-table-column>
                <el-table-column prop="timesOfVisiteTotal" label="访问次数" v-if="showColumes[2]"></el-table-column>
                <el-table-column prop="independentVisitorsTotal" label="独立访客" v-if="showColumes[3]"></el-table-column>
                <el-table-column prop="independentNewVisitorsTotal" label="新独立访客数" v-if="showColumes[4]"></el-table-column>
                <el-table-column prop="independentNewVisitorsRateTotal" label="新独立访比率" v-if="showColumes[5]"></el-table-column>
                <el-table-column prop="IPTotal" label="IP" v-if="showColumes[6]"></el-table-column>
                <el-table-column prop="bounceRateTotal" label="跳出率" v-if="showColumes[7]"></el-table-column>
                <el-table-column prop="averageAccessDepthTotal" label="平均访问深度" v-if="showColumes[8]"></el-table-column>
                <el-table-column prop="averageAccessTimeTotal" label="平均访问时长" v-if="showColumes[9]"></el-table-column>
            </el-table> -->
            <el-table
                :data="newExternalLinksData"
                class="innertable"
                style="width: 100%">
                <el-table-column type="expand">
                    <template >
                        <el-table
                            :data="externalLinksData"
                                class="innertable"
                            style="width: 100%">
                            <el-table-column label="来源类型" prop="source" >
                                <template slot-scope="scope">
                                    <span style="margin-left: 10px">{{scope.row.source}}</span>
                                    <i class="el-icon-document" @click="handleGoSeDetail(scope.$index, scope.row.sourceID)"></i>
                                </template>
                            </el-table-column>
                            <el-table-column label="浏览次数"  prop="timesOfBrowsing" v-if="showColumes[0]"> </el-table-column>
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
                    </template>
                </el-table-column>
                <el-table-column label="来源类型"  prop="name2">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{scope.row.name2}}</span>
                         <i class="el-icon-document" @click="handleGoSelink"></i>
                    </template>
                </el-table-column>
                <el-table-column label="浏览次数"  prop="TimeBrowseTotal" v-if="showColumes[0]"> </el-table-column>
                <el-table-column prop="browsingVolumeTotal" label="浏览量占比" v-if="showColumes[1]"></el-table-column>
                <el-table-column prop="timesOfVisiteTotal" label="访问次数" v-if="showColumes[2]"></el-table-column>
                <el-table-column prop="independentVisitorsTotal" label="独立访客" v-if="showColumes[3]"></el-table-column>
                <el-table-column prop="independentNewVisitorsTotal" label="新独立访客数" v-if="showColumes[4]"></el-table-column>
                <el-table-column prop="independentNewVisitorsRateTotal" label="新独立访比率" v-if="showColumes[5]"></el-table-column>
                <el-table-column prop="IPTotal" label="IP" v-if="showColumes[6]"></el-table-column>
                <el-table-column prop="bounceRateTotal" label="跳出率" v-if="showColumes[7]"></el-table-column>
                <el-table-column prop="averageAccessDepthTotal" label="平均访问深度" v-if="showColumes[8]"></el-table-column>
                <el-table-column prop="averageAccessTimeTotal" label="平均访问时长" v-if="showColumes[9]"></el-table-column>
            </el-table>
        </div>
    </el-card>


  </div>
</template>
<script>
import {total, chart, targetdata} from '@/api/base/source'
import SelectRegion from '@/components/SelectRegion'
import TotalData from '@/components/TotalData'
import SelectMenu from '@/components/SelectMenu'
import CustomTagForm from '@/components/CustomTagForm'
import ChartGroup from './../components/ChartGroup'

export default {
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
        async doQueryTargetData(range, side, visitor, date, tages) {
            console.log(tages)
            this.loading = true
            this.targetData = {}
            await targetdata({
                range, side, visitor, date, tages
            }).then(res => {
                this.targetData = res.data
                this.totalsData = res.data.totals // 全部总计数据
                this.directAccessData = res.data.directAccess // 直接访问数据
        
                // this.searchEngineData = res.data.domains // 搜索引擎数据
                this.externalLinksData = res.data.externalLinks // 外部链接数据

                let searchEngine = this.searchEngineData
                let externalLinks = this.externalLinksData
               

                let searchEngineModule = this.ArrayTotal(searchEngine)
                let externalLinksModule = this.ArrayTotal(externalLinks)

                let name1 = '搜索引擎'
                let name2 = '外部链接'
                
                let searchEngineObject = {
                    name1, 
                    TimeBrowseTotal: searchEngineModule.TimeBrowseTotal,
                    independentVisitorsTotal: searchEngineModule.independentVisitorsTotal,
                    IPTotal: searchEngineModule.IPTotal,
                    averageAccessDepthTotal: searchEngineModule.averageAccessDepthTotal,
                    averageAccessTimeTotal: searchEngineModule.averageAccessTimeTotal,
                    bounceRateTotal: searchEngineModule.bounceRateTotal
                }
                let externalLinksObject = {
                    name2, 
                    TimeBrowseTotal: externalLinksModule.TimeBrowseTotal,
                    independentVisitorsTotal: externalLinksModule.independentVisitorsTotal,
                    IPTotal: externalLinksModule.IPTotal,
                    averageAccessDepthTotal: externalLinksModule.averageAccessDepthTotal,
                    averageAccessTimeTotal: externalLinksModule.averageAccessTimeTotal,
                    bounceRateTotal: externalLinksModule.bounceRateTotal
                }            
                this.newSearchEngineData = [searchEngineObject]
                this.newExternalLinksData = [externalLinksObject]          
            })

            this.loading = false
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
            this.showRowNum = currenttages.length
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
        // 路由：去搜索引擎详情页
        handleGoSeDetail(index, sourceID) {
            console.log(sourceID)
            this.$router.push({
                path: '/source/sedetail:id',
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
    .table-head,.table-direct {
        span {display: inline-block;}
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
