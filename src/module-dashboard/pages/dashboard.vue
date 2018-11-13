<template>
  <div class="dashboard-container">
    <!-- 昨日浏览量 -->
    <el-card shadow="never" v-loading="loading">
      <div slot="header" class="clearfix">
         <span>昨日流量</span>
      </div>
      <div class="text home">
        <!-- 数据表格 -->
        <el-table :data="items">
          <el-table-column prop="title" label=" "></el-table-column>
          <el-table-column prop="timesOfBrowsing" label="浏览次数"></el-table-column>
          <el-table-column prop="independentVisitors" label="独立访客"></el-table-column>
          <el-table-column prop="IP" label="IP"></el-table-column>
          <el-table-column prop="averageVisitorDepth" label="平均访客深度"></el-table-column>
          <el-table-column prop="averageVisitorDuration" label="平均访客时长"></el-table-column>
          <el-table-column prop="bounceRate" label="跳出率"></el-table-column>
        </el-table>
      </div>
     </el-card>
     <!-- tab选择 -->
     <div class="tab-choose">
        <el-radio-group v-model="tab1" @change="handleTab">
          <el-radio-button label="0" >今天</el-radio-button>
          <el-radio-button label="1">昨天</el-radio-button>
          <el-radio-button label="7">最近7日</el-radio-button>
          <el-radio-button label="30">最近30日</el-radio-button>
        </el-radio-group>
      </div>
     <!-- 趋势图 -->
     <el-card shadow="never" v-loading="loading"  class="trend">
       <div slot="header" class="clearfix">
          <span>趋势图</span>
          <el-button style="float: right; padding: 3px 0" type="text"><i class="fa fa-ellipsis-h" aria-hidden="true"></i></el-button>
        </div>
        <!-- 趋势图表 -->
        <div>
           <el-select v-model="defaultvalue" placeholder="选择指示" @change="handleOption">
              <el-option
                v-for="item in targets"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                >
                <el-radio :label="1">{{ item.label }}</el-radio>
              </el-option>
            </el-select>

             <div id="trend" style="width: 100%;min-height:400px;"></div>

        </div>
     </el-card>
     <!-- TOP榜 -->
     <el-row :gutter="12">
      <el-col :span="8">
        <el-card shadow="always" class="card">
          <div slot="header" class="clearfix">
            <span>新老访客</span>
            <el-button style="float: right; padding: 3px 0" type="text"><i class="fa fa-ellipsis-h" aria-hidden="true"></i></el-button>
          </div>
          <div class="tablestyle">
            <!-- 访客表格 -->
            <el-table :data="visitors" >
              <el-table-column prop="target" label="指标名称"></el-table-column>
              <el-table-column prop="newVisitor" label="新访客"></el-table-column>
              <el-table-column prop="oldVisitors" label="老访客"></el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="always"  class="card">
          <div slot="header" class="clearfix">
            <span>TOP10搜索词</span>
            <el-button style="float: right; padding: 3px 0" type="text"><i class="fa fa-ellipsis-h" aria-hidden="true"></i></el-button>
          </div>
          <div class="tablestyle">
            <!-- 搜索词表格 -->
            <el-table :data="searchterm">
              <el-table-column prop="searchTerm" label="搜索词"></el-table-column>
              <el-table-column prop="browsingVolume" label="浏览量"></el-table-column>
              <el-table-column prop="occupationRatio" label="占比"></el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="always"  class="card">
          <div slot="header" class="clearfix">
            <span>TOP10受访界面</span>
            <el-button style="float: right; padding: 3px 0" type="text"><i class="fa fa-ellipsis-h" aria-hidden="true"></i></el-button>
          </div>
          <div class="tablestyle">
            <!-- 受访表格 -->
            <el-table :data="interviewing">
              <el-table-column prop="interviewingInterface" label="受访界面"></el-table-column>
              <el-table-column prop="browsingVolume" label="浏览量"></el-table-column>
              <el-table-column prop="occupationRatio" label="占比"></el-table-column>
            </el-table>
          </div>
         
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import {list, type, trend} from '@/api/base/home'
export default {
  name: 'dashboard',
  components: {},
  data() {
    return {
      loading: false,
      tab1: 0,
      items: [], // 昨日流量
      typesdata: [],
      visitors: [], // 新老访客
      searchterm: [], // 搜索词
      interviewing: [], // 受访界面
      targets: [{
        value: '1',
        label: '浏览次数'
      }, {
        value: '2',
        label: '访客次数'
      }, {
        value: '3',
        label: 'IP'
      }, {
        value: '4',
        label: '新独立访客数'
      }, {
        value: '5',
        label: '平均访客深度'
      }, {
        value: '6',
        label: '平均访客时长'
      }, {
        value: '7',
        label: '跳出率'
      }],
      defaultvalue: '浏览次数',
      trenddata: {},
      currentrange: 0 
    }
  },
  computed: {},
  methods: {
    // 读取昨日流量数据
    async reloadData() {
      await list({}).then(res => {
        this.items = res.data.items
      })
    },
    // tab分类数据请求
    async doQuery(range = 0, target = 1) {
      this.currentrange = range
   
      this.loading = true
      this.typesdata = []
      await type({
        range, target
      }).then(res => {
        this.typedata = res.data
        this.visitors = this.typedata.oldVisitors
        this.interviewing = this.typedata.topInterviewingInterface
        this.searchterm = this.typedata.topSearchTerm
      })
      this.defaultvalue = '浏览次数'
      this.redoQuery()
      this.loading = false
    },
    // 初始tab分类数据
    async setuptabData() {
      await this.doQuery()
    },
    // tab选择
    handleTab(range, target) {
      this.doQuery(range, target)
    },
    // option分类数据请求
    async redoQuery(target = 1, range = 0) {
      range = this.currentrange
      await trend({
        target,
        range
      }).then(res => {
        this.trenddata = res.data
        
        // x轴数据整理
        let xdata = []
        let getxdata = this.trenddata.xAxis
        for (let xitem of getxdata) {
          xdata.push(xitem.data)
        }

        // series数据整理
        let seriesdata = []
        let getseriesdata = this.trenddata.series.items
        for (let seriesitem of getseriesdata) {
          seriesdata.push(seriesitem.data)
        }
        let chartname = this.trenddata.series.name

       
        // option定义
        let option = {
          tooltip: {
            trigger: 'item',
            formatter: '{b} <br/>{a} : {c}'
        },
          legend: {
             bottom: 'bottom',
             data: [chartname]
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xdata
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: function(value, index) {
                return value / 10000 + '万'
              }
            }
          },
          series: [{
            name: chartname,
            data: seriesdata,
            type: 'line'
          }]
        }
        this.echartCreate(option)
      })
    },
    // option选择
    handleOption(target, range) {
      this.redoQuery(target, range)
    },
    // 初始option分类数据
    async setupoptionData() {
      await this.redoQuery()
    },
  
    // echart
    echartCreate(data) {
      let echartView = this.$echarts.init(document.getElementById('trend'))     
      echartView.setOption(data)
    }
  },
  // 挂载结束
  mounted: function() {
    this.echartCreate()
  },
  // 创建完毕状态
  created: function() {
    this.reloadData()
    this.setuptabData()
    this.setupoptionData()
   
  },
  // 组件更新
  updated: function() {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-container {
  margin: 10px;
  .tab-choose {
    margin: 15px 0;
    box-shadow:0 6px 5px -3px #dedee4;
  }
  .el-card {
    margin-bottom: 12px;
    border-radius: 0;
  }
  .card {
    .el-card__body {
      padding: 0 20px;
    }
  }
  .el-card__header {
    background: #fbfbfb;
    span {
      font-size: 18px;
      color: #012989;
      line-height: 1.5;
    }
  }
  .el-table th {
    background-color: #fbfbfb
  } 
}
</style>