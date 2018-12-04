<template>
  <div class="choose">
      <el-form :inline="true" >
        <el-form-item class="subtitle" label="时间：">
           <div class="radios">
                <el-button  @click="handleSwitchTime" round :disabled="switchtimedisabled">{{switchtime}}</el-button>
                <el-radio-group  v-model="range" @change="handleChooseData">
                    <el-radio-button label="0" :disabled="timedisabled">今天</el-radio-button>
                    <el-radio-button label="1" :disabled="timedisabled">昨天</el-radio-button>
                    <el-radio-button label="7" :disabled="timedisabled">最近7日</el-radio-button>
                    <el-radio-button label="30" :disabled="timedisabled">最近30日</el-radio-button>
                </el-radio-group>
            </div>
        </el-form-item>
        <el-button  @click="handleDefiniteDate" round :disabled="definitedisable" >{{switchdate}}</el-button>
        <el-form-item  class="subtitle" label="">
          <el-date-picker
            class="date"
            v-model="date"
            @change="handleDateData"
            type="date"
            :disabled = "datedisabled"
            format= "yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
          <el-checkbox v-model="comparecheck" @change="handleCompare">对比</el-checkbox>
          <el-date-picker
            v-model="date2"
            class="date2"
            @change="handleCompareDate"
            :disabled = 'date2disabled'
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
        comparecheck: '',
        // 日期选择
        date: '',
        date2: '',
        switchtimedisabled: false,
        timedisabled: false,
        switchtime: '选择时间',
        definitedisable: false,
        switchdate: '自定义日期',
        datedisabled: true,
        date2disabled: true,
        flagtime: true,
        flagdate: true,
        
        // 访客与设备
        switchside: '打开',
        switchsidedisable: false,
        sidedisable: true,
        switchvisitor: '打开',
        switchvisitordisable: false,
        visitordisable: true,
        disflag: true,
        flag1: true,
        flag2: true
    }
  },
  methods: {
      handleCompareDate() {
          this.$emit('handleCompareData', this.range, this.side, this.visitor, this.date, this.date2)
      },
      handleChooseData() {
          this.datedisabled = true
          this.$emit('handleChooseData', this.range, this.side, this.visitor, this.date)
      },
      handleDateData() {
          this.$emit('handleDataDate', this.range, this.side, this.visitor, this.date)
      },
      handleData() {
          this.$emit('handleToolData', this.range, this.side, this.visitor, this.date)
      },
      // 日期选择
      handleSwitchTime() {

      },
      // 点击自定义日期
      handleDefiniteDate() {
          this.flagdate = !this.flagdate
          if (this.flagdate === true) {
              this.switchtime = '选择时间'
          } else if (this.flagdate === true) {
               this.switchtime = '关闭时间'
          }
          
          this.timedisabled = !this.timedisabled
          if (this.switchtime === '关闭时间') {
           this.datedisabled = true
          } else {
              this.datedisabled = false
          }
      },
      // 设备选项
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
      // 访客选择
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
          
      },
      // 点击对比选框
      handleCompare() {
          this.disflag = !this.disflag
          if (this.disflag === false) {
              this.date2disabled = false
          } else {
              this.date2disabled = true
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
