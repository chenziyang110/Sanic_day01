<template>
  <div class="boxInfo">
        <!-- 数据表格 -->
        <div class="fr clearfix searchInfo">
          <div class="serachInput">
            <el-input
              placeholder="搜索"
              v-model="requestParameters.keyword"
              clearable
              @keyup.enter.native='dataSearch(itemes,index)'>
            </el-input>
          </div>
          <!-- <el-input v-model="requestParameters.keyword" placeholder="请输入姓名" @click="handleSearch"></el-input> -->
          <a class="el-button fr el-button--primary el-button--mini" title="导出" @click='handelFileDownload'>导出</a>
        </div>
        <el-table :key='tableKey' :data="tables" v-loading="listLoading" element-loading-text="给我一点时间" fit
          highlight-current-row style="width: 100%; margin-top:10px;" border>
          <el-table-column prop="fullName" label="姓名" width="120"></el-table-column>
          <el-table-column prop="workNumber" label="工号" width="100"></el-table-column>
          <el-table-column prop="cellPhoneNumber" label="手机号" width="200"></el-table-column>
          <el-table-column prop="attendancePlanForTheMonth" label="当月考勤方案" width="200"></el-table-column>
          <el-table-column prop="firstLevelDepartment" label="一级部门" width="200"></el-table-column>
          <el-table-column prop="twoLevelDepartment" label="二级部门" width="200"></el-table-column>
          <el-table-column prop="threeLevelDepartment" label="三级部门" width="200"></el-table-column>
          <el-table-column prop="workingCity" label="工作城市" width="200"></el-table-column>
          <el-table-column prop="compassionateLeave" label="事假" width="100"></el-table-column>
          <el-table-column prop="breakDown" label="调休" width="100"></el-table-column>
          <el-table-column prop="normal" label="正常" width="100"></el-table-column>
          <el-table-column prop="numberOfLateness" label="迟到次数" width="100"></el-table-column>
          <el-table-column prop="theNumberOfEarlyRetreat" label="早退次数" width="100"></el-table-column>
          <el-table-column prop="averageDailyNaturalDays" label="日均时长（自然日）" width="150"></el-table-column>
          <el-table-column prop="averageDailyWorkingDay" label="日均时长（工作日）" width="150"></el-table-column>
          <el-table-column prop="averageDailyRestDays" label="日均时长（休息日）" width="150"></el-table-column>
          <el-table-column prop="percentageOfPunchingRate" label="打卡率（%）" width="120"></el-table-column>
          <el-table-column prop="absenteeismDays" label="旷工天数" width="100"></el-table-column>
          <el-table-column prop="whetherItIsFullOfWork" label="是否全勤" width="100"></el-table-column>
          <el-table-column prop="actualAttendanceDays" label="实际出勤天数（非正式）" width="180"></el-table-column>
          <el-table-column prop="actualAttendanceDaysAreOfficial" label="实际出勤天数（正式）" width="180"></el-table-column>
          <el-table-column prop="attendanceDay" label="应出勤工作日" width="120"></el-table-column>
          <el-table-column prop="salaryStandard" label="计薪标准" width="100"></el-table-column>
          <el-table-column prop="adjustmentOfSalaryDays" label="计薪天数调整" width="120"></el-table-column>
          <el-table-column prop="longWorkingTime" label="工作时长" width="100"></el-table-column>
          <el-table-column prop="informalSalaryDays" label="计薪天数（非正式）" width="150"></el-table-column>
          <el-table-column prop="officialSalaryDays" label="计薪天数（正式）" width="150"></el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="pagination">
          <PageTool :paginationPage="requestParameters.page" :paginationPagesize="requestParameters.pagesize" :total="counts"
            @pageChange="handleCurrentChange" @pageSizeChange="handleSizeChange">
          </PageTool>
        </div>
        <!-- end -->
        <!-- 数据表格 / -->
        <div class="butList">
          <el-tooltip class="item" effect="dark" content="将当前报表存放至归档，归档可以多次，但只保留最后一次" placement="top-start">
            <el-button type="primary" @click="archivingReportForm" >归档{{month}}月份报表</el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="开始做下月考勤" placement="top-start">
            <el-button type="primary" @click="createReportForm">新建报表</el-button>
          </el-tooltip>
          <!-- <el-button @click="handleRest">取消</el-button> -->
        </div>
  </div>
</template>

