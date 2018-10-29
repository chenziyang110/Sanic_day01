<template>
  <div class="dashboard-container">
    <div class="app-container">
        <ScoialPageTool />
        <div class="cont-bod-box">
          <el-table @row-click='goDetail' :data="tableData" style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}" >
            <el-table-column type="index" width="50" label="序号"> </el-table-column>
            <el-table-column prop="fullName" label="姓名" sortable> </el-table-column>
            <el-table-column prop="mobilePhone" label="手机" sortable > </el-table-column>
            <el-table-column prop="workNumber" label="工号" sortable > </el-table-column>
            <el-table-column prop="department" label="部门" sortable width="180"> </el-table-column>
            <el-table-column prop="timeOfEntry" label="入职时间" sortable> </el-table-column>
            <el-table-column prop="departureTime" label="离职时间" sortable > </el-table-column>
            <el-table-column prop="socialSecurityCity" label="社保城市" width="180"> </el-table-column>
            <el-table-column prop="providentFundCity" label="公积金城市" width="180"> </el-table-column>
            <el-table-column prop="socialSecurityBase" label="社保基数" > </el-table-column>
            <el-table-column prop="providentFundBase" label="公积金基数" > </el-table-column>
          </el-table>
          <div class="page-list">
            <el-pagination @size-change="onPageSizeChange"  @current-change="onPageChange" background :total="50" :page-sizes="[10,20,30, 50]"  layout="sizes, prev, pager, next, jumper"  > </el-pagination>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import { list } from '@/api/hrm/socialSecuritys'
import ScoialPageTool from '../components/ScoialPageTool'

export default {
  name: 'social-securitys-table-index',
  components: {ScoialPageTool},
  data() {
    return {
      tableData: [],
      total: 100
    }
  },
  methods: {
    // 初始化数据
    init() {
      list({year: 2018})
        .then(res => {
          console.log(res)
          this.tableData = res.data.items
          this.loading = false
        })
        .catch(err => {
          console.log(err)
          this.loading = false
        })
    },
    goDetail(row, event, column) {
      this.$router.push({path: 'detail'})
    },
    onPageSizeChange(page) {
      console.log(page)
    },
    onPageChange(page) {
      console.log(page)
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.cont-bod-box {
  padding: 20px;
  background: #fff;
  border-radius: 3px;
  margin-top: 15px;
  margin-bottom: 15px;
  border: 1px solid #ebeef5;
}
.page-list {
  text-align: right;
  margin-top: 10px;
}
</style>
