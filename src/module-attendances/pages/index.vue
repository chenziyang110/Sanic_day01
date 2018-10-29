<template>
  <div class="dashboard-container">
    <div class="app-container">
      <AttendancesPageTool :monthOfReport='monthOfReport' @dataList='dataList' :formData='formData' :attendInfo='attendInfo' />
      <div class="cont-bod-box">
        <div style=" width: 100%;position: relative;overflow-x: auto;">
          <div style=" width: 3000px;">
            <table border="0" align="center" cellpadding="0" cellspacing="0" class="tableInfo">
            <tr>
              <th width="50">序号</th>
              <th width="100">姓名</th>
              <th width="100">工号</th>
              <th width="200">部门</th>
              <th width="100">手机</th>
              <th v-for="(it, ind) in monthOfReport" :key="ind" width="110">{{attendInfo.month}}/{{ind+1}}</th>
            </tr>
            <tr v-for="(item, index) in baseData" :key="index">
              <td width="50">{{index}}</td>
              <td width="100">{{item.name}}</td>
              <td width="100">{{item.workNumber}}</td>
              <td width="200">{{item.department}}</td>
              <td width="100">{{item.mobilePhone}}</td>
              <td v-for="(it, ind) in item.attendanceRecord" @click='handleOver(item,ind,it)' :key="ind" width="110">{{it}}</td>
            </tr>
        </table>
          </div>
          
        </div>
        <el-dialog
            :visible.sync="centerDialogVisible"
            width="30%"
            center>
            <span slot="title" style="color:#fff;">{{attendInfo.name}} {{attendInfo.month}}/{{attendInfo.getDate}}（实际工作日考勤方案）</span>
            <div class="attenInfo">
              <p class="colRed">注：统计考勤时，异常状态优先正常状态</p>
              <p class="check">
                <el-radio-group v-model="modifyData.stateID">
                  <el-radio label="1">正常</el-radio>
                  <el-radio label="2">旷工</el-radio>
                  <el-radio label="3">迟到</el-radio>
                  <el-radio label="4">早退</el-radio>
                  <el-radio label="5">事假</el-radio>
                  <el-radio label="6">调休</el-radio>
                </el-radio-group>
              </p>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="handleSub">确 定</el-button>
              <el-button @click="centerDialogVisible = false">取 消</el-button>
            </span>
          </el-dialog>
        <!-- <el-table  border :data="baseData" style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}" >
          <el-table-column type="index" width="50" fixed style="text-align: center;" label="序号"> </el-table-column>
          <el-table-column prop="name" label="姓名" fixed width="80" sortable> </el-table-column>
          <el-table-column prop="workNumber" label="工号" width="80"> </el-table-column>
          <el-table-column prop="department" label="部门" width="150"> </el-table-column>
          <el-table-column prop="mobilePhone" label="手机" width="110"> </el-table-column>
          <el-table-column prop="attendanceRecord">
            <template slot-scope="attendanceRecord">

              <el-table-column prop="attendanceRecord[3]">
                  <span slot="label">3</span>
              </el-table-column>
            </template>
          </el-table-column>
        </el-table> -->
        <div class="page-list">
          <div class="pagination">
          <PageTool :paginationPage="formData.page" :paginationPagesize="formData.pagesize" :total="attendInfo.counts" @pageChange="handleCurrentChange" @pageSizeChange="handleSizeChange">
          </PageTool>
        </div>
        <!-- end -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getNowFormatDate } from './../../filters/index'
import PageTool from './../../components/page/page-tool'
import { attendancesList, modify } from '@/api/hrm/accountsApi'
import AttendancesPageTool from '../components/Attendance-page-tool'
let _this = null
export default {
  name: 'attendances',
  components: { AttendancesPageTool, PageTool },
  data() {
    return {
      baseData: [],
      total: 100,
      attendanceRecord: '',
      monthOfReport: '',
      centerDialogVisible: false,
      attendInfo: {
        month: '',
        getDate: '',
        getInfo: '',
        name: '',
        counts: '',
        tobeTaskCount: ''
      },
      formData: {
        page: 1,
        pagesize: 10,
        keyword: this.keyword
      },
      modifyData: {
        uid: '',
        day: '',
        stateID: ''
      }
    }
  },
  methods: {
    // 业务方法
    // 初始化数据
    dataList() {
      attendancesList().then(data => {
        this.baseData = data.data.items
        this.attendInfo.counts = data.data.counts
        var date = new Date()
        var year = date.getFullYear()
        var month = data.data.totals.monthOfReport
        this.attendInfo.month = data.data.totals.monthOfReport
        this.attendInfo.tobeTaskCount = data.data.totals.tobeTaskCount
        var d = new Date(year, month, 0)
        this.monthOfReport = d.getDate()
      })
    },
    // 界面交互
    handleSub() {
      modify(this.modifyData).then(() => {
        this.centerDialogVisible = false
        this.dataList()
      })
    },
    // 每页显示信息条数
    handleSizeChange(pageSize) {
      this.formData.pagesize = pageSize
      if (this.formData.page === 1) {
        _this.dataList(this.formData)
      }
    },
    // 进入某一页
    handleCurrentChange(val) {
      this.formData.page = val
      _this.dataList()
    },
    handleOver(item, id, it) {
      this.modifyData.uid = item.id
      this.modifyData.day = getNowFormatDate()
      if (it === '√') {
        this.modifyData.stateID = '1'
      } else if (it === '旷') {
        this.modifyData.stateID = '2'
      } else if (it === '迟') {
        this.modifyData.stateID = '3'
      } else if (it === '退') {
        this.modifyData.stateID = '4'
      } else if (it === '事') {
        this.modifyData.stateID = '5'
      } else {
        this.modifyData.stateID = '6'
      }
      if (it !== '') {
        this.attendInfo.getDate = parseInt(id + 1)
        this.attendInfo.getInfo = it
        this.attendInfo.name = item.name
        this.centerDialogVisible = true
      }
    }
  },
  // 挂载结束
  mounted() {},
  // 创建完毕状态
  created: function() {
    _this = this
    this.dataList()
  },
  // 组件更新
  updated: function() {}
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
  table {
    line-height: 36px;
    border: solid 1px #ebeef5;
    border-right: 0 none;
    border-bottom: 0 none;
    tr {
      th {
        height: 50px;
        text-align: center;
        border-right: solid 1px #ebeef5;
        border-bottom: solid 1px #ebeef5;
        border-bottom: 2px solid #e8e8e8;
        background: #fafafa;
      }
      td {
        height: 36px;
        text-align: center;
        border-right: solid 1px #ebeef5;
        border-bottom: solid 1px #ebeef5;
      }
    }
  }
}
.page-list {
  text-align: right;
  margin-top: 10px;
}
.attenInfo {
  p {
    &.check {
      padding: 20px 0 0;
    }
  }
}
</style>
