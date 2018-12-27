<template>
    <div class="dashboard-container">
    <el-card class="card-head">
        <h2 class="title">受访域名（{{defaultdate}}）</h2>
        <!-- 工具栏 -->
        <SelectRegion v-on:handleTotalData = 'handleTotalData'/>
    </el-card>
    <!-- 总计栏 -->
    <TotalData :totalList = 'totaldata'/>

    <el-card shadow="never" v-loading="loading"  class="chart">
        <!-- 下拉框 -->
        <div class="selectradiogroup">
            <div class="selectBox_show">
                <input type="text"  @click="handleDropdown" name="unit" v-model="targetsName" placeholder="请选择">
                <span :class="iconstyle"></span>
            </div>
            <!-- <span class="arrowup"></span> -->
            <el-form ref="form"  :rules="rules" :model="form"  action="" v-show="isShowSelect" class="radioform" style="display: block;">
                <el-form-item prop="targets">
                    <el-radio-group  v-model="form.targets" >
                        <el-radio :label="1">浏览次数</el-radio>
                        <el-radio :label="2">访客次数</el-radio>
                        <el-radio :label="3">IP</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item class="submit-box">
                    <el-button type="primary" size="small" class="btn-submit" @click="submitForm('form')">确定</el-button>
                    <el-button  size="small" class="btn-cancel" @click="handleDropBox">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- <el-select v-model="defaultvalue" placeholder="选择指示" @change="handleSelect">
            <el-option
                v-for="item in targetitems"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                class="selectoption"
            >
            <el-radio :label='1'>{{ item.label }}</el-radio>
            </el-option>
        </el-select> -->
        <!-- 图表 -->
        <ChartGroup :chartList = 'chartdata'/>
    </el-card>
    <!-- 限制栏 -->
    <div class="card-item card-search">
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
                <el-radio-button label="0" disabled>受访域名</el-radio-button>
                <!-- <el-radio-button label="1" disabled>受访页面</el-radio-button> -->
            </el-radio-group>
        </div>
        <div class="card-body">
            <!-- 表格数据列表 -->
            <el-card shadow="never" v-loading="loading" class="card-item card-table">
                <div class="tablestyle visiteddomain">
                    <foldTable :tableList = 'domainsdata' :showColumes = 'showColumes'></foldTable>
                </div>
                <!-- <div class="tablestyle">
                    <el-table  :data="domainsdata" :row-class-name="setClassName">
                        <el-table-column type="expand">
                            <template slot-scope="props">
                                <el-table
                                    :data="props.row.items"
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
                        <el-table-column prop="source" label="来源类型">
                            <template slot-scope="scope">
                                <span>{{scope.row.source}}</span>
                                <i class="el-icon-document" @click="handleSourceLink(scope.$index, scope.row.sourceID)"></i>
                            </template>
                        </el-table-column>
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
                </div> -->
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
import ChartGroup from './../components/ChartGroup'

export default {
    components: { SelectRegion, TotalData, foldTable, ChartGroup, SelectMenu, CustomTagForm },
    name: 'source-se',
    data() {
        return {
            loading: false,
            defaultdate: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
            range: '1',
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
            pagetype: 0,
            targets: ['1', '4', '7', '8', '9', '10'],
            iconstyle: 'el-icon-arrow-right',
            unitName: '请选择',
            targetsName: '',
            isShowSelect: false,
            form: {
                targets: 1
            },
            rules: {
                targets: [
                    { required: true, message: '请至少选择一项', trigger: 'change' }
                ]
            },
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
            totalsdata: {}
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
        async doQueryTargetData(range, side, visitor, date, targets, sourceID, sourceType) {
            this.loading = true
            this.targetData = {}
            await targetdata({
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
                this.domainsdata = res.data.domains// 域名列表
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
        async setuptargetData() {
            await this.doQueryTargetData()
        },
        setClassName({row, index}) {
            // 通过自己的逻辑返回一个class或者空
            return row.expand ? 'expand' : 'hiddencell'
        },
        // 交互操作
        // 自定义下拉框
        handleDropdown() {
            this.isShowSelect = !this.isShowSelect
            if (this.isShowSelect === true) {
                this.iconstyle = 'el-icon-arrow-down'
            } else {
                this.iconstyle = 'el-icon-arrow-right'
            }
        },
        // 下拉框提交
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                 this.isShowSelect = !this.isShowSelect
                 switch (this.form.targets) {
                    case 1: this.targetsName = '浏览次数'
                    break
                    case 2: this.targetsName = '访客次数'
                    break
                    case 3: this.targetsName = 'IP'
                    break
                 }
                 this.targets = this.form.targets
                 this.doQueryChart(this.range, this.side, this.visitor, this.date, this.form.targets)
            } else {
                return false
            }
            })
         },
         // 下拉框取消
         handleDropBox() {
            this.isShowSelect = !this.isShowSelect
         },
        // 点击搜索
        handleSearch() {
            this.doQueryTargetData()
        },
        handleTotalData (currentrange, currentside, currentvisitor, currentdate) {
            this.range = currentrange
            this.side = currentside 
            this.visitor = currentvisitor
            this.date = currentdate
            this.form.targets = 1
            this.targetsName = '浏览次数'
            this.doQueryTotal(this.range, this.side, this.visitor, this.date)
            this.doQueryChart(this.range, this.side, this.visitor, this.date, this.target)
            this.doQueryTargetData(this.range, this.side, this.visitor, this.date, this.targets)
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
        if (this.form.targets === 1) {
            this.targetsName = '浏览次数'
        }
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
    .card-item {
        margin-left: 20px;
        margin-right: 20px;
        margin-top: 20px;
    }
    .card-search {
        .filter-item {
            background: #3a6cd0;
            color: #fff
        }
    }
    .selectradiogroup {
        .selectBox_show {
            margin-bottom: 15px;
            width: 235px;
            position: relative;
            span {
                position: absolute;
                right: 10px;
                top: 10px;
            }
        }
        input { 
            cursor: pointer;
            line-height: 2;
            padding-left: 15px;
            width: 235px;
            outline:none;
            border:1px solid #cecece;
            color: #012989;
            font-weight: bold;
        }
        .radioform {
            position: absolute;
            padding: 10px 15px;
            z-index: 999;
            // max-height: 240px;
            width: 235px;
            background: #fff;
            border: 1px solid #cecece;
            .el-form-item {
                margin-bottom: 5px;
            }
        }
        .arrowup {
            content: " ";
            width: 0;
            height: 0;
            display: block;
            border-top: 1px solid #555;
            border-left: 1px solid transparent;
        }
        .submit-box {
            margin-bottom: 0;
            text-align: center;
            .btn-submit {
                padding: 6px 12px;
                border-radius: 12px;
            }
            .btn-cancel {
                padding: 6px 12px;
                border-radius: 12px;
                background: #012989;
                color: #fff;
                border-color: #012989;
            }
        }
    }
}
</style>
