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
            label="货物名称："
            prop="GoodsName"
            :rules="[{ required: true, message: '不能为空', trigger: 'blur' }]"
          >
            <el-input v-model="formData.GoodsName" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="状态："
            prop="GoodsStatus"
            :rules="[
              { required: true, message: '不能为空', trigger: 'change' }
            ]"
          >
            <el-select v-model="formData.GoodsStatus" placeholder="请选择">
              <el-option label="固体" value="1" />
              <el-option label="液体" value="2" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="比重："
            prop="Proportion"
            :rules="[{ required: true, message: '不能为空', trigger: 'blur' }]"
          >
            <el-input v-model="formData.Proportion" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row class="mb10" :gutter="20">
        <el-col :span="8">
          <el-form-item
            label="联合国编号："
            prop="UNNumber"
            :rules="[{ required: true, message: '不能为空', trigger: 'blur' }]"
          >
            <el-input v-model="formData.UNNumber" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="类："
            prop="DangerousType"
            :rules="[{ required: true, message: '不能为空', trigger: 'blur' }]"
          >
            <el-input v-model="formData.DangerousType" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="包装等级："
            prop="PackLevel"
            :rules="[{ required: true, message: '不能为空', trigger: 'blur' }]"
          >
            <el-input v-model="formData.PackLevel" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row class="mb10" :gutter="20">
        <el-col :span="8">
          <el-form-item
            label="运输方式："
            prop="TransportMode"
            :rules="[{ required: true, message: '不能为空', trigger: 'blur' }]"
          >
            <el-input v-model="formData.TransportMode" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="包装桶SAP代码："
            prop="PackDrumsSAPCode"
            :rules="[{ required: true, message: '不能为空', trigger: 'blur' }]"
          >
            <el-select
              class="mr20"
              v-model="formData.PackDrumsSAPCode"
              filterable
            >
              <el-option
                v-for="sel in sapOptionsArr"
                :key="sel.MATNR"
                :label="sel.MATNR"
                :value="sel.MATNR"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="包装桶名称/规格："
            prop="PackDrumsName"
            :rules="[{ required: true, message: '不能为空', trigger: 'blur' }]"
          >
            <el-input v-model="formData.PackDrumsName" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row class="mb10" :gutter="20">
        <el-col :span="8">
          <el-form-item
            label="采购数量："
            prop="OrderSize"
            :rules="[{ required: true, message: '不能为空', trigger: 'blur' }]"
          >
            <el-input v-model="formData.OrderSize" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="到货时间："
            prop="ArrivalDate"
            :rules="[
              { required: true, message: '不能为空', trigger: 'change' }
            ]"
          >
            <el-date-picker
              v-model="formData.ArrivalDate"
              type="date"
              placeholder="选择日期"
              value-format="YYYY-MM-DD"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, watch, computed, onMounted } from 'vue'
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
  GoodsName: '', // 货物名称
  GoodsStatus: '', // 货物状态
  Proportion: '', // 比重
  UNNumber: '', // 联合国编号
  DangerousType: '', // 类
  PackLevel: '', // 包装等级
  TransportMode: '', // 运输方式
  PackDrumsSAPCode: '', // 包装桶SAP代码
  PackDrumsName: '', // 包装桶名称/规格
  OrderSize: 0, // 采购数量
  ArrivalDate: '' // 到货时间
})

onMounted(() => {
  useOptions.getSap('')
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
  },
  { deep: true }
)
</script>

<style lang="scss" scoped></style>
