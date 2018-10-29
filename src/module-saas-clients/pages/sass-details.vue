<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName" class="infoPosin">
          <el-tab-pane name="first" class="rInfo">
            <span slot="label">企业信息</span>
            <component v-bind:is="enterpriseInfo" :formData='formData' @getObjInfo='getObjInfo'></component>
            
          </el-tab-pane>
          <el-tab-pane name="second" class="rInfo">
            <span slot="label">账户信息</span>
            <component v-bind:is="userInfo" :formData='formData' @getObjInfo='getObjInfo' ref="userIn"></component>
          </el-tab-pane>
          <el-tab-pane name="three" class="rInfo">
            <span slot="label">交易记录</span>
            <component v-bind:is="transactionInfo" :formData='formData' @getObjInfo='getObjInfo'></component>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { minHeight } from '@/filters/index'
import { sassDetail } from '@/api/base/sassClients'
import enterpriseInfo from './../components/enterprise-info'
import userInfo from './../components/user-info'
import transactionInfo from './../components/transaction-info'
var _this = null
export default {
  name: 'employeesDetails',
  components: { enterpriseInfo, userInfo, transactionInfo },
  data() {
    return {
      enterpriseInfo: 'enterpriseInfo',
      userInfo: 'userInfo',
      transactionInfo: 'transactionInfo',
      activeName: 'first',
      activeSecond: 'two',
      userName: 'user',
      postName: 'post',
      printId: '',
      boxHeight: '',
      formData: {},
      dataList: []
    }
  },
  methods: {
    // 业务方法

    // 界面交互
    // 获取详情
    getObjInfo() {
      this.formData.id = this.$route.params.id
      sassDetail({ id: this.$route.params.id }).then(res => {
        this.formData = res.data
        // console.log(this.formData)
      })
    }
  },
  // 挂载结束
  mounted: function() {},
  // 创建完毕状态
  created: function() {
    _this = this
    this.printId = this.$route.params.id
    this.boxHeight = minHeight() // 右边内容高度
    this.getObjInfo()
  },
  // 组件更新
  updated: function() {}
}
</script>

<style rel="stylesheet/scss" lang="scss">
.el-tabs__content {
  overflow: initial;
}
.logInfo {
  width: 250px;
  float: right;

  h2 {
    margin: 0 0 0 20px;
    padding: 0 0 0 20px;
    height: 40px;
    line-height: 40px;
    border-bottom: 2px solid #e4e7ed;
    font-size: 14px;
    font-weight: normal;
  }
}
.logList {
  li {
    list-style: none;
    padding-left: 80px;
    .logRinfo {
      position: relative;
      padding: 25px 0 0;
      margin-left: 15px;
      .time {
        position: absolute;
        left: -100px;
        top: 25px;
      }
      .logContent {
        position: relative;
      }
      .logContent:before {
        content: '';
        width: 14px;
        height: 14px;
        display: block;
        border-radius: 50px;
        position: absolute;
        left: -24px;
        top: 0;
        z-index: 20;
        border: 1px solid #26a69a;
        background: #fff;
      }
    }
    .logRinfo:before {
      content: '';
      position: absolute;
      left: -18px;
      top: -15px;
      width: 2px;
      height: 40px;
      background-color: #e0e0e0;
    }
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
