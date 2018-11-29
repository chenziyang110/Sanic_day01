<template>
    <div class="dashboard-container rank">
        <el-card class="card-head">
            <h2 class="title">来源升降榜</h2>
            <!-- 工具栏 -->
            <el-form :inline="true" >
                <el-form-item class="subtitle" label="时间：">
                    <span :class="{'yesterdaybtn': isA, 'active': isB}" @click="chooseYesterday">昨天</span>
                    <el-date-picker
                        v-model="date1"
                        @change="handleRank"
                        type="date"
                        format= "yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期">
                    </el-date-picker>                           
                    <el-checkbox v-model="checked">对比</el-checkbox>
                    <el-date-picker
                        v-model="date2"
                        @change="handleRank"
                        type="date"
                        format= "yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期">
                    </el-date-picker>
               </el-form-item>
                <el-form-item class="subtitle" label="指标：">
                    <el-radio-group v-model="targetID" @change="handleRank">
                        <el-radio  label="1">来访次数</el-radio>
                        <el-radio  label="2">独立访客数</el-radio>
                        <el-radio  label="3">新访客数</el-radio>
                        <el-radio  label="4">IP</el-radio>
                    </el-radio-group>
                </el-form-item>

            </el-form>
        </el-card>
        <div class="total">
            <el-row  >
                <el-col :span="5" class="target" >
                    <h2 class="targetname">{{rankListtotal.targerName}}</h2>
                </el-col>
                <el-col :span="6" class="target">
                    <h2>{{rankListtotal.date1}}</h2>
                    <p>{{date1}}</p>
                </el-col>
                <el-col :span="6" class="target">
                    <h2>{{rankListtotal.date2}}</h2>
                    <p>{{date2}}</p>
                </el-col>
                <el-col :span="7" class="target">
                    <h2>{{rankListtotal.change}}</h2>
                    <p>变化情况</p>
                </el-col>
            </el-row>
        </div>
        <!-- 数据列表 -->
        <el-card shadow="never" v-loading="loading" class="card-item">
            <div class="tablestyle">
                <el-table :data="rankListItems" >
                    <el-table-column prop="source" label="地址"></el-table-column>
                    <el-table-column prop="date1" :render-header="renderHeaderDate1">
                         <!-- <template slot-scope="scope">
                            <span>{{scope.row.source}}</span>
                            <i class="el-icon-document" @click="handleSourceLink(scope.$index, scope.row.sourceID)"></i>
                        </template> -->
                    </el-table-column>
                    <el-table-column prop="date2" :render-header="renderHeaderDate2"></el-table-column>
                    <el-table-column prop="change" :render-header="renderHeaderChange"></el-table-column>
                </el-table>
            </div>
        </el-card>
    </div>
</template>
<script>
import { domainranklist } from '@/api/base/source'
export default {
    data() {
        return {
            date1: '',
            date2: '',
            targetID: '1',
            order: '',
            rankListData: {},
            rankListtotal: {},
            rankListItems: [],
            checked: true,
            isA: true,
            isB: false,
            loading: false,
            label: '日期'
        }
    },
    methods: {
        // 业务请求
        async doQueryRankList(date1, date2, targetID, order) {
            this.loading = true
            this.rankListData = {}
            await domainranklist({
                date1, date2, targetID, order
            }).then(res => {
                this.rankListtotal = res.data.totals
                this.rankListItems = res.data.items
            })
            this.loading = false
        },
        // 初始
        async setupRankListData() {
            await this.doQueryRankList()
        },
        // 交互
        handleRank(date1, date2, targetID, order) {
            this.doQueryRankList(this.date1, this.date2, this.targetID, this.order)
        },
        // 昨天
        defaultday() {
            let day1 = new Date()
            day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000)
            let s1 = day1.getFullYear() + '-' + (day1.getMonth() + 1) + '-' + day1.getDate()
            this.date1 = s1

            let day2 = new Date()
            day2.setTime(day2.getTime() - 48 * 60 * 60 * 1000)
            let s2 = day2.getFullYear() + '-' + (day2.getMonth() + 1) + '-' + day2.getDate()
            this.date2 = s2
        },
        chooseYesterday() {
            this.isB = !this.isB
            if (this.isB === true) {
                this.date1 = ''
            } else {
                this.yesterday()
            }
        },
        
        renderHeaderDate1 (h, {column}) { // h即为cerateElement的简写，具体可看vue官方文档
            return h('span', this.date1)
        },
        renderHeaderDate2 (h, {column}) { // h即为cerateElement的简写，具体可看vue官方文档
            return h('span', this.date2)
        },
       
        renderHeaderChange(h, {column}) {
            return h('div', [
               h('span', {
                    class: 'order',
                    on: {
                        click: this.handleOrderAdd
                    }
                }, '+升'),
                h('span', {
                    class: 'order',
                    on: {
                        click: this.handleOrderLow
                    }
                }, '-降'),
                h('span', {
                    class: 'order',
                    on: {
                        click: this.handleOrderNochange
                    }
                }, '平'),
                h('span', {
                    class: 'allbtn',
                    on: {
                        click: this.handleOrderAll
                    }
                }, '全部')
            ])
        },
        // handleRank(date1, date2, targetID, order) {
        //     this.doQueryRankList(this.date1, this.date2, this.targetID, this.order)
        // },
        handleOrderAdd(date1, date2, targetID, order) {
            this.order = 1
            this.doQueryRankList(this.date1, this.date2, this.targetID, this.order)
        },
        handleOrderLow(date1, date2, targetID, order) {
            this.order = 2
            this.doQueryRankList(this.date1, this.date2, this.targetID, this.order)
        },
        handleOrderNochange() {
            this.order = 3
            this.doQueryRankList(this.date1, this.date2, this.targetID, this.order)
        },
        handleOrderAll(date1, date2, targetID, order) {
            this.order = ''
            this.doQueryRankList(this.date1, this.date2, this.targetID, this.order)
        }
    },
    mounted() {},
    created() {
        this.defaultday()
        this.setupRankListData()
    }
}
</script>
<style  rel="stylesheet/scss"  lang="scss" scoped>
.rank {
    .title {
        font-size: 20px;
        color: #012989;
        font-weight: normal;
    }
    .yesterdaybtn {
        padding: 9px 20px;
        line-height: 32px;
        color: #f75426;
        background: #fff;
        border: 1px solid #cecece;
        cursor: pointer;
        &.active {
            background: transparent;
            color: #555;
        }
    }
    .card-item {
        margin-left: 20px;
        margin-right: 20px;
        margin-top: 20px;
    }
    .total {
        margin-top: 15px;
        padding: 2em 0;
        background: #012989;
        color: #fff;
        
        .target {
            margin-left: -15px;
            text-align: center;
            .targetname {
                font-size: 1.6em;
                line-height: 2;
            }
            h2 {
                font-size: 2em;
                line-height: 1;
                margin-top: 0.2em;
                margin-bottom: 0.2em;
                font-weight: normal;
            }
            p {
                font-size: 1.6em;
                color: #7b9de8;
            }
        }
    }
}

</style>

