<template>
  <div class="importData">
    <importData></importData>
  </div>
</template>

<script>
  import {getResumesList, getMessages} from '@/api/hrm/recruitsApi'
  import importData from './../../components/import/index.vue'

  export default {
    name: 'importDataIndex',
    components: {importData},
    data() {
      return {
        active: '1',
        itemDataes: {}
      }
    },
    methods: {
    },
    mounted() {

    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "./../../styles/variables";
  .importData {
    background: #fff;
    padding: 20px;
    margin-right: 20px;
    min-height: 600px;
  }
</style>
