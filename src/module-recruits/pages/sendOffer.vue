<template>
  <div class="sendOffer">
    <div class="infoBox">
      <div class="logo"><img src="../../assets/img.jpeg" alt=""></div>
      <div class="info">
        <p><span class="name">{{ information.fullName }}</span></p>
        <p><span>手机：</span> {{ information.phoneNumber }}
        <p><span>邮箱：</span> {{ information.email }} </p>
      </div>
    </div>
    <div>
      <el-form :model="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item label="抄送邮件：" prop="types">
          <el-input v-model="ruleForm.mailbox" placeholder="请输入抄送邮件" style="width: 193px;"></el-input>
        </el-form-item>
        <el-form-item label="密送邮件：" prop="types">
          <el-input v-model="ruleForm.sendAMailbox" placeholder="请输入密送邮件" style="width: 193px;"></el-input>
        </el-form-item>
        <el-form-item label="offer 有效期：" prop="types">
          <el-input v-model="ruleForm.offerValidityPeriod" placeholder="请输入公司地址" style="width: 193px;"></el-input> 天
        </el-form-item>
        <el-form-item label="报道时间：" prop="types">
          <el-date-picker v-model="ruleForm.reportingTime" type="date" style="width: 193px;" placeholder="选择日期"> </el-date-picker>
        </el-form-item>
        <el-form-item label="试用期：" prop="types">
          <el-input v-model="ruleForm.probationPeriod" placeholder="请输入公司地址" style="width: 193px;"></el-input>
        </el-form-item>
        <el-form-item label="入职岗位：" prop="types">
          <el-select v-model="ruleForm.post" placeholder="请选择入职岗位">
            <el-option v-for="(it, ind) in listDataes" :key="ind" :label="it.postName" :value="it.postName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入职部门：" prop="types">
          <el-select v-model="ruleForm.entryDepartment" placeholder="请选择入职岗位">
            <el-option v-for="(it, ind) in departmentList" :key="ind" :label="it.title" :value="it.title"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职级：" prop="types">
          <el-input v-model="ruleForm.rank"  placeholder="请输入职级" style="width: 193px;"></el-input>
        </el-form-item>
        <el-form-item label="公司地址：" prop="types">
          <el-input v-model="ruleForm.companyAddress"  placeholder="请输入入职联系人" style="width: 193px;"></el-input>
        </el-form-item>
        <el-form-item label="入职联系人：" prop="types">
          <el-input v-model="ruleForm.entryContact"  placeholder="请输入入职联系人" style="width: 193px;"></el-input>
        </el-form-item>
        <el-form-item label="联系人电话：" prop="types">
          <el-input v-model="ruleForm.contactTelephone"  placeholder="请输入入职联系人" style="width: 193px;"></el-input>
        </el-form-item>
        <el-form-item label="聘用形式：" prop="types">
          <el-select v-model="ruleForm.formOfEmployment" placeholder="请选择入职岗位">
            <el-option label="正式" value="正式"></el-option>
            <el-option label="非正式" value="非正式"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="薪资：" prop="types">
          <el-input v-model="ruleForm.salary" placeholder="请输入联系人电话" style="width: 193px;"></el-input>
        </el-form-item>
        <el-form-item label="试用期比例：" prop="types">
          <el-select v-model="ruleForm.trialPeriodProportion" placeholder="请选择试用期比例">
            <el-option label="70%" value="80"></el-option>
            <el-option label="80%" value="80"></el-option>
            <el-option label="100%" value="100"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="其他福利：" prop="types">
          <el-input v-model="ruleForm.otherBenefits" type="textarea" placeholder="请输入联系人电话" style="width: 333px;"></el-input>
        </el-form-item>
        <div class="buttones" style="text-align: center;margin-top: 40px">
          <el-form-item>
            <el-button type="primary" @click="submitAct()" >发送 offer</el-button>
            <el-button type="primary" @click="cancel()">取消</el-button>
            <span class="offerSee" @click="offerPreview">预览 offer</span>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <!-- 简历预览 -->
    <el-dialog title="发送 offer" :visible.sync="dialogFormVisible">
      <PreviewOffer :dataes = "ruleForm" v-on:cancel = "cancel"/>
    </el-dialog>
  </div>
</template>

<script>
  import {employApproval, getPositionsList} from '@/api/hrm/recruitsApi'
  import {simpleList} from '@/api/base/organizations'
  import PreviewOffer from '../components/PreviewOffer'
  export default {
    name: 'users-table-index',
    components: {PreviewOffer},
    data() {
      return {
        dialogFormVisible: false,
        dialogImageUrl: '',
        timeValue: '',
        ruleForm: {},
        departmentList: {},
        listDataes: {},
        information: {
          fullName: '',
          phoneNumber: '',
          email: ''
        },
        rules: {
        }
      }
    },
    methods: {
      init() {
        this.information = this.$route.query
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
      offerPreview() {
        this.dialogFormVisible = true
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
        this.dialogFormVisible = false
      }
    },
    mounted() {
      this.init()
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../styles/variables";
  .sendOffer{
    margin: 20px;
    padding: 15px;
    background: #fff;
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
    .offerSee{
      position: relative;
      margin-left: 10px;
      cursor: pointer;
    }
  }
</style>
