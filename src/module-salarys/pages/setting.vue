<template>
  <div class="settingContent">
    <div class="settingTop">
      <div class="topLab" ><span @click="tabSwitch('launch')" :class="[tabLab == 'launch' ? 'act' : '']">计薪设置</span><span @click="tabSwitch('approvals')" :class="[tabLab == 'approvals' ? 'act' : '']">津贴设置</span></div>
    </div>
    <div class="content" v-show="tabLab == 'launch'">
      <el-form :label-position="labelPosition" label-width="140px" :model="formLabelAlign">
        <el-form-item label="对应社保自然月">
          <el-select v-model="formLabelAlign.name" style="width: 280px;">
            <el-option label="当月" value="shanghai"></el-option>
            <el-option label="次月" value="beijing"></el-option>
          </el-select>
          <ul><span>?</span><li>如果201606月工资中扣除2016年6月自然月的社保公积金，请选择当月；如果扣除2016年7月自然月的社保公积金，请选择次月。</li></ul>
        </el-form-item>
        <el-form-item label="社保数据来源" :disabled = "true" style="width: 450px;">
          <el-input v-model="formLabelAlign.region" placeholder = ""  style="width: 280px;"></el-input>
          <ul><span>?</span><li>计算工资时的五险一金金额将取自社保报表</li></ul>
        </el-form-item>
        <el-form-item label="考勤数据来源" :disabled = "true" style="width: 450px;">
          <el-input v-model="formLabelAlign.type" placeholder = ""  style="width: 280px;"></el-input>
          <ul><span>?</span><li>计算工资时的考勤数据将取自考勤统计表</li></ul>
        </el-form-item>
      </el-form>
    </div>
    <div class="content" v-show="tabLab == 'approvals'">
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="通用方案" prop="pass">
          <el-input type="password" v-model="ruleForm2.name" style="width: 400px;" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="checkPass">
          <el-input type="password" v-model="ruleForm2.name" style="width: 400px;" value = "适用于全体" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="津贴名称" prop="age" class="nameList">
          <p>
            <el-input placeholder = "交通补贴" style="width: 200px;"></el-input>
            <el-select v-model="value" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          <ul><span>?</span><li>{{ text }}</li></ul>
          <el-input v-model="input" placeholder="请输入内容" style="width: 200px;"></el-input>
          </p>
          <p>
            <el-input placeholder = "通讯补贴" style="width: 200px;"></el-input>
            <el-select v-model="value" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
            <ul><span>?</span><li>{{ text }}</li></ul>
            <el-input v-model="input" placeholder="请输入内容" style="width: 200px;"></el-input>
          </p>
          <p>
            <el-input placeholder = "午餐补贴" v-model.number="ruleForm2.name" style="width: 200px;"></el-input>
            <el-select v-model="value" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          <ul><span>?</span><li>{{ text }}</li></ul>
          <el-input v-model="input" placeholder="请输入内容" style="width: 200px;"></el-input>
          </p>
          <p>
            <el-input placeholder = "住房补助" style="width: 200px;"></el-input>
            <el-select v-model="value" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          <ul><span>?</span><li>{{ text }}</li></ul>
          <el-input v-model="input" placeholder="请输入内容" style="width: 200px;"></el-input>
          </p>
        </el-form-item>
        <el-form-item label="适用计税方式" prop="age">
          <template>
            <el-radio v-model="radio" label="1">税前</el-radio>
            <el-radio v-model="radio" label="2">税后</el-radio>
          </template>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--查看弹框-->
    <!--<el-dialog :title="topLabel" :visible.sync="centerDialogVisible" width="50%" left>-->

    <!--</el-dialog>-->
    <!--查看弹框-->
  </div>
</template>

<script>
  import { approvalsList } from '@/api/hrm/usersApi'

  export default {
    name: 'users-table-index',
    components: { },
    data() {
      return {
        centerDialogVisible: false,
        topLabel: 'launch',
        tabLab: 'launch',
        labelPosition: 'left',
        radio: '1',
        text: '每出勤日：金额*实际出勤天数； 每计薪日：金额*计薪天数； 每月固定：固定金额； 每月（按出勤日）：金额*实际出勤天数/应出勤工作日； 每月（按计薪日）：金额*计薪天数/计薪标准（如21.75）；',
        formLabelAlign: {
          name: '当月',
          region: '社保模块',
          type: '考勤模块'
        },
        ruleForm2: {
          name: ''
        }
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
      }
    },
    mounted() {
      this.init()
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "./../../styles/variables";
  .settingContent{
    padding: 20px;
    .settingTop{
      color:#666;
      background: #fff;
      border-bottom:solid 1px #ccc;
      line-height: 40px;
      span{
        display: inline-block;
        padding: 0 25px;
        font-size: 16px;
        cursor:pointer;
      }
      .act{
        color:$blue;
        border-bottom: solid 2px $blue;
      }
    }
    .content{
      background: #fff;
      padding: 20px;
      margin-top: 10px;
      ul{
        display: inline-block;
        position: relative;
        margin-left: 5px;
        margin-right: 5px;
        span{
          display: block;
          width: 15px;
          height: 15px;
          line-height: 15px;
          text-align: center;
          border:solid 1px #ccc;
          border-radius: 50%;
          color: #ccc;
          cursor:pointer;
        }
        li{
          display: none;
          position: absolute;
          background: #fdfdfd;
          width: 300px;
          left: -30px;
          top: 27px;
          border: solid 1px #ccc;
          line-height: 24px;
          padding:5px 10px;
          border-radius: 3px;
          z-index: 1;
        }
        li:after{
          content: '∧';
          position: absolute;
          left: 31px;
          top: -12px;
          background: #fdfdfd;
          color:#ccc;
          width: 10px;
          line-height: 14px;
        }
      }
      ul:hover li{
        cursor:pointer;
        display: block;
      }
      .nameList p{
        margin: 10px 0;
      }
    }
  }
</style>
