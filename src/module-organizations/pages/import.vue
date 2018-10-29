<template>
<div class="dashboard-container">
    <div class="app-container">
      <el-card :style="{minHeight:boxHeight}" class="rInfo">
        <div>
        <div class="infoTip">
          <div>
            <h2 class="text-center">组织架构导入</h2>
            <el-alert
              type="warning"
              show-icon
              :closable="false" title="" >
              <template>
               <div class="tipInfo">
                <p>1、一次性可导入多个部门，最多可导入到十个层级部门；</p>
                <p>2、模板文件内的部门编码列和上级部门编码列是用来定位部门在组织架构中所在的位置，只可新增不可更新此两列信息；</p>
                <p>3、模板文件内的上级部门编码列为非必填列，若未填写此列，则默认将导入部门放在公司下的一级部门；</p>
              </div>
             </template>
              <!-- <slot slot-scope="props">
                
              </slot> -->
            </el-alert>
          </div>
        </div>
        <component v-bind:is="importCompon" ref="import" :baseData='baseData'></component>
        </div>
      </el-card>
    </div>
</div>
</template>

<script>
import { minHeight } from '@/filters/index'
import importCompon from '@/components/import/index'
export default {
  name: 'refortList',
  components: {
    importCompon
  },
  data() {
    return {
      importCompon: 'importCompon',
      boxHeight: '',
      baseData: {
        upUrl: '/api/organizations/import',
        fileUrl: 'http://research.itcast.cn/files/saas-hrm/组织架构模板.xlsx'
      }
    }
  },
  methods: {
    // 业务方法
  },
  // 挂载结束
  mounted: function() {},
  // 创建完毕状态
  created: function() {
    this.boxHeight = minHeight() // 右边内容高度
  },
  // 组件更新
  updated: function() {}
}
</script>

<style rel="stylesheet/scss" lang="scss">
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.tipInfo {
  line-height: 24px;
  font-size: 12px;
}
</style>
