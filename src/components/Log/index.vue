<template>
  <div class="log">
    <el-timeline>
      <el-timeline-item
        v-for="(item, index) in logList"
        :key="index"
        :timestamp="item.CreateTimeText"
      >
        {{ item.Content }}
      </el-timeline-item>
    </el-timeline>
  </div>
</template>
<script setup lang="ts">
type Props = {
  logList: Array<any>
}
defineProps<Props>()
</script>
<style scoped lang="scss">
.log {
  margin-top: 20px;
}
</style>
