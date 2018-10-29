<template>
  <div class="dashboard-container">
    <div class="app-container">
      
      <el-card shadow="never" v-loading="loading" class="boxMar" :style="{minHeight:boxHeight}">
        <!-- 信息提示 -->
        <div class="infoTip">
          <el-alert
            title=""
            type="warning"
            show-icon
            :closable="false" style="margin-bottom:15px;">
            <slot>
              <p class="el-alert__description">本月（10.01-10.31）：正式版 {{totals.officialCount}} 正在试用 {{totals.tryuseCount}} 本月新增 {{totals.newCount}}</p>
            </slot>
          </el-alert>
        </div>
        <!-- 数据表格 -->
        <div  class="searchInfo">
        <el-input
          placeholder="搜索"
              v-model="requestParameters.keyword"
              clearable
              @keyup.enter.native='dataSearch(itemes,index)'
              class="inputW">
          </el-input>
      </div>
        <el-table :key='tableKey' :data="tables" v-loading="listLoading" element-loading-text="给我一点时间" fit highlight-current-row style="width: 100%;" border>
          <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
          <el-table-column prop="company" label="企业名称" width="200"></el-table-column>
          <el-table-column prop="programme" label="当前版本"></el-table-column>
          <el-table-column prop="username" label="联系人" width="100"></el-table-column>
          <el-table-column prop="phone" label="联系电话" width="200"></el-table-column>
          <el-table-column prop="city" label="所在地区" width="200"></el-table-column>
          <el-table-column prop="applicationTime"  label="申请时间" width="150">
             <template slot-scope="props">
               {{props.row.applicationTime | formatDate}}
             </template>
          </el-table-column>
          <el-table-column prop="endTime" label="结束时间" width="150">
            <template slot-scope="props">
               {{props.row.endTime | formatDate}}
             </template>
          </el-table-column>
          <el-table-column prop="state" label="状态" width="100">
            <template slot-scope="scope">
              <el-switch v-model="state" disabled active-color="#13ce66"
  inactive-color="#ff4949">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="operation" fixed="right" label="操作" align="center" width="100">
            <template slot-scope="scope">
              <router-link :to="{'path':'/saas-clients/details/' + scope.row.id}" class="el-button el-button--text el-button--small">
                查看
              </router-link>
            </template>
          </el-table-column>
        </el-table>
        <!-- 数据表格 / -->
      </el-card>
    </div>
  </div>
</template>

<script>
import { minHeight, formatDate } from '@/filters/index'
import constantApi from '@/api/base/constant'
import { list } from '@/api/base/sassClients'
var _this = null
export default {
  name: 'employeesList',
  components: {
    // PageTool
  },
  data() {
    return {
      dataList: [],

      totals: {},

      tableKey: 0,
      listLoading: true,
      showHeight: 40,
      boxHeight: '',
      requestParameters: {
        keyword: this.keyword
      },
      loading: false,
      state: ''
    }
  },
  filters: {
    formatDate(time) {
      if (time !== null) {
        var date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    }
  },
  computed: {
    // 模糊搜索
    tables() {
      const search = this.requestParameters.keyword
      if (search) {
        return this.dataList.filter(data => {
          return Object.keys(data).some(key => {
            return (
              String(data[key])
                .toLowerCase()
                .indexOf(search) > -1
            )
          })
        })
      }
      return this.dataList
    }
  },
  methods: {
    // 业务方法
    doQuery(params) {
      this.listLoading = true
      list()
        .then(data => {
          this.dataList = data.data.items
          this.totals = data.data.totals
          for (let i = 0; i < this.dataList.length; i++) {
            if (this.dataList[i].state === 1) {
              this.state = true
            } else {
              this.state = false
            }
          }
          this.listLoading = false
        })
        .catch(e => {
          this.$message.error('错了哦，这是一条错误消息')
        })
    },

    // 界面交互
    // 界面初始数据
    setupUI() {
      this.baseData = constantApi
      this.boxHeight = minHeight() // 右边内容高度
    },
    // 清楚搜索
    handleClear() {
      this.doQuery()
    },
    dataSearch() {
      this.doQuery(this.requestParameters)
    }
  },
  // 挂载结束
  mounted: function() {},
  // 创建完毕状态
  created: function() {
    _this = this
    this.setupUI()
    this.doQuery()
  },
  // 组件更新
  updated: function() {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
