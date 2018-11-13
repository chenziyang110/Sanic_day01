<template>
  <div class="choose">
      <el-form :inline="true" >
        <el-form-item class="subtitle" label="时间：">
           <div class="radios">
                <el-radio-group  v-model="currentrange" @change="handleData">
                    <el-radio-button label="0">今天</el-radio-button>
                    <el-radio-button label="1">昨天</el-radio-button>
                    <el-radio-button label="7">最近7日</el-radio-button>
                    <el-radio-button label="30">最近30日</el-radio-button>
                </el-radio-group>
            </div>
        </el-form-item>
        <el-form-item  class="subtitle" label="日期：">
          <el-date-picker
            v-model="currentdate"
            @change="handleData"
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
        currentrange: '0',
        currentside: '',
        currentvisitor: '',
        currentdate: '',
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
      handleData() {
          this.$emit('handleTotalData', this.currentrange, this.currentside, this.currentvisitor, this.currentdate)
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
