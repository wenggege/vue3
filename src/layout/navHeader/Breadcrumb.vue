<template>
  <div
    class="breadcrumb_main"
    v-if="breadcrumbList && breadcrumbList.length > 1"
  >
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index">
        <div>
          {{ item.meta.title }}
        </div>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { useRoute, RouteLocationMatched } from 'vue-router'
import { watch, ref } from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'
const route = useRoute()

const breadcrumbList = ref<RouteLocationMatched[]>([])

const initBreadcrumbList = () => {
  breadcrumbList.value = route.matched
}

watch(
  route,
  () => {
    console.log(' route.matched', route.matched)
    initBreadcrumbList()
  },
  { deep: true, immediate: true }
)
</script>
