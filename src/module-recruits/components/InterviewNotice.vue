<template>
  <div class="interviewNotice">
    <div class="infoBox">
      <div class="logo"><img src="./../../assets/img.jpeg" alt=""></div>
      <div class="info">
        <p><span class="name">{{ information.fullName }}</span></p>
        <p><span>手机：</span> {{ information.phoneNumber }}
        <p><span>邮箱：</span> {{ information.email }} </p>
      </div>
    </div>
    <div>
      <el-form :model="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item label="面试职位：" prop="types">
          <el-select v-model="ruleForm.jobInterview" placeholder="请选择面试职位">
            <el-option v-for="(it, ind) in listDataes" :key="ind" :label="it.postName" :value="it.postName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="面试日期：" prop="types">
          <el-date-picker v-model="ruleForm.interviewTime" type="date" style="width: 193px;" placeholder="选择日期"> </el-date-picker>
        </el-form-item>
        <el-form-item label="面试官：" prop="types">
          <el-select v-model="ruleForm.interviewer" placeholder="请选择入职岗位">
            <el-option v-for="(it, ind) in employList" :key="ind" :label="it.fullName" :value="it.fullName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公司联系人：" prop="types">
          <el-input v-model="ruleForm.companyContacts" placeholder="请输入公司地址" style="width: 193px;"></el-input>
        </el-form-item>
        <el-form-item label="联系人电话：" prop="types">
          <el-input v-model="ruleForm.contactTelephone"  placeholder="请输入入职联系人" style="width: 193px;"></el-input>
        </el-form-item>
        <el-form-item label="面试地点：" prop="types">
          <el-input v-model="ruleForm.interviewPlace" placeholder="请输入联系人电话" style="width: 193px;"></el-input>
        </el-form-item>
        <el-form-item label="" prop="types">
          <el-checkbox v-model="ruleForm.sendTextMessages">向候选人发送面试短信</el-checkbox>
        </el-form-item>
        <el-form-item label="" prop="types">
          <el-checkbox v-model="ruleForm.sendMail">向候选人发送面试邮件</el-checkbox>
        </el-form-item>
        <div class="buttones" style="text-align: center;margin-top: 40px">
          <el-form-item>
            <el-button type="primary" @click="submitAct()" >通过</el-button>
            <el-button type="primary" @click="cancel()">取消</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {interview, getPositionsList} from '@/api/hrm/recruitsApi'
  import {employeesSimpleList} from '@/api/base/employees.js'
  export default {
    name: 'users-table-index',
    props: ['information'],
    data() {
      return {
        ruleForm: {},
        listDataes: {},
        employList: {}
      }
    },
    methods: {
      init() {
        getPositionsList()
          .then(res => {
            this.listDataes = res.data.items
          })
          .catch(err => {
            this.$message.error(err)
          })
        this.getemployList()
      },
      getemployList(obj) {
        let data = ''
        if (!obj) {
          data = {}
        } else {
          data = {keyword: obj}
        }
        employeesSimpleList(data)
          .then(res => {
            this.employList = res.data.items
          })
          .catch(err => {
            this.$message.error(err)
          })
      },
      submitAct() {
        interview(this.ruleForm)
          .then(res => {
            this.$message.success('录用审批数据提交成功！')
            this.$emit('cancel', 'out')
          })
          .catch(err => {
            this.$message.success(err)
          })
      },
      cancel() {
        this.$emit('cancel', 'out')
      }
    },
    mounted() {
      this.init()
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "./../../styles/variables";
  .interviewNotice{
    .infoBox{
      display: flex;
      border-bottom: solid 1px #ccc;
      margin-bottom: 20px;
      padding: 10px 0 20px 0;
      img{
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
      .logo{
        border:solid 1px #ccc;
        width: 102px;
        height: 102px;
        border-radius: 50%;
        margin-right: 20px;
      }
      .info{
        p{
          line-height: 30px;
          .name{font-size: 16px;}
          span{
            font-weight: bold;
            display: inline-block;
            margin-right: 0px;
            margin-left: 10px;
          }
        }
      }
      .buttones{
        text-align: center;
      }
    }
  }
</style>
