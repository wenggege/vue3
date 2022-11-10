<template>
  <!-- 节点5-质量标准生效/变更-QC -->
  <div class="node-section">
    <p class="node-title">{{ nodeInfo?.NodeName }}</p>
    <el-row> </el-row>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  nodeInfo: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
</script>
<style lang="scss" scoped></style>