<script>
import { getArchivingCont, archives, newReports } from '@/api/hrm/accountsApi'
import { importDown } from '@/api/base/employees'
import PageTool from './../../components/page/page-tool'
export default {
  name: 'exampleList',
  components: {
    PageTool
  },
  props: ['month'],
  data() {
    return {
      // baseData: [],
      dataList: [],
      seleList: [],
      text: '', // 新增、编辑文本
      tableKey: 0,
      listLoading: true,
      counts: '',
      barSearch: {
        alertText: ''
      },
      requestParameters: {
        page: 1,
        pagesize: 10,
        keyword: this.keyword,
        month: this.$route.params.month
      },
      isArchived: '',
      loading: false,
      centerDialogVisible: false,
      infoTip: ''
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
      getArchivingCont(this.requestParameters)
        .then(data => {
          this.dataList = data.data.items
          this.counts = data.data.counts
          this.isArchived = data.data.isArchived
          this.barSearch.alertText = `共 ${this.counts} 条记录`
          this.listLoading = false
        })
        .catch(e => {
          this.$message.e('错了哦，这是一条错误消息')
        })
    },
    // 新增用户刷新列表
    handleLoadDataList() {
      this.doQuery()
    },
    // 归档
    archivingReportForm() {
      if (this.isArchived === true) {
        this.$confirm(
          '该月报表已归档过，重新归档将覆盖上一份报表，您确认要再次归档吗？',
          '归档' + this.month + '报表',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }
        )
          .then(() => {
            archives().then(data => {})
            this.$message({
              type: 'success',
              message: '归档成功！!'
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '取消'
            })
          })
      } else {
        this.$confirm('您确认归档该月报表吗', '归档' + this.month + '报表', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
          .then(() => {
            archives().then(data => {})
            this.$message({
              type: 'success',
              message: '归档成功！!'
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '取消'
            })
          })
      }
    },
    // 新建报表
    createReportForm() {
      this.$confirm(
        '新建报表会使得' +
          this.month +
          '月报表不能修改，且您上一次归档之后的修改将不会被保存。您确定现在就开始做下月考勤吗？',
        '新建' + parseInt(Number(this.month) + Number(1)) + '报表',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }
      )
        .then(() => {
          this.$message({
            type: 'success',
            message: '确定!'
          })
          newReports().then(data => {})
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消'
          })
        })
    },
    // 界面交互
    // 界面初始数据
    setupUI() {
      // this.baseData = constantApi
    },
    // handleRest() {
    //   this.requestParameters = {
    //     fullName: '', // 姓名
    //     sex: '', // 性别
    //     mobilePhone: '', // 手机
    //     onTheJobStatus: '', // 在职状态
    //     dateOfBirth: '', // 出生日期
    //     theHighestDegreeOfEducation: '' // 最高学历
    //   }
    //   this.requestParameters = {}
    //   this.seleList = []
    // },
    // 搜索信息
    // handleSearch() {
    //   this.requestParameters.page = 1
    //   this.doQuery(this.requestParameters)
    //   var seleArr = []
    //   for (let i in this.requestParameters) {
    //     if (
    //       this.requestParameters[i] !== undefined &&
    //       (this.requestParameters[i] !== this.requestParameters.page &&
    //         this.requestParameters[i] !== this.requestParameters.pagesize)
    //     ) {
    //       seleArr.push(this.requestParameters[i])
    //     }
    //   }

    //   this.seleList = seleArr
    // },
    // 每页显示信息条数
    handleSizeChange(pageSize) {
      this.requestParameters.pagesize = pageSize
      if (this.requestParameters.page === 1) {
        this.doQuery(this.requestParameters)
      }
    },
    // 进入某一页
    handleCurrentChange(val) {
      this.requestParameters.page = val
      this.doQuery()
    },
    // 下载文件
    handelFileDownload() {
      importDown({ month: this.month }).then(ret => {})
    },
    dataSearch() {
      this.doQuery(this.requestParameters)
    }
  },
  // 挂载结束
  mounted: function() {},
  // 创建完毕状态
  created: function() {
    this.setupUI()
    this.doQuery()
  },
  // 组件更新
  updated: function() {}
}
</script>
<style rel="stylesheet/scss" lang="scss">
.el-message-box--center .el-message-box__content p {
  text-align: left;
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
@import './../../styles/variables.scss';
.butList {
  // border-top: solid 1px #f4f4f4;
  margin-top: 15px;
  text-align: center;
  background: #fff;
  span {
    display: inline-block;
    background: $green;
    color: #fff;
    padding: 8px 20px;
    border-radius: 3px;
    margin: 10px;
    cursor: pointer;
  }
  .cancel {
    background: #ccc;
    color: #666;
  }
}

</style>
