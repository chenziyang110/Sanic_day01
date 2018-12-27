<template>
  <scroll-bar>

    <div class="sidebarTop" v-if="!isCollapse">
      <img src="./../assets/navToplogo.png" height="30px" alt="">
    </div>

    <el-menu mode="vertical" :default-active="$route.path" :collapse="isCollapse" text-color="#012989">
      <!-- <router-link to="/">
        <div class="sidebar-logo"><img src="../assets/logo.png" /></div>
        <div class="sidebar-logo-mini"><img src="../assets/logo.png" /></div>
      </router-link> -->
      <sidebar-item :routes="permission_routers" :isCollapse="isCollapse"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import {mapGetters} from 'vuex'
import SidebarItem from './layoutSidebarItem'
import ScrollBar from '@/components/ScrollBar'

export default {
  name: 'layoutSidebar',
  components: {SidebarItem, ScrollBar},
  computed: {
    ...mapGetters(['permission_routers', 'sidebar', 'name']),
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
.sidebarTop {
  background: linear-gradient(#466ec9,#5c82db);
  height: 50px;
  padding: 10px;
  text-align: center;
  .headImg {
    width: 110px;
    height: 110px;
    margin: 0 auto;
    background-color: #ffffff;
    // border-radius:50%;
    // box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.49);
  }
  .hai {
    margin: 5px;
    color: #999999;
    font-weight: 500;
  }
  .userName {
    margin-top: 10px;
    color: #012989;
    font-weight: 800;
  }
}
</style>