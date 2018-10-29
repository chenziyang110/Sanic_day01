<template>
  <div class="recruitsContainer">
    <div class="tableItems">
      <div class="tableLab">
        <span :class = "{act: active === 'getResumesList'}" @click = "tableChange('getResumesList')">简历管理</span>
        <span :class = "{act: active === 'getInterviewsList'}" @click = "tableChange('getInterviewsList')">面试管理</span>
        <span :class = "{act: active === 'getEmploysList'}" @click = "tableChange('getEmploysList')">录用管理</span>
        <span :class = "{act: active === 'getTalentsList'}" @click = "tableChange('getTalentsList')">人才库</span>
        <span :class = "{act: active === 'getPositionsList'}" @click = "tableChange('getPositionsList')">职位管理</span>
        <span :class = "{act: active === 'getEmployApprovalsList'}" @click = "tableChange('getEmployApprovalsList')">录用审批</span>
      </div>
      <div class="activeLab"><el-input v-model="searchKey" style="width: 145px;display: inline-block" size="mini" :change="searchList()" placeholder="请输入检索关键词">
        <i class="el-icon-search" slot="suffix"></i>
      </el-input><router-link :to="{'path':'./information'}">消息</router-link>
        <router-link :to="{'path':'./importData'}">导入</router-link></div>
    </div>
    <div class="container">
      <div class="tabInfo">
        <span v-for="(item, index) in listDataes.states" :key="index">{{item.title}}({{item.num}})</span>
      </div>
      <el-table ref="multipleTable" v-show="active != 'getPositionsList'" :data="listDataes.items" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="40"> </el-table-column>
        <el-table-column  label="基本信息" width="120">
          <template slot-scope="scope">  <p>{{scope.row.fullName}}</p> <p>{{scope.row.phoneNumber}}</p> </template>
        </el-table-column>
        <el-table-column prop="education" label="学历" show-overflow-tooltip></el-table-column>
        <el-table-column prop="workingYears" label="工龄"> </el-table-column>
        <el-table-column prop="universityOneIsGraduatedFrom" label="毕业院校" show-overflow-tooltip></el-table-column>
        <el-table-column prop="homeCompany" label="上家公司"> </el-table-column>
        <el-table-column prop="jobPosition" label="应聘职位" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" class = "operation" width="240"  align="center" v-if="active == 'getResumesList'">
          <template slot-scope="scope">
            <p style="color:rgba(5,131,253,0.88);cursor:pointer"><router-link :to="{'path':'./resume/' + scope.row.id}"> 查看</router-link> <span @click="giveUp(scope.row)">放弃</span> <span @click="downloadResume(scope.row)">下载</span> <span @click="recommended(scope.row)">推荐</span> <span @click="operation(scope.row, '面试通知')">面试</span></p>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="240" align="center"  v-else-if="active == 'getInterviewsList'">
          <template slot-scope="scope">
            <p style="color:rgba(5,131,253,0.88);cursor:pointer">
            <span @click="operation(scope.row, '录用审批')">录用审批</span> <span @click="giveUp(scope.row)">放弃</span> <span @click="downloadResume(scope.row)">下载</span> <span @click="operation(scope.row, '面试通知')">面试</span> <router-link :to="{'path':'./resume/' + scope.row.id}"> 查看</router-link>
            </p>
          </template>
        </el-table-column>
        <el-table-column label="操作" class = "operation" width="240"  align="center" v-else-if="active == 'getEmploysList'">
          <template slot-scope="scope">
            <p style="color:rgba(5,131,253,0.88);cursor:pointer">
             <span @click="giveUp(scope.row)">放弃</span> <span  @click="downloadResume(scope.row)">下载</span> <span @click="recommended(scope.row)">推荐</span> <span @click="operation(scope.row, '面试通知')">面试</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column label="操作" class = "operation" width="240"  align="center" v-else-if="active == 'getTalentsList'">
          <template slot-scope="scope">
            <p style="color:rgba(5,131,253,0.88);cursor:pointer">
            <span @click="giveUp(scope.row)">放弃</span> <span  @click="downloadResume(scope.row)">下载</span> <span @click="recommended(scope.row)">推荐</span> <span @click="operation(scope.row, '面试通知')">面试</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column label="操作" class = "operation" width="180"  align="center" v-else>
          <template slot-scope="scope">
            <p style="color:rgba(5,131,253,0.88);cursor:pointer">
            <span @click="operation(scope.row, '发送 offer')">发送offer</span> <span @click="giveUp(scope.row)">放弃</span> <span  @click="downloadResume(scope.row)">下载</span>
            </p>
          </template>
        </el-table-column>
      </el-table>
      <el-table ref="multipleTable" v-show="active == 'getPositionsList'" :data="listDataes.items" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="40"> </el-table-column>
        <el-table-column  label="岗位名称" width="400">
          <template slot-scope="scope">  <p>{{scope.row.postName}}</p> <p>{{scope.row.city}} | {{scope.row.department}} | {{scope.row.fullTime}} | {{scope.row.educationalRequirements}} </p> </template>
        </el-table-column>
        <el-table-column prop="numberOfResumesReceived" label="接收简历数" show-overflow-tooltip></el-table-column>
        <el-table-column prop="numberOfInvitations" label="邀约人数"> </el-table-column>
        <el-table-column prop="interviewer" label="面试人数" show-overflow-tooltip></el-table-column>
        <el-table-column prop="sendOutOffer" label="发送 offer"> </el-table-column>
        <el-table-column prop="pendingPost" label="待入职" show-overflow-tooltip></el-table-column>
        <el-table-column prop="entryIntoThePost" label="已入职" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" class = "operation" width="180"  align="center">
          <template slot-scope="scope">
            <p style="color:rgba(5,131,253,0.88);cursor:pointer">
              <span @click = "closeRecruit(scope.row)">关闭</span> <span  @click = "delRecruit(scope.row)">删除</span>
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pageList">
      <el-pagination @size-change="onPageSizeChange" @current-change="onPageChange" :current-page.sync="listDataes.currentPage" :total="listDataes.counts" :page-size="listDataes.pagesize" layout="total, prev, pager, next"></el-pagination>
    </div>
    <!-- 操作弹窗 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <ExaminationApproval v-show="title === '录用审批'" :information = "dataInfo" v-on:cancel = "cancel"/>
      <InterviewNotice v-show="title === '面试通知'" :information = "dataInfo" v-on:cancel = "cancel"></InterviewNotice>
    </el-dialog>
  </div>
</template>

<script>
import {getResumesList, getInterviewsList, getEmployApprovalsList, getEmploysList, getTalentsList, getPositionsList, giveUpOffer, dowResume, recommendedResume, clsRecruit, deleteRecruit} from '@/api/hrm/recruitsApi'
import ExaminationApproval from '../components/ExaminationApproval'
import InterviewNotice from '../components/InterviewNotice'
import SendOffer from './sendOffer'
import PageTool from './../../components/page/page-tool'

export default {
  name: 'recruits-table-index',
  components: {ExaminationApproval, InterviewNotice, SendOffer, PageTool},
  data() {
    return {
      active: 'getResumesList',
      dialogFormVisible: false,
      title: '',
      dataInfo: {},
      listDataes: {},
      searchKey: ''
    }
  },
  methods: {
    init() {
      getResumesList()
        .then(res => {
          this.listDataes = res.data
        })
        .catch(err => {
          this.$message.error(err)
        })
    },
    tableChange(obj) {
      this.active = obj
      switch (obj) {
        case 'getInterviewsList':
          this.getInterviewsData()
          break
        case 'getEmployApprovalsList':
          this.getEmployApprovalsData()
          break
        case 'getEmploysList':
          this.getEmploysData()
          break
        case 'getTalentsList':
          this.getTalentsData()
          break
        case 'getPositionsList':
          this.getPositionsData()
          break
        default:
          this.init()
      }
    },
    getInterviewsData() {
      getInterviewsList()
        .then(res => {
          this.listDataes = res.data
        })
        .catch(err => {
          this.$message.error(err)
        })
    },
    getEmployApprovalsData() {
      getEmployApprovalsList()
        .then(res => {
          this.listDataes = res.data
        })
        .catch(err => {
          this.$message.error(err)
        })
    },
    getEmploysData() {
      getEmploysList()
        .then(res => {
          this.listDataes = res.data
        })
        .catch(err => {
          this.$message.error(err)
        })
    },
    getTalentsData() {
      getTalentsList()
        .then(res => {
          this.listDataes = res.data
        })
        .catch(err => {
          this.$message.error(err)
        })
    },
    // 职位列表
    getPositionsData() {
      getPositionsList()
        .then(res => {
          this.listDataes = res.data
        })
        .catch(err => {
          this.$message.error(err)
        })
    },
    // 放弃
    giveUp(obj) {
      giveUpOffer({id: obj.id})
        .then(res => {
          this.$message.success('简历已被放弃！')
        })
        .catch(err => {
          this.$message.error(err)
        })
    },
    // 简历下载
    downloadResume(obj) {
      dowResume({id: obj.id})
        .then(res => {
          this.$message.success('简历下载成功！')
        })
        .catch(err => {
          this.$message.error(err)
        })
    },
    // 推荐
    recommended(obj) {
      recommendedResume({id: obj.id})
        .then(res => {
          this.$message.success('简历推荐成功！')
        })
        .catch(err => {
          this.$message.error(err)
        })
    },
    // 关闭招聘
    closeRecruit(obj) {
      clsRecruit({id: obj.id})
        .then(res => {
          this.$message.success('关闭职位招聘成功！')
        })
        .catch(err => {
          this.$message.error(err)
        })
    },
    // 删除招聘
    delRecruit(obj) {
      deleteRecruit({id: obj.id})
        .then(res => {
          this.$message.success('删除职位招聘成功！')
        })
        .catch(err => {
          this.$message.error(err)
        })
    },
    // 审批录用、面试
    operation(obj, opt) {
      this.dialogFormVisible = true
      this.title = opt
      this.dataInfo = obj
      if (opt === '发送 offer') {
        let data = {id: obj.id, fullName: obj.fullName, phoneNumber: obj.phoneNumber, email: obj.email}
        this.$router.push({path: './sendOffer/' + obj.id, query: data})
      }
    },
    searchList() {
      if (this.searchKey) {
        console.log(this.searchKey)
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 进入某一页
    onPageChange: function(pageNum) {
      console.log(pageNum, this.listDataes)
    },
    // 每页显示信息条数
    onPageSizeChange: function(pageSize) {
      console.log(pageNum)
    },
    cancel() {
      this.dialogFormVisible = false
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "./../../styles/variables";
.recruitsContainer {
  margin: 15px;
  background: #fff;
  padding: 25px;
  .tableItems{
    position: relative;
    border-bottom: solid 1px #ccc;
    line-height: 50px;
    .tableLab{
      display: inline-block;
      font-weight: bold;
      span{
        display: inline-block;
        padding: 0 20px;
        cursor:pointer;
      }
      .act{
        color: $panGreen;
      }
    }
    .activeLab{
      position: absolute;
      right: 25px;
      top: 0px;
      span,a{
        display: inline-block;
        padding: 0 10px;
        color: $panGreen;
        cursor:pointer;
      }
    }
  }
  .container{
    .tabInfo{
      line-height: 50px;
      border-bottom: solid 2px #ccc;
      span{
        display: inline-block;
        margin-right: 20px;
      }
    }
  }
  .pageList{
    text-align: right;
    margin-top: 20px;
  }
}
</style>
