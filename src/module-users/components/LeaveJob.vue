<template>
  <div class="AdjustThePost">
    <div class="infoBox">
      <div class="logo"><img src="./../../assets/img.jpeg" alt=""></div>
      <div class="info">
        <p><span class="name">{{ ruleForm.fullName }}</span></p>
        <p><span>部门：</span> {{ ruleForm.department }}      <span>岗位：</span> {{ ruleForm.post }} </p>
        <p><span>入职时间：</span> {{ ruleForm.timeOfEntry }} </p>
      </div>
    </div>
    <div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="申请类型：" prop="applicationType">
          <el-input v-model="ruleForm.applicationType" style="width: 220px;"></el-input>
        </el-form-item>
        <el-form-item label="请假类型：" prop="typeOfAskForLeave">
          <el-input v-model="ruleForm.typeOfAskForLeave" style="width: 220px;"></el-input>
        </el-form-item>
        <el-form-item label="申请单位：" prop="applicationUnit">
          <el-input v-model="ruleForm.applicationUnit" style="width: 220px;"></el-input>
        </el-form-item>
        <el-form-item label="开始时间：" prop="startTime">
          <el-date-picker v-model="ruleForm.startTime" type="date" placeholder="选择日期"> </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间：" prop="endTime">
          <el-date-picker v-model="ruleForm.endTime" type="date" placeholder="选择日期"> </el-date-picker>
        </el-form-item>
        <el-form-item label="请假时长：" prop="longTimeForLeave">
          <el-input v-model="ruleForm.longTimeForLeave" style="width: 220px;"></el-input>
        </el-form-item>
        <el-form-item label="请假统计：" prop="leaveStatistics">
          <el-input v-model="ruleForm.leaveStatistics" style="width: 220px;"></el-input>
        </el-form-item>
        <el-form-item label="申请原因：" prop="applicationReasons">
          <el-input type="textarea" style="width: 400px;" placeholder="显示请假人填写的请假原因" v-model="ruleForm.applicationReasons"></el-input>
        </el-form-item>
        <el-form-item label="图片：" prop="evaluate">
          点击查看
        </el-form-item>
        <div class="buttones" style="text-align: center;margin-top: 40px">
          <el-form-item>
            <el-button type="primary" >通过</el-button>
            <el-button type="primary" >驳回</el-button>
            <el-button type="primary" >撤销</el-button>
            <el-button type="primary" >转发</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { list } from '@/api/example/table'
  import { examineLeave } from '@/api/hrm/usersApi'

  export default {
    name: 'users-table-index',
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        timeValue: '',
        ruleForm: {},
        rules: {
          types: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ]
        }
      }
    },
    methods: {
      init () {
        examineLeave({})
          .then(res => {
            this.ruleForm = res.data
            console.log(res.data)
            this.loading = false
          })
          .catch(err => {
            console.log(err)
            this.loading = false
          })
      },
      handleRemove(file, fileList) {
        console.log(file, fileList)
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      }
    },
    mounted() {
      this.init()
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "./../../styles/variables";
  .AdjustThePost{
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
