<template>
  <div class="add-form">
    <el-dialog :title="text+pageTitle" :visible.sync="dialogFormVisible">
      <el-form :rules="ruleInline" ref="dataForm" :model="formBase" label-position="left" label-width="120px" style='margin-left:120px; width:500px;'>
        <el-form-item label="姓名：" prop="fullName">
          <el-input v-model="formBase.fullName" placeholder='1-30个字符'></el-input>
          <!-- <textarea v-model="formBase.fullName" placeholder="字数不能大于30..." ref="count" @input='fontMaxlength(this,30)' class="inputText"></textarea> -->
          <div class="colRed" v-show="errorTip">字数不能大于30</div>
        </el-form-item>
        <el-form-item prop="mobilePhone">
          <span slot="label">
            <em class="colRed">*</em>手机：</span>
          +86&nbsp;<el-input v-model="formBase.mobilePhone" placeholder='请输入手机号' class="inputW"></el-input>
        </el-form-item>
        <el-form-item prop="entryTime">
          <span slot="label">
            <em class="colRed">*</em>入职时间：</span>
          <el-date-picker v-model="formBase.timeOfEntry" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="聘用形式：" prop="formOfEmployment">
          <el-select class="filter-item" v-model="formBase.formOfEmployment" @change='handleType'>
            <el-option v-for="item in baseData.hireType" :key="item.id" :label="item.value" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="informalType" v-show="typeShow">
          <span slot="label">非正式类型：</span>
          <el-select class="filter-item" v-model="formBase.informalType" @change='handleInformalType'>
            <el-option v-for="item in baseData.informaltype" :key="item.id" :label="item.value" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工号：">
          <el-input type="number" v-model="formBase.workNumber" placeholder="1-20个字符"></el-input>
          <!-- <textarea v-model="formBase.workNumber" placeholder="字数不能大于20..." ref="count" @input='fontMaxlength(this,20)' class="inputText"></textarea> -->
          <div class="colRed" v-show="errorTip">字数不能大于20</div>
        </el-form-item>
        <el-form-item label="部门：">
          <el-input
            placeholder="请选择"
            v-model="department"
            icon="caret-bottom"
            class="inputW"
            
            @click.native="isShowSelect = !isShowSelect">
          </el-input>
          <el-tree v-if="isShowSelect"
            :expand-on-click-node="false"
            :data="inspectionObjectOptions"
            :props="defaultProps"
            default-expand-all
              :filter-node-method="filterNode" 
            @node-click="handleNodeClick"
            class="objectTree"
            ref="tree2">
          </el-tree>
        </el-form-item>
        <el-form-item label="管理形式：">
          <!-- <el-input v-model="formBase.managementForm"></el-input> -->
          <el-select class="filter-item" v-model="formBase.formOfManagement">
            <el-option v-for="item in baseData.subjection" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工作城市：">
          <!-- <el-input v-model="formBase.workingCity" placeholder="请输入要搜索的城市"></el-input> -->
          <el-select class="filter-item" v-model="formBase.workingCity">
            <el-option v-for="(item, index) in cityList" :key="index" :label="item.title" :value="item.title"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="转正时间：">
          <el-date-picker v-model="formBase.correctionTime" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="createData">提交</el-button>
        <el-button @click="handleClose">{{$t('table.cancel')}}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { cityList } from '@/api/base/baseApi'
import { add, jobnumber } from '@/api/base/employees'
import { organList } from '@/api/base/organizations'
import { getStrleng } from './../../filters/index'
var _this = null
export default {
  name: 'add',
  props: [
    'text',
    'pageTitle',
    'PermissionGroupsList',
    'formBase',
    'ruleInline',
    'baseData'
  ],
  data() {
    return {
      dialogFormVisible: false,
      errorTip: false,
      informalShow: false,
      department: '',
      isShowSelect: false,
      inspectionObjectOptions: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      typeShow: false,
      formOfEmployment: '',
      cityList: []
    }
  },
  watch: {
    department(val) {
      this.$refs.tree2.filter(val)
    }
  },
  methods: {
    init() {
      // 城市列表获取
      cityList({})
        .then(res => {
          this.cityList = res.data
        })
        .catch(err => {
          this.$message.error(err)
        })
    },
    // 业务方法
    // 弹层显示
    dialogFormV() {
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
    fontMaxlength(obj, num) {
      var maxstrlen = num
      var str = _this.$refs.count.value // 对象的内容
      var myLen = getStrleng(str, maxstrlen) // 计算str的字符个数
      if (myLen > maxstrlen * 2) {
        _this.$refs.count.value = str.substring(0, num)
        this.errorTip = true
        return false
      } else {
        this.errorTip = false
      }
    },
    // 界面交互
    // 表单提交
    createData() {
      // console.log(this.formBase)
      this.formBase.formOfEmployment = this.formOfEmployment
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          add(this.formBase).then(() => {
            this.$emit('clearFormDate', this.formBase)
            this.formBase = {}
            this.$emit('doQuery', this.requestParameters)
          })
          this.dialogFormVisible = false
        } else {
          this.$message.error('*号为必填项!')
          return false
        }
      })
    },
    handleChick() {
      this.isShowSelect = true
    },
    handleNodeClick(data) {
      this.department = data.name
      this.baseData.department = this.department
      this.isShowSelect = false
    },
    filterNode(value, data) {
      if (!value) {
        return true
      } else {
        if (data.name !== null) {
          return data.name.indexOf(value) !== -1
        }
      }
    },
    handleType(obj) {
      if (obj.id === '1') {
        this.typeShow = false
        jobnumber({ hireType: obj.id }).then(res => {
          this.formOfEmployment = obj.id
          this.formBase.workNumber = res.data.jobNumber
        })
      }
      if (obj.id === '2') {
        this.typeShow = true
        this.formBase.workNumber = ''
      }
    },
    handleInformalType(obj) {
      jobnumber({ hireType: obj.id }).then(res => {
        this.formOfEmployment = obj.id
        this.formBase.workNumber = res.data.jobNumber
      })
    }
  },
  // 挂载结束
  mounted: function() {},
  // 创建完毕状态
  created: function() {
    _this = this
    this.init()
    organList().then(ret => {
      this.inspectionObjectOptions.push(ret.data.items)
    })
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
.objectTree > div:first-child.el-tree-node > div:first-child {
  display: none;
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.objectTree{
  position: absolute;
  width:300px;
  z-index:999;
  border: 1px solid #dddee1;
  left: 0;
  border-radius: 5px;
}
</style>
