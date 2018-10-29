<template>
  <div class="usersContainer">
    <div class="usersTop">
      <img src="./../../assets/img.jpeg" alt="">
      <div class="usersTopInfo">
        <p>早安，{{myInfo.fullName}}，祝你开心每一天！</p>
        <p>{{myInfo.post}} | {{myInfo.department}} </p>
      </div>
    </div>
    <div class="usersContent">
      <div class="contBox">
        <div class="workCalendar">
          <div class="title">工作日历</div>
          <div class="contentItem">
            <DateIndex />
          </div>
        </div>
        <div class="shortcutEntrance">
          <div class="title">快捷入口</div>
          <div class="contentItem">
            <div style="display: inline-block;margin-bottom: 10px;" @click = "apply('离职')"><span>申请</span></div>
            <div style="display: inline-block;margin-bottom: 10px;" @click = "apply('事假')"><span>请假</span></div>
            <router-link :to="{'path':'./approvals'}"><span>审批</span></router-link>
            <router-link :to="{'path':'./recruit'}"><span>招聘</span></router-link>
            <router-link :to="{'path':'./myinfo'}"><span>我的信息</span></router-link>
          </div>
        </div>
      </div>
      <div class="advContent">
        <div class="title">
          公告
        </div>
        <div class="contentItem">
          <router-link v-for="(item, index) in noticesList" :key="index" :to="{'path':'./noticeDetails'}">
            <div class="item">
              <img :src="fillDownload(item.addPersonHeaderImage)" alt="">
              <div>
                <p>{{item.addPerson}} 发布了 <span>{{item.bulletinTitle}} </span></p>
                <p>{{item.latestOperationTime}}</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <el-dialog :title="title" :visible.sync="dialogVisible" width="40%" >
      <span>
        <Apply v-show="lab == '离职'" />
        <OverTimeWork v-show="lab == '加班'" />
        <LeaveRelevant v-show="lab == '事假'"/>
        <LeaveRelevant v-show="lab == '调休'"/>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {usersInfo} from '@/api/hrm/usersApi'
import {list} from '@/api/hrm/noticesApi'
import { imgDownload } from '@/api/base/baseApi'
import Apply from './../components/Apply'
import OverTimeWork from './../components/OverTimeWork'
import LeaveRelevant from '../components/LeaveRelevant'
import DateIndex from '../components/DateIndex'

export default {
  name: 'users-table-index',
  components: { Apply, OverTimeWork, LeaveRelevant, DateIndex },
  data() {
    return {
      dialogVisible: false,
      title: '离职',
      lab: '',
      myInfo: {},
      noticesList: []
    }
  },
  methods: {
    init() {
      // 个人信息获取
      usersInfo({})
        .then(res => {
          this.myInfo = res.data
        })
        .catch(err => {
          this.$message.error(err)
          this.loading = false
        })
      // 公告列表获取
      list({})
        .then(res => {
          console.log(res)
          let arr = res.data.items
          this.noticesList = arr.slice(0, 3)
        })
        .catch(err => {
          this.$message.error(err)
          this.loading = false
        })
    },
    apply(obj) {
      if (obj === '离职' || obj === '加班') {
        this.title = '申请'
      } else if (obj === '事假' || obj === '调休') {
        this.title = '请假'
      }
      this.lab = obj
      this.dialogVisible = true
    },
    // 图片 blob 流转化为可用 src
    imgHandle(obj) {
      return window.URL.createObjectURL(obj)
    },
    // 图片下载
    fillDownload(fid) {
      console.log(fid)
      return './../../assets/img.jpeg'
//      imgDownload({id: fid})
//        .then((res) => {
//          this.fileList = [{name: 'img', url: this.imgHandle(res.data)}]
//        })
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "./../../styles/variables";
.usersContainer{
  padding: 25px 0;
  .usersTop{
    background: #fff;
    display: flex;
    padding:20px;
    img{
      width: 80px;
      height: 80px;
      border-radius: 50%;
      border:solid 1px #ccc;
      margin-right: 20px;
    }
    div{
      flex: 1;
      p{margin: 17px 0;}
      p:first-child{
        position: relative;
        font-weight: bold;
        top:0px;
        font-size: 22px;
        line-height: 15px;
      }
    }
  }
  .usersContent{
    margin: 25px;
    .contBox {
      display: flex;
      .workCalendar {
        background: #fff;
        margin-right: 15px;
        border-radius: 5px 5px 0px 0px;
        flex: 2;
        .title{
          padding: 15px;
          border-bottom: solid 1px #ccc;
          font-size: 16px;
          font-weight: bold;
        }
        .contentItem{
          min-height: 350px;
        }
      }
      .shortcutEntrance {
        background: #fff;
        border-radius: 5px 5px 0px 0px;
        flex: 1;
        .title{
          padding: 15px;
          border-bottom: solid 1px #ccc;
          font-size: 16px;
          font-weight: bold;
        }
        .contentItem{
          padding: 15px;
          span{
            display: inline-block;
            border-radius: 3px;
            background: $green;
            color:#fff;
            padding: 8px 16px;
            margin-right: 10px;
          }
        }
      }
    }
    .advContent{
      margin: 15px 0;
      background: #fff;
      border-radius: 5px 5px 0px 0px;
      .title{
        font-size: 16px;
        padding: 20px;
        font-weight: bold;
        border-bottom: solid 1px #ccc;
      }
      .contentItem{
        padding:0 30px;
        min-height: 350px;
        .item{
          display: flex;
          border-bottom: solid 1px #ccc;
          img{
            width: 80px;
            height: 80px;
            border-radius: 50%;
            margin-right: 10px;
          }
          p{
            margin: 15px 0;
            span{
              color:$blue;
              font-weight: 500;
            }
          }
        }
      }
    }
  }
}
</style>
