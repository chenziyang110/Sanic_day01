<template>
    <div class="dashboard-container">
    <el-card class="card-head">
        <h2 class="title">来源域名（{{defaultdate}}）</h2>
        <!-- 工具栏 -->
        <SelectRegion v-on:handleTotalData = 'handleTotalData'/>
    </el-card>
    <!-- 总计栏 -->
    <TotalData :totalList = 'totaldata'/>

    <el-card shadow="never" v-loading="loading"  class="chart">
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
        <!-- 下拉框 -->
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
                <el-radio-button label="0">来路域名</el-radio-button>
                <!-- <router-link to="/source/page"><el-radio-button label="1">来路页面</el-radio-button></router-link> -->
            </el-radio-group>
        </div>
        <div class="card-body">
            <!-- 表格数据列表 -->
            <el-card shadow="never" v-loading="loading" class="card-item card-table">
                <div class="tablestyle sourcedomain">
                    <foldTable :tableList = 'tabledata' :showColumes = 'showColumes'></foldTable>
                </div>
            </el-card>
            <!-- table2 -->
           
        </div>
    </el-card>

  </div>
</template>
<script>
import {total, domainchart, domaintargetdata, domainranklist} from '@/api/base/source'
import SelectRegion from '@/components/SelectRegion'
import TotalData from '@/components/TotalData'
import foldTable from '@/components/foldTable'
import SelectMenu from '@/components/SelectMenu'
import CustomTagForm from '@/components/CustomTagForm'
import ChartGroup from './../components/ChartGroup'

export default {
    components: { SelectRegion, TotalData, ChartGroup, foldTable, SelectMenu, CustomTagForm },
    name: 'source-se',
    data() {
        return {
            loading: false,
            defaultdate: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
            range: '1',
            side: '',
            visitor: '',
            date: '',
            target: '1',
            totaldata: {},
            chartdata: {},
            targetData: {},
            tabledata: [],
            showColumes: [true, false, false, true, false, false, true, true, true, true],
            showRowNum: 6,
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

            defaultvalue: '浏览次数',
            sourcetype: 0,
            pagetype: 0,
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
            await domainchart({
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

                this.totalsdata = res.data.totals // 全部总计
                this.directaccessdata = res.data.directAccess // 直接输入网址或书签
                this.tabledata = res.data.domains// 域名列表
                this.internalaccessdata = res.data.internalAccess// 站内来源
                
                this.totalsdata.source = '全部总计'
                this.tabledata.splice(0, 0, this.totalsdata)
                this.directaccessdata.source = '直接输入网址或书签'
                this.tabledata.splice(1, 0, this.directaccessdata)
                this.internalaccessdata.source = '站内来源'
                this.tabledata.splice(2, 0, this.internalaccessdata)
            })
            this.loading = false
        },
        // 初始total数据
        async setuptotalData() {
            await this.doQueryTotal()
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
            this.form.targets = 1
            this.targetsName = '浏览次数'
            this.doQueryTotal(this.range, this.side, this.visitor, this.date)
            this.doQueryChart(this.range, this.side, this.visitor, this.date, this.target)
            this.doQueryTargetData(this.range, this.side, this.visitor, this.date, this.targets)
        },
        // 提交指标
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
        // handleSelect(currenttarget) {
        //     this.target = currenttarget
        //     this.doQueryChart(this.range, this.side, this.visitor, this.date, this.target)
        // }
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
        border-radius: 0;
    }
    .card-search {
        .filter-item {
            background: #3a6cd0;
            color: #fff
        }
        .sub-title {
            font-size: 14px;
            line-height: 20px;
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
