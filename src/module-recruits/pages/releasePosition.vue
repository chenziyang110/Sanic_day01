<template>
  <div class="releasePosition">
    <div class="title">
      发布职位
    </div>
    <div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="职位名称：" prop="positionName" style="width:290px">
          <el-input v-model="ruleForm.positionName"  placeholder="请输入职位名称"></el-input>
        </el-form-item>
        <el-form-item label="职位描述：" prop="jobDescription" style="width:290px">
          <el-input type="textarea" v-model="ruleForm.jobDescription"  placeholder="请输入职位描述"></el-input>
        </el-form-item>
        <el-form-item label="聘用形式：" prop="formOfEmployment">
          <el-select v-model="ruleForm.formOfEmployment" placeholder="请选择活动区域">
            <el-option label="正式" value="正式"></el-option>
            <el-option label="非正式" value="非正式"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="要求部门：" prop="demandSector">
          <el-select v-model="ruleForm.demandSector" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职位亮点：" prop="jobDescription"  style="width:290px">
          <el-input v-model="ruleForm.jobDescription"  placeholder="请输入职位亮点"></el-input>
        </el-form-item>
        <el-form-item label="薪酬范围：" prop="salaryRange">
          <el-select v-model="ruleForm.salaryRange" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工作经验：" prop="handsOnBackground">
          <el-select v-model="ruleForm.handsOnBackground" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学历要求：" prop="educationalRequirements">
          <el-select v-model="ruleForm.educationalRequirements" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工作城市：" prop="workingCity">
          <el-select v-model="ruleForm.workingCity" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="紧急程度" >
          <el-switch v-model="ruleForm.delivery"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          <el-button @click="resetForm('ruleForm')">关闭</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {addPosition} from '@/api/hrm/recruitsApi'

  export default {
    name: 'releasePosition',
    data() {
      return {
        ruleForm: {
          positionName: '',
          jobDescription: '',
          formOfEmployment: '',
          demandSector: '',
          salaryRange: '',
          handsOnBackground: '',
          educationalRequirements: '',
          emergencyDegree: ''
        },
        rules: {
          positionName: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          formOfEmployment: [
            { required: true, message: '请选择部门需求', trigger: 'change' }
          ],
          jobDescription: [
            { required: true, message: '请填写职位亮点', trigger: 'blur' }
          ],
          demandSector: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          salaryRange: [
            { required: true, message: '请选择薪酬范围', trigger: 'change' }
          ],
          handsOnBackground: [
            { required: true, message: '请选择工作经验', trigger: 'change' }
          ],
          educationalRequirements: [
            { required: true, message: '请选择学历要求', trigger: 'change' }
          ],
          workingCity: [
            { required: true, message: '请选择工作城市', trigger: 'change' }
          ],
          emergencyDegree: [
            { required: true, message: '请选择学历要求', trigger: 'change' }
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            addPosition(this.ruleForm)
              .then(res => {
                this.$message.success('数据提交成功！')
              })
              .catch(err => {
                this.$message.error(err)
              })
          } else {
            this.$message.error('error submit!!')
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    },
    mounted() {

    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "./../../styles/variables";
  .releasePosition {
    margin: 15px;
    background: #fff;
    padding: 25px;
    .title{
      font-weight: bold;
      font-size: 16px;
      line-height: 40px;
      margin-bottom: 20px;
      border-bottom: solid 1px #ccc;
    }
  }
</style>
