<template>
  <div class="node-head">
    <div class="title">
      <div v-if="!editTitle" @click="editTitle = !editTitle">
        {{ newTitle }}
      </div>
      <div v-if="editTitle" class="edit-title">
        <el-input v-model="newTitle" class="" placeholder="请录入" />
        <el-button type="primary" plain @click="changeTitle">修改</el-button>
      </div>
    </div>
    <div class="btn-groups">
      <el-button  v-if="nodeInfo?.IsPush" type="primary" @click="onSendCommand"
        >推送包装指令</el-button
      >
      <el-button v-if="nodeInfo?.IsSave" type="primary" @click="onSave"
        >保存</el-button
      >
      <el-button v-if="nodeInfo?.IsFinish" type="primary" @click="onSaveDone"
        >保存并完成任务</el-button
      >
      <el-button v-if="nodeInfo?.IsRestart" type="primary" @click="onReset"
        >重启任务</el-button
      >
      <el-button @click="onCancel">取消</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, Ref } from 'vue'
import { ElMessage } from 'element-plus'
import { debounce } from '@/utils/tools'
const emit = defineEmits([
  'emitSave',
  'emitSaveDone',
  'emitReset',
  'emitCancel',
  'emitEditTitle',
  'emitCommand'
])

const props = defineProps(['title', 'nodeInfo'])
const editTitle: Ref<boolean> = ref(false)
const newTitle = ref<string>()

watch(
  () => props.title,
  (val) => {
    newTitle.value = val
  }
)

const changeTitle = () => {
  // todo 需要校验不能出现英文半角逗号
  if (newTitle.value?.trim()) {
    editTitle.value = false
    emit('emitEditTitle', newTitle.value)
  } else {
    ElMessage.warning('标题输入不能为空')
  }
}

// 保存
const onSave = debounce(() => {
  emit('emitSave')
})
// 保存并完成
const onSaveDone = debounce(() => {
  emit('emitSaveDone')
})
// 重启任务
const onReset = debounce(() => {
  emit('emitReset')
})
// 推送指令
const onSendCommand = debounce(() => {
  emit('emitCommand')
})
// 取消
const onCancel = debounce(() => {
  emit('emitCancel')
})
</script>

<style lang="scss">
.node-head {
  width: 100%;
  box-sizing: border-box;
  height: 60px;
  padding: 0 15px;
  // margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  // border-bottom: 1px solid #ebedf0;
  background-color: $bgcolor;
  .title {
    font-size: 18px;
    font-weight: bold;
    color: #323233;
    width: 450px;
    .edit-title {
      display: flex;
      .el-button {
        margin-left: 10px;
      }
    }
  }
}
</style>
