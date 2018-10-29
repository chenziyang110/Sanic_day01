<template>
  <div class="myInfo">
    <div class="myInfoTop">
      <div class="topLab" ><span class="act">个人信息</span></div>
    </div>
    <div class="myInfoCont">
      <div class="myInfoPic"><img src="./../../assets/img.jpeg" width="100" alt=""></div>
      <div>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="姓名" style="width: 300px;">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="手机号"  style="width: 300px;">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="最高学历">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="本科" value="shanghai"></el-option>
              <el-option label="专科" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="form.sex" placeholder="请选择活动区域">
              <el-option label="男" value="shanghai"></el-option>
              <el-option label="女" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出身日期">
            <el-date-picker
              v-model="form.time"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import {list} from '@/api/example/table'
  export default {
    name: 'users-table-index',
    components: {},
    data() {
      return {
        form: {
          name: '张三',
          phone: '15116921204',
          region: '本科',
          sex: '男'
        }
      }
    },
    methods: {
      onSubmit() {
        console.log(2345678)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "./../../styles/variables";
  .myInfo{
    padding:15px;
    .myInfoTop{
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
        color:$green;
        border-bottom: solid 2px $green;
      }
    }
    .myInfoCont{
      background: #fff;
      display: flex;
      padding: 20px;
      .myInfoPic{
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border:solid 1px #ccc;
        margin-right: 40px;
        img{
          width: 100px;
          height: 100px;
        }
      }
      div:last-child{
        flex: 1;
      }
    }
  }
</style>
