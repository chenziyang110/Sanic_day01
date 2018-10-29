<template>
  <div class="settingBox">
    <div class="settingTop">
      <div class="setTop">
        <div class="topLab" ><span @click="tabSwitch('company')" :class="[tabLab == 'company' ? 'act' : '']">公司信息</span><span @click="tabSwitch('jurisdiction')" :class="[tabLab == 'jurisdiction' ? 'act' : '']">权限设置</span></div>
      </div>
      <div class="settingCont">
        <div class="companySet" v-show="tabLab == 'company'">
          <div class="tips"> <i class="el-icon-warning"></i>对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改</div>
          <div class="formList">
            <el-form ref="formData" :model="formData" :rules="rules" label-width="80px" size="mini">
              <el-form-item label="公司名称" prop="name">
                <el-input v-model="formData.name" class="inputWt"></el-input>
              </el-form-item>
              <el-form-item label="公司地区" prop="region">
                <el-select v-model="formData.region" placeholder="请选择活动区域">
                  <el-option v-for="(item, index) in cityList" :key="index" :label="item.title" :value="item.title"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="公司地址" prop="address">
                <el-input v-model="formData.address" class="inputWt"></el-input>
              </el-form-item>
              <el-form-item label="营业执照">
                <el-upload action="/upfile" :data= "fullUpType" :class="{disabled:uploadDisabled}" :headers="myheader" :on-success="uploadSuccess" :file-list="fileList" :on-remove="handleRemove" list-type="picture-card"> <i class="el-icon-plus"></i>
                </el-upload>
                <!--<img :src="imgUrl" alt="">-->
              </el-form-item>
              <div class="formBot">
                <el-form-item size="large" label="法人代表">
                  <el-input v-model="formData.legalRepresentative" class="inputWt"></el-input>
                </el-form-item>
                <el-form-item size="large" label="公司电话">
                  <el-input v-model="formData.companyPhone" class="inputWt"></el-input>
                </el-form-item>
                <el-form-item size="large" label="邮箱">
                  <el-input v-model="formData.mailbox" class="inputWt"></el-input>
                </el-form-item>
                <el-form-item size="large" label="公司规模">
                  <el-select v-model="formData.companySize" placeholder="请选择活动区域">
                    <el-option label="10人以下" value="10人以下"></el-option>
                    <el-option label="10-20人" value="10-20人"></el-option>
                    <el-option label="20-50人" value="20-50人"></el-option>
                    <el-option label="50-100人" value="50-100人"></el-option>
                    <el-option label="100-200人" value="100-200人"></el-option>
                    <el-option label="200-500人" value="200-500人"></el-option>
                    <el-option label="500人以上" value="500人以上"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item size="large" label="所属行业">
                <el-select v-model="formData.industry" placeholder="请选择活动区域">
                  <el-option v-for="(item, index) in industry" :key="index" :label= item.value :value = item.value></el-option>
                </el-select>
              </el-form-item>
              </div>
              <el-form-item size="large">
                <el-button type="primary" @click="onSubmit('formData')">立即创建</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="jurisdictionSet" v-show="tabLab == 'jurisdiction'">
          <div class="jurTabLab">
            <span  @click="tabSwitch('super','1')" :class="[jurTabLab == 'super' ? 'act' : '']" >超级管理员</span>
            <span  @click="tabSwitch('modular','2')" :class="[jurTabLab == 'modular' ? 'act' : '']">模块管理员</span>
          </div>
          <div class="jurContent">
             <div v-show="jurTabLab == 'super'">
               <div class="tips"> <i class="el-icon-warning"></i>对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改</div>
               <el-table :data="tableDataes" style="width: 100%">
                 <el-table-column prop="fullName" label="姓名" width="200"> </el-table-column>
                 <el-table-column prop="cellPhoneNumber" label="手机号" width="200"> </el-table-column>
                 <el-table-column prop="managementModule" label="管理模块" >
                   <template slot-scope="managementModule">
                     <div slot="reference" class="name-wrapper">
                       <span class="wrapper" v-for="(item, index) in managementModule.row.managementModule" :key="index">{{item}}</span>
                     </div>
                   </template>
                 </el-table-column>
                 <!--<el-table-column prop="name" label="管理部门" > </el-table-column>-->
               </el-table>
             </div>
             <div v-show="jurTabLab == 'modular'">
               <div class="tips"> <i class="el-icon-warning"></i>对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改</div>
               <div class="addAdmin"> <span @click="addModuleAdmin"><i>+</i>添加管理员模块</span></div>
               <el-table :data="tableDataes" style="width: 100%">
                 <el-table-column prop="administratorName" label="管理员名称" width="150"> </el-table-column>
                 <el-table-column prop="fullName" label="姓名" width="150"></el-table-column>
                 <el-table-column prop="cellPhoneNumber" label="手机号" width="180"></el-table-column>
                 <el-table-column label="管理模块">
                   <template slot-scope="managementModule">
                     <div  class="name-wrapper">
                       <span class="wrapper" v-for="(item, index) in managementModule.row.managementModule" :key="index">{{item}}</span>
                     </div>
                   </template>
                 </el-table-column>
                 <el-table-column label="操作" width="180">
                   <template slot-scope="scope">
                     <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                     <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                   </template>
                 </el-table-column>
               </el-table>
             </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="管理员模块" :visible.sync="dialogVisible" width="42%" :before-close="handleClose">
      <addModuleAdmin :data = editData :action = action v-on:openModule = handleClose />
    </el-dialog>
  </div>
