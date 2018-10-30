<template>
  <div class="dashboard-container">
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  components: {
  },
  data() {
    return {
    }
  },
  computed: {

  },
  methods: {
  },
  // 挂载结束
  mounted: function() {},
  // 创建完毕状态
  created: function() {
  },
  // 组件更新
  updated: function() {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-container {
  margin: 10px;
  .headImg {
    float: left;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: #999;
  }

  .headInfoTip {
    padding: 25px 0 0;
    margin-left: 120px;
    p {
      padding: 0 0 15px;
      margin: 0;
      &.firstChild {
        font-size: 24px;
      }
      &.lastChild {
        font-size: 20px;
        color: #7f8c8d;
      }
    }
  }
}
</style>
