<template>
  <div class="fixedDalary">
    <el-form :label-position="labelPosition" label-width="120px" :model="formLabelAlign">
      <el-form-item label="当前基本工资">
        <el-input v-model="formLabelAlign.name" placeholder="当前基本工资" style="width: 60%"></el-input>
      </el-form-item>
      <el-form-item label="当前岗位工资">
        <el-input v-model="formLabelAlign.region" placeholder="当前岗位工资" style="width: 60%"></el-input>
      </el-form-item>
      <el-form-item label="当前工资合计">
        <el-input v-model="formLabelAlign.type" placeholder="当前工资合计, 自动计算" style="width: 60%"></el-input>
      </el-form-item>
      <el-form-item label="转正基本工资">
        <el-input v-model="formLabelAlign.type" placeholder="转正基本工资" style="width: 60%"></el-input>
      </el-form-item>
      <el-form-item label="转正岗位工资">
        <el-input v-model="formLabelAlign.type" placeholder="转正岗位工资" style="width: 60%"></el-input>
      </el-form-item>
      <el-form-item label="转正工资合计">
        <el-input v-model="formLabelAlign.type" placeholder="当前基本工资, 自动计算" style="width: 60%"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认</el-button>
        <el-button>关闭</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { list } from '@/api/example/table'
  import { transferPosition } from '@/api/hrm/usersApi'

  export default {
    name: 'users-table-index',
    data() {
      return {
        labelPosition: 'left',
        formLabelAlign: []
      }
    },
    methods: {
      init () {
        transferPosition({})
          .then(res => {
            // this.ruleForm = res.data
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
  .fixedDalary{
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
    .Label{
      margin: 0 20px;
      color:#999;
    }
  }
</style>
