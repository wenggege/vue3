<template>
  <div class="node-form">
    <p class="node-form-title">
      任务内容
    </p>
    <TaskInfo :taskInfo="props.nodeInfo"/>
    <el-form ref="ruleFormRef" :model="formData" class="node-section" style="padding: 0 15px"></el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import TaskInfo from './task.vue'

const props = defineProps({
  nodeInfo: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

const formData = reactive<any>({})

const sendFormData = () => {
  return formData
}
defineExpose({
  sendFormData
})
</script>

<style lang="scss" scoped>

</style>