<template>
  <div class="boxInfo">
    <!-- 表单内容 -->
    <div class="formInfo">
      <div>
        <!-- 头部信息  -->
        
        <div class="userInfo">
             <div class="headInfo clearfix">
               <div class="fl">
                  <!-- 头像 -->
                  <component v-bind:is="userHead" :headImg="formData.staffPhoto"></component>
               </div>
               <div class="headText">
                 <el-form ref="formData" :model="formData" label-width="215px" label-position="right">
                 <el-row>
                    <el-col :span="12">
                       <span class="textR">姓名：</span>
                       <el-input v-model="formData.fullName" placeholder="请输入" class="inputW"></el-input>
                    </el-col>
                    <el-col :span="12">
                       <span class="textR">性别：</span>
                       <el-select v-model="formData.sex" placeholder="请选择">
                          <el-option
                            v-for="item in baseData.gender"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                       <span class="textR">手机：</span>
                       <el-input v-model="formData.mobilePhone" placeholder="请输入" class="inputW" @change.native='handlePhone(1)'></el-input>
                       <span class="colRed">{{phoneTip}}</span>
                    </el-col>
                    <el-col :span="12">
                       <span class="textR">出生日期：</span>
                       <el-date-picker
                          v-model="formData.dateOfBirth"
                          type="date"
                          placeholder="选择日期"
                          value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                       <span class="textR">最高学历：</span>
                       <el-select v-model="formData.theHighestDegreeOfEducation" placeholder="请选择">
                          <el-option
                            v-for="item in baseData.highestDegree"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                    </el-col>
                  </el-row>
                 </el-form>
               </div>
             </div>
        </div>
        <!-- 头部信息 end  -->
        <div class="boxMain">
          <el-form ref="formData" :model="formData" label-width="215px" label-position="right">
          <!-- <div class="formNav"></div> -->
          <!-- 左侧-基于element-ui的step组件封装 -->
                <!-- <div class="step">
                  <left-step :steps="steps"></left-step>
                </div> -->
                  <div class="mainInfo tabInfo" ref="tabInfo1">
                    <el-form-item class="formInfo" label="国家/地区：">
                      <el-select v-model="formData.nationalArea" placeholder="请选择">
                        <el-option
                          v-for="item in baseData.isOverseas"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                          >
                        </el-option>
                      </el-select>
                    </el-form-item>

                    <el-form-item class="formInfo" label="护照号：">
                      <el-input v-model="formData.passportNo" placeholder="正规护照格式" class="inputW"></el-input>
                    </el-form-item>
                    <el-form-item class="formInfo" label="身份证号：">
                        <el-input v-model="formData.idNumber" placeholder="正规身份证格式" class="inputW" @change.native='handleNumber'></el-input>
                        <span class="colRed">{{idCardTip}}</span>
                    </el-form-item>

                    <el-form-item class="formInfo" label="身份证照：">
                      <div class="clearfix">
                        <RegShopImg :imgN='0' :imgs='formData.idCardPhotoPositive' ref="idCardPhotoPositive"></RegShopImg>
                        <RegShopImg :imgN='1' :imgs='formData.idCardPhotoBack' ref="idCardPhotoBack"></RegShopImg>
                      </div>
                      <span class="col999" style="vertical-align: bottom;">图片格式为 JPG/JPEG/PNG/PDF 大小在5MB内</span>
                    </el-form-item>

                    <el-form-item class="formInfo" label="籍贯：">
                      <el-input v-model="formData.nativePlace"></el-input>
                    </el-form-item>

                    <el-form-item class="formInfo" label="民族：">
                      <el-input v-model="formData.nation" placeholder="请输入" class="inputW"></el-input>
                    </el-form-item>

                    <el-form-item class="formInfo" label="英文名：">
                      <el-input v-model="formData.englishName" placeholder="请输入" class="inputW" @change.native='handleEngliName'></el-input>
                      <span class="colRed">{{englishNTip}}</span>
                    </el-form-item>

                    <el-form-item class="formInfo" label="婚姻状况：">
                      <el-select v-model="formData.maritalStatus" placeholder="请选择">
                        <el-option
                          v-for="item in baseData.maritaStatus"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>

                    <el-form-item class="formInfo" label="员工照片：">
                      <div class="clearfix">
                      <RegShopImg :imgN='3' :imgs='formData.staffPhoto' ref="staffPhoto"></RegShopImg>
                      </div>
                      <span class="col999" style="vertical-align: bottom;">图片格式为 JPG/JPEG/PNG/PDF 大小在2MB内</span>
                    </el-form-item>

                    <el-form-item class="formInfo" label="生日：">
                      <el-input v-model="formData.birthday" placeholder="示例 0323" class="inputW"></el-input>
                    </el-form-item>

                    <el-form-item class="formInfo" label="属相：">
                      <el-select v-model="formData.zodiac" placeholder="请选择">
                        <el-option
                          v-for="item in baseData.animalSymbol"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>

                    <el-form-item class="formInfo" label="年龄：">
                      <el-input v-model="formData.age" placeholder="年龄" class="inputW"></el-input>
                    </el-form-item>

                    <el-form-item class="formInfo" label="星座：">
                      <el-select v-model="formData.constellation" placeholder="请选择">
                        <el-option
                          v-for="item in baseData.constellation"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>

                    <el-form-item class="formInfo" label="血型：">
                      <el-select v-model="formData.bloodType" placeholder="请选择">
                        <el-option
                          v-for="item in baseData.bloodType"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>

                    <el-form-item class="formInfo" label="户籍所在地：">
                      <el-input v-model="formData.domicile" placeholder="请输入"></el-input>
                    </el-form-item>

                    <el-form-item class="formInfo" label="政治面貌：">
                      <el-input v-model="formData.politicalOutlook" placeholder="请输入" class="inputW"></el-input>
                    </el-form-item>

                    <el-form-item class="formInfo" label="入党时间：">
                      <el-date-picker
                        v-model="formData.timeToJoinTheParty"
                        type="date"
                        placeholder="选择日期" class="inputW"
                        value-format="yyyy-MM-dd" >
                      </el-date-picker>
                    </el-form-item>

                    <el-form-item class="formInfo" label="存档机构：">
                      <el-input v-model="formData.archivingOrganization" placeholder="请输入"></el-input>
                    </el-form-item>

                    <el-form-item class="formInfo" label="子女状态：">
                      <el-input v-model="formData.stateOfChildren" placeholder="请输入"></el-input>
                    </el-form-item>

                    <el-form-item class="formInfo" label="子女有无商业保险：">
                      <el-radio-group v-model="formData.doChildrenHaveCommercialInsurance">
                        <el-radio label="1">有</el-radio>
                        <el-radio label="2">无</el-radio>
                      </el-radio-group>
                    </el-form-item>

                    <el-form-item class="formInfo" label="有无违法违纪状态：">
                      <el-input v-model="formData.isThereAnyViolationOfLawOrDiscipline" placeholder="请输入"></el-input>
                    </el-form-item>

                    <el-form-item class="formInfo" label="有无重大病史：">
                      <el-input  v-model="formData.areThereAnyMajorMedicalHistories" placeholder="请输入"></el-input>
                    </el-form-item>
                  </div>
                  
                  <div class="mainInfo tabInfo" ref="tabInfo2">
                    <div class="titInfo ">通讯信息</div>
                    <el-form-item class="formInfo" label="QQ">
                      <el-input v-model="formData.qq" placeholder="请输入" class="inputW" @change.native="handleQq"></el-input>
                      <span class="colRed">{{qqTip}}</span>
                    </el-form-item>
                    <el-form-item class="formInfo" label="微信：">
                      <el-input v-model="formData.wechat" placeholder="请输入" class="inputW"></el-input>
                    </el-form-item>
                    <el-form-item class="formInfo" label="居住证城市：">
                      <!-- <el-input v-model="formData.residenceCardCity" placeholder="1-20位字符" maxlength="20" class="inputW"></el-input> -->
                      <!-- <component v-bind:is="citySelect"></component> -->
                      <el-select class="filter-item" v-model="formData.residenceCardCity">
                        <el-option v-for="(item, index) in cityList" :key="index" :label="item.title" :value="item.title"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item class="formInfo" label="居住证办理日期：">
                      <el-date-picker v-model="formData.dateOfResidencePermit" type="date"
                        placeholder="选择日期" class="inputW"
                        value-format="yyyy-MM-dd">
                      </el-date-picker>
                    </el-form-item>
                    <el-form-item class="formInfo" label="居住证截止日期：">
                      <el-date-picker v-model="formData.residencePermitDeadline" type="date"
                      placeholder="选择日期" class="inputW"
                      value-format="yyyy-MM-dd">
                      </el-date-picker>
                    </el-form-item>
                    <el-form-item class="formInfo" label="现居住地：">
                      <el-input v-model="formData.placeOfResidence" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item class="formInfo" label="通讯地址：">
                      <el-input v-model="formData.postalAddress" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item class="formInfo" label="联系手机：">
                      <el-input v-model="formData.contactTheMobilePhone" placeholder="11位字符" maxlength="11" class="inputW"  @change.native='handlePhone(2)'></el-input>
                      <span class="colRed">{{telTip}}</span>
                    </el-form-item>
                    <el-form-item class="formInfo" label="个人邮箱：">
                      <el-input v-model="formData.personalMailbox" placeholder="请输入" type='mail' class="inputW" @change.native="handleMailbox"></el-input>
                      <span class="colRed">{{mailTip}}</span>
                    </el-form-item>
                    <el-form-item class="formInfo" label="紧急联系人：">
                      <el-input v-model="formData.emergencyContact" placeholder="请输入" class="inputW"></el-input>
                    </el-form-item>
                    <el-form-item class="formInfo" label="紧急联系电话：">
                      <el-input v-model="formData.emergencyContactNumber" placeholder="11位字符" class="inputW" @change.native='handlePhone(3)'></el-input>
                      <span class="colRed">{{contactTip}}</span>
                    </el-form-item>
                  </div>
                  <div class="mainInfo tabInfo" ref="tabInfo3" >
                    <div class="titInfo">账号信息</div>
                    <el-form-item class="formInfo" label="社保电脑号：">
                        <el-input v-model="formData.socialSecurityComputerNumber" placeholder="请输入" class="inputW"></el-input>
                      </el-form-item>
                      <el-form-item class="formInfo" label="公积金账号：">
                        <el-input v-model="formData.providentFundAccount" placeholder="请输入" class="inputW"></el-input>
                      </el-form-item>
                      <el-form-item class="formInfo" label="银行卡号：">
                        <el-input v-model="formData.bankCardNumber" placeholder="请输入" class="inputW" @change.native="handleBankCard"></el-input>
                        <span class="colRed">{{bankCardTip}}</span>
                      </el-form-item>
                      <el-form-item class="formInfo" label="开户行：">
                        <el-input v-model="formData.openingBank" placeholder="请输入" class="inputW"></el-input>
                      </el-form-item>
                  </div>
                  <div class="mainInfo tabInfo" ref="tabInfo4">
                      <div class="titInfo">教育信息</div>
                      <el-form-item class="formInfo" label="学历类型：">
                        <el-select v-model="formData.educationalType" placeholder="请选择">
                          <el-option
                            v-for="item in baseData.educationType"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item class="formInfo" label="毕业学校：">
                        <el-input v-model="formData.graduateSchool" placeholder="请输入" class="inputW"></el-input>
                      </el-form-item>
                      <el-form-item class="formInfo" label="入学时间：">
                        <el-date-picker v-model="formData.enrolmentTime"  type="data" placeholder='请输入时间' class="inputW" value-format="yyyy-MM-dd">
                        </el-date-picker>
                      </el-form-item>
                      <el-form-item class="formInfo" label="毕业时间：">
                        <el-date-picker v-model="formData.graduationTime" type="data" placeholder='请输入时间' class="inputW" value-format="yyyy-MM-dd">
                        </el-date-picker>
                      </el-form-item>
                      <el-form-item class="formInfo" label="专业：">
                        <el-input v-model="formData.major" placeholder="请输入" class="inputW"></el-input>
                      </el-form-item>
                      <el-form-item class="formInfo" label="毕业证书：">
                        <div class="clearfix">
                          <RegShopImg :imgs='formData.graduationCertificate' ref="graduationCertificate"></RegShopImg>
                        </div>
                        <span class="col999" style="vertical-align: bottom;">图片格式为 JPG/JPEG/PNG/PDF 大小在2MB内</span>
                      </el-form-item>
                      <el-form-item class="formInfo" label="学位证书：">
                        <div class="clearfix">
                          <RegShopImg :imgs='formData.certificateOfAcademicDegree' ref="certificateOfAcademicDegree"></RegShopImg>
                        </div>
                        <span class="col999" style="vertical-align: bottom;">图片格式为 JPG/JPEG/PNG/PDF 大小在2MB内</span>
                      </el-form-item>
                    </div>
                    <div class="mainInfo tabInfo" ref="tabInfo5">
                      <div class="titInfo">从业信息</div>
                      <el-form-item class="formInfo" label="上家公司：">
                        <el-input v-model="formData.homeCompany" placeholder="请输入" class="inputW"></el-input>
                      </el-form-item>
                      <el-form-item class="formInfo" label="职称：">
                        <el-input v-model="formData.title" placeholder="请输入" class="inputW"></el-input>
                      </el-form-item>
                      <el-form-item class="formInfo" label="简历：">
                        <fileUp :imgs='formData.resume' ref="resume" :fileData='fileData'></fileUp>
                      </el-form-item>
                      <el-form-item class="formInfo" label="有无竞业限制：">
                        <el-input type="textarea" v-model="formData.isThereAnyCompetitionRestriction" placeholder="请输入" style="width:80%"></el-input>
                      </el-form-item>
                      <el-form-item class="formInfo" label="前公司离职证明：">
                        <div class="clearfix">
                          <RegShopImg :imgs='formData.proofOfDepartureOfFormerCompany' ref="proofOfDepartureOfFormerCompany"></RegShopImg>
                        </div>
                        <span class="col999" style="vertical-align: bottom;">图片格式为 JPG/JPEG/PNG/PDF 大小在2MB内</span>
                      </el-form-item>
                      <el-form-item class="formInfo" label="备注：">
                        <el-input type="textarea" v-model="formData.remarks" placeholder="请输入备注" style="width:80%"></el-input>
                      </el-form-item>
                    </div>
                    </el-form>
                <div slot="footer" class="dialog-footer">
                  <router-link :to="{'path':'/employees/index'}" class="el-button el-button--default el-button--medium">返回</router-link>
                  <el-button type="primary" @click="saveData('formData')">保存更新</el-button>
                </div>
              </div>
      
      </div>
    </div>
    </div>
