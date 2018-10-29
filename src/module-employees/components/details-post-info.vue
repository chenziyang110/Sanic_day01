<template>
  <div class="boxInfo">
    <!-- 表单内容 -->
    <div class="formInfo">
      <div>
        <!-- 头部信息  -->
        <el-form ref="formData" :model="formData" label-width="215px" label-position="right">
        <div class="userInfo">
             <div class="headInfo clearfix">
               <div class="fl">
                 <!-- 头像 -->
                  <component v-bind:is="userHead" :headImg="headImg"></component>
               </div>
               <div class="headText">
                 <el-row>
                    <el-col :span="12">
                       <span class="textR">姓名：</span>
                       <el-input v-model="formData.fullName" placeholder="请输入" class="inputW"></el-input>
                    </el-col>
                    <el-col :span="12">
                       <span class="textR">入职日期：</span>
                       <el-date-picker
                          v-model="formData.dateOfEntry"
                          type="date"
                          placeholder="选择日期"
                          value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-col>
                  </el-row>
                  <el-row style="overflow: initial">
                    <el-col :span="12">
                       <span class="textR">部门：</span>
                      <el-input
                          placeholder="请选择"
                          v-model="department"
                          icon="caret-bottom"
                          class="inputW"
                          
                          @click.native="isShowSelect = !isShowSelect">
                        </el-input>
                        <el-tree v-if="isShowSelect"
                          :expand-on-click-node="false"
                          :data="simpleData"
                          :props="defaultProps"
                          default-expand-all
                            :filter-node-method="filterNode" 
                          @node-click="handleNodeClick"
                          class="objectTree"
                          ref="tree2">
                        </el-tree>
                    </el-col>
                    <el-col :span="12">
                       <span class="textR">岗位：</span>
                       <el-input v-model="formData.post" placeholder="请输入" class="inputW"></el-input>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                       <span class="textR">工作邮箱：</span>
                       <el-input v-model="formData.workMailbox" placeholder="请输入" class="inputW"></el-input>
                    </el-col>
                    <el-col :span="12">
                       <span class="textR">工号：</span>
                       <el-input v-model="formData.workNumber" placeholder="请输入" class="inputW"></el-input>
                    </el-col>
                  </el-row>
               </div>
             </div>
        </div>
        <!-- 头部信息 end  -->
        <div class="boxMain">
            <!-- <div class="step">
              <left-step :steps="steps"></left-step>
            </div> -->
              <div class="mainInfo">
                <el-form-item class="formInfo" label="转正日期：">
                  <el-date-picker
                    v-model="formData.dateOfCorrection"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                </el-form-item>
                <el-form-item class="formInfo" label="转正状态(正式)：">
                  <el-select v-model="formData.stateOfCorrection" placeholder="请选择" disabled>
                    <el-option
                      v-for="item in baseData.stateOfCorrection"
                      :key="item.value"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item class="formInfo" label="职级：">
                  <el-input v-model="formData.rank" class="inputW"></el-input>
                </el-form-item>
                <el-form-item class="formInfo" label="转正评价：">
                  <el-input type="textarea" v-model="formData.correctionEvaluation" placeholder="1-300位字符"></el-input>
                </el-form-item>
                <el-form-item class="formInfo" label="汇报对象：">
                  <el-select v-model="formData.reportingObject" filterable placeholder="请选择">
                    <el-option
                      v-for="item in employeesSimpleListData"
                        :key="item.id" :label="item.fullName" :value="item.id">
                        <!-- <span>{{item.fullName}}</span> -->
                    </el-option>

                  </el-select>
                </el-form-item>
                <el-form-item class="formInfo" label="HRBP：">
                  <el-select v-model="formData.hrbp" placeholder="请选择">
                    <el-option
                      v-for="item in employeesSimpleListData"
                        :key="item.id" :label="item.fullName" :value="item.id">
                        <!-- <span>{{item.fullName}}</span> -->
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item class="formInfo" label="聘用形式：">
                  <el-select v-model="formData.formOfEmployment" disabled placeholder="请选择" >
                    <el-option
                      v-for="item in baseData.hireType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item class="formInfo" label="管理形式：">
                  <el-select v-model="formData.formOfManagement" placeholder="请选择">
                    <el-option
                      v-for="item in baseData.subjection"
                      :key="item.id"
                      :label="item.value"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                
                <el-form-item class="formInfo" label="调整司龄(天)：">
                  <el-input type="number" v-model="formData.adjustmentAgedays" placeholder="请输入" class="inputW"></el-input>
                </el-form-item>
                <el-form-item class="formInfo" label="司龄：">
                  <el-input v-model="formData.ageOfDivision" placeholder="2.97年" class="inputW" disabled></el-input>
                </el-form-item>
                <el-form-item class="formInfo" label="首次参加工作时间：">
                  <el-date-picker
                    v-model="formData.workingTimeForTheFirstTime"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                </el-form-item>
                
                <el-form-item class="formInfo" label="调整工龄(天)：">
                  <el-input type="number" v-model="formData.adjustmentOfLengthOfService" placeholder="0" class="inputW"></el-input>
                </el-form-item>
                <el-form-item class="formInfo" label="工龄：">
                  <el-input v-model="formData.workingYears" placeholder="0.00年" class="inputW" disabled></el-input>
                </el-form-item>
                <el-form-item class="formInfo" label="直属下属数量：">
                  <el-input type="number" v-model="formData.numberOfSubordinateSubordinates" placeholder="1" class="inputW" disabled></el-input>
                </el-form-item>
                <el-form-item class="formInfo" label="工作城市：">
                  <el-select class="filter-item" v-model="formData.workingCity">
                      <el-option v-for="item in cityList" 
                      :key="item.id" 
                      :label="item.title" 
                      :value="item.title">
                      {{item.title}}
                      </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="formInfo" label="纳税城市：">
                  <el-select v-model="formData.taxableCity" filterable placeholder="请选择">
                    <el-option v-for="item in cityList" 
                      :key="item.id" 
                      :label="item.title" 
                      :value="item.title">
                      {{item.title}}
                      </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="mainInfo">
                <div class="titInfo">合同信息</div>
                <el-form-item class="formInfo" label="首次合同开始时间：">
                  <el-date-picker
                    v-model="formData.initialContractStartTime"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                </el-form-item>
                <el-form-item class="formInfo" label="首次合同结束时间：">
                  <el-date-picker
                    v-model="formData.firstContractTerminationTime"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                </el-form-item>
                <el-form-item class="formInfo" label="现合同开始时间：">
                  <el-date-picker
                    v-model="formData.currentContractStartTime"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                </el-form-item>
                <el-form-item class="formInfo" label="现合同结束时间：">
                  <el-date-picker
                    v-model="formData.closingTimeOfCurrentContract"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                </el-form-item>
                <el-form-item class="formInfo" label="合同期限：">
                  <el-select class="filter-item" v-model="formData.contractPeriod">
                      <el-option
                      v-for="item in baseData.contractPeriod"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="formInfo" label="合同文件：">
                  <fileUp v-model="formData.contractDocuments" :imgs='formData.contractDocuments' ref="contractDocuments"></fileUp>
                </el-form-item>
                
                <el-form-item class="formInfo" label="续签次数：">
                  <el-select class="filter-item" v-model="formData.renewalNumber">
                      <el-option
                      v-for="item in baseData.renewalCount"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                    </el-select>
                </el-form-item>
                
              </div>
              <div class="mainInfo">
                  <div class="titInfo">招聘信息</div>
                  <el-form-item class="formInfo" label="其他招聘渠道：">
                    <!-- <el-input v-model="formData.otherRecruitmentChannels" placeholder="请输入" class="inputW"></el-input> -->
                    <el-select v-model="formData.otherRecruitmentChannels" placeholder="请选择">
                      <el-option
                        v-for="item in baseData.resumeSource"
                        :key="item.id"
                        :label="item.value"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item class="formInfo" label="招聘渠道：">
                    <el-select v-model="formData.recruitmentChannels" placeholder="请选择">
                      <el-option
                        v-for="item in baseData.resumeSource"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item class="formInfo" label='社招/校招：'>
                    <el-select v-model="formData.socialRecruitment" placeholder="请选择">
                      <el-option
                        v-for="item in baseData.hireSourceType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item class="formInfo" label="推荐企业/人：">
                    <el-input v-model="formData.recommenderBusinessPeople" placeholder="请输入" class="infoPosition inputW"></el-input>
                  </el-form-item>
              </div>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="saveData('formData')">保存更新</el-button>
              <router-link :to="{'path':'/employees/index'}" class="el-button el-button--default el-button--medium">返回</router-link>
            </div>
          </div>
      </el-form>
      </div>
    </div>
    </div>
