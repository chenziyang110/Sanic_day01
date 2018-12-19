<template>
  <div class="choose">
      <el-form :inline="true" >
        <el-form-item class="subtitle" label="时间：">
           <div class="radios">
                <el-button round   @click="handleOpenTime" :disabled="opened" >打开</el-button>
                <el-radio-group  v-model="currentrange" @change="handleData">
                    <el-radio-button label="0" :disabled="timedisabled">今天</el-radio-button>
                    <el-radio-button label="1" :disabled="timedisabled">昨天</el-radio-button>
                    <el-radio-button label="7" :disabled="timedisabled">最近7日</el-radio-button>
                    <el-radio-button label="30" :disabled="timedisabled">最近30日</el-radio-button>
                </el-radio-group>
            </div>
        </el-form-item>
        <el-button round class="definite-btn"  @click="handleDefiniteDate"  :disabled="definitedisable" >自定义日期：</el-button>
        <el-form-item  class="subtitle" label="">
          <el-date-picker
            v-model="currentdate"
            @change="handleData"
            :disabled="datedisabled"
            :picker-options="pickerOptions"
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
                <el-radio-group  v-model="currentside" @change="handleData">
                    <el-radio-button label="0" :disabled="sidedisable">全部</el-radio-button>
                    <el-radio-button label="1" :disabled="sidedisable">PC端</el-radio-button>
                    <el-radio-button label="2" :disabled="sidedisable">移动端</el-radio-button>
                </el-radio-group>
            </div>
        </el-form-item>
        <el-form-item  class="subtitle" label="访客：">
           <div class="radios">
                <el-button @click="handleSwitchVisitor"   round :disabled="switchvisitordisable">{{switchvisitor}}</el-button>
                <el-radio-group  v-model="currentvisitor"  @change="handleData">
                    
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
  name: 'SelectRegion',
  data() {
    return {
        currentrange: '1',
        currentside: '',
        currentvisitor: '',
        currentdate: '',
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now()
          }
        },
        // 打开按钮
        opened: true,
        // date
        timedisabled: false,
        datedisabled: true,
        definitedisable: false,
        // device&visitor
        sidedisable: true,
        visitordisable: true,
        flag1: true,
        flag2: true,
        switchvisitordisable: false,
        switchsidedisable: false,
        switchside: '打开',
        switchvisitor: '打开'

    }
  },
  methods: {
      handleCancelDate() {
          this.currentdate = ''
      },
      handleData() {
          this.$emit('handleTotalData', this.currentrange, this.currentside, this.currentvisitor, this.currentdate)
      },
      handleOpenTime() {
          this.datedisabled = true
          this.currentrange = '0'
          this.currentdate = ''
          this.timedisabled = false
          this.$emit('handleTotalData', this.currentrange, this.currentside, this.currentvisitor, this.currentdate)
      },
      handleDefiniteDate() {
          this.timedisabled = true
          this.currentrange = ''
          this.currentdate = ''
          this.datedisabled = false
          this.opened = false
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
.definite-btn {
    font-size: 16px;
    padding-right: 0
}
</style>
