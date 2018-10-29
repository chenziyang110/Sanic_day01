<template>
  <div class="ExaminationApproval">
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
        <el-form-item label="报道时间：" prop="types">
          <el-date-picker v-model="ruleForm.overtimeStartTime" type="date" style="width: 193px;" placeholder="选择日期"> </el-date-picker>
        </el-form-item>
        <el-form-item label="试用期：" prop="types">
          <el-input v-model="ruleForm.probationPeriod" placeholder="请输入试用期"  style="width: 193px;"></el-input>
        </el-form-item>
        <el-form-item label="入职岗位：" prop="types">
          <el-select v-model="ruleForm.post" placeholder="请选择入职岗位">
            <el-option v-for="(it, ind) in listDataes" :key="ind" :label="it.postName" :value="it.postName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入职部门：" prop="types">
          <el-select v-model="ruleForm.entryDepartment" placeholder="请选择入职部门">
            <el-option v-for="(it, ind) in departmentList" :key="ind" :label="it.title" :value="it.title"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职级：" prop="types">
          <el-input v-model="ruleForm.formOfEmployment"  placeholder="请输入职级" style="width: 193px;"></el-input>
        </el-form-item>
        <el-form-item label="公司地址：" prop="types">
          <el-input v-model="ruleForm.companyAddress" placeholder="请输入公司地址" style="width: 193px;"></el-input>
        </el-form-item>
        <el-form-item label="入职联系人：" prop="types">
          <el-input v-model="ruleForm.entryContact"  placeholder="请输入入职联系人" style="width: 193px;"></el-input>
        </el-form-item>
        <el-form-item label="联系人电话：" prop="types">
          <el-input v-model="ruleForm.contactTelephone" placeholder="请输入联系人电话" style="width: 193px;"></el-input>
        </el-form-item>
        <el-form-item label="聘用形式：" prop="types">
          <el-select v-model="ruleForm.formOfEmployment" placeholder="请选择聘用形式">
            <el-option label="正式" value="正式"></el-option>
            <el-option label="非正式" value="非正式"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="薪资：" prop="types">
          <el-input v-model="ruleForm.salary"  placeholder="请输入薪资" style="width: 193px;"></el-input>
        </el-form-item>
        <el-form-item label="试用期比例：" prop="types">
          <el-select v-model="ruleForm.trialPeriod" placeholder="请选择试用期比例">
            <el-option label="80%" value="80"></el-option>
            <el-option label="100%" value="100"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="其他福利" prop="evaluate">
          <el-input type="textarea" style="width: 400px;" placeholder="显示加班人填写的加班原因" v-model="ruleForm.otherBenefits"></el-input>
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
  import {employApproval, getPositionsList} from '@/api/hrm/recruitsApi'
  import {simpleList} from '@/api/base/organizations'

  export default {
    name: 'users-table-index',
    props: ['information'],
    data() {
      return {
        ruleForm: {},
        listDataes: {},
        departmentList: {}
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
        simpleList()
          .then(res => {
            this.departmentList = res.data
          })
          .catch(err => {
            this.$message.error(err)
          })
      },
      submitAct() {
        employApproval(this.ruleForm)
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
  .ExaminationApproval{
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
