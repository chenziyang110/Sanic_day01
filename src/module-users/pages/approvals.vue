<template>
  <div class="usersApprovalsContainer">
    <div class="approvalsTop">
      <div class="topLab" ><span @click="tabSwitch('launch')" :class="[tabLab == 'launch' ? 'act' : '']">我发起的</span><span @click="tabSwitch('approvals')" :class="[tabLab == 'approvals' ? 'act' : '']">我审批的</span><span @click="tabSwitch('copy')" :class="[tabLab == 'copy' ? 'act' : '']">抄送我的</span></div>
    </div>
    <div class="approvalsContent">
      <div class="topTitle">
        <div> <span>审批类型：</span>
          <el-checkbox-group v-model="approvalsType">
            <el-checkbox label="转正"></el-checkbox>
            <el-checkbox label="调岗"></el-checkbox>
            <el-checkbox label="离职"></el-checkbox>
            <el-checkbox label="工资审核"></el-checkbox>
            <el-checkbox label="请假"></el-checkbox>
            <el-checkbox label="加班"></el-checkbox>
            <el-checkbox label="录用"></el-checkbox>
          </el-checkbox-group>
        </div>
        <div> <span>审批状态：</span>
          <el-checkbox-group v-model="approvalsState">
            <el-checkbox label="审批中"></el-checkbox>
            <el-checkbox label="审批驳回"></el-checkbox>
            <el-checkbox label="已撤销"></el-checkbox>
            <el-checkbox label="审批通过"></el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="selection" width="28"></el-table-column>
          <el-table-column type="index" label="序号" width="60"> </el-table-column>
          <el-table-column prop="approvalType" label="审批类型" > </el-table-column>
          <el-table-column prop="applicant" label="申请人" > </el-table-column>
          <el-table-column prop="date" label="所在部门" > </el-table-column>
          <el-table-column prop="currentApprover" label="当前审批人" > </el-table-column>
          <el-table-column prop="approvalInitiationTime" label="审批发起时间" > </el-table-column>
          <el-table-column prop="stateOfApproval" label="审批状态" > </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link"> 查看 <i class="el-icon-arrow-down el-icon--right"></i> </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="becomeARegularWorker">转正</el-dropdown-item>
                  <el-dropdown-item command="adjustThePost">调岗</el-dropdown-item>
                  <el-dropdown-item command="quit">离职</el-dropdown-item>
                  <el-dropdown-item command="examine">审核</el-dropdown-item>
                  <el-dropdown-item command="leave">请假</el-dropdown-item>
                  <el-dropdown-item command="overtime">加班</el-dropdown-item>
                  <el-dropdown-item command="employment">录用</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-button size="mini" type="danger" >打印</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!--查看弹框-->
    <el-dialog :title="topLabel" :visible.sync="centerDialogVisible" width="50%" left>
      <BecomeARegularWorker v-show="seeState == 'becomeARegularWorker'"/>
      <AdjustThePost  v-show="seeState == 'adjustThePost'"/>
      <Quit  v-show="seeState == 'quit'"/>
      <Examine  v-show="seeState == 'examine'"/>
      <Leave  v-show="seeState == 'leave'"/>
      <Overtime  v-show="seeState == 'overtime'"/>
      <Employment  v-show="seeState == 'employment'"/>
    </el-dialog>
    <!--查看弹框-->
  </div>
</template>

<script>
  import { approvalsList } from '@/api/hrm/usersApi'
  import BecomeARegularWorker from './../components/BecomeARegularWorker'
  import AdjustThePost from './../components/AdjustThePost'
  import Quit from '../components/Quit'
  import Examine from '../components/Examine'
  import Leave from '../components/LeaveJob'
  import Overtime from '../components/Overtime'
  import Employment from '../components/Employment'

  export default {
    name: 'users-table-index',
    components: { BecomeARegularWorker, AdjustThePost, Quit, Examine, Leave, Overtime, Employment },
    data() {
      return {
        seeState: 'becomeARegularWorker',
        centerDialogVisible: true,
        topLabel: '转正',
        tabLab: 'launch',
        approvalsType: [],
        approvalsState: [],
        tableData: []
      }
    },
    methods: {
      init () {
        approvalsList({})
          .then(res => {
            this.tableData = res.data.items
            this.loading = false
          })
          .catch(err => {
            console.log(err)
            this.loading = false
          })
      },
      tabSwitch(obj) {
        this.tabLab = obj
      },
      handleCommand(obj) {
        this.centerDialogVisible = true
        this.seeState = obj
        switch (obj) {
          case 'adjustThePost':
            this.topLabel = '调岗'
            break
          case 'quit':
            this.topLabel = '离职'
            break
          case 'examine':
            this.topLabel = '审核'
            break
          case 'overtime':
            this.topLabel = '加班'
            break
          case 'employment':
            this.topLabel = '录用'
            break
          case 'leave':
            this.topLabel = '请假'
            break
          default :
            this.topLabel = '转正'
        }
      }
    },
    mounted() {
      this.init()
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "./../../styles/variables";
  .usersApprovalsContainer{
    padding: 20px;
    .approvalsTop{
      color:#666;
      background: #fff;
      border-bottom:solid 1px #ccc;
      line-height: 40px;
      span{
        display: inline-block;
        padding: 0 25px;
        font-size: 18px;
        cursor:pointer;
      }
      .act{
        color:$blue;
        border-bottom: solid 2px $blue;
      }
    }
    .approvalsContent{
      .topTitle{
        background: #fff;
        padding: 15px;
        div{
          margin: 15px 0;
          span{
            position: relative;
            top:2px;
            float:left;
            font-weight: bold;
          }
        }
      }
      .el-dropdown-link{
        color: #666;
        border:solid 1px #ccc;
        display: inline-block;
        width: 67px;
        height: 28px;
        padding: 2px 10px;
        font-size: 12px;
        border-radius: 3px;
        margin-right: 5px;
      }
    }
  }
</style>
