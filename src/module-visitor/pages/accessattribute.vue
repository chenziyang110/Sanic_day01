<template>
     <div class="dashboard-container">
        <!-- 工具栏 -->
        <el-card class="card-head">
            <h2 class="title">访客属性（{{defaultdate}}）</h2>
            <div class="choose">
                <el-form :inline="true" >
                    <el-form-item class="subtitle" label="时间：">
                    <div class="radios">
                            <el-radio-group  v-model="currentrange" @change="handleData">
                                <el-radio-button label="0">最近1个月</el-radio-button>
                                <el-radio-button label="1">最近2个月</el-radio-button>
                                <el-radio-button label="7">最近3个月</el-radio-button>
                                <el-radio-button label="30">最近半年</el-radio-button>
                            </el-radio-group>
                        </div>
                    </el-form-item>
                    <el-form-item  class="subtitle" label="日期：">
                        <el-date-picker
                            v-model="currentdate"
                            @change="handleData"
                            type="date"
                            format= "yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item  class="subtitle" label="访客：">
                        <div class="radios">
                            <el-radio-group  v-model="currentvisitor"  @change="handleData">                             
                                <el-radio-button label="0" >全部</el-radio-button>
                                <el-radio-button label="1" >新访客</el-radio-button>
                                <el-radio-button label="2">老访客</el-radio-button>
                            </el-radio-group>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
        <!-- 展示栏 -->
        <el-card class="showcard">
            <el-row :gutter="20">
                <el-col :span="8">
                    <h3>性别比例</h3>
                    <div class="card-chart sexpercent" style="min-height: 400px; width: 99%">
                        
                        <ul class="left-man">
                            <li v-for="(item,index) in blueman" :key="index" :class="item">
                                <i class="fa fa-child" aria-hidden="true"></i>
                            </li>
                        </ul>
                        <ul class="right-woman">
                            <li v-for="(item,index) in redwoman" :key="index" :class="item">
                                <i class="fa fa-child" aria-hidden="true"></i>
                            </li>
                        </ul>
                        <p class="percent"><span class="man">{{manpercent}}</span><span class="woman">{{womanpercent}}</span></p>
                        
                    </div>
                    <!-- <div  id="sexchart" style="min-height: 400px; width: 99%"></div> -->
                </el-col>
                <el-col :span="8">
                    <h3>学历比例</h3>
                    <div class="card-chart">
                        <div  id="educationchart" style="min-height: 400px; width: 99%"></div>
                    </div>
                    
                </el-col>
                <el-col :span="8">
                    <h3>年龄比例</h3>
                     <div class="card-chart">
                    <div  id="agechart" style="min-height: 400px; width: 99%"></div>
                     </div>
                </el-col>
            </el-row>
            <el-row :gutter="18">
                <el-col :span="12">
                    <h3>职业比例</h3>
                     <div class="card-chart">
                    <div  id="jobchart" style="min-height: 400px; width: 99%"></div>
                     </div>
                </el-col>
                <el-col :span="12" >
                    <h3>爱好兴趣</h3>
                     <div class="card-chart">
                    <div  id="aihaochart" style="min-height: 400px; width: 99%"></div>
                     </div>
                </el-col>
            </el-row>
        </el-card>
         
     </div>
</template>
<script>

import {properties} from '@/api/base/visitor'
import echarts from 'echarts'
import resize from './../../components/Charts/mixins/resize'

