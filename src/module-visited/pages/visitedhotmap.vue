<template>
    <div class="dashboard-container">
        <div class="top-total">
            <el-row>
                <el-col :span="7"><span class="number">{{hopmapdata.total}}</span>页面点击数</el-col>
                <el-col :span="7"><span class="number">{{hopmapdata.timesOfBrowsing}}</span>浏览量</el-col>
                <el-col :span="7"><span class="number">{{hopmapdata.independentVisitors}}</span>访客数</el-col>
            </el-row>
        </div>
        <div class="search">
            <el-form :inline="true" >
                <el-form-item class="formitem subtitle" label="时间：">
                    <div class="radios">
                        <el-radio-group  v-model="range" @change="handleData">
                            <el-radio-button label="0">今天</el-radio-button>
                            <el-radio-button label="1">昨天</el-radio-button>
                            <el-radio-button label="7">最近7日</el-radio-button>
                            <el-radio-button label="30">最近30日</el-radio-button>
                        </el-radio-group>
                    </div>
                </el-form-item>
                <el-form-item  class="formitem subtitle" label="日期：">
                    <el-date-picker
                        v-model="date"
                        @change="handleData"
                        type="date"
                        format= "yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
            </el-form>
        </div>
        <div class="hotmap">
            <div id="heatmap" class="col-md-8" style="width: 1130px;">
                <img id="baidu-img" src="./../assets/testhotmap.png">
                <div id="main" style="width: 1130px; height: 671px;"></div>
            </div>
        </div>
    </div>
    
</template>
<script>
import {visitedhotmap} from '@/api/base/visited'
import echarts from 'echarts'
import resize from './../../components/Charts/mixins/resize'

export default {
    name: 'visited-hotmap',
    data() {
        return {
            hotmapID: '',
            range: '0',
            date: '',
            hopmapdata: {},
            heatdata: [],
            chart: null
        }
    },
    created() {
        this.hotmapID = this.$route.params.id
        this.setupHotMapData()
        console.log(this.hotmapID)
    },
    methods: {
        // 业务请求
        async doQueryHotMap(id = this.hotmapID, range, date) {
            this.loading = true
            await visitedhotmap({
                id, range, date
            }).then(res => {
                this.hopmapdata = res.data
                this.heatdata = res.data.data

                let newheatData = []
                for (let i = 0; i < this.heatdata.length; i++) {
                    newheatData[i] = [this.heatdata[i].x, this.heatdata[i].y, this.heatdata[i].value]
                }
                let xData = []
                for (let j = 0; j < this.heatdata.length; j++) {
                    xData.push(this.heatdata[j].x)
                }
                let yData = []
                for (let j = 0; j < this.heatdata.length; j++) {
                    yData.push(this.heatdata[j].y)
                }
                console.log(yData)


                this.chart = echarts.init(document.getElementById('main'))
                this.chart.setOption({
                    tooltip: {},
                    xAxis: {
                        type: 'category',
                        data: xData
                    },
                    yAxis: {
                        type: 'category',
                        data: yData
                    },
                    visualMap: {
                        min: 0,
                        max: 1,
                        calculable: true,
                        realtime: false,
                        inRange: {
                            color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
                        }
                    },
                    series: [{
                        name: 'Gaussian',
                        type: 'heatmap',
                        data: newheatData,
                        itemStyle: {
                            emphasis: {
                                borderColor: '#333',
                                borderWidth: 1
                            }
                        },
                        progressive: 1000,
                        animation: false
                    }]
                })
            })
            this.loading = false
        },
        // 初始数据
        async setupHotMapData() {
            await this.doQueryHotMap()
        },
        handleData() {

        }
    },
    mounted() {}

}
</script>
<style lang="scss" scoped>
.top-total {
  padding: 6px;
  font-size: 16px;
  line-height: 2.5;
  background: #04166c;
  color: #5d8aec;
  .number {
    padding-right: 5px;
    font-size: 26px;
    color: #fff;
  }
}
.search {
  padding: 6px;
  background: #ebeff5;
  box-shadow: 2px 2px 5px #e4e2e2;
  .formitem {
    padding: 10px 0;
    margin-bottom: 0;
  }
}
#heatmap {
    position: relative;
    img {
        position: absolute;
    }
}
</style>

