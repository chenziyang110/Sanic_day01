<template>
  <div class="head">
    <div class="userHead" v-if="headImg===null||headImg===''"><img src="@/assets/img.jpeg" width="100px" height="100px"></div>
    <div class="userHead" v-else>
      <span v-for="item in fileList" :key='item.id' class="fileImg">
        <img :src="item.url" width="100px" height="100px">
      </span>
    </div>
  </div>
</template>
<script>
import { imgHandle } from '@/filters/index'
import { imgDownload } from '@/api/base/baseApi'
export default {
  name: 'userHead',
  data() {
    return {
      fileList: []
    }
  },
  props: ['headImg'],
  methods: {
    // 图片下载
    fillDownload(fid) {
      imgDownload({ id: fid }).then(res => {
        this.fileList = [{ name: 'img', url: imgHandle(res.data) }]
      })
    }
  }
}
</script>

<style>
</style>
