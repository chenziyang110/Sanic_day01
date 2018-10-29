<template>
  <div class="boxInfo">
    <!-- 表单内容 -->
    <div class="formInfo">
      <div>
        <div class="boxMain">
          <el-form ref="form" :model="formData" label-width="215px" label-position="right">
              <el-form-item class="formInfo" label="公司名称：">
                <el-input v-model="formData.corporateName" class="inputW" disabled></el-input>
              </el-form-item>
              <el-form-item class="formInfo" label="公司地区：">
                <el-input v-model="formData.companyArea" class="inputW" disabled></el-input>
              </el-form-item>
              <el-form-item class="formInfo" label="公司地址：">
                <el-input v-model="formData.companyAddress" class="inputW" disabled></el-input>
              </el-form-item>
              <el-form-item class="formInfo" label="审核状态：">
                <el-input v-model="formData.auditState" class="inputW" disabled></el-input>
              </el-form-item>
              <el-form-item class="formInfo" label="营业执照：">
                <span v-for="item in fileList" :key='item.id' class="fileImg">
                  <img :src="item.url">
                </span>
              </el-form-item>
              <el-form-item class="formInfo" label="法人代表：">
                <el-input v-model="formData.legalRepresentative" class="inputW" disabled></el-input>
              </el-form-item>
              <el-form-item class="formInfo" label="公司电话：">
                <el-input v-model="formData.companyPhone" class="inputW" disabled></el-input>
              </el-form-item>
              <el-form-item class="formInfo" label="邮箱：">
                <el-input v-model="formData.mailbox" class="inputW" disabled></el-input>
              </el-form-item>
              <el-form-item class="formInfo" label="公司规模：">
                <el-input v-model="formData.companySize" class="inputW" disabled></el-input>
              </el-form-item>
              <el-form-item class="formInfo" label="所属行业：">
                <el-input v-model="formData.industry" class="inputW" disabled></el-input>
              </el-form-item>
              <el-form-item class="formInfo" label="备注：">
                <el-input type="textarea" v-model="formData.remarks" class="inputW"></el-input>
              </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handleSub('1')">审核</el-button>
            <el-button @click="handleSub('2')">拒绝</el-button>
            
          </div>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
import { auditDetail } from '@/api/base/sassClients'
import { imgDownload } from '@/api/base/baseApi'
var _this = null
export default {
  name: 'userInfo',
  components: {},
  props: ['formData'],
  data() {
    return {
      fileList: []
    }
  },
  methods: {
    // 业务方法
    // 界面交互
    handleSub(state) {
      auditDetail({
        id: this.formData.id,
        remarks: this.formData.remarks,
        state: state
      }).then(() => {
        if (state === '1') {
          this.$message.success('恭喜你，审核成功！')
        }
        if (state === '2') {
          this.$message.success('已拒绝审核！')
        }

        this.$emit('getObjInfo', this.formData)
      })
    },
    // 图片 blob 流转化为可用 src
    imgHandle(obj) {
      return window.URL.createObjectURL(obj)
    },
    // 图片下载
    fillDownload(fid) {
      imgDownload({ id: fid }).then(res => {
        this.fileList = [{name: 'img', url: this.imgHandle(res.data)}]
        console.log(this.fileList)
      })
    }
  },
  // 挂载结束
  mounted: function() {},
  // 创建完毕状态
  created: function() {
    _this = this
  },
  // 组件更新
  updated: function() {
    // this.imgDownInfo()
    if (
      this.formData.businessLicense !== null
    ) {
      this.fillDownload(this.formData.businessLicense)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.fileImg{
  img{
    width:20%;
  }
}
</style>
