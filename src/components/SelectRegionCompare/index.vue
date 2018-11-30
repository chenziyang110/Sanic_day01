<template>
  <div class="choose">
      <el-form :inline="true" >
        <el-form-item class="subtitle" label="时间：">
           <div class="radios">
                <el-radio-group  v-model="range" @change="handleData">
                    <el-radio-button label="0">今天</el-radio-button>
                    <el-radio-button label="1">昨天</el-radio-button>
                    <el-radio-button label="7">最近7日</el-radio-button>
                    <el-radio-button label="30">最近30日</el-radio-button>
                </el-radio-group>
            </div>
        </el-form-item>
        <el-form-item  class="subtitle" label="日期：">
          <el-date-picker
            v-model="date1"
            @change="handleData"
            type="date"
            format= "yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
          <el-checkbox v-model="comparecheck" @change="handleCompare">对比</el-checkbox>
          <el-date-picker
            v-model="date2"
            @change="handleCompareDate"
            :disabled = 'ifdisabled'
            type="date"
            format= "yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        

        <br />
        <el-form-item  class="subtitle" label="设备：">
           <div class="radios">
                <el-button  @click="handleSwitchSide" round :disabled="switchsidedisable">{{switchside}}</el-button>
                <el-radio-group  v-model="side" @change="handleData">
                    <el-radio-button label="0" :disabled="sidedisable">全部</el-radio-button>
                    <el-radio-button label="1" :disabled="sidedisable">PC端</el-radio-button>
                    <el-radio-button label="2" :disabled="sidedisable">移动端</el-radio-button>
                </el-radio-group>
            </div>
        </el-form-item>
        <el-form-item  class="subtitle" label="访客：">
           <div class="radios">
                <el-button @click="handleSwitchVisitor"   round :disabled="switchvisitordisable">{{switchvisitor}}</el-button>
                <el-radio-group  v-model="visitor"  @change="handleData">
                    
                    <el-radio-button label="0" :disabled="visitordisable">全部</el-radio-button>
                    <el-radio-button label="1" :disabled="visitordisable">新访客</el-radio-button>
                    <el-radio-button label="2" :disabled="visitordisable">老访客</el-radio-button>
                </el-radio-group>
            </div>
        </el-form-item>
      </el-form>
  </div>
</template>
<script>
export default {
  name: 'SelectRegionCompare',
  data() {
    return {
        range: '0',
        side: '',
        visitor: '',
        date1: '',
        date2: '',
        ifdisabled: true,
        disflag: true,
        sidedisable: true,
        visitordisable: true,
        flag1: true,
        flag2: true,
        comparecheck: '',
        switchvisitordisable: false,
        switchsidedisable: false,
        switchside: '打开',
        switchvisitor: '打开'

    }
  },
  methods: {
      handleCompare() {
          this.disflag = !this.disflag
          if (this.disflag === false) {
              this.ifdisabled = false
          } else {
              this.ifdisabled = true
          }
          
      },
      handleCompareDate() {
          this.$emit('handleCompareData', this.range, this.side, this.visitor, this.date1, this.date2)
      },
      handleData() {
          this.$emit('handleToolData', this.range, this.side, this.visitor, this.date1)
      },
      handleSwitchSide() {
          this.flag1 = !this.flag1
          if (this.flag1 === true) {
              this.switchside = '打开'
              this.currentside = ''
          } else if (this.flag1 === false) {
               this.switchside = '关闭'
               this.currentside = '0'
          }
          this.sidedisable = !this.sidedisable

          if (this.switchside === '关闭') {
           this.switchvisitordisable = true
          } else {
              this.switchvisitordisable = false
          }
          

      },
      handleSwitchVisitor() {
          this.flag2 = !this.flag2
          if (this.flag2 === true) {
              this.switchvisitor = '打开'
              this.currentvisitor = ''
          } else if (this.flag2 === false) {
              this.switchvisitor = '关闭'
               this.currentvisitor = '0'
          }
          this.visitordisable = !this.visitordisable

          if (this.switchvisitor === '关闭') {
           this.switchsidedisable = true
          } else {
              this.switchsidedisable = false
          }
          
      }
  },
  created() {
  }

}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.subtitle {
    line-height: 36px;
}
</style>
