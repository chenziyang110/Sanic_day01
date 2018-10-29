<template>
  <div class="informationContainer">
      <div class="tablab">
        <span @click="tabSwitch(1)" :class="{act:active == 1}">面试推荐反馈（12）</span>
        <span @click="tabSwitch(2)" :class="{act:active == 2}">面试邀约反馈（10）</span>
        <span @click="tabSwitch(3)" :class="{act:active == 3}">面试信息反馈（10）</span>
        <span @click="tabSwitch(4)" :class="{act:active == 4}">offer 反馈（10）</span>
      </div>
    <div class="table">
      <div v-show="itemDataes.length == 0" style="text-align: center;line-height: 50px;color:#999;">数据为空</div>
      <div class="item" v-for="(item, index) in itemDataes" :key="index">
        <div><p>{{item.fullName}}</p><p>{{item.telephone}}</p></div>
        <div style="line-height: 48px;">{{item.position}}</div>
        <div style="color:#666;">
          <p>{{item.operationDescription}}</p>
          <p>{{$tools.timestampToTime(item.operationDate)}}</p>
        </div>
        <div>
          <p style="color:red">{{item.resultDescription}}</p>
          <p style="color:red">{{$tools.timestampToTime(item.resultDate)}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getResumesList, getMessages} from '@/api/hrm/recruitsApi'
  import ExaminationApproval from '../components/ExaminationApproval'

  export default {
    name: 'recruits-table-index',
    components: {ExaminationApproval},
    data() {
      return {
        active: '1',
        itemDataes: {}
      }
    },
    methods: {
      init(obj) {
        getMessages({state: obj})
          .then(res => {
            console.log(res)
            this.itemDataes = res.data.items
          })
          .catch(err => {
            this.$message.error(err)
          })
      },
      tabSwitch(obj) {
        this.active = obj
        this.init(obj)
      }
    },
    mounted() {
      this.init('1')
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "./../../styles/variables";
  .informationContainer {
    margin: 15px;
    background: #fff;
    padding: 25px;
    .tablab{
      border-bottom: solid 2px #999;
      line-height: 50px;
      span{
        display: inline-block;
        margin-right: 15px;
        font-weight: bold;
        cursor:pointer;
      }
      .act{
        color:$blue;
      }
    }
    .table{
      .item{
        display: flex;
        padding: 10px;
        line-height:24px;
        border-bottom: solid 1px #ccc;

        color:#333;
        div{
          flex: 1;
          max-width: 300px;
        }
      }
    }
  }
</style>
