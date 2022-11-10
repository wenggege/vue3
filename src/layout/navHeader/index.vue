<!-- 导航栏 -->
<template>
  <div class="headerbar">
    <div class="headerbar-leftbox">
      <div @click="toggle" class="collapse">
        <div v-if="collapse">
          <el-icon><expand /></el-icon>
        </div>
        <div v-else>
          <el-icon><fold /></el-icon>
        </div>
      </div>
      <Breadcrumb></Breadcrumb>
    </div>

    <div class="right-menu">
      <el-link href="" target="_blank">信息门户</el-link>
      <span> | </span>
      <el-link href="" target="_blank">RDMP</el-link>
      <span> | </span>
      <el-link href="" target="_blank">ELN</el-link>

      <div class="user-info">
        <el-icon size="34" class="user-ico"><Avatar /></el-icon>
        {{ userName }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/store/index'

import Breadcrumb from './Breadcrumb.vue'
import { ref } from 'vue'
const userName = ref('小花')
const appStore = useAppStore()
const { collapse } = storeToRefs(appStore)
let toggle = () => {
  collapse.value = !collapse.value
}
</script>

<style lang="scss" scoped>
.headerbar {
  height: 60px;
  overflow: hidden;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  box-sizing: border-box;
  border-bottom: 1px solid #ebedf0;
  .headerbar-leftbox {
    display: flex;
    align-items: center;
    .collapse {
      cursor: pointer;
      margin-right: 20px;
      display: flex;
      align-items: center;
      color: #6e6f70;
      div {
        display: flex;
        align-items: center;
      }
    }
  }

  .right-menu {
    display: flex;
    align-items: center;
    font-size: 14px;
    span {
      margin: 0 20px;
      color: #ccc;
    }
    .user-info {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 40px;
      .user-ico {
        width: 25px;
        height: 25px;
        background-color: $mainColor;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
        color: #fff;
      }
    }
  }
}
</style>
