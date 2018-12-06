<template>
    <div class="dashboard-container">
    <el-card class="card-head">
        <h2 class="title">受访页面（{{defaultdate}}）</h2>
        <!-- 工具栏 -->
        <SelectRegion v-on:handleTotalData = 'handleTotalData'/>
    </el-card>
    <!-- 总计栏 -->
    <TotalData :totalList = 'totaldata'/>

    <!-- <el-card shadow="never" v-loading="loading"  class="chart">
        <el-select v-model="defaultvalue" placeholder="选择指示" @change="handleSelect">
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
    </el-card> -->
    <!-- 限制栏 -->
    <div class="card-item">
        <el-row :gutter="20">
            <el-col :span="10">
                <el-form ref="searchform" :model="formSearch">
                    <el-input  placeholder="请输入" v-model="formSearch.keyword" style="width: 300px;"></el-input>
                    <el-button type="default" class="filter-item" size="medium"  @click="handleSearch">搜索</el-button>
                </el-form>
            </el-col>
        </el-row>
    </div>
    
    <!-- 自定义指标 -->
    <CustomTagForm v-on:handleTagForm = 'handleTagForm'/>
    
    <!-- 来源分类 -->
    <el-card shadow="never" v-loading="loading" class="card-item pagetype">
        <div slot="header" class="clearfix">
            <el-radio-group v-model="pagetype" class="pagefrom">
                <!-- <el-radio-button label="0">来路域名</el-radio-button> -->
                <el-radio-button label="1">受访页面</el-radio-button>
            </el-radio-group>
        </div>
        <div class="card-body">
            <!-- 表格数据列表 -->
            <el-card shadow="never" v-loading="loading" class="card-item card-table">
                <div class="tablestyle visiteddomain">
                    <foldTable :tableList = 'domainsdata' :showColumes = 'showColumes'></foldTable>
                </div>
            </el-card>           
        </div>
    </el-card>


    

  </div>
</template>
<script>
import {total, chart, targetdata} from '@/api/base/visited'
import SelectRegion from '@/components/SelectRegion'
import TotalData from '@/components/TotalData'
import foldTable from '@/components/foldTable'
import SelectMenu from '@/components/SelectMenu'
import CustomTagForm from '@/components/CustomTagForm'

export default {
    components: { SelectRegion, TotalData, foldTable, SelectMenu, CustomTagForm },
    name: 'source-se',
    data() {
        return {
            loading: false,
            defaultdate: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
            range: '0',
            side: '0',
            visitor: '0',
            date: '',
            target: '1',
            totaldata: {},
            chartdata: {},
            targetData: {},
            showColumes: [true, false, false, true, false, false, true, true, true, true],
            defaultvalue: '浏览次数',
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
            domainsdata: [],
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
        async doQueryTargetData(range, side, visitor, date, targets, sourceID) {
            this.loading = true
            this.targetData = {}
            await targetdata({
                 range, 
                ...this.formSearch,
                side, 
                visitor, 
                date,
                targets, 
                sourceID
            }).then(res => {
                this.targetData = res.data
                this.directaccessdata = res.data.directAccess // 直接输入网址或书签
                this.domainsdata = res.data.domains// 域名列表
                this.internalaccessdata = res.data.internalAccess// 站内来源
                this.totalsdata = res.data.totals // 全部总计

                this.totalsdata.source = '全部总计'
                this.domainsdata.splice(0, 0, this.totalsdata)

               

            })
            this.loading = false
        },
        // 初始total数据
        async setuptotalData(range, side, visitor, date, sourceID) {
            await this.doQueryTotal(this.range, this.side, this.visitor, this.date, this.sourceID)
        },
        // 初始chart数据
        async setupchartData(range, side, visitor, date, target = 1) {
            await this.doQueryChart(this.range, this.side, this.visitor, this.date, this.target)
        },
         // 初始target数据
        async setuptargetData(range, keyword, side, visitor, date, targets, sourceID) {
            await this.doQueryTargetData(this.range, this.formSearch.keyword, this.side, this.visitor, this.date, this.targets, this.sourceID)
        },
        setClassName({row, index}) {
            return row.expand ? 'expand' : 'hiddencell'
        },
        // 交互操作
        // 点击搜索
        handleSearch() {
            this.doQueryTargetData()
        },
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
        this.setupchartData()
        this.setuptargetData()
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
    .sub-title {
        font-size: 18px;
        line-height: 20px;
    }
    .pageytype .card-body .card-item {
        margin-left: 0;
        margin-right: 0;
    }
    .filter-item {
        background: #f75426;
        color: #fff
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