</template>

<script>
import citySelect from './city'
import constantApi from '@/api/constant/employees'
import commonApi from '@/api/constant/common'
import {
  detail,
  edit,
  jobsDetail,
  postDetail,
  employeesSimpleList
} from '@/api/base/employees'
import { organList } from '@/api/base/organizations'
import fileUp from './upload'
import { cityList } from '@/api/base/baseApi'
import { checkEmails } from '@/filters/index'
import userHead from './component/user-head.vue'
var _this = null
export default {
  name: 'userInfo',
  components: { citySelect, fileUp, userHead },
  props: ['objId', 'datas', 'headImg'],
  data() {
    return {
      citySelect: 'citySelect',
      userHead: 'userHead',
      baseData: [],
      common: [],
      attachments: [],
      // objInfoDataes: [],
      department: '',
      isShowSelect: false,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      editShow: {
        rank: true,
        correctionEvaluation: true,
        ageOfDivision: true,
        adjustmentAgedays: true,
        adjustmentOfLengthOfService: true,
        workingYears: true,
        numberOfSubordinateSubordinates: true,
        workingCity: true,
        taxableCity: true,
        otherRecruitmentChannels: true
      },
      saveShow: false,
      simpleData: [],
      employeesSimpleListData: [],
      cityList: [],
      formData: {
        id: this.objId,
        fullName: '', // 姓名
        firstLevelDepartment: '', // 一级部门
        departmentCode: '', // 部门编码
        dateOfEntry: '', // 入职日期
        post: '', // 岗位
        workMailbox: '', // 工作邮箱
        workNumber: '', // 工号
        dateOfCorrection: '', // 转正日期
        rank: '', // 职级
        correctionEvaluation: '', // 转正状态
        reportingObject: '', // 汇报对象
        stateOfCorrection: '',
        hrbp: '', // HRBP
        formOfEmployment: '', // 聘用形式
        formOfManagement: '', // 管理形式
        adjustmentAgedays: '', // 调整司龄天
        ageOfDivision: '', // 司龄
        workingTimeForTheFirstTime: '', // 首次参加工作时间
        adjustmentOfLengthOfService: '', // 调整工龄天
        workingYears: '', // 工龄
        numberOfSubordinateSubordinates: '',
        workingCity: '', // 工作城市
        taxableCity: '', // 纳税城市
        currentContractStartTime: '', // 现合同开始时间
        closingTimeOfCurrentContract: '', // 现合同结束时间
        initialContractStartTime: '', // 首次合同开始时间
        firstContractTerminationTime: '', // 首次合同结束时间
        contractPeriod: '', // 合同期限
        contractDocuments: '', // 合同文件
        contractDocumentsId: '',
        renewalNumber: '', // 续签次数
        otherRecruitmentChannels: '', // 其他招聘渠道
        recruitmentChannels: '', // 招聘渠道
        socialRecruitment: '', // 社招校招
        workingPlace: '', // 工作地点
        recommenderBusinessPeople: '' // 推荐企业人
      }
    }
  },
  watch: {
    department(val) {
      this.$refs.tree2.filter(val)
    }
  },
  methods: {
    // 业务方法
    // 编辑
    handleEdit: function(e, obj) {
      this.editShow[obj] = false
    },
    handleSave: function(e, obj) {
      this.editShow[obj] = true
    },
    // 界面交互
    // 界面初始数据
    setupUI() {
      this.baseData = constantApi
      this.common = commonApi
      this.getObjInfo()
      // 部门列表
      organList().then(ret => {
        this.simpleData.push(ret.data.items)
      })
      // // 员工列表
      employeesSimpleList().then(ret => {
        this.employeesSimpleListData = ret.data.items
      })
      // 城市列表获取
      cityList({})
        .then(res => {
          this.cityList = res.data
        })
        .catch(err => {
          this.$message.error(err)
        })
    },
    // 退出
    handleClose() {},
    // 获取详情
    getObjInfo() {
      jobsDetail({ id: this.objId }).then(ret => {
        this.formData = ret.data
        if (ret.data.renewalNumber === null) {
          ret.data.renewalNumber = '0'
        }
        this.formData.renewalNumber = this.formData.renewalNumber + '次'
        if (this.formData.renewalNumber === 4) {
          this.formData.renewalNumber = this.formData.renewalNumber + '次或以上'
        }
        if (ret.data.contractDocumentsId !== '') {
            this.$refs.contractDocuments.fillDownload(ret.data.contractDocumentsId, ret.data.contractDocuments)
            this.uploadDisabled = true
          }
      })
    },
    // 表单提交
    saveData(obj) {
      this.formData.id = this.$route.params.id
      this.$refs[obj].validate(valid => {
        if (valid) {
          // if (
          //   !checkEmails(this.formData.workMailbox) &&
          //   this.formData.workMailbox !== ''
          // ) {
          //   this.$message.error('请输入正确的邮箱')
          //   return false
          // }
          this.formData.renewalNumber = parseInt(this.formData.renewalNumber)
          this.formData.adjustmentAgedays = parseInt(
            this.formData.adjustmentAgedays
          )
          this.formData.adjustmentOfLengthOfService = parseInt(
            this.formData.adjustmentOfLengthOfService
          )
          this.formData.contractDocuments = this.$refs.contractDocuments.businessLicense
          postDetail(this.formData)
            .then(res => {
              this.formData = res.data
              this.loading = false
              this.$message.success('保存成功！')
              this.formData = []
              this.getObjInfo()
            })
            .catch(err => {
              this.$message.error(err)
              this.loading = false
            })
        }
      })
    },
    handleChick() {
      this.isShowSelect = true
    },
    handleNodeClick(data) {
      this.department = data.name
      this.formData.department = this.department
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
    }
  },
  // 挂载结束

  mounted: function() {
  },
  // 创建完毕状态
  created: function() {
    _this = this
    this.setupUI()
  },
  // 组件更新
  updated: function() {}
}
</script>

<style rel="stylesheet/scss" lang="scss">
.el-collapse-item__arrow {
  float: left;
}

.el-collapse-item {
  position: relative;
  // width: 80%;
  // .el-collapse-item__header{width: 80%;}
  .infoR {
    position: absolute;
    background: #fff;
    display: inline-block;
    width: 100px;
    height: 35px;
    line-height: 35px;
    text-align: right;
    right: -100px;
    top: 0px;
  }
}
// .el-input--medium {
//   width: 80%;
// }
.linkage {
  display: inline-block;
}
.textBotm {
  vertical-align: text-bottom;
}
.navInfo {
  height: auto;
  font-size: 30px;
  color: #333;
  background-color: #e4e4e4;
  text-align: center;
  border-bottom: 1px solid #333;
}
.step {
  position: fixed;
  left: 220px;
  top: 50%;
  margin-top: -150px;
  background: #fff;
  z-index: 9;
}
.objectTree > div:first-child.el-tree-node > div:first-child {
  display: none;
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.objectTree {
  position: absolute;
  width: 300px;
  z-index: 999;
  border: 1px solid #dddee1;
  left: 85px;
  border-radius: 5px;
}
</style>
