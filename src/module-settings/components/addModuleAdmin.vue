<template>
  <div class="addModuleAdmin">
    <div class="top-lable">
      <div class="tips"> <i class="el-icon-info"></i>模块管理员是管理整个模块的管理员，开启模块权限后即可查看当前模块的所有内容</div>
      <div class="">
        <el-form ref="form" :model="data" label-width="90px" :label-position="labelPosition">
          <div class="formTopList">
            <el-form-item label="管理员名称" >
              <el-input v-model="administratorName" style="width: 193px;" placeholder = "请输入管理员姓名"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
              <el-select v-model="fullName" @change="nameChang" :disabled="disabled" filterable placeholder="请输入姓名">
                <el-option v-for="item in nameListes" :key="item.id" :label="item.fullName" :value="item"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="cellPhoneNumber" :disabled="true" style="width: 193px" placeholder = "请输入手机号"></el-input>
            </el-form-item>
          </div>
          <el-form-item label="管理模块">
              <el-checkbox-group v-model="managementModulelist">
                <el-checkbox v-for="(item, index) in managementModules" :key="index" :label="item.value"></el-checkbox>
              </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">确定</el-button>
            <el-button @click = cancel>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import { addAdmin, changeAdmin, getEmployees, adminList } from '@/api/hrm/settingApi'
  import setConstant from '@/api/constant/settings'

  export default {
    name: 'pageToolScoial',
    props: ['data', 'action'],
    data() {
      return {
        labelPosition: 'left',
        disabled: false,
        administratorName: '',
        fullName: '',
        cellPhoneNumber: '',
        nameListes: '',
        managementModulelist: [],
        fid: '',
        userId: ''
      }
    },
    computed: {
      managementModules: () => setConstant.systemModules
    },
    watch: {
      data: {
        handler(newValue, oldValue) {
          this.setList(newValue)
        },
        deep: true
      },
      action: (newValue) => {
        newValue === 1 ? this.disabled = true : this.disabled = false
      }
    },
    methods: {
      init() {
        this.setList(this.data)
        getEmployees({})
          .then(res => {
            this.nameListes = res.data.items
          })
          .catch(err => {
            console.log(err)
          })
      },
      nameChang(obj) {
        adminList()
          .then((res) => {
            let lab = true
            res.data.items.forEach((n) => {
              if (n.cellPhoneNumber === obj.mobile) {
                this.$message.error('本人已存在管理权限，无法继续添加')
                this.fullName = ''
                this.cellPhoneNumber = ''
                lab = false
                return false
              }
            })
            if (lab) {
              this.userId = obj.id
              this.fullName = obj.fullName
              this.cellPhoneNumber = obj.mobile
            }
          })
          .catch((err) => {
            console.log(err)
          })
      },
      setList(obj) {
        this.administratorName = obj.administratorName
        this.fullName = obj.fullName
        this.userId = obj.userID
        this.fid = obj.id
        this.cellPhoneNumber = obj.cellPhoneNumber
        if (obj.managementModule) {
          this.managementModulelist = obj.managementModule
        }
      },
      clearData() {
          this.administratorName = ''
          this.fullName = ''
          this.cellPhoneNumber = ''
          this.managementModulelist = ''
      },
      onSubmit() {
        let dataes = {managementModule: []}
        dataes.id = this.fid
        dataes.administratorName = this.administratorName
        dataes.userID = this.userId
        this.managementModules.forEach((n) => {
          for (let i = 0; i < this.managementModulelist.length; i++) {
            if (this.managementModulelist[i] === n.value) {
              dataes.managementModule.push(n.id)
            }
          }
        })

        if (this.action === '0') {
          addAdmin(dataes)
            .then(res => {
              this.clearData()
              this.$emit('openModule', this.data)
            })
            .catch(err => {
              this.$message.error(err)
              this.loading = false
            })
        } else if (this.action === '1') {
          changeAdmin(dataes)
            .then(res => {
              this.clearData()
              this.$emit('openModule', this.data)
              this.$message.success('数据修改成功！')
            })
            .catch(err => {
              this.$message.error(err)
              this.loading = false
            })
        }
      },
      cancel(obj) {
        this.$emit('openModule', 'open')
      }
    },
    mounted() {
      this.init()
    }
  }
</script>
<style>
  .el-checkbox {
    margin-right: 20px;
    margin-left: 0 !important;
  }
  .el-message-box{
    width: 45%;
    max-width: 800px;
  }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import './../../styles/variables.scss';
  .addModuleAdmin {
    padding: 20px;
    background: #fff;
    border-radius: 3px;
    .tips{
      background: #f4f4f4;
      color:#666;
      margin: 10px 0;
      padding: 0 10px;
      line-height: 30px;
      i{margin-right: 5px;position: relative;top:1px;color:$orange}
    }
    .formTopList{
      margin-bottom:10px;
      padding-bottom: 10px;
      border-bottom: solid 1px #ccc;
    }
  }
</style>
