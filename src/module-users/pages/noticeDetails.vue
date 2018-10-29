<template>
  <div class="noticeDetails">
    <div class="noticeDetailsTop">
      <div class="topLab" ><span class="act">公告</span></div>
    </div>
    <div class="noticeDetailsCentent">
      <div class="title">显示公告标题</div>
      <div class="time">2018-09-20 11:32:04</div>
      <div class="content">
        公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容
      </div>
    </div>
  </div>
</template>

<script>
  import {list} from '@/api/example/table'
  export default {
    name: 'users-table-index',
    components: {},
    data() {
      return {
        form: {
          name: '张三',
          phone: '15116921204',
          region: '本科',
          sex: '男'
        }
      }
    },
    methods: {
      onSubmit() {
        console.log(2345678)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "./../../styles/variables";
  .noticeDetails{
    padding:15px;
    .noticeDetailsTop{
      color:#666;
      background: #fff;
      border-bottom:solid 1px #ccc;
      line-height: 40px;
      span{
        display: inline-block;
        padding: 0 25px;
        font-size: 18px;
        cursor:pointer;
      }
      .act{
        color:$green;
        border-bottom: solid 2px $green;
      }
    }
    .noticeDetailsCentent{
      background: #fff;
      padding: 20px;
      min-height: 500px;
      line-height: 2;
      .title{
        font-size: 18px;
        line-height: 40px;
        font-weight: bold;
      }
      .time{
        font-size: 16px;
        color:#999;
        line-height: 40px;
      }
    }
  }
</style>
