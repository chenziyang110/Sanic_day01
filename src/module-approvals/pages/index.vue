<template>
  <div class="dashboard-container">
    <div class="app-container">
      <ScoialPageTool />
      <div class="cont-bod-box">
        <el-table :data="tableData" style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}" >
          <el-table-column type="selection" width="30"> </el-table-column>
          <el-table-column type="index" width="80" label="序号"> </el-table-column>
          <el-table-column prop="approvalType" label="审批类型" sortable> </el-table-column>
          <el-table-column prop="applicant" label="申请人" sortable> </el-table-column>
          <el-table-column prop="currentApprover" label="当前审批人" sortable > </el-table-column>
          <el-table-column prop="approvalInitiationTime" label="审批发起时间" sortable > </el-table-column>
          <el-table-column prop="finalOperationTime" label="最后操作时间" sortable > </el-table-column>
          <el-table-column prop="stateOfApproval" label="审批状态" sortable> </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope" style="">
              <span class="seeDet" @click="detailes('工资', 1)">查看</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="page-list">
          <el-pagination @size-change="onPageSizeChange" @current-change="onPageChange" current-page.sync="2" :total="pageInfo.counts" :page-size="pageInfo.pagesize" layout="total, prev, pager, next"></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { list } from '@/api/hrm/approvalsApi.js'
  import ScoialPageTool from '../components/ScoialPageTool'

  export default {
    name: 'social-securitys-table-index',
    components: {ScoialPageTool},
    data() {
      return {
        tableData: [],
        pageInfo: '',
        total: 100
      }
    },
    methods: {
      // 初始化数据
      init() {
        list({year: 2018})
          .then(res => {
            this.pageInfo = res.data
            this.tableData = res.data.items
            console.log(res.data)
            this.loading = false
          })
          .catch(err => {
            this.$message.error(err)
            this.loading = false
          })
      },
      detailes (obj, id) {
        switch (obj) {
          case '工资':
            this.$router.push({ path: './salaryApproval/' + id })
            break
          case '入职':
            this.$router.push({ path: './enterApproval/' + id })
            break
          case '请假':
            this.$router.push({ path: './leaveApproval/' + id })
            break
          case '离职':
            this.$router.push({ path: './quitApproval/' + id })
            break
        }

      },
      onPageSizeChange(val) {
        console.log(`每页 ${val} 条`)
      },
      onPageChange(val) {
        console.log(`当前页: ${val}`)
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
