<template>
  <div class="add-form">
    
    <el-dialog title="转正" :visible.sync="dialogFormVisible">
      <div class="leaveInfo">
        <el-row>
          <el-col :span="4">
              <!-- 头像 -->
              <component v-bind:is="userHead" :headImg="objInfoDataes.headPortrait"></component>
          </el-col>
          <el-col :span="20">
            <div class="headInfo">
              <p><strong>{{objInfoDataes.fullName}}</strong></p>
              <p><span>手机</span><em>{{objInfoDataes.mobilePhone}}</em><span>部门</span><em>{{objInfoDataes.department}}</em></p>
              <p><span>入职时间</span><em>{{objInfoDataes.timeOfEntry}}</em></p>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-form :rules="ruleInline" ref="dataForm" :model="formData" label-position="right" label-width="120px" style='margin-left:120px; width:500px;'>
        
        <el-form-item label="转正时间：" prop="dateOfCorrection">
          <el-date-picker v-model="formData.dateOfCorrection" value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="转正评价：">
          <el-input v-model="formData.correctionEvaluation" type='textarea' placeholder="请输入要搜索的城市"></el-input>
        </el-form-item>
        <el-form-item label="附件">
          <component v-bind:is="fileUpload" ref="positive" :formData.sync='formData' :formBase='formData' :positiveText='positiveText' >
        </component>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="formBtn">提交</el-button>
        <el-button @click="handleClose">{{$t('table.cancel')}}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { imgHandle } from '@/filters/index'
import { imgDownload } from '@/api/base/baseApi'
import { positive, positiveDetail } from '@/api/base/employees'
import fileUpload from './upload'
import userHead from './component/user-head.vue'
var _this = null
export default {
  name: 'upload',
  components: {
    fileUpload,
    userHead
  },
  props: ['formBase', 'objInfoDataes'],
  data() {
    return {
      fileUpload: 'fileUpload',
      userHead: 'userHead',
      dialogFormVisible: false,
      errorTip: false,
      informalShow: false,
      positiveId: '',
      positiveText: 5,
      formData: {
        enclosure: '', // 附件
        dateOfCorrection: '', // 转正时间
        correctionEvaluation: '' // 转正评价
      },
      fileList: [],
      ruleInline: {
        dateOfCorrection: [
          {
            required: true,
            message: '请选择入职时间',
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    // 业务方法
    // 弹层显示
    dialogFormV(id) {
      this.positiveId = id

      this.dialogFormVisible = true
    },
    // 弹层隐藏
    dialogFormH() {
      this.dialogFormVisible = false
    },
    // 退出
    handleClose() {
      this.$emit('handleCloseModal')
      this.$emit('clearFormDate')
    },
    // 界面交互
    // 表单提交
    formBtn() {
      this.formData.id = this.formBase.positiveId
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.formData.enclosure = this.$refs.positive.positiveList.join(',')
          positive(this.formData)
            .then(() => {
              this.$message.success('转正成功！')
              this.$emit('newDataes', this.formData)
              this.formData = {}
              this.formData.enclosure = ''
            })
            .catch(res => {
              this.$message.error(res)
            })
          this.dialogFormVisible = false
        } else {
          this.$message.error('*号为必填项!')
          return false
        }
      })
    },
    // 图片下载
    fillDownload(fid) {
      imgDownload({ id: fid }).then(res => {
        this.fileList = [{ name: 'img', url: imgHandle(res.data) }]
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
  updated: function() {}
}
</script>

<style rel="stylesheet/scss" lang="scss">
.inputText {
  width: 400px;
  height: 32px;
  resize: none;
  line-height: 22px;
  overflow: hidden;
  font-size: 12px;
  border: 1px solid #dddee1;
  padding: 4px 7px;
  border-radius: 5px;
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.upload-list {
  padding: 0;
  margin: 0;
  li {
    list-style: none;
  }
}
</style>
