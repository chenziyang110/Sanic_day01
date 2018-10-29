<template>
  <div class="securitySetting">
    <div class="settingList">
      <div class="title">员工审批</div>
      <div class="set">
        <span>转正</span>
        <span><el-switch v-model="requestData.regular" @change="changeSet" active-color="#13ce66" :inactive-color="inactiveColor"></el-switch>
        </span>
        <i class="el-icon-setting"></i>
      </div>
      <div class="set">
        <span>离职</span>
        <span><el-switch v-model="requestData.quit" @change="changeSet" active-color="#13ce66" :inactive-color="inactiveColor"></el-switch>
        </span>
        <i @click="setFlow('quit')" class="el-icon-setting"></i>
      </div>
      <div class="set">
        <span>调岗</span>
        <span><el-switch v-model="requestData.adjust" @change="changeSet" active-color="#13ce66" :inactive-color="inactiveColor"></el-switch>
        </span>
        <i @click="setFlow('adjust')" class="el-icon-setting"></i>
      </div>
    </div>
    <div class="settingList">
      <div class="title">工资审批</div>
      <div class="set">
        <span>工资审批</span>
        <span><el-switch v-model="requestData.salarysApproval" @change="changeSet" active-color="#13ce66" :inactive-color="inactiveColor"></el-switch>
        </span>
        <i class="el-icon-setting"></i>
      </div>
    </div>
    <div class="settingList">
      <div class="title">考勤审批</div>
      <div class="set">
        <span>请假</span>
        <span><el-switch v-model="requestData.leave" @change="changeSet" active-color="#13ce66" :inactive-color="inactiveColor"></el-switch>
        </span>
        <i class="el-icon-setting"></i>
      </div>
      <div class="set">
        <span>加班</span>
        <span><el-switch v-model="requestData.overtime" @change="changeSet" active-color="#13ce66" :inactive-color="inactiveColor"></el-switch>
        </span>
        <i class="el-icon-setting"></i>
      </div>
    </div>
    <div class="settingList">
      <div class="title">招聘审批</div>
      <div class="set">
        <span>录用</span>
        <span><el-switch v-model="requestData.employment" @change="changeSet" active-color="#13ce66" :inactive-color="inactiveColor"></el-switch>
        </span>
        <i class="el-icon-setting"></i>
      </div>
    </div>
  </div>
</template>

<script>
  import { getSetState, saveSetState } from '@/api/hrm/approvalsApi'

  export default {
    name: 'users-table-index',
    components: { },
    data() {
      return {
        requestData: {},
        activeColor: '#13ce66',
        inactiveColor: '#ccc'
      }
    },
    methods: {
      init () {
        getSetState({id: 1})
          .then(res => {
            this.requestData = res.data
          })
          .catch(err => {
            this.$message.error(err)
            this.loading = false
          })
      },
      changeSet() {
        saveSetState(this.requestData)
          .then(res => {
            this.$message.success('设置保存成功！')
          })
          .catch(err => {
            this.$message.error(err)
            this.loading = false
          })
      },
      setFlow(obj) {
        console.log(obj)
      }
    },
    mounted() {
      this.init()
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "./../../styles/variables";
   $active: #13ce66;
   $inactive: #ccc;
  .securitySetting{
    padding: 20px;
    background: #fff;
    border-radius: 3px;
    margin: 15px;
    border: 1px solid #ebeef5;
    .settingList{
      margin-bottom: 20px;
      .title{
        font-weight: bold;
        line-height: 40px;
        margin-bottom: 20px;
        border-bottom: solid 1px #ccc;
      }
      .set{
        border: solid 1px #ccc;
        border-radius: 3px;
        padding: 15px 30px 15px 20px;
        position: relative;
        display: inline-block;
        margin-right: 20px;
        span:first-child{
          padding-right:15px;
          border-right: solid 1px #ccc;
          margin-right: 15px;
        }
        .el-icon-setting{
          position: absolute;
          right: 5px;
          top:5px;
          color:#999;
        }
      }
    }
  }
</style>