</template>

<script>
import {
  baseinfo,
  putBtaseinfo,
  adminList,
  addAdmin,
  getAdminInfo,
  changeAdmin,
  deleteAdmin
} from '@/api/hrm/settingApi'
import addModuleAdmin from '../components/addModuleAdmin.vue'
import axios from './../../../node_modules/axios'
import constant from './../../api/base/constant'
import { imgDownload, cityList } from '@/api/base/baseApi'
import { getToken } from '@/utils/auth'
import setConstant from '@/api/constant/settings'
export default {
  name: 'settings-table-index',
  components: { addModuleAdmin },
  data() {
    return {
      uploadDisabled: '',
      tabLab: 'company',
      jurTabLab: 'super',
      action: '',
      formData: {
        name: '',
        region: ''
      },
      fullUpType: { type: 7, extension: 'img' },
      dialogImageUrl: '',
      dialogVisible: false,
      tableDataes: [],
      industry: '',
      cityList: [],
      imgUrl: {},
      fileList: [],
      editData: [{ administratorName: '', fullName: '', cellPhoneNumber: '' }],
      rules: {
        name: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
        region: [
          { required: true, message: '请选择公司地区', trigger: 'change' }
        ],
        address: [
          { required: true, message: '请输入公司地址', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    managementModule: () => setConstant.systemModules,
    myheader: function() {
      return {
        Authorization: `Bearer ${getToken()}`
      }
    }
  },
  methods: {
    // 初始化数据
    init() {
      this.industry = constant.industry
      // 城市列表获取
      cityList({})
        .then(res => {
          this.cityList = res.data
        })
        .catch(err => {
          this.$message.error(err)
          this.loading = false
        })
      // 公司信息获取
      baseinfo({})
        .then(res => {
          this.formData = res.data
          if (res.data.businessLicense !== '') {
            this.fillDownload(res.data.businessLicense)
            this.uploadDisabled = true
          }
          this.loading = false
        })
        .catch(err => {
          this.$message.error(err)
          this.loading = false
        })
    },
    tabSwitch(obj, lab) {
      if (!lab) {
        this.tabLab = obj
        if (obj === 'jurisdiction') {
          adminList({ type: 1 })
            .then(res => {
              if (res.data.items) {
                res.data.items.map((item, ind) => {
                  let datas = []
                  item.managementModule.forEach(n => {
                    for (let i = 0; i < this.managementModule.length; i++) {
                      if (n === String(this.managementModule[i].id)) {
                        datas.push(this.managementModule[i].value)
                      }
                    }
                  })
                  item.managementModule = datas
                })
              }
              this.tableDataes = res.data.items
              this.loading = false
            })
            .catch(err => {
              console.log(err)
              this.loading = false
            })
        }
      } else if (lab) {
        this.jurTabLab = obj
        adminList({ type: lab })
          .then(res => {
            if (res.data.items) {
              res.data.items.map((item, ind) => {
                let datas = []
                item.managementModule.forEach(n => {
                  for (let i = 0; i < this.managementModule.length; i++) {
                    if (n === String(this.managementModule[i].id)) {
                      datas.push(this.managementModule[i].value)
                    }
                  }
                })
                item.managementModule = datas
              })
            }
            this.tableDataes = res.data.items
            this.loading = false
          })
          .catch(err => {
            console.log(err)
            this.loading = false
          })
      }
    },
    onSubmit(obj) {
      this.$refs[obj].validate(valid => {
        if (valid) {
          if (!this.formData.businessLicense) {
            this.$message.success('请上传营业执照！')
          }
          putBtaseinfo(this.formData)
            .then(res => {
              this.formData = res.data
              this.loading = false
              this.$message.success('数据更改成功！')
              this.init()
            })
            .catch(err => {
              this.$message.error(err)
              this.loading = false
            })
          return true
        } else {
          this.$message.error('数据提交失败！')
          return false
        }
      })
    },
    // 图片 blob 流转化为可用 src
    imgHandle(obj) {
      return window.URL.createObjectURL(obj)
    },
    // 图片下载
    fillDownload(fid) {
      if (fid) {
        imgDownload({ id: fid }).then(res => {
          this.fileList = [{ name: 'img', url: this.imgHandle(res.data) }]
        })
      }
    },
    handleRemove(file, fileList) {
      this.uploadDisabled = false
    },
    uploadSuccess(obj) {
      this.formData.businessLicense = obj.fid
      this.uploadDisabled = true
    },
    handleClose(done) {
      this.dialogVisible = false
      return false
    },
    // 模块编辑
    handleEdit(index, row) {
      this.action = '1'
      this.editData = row
      this.dialogVisible = true
    },
    // 模块删除
    handleDelete(index, row) {
      this.$confirm('确认删除本条信息？', '提示', { type: 'warning' })
        .then(_ => {
          deleteAdmin({ id: row.id })
            .then(res => {
              this.$message.success = '删除信息成功'
              this.tabSwitch('modular', '2')
              this.loading = false
            })
            .catch(err => {
              console.log(err)
              this.loading = false
            })
        })
        .catch(_ => {})
    },
    // 添加模块管理员
    addModuleAdmin() {
      this.action = '0'
      this.editData = {
        administratorName: '',
        fullName: '',
        cellPhoneNumber: ''
      }
      this.dialogVisible = true
    }
  },
  mounted() {
    this.init()
  }
}
</script>
<style>
.el-dialog__body {
  padding: 0px;
}
.disabled .el-upload--picture-card {
  display: none !important;
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
@import './../../styles/variables.scss';
.settingBox {
  padding: 20px;
  background: #fff;
  border-radius: 3px;
  margin: 15px;
  border: 1px solid #ebeef5;
  .setTop {
    color: #666;
    border-bottom: solid 1px #ccc;
    line-height: 40px;
    span {
      display: inline-block;
      padding: 0 25px;
      font-size: 18px;
      cursor: pointer;
    }
    .act {
      color: $green;
      border-bottom: solid 2px $green;
    }
  }
  .settingCont {
    background: #fff;
    .tips {
      background: #f4f4f4;
      color: #666;
      margin: 10px 0;
      padding: 0 10px;
      line-height: 30px;
      i {
        margin-right: 5px;
        position: relative;
        top: 1px;
        color: $orange;
      }
    }
    .formList {
    }
    .jurisdictionSet {
      position: relative;
      .addAdmin {
        text-align: right;
        line-height: 40px;
        position: relative;
        top: -5px;
        i {
          border: solid 1px #666;
          color: #666;
          display: inline-block;
          margin-right: 5px;
          border-radius: 3px;
          padding: 0 3px 2px 3px;
          line-height: 12px;
        }
      }
      .jurTabLab {
        line-height: 40px;
        span {
          display: inline-block;
          margin-right: 20px;
          cursor: pointer;
        }
        .act {
          color: $green;
        }
      }
      .jurContent {
        .name-wrapper {
          span {
            display: inline-block;
            border: solid 1px #ccc;
            margin-right: 10px;
            padding: 0 10px;
            border-radius: 3px;
            background: #f4f4f4;
          }
        }
      }
    }
  }
  .inputWt {
    width: 400px;
  }
}
</style>
