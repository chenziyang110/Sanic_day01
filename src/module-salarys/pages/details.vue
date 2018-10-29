<template>
  <div class="detailsContainer">
    <div class="contLeft">
      <div class="topTit">
        <img src="./../../assets/img.jpeg" alt="">
        <div class="info">
          <p class="name"><strong> 张三 </strong><span>在职</span></p>
          <p class="time">入职时间: 2018-09-27   最新工资基数： 20000 <ul><span class="more">?</span><li>按月计薪员工为所有调薪后的基本工资、岗位工资合计（包括税前、税后）；按日计薪员工为基本工资*21.75+∑岗位工资项</li></ul></p>
          <p>最新 / 当月基本工资基数: 1000</p>
          <p>最新 / 当月基本工资基数: 1000</p>
        </div>
      </div>
      <div>
        <div class="social">
          <div class="title"> <strong>津贴</strong></div>
          <div class="table">
            <div class="tabTit"><div>津贴类型</div><div> 补贴金额 </div><div>津贴类型</div><div> 补贴金额 </div></div>
            <div class="tabRow"><div>交通补助</div><div> 0 </div><div>住房补助</div><div> 0 </div></div>
          </div>
        </div>
        <div class="fund">
          <div class="title"> <strong>社保公积金</strong> <span>企业 0</span> <span>个人 0</span></div>
          <div class="table">
            <div class="tabTit"><div>缴费项目</div><div>基数</div><div> 企业缴纳 </div><div>个人缴纳</div></div>
            <div class="tabRow"><div>社保</div><div> 0 </div><div>0</div><div> 0 </div></div>
            <div class="tabRow"><div>公积金</div><div> 0 </div><div>0</div><div> 0 </div></div>
            <div class="tabRow"><div>缴费合计</div><div> 0 </div><div>0</div><div> 0 </div></div>
          </div>
        </div>
        <div class="formTable">
          <el-form :label-position="'left'" label-width="180px" :model="formLabelAlign">
            <el-form-item label="实际出勤天数（正式）：" style="width: 50%;">
              <el-input v-model="formLabelAlign.name" placeholder="0"></el-input>
            </el-form-item>
            <el-form-item label="计薪天数（正式）："  style="width: 50%;">
              <el-input v-model="formLabelAlign.number" placeholder="0"></el-input>
            </el-form-item>
            <el-form-item label="计薪标准："  style="width: 50%;">
              <el-input v-model="formLabelAlign.type" placeholder="0"></el-input>
            </el-form-item>
            <el-form-item label="计税方式：" style="width: 50%;">
              <el-select v-model="formLabelAlign.region" style="width: 100%;" placeholder="请选择活动区域">
                <el-option label="工资" value="shanghai"></el-option>
                <el-option label="工资二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div class="contRit">
      <div class="topTit"><strong>招聘日程</strong></div>
      <div class="Items">
        <li><div class="name"><p>HR专员</p><p>2018-12-3 3:30</p></div><div class="act"> <strong>放弃</strong> </div></li>
        <li><div class="name"><p>HR专员</p><p>2018-12-3 3:30</p></div><div class="act"> <strong>放弃</strong> </div></li>
      </div>
    </div>
  </div>
</template>

<script>
  import { getSalarysList } from '@/api/hrm/salarysApi'

  export default {
    name: 'users-table-index',
    components: { getSalarysList },
    data() {
      return {
        tableData: [],
        formLabelAlign: {
          name: '',
          number: '',
          region: '工资',
          type: ''
        }
      }
    },
    methods: {
      init () {
        getSalarysList({})
          .then(res => {
            console.log(res)
            this.tableData = res.data.items
            this.loading = false
          })
          .catch(err => {
            console.log(err)
            this.loading = false
          })
      }
    },
    mounted() {
      this.init()
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "./../../styles/variables";
  .detailsContainer{
    display: flex;
    padding: 15px;
    .contLeft{
      flex: 4;
      background: #fff;
      margin-right: 10px;
      padding: 20px;
      .topTit{
        display: flex;
        padding-bottom: 10px;
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
          line-height: 25px;
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
      .social{
        padding-bottom: 10px;
        .title{
          line-height: 40px;
        }
        .table{
          display: table;
          background: #f9f9f9;
          padding: 20px;
          line-height: 30px;
          width: 100%;
          text-align: center;
          .tabTit{
            display: table-row;
            font-weight: bold;
            div{
              display: table-cell;
            }
          }
          .tabRow{
            display: table-row;
            width: 100%;
            div{
              display: table-cell;
            }
          }
        }
      }
      .fund{
        padding-bottom: 10px;
        .title{
          line-height: 40px;
          span{
            display: inline-block;
            padding: 0 80px;
          }
        }
        .table{
          display: table;
          background: #f9f9f9;
          padding: 20px;
          line-height: 30px;
          width: 100%;
          text-align: center;
          .tabTit{
            display: table-row;
            font-weight: bold;
            div{
              display: table-cell;
            }
          }
          .tabRow{
            display: table-row;
            width: 100%;
            div{
              display: table-cell;
            }
          }
        }
      }
      .formTable{
        margin-top: 20px;
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
          .name{
            position: relative;
            text-align: center;
            line-height: 24px;
            padding: 0 0 10px 0;
            flex: 2;
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
            flex: 1;
            text-align: center;
          }
        }
      }
    }
  }
</style>
