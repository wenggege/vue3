<template>
  <div class="node-form">
    <p class="node-form-title">任务内容</p>
    <TaskInfo :taskInfo="nodeInfo" />
    <div class="mt10 mb10" style="padding: 0 15px">
      <span class="mr20">控温要求： </span>
      <!-- 从节点1获取 -->
      <span>{{ formData.TransportTemperature }}</span>
    </div>
    <el-form
      ref="ruleFormRef"
      :model="formData"
      class="demo-ruleForm"
      status-icon
      size="default"
      :disabled="nodeInfo.Status === 3"
    >
      <el-row class="mb10">
        <el-col :span="24">
          <el-form-item
            label="控温包材："
            prop="TruCoolGelTypeSAP"
            :rules="[
              { required: true, message: '不能为空', trigger: 'change' }
            ]"
          >
            <el-select
              class="mr20"
              v-model="formData.TruCoolGelTypeSAP"
              placeholder="请选择SAP代码"
              @change="handleSapChange"
              filterable
              remote
              reserve-keyword
              :remote-method="remoteMethod"
            >
              <el-option
                v-for="sel in sapOptionsArr"
                :key="sel.MATNR"
                :label="sel.MATNR"
                :value="sel.MATNR"
              />
            </el-select>
            <el-input
              v-model="formData.TruCoolGelType"
              placeholder="包材名称"
              :disabled="formData.TruCoolGelTypeSAP"
             />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, watch, onMounted, computed } from 'vue'
import TaskInfo from './task.vue'
import { optionsStore } from '@/store'
const useOptions = optionsStore()

const props = defineProps({
  nodeInfo: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
const sapOptionsArr = computed(() => useOptions.sapOptionsArr)
const formData = reactive({
  TruCoolGelType: '', // 控温包材
  TruCoolGelTypeSAP: '', // sap
  TransportTemperature: '' // 控温要求
})

onMounted(() => {
  useOptions.getSap('')
})

// sap
const handleSapChange = (val) => {
  let selectItem = sapOptionsArr.value.find(item => {
    return item.MATNR === val
  })
  console.log('当前选择spa',selectItem )
  formData.TruCoolGelType = selectItem.MAKTX
}
// 远程搜索
const remoteMethod = (query: string) => {
  useOptions.getSap(query)
}

const sendFormData = () => {
  return formData
}
defineExpose({
  sendFormData
})
watch(
  () => props.nodeInfo,
  (val) => {
    if (val?.NodeContent.length > 0) {
      val.NodeContent.forEach((element) => {
        formData[element.FieldName] = element.FieldValue
      })
    }
  },
  { deep: true }
)
</script>

<style lang="scss" scoped>
.el-form-item__content {
  display: flex !important;
  flex-wrap: nowrap !important;
}
</style>
