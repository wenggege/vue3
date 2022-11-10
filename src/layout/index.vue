<template>
  <el-container class="container">
    <el-aside :class="collapse ? 'hideSideBar' : 'sideBar'">
      <SideBar></SideBar>
    </el-aside>
    <el-container :class="collapse ? 'mainHideSideBar' : 'main'">
      <el-header>
        <NavHeader></NavHeader>
      </el-header>
      <el-main style="height: 100%">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAppStore } from '../store/index'
import SideBar from '@/layout/sideBar/index.vue'
import NavHeader from '@/layout/navHeader/index.vue'
const appStore = useAppStore()
const { collapse } = storeToRefs(appStore)
</script>

<style lang="scss" scoped>
.container {
  // position: relative;
  height: 100%;
  width: 100%;
  .sideBar {
    width: $sideBarWidth;
    position: fixed;
    left: 0;
    top: 0;
    transition: all 0.28s;
    height: 100%;
    background: $sideBarBg;
    z-index: 1;
  }
  .hideSideBar {
    width: $hideSideBarWidth;
    position: fixed;
    left: 0;
    top: 0;
    transition: all 0.28s;
    height: 100%;
    background: $sideBarBg;
    z-index: 1;
  }
  .el-main {
    padding: 10px;
    background-color: $bgcolor;
  }
  .main {
    width: calc(100% - $sideBarWidth);
    transition: all 0.28s;
    position: fixed;
    right: 0;
    top: 0;
    height: 100%;
  }
  .mainHideSideBar {
    width: calc(100% - $hideSideBarWidth);
    transition: all 0.28s;
    position: fixed;
    right: 0;
    height: 100%;
  }
}

.el-header {
  padding: 0;
}
</style>
