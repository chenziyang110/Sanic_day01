<template>
  <div class="add-form">
    <el-dialog :title="treeBase.text" :visible.sync="dialogFormVisible">
      <el-form :rules="ruleInline" ref="dataForm" :model="formData" label-position="left" label-width="120px" style='margin-left:120px; width:500px;'>
        <el-form-item prop="name">
          <span slot="label">部门名称</span>
          <el-input v-model="formData.name" placeholder='字数不能大于50...' @input.native='fontMaxlength(this,50,1)' ref="count1"></el-input>
          <!-- <el-input v-model="formData.name" placeholder='字数不能大于50...' ref="count1"></el-input> -->
          <!-- <div></div> -->
          <!-- <input name="name" placeholder="请输入项目名称，字数不能大于20..." v-model="formData.name" class="inputText" @input='fontMaxlength(this,20)' ref="count"></input> -->
          <div class="colRed">{{errorTip}}</div>
        </el-form-item>
        <el-form-item prop="code">
          <span slot="label">部门编码</span>
          <el-input v-model="formData.code" placeholder='请输入编码'></el-input>
        </el-form-item>
        <el-form-item prop="category">
          <span slot="label">部门类别</span>
          <el-input v-model="formData.category" placeholder='请输入类别' disabled=""></el-input>
        </el-form-item>

        <el-form-item prop="personInCharge">
          <span slot="label">部门负责人</span>
          <el-select class="filter-item" v-model="formData.personInCharge" @focus="handleCharge">
            <el-option v-for="item in dateList" :key="item.fullName" :label="item.fullName" :value="item.fullName">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <span slot="label">部门城市</span>
          <el-select class="filter-item" v-model="formData.city" @focus="handleCity">
            <el-option v-for="(item, index) in cityList" :key="index" :label="item.title" :value="item.title"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="introduce">
          <span slot="label">部门介绍</span>
          <el-input v-model="formData.introduce" placeholder='字数不能大于300...' @input.native='fontMaxlength(this,300,2)' ref="count2"></el-input>
          <div class="colRed">{{errorTip2}}</div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="createData">确定</el-button>
        <el-button @click="handleClose">取消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { add, update, detail, organList } from '@/api/base/organizations'
import { employeesSimpleList } from '@/api/base/employees'
import { cityList } from '@/api/base/baseApi'
import constantApi from '@/api/base/constant'
import { getStrleng } from './../../filters/index'
var _this = null
export default {
  name: 'add',
  props: ['treeBase'],
  data() {
    return {
      baseData: [],
      pageTitle: '添加部门', // 页面标题
      dialogFormVisible: false,
      errorTip: '',
      errorTip2: '',
      ruleInline: {
        // 表单验证
        name: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '编码不能为空', trigger: 'blur' }],
        category: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ]
      },
      formData: {
        name: '', // 部门名称
        // parentId: '',
        code: '', // 部门编码
        category: '部门', // 部门类别
        personInCharge: '', // 部分负责人
        city: '', // 城市
        introduce: '' // 介绍
      },
      parentId: '',
      dateList: [],
      cityList: [],
      number: ''
    }
  },
  methods: {
    // 业务方法
    // 初始化数据
    init() {
      this.baseData = constantApi
    },
    cityInfo() {
      cityList({})
        .then(res => {
          this.cityList = res.data
        })
        .catch(err => {
          this.$message.error(err)
        })
    },
    getObjInfo(Id) {
      detail({ id: this.parentId }).then(res => {
        this.formData.parentId = res.data.parentId
        this.formData.name = res.data.departmentName
        this.formData.code = res.data.departmentCode
        this.formData.category = res.data.departmentCategory
        this.formData.personInCharge = res.data.departmentHeads
        this.formData.city = res.data.departmentCity
        this.formData.introduce = res.data.departmentIntroduction
      })
    },
    getSimpleList() {
      employeesSimpleList().then(ret => {
        this.dateList = ret.data.items
      })
    },
    fontMaxlength(obj, num, name) {
      if (name === 1) {
        var str = this.$refs.count1.value // 对象的内容
        var myLen = getStrleng(str, num) // 计算str的字符个数
        if (myLen > num * 2) {
          this.$refs.count1.value = str.substring(0, num)
          this.errorTip = '项目名称不能超过50字'
          return false
        } else {
          this.errorTip = ''
          return true
        }
      }
      if (name === 2) {
        var strs = this.$refs.count2.value // 对象的内容
        var myLens = getStrleng(strs, num) // 计算strs的字符个数
        if (myLens > num * 2) {
          this.$refs.count2.value = strs.substring(0, num)
          this.errorTip2 = '部门介绍不能超过300字'
          return false
        } else {
          this.errorTip2 = ''
          return true
        }
      }
    },
    getObj(params) {
      organList().then(data => {})
    },
    // 表单提交
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          if (this.treeBase.text === '编辑部门') {
            this.formData.id = this.parentId
            update(this.formData)
              .then(res => {
                location.reload()
                this.$message.success('恭喜你，部门修改成功')
                this.handleClose()
              })
              .catch(err => {
                if (err) {
                  this.$message.error(err)
                }
              })
          } else {
            // this.formData.parentId = this.parentId
            if (this.number === 2) {
              this.$set(this.formData, 'parentId', this.parentId)
            } else {
              this.$set(this.formData, 'parentId', '')
            }
            add(this.formData)
              .then(res => {
                this.$message.success('恭喜你，部门添加成功')
                location.reload()
                this.handleClose()
              })
              .catch(err => {
                if (err) {
                  this.$message.error(err)
                }
              })
          }
        } else {
          this.$Message.error('*号为必填项!')
        }
      })
    },
    // 界面交互
    // 弹层显示
    dialogFormV(Id, num) {
      this.parentId = Id
      this.number = num
      this.dialogFormVisible = true
    },
    // 弹层隐藏
    dialogFormH() {
      this.dialogFormVisible = false
    },
    // 退出
    handleClose() {
      this.dialogFormH()
      this.formData = {}
    },
    handleCharge() {
      this.getSimpleList()
    },
    handleCity() {
      this.cityInfo()
    }
  },
  // 挂载结束
  mounted: function() {},
  // 创建完毕状态
  created: function() {
    _this = this
    this.init()
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
.el-form-item.is-error .el-input__inner {
  border-color: #dddee1;
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
