<template>
    <div class="cont-top-box">
        <div class="top-lable">
          <div class="careful-lab"> <i class="el-icon-info"></i>本月（10.01-10.31）：社保在缴 108 公积金在缴 108 增员1 减员1 入职0 离职 0 </div>
          <div class="lable-tit"><a href=""><i class="el-icon-search"></i></a><a href="#">赛选</a><a href="#">导入</a><router-link :to="{'path':'/social-securitys/historicalArchiving'}">历史归档</router-link><router-link :to="{'path':'/social-securitys/monthStatement'}">十月报表</router-link> </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'pageToolScoial',
  data() {
    return {
      dataes: ''
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.cont-top-box {
  padding: 20px;
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.top-lable{
  position: relative;
  line-height: 2;
  a{
   display: inline-block;
   padding: 0 10px;
  }
  .careful-lab{
    i{
      margin-right: 5px;
      color:#409EFF;
    }
    display: inline-block;
    padding: 0px 10px;
    border-radius: 3px;
    border: 1px solid rgba(145, 213, 255, 1);
    background: rgba(230, 247, 255, 1);
  }
  .lable-tit{
    position: absolute;
    right: 0;
    top:0px;
  }
}
</style>
