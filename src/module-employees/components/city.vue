<template>
  <div class="linkage">
    <el-select
      v-model="provinceInfo"
      @change="choseProvince"
      filterable
      placeholder="省级地区">
      <el-option
        v-for="item in province"
        :key="item.id"
        :label="item.value"
        :value="item.id">
      </el-option>
    </el-select>
    <el-select
      v-model="cityInfo"
      @change="choseCity"
      filterable
      placeholder="市级地区">
      <el-option
        v-for="item in cityDate"
        :key="item.id"
        :label="item.value"
        :value="item.id">
      </el-option>
    </el-select>
    <el-select
      v-model="areaInfo"
      @change="choseBlock"
      filterable
      placeholder="区级地区">
      <el-option
        v-for="item in areaDate"
        :key="item.id"
        :label="item.value"
        :value="item.id">
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { city } from './../../api/example/form'
export default {
  data() {
    return {
      province: '',
      provinceInfo: '',
      cityInfo: '',
      cityDate: [],
      areaInfo: '',
      areaDate: [],
      city: '',
      block: ''
    }
  },
  methods: {
    // 加载china地点数据，三级
    getCityData: function() {
      var that = this
      city().then(function(response) {
          if (response.status === 200) {
            var data = response.data
            that.province = []
            that.city = []
            that.block = []
            // 省市区数据分类
            for (var item in data) {
              if (item.match(/0000$/)) {
                // 省
                that.province.push({
                  id: item,
                  value: data[item],
                  children: []
                })
              } else if (item.match(/00$/)) {
                // 市
                that.city.push({ id: item, value: data[item], children: [] })
              } else {
                // 区
                that.block.push({ id: item, value: data[item] })
              }
            }
            // 分类市级
            for (var index in that.province) {
              for (var index1 in that.city) {
                if (
                  that.province[index].id.slice(0, 2) ===
                  that.city[index1].id.slice(0, 2)
                ) {
                  that.province[index].children.push(that.city[index1])
                }
              }
            }
            // 分类区级
            for (var item1 in that.city) {
              for (var item2 in that.block) {
                if (
                  that.block[item2].id.slice(0, 4) ===
                  that.city[item1].id.slice(0, 4)
                ) {
                  that.city[item1].children.push(that.block[item2])
                }
              }
            }
          } else {
            console.log(response.status)
          }
        })
    },
    // 选省
    choseProvince: function(e) {
      for (var index2 in this.province) {
        if (e === this.province[index2].id) {
          this.cityDate = this.province[index2].children
          this.cityInfo = this.province[index2].children[0].value
          this.areaDate = this.province[index2].children[0].children
          this.areaInfo = this.province[index2].children[0].children[0].value
          this.E = this.areaDate[0].id
        }
      }
    },
    // 选市
    choseCity: function(e) {
      for (var index3 in this.city) {
        if (e === this.city[index3].id) {
          this.areaDate = this.city[index3].children
          this.areaInfo = this.city[index3].children[0].value
          this.E = this.areaDate[0].id
          // console.log(this.E)
        }
      }
    },
    // 选区
    choseBlock: function(e) {
      this.E = e
      // console.log(this.E)
    }
  },
  created: function() {
    this.getCityData()
  }
}
</script>

<style scoped>
</style>
