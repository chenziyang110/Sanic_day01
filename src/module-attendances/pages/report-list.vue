<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card :style="{minHeight:boxHeight}">
        <h2 class="centInfo">{{this.$route.params.month}}月人事报表</h2>
        <el-tabs v-model="activeName" class="infoPosin">
          <el-tab-pane name="first">
            <span slot="label">考勤统计</span>
            <component v-bind:is="allList" :showHeight='showHeight' @archivingReportForm='archivingReportForm' :month='this.$route.params.month'></component>
            </el-tab-pane>

        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { fileUpdate } from '@/api/base/employees'
import allList from './../components/refort-all-list'
import { minHeight } from '@/filters/index'
var _this = null
export default {
  name: 'refortList',
  components: { allList },
  data() {
    return {
      allList: 'allList',
      activeName: 'first',
      boxHeight: '',
      showHeight: 40
    }
  },
  methods: {
    // 业务方法
    // 归档报表
    archivingReportForm() {
      this.$confirm(
        '您确定要归档2018年10月报表？报表归档将覆盖上一次归档记录，无法恢复。',
        '归档确认',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }
      )
        .then(() => {
          fileUpdate({ month: this.$route.params.month }).then(res => {
            this.$message.success('归档报表成功')
          }).catch(e => {
            this.$message.error('归档报表失败')
        })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消'
          })
        })
    }
    // 界面交互
  },
  // 挂载结束
  mounted: function() {},
  // 创建完毕状态
  created: function() {
    _this = this
    this.boxHeight = minHeight() // 右边内容高度
  },
  // 组件更新
  updated: function() {}
}
</script>

<style rel="stylesheet/scss" lang="scss">
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
