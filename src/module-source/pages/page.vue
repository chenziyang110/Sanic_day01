<template>
    <div class="dashboard-container">
    <el-card class="card-head">
        <h2 class="title">来源域名（{{defaultdate}}）</h2>
        <!-- 工具栏 -->
        <SelectRegion v-on:handleTotalData = 'handleTotalData'/>
    </el-card>
    <!-- 总计栏 -->
    <TotalData :totalList = 'totaldata'/>

    <!-- 限制栏 -->
    <div class="card-item card-search">
        <el-row :gutter="20">
            <el-col :span="10">
                <el-form ref="searchform" :model="formSearch">
                    <el-input  placeholder="请输入" v-model="formSearch.keyword" style="width: 300px;"></el-input>
                    <el-button type="warning" class="filter-item" size="medium"  @click="handleSearch">搜索</el-button>
                    <el-button type="warning" class="filter-item" size="medium">自定义指标</el-button>
                </el-form>
            </el-col>
            <el-col :span="9" :offset="5">
                <span class="sub-title">设备：</span>
                <el-radio-group v-model="sourcetype" class="sourcetype" @change="handleSourceType">
                    <el-radio-button label="0">全部</el-radio-button>
                    <el-radio-button label="1">搜索引擎</el-radio-button>
                    <el-radio-button label="2">网站导航</el-radio-button>
                    <el-radio-button label="3">外部链接</el-radio-button>
                </el-radio-group>
            </el-col>
        </el-row>
    </div>
    
    <!-- 自定义指标 -->
    <CustomTagForm v-on:handleTagForm = 'handleTagForm'/>
    
    <!-- 来源分类 -->
    <el-card shadow="never" v-loading="loading" class="card-item pagetype">
        <div slot="header" class="clearfix">
            <el-radio-group v-model="pagetype" class="pagefrom">
                    <!-- <router-link to="/source/domain"><el-radio-button label="0">来源域名</el-radio-button></router-link> -->
                    <router-link to="/source/page"><el-radio-button label="1">来源页面</el-radio-button></router-link>
                </el-radio-group>
        </div>
        <div class="card-body">
            <!-- 表格数据列表 -->
            <el-card shadow="never" v-loading="loading" class="card-item card-table">
                <div class="tablestyle sourcedomain">
                    <foldTable :tableList = 'pagedata' :showColumes = 'showColumes'></foldTable>
                </div>
            </el-card>
            <!-- table2 -->
           
        </div>
    </el-card>

  </div>
</template>
<script>
import {total, domaintargetdata, domainranklist} from '@/api/base/source'
import SelectRegion from '@/components/SelectRegion'
import foldTable from '@/components/foldTable'
import TotalData from '@/components/TotalData'
import SelectMenu from '@/components/SelectMenu'
import CustomTagForm from '@/components/CustomTagForm'

export default {
    components: { SelectRegion, TotalData, foldTable, SelectMenu, CustomTagForm },
    name: 'source-se',
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
            chartdata: {},
            targetData: {},
            sourcepageData: [],
            showColumes: [true, false, false, true, false, false, true, true, true, true],
            defaultvalue: '',
            sourcetype: 0,
            pagetype: 1,
            targets: ['1', '4', '7', '8', '9', '10'],
            formSearch: {
                keyword: ''
            },
            targetitems: [{
                value: '1',
                label: '浏览次数'
            }, {
                value: '2',
                label: '访客次数'
            }, {
                value: '3',
                label: 'IP'
            }],
            directaccessdata: {},
            pagedata: [],
            internalaccessdata: {},
            totalsdata: {},
            sourceID: this.$route.params.dataObj
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
        
        // 业务请求：表格数据
        async doQueryTargetData(range, keyword, side, visitor, date, targets, sourceID, sourceType) {
            this.loading = true
            this.targetData = {}
            await domaintargetdata({
                 range, 
                ...this.formSearch,
                side, 
                visitor, 
                date,
                targets, 
                sourceID, 
                sourceType
            }).then(res => {
                this.targetData = res.data
                this.directaccessdata = res.data.directAccess // 直接输入网址或书签
                this.pagedata = res.data.domains// 域名列表
                this.internalaccessdata = res.data.internalAccess// 站内来源
                this.totalsdata = res.data.totals // 全部总计
                // this.sourcepageData = 

                this.totalsdata.source = '全部总计'
                this.pagedata.splice(0, 0, this.totalsdata)

                this.directaccessdata.source = '直接输入网址或书签'
                this.pagedata.splice(1, 0, this.directaccessdata)

                this.internalaccessdata.source = '站内来源'
                this.pagedata.splice(2, 0, this.internalaccessdata)
            })
            this.loading = false
        },
        // 初始total数据
        async setuptotalData() {
            await this.doQueryTotal()
        },
         // 初始target数据
        async setuptargetData(range, keyword, side, visitor, date, targets, sourceID, sourceType) {
            await this.doQueryTargetData(this.range, this.formSearch.keyword, this.side, this.visitor, this.date, this.targets, this.sourceID, this.sourceType)
        },
        setClassName({row, index}) {
            // 通过自己的逻辑返回一个class或者空
            return row.expand ? 'expand' : 'hiddencell'
        },
        // 交互操作
        // 点击搜索
        handleSearch() {
            this.doQueryTargetData()
        },
        // 点击选择来源类型
        handleSourceType(sourceType) {
            this.sourcetype = sourceType
            this.doQueryTargetData(this.range, this.side, this.visitor, this.date, this.targets, this.sourceID, this.sourcetype)
        },
        handleTotalData (currentrange, currentside, currentvisitor, currentdate) {
            this.range = currentrange
            this.side = currentside 
            this.visitor = currentvisitor
            this.date = currentdate
            this.doQueryTotal(this.range, this.side, this.visitor, this.date)  
        },
        handleTagForm(currenttages) {
            this.targets = currenttages           
            this.doQueryTargetData(this.range, this.side, this.visitor, this.date, this.targets)
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
        },
        // 来源链接
        handleSourceLink(index, sourceID) {
            this.$router.push({
                path: '/selink:id',
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
        this.setuptargetData()
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-container {
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
}
</style>
