<template>
  <div class="node-form">
    <p class="node-form-title">任务内容</p>
    <TaskInfo :taskInfo="nodeInfo" />
    <el-form
      ref="ruleFormRef"
      :model="formData"
      class="demo-ruleForm"
      status-icon
      size="default"
      :disabled="nodeInfo.Status === 3"
    >
      <el-row class="mb10" :gutter="20">
        <el-col :span="8">
          <el-form-item
            label="预计发货数量："
            prop="PlanShippingNumber"
            :rules="[{ required: true, message: '不能为空', trigger: 'blur' }]"
          >
            <el-input-number
              v-model="formData.PlanShippingNumber"
              controls-position="right"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="预计出厂日期："
            prop="PlanProductionDate"
            :rules="[
              { required: true, message: '不能为空', trigger: 'change' }
            ]"
          >
            <el-date-picker
              v-model="formData.PlanProductionDate"
              type="date"
              placeholder="选择日期"
              value-format="YYYY-MM-DD"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row class="mb10">
        <el-col :span="16">
          <el-form-item
            label="客户其他标签要求（如：PO Number)："
            prop="OtherTagRequire"
          >
            <el-input type="textarea" v-model="formData.OtherTagRequire" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row class="mb10">
        <el-col :span="16">
          <el-form-item
            label="其他需求（包括但不限于打托要求）："
            prop="OtherRequire"
          >
            <el-input type="textarea" v-model="formData.OtherRequire" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue'
import TaskInfo from './task.vue'

const props = defineProps({
  nodeInfo: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
const formData = reactive({
  PlanShippingNumber: '', // 预计发货数量
  PlanProductionDate: '', // 预计出厂日期
  OtherTagRequire: '', // 客户其他标签要求
  OtherRequire: '' // 其他需求
})

const sendFormData = () => {
  return formData
}
defineExpose({
  sendFormData
})
watch(
  () => props.nodeInfo,
  (val) => {
    // 数据回显
    if (val?.NodeContent.length > 0) {
      val.NodeContent.forEach((element) => {
        formData[element.FieldName] = element.FieldValue
      })
    }
  }
)
</script>

<style lang="scss" scoped></style>
