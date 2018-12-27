<template>
    <div class="dashboard-container">
        <el-card class="card-head">
            <h2 class="title">搜索词（{{defaultdate}}）</h2>
            <!-- 工具栏 -->
            <SelectRegion v-on:handleTotalData = 'handleTotalData'/>
        </el-card>
        <!-- tab选择 -->
        <el-tabs class="keywordstab" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="按指标分类" name="first">
                <div class="tabtotal">
                    <el-row>
                        <el-col :span="4" class="target">
                            <h1>{{targettotal.timesOfBrowsing}}</h1>
                            <p>浏览次数</p>
                        </el-col>
                        <el-col :span="4" class="target">
                            <h1>{{targettotal.independentVisitors}}</h1>
                            <p>独立访客</p>
                        </el-col>
                        <el-col :span="4" class="target">
                            <h1>{{targettotal.IP}}</h1>
                            <p>IP数量</p>
                        </el-col>
                        <el-col :span="4" class="target">
                            <h1>{{targettotal.averageAccessDepth}}</h1>
                            <p>平均访问深度</p>
                        </el-col>
                        <el-col :span="4" class="target">
                            <h1>{{targettotal.averageAccessTime}}</h1>
                            <p>平均访问时长</p>
                        </el-col>
                        <el-col :span="4" class="target">
                            <h1>{{targettotal.bounceRate}}</h1>
                            <p>跳出率</p>
                        </el-col>
                    </el-row>
                </div>
                <!-- 表格数据列表 -->
                <el-card shadow="never" v-loading="loading" class="card-tableitem keywordstable">
                    <div class="tablestyle">
                        <el-table :data="targetlist" :row-class-name="setClassName">
                            <el-table-column prop="keyword" label="来源类型">
                                <template slot-scope="scope">
                                    <span style="float:left">{{scope.row.keyword}}</span>
                                    <el-popover trigger="hover" placement="right">
                                        <span @click="handleSourceLink(scope.row.$index, scope.row.sourceID)">查看历史趋势</span>
                                        <div slot="reference" class="name-wrapper">
                                            <i class="fa fa-file-text iconlink"></i>
                                        </div>
                                    </el-popover>
                                </template>
                            </el-table-column>
                            <el-table-column prop="timesOfBrowsing" label="浏览次数" ></el-table-column>
                            <el-table-column prop="independentVisitors" label="独立访客"></el-table-column>
                            <el-table-column prop="IP" label="IP"></el-table-column>
                            <el-table-column prop="averageAccessDepth" label="平均访问深度"></el-table-column>
                            <el-table-column prop="averageAccessTime" label="平均访问时长"></el-table-column>
                            <el-table-column prop="bounceRate" label="跳出率"></el-table-column>
                        </el-table>
                    </div>
                </el-card>
            </el-tab-pane>
            <el-tab-pane label="按搜索引擎分类" name="second">
                <div class="tabtotal">
                    <el-row>
                        <el-col :span="4" class="target">
                            <h1>{{setotal.all}}</h1>
                            <p>总浏览次数</p>
                        </el-col>
                        <el-col :span="4" class="target">
                            <h1>{{setotal.baidu}}</h1>
                            <p>百度</p>
                        </el-col>
                        <el-col :span="4" class="target">
                            <h1>{{setotal.google}}</h1>
                            <p>谷歌</p>
                        </el-col>
                    </el-row>
                </div>
                <!-- 表格数据列表 -->
                <el-card shadow="never" v-loading="loading" class="card-tableitem  keywordstable">
                    <div class="tablestyle">
                        <el-table :data="selist" :row-class-name="setClassName">
                            <el-table-column prop="keyword" label="来源类型"></el-table-column>
                            <el-table-column prop="all" label="浏览次数" ></el-table-column>
                            <el-table-column prop="baidu" label="百度"></el-table-column>
                            <el-table-column prop="google" label="谷歌"></el-table-column>
                        </el-table>
                        
                    </div>
                </el-card>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import {keywordstarget, keywordsse} from '@/api/base/source'
import SelectRegion from '@/components/SelectRegion'
export default {
    components: { SelectRegion },
    data() {
        return {
            loading: false,
            defaultdate: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
            activeName: 'first',
            tab1: '0',
            range: '1',
            side: '1',
            visitor: '2',
            date: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
            targettotal: [],
            targetlist: [],
            setotal: [],
            selist: [],
            pagination: {
                total: 0,
                pageSize: 10,
                pageSizes: [10, 20, 40],
                currentPage: 1
            }
        }
    },
    methods: {
         // 业务请求：按指标
        async doQueryKeywordsTarget(range, side, visitor, date) {
            this.loading = true
            this.keywordstarget = {}
            await keywordstarget({
                range, side, visitor, date
            }).then(res => {
                this.targettotal = res.data.totals
                this.targetlist = res.data.items

                this.targettotal.keyword = '全部总计'
                this.targetlist.splice(0, 0, this.targettotal)


            })
            this.loading = false
        },
        // 业务请求：按搜索引擎
        async doQueryKeywordsSe(range, side, visitor, date) {
            this.loading = true
            this.keywordstarget = {}
            await keywordsse({
                range, side, visitor, date
            }).then(res => {
                this.setotal = res.data.totals
                this.selist = res.data.items

                this.setotal.keyword = '全部总计'
                this.selist.splice(0, 0, this.setotal)
            })
            this.loading = false
        },
        // 初始指标数据
        async setupKeywordsTargetData() {
            await this.doQueryKeywordsTarget()
        },
        // 交互操作
        handleClick(tab, event) {
            this.doQueryKeywordsSe(this.range, this.side, this.visitor, this.date)
        },
        handleTotalData (currentrange, currentside, currentvisitor, currentdate) {
            this.range = currentrange
            this.side = currentside 
            this.visitor = currentvisitor
            this.date = currentdate
            this.doQueryKeywordsTarget(this.range, this.side, this.visitor, this.date)  
        },
        setClassName({row, index}) {
            // 通过自己的逻辑返回一个class或者空
            return row.expand ? 'expand' : 'hiddencell'
        },
        handleSourceLink(id, sourceID) {
            this.$router.push({
                path: '/source/sedetail',
                name: 'source-sedetail',
                params: { 
                    id: 'id',
                    dataObj: sourceID
                }
            })
        }
        
    },
    // 创建完毕状态
    created() {
        this.setupKeywordsTargetData()
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-container {
    // layout
    .iconlink {
        float: right;
        line-height: 1.6;
        cursor: pointer;
        color: #5784e7;
    }
    .tabtotal {
        // margin-top: 10px;
        padding: 3em 0;
        background: #fff;
        color: #333;
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
                color: #999;
            }
        }
    }
    .card-tableitem {
        margin-left: 20px;
        margin-right: 20px;
        margin-top: 20px;
        .el-card__body {
            padding: 0;
        }
    }
}
</style>
