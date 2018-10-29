<template>
  <div class="salarys-container">
    <div class="salarys">
      <div class="">开始做 <el-input v-model="input" style="width: 100px;" size="mini" placeholder="201808"></el-input> 工资 <el-button type="primary" size = "mini" @click="onSubmit">确定</el-button></div>
    </div>
  </div>
</template>

<script>
import {list} from '@/api/example/table'

export default {
  name: 'salarys-table-index',
  data() {
    return {
      input: ''
    }
  },
  methods: {
    onSubmit() {
      this.$router.push({ path: './list' })
    }
  },
  created() {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.salarys-container {
  padding: 25px;
  .salarys{
    text-align: center;
    background: #fff;
    min-height: 600px;
    border-radius: 3px;
    padding-top: 200px;
    input{
      margin: 0 10px;
    }
  }
}
</style>