export default {
    data() {
        return {
            loading: false,
            defaultdate: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
            currentrange: '0',
            currentdate: '',
            currentvisitor: '0',
            ageData: {},
            educationData: {},
            genderData: {},
            interestData: {},
            jobData: {},
            manpercent: '',
            womanpercent: '',
            chart: null,
            ageachart: null,
            sexchart: null,
            jobchart: null,
            aihaochart: null,
            blueman: [],
            redwoman: []
        }
    },
    watch: {
        
    },
    methods: {
        // 业务请求
         async doQueryProperties(range, visitor, date) {
            this.loading = true
            await properties({
                range, visitor, date
            }).then(res => {
                this.ageData = res.data.age
                this.educationData = res.data.education
                this.genderData = res.data.gender
                this.interestData = res.data.interest.items
                this.jobData = res.data.job.items

                let mannumber = Math.round(res.data.gender.man / res.data.gender.total * 10000) / 100.00
                let manicons = Math.round(Math.round(mannumber) / 10)

                if (manicons > 10) {
                    manicons = 10
                }
                
                // 男性图表数量
               let blueman = new Array(manicons)
               for (let i = 0; i < blueman.length; i++) {
                   blueman[i] = 'man'
               }
               this.blueman = blueman

               // 女性图表数量
               let redwoman = new Array(10 - manicons)
               for (let j = 0; j < redwoman.length; j++) {
                   redwoman[j] = 'woman'
               }
               this.redwoman = redwoman


                this.manpercent = Math.round(res.data.gender.man / res.data.gender.total * 10000) / 100.00 + '%'
                this.womanpercent = Math.round(res.data.gender.woman / res.data.gender.total * 10000) / 100.00 + '%'

                let legenddata = []
                let newedudata = []
                for (let item of this.educationData.items) {
                    legenddata.push(item.title)
                    let obj = {}
                    obj.value = item.data
                    obj.name = item.title
                    newedudata.push(obj)
                }

                // age-Chart
                let xData = []
                for (let item of this.ageData.items) {
                    xData.push(item.title)
                }
                let seriesData = []
                for (let item of this.ageData.items) {
                    seriesData.push(item.data)
                }
                this.agechart = echarts.init(document.getElementById('agechart'))
                this.agechart.setOption({
                    xAxis: {
                        type: 'category',
                        data: xData
                    },
                    grid: {
                        left: '15%'
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: seriesData,
                        type: 'bar'
                    }]
                })

                // job-Chart
                let jobmax = 0
                for (var n = 0; n < this.jobData.length; n++) {
                    if (this.jobData[n].data > jobmax) {
                        jobmax = this.jobData[n].data
                    }
                }
                let jobData = [[]]
                
                for (let m = 0; m < this.jobData.length; m++) {
                    jobData[0][m] = []
                    jobData[0][m][0] = Math.ceil(Math.random() * jobmax)
                    jobData[0][m][1] = m + 1
                    jobData[0][m][2] = this.jobData[m].data
                    jobData[0][m][3] = this.jobData[m].title
                }
                this.jobchart = echarts.init(document.getElementById('jobchart'))
                this.jobchart.setOption({
                    xAxis: {
                        show: false
                    },
                    yAxis: {
                        show: false,
                        scale: true
                    },
                    series: [{
                        name: '2015',
                        data: jobData[0],
                        type: 'scatter',
                        symbolSize: function (jobData) {
                            return Math.sqrt(jobData[2]) / 1e2
                        },
                        label: {
                            normal: {
                                // formatter: '{b}',
                                position: 'right',
                                show: true,
                                formatter: function (param) {
                                    return param.data[3]
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                shadowBlur: 10,
                                shadowColor: 'rgba(25, 100, 150, 0.5)',
                                shadowOffsetY: 5,
                                color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                                    offset: 0,
                                    color: 'rgb(239, 227, 138)'
                                }, {
                                    offset: 1,
                                    color: 'rgb(15, 183, 207)'
                                }])
                            }
                        }
                    }]
                })




                // intrest-Chart
                let max = 0
                for (var i = 0; i < this.interestData.length; i++) {
                    if (this.interestData[i].data > max) {
                        max = this.interestData[i].data
                    }
                }
                let intrestdata = [[]]
                
                for (let i = 0; i < this.interestData.length; i++) {
                    intrestdata[0][i] = []
                    intrestdata[0][i][0] = Math.ceil(Math.random() * max)
                    intrestdata[0][i][1] = i + 1
                    intrestdata[0][i][2] = this.interestData[i].data
                    intrestdata[0][i][3] = this.interestData[i].title
                }

                this.aihaochart = echarts.init(document.getElementById('aihaochart'))
                this.aihaochart.setOption({
                    xAxis: {
                        show: false
                    },
                    yAxis: {
                        show: false,
                        scale: true
                    },
                    series: [{
                        name: '2015',
                        data: intrestdata[0],
                        type: 'scatter',
                        symbolSize: function (intrestdata) {
                            return Math.sqrt(intrestdata[2]) / 1e2
                        },
                        label: {
                            normal: {
                                // formatter: '{b}',
                                position: 'right',
                                show: true,
                                formatter: function (param) {
                                    return param.data[3]
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                shadowBlur: 10,
                                shadowColor: 'rgba(25, 100, 150, 0.5)',
                                shadowOffsetY: 5,
                                color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                                    offset: 0,
                                    color: 'rgb(129, 227, 238)'
                                }, {
                                    offset: 1,
                                    color: 'rgb(25, 183, 207)'
                                }])
                            }
                        }
                    }]
                })

                // sex-chart
                this.sexchart = echarts.init(document.getElementById('educationchart'))
                this.sexchart.setOption({
                    
                })

                // edu-Chart
                this.chart = echarts.init(document.getElementById('educationchart'))
                this.chart.setOption({
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b}: {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data: legenddata
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: newedudata
                        }
                    ]
                })
            })
            this.loading = false
        },
        // 初始数据
        async setuppropertiesData() {
            await this.doQueryProperties()
        },
        handleData(range, visitor, date) {
            range = this.currentrange
            visitor = this.currentvisitor
            date = this.currentdate
            this.doQueryProperties(range, visitor, date)
        }
    },
    created() {
        this.setuppropertiesData()
        
    },
    mounted() {
        // this.ageChart()
       // this.educationChart()
    }
}
</script>
<style lang="scss" scoped>
.dashboard-container {
    // layout
    .title {
        font-size: 20px;
        color: #012989;
        font-weight: normal;
    }
    .left-man {
        float: left;
    }
    .right-woman {
        float: left;
    }
    .showcard {
        margin-top: 20px;
        margin-left: 20px;
        margin-right: 20px;
    }
    .card-chart {
        padding-left: 9px;
        background: #fbfbfb;
        border: 1px solid #ebeff5;
        border-radius: 5px;
        &.sexpercent {padding-top: 3em;}
        
        .percent {
            padding: 20px;
            font-size: 3em;
            font-weight: bold;
            clear: both;
            .man { color: #38d2ff; }
            .woman { float: right; color: #f4663f }
        }
    
        li {
            display: inline;
            width: 10%;
            text-align: center;
            &.man {
                i { color: #38d2ff;}
            }
            &.woman {
                i { color: #f4663f;}
            }
            .fa-child {
                font-size: 5em;
            }
        }
    }
}
</style>


