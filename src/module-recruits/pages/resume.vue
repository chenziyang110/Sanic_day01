<template>
  <div class="resume">
    <div class="contLeft">
      <div class="topTit">
        <img src="./../../assets/img.jpeg" alt="">
        <div class="info">
          <p class="name"><strong> {{dataes.fullName}} </strong>  {{dataes.workingYears}} / {{dataes.educationBackground}}</p>
          <p><strong>公司 / 职位：</strong> {{dataes.homeCompany}} / {{dataes.jobPosition}}</p>
          <p><strong>学校 / 专业：</strong> {{dataes.universityOneIsGraduatedFrom}} / {{dataes.major}}</p>
          <p><strong>手机 / 邮箱：</strong> {{dataes.phoneNumber}} / {{dataes.mailbox}}</p>
          <p><strong>现居住地：</strong> {{dataes.residenceAddress}}</p>
          <p><strong>参 与 者：</strong> {{dataes.participant}}</p>
          <p><strong>标 签：</strong> <span class="lab" v-for="(item,index) in dataes.label" :key="index">{{item.title}}</span></p>
          <p><strong></strong> {{dataes.inJobTime}}</p>
        </div>
      </div>
      <div class="content">
        <div><strong></strong></div>
      </div>
      <div class="butList"><span @click="dialogFormVisible = true">安排面试</span><span @click="giveUp()">放弃</span><span @click="downloadResume()">下载简历</span><span @click="recommended()">推荐</span></div>
    </div>
    <div class="contRit">
      <div class="topTit"><strong>审批记录</strong></div>
      <div class="Items">
        <li v-for="(item, index) in reviewHistoryDataes" :key="index">
          <div class="name">
            {{item.opDate}}
          </div>
          <div class="act">
            {{item.opTitle}}>
          </div>
        </li>
      </div>
    </div>
    <!-- 操作弹窗 -->
    <el-dialog title="面试通知" :visible.sync="dialogFormVisible">
      <InterviewNotice :information = "dataes" v-on:cancel = "cancel"></InterviewNotice>
    </el-dialog>
  </div>
</template>

<script>
  import {sresumeDetails, giveUpOffer, dowResume, recommendedResume} from '@/api/hrm/recruitsApi'
  import InterviewNotice from '../components/InterviewNotice'

  export default {
    name: 'resume',
    components: { InterviewNotice },
    data() {
      return {
        dataes: {},
        dialogFormVisible: false,
        reviewHistoryDataes: {}
      }
    },
    methods: {
      init () {
        sresumeDetails({id: this.$route.params})
          .then(res => {
            this.dataes = res.data
            this.reviewHistoryDataes = res.data.hiringRecord
          })
          .catch(err => {
            this.$message.error(err)
            this.loading = false
          })
      },
      // 放弃
      giveUp() {
        giveUpOffer({id: this.dataes.id})
          .then(res => {
            console.log(res)
            this.$message.success('简历已被放弃！')
          })
          .catch(err => {
            this.$message.error(err)
          })
      },
      // 简历下载
      downloadResume() {
        dowResume({id: this.dataes.id})
          .then(res => {
            this.$message.success('简历下载成功！')
          })
          .catch(err => {
            this.$message.error(err)
          })
      },
      // 推荐
      recommended() {
        recommendedResume({id: this.dataes.id})
          .then(res => {
            this.$message.success('简历推荐成功！')
          })
          .catch(err => {
            this.$message.error(err)
          })
      },
      cancel() {
        this.dialogFormVisible = false
      }
    },
    mounted() {
      this.init()
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "./../../styles/variables";
  .resume{
    display: flex;
    padding: 15px;
    .contLeft{
      flex: 4;
      background: #fff;
      margin-right: 10px;
      padding: 20px;
      .topTit{
        display: flex;
        border-bottom: solid 1px #ccc;
        img{
          width: 100px;
          height: 100px;
          border-radius: 50%;
        }
        .more{
          display: inline-block;
          position: relative;
          text-align: center;
          width: 16px;
          line-height: 14px;
          font-size: 12px;
          top: -1px;
          left: 5px;
          border: solid 1px #666;
          color:#666;
          border-radius: 50px;
        }
        .info{
          margin-left: 10px;
          line-height: 30px;
          color: #666;
          strong{
            display: inline-block;
            width: 90px;
            color: #333;
          }
          .lab{
            background: $green1;
            color:#fff;
            display: inline-block;
            padding: 0px 10px;
            line-height: 24px;
            margin-right: 10px;
          }
          .name{
            span{
              background: $green1;
              color:#fff;
              padding: 4px 10px;
              border-radius: 3px;
              margin-left: 10px;
              font-size: 12px;
            }
          }
          .time{
            ul{
              position: relative;
              display: inline-block;
              li{
                position: absolute;
                border-radius: 3px;
                box-shadow: 1px 2px 2px #ccc;
                top: 34px;
                left: -43px;
                width: 500px;
                padding:5px 10px;
                line-height: 20px;
                display: none;
                background: #fff;
                border: solid 1px #ccc;
              }
              li::before{
                position:absolute;
                content: '∧';
                left: 50px;
                top: -15px;
                background: #fff;
                color:#ccc;
              }
            }
            ul:hover li{
              display: block;
            }
          }
        }
      }
      .content{
        padding: 10px 0;
        min-height: 500px;
        p{
          margin: 25px 0;
          span{
            display: inline-block;
            width: 80px;
            margin-right: 20px;
            color:#999;
            border-right: solid 1px #ccc;
          }
        }
      }
      .butList{
        text-align: center;
        span{
          display: inline-block;
          padding: 5px 15px;
          background: $blue;
          color: #fff;
          margin-right: 10px;
          border-radius: 3px;
        }
      }
    }
    .contRit{
      flex: 1;
      background: #fff;
      padding:0 20px;
      .topTit{
        margin-bottom: 10px;
        border-bottom: solid 1px #ccc;
        line-height: 40px;
      }
      .Items{
        padding: 20px 0;
        li{
          display: flex;
          min-height: 70px;
          .name{
            position: relative;
            text-align: center;
            line-height: 24px;
            padding: 0 0 10px 0;
            flex: 4;
            border-right:solid 1px #ccc;
          }
          .name:after{
            content: ' ';
            border-radius: 50%;
            position: absolute;
            width: 10px;
            height: 10px;
            border:solid 2px $green1;
            right: -5px;
            top:0px;
            background: #fff;
          }
          .act{
            flex: 5;
            text-align: center;
          }
        }
      }
    }
  }
</style>
