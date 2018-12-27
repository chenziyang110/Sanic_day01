<template>
  <div class="dashboard-container">
    <el-card class="yesterday" shadow="never">
      <el-row>
            <el-col :span="24" class="target">
               <el-row>
                  <el-col :span="4" class="target">
                      <h1 class="number">{{items[0].timesOfBrowsing}}</h1>
                      <p>浏览次数</p>
                  </el-col>
                  <el-col :span="4" class="target">
                      <h1 class="number">{{items[0].independentVisitors}}</h1>
                      <p>独立访客</p>
                  </el-col>
                  <el-col :span="4" class="target">
                      <h1 class="number">{{items[0].IP}}</h1>
                      <p>IP数量</p>
                  </el-col>
                  <el-col :span="4" class="target">
                      <h1 class="number">{{items[0].averageVisitorDepth}}</h1>
                      <p>平均访问深度</p>
                  </el-col>
                  <el-col :span="4" class="target">
                      <h1 class="number">{{items[0].averageVisitorDuration}}</h1>
                      <p>平均访问长度</p>
                  </el-col>
                  <el-col :span="4" class="target">
                      <h1 class="number">{{items[0].bounceRate}}</h1>
                      <p>跳出率</p>
                  </el-col>
               </el-row>
            </el-col>

        </el-row>
    </el-card>
    <!-- 昨日浏览量 -->
    <div class="card-head home" :class="{active:tableshow}">
      <!-- 数据表格 -->
        <el-table :data="items">
          <el-table-column label=" ">
            <template slot-scope="scope">
              <span class="row-name">{{ scope.row.title }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="timesOfBrowsing" label="浏览次数"></el-table-column>
          <el-table-column prop="independentVisitors" label="独立访客"></el-table-column>
          <el-table-column prop="IP" label="IP"></el-table-column>
          <el-table-column prop="averageVisitorDepth" label="平均访客深度"></el-table-column>
          <el-table-column prop="averageVisitorDuration" label="平均访客时长"></el-table-column>
          <el-table-column prop="bounceRate" label="跳出率"></el-table-column>
        </el-table>
    </div>
    <div class="point" v-bind:style="{'position':'relative', 'top': paddingBottom}">
      <span @click="handleCollapse">
        <i :class="icon"></i>
      </span>
    </div>
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
          <span class="trendchartTitle">趋势图</span>
           <router-link to='/flowanalyze/trend'>
              <el-button class="golink"  type="text" ><i class="fa fa-ellipsis-h" aria-hidden="true"></i></el-button>
           </router-link>
        </div>
        <!-- 趋势图表 -->
        <div>
          <!-- 下拉框 -->
        <SelectMenu v-on:handleSelect = "handleSelect" ref="selectmenu"/>
           <!-- <el-select class="selectdropdown" v-model="defaultvalue" placeholder="选择指示" @change="handleOption">
              <el-option
                v-for="item in targets"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                class="selectoption"
                >
                <el-radio :label="1">{{ item.label }}</el-radio>
              </el-option>
            </el-select> -->

             <div id="trendchart" style="width: 100%;min-height:400px;"></div>

        </div>
     </el-card>
     <!-- TOP榜 -->
     <div  class="tablecards">
        <el-row :gutter="12">

          <el-col :span="8">
            <div class="table-item">
              <el-card shadow="always" class="card">
                <div slot="header" class="clearfix">
                  <span>新老访客</span>
                  <router-link to='/visitor/oldnewvisitor'>
                  <el-button class="golink"  type="text"><i class="fa fa-ellipsis-h" aria-hidden="true"></i></el-button>
                  </router-link>
                </div>
                <div class="tablestyle">
                  <!-- 访客表格 -->
                  <el-table :data="visitors" >
                    <el-table-column prop="target" width="140px" label="指标名称">
                      <template slot-scope="scope">
                        <span class="row-target">{{ scope.row.target }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="newVisitor" label="新访客">
                      <template slot-scope="scope">
                        <span class="row-target" style="color:#ec4b47">{{ scope.row.newVisitor }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="oldVisitors" style="color:#012989" label="老访客">
                      <template slot-scope="scope">
                        <span class="row-target" style="color:#012989">{{ scope.row.oldVisitors }}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-card>
             </div>
          </el-col>

          <el-col :span="8">
            <div class="table-item">
            <el-card shadow="always"  class="card">
              <div slot="header" class="clearfix">
                <span>TOP10搜索词</span>
                <router-link to='/source/keywords'>
                <el-button class="golink"  type="text"><i class="fa fa-ellipsis-h" aria-hidden="true"></i></el-button>
                </router-link>
              </div>
              <div class="tablestyle">
                <!-- 搜索词表格 -->
                <el-table :data="searchterm">

                  <el-table-column prop="searchTerm" label="搜索词" width="150px">
                    <template slot-scope="scope">
                      <i v-bind:class="(scope.$index == 0) || (scope.$index == 1) ||(scope.$index == 2)  ? 'top' : 'tableindex'">{{scope.$index+1}}</i>
                      <span style="margin-left: 10px">{{ scope.row.searchTerm }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="browsingVolume" label="浏览量"></el-table-column>
                  <el-table-column prop="occupationRatio" label="占比"></el-table-column>
                </el-table>
              </div>
            </el-card>
            </div>
          </el-col>
          <el-col :span="8">
            <el-card shadow="always"  class="card">
              <div slot="header" class="clearfix">
                <span>TOP10受访界面</span>
                <router-link to='/visited/visitedpage'>
                <el-button class="golink"  type="text"><i class="fa fa-ellipsis-h" aria-hidden="true"></i></el-button>
                </router-link>
              </div>
              <div class="tablestyle">
                <!-- 受访表格 -->
                <el-table :data="interviewing">
                  <el-table-column prop="searchTerm" width="150" show-overflow-tooltip label="受访界面"></el-table-column>
                  <el-table-column prop="browsingVolume" label="浏览量"></el-table-column>
                  <el-table-column prop="occupationRatio" label="占比"></el-table-column>
                </el-table>
              </div>

            </el-card>
          </el-col>
        </el-row>
     </div>


  </div>
</template>

<script>
import {list, type, trend} from '@/api/base/home'
import echarts from 'echarts'
// import resize from './../../components/Charts/mixins/resize'
import SelectMenu from '@/components/SelectMenu'
import { debounce } from '@/utils'

export default {
  name: 'dashboard',
  components: {SelectMenu},
  data() {
    return {
      activeNames: ['1'],
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
      currentrange: 0,
      chart: null,
      tableshow: true,
      icon: 'el-icon-d-arrow-left',
      paddingBottom: '0px',
      target: '',
      targetname: ''
    }
  },
  computed: {},
  methods: {
    // 昨日流量数据
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
    // 初始option分类数据
    async setupoptionData() {
      await this.redoQuery()
    },
    // 图表数据请求
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

        this.chart = echarts.init(document.getElementById('trendchart'))
        this.chart.setOption({
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
            type: 'value'
            // axisLabel: {
            //   formatter: function(value, index) {
            //     return value / 10000 + '万'
            //   }
            // }
          },
          series: [{
            name: chartname,
            data: seriesdata,
            type: 'line'
          }]
        })

      })
    },
    // tab选择
    handleTab(range, target) {
      this.target = 1
      this.$refs.selectmenu.targetName()
      this.doQuery(range, target)
    },
    // 下拉选择
    handleSelect(target, range) {
      this.target = target
      this.redoQuery(this.target, this.range)
    },
    // option选择
    handleOption(target, range) {
      this.redoQuery(target, range)
    },

    // 折叠与展开
    handleCollapse() {
      this.tableshow = !this.tableshow
      if (this.tableshow === true) {
        this.icon = 'el-icon-d-arrow-left'
        this.paddingBottom = '0px'
      } else {
        this.icon = 'el-icon-d-arrow-right'
         this.paddingBottom = '-55px'
      }
    }
  },
  // 挂载结束
  mounted() {
    this.__resizeHanlder = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHanlder)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.__resizeHanlder)
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

  .el-card__header span.trendchartTitle {
    color: #012989
  }
  .yesterday {
    background: #fff;
    width: 100%;
    border: none;
    position: relative;
    top: -5px;
    .target {
      text-align: center;
      .title{
        color: #4ed6fe;
        font-weight: normal;
        font-size: 1.8em;
        margin: 1.2em 0;
      }
      .number {
        font-size: 1.8em;
        font-weight: normal;
        line-height: 32px;
        margin: 0.4em 0;
      }
      p {
        font-size: 14px;
        color: #999;
      }
    }
  }
  .card-head {
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 15px;
    padding:10px 20px;
    background: #fff;
    border-radius: 7px;
  }
  .home.active {
    height: 197px;
    transition: height 0.5s;
    visibility: visible;
  }
  .home {
    height: 0;
    transition: height 1s;
    visibility: hidden;
  }
  .point {
    margin-top: -10px;
    text-align: center;
    span {
      background: #fff;
      padding: 6px 15px;
      box-shadow: 0px 0px 3px #e3e8ec;
      cursor: pointer;
    }
    i {
      font-size: 20px;
      color: #4ed6fe;
      -webkit-transform: rotate(90deg);
      -moz-transform: rotate(90deg);
      -o-transform: rotate(90deg);
      -ms-transform: rotate(90deg);
      transform: rotate(90deg);
    }
  }
  .row-name {
    color: #012989;
  }
  .tab-choose {
    margin: 10px 10px;
    box-shadow:0 6px 5px -3px #dedee4;
  }
  .trend {
    border-radius: 0;
    margin: 0 10px 20px;
    .selectdropdown {
      padding-left: 10px;
    }
  }
  .tablecards {
    margin-left: 10px;
    margin-right: 10px;
    .table-item {
      padding-right: 10px;
      .row-target {
        color: #999
      }
    }
  }
  .card {
    .el-card__body {
      padding: 0 20px;
    }
  }
  .el-card__header {
    background: #fbfbfb;
    span {
      padding-left: 10px;
      font-size: 20px;
      color: #012989;
      line-height: 1.5;
    }
  }
  .el-table th {
    background-color: #fbfbfb
  }
  .tableindex {
    background: #e1e1e1;
    font-style: normal;
    padding: 2px 5px;
    color: #fff;
  }
  .top {
    background: #f75426;
    font-style: normal;
    padding: 2px 6px;
    border-radius: 2px;
    color: #fff;
  }
  .golink {
    float: right;
    padding: 3px 0;
    font-size: 20px;
    &:hover {
      span {
        i {
          background: #f75426
        }
      }
    }
  }
}
</style>
