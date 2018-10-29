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
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item label="申请类型：" prop="type">
          <el-input v-model="ruleForm.type" style="width: 220px;"></el-input>
        </el-form-item>
        <el-form-item label="聘用形式：" prop="formOfEmployment">
          <el-input v-model="ruleForm.formOfEmployment" style="width: 220px;"></el-input>
        </el-form-item>
        <el-form-item label="转正状态：" prop="stateOfCorrection">
          <el-input v-model="ruleForm.stateOfCorrection" style="width: 220px;"></el-input>
        </el-form-item>
        <el-form-item label="期望离职时间：" prop="expectedDepartureTime">
          <el-date-picker v-model="ruleForm.expectedDepartureTime" type="date" placeholder="选择日期"> </el-date-picker>
        </el-form-item>
        <el-form-item label="离职原因：" prop="reasonsForLeaving">
          <el-input type="textarea" style="width: 400px;" placeholder="显示提交人填写的离职原因" v-model="ruleForm.reasonsForLeaving"></el-input>
        </el-form-item>
        <el-form-item label="图片："><img src="./../../assets/404_images/404.png" width="300" alt=""> </el-form-item>
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
  import { userDimission } from '@/api/hrm/usersApi'

  export default {
    name: 'users-table-index',
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        timeValue: '',
        ruleForm: {
        },
        rules: {
          types: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          timeValue: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          evaluate: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init () {
        userDimission({})
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
