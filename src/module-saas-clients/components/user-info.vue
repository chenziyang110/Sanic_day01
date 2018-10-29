<template>
  <div class="boxInfo">
    <!-- 表单内容 -->
    <div class="formInfo">
      <div>
        <div class="boxMain">
          <el-form ref="form" :model="formData" label-width="215px" label-position="right">
              <el-form-item class="formInfo" label="登录账号：">
                <el-input v-model="formData.loginAccount" class="inputW" disabled></el-input>
              </el-form-item>
              <el-form-item class="formInfo" label="登录密码：">
                <el-input v-model="formData.loginPassword" class="inputW"></el-input>
                <div class="infoTip">
                  <el-alert
                  title="如不修改密码请勿填写"
                  type="warning"
                  show-icon
                  :closable="false">
                </el-alert>
                </div>
              </el-form-item>
              <el-form-item class="formInfo" label="最后登录：">
                <el-input v-model="formData.lastLogIn" class="inputW" disabled></el-input>
              </el-form-item>
              <el-form-item class="formInfo" label="最后登录地点：">
                <el-input v-model="formData.lastLoginPlace" class="inputW" disabled></el-input>
              </el-form-item>
              <el-form-item class="formInfo" label="当前版本：">
                <el-input v-model="formData.currentVersion" class="inputW"></el-input>
              </el-form-item>
              <el-form-item class="formInfo" label="申请时间：">
                <el-input v-model="formData.dateOfRegistration" class="inputW" disabled></el-input>
              </el-form-item>
              <el-form-item class="formInfo" label="续期日期：">
                <el-input v-model="formData.renewalDate" class="inputW" disabled></el-input>
              </el-form-item>
              <el-form-item class="formInfo" label="结束时间：">
                <el-input v-model="formData.expirationDate" class="inputW" disabled></el-input>
              </el-form-item>
              <el-form-item class="formInfo" label="状态：">
                <el-switch
                  v-model="formData.state"
                  active-text="可用"
                  inactive-text="禁用" @change='handleState(formData.state)'>
                </el-switch>
              </el-form-item>
              <el-form-item class="formInfo" label="人工充值：">
                <el-input v-model="formData.artificialRenewal" class="inputW" placeholder="请输入金额"></el-input>
              </el-form-item>
              <el-form-item class="formInfo" label="备注：">
                <el-input type="textarea" v-model="formData.accountNotes" class="inputW" placeholder="请输入备注"></el-input>
              </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="saveData">保存更新</el-button>
          </div>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
import { sassDetail, reviewDetail } from '@/api/base/sassClients'
var _this = null
export default {
  name: 'userInfo',
  components: {},
  props: ['formData'],
  data() {
    return {}
  },
  methods: {
    // 业务方法
    // 界面交互
    // 表单提交
    handleState(state) {
      this.formData.state = state
    },
    saveData() {
      if (this.formData.state === true) {
        this.formData.state = '1'
      } else {
        this.formData.state = '0'
      }
      var data = {
        id: this.formData.id,
        remarks: this.formData.remarks,
        loginAccount: this.formData.loginAccount,
        loginPassword: this.formData.loginPassword,
        currentVersion: this.formData.currentVersion,
        state: this.formData.state,
        artificialRenewal: this.formData.artificialRenewal,
        accountNotes: this.formData.accountNotes
      }
      reviewDetail(data).then(() => {
        this.$message.success('恭喜你，保存成功')
        this.$emit('getObjInfo', this.formData)
      })
    }
  },
  // 挂载结束
  mounted: function() {},
  // 创建完毕状态
  created: function() {
    _this = this
    // this.getObjInfo()
  },
  // 组件更新
  updated: function() {
    if (this.formData.state === 1) {
      this.formData.state = true
    }
    if (this.formData.state === 0) {
      this.formData.state = false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.infoTip {
  width: 280px;
  display: inline-block;
  .el-alert {
    padding: 0px 8px;
  }
}
</style>
