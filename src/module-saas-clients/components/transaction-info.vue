<template>
  <div class="boxInfo">
    <!-- 表单内容 -->
    <div class="formInfo">
      <div>
        <div class="boxMain">
           <el-table :data="formData.transactionRecord" element-loading-text="给我一点时间" fit highlight-current-row style="width: 100%; margin-top:10px;" border>
              <el-table-column prop="result" label="" width="50" align="center">
                <template slot-scope="props">
                  <i class="fa fa fa-circle-o colGreen" aria-hidden="true" v-if="props.row.result=='成功'"></i>
                  <i class="fa fa fa-circle-o colRed" aria-hidden="true" v-else></i>
                </template>
              </el-table-column>
              <el-table-column prop="opType" label="操作类型" width="100" ></el-table-column>
              <el-table-column prop="opUserID" label="操作人" width="220"></el-table-column>
              <el-table-column prop="result" label="执行结果" width="200">
                <template slot-scope="props">
                  <i class="rightTip" aria-hidden="true" v-if="props.row.result=='成功'" style="font-size:10px;"></i>
                  <i class="wrontTip" aria-hidden="true" v-else style="font-size:10px;"></i>
                  {{props.row.result}}
                </template>
              </el-table-column>
              <el-table-column prop="opTime" label="操作时间" width="200">
                <template slot-scope="props">
                  {{props.row.opTime | formatDate}}
                </template>
              </el-table-column>
              <el-table-column prop="opInfo" label="备注"></el-table-column>
            </el-table>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
import { formatDate } from '@/filters/index'
import { reviewDetail } from '@/api/base/sassClients'
var _this = null
export default {
  name: 'userInfo',
  components: {},
  props: ['formData'],
  data() {
    return {}
  },
  filters: {
    formatDate(time) {
      if (time !== null) {
        var date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    }
  },
  methods: {
    // 业务方法
    // 界面交互
  },
  // 挂载结束
  mounted: function() {
    // console.log(this.formData)
  },
  // 创建完毕状态
  created: function() {},
  // 组件更新
  updated: function() {}
}
</script>

<style rel="stylesheet/scss" lang="scss">
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.rightTip,.wrontTip{
  display:inline-block;
  width:6px;
  height: 6px;
  border-radius:3px;
  background:#42b983
}
.wrontTip{
  background:red;
}
</style>
