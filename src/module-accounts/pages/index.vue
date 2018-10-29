<template>
  <div class="accountsBox">
    <div class="accountsTop">
      <div class="accountsTop">
        <div class="topLab" ><span @click="tabSwitch('account')" :class="[tabLab == 'account' ? 'act' : '']">企业信息</span><span @click="tabSwitch('transaction')" :class="[tabLab == 'transaction' ? 'act' : '']">账户信息</span></div>
      </div>
      <div class="accountsCont">
        <div class="account" v-show="tabLab == 'account'">
          <div class="title"><span>账户</span><span>开始时间</span><span>结束时间</span></div>
          <div class="item"><span>{{accountList.currentVersion}}</span><span>{{accountList.registrationDate}}</span><span>{{accountList.dueDate}}</span><span class="last"><a @click="purchase">购买正式版</a></span></div>
        </div>
        <div class="transaction" v-show="tabLab == 'transaction'">
            <div class="balance">当前余额：<em>{{ accountInformation.balance }}</em> <span @click="dialogVisible = true">立即充值</span>
              <!--<div class="dateSet"><el-date-picker size="mini" style="width: 150px;" v-model="dateVal" type="month" placeholder="选择月"> </el-date-picker></div>-->
            </div>
            <div>
              <!--<div>2017-10  充值：25,000.00 扣款：25,000.00</div>-->
              <div>
                <el-table :data="accountInformation.startTime" border style="width: 100%">
                  <el-table-column fixed prop="transactionType" label="交易类型"></el-table-column>
                  <el-table-column fixed prop="operationUser" label="操作人"></el-table-column>
                  <el-table-column fixed prop="operatingTime" label="操作时间"></el-table-column>
                  <el-table-column fixed prop="note" label="备注"></el-table-column>
                  <el-table-column fixed prop="amount" label="金额"></el-table-column>
                  <el-table-column fixed prop="balance" label="账户余额"></el-table-column>
                </el-table>
              </div>
            </div>
        </div>
      </div>
    </div>
    <!-- 充值弹框 - state -->
    <el-dialog class="dialogBox" title="充值中心" :visible.sync="dialogVisible" width="30%" style="min-width: 700px;" :before-close="handleClose">
      <div class="currentBalance">当前余额：<span>{{ accountInformation.balance }}</span>元</div>
      <div class="repaidBalance">充值金额：<el-input v-model="money" style="width:150px;" size = "mini" placeholder="请输入充值金额"></el-input></div>
      <div class="typeChoice">选择充值方式：
        <span @click="monthChoice('1')" :class="[typeRecharge == '1' ? 'xact' : '']">微信</span>
        <span @click="monthChoice('2')" :class="[typeRecharge == '2' ? 'act' : '']">支付宝</span>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">关闭</el-button>
    <el-button type="primary" @click="goPay">立即支付</el-button>
  </span>
    </el-dialog>
    <!-- 充值弹框 - end -->
  </div>
</template>

<script>
  import { company, information, pay, paySuccess } from '@/api/hrm/accountsApi'
  export default {
    name: 'settings-table-index',
    components: {},
    data() {
      return {
        tabLab: 'account',
        dateVal: '2018-3',
        dialogVisible: false,
        month: '1',
        typeRecharge: '1',
        rechargeMonth: '',
        accountList: [],
        accountInformation: [],
        money: ''
      }
    },
    methods: {
      // 初始化数据
      init() {
        company({})
          .then(res => {
            this.accountList = res.data
            console.log(res)
            this.loading = false
          })
          .catch(err => {
            this.$message.error(err)
            this.loading = false
          })
      },
      tabSwitch(obj) {
        console.log(obj)
        this.tabLab = obj
        if (obj === 'transaction') {
          information({})
            .then(res => {
              this.accountInformation = res.data
              console.log(this.accountInformation)
              this.loading = false
            })
            .catch(err => {
              console.log(err)
              this.loading = false
            })
        }
      },
      monthChoice(mon) {
        if (typeof mon === 'number') {
          this.month = mon
        } else if (typeof mon === 'string') {
          this.typeRecharge = mon
        }
      },
      handleClose(done) {
        done()
      },
      // 购买弹框
      purchase() {
          this.$alert('购买正式版请联系电话：888888', '购买正式版', {
            confirmButtonText: '确定'
          })
      },
      goPay() {
        if (this.money && this.money > 0) {
          pay({amount: this.money, type: this.typeRecharge})
            .then(res => {
              this.tabSwitch('transaction')
              this.$message.success('充值成功！')
              this.dialogVisible = false
            })
            .catch(err => {
              console.log(err)
              this.$message.error(err)
            })
        } else {
          this.$message.error('请输入充值金额！')
        }
      }
    },
    watch: {
      rechargeMonth(curVal, oldVal) {
        this.month = curVal
        console.log(curVal)
      }
    },
    mounted() {
      this.init()
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import './../../styles/variables.scss';
  .accountsBox {
    padding: 20px;
    background: #fff;
    border-radius: 3px;
    margin: 15px;
    border: 1px solid #ebeef5;
    .accountsTop{
      color:#666;
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
    .accountsCont{
      min-height: 500px;
      .account{
        span{
          display: inline-block;
          width: 180px;
          font-size: 16px;
          height: 40px;
          overflow: hidden;
        }
        .title{
          span{
            font-size: 14px;
            color:#666;
          }
        }
        .last{
          width: calc(100% - 540px);
          text-align: right;
          a{
            background: $green;
            color:#fff;
            border-radius: 3px;
            padding: 4px 15px;
          }
        }
      }
      .transaction{
        .balance{
          position: relative;
          top:10px;
          font-size: 14px;
          margin-bottom: 10px;
          background: #f4f4f4;
          padding: 0 10px;
          em{
            margin-right: 5px;
          }
          span{
            font-size: 14px;
            background: $green;
            color:#fff;
            border-radius: 3px;
            display: inline-block;
            padding:7px 10px;
            line-height: 1;
          }
          .dateSet{
            position: absolute;
            top:0px;
            right: 10px;
          }
        }
      }
    }
    .dialogBox{
      .monthChoice{
        position: relative;
        margin: 10px;
        span{
          display: inline-block;
          margin-right: 10px;
          padding: 6px 10px;
          line-height: 1;
          border-radius: 4px;
          border:solid 1px #dcdfe6;
          cursor: pointer;
        }
        span:last-child{
          position: relative;
          border:none;
          top:-1px;
          left: -8px;
        }
        .act{
          color:#fff;
          background: $green;
          border-color: $green;
        }
      }
      .typeChoice{
        position: relative;
        margin: 10px;
        span{
          display: inline-block;
          width: 120px;
          text-align: center;
          margin-right: 10px;
          padding: 6px;
          line-height: 1;
          border-radius: 4px;
          border:solid 1px #dcdfe6;
          cursor: pointer;
        }
        .act{
          color:#fff;
          background: $green;
          border-color: $green;
        }
        .xact{
          color:#fff;
          background: $green1;
          border-color: $green1;
        }
      }
    }
    .currentBalance{
      margin-top: 20px;
      padding:8px 10px;
    }
    .repaidBalance{
      padding:8px 10px;
    }
  }
</style>