</template>

<script>
import citySelect from './city'
import constantApi from '@/api/constant/employees'
import RegShopImg from './imgUpload'
import fileUp from './upload'
import { cityList } from '@/api/base/baseApi'
import { personalDetail, personal } from '@/api/base/employees'
import {
  checkEmails,
  checkiDNumber,
  checkCode,
  checkQq,
  checkTel,
  formatBankNo
} from '@/filters/index'
import userHead from './component/user-head.vue'
var _this = null
export default {
  name: 'userInfo',
  components: {
    citySelect,
    RegShopImg: RegShopImg,
    fileUp,
    userHead
  },
  props: ['objId'],
  data() {
    return {
      citySelect: 'citySelect',
      identityCard_Z: 'identityCard_Z',
      identityCard_F: 'identityCard_F',
      userHead: 'userHead',
      baseData: [],
      idCardTip: '',
      mailTip: '',
      englishNTip: '',
      qqTip: '',
      telTip: '',
      emergencyTip: '',
      phoneTip: '',
      contactTip: '',
      bankCardTip: '',
      saveShow: false,
      fileData: [],
      steps: {
        active: 0,
        step: [
          { title: '基本信息' },
          { title: '通讯信息' },
          { title: '账号信息' },
          { title: '教育信息' },
          { title: '从业信息' }
        ]
      },
      cityList: [],
      formData: {
        id: this.objId,
        fullName: '', // 姓名
        sex: '', // 性别
        mobilePhone: '', // 手机
        onTheJobStatus: '', // 在职状态
        dateOfBirth: '', // 出生日期
        theHighestDegreeOfEducation: '', // 最高学历
        nationalArea: '', // 国家
        passportNo: '', // 护照号
        idNumber: '', // 身份证号
        idCardPhotoPositive: '', // 身份证照正
        idCardPhotoBack: '', // 身份证照正
        nativePlace: '', // 籍贯
        nation: '', // 民族
        englishName: '', // 英文名字
        maritalStatus: '', // 婚姻状况
        staffPhoto: '', // 员工照片
        birthday: '', // 生日
        zodiac: '', // 属相
        age: '', // 年龄
        constellation: '', // 星座
        bloodType: '', // 血型
        domicile: '', // 户籍所在地
        politicalOutlook: '', // 政治面貌
        timeToJoinTheParty: '', // 入党时间
        archivingOrganization: '', // 存档机构
        stateOfChildren: '', // 子女状态
        doChildrenHaveCommercialInsurance: '1', // 保险状态
        isThereAnyViolationOfLawOrDiscipline: '', // 违法违纪状态
        areThereAnyMajorMedicalHistories: '', // 重大病史
        qq: '', // QQ
        wechat: '', // 微信
        residenceCardCity: '', // 居住证城市
        dateOfResidencePermit: '', // 居住证办理日期
        residencePermitDeadline: '', // 居住证截止日期
        placeOfResidence: '', // 现居住地
        postalAddress: '', // 通讯地址
        contactTheMobilePhone: '', // 联系手机
        emergencyContact: '', // 紧急联系人
        emergencyContactNumber: '', // 紧急联系电话
        personalMailbox: '', // 个人邮箱
        imgN: '', // 上传信息的名字对应的index序号
        nameN: '', // 上传信息的名字
        socialSecurityComputerNumber: '', // 社保电脑号
        providentFundAccount: '', // 公积金账号
        bankCardNumber: '', // 银行卡号
        openingBank: '', // 开户行
        educationalType: '', // 学历类型
        graduateSchool: '', // 毕业学校
        enrolmentTime: '', // 入学时间
        graduationTime: '', // 毕业时间
        major: '', // 专业
        graduationCertificate: '', // 毕业证书
        certificateOfAcademicDegree: '', // 学位证书
        homeCompany: '', // 上家公司
        title: '', // 职称
        resume: '', // 简历
        isThereAnyCompetitionRestriction: '', // 有无竞业限制
        proofOfDepartureOfFormerCompany: '', // 前公司离职证明
        remarks: '' // 备注
      }
    }
  },
  methods: {
    // 业务方法
    // 第三步：证件照片上传
    imgthing(imgthing) {
      // 合并对象
      this.Imgthing = Object.assign(this.Imgthing, imgthing)
      // 填充到ruleForm对应项,用来判断是否有数据
      this.ruleForm.identityCard_Z = this.Imgthing.identityCard_Z
      this.ruleForm.identityCard_F = this.Imgthing.identityCard_F
      this.ruleForm.identityCard_S = this.Imgthing.identityCard_S
    },
    // 编辑
    handleEdit: function(e, obj) {
      this.editShow[obj] = false
    },
    handleSave: function(e, obj) {
      this.editShow[obj] = true
    },
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
    // 获取详情
    getObjInfo() {
      personalDetail({ id: this.objId })
        .then(res => {
          this.formData = res.data
          if (res.data.idCardPhotoPositive) {
            this.$refs.idCardPhotoPositive.fillDownload(
              res.data.idCardPhotoPositive
            )
            this.uploadDisabled = true
          }
          if (res.data.idCardPhotoBack) {
            this.$refs.idCardPhotoBack.fillDownload(res.data.idCardPhotoBack)
            this.uploadDisabled = true
          }
          if (res.data.staffPhoto) {
            this.$refs.staffPhoto.fillDownload(res.data.staffPhoto)
            this.uploadDisabled = true
          }
          if (res.data.graduationCertificate) {
            this.$refs.graduationCertificate.fillDownload(
              res.data.graduationCertificate
            )
            this.uploadDisabled = true
          }
          if (res.data.certificateOfAcademicDegree) {
            this.$refs.certificateOfAcademicDegree.fillDownload(
              res.data.certificateOfAcademicDegree
            )
            this.uploadDisabled = true
          }
          if (res.data.proofOfDepartureOfFormerCompany) {
            this.$refs.proofOfDepartureOfFormerCompany.fillDownload(
              res.data.proofOfDepartureOfFormerCompany
            )
            this.uploadDisabled = true
          }
          if (res.data.resume) {
            this.$refs.resume.fillDownload(res.data.resume, res.data.resumeName)
            this.uploadDisabled = true
          }
        })
        .catch(err => {
          if (err) {
            this.$message.error(err)
          }
        })
    },
    saveData(obj) {
      this.$refs[obj].validate(valid => {
        if (valid) {
          var errorTip = '请输入正确的手机号'
          this.formData.id = this.$route.params.id
          if (this.formData.idNumber) {
            this.idNumber()
          } else if (this.formData.personalMailbox) {
            this.personalMailbox()
          } else if (this.formData.englishName) {
            this.englishName()
          } else if (this.formData.qq) {
            this.qq()
          } else if (this.formData.contactTheMobilePhone) {
            this.contactPhone(errorTip)
          } else if (this.formData.emergencyContactNumber) {
            this.emergencyNumber(errorTip)
          } else if (this.formData.bankCardNumber) {
            this.bankCardNumber()
          } else {
            if (!this.formData.idCardPhotoPositive) {
              this.formData.idCardPhotoPositive = this.$refs.idCardPhotoPositive.businessLicense
            }
            if (!this.formData.idCardPhotoBack) {
              this.formData.idCardPhotoBack = this.$refs.idCardPhotoBack.businessLicense
            }

            if (!this.formData.staffPhoto) {
              this.formData.staffPhoto = this.$refs.staffPhoto.businessLicense
            }

            if (!this.formData.graduationCertificate) {
              this.formData.graduationCertificate = this.$refs.graduationCertificate.businessLicense
            }

            if (!this.formData.certificateOfAcademicDegree) {
              this.formData.certificateOfAcademicDegree = this.$refs.certificateOfAcademicDegree.businessLicense
            }

            if (!this.formData.proofOfDepartureOfFormerCompany) {
              this.formData.proofOfDepartureOfFormerCompany = this.$refs.proofOfDepartureOfFormerCompany.businessLicense
            }

            if (!this.formData.resume) {
              this.formData.resume = this.$refs.resume.businessLicense
            }

            personal(this.formData)
              .then(res => {
                this.formData = res.data
                this.loading = false
                this.$message.success('保存成功！')
                this.getObjInfo()
              })
              .catch(err => {
                this.$message.error(err)
                this.loading = false
              })
          }
        } else {
          this.$message.error('数据提交失败！')
          return false
        }
      })
    },
    // 界面交互
    // 界面初始数据
    setupUI() {
      this.baseData = constantApi
      this.getObjInfo()
      this.init()
    },
    // 表单提交
    // 身份证验证
    idNumber() {
      if (
        !checkiDNumber(this.formData.idNumber) ||
        (this.formData.idNumber.length !== 15 &&
          this.formData.idNumber.length !== 18)
      ) {
        this.idCardTip = '身份证号码不符合规范'
        this.$message.error('身份证号码不符合规范')
        return false
      } else {
        this.idCardTip = ''
      }
    },
    // 邮箱验证
    personalMailbox() {
      if (!checkEmails(this.formData.personalMailbox)) {
        this.mailTip = '请输入正确的邮箱'
        return false
      } else {
        this.mailTip = ''
      }
    },
    // 英文名字验证
    englishName() {
      if (!checkCode(this.formData.englishName)) {
        this.englishNTip = '请输入正确英文名'
        return false
      } else {
        this.englishNTip = ''
      }
    },
    // qq验证
    qq() {
      if (!checkQq(this.formData.qq)) {
        this.qqTip = '请输入正确的qq号'
        return false
      } else {
        this.qqTip = ''
      }
    },
    // 银行卡验证
    bankCardNumber() {
      if (
        this.formData.bankCardNumber.length < 16 ||
        this.formData.bankCardNumber.length > 19
      ) {
        this.bankCardTip = '银行卡号数必须在16到19之间'
        return false
      }
      if (!checkQq(this.formData.bankCardNumber)) {
        this.bankCardTip = '银行卡号必须全为数字'
        return false
      } else {
        this.bankCardTip = ''
      }
    },
    // 手机号验证
    mobilePhone(errorTip) {
      if (!checkTel(this.formData.mobilePhone)) {
        this.$message.error(errorTip)
        this.phoneTip = errorTip
        return false
      } else {
        this.phoneTip = ''
      }
    },
    contactPhone(errorTip) {
      if (!checkTel(this.formData.contactTheMobilePhone)) {
        this.$message.error(errorTip)
        this.telTip = errorTip
        return false
      } else {
        this.telTip = ''
      }
    },
    emergencyNumber(errorTip) {
      if (!checkTel(this.formData.emergencyContactNumber)) {
        this.$message.error(errorTip)
        this.contactTip = errorTip
        return false
      } else {
        this.contactTip = ''
      }
    },
    //
    handlePhone(obj) {
      var errorTip = '请输入正确的手机号'
      if (obj === 1) {
        if (this.formData.mobilePhone) {
          this.mobilePhone(errorTip)
        } else {
          this.phoneTip = ''
        }
      }
      if (obj === 2) {
        if (this.formData.contactTheMobilePhone) {
          this.contactPhone(errorTip)
        } else {
          this.telTip = ''
        }
      }
      if (obj === 3) {
        if (this.formData.emergencyContactNumber) {
          this.emergencyNumber(errorTip)
        } else {
          this.contactTip = ''
        }
      }
    },
    handleNumber() {
      if (this.formData.idNumber) {
        this.idNumber()
      } else {
        this.idCardTip = ''
      }
    },
    handleEngliName() {
      if (this.formData.englishName) {
        this.englishName()
      } else {
        this.englishNTip = ''
      }
    },
    handleQq() {
      if (this.formData.qq) {
        this.qq()
      } else {
        this.qqTip = ''
      }
    },
    handleBankCard() {
      if (this.formData.bankCardNumber) {
        this.bankCardNumber()
      } else {
        this.bankCardTip = ''
      }
    },
    handleMailbox() {
      if (this.formData.personalMailbox) {
        this.personalMailbox()
      } else {
        this.mailTip = ''
      }
    }
  },
  // 挂载结束
  mounted: function() {},
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
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
