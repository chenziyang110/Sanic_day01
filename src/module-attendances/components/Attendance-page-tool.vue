<template>
    <div class="cont-top-box">
        <div class="top-lable">
          <div class="careful-lab"> <i class="el-icon-info"></i>有 {{attendInfo.tobeTaskCount}} 条考勤审批尚未处理 </div>
          <div class="lable-tit">
            <span class="serachInput">
            <i class="fa fa-search" aria-hidden="true" @click="searchIcon" v-show="iconShow" title="搜索"></i>
              <el-input
                placeholder="搜索"
                v-model="formData.keyword"
                clearable
                v-show="searchShow"
                @clear='handleClear'
                @keyup.enter.native='dataSearch'>
              </el-input>
            </span>
            <router-link :to="{'path':'/employees/import/',query: {name: '考勤'}}" class="fa fa-external-link" aria-hidden="true"  title="导入"></router-link>
            <i class="fa fa-bell-o" aria-hidden="true" title="提醒" @click="handleTip"></i>
            <i class="fa fa-cog" aria-hidden="true" title="设置"></i>
            <router-link :to="{'path':'/attendances/archiving/'}" class="fa fa-folder-o" aria-hidden="true"  title="历史归档"></router-link>
            <router-link :to="{'path':'/attendances/report/'+ attendInfo.month}">{{attendInfo.month}}月份报表</router-link>
            </div>
            
        </div>
        <el-dialog
            title="提醒"
            :visible.sync="centerDialogVisible"
            width="280px"
            center>
            <div class="attenInfo">
              <p>系统将通过邮件与短信的形式，对全体员工中存在旷工的考勤进行提醒，该提醒每月仅可发送 1 次。</p>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="handleSub">我知道了</el-button>
              <el-button @click="centerDialogVisible = false">取 消</el-button>
            </span>
          </el-dialog>
    </div>
</template>

<script>
import { alert } from '@/api/hrm/accountsApi'
export default {
  name: 'AttendancesPageTool',
  props: ['monthOfReport', 'formData', 'attendInfo'],
  data() {
    return {
      dataes: '',
      iconShow: true,
      searchShow: false,
      centerDialogVisible: false
    }
  },
  methods: {
    handleSub() {
      alert().then(() => {
        this.centerDialogVisible = false
        this.$emit('dataList')
      })
    },
    // 集合搜索
    searchIcon() {
      this.iconShow = false
      this.searchShow = true
    },
    // 清除搜索数据
    handleClear() {
      this.iconShow = true
      this.searchShow = false
      this.$emit('dataList', this.formData)
    },
    dataSearch() {
      this.$emit('dataList', this.formData)
    },
    handleTip() {
      this.centerDialogVisible = true
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.cont-top-box {
  padding: 20px;
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.top-lable {
  position: relative;
  line-height: 2;
  a {
    display: inline-block;
    padding: 0 5px;
  }
  i{
    padding: 0 5px;
  }
  .careful-lab {
    i {
      margin-right: 5px;
      color: #409eff;
    }
    display: inline-block;
    padding: 0px 10px;
    border-radius: 3px;
    border: 1px solid rgba(145, 213, 255, 1);
    background: rgba(230, 247, 255, 1);
  }
  .lable-tit {
    position: absolute;
    right: 0;
    top: 0px;
  }
}
.serachInput {
  .el-input--medium {
    width: 150px;
    .el-input__inner {
    }
  }
}
.serachInput .el-input--medium .el-input__inner {
  height: 26px;
  line-height: 26px;
}
.attenInfo {
  p {
    line-height: 30px;
  }
}
</style>
