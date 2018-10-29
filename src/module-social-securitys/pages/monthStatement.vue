<template>
  <div class="monthStatementBox">
    <div class="monthStatementTop">
      <div class="title">
        <span>社保报表</span>
      </div>
    </div>
    <div class="monthStatementTable">
        <div class="itemDropDown">
          <div class="topLab">
            <div><span style="background-color:#cfeffe;"></span>已离职</div>
            <div><span style="background-color:#a8f8bb;"></span>再入职</div>
            <div><span style="background-color:#fedbd7;"></span>公司合计</div>
            <div><span style="background-color:#ffe8c9;"></span>一级部门</div>
            <div><span style="background-color:#fdfcd5;"></span>二级部门</div>
            <div class="rightLabBox">
              <a href="/"><i class="el-icon-search"></i></a>
              <a href="/"><div>导出</div></a>
            </div>
          </div>
          <el-table :data="contentData" border style="width: 100%;text-align: center">
            <el-table-column type="index" label="序号" fixed center width="50"> </el-table-column>
            <el-table-column prop="fullName" label="姓名" width="150px"> </el-table-column>
            <el-table-column prop="dateOfEntry" label="入职时间" width="150px"> </el-table-column>
            <el-table-column prop="cellPhoneNumber" label="手机号" width="150px"> </el-table-column>
            <el-table-column prop="iDNumber" label="身份证号码" width="150px"> </el-table-column>
            <el-table-column prop="bankCardNumber" label="银行卡号" width="150px"> </el-table-column>
            <el-table-column prop="firstLevelDepartment" label="一级部门" width="150px"> </el-table-column>
            <el-table-column prop="twoLevelDepartment" label="二级部门"  width="150px"> </el-table-column>
            <el-table-column prop="twoLevelDepartment" label="工作城市"  width="150px"> </el-table-column>
            <el-table-column prop="twoLevelDepartment" label="社保电脑号"  width="150px"> </el-table-column>
            <el-table-column prop="twoLevelDepartment" label="公积金账号"  width="150px"> </el-table-column>
            <el-table-column prop="twoLevelDepartment" label="离职日期"  width="150px"> </el-table-column>
            <el-table-column prop="twoLevelDepartment" label="户籍类型" width="150px"> </el-table-column>
            <el-table-column prop="twoLevelDepartment" label="参保城市" width="150px"> </el-table-column>
            <el-table-column prop="twoLevelDepartment" label="社保月份" width="150px"> </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="butList"><span @click="archivingReportForm">归档9月份报表</span><span @click="createReportForm">新建报表</span><span class="cancel">取消</span></div>
  </div>

</template>

<script>
  import PageTool from '../components/ScoialPageTool.vue'
  import {getArchivingList, getArchivingCont} from '@/api/hrm/socialSecuritys'
  export default {
    name: 'historicalArchiving',
    components: {
      PageTool
    },
    data() {
      return {
        num: 0,
        yearVal: '2018',
        contentData: []
      }
    },
    methods: {
      init() {
        getArchivingCont({month: 12})
          .then(res => {
            this.contentData = res.data.items
            this.loading = false
          })
          .catch(err => {
            if (err) {
              console.log(err)
            }
            this.loading = false
          })
      },
      // 归档报表
      archivingReportForm() {
        this.$confirm('您确定要归档2018年10月报表？报表归档将覆盖上一次归档记录，无法恢复。', '归档确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$message({
            type: 'success',
            message: '确定!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消'
          })
        })
      },
      // 新建报表
        createReportForm() {
        this.$confirm('您将创建 《 2018年11月 》 报表', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$message({
            type: 'success',
            message: '确定!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消'
          })
        })
      }
    },
    mounted() {
      this.init()
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import './../../styles/variables.scss';

  .monthStatementBox{
    padding: 20px;
    .monthStatementTop{
      position:relative;
      background: #fff;
      padding:10px 15px 0 15px;
      border-bottom:solid 1px #f4f4f4;
      .title{
        color:$panGreen;
        line-height: 40px;
        border-bottom: solid 2px $panGreen;
        font-size: 18px;
        font-weight: bold;
        display: inline-block;
        padding: 0 25px;
        .yearChange{
          position: absolute;
          top:5px;
          right: 10px;
        }
      }
    }
    .monthStatementTable{
      background: #fff;
        .itemTopLab{
          border-top:solid 1px #f0f0f0;
          border-bottom: solid 3px #ccc;
          padding: 15px;
          div{
            display: inline-block;
            padding:0 50px;
            border-right: solid 1px #ccc;
          }
          div:last-child, div:first-child{
            border: none;
          }
          .lab{
            position: relative;
            top:-15px;
            padding-right: 0;
            padding-left: 15px;
          }
          .labTit{
            cursor:pointer;
          }
          .title{
            font-size: 16px;
            margin: 10px 0;
            span{
              position: relative;
              bottom:-2px;
              font-size: 13px;
              color:#999;
              margin-left: 5px;
            }
          }
          .itemTit{
            color:#999;
            margin: 8px 0;
            font-size: 13px;
          }
          .itemNum{
            font-size: 20px;
            margin: 0;
          }
        }
        .itemDropDown{
          background: #fff;
          .topLab{
            position: relative;
            padding: 15px;
            div{
              display: inline-block;
              margin: 0 10px;
              span{
                display: inline-block;
                position: relative;
                top:2px;
                margin-right: 5px;
                width: 15px;
                height: 15px;
                background:$cl-1;
              }
            }
            .rightLabBox{
              position: absolute;
              right: -10px;
              top:10px;
              div{
                border:solid 1px $green;
                color:$green;
                border-radius:3px;
                padding: 4px 10px;
                font-size: 14px;
              }
          }
        }
        .act{
          border-bottom:solid 3px $panGreen;
          .lab{
            color:$panGreen;
          }
          .labTit{
            color:$panGreen;
          }
        }
      }
      .itemes:hover{
        background: #fafbff;
      }
      .itemes .lab:hover{
        cursor:pointer;
      }
    }
    .butList{
      border-top:solid 1px #f4f4f4;
      text-align: center;
      background: #fff;
      span{
        display: inline-block;
        background: $green;
        color:#fff;
        padding: 8px 20px;
        border-radius:3px;
        margin: 10px;
        cursor:pointer;
      }
      .cancel{
        background: #ccc;
        color:#666;
      }
    }
  }
</style>
