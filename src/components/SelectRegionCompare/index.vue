<template>
  <div class="choose">
      <el-form :inline="true" >
        <el-form-item class="subtitle" label="时间：">
           <div class="radios">
                <!-- <el-button round   @click="handleOpenTime" :disabled="opened" >打开</el-button> -->
                <el-radio-group  v-model="range" @change="handleData">
                    <el-radio-button label="0" :disabled="timedisabled">今天</el-radio-button>
                    <el-radio-button label="1" :disabled="timedisabled">昨天</el-radio-button>
                    <el-radio-button label="7" :disabled="timedisabled">最近7日</el-radio-button>
                    <el-radio-button label="30" :disabled="timedisabled">最近30日</el-radio-button>
                </el-radio-group>
            </div>
        </el-form-item>
        <!-- <el-button round class="definite-btn"  @click="handleDefiniteDate"  :disabled="definitedisable" >自定义日期：</el-button> -->
        <el-form-item  class="subtitle" label="">
          <el-date-picker
            class="date"
            v-model="date"
            @change="handleData"
            type="date"
            
            :picker-options="pickerOptions1"
            placeholder="选择日期">
          </el-date-picker>
          <el-checkbox  @change="handleCompare" style="margin-left:50px">对比</el-checkbox>
          <el-date-picker
            v-model="date2"
            class="date2"
            @change="handleCompareDate"
            type="date"
            format= "yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions2"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <br />
        <el-form-item  class="subtitle" label="设备：">
           <div class="radios">
                <!-- <el-button  @click="handleSwitchSide" round :disabled="switchsidedisable">{{switchside}}</el-button> -->
                <el-radio-group  v-model="side" @change="handleData">
                    <el-radio-button label="0">全部</el-radio-button>
                    <el-radio-button label="1">PC端</el-radio-button>
                    <el-radio-button label="2">移动端</el-radio-button>
                </el-radio-group>
            </div>
        </el-form-item>
        <!-- <el-form-item  class="subtitle" label="访客：">
           <div class="radios">
                <el-button @click="handleSwitchVisitor"   round :disabled="switchvisitordisable">{{switchvisitor}}</el-button>
                <el-radio-group  v-model="visitor"  @change="handleData">
                    <el-radio-button label="0" :disabled="visitordisable">全部</el-radio-button>
                    <el-radio-button label="1" :disabled="visitordisable">新访客</el-radio-button>
                    <el-radio-button label="2" :disabled="visitordisable">老访客</el-radio-button>
                </el-radio-group>
            </div>
        </el-form-item> -->
      </el-form>
  </div>
</template>
<script>
export default {
  name: 'SelectRegionCompare',
  data() {
    return {
        range: '1',
        side: '0',
        visitor: '0',
        comparedisabled: true,
         // 打开按钮
        opened: true,
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
        flag2: true,
        pickerOptions1: this.beginDate(),
        pickerOptions2: this.compareDate()
        
    }
  },
  methods: {
      beginDate() {
        return {
            disabledDate(time) {
                return time.getTime() > Date.now()// 开始时间不选时，结束时间最大值小于等于当天
            }
        }
      },
      compareDate() {
        return {
            disabledDate(time) {
                return time.getTime() > Date.now() // 开始时间不选时，结束时间最大值小于等于当天
            }
        }
        // return {
        //   disabledDate() {
        //                                              console.log(currentdate)
        //     // if (this.date != null) {
        //     //   return new Date(this.date).getTime() > time.getTime() || time.getTime() > Date.now()
        //     // } else {
        //     //   return time.getTime() > Date.now()// 开始时间不选时，结束时间最大值小于等于当天
        //     // }
        //   }
        // }
      },
      handleCompareDate() {
          this.$emit('handleCompareData', this.range, this.side, this.visitor, this.date, this.date2)
      },
      handleData() {
          this.$emit('handleToolData', this.range, this.side, this.visitor, this.date)
      },
      
      // 日期选择
      handleOpenTime() {
          this.datedisabled = true
          this.range = '0' 
          this.timedisabled = false
          this.comparedisabled = true
          this.date2 = ''
          this.$emit('handleToolData', this.range, this.side, this.visitor, this.date)
      },
      // 自定义日期
       handleDefiniteDate() {
          this.timedisabled = true
          this.range = ''
          this.date = ''
          this.datedisabled = false
          this.comparedisabled = false
          this.opened = false
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
      // 日期限
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
