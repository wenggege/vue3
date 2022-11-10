<template>
  <div class="node-form">
    <p class="node-form-title">任务内容</p>
    <!-- <TaskInfo :taskInfo="nodeInfo"/> -->
    <el-form
      ref="ruleFormRef"
      :model="formData"
      class="node-section"
      style="padding: 0 15px"
    >
      <el-descriptions :column="4">
        <template v-for="(i, k) in formData.TableInfo" :key="k">
          <el-descriptions-item
            :label="i.WrapperType === '1' ? '内包材：' : '外包材：'"
            >{{ i.WrapperNameSpec }}</el-descriptions-item
          >
          <el-descriptions-item label="SAP代码：">{{
            i.SAPCode
          }}</el-descriptions-item>
          <el-descriptions-item label="数量：">{{
            i.Number
          }}</el-descriptions-item>
          <el-descriptions-item label="到货时间：">{{
            i.ArrivalTime
          }}</el-descriptions-item>
        </template>
        <el-descriptions-item label="干燥剂：">{{
          formData.Desiccant
        }}</el-descriptions-item>
        <el-descriptions-item label="SAP代码：">{{
          formData.DesiccantSAP
        }}</el-descriptions-item>
        <el-descriptions-item label="数量：">{{
          formData.DesiccantNumber
        }}</el-descriptions-item>
        <el-descriptions-item label="到货时间：">{{
          formData.DesiccantArrivalTime
        }}</el-descriptions-item>
        <el-descriptions-item label="除氧剂：">{{
          formData.Deoxidant
        }}</el-descriptions-item>
        <el-descriptions-item label="SAP代码：">{{
          formData.DeoxidantSAP
        }}</el-descriptions-item>
        <el-descriptions-item label="数量：">{{
          formData.DeoxidantNumber
        }}</el-descriptions-item>
        <el-descriptions-item label="到货时间：">{{
          formData.DeoxidantArrivalTime
        }}</el-descriptions-item>
        <el-descriptions-item label="控温包材：">{{
          formData.TruCoolGelType
        }}</el-descriptions-item>
        <el-descriptions-item label="SAP代码：">{{
          formData.TruCoolGelTypeSAP
        }}</el-descriptions-item>
      </el-descriptions>
      <div>
        <el-descriptions :column="3" title="危险品包材">
          <el-descriptions-item label="货物名称：">{{
            formData.GoodsName
          }}</el-descriptions-item>
          <el-descriptions-item label="状态：">{{
            formData.GoodsStatus === '1' ? '固体' : '液体'
          }}</el-descriptions-item>
          <el-descriptions-item label="比重：">{{
            formData.Proportion
          }}</el-descriptions-item>
          <el-descriptions-item label="联合国编号：">{{
            formData.UNNumber
          }}</el-descriptions-item>
          <el-descriptions-item label="类：">{{
            formData.DangerousType
          }}</el-descriptions-item>
          <el-descriptions-item label="包装等级：">{{
            formData.PackLevel
          }}</el-descriptions-item>
          <el-descriptions-item label="运输方式：">{{
            formData.TransportMode
          }}</el-descriptions-item>
          <el-descriptions-item label="包装桶SAP代码：">{{
            formData.PackDrumsSAPCode
          }}</el-descriptions-item>
          <el-descriptions-item label="包装桶名称/规格：">{{
            formData.PackDrumsName
          }}</el-descriptions-item>
          <el-descriptions-item label="采购数量：">{{
            formData.OrderSize
          }}</el-descriptions-item>
          <el-descriptions-item label="到货时间：">{{
            formData.ArrivalDate
          }}</el-descriptions-item>
        </el-descriptions>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue'
// import TaskInfo from './task.vue'
const props = defineProps({
  nodeInfo: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
const formData = reactive({
  TableInfo: [
    {
      WrapperType: '', // 1内包材 2外包材
      WrapperNameSpec: '',
      SAPCode: '',
      SingleContainsNumber: '',
      Number: '',
      ArrivalTime: ''
    }
  ],
  Desiccant: '', // 干燥剂
  DesiccantSAP: '', // 干燥剂-SAP代码
  DesiccantNumber: '', // 干燥剂-数量
  DesiccantArrivalTime: '', // 干燥剂-到货时间
  Deoxidant: '', // 除氧剂
  DeoxidantSAP: '', // 除氧剂-SAP代码
  DeoxidantNumber: 0, // 除氧剂-数量
  DeoxidantArrivalTime: '', // 除氧剂-到货时间
  TruCoolGelType: '', // 控温包材
  TruCoolGelTypeSAP: '', // 控温包材SAP
  GoodsName: '', // 货物名称
  GoodsStatus: '', // 货物状态 1固体 2液体
  Proportion: '', // 比重
  UNNumber: '', // 联合国编号
  DangerousType: '', // 类
  PackLevel: '', // 包装等级
  TransportMode: '', // 运输方式
  PackDrumsSAPCode: '', // 包装桶SAP代码
  PackDrumsName: '', // 包装桶名称/规格
  OrderSize: '', // 采购数量
  ArrivalDate: '' // 到货时间
})

const sendFormData = () => {
  let newForm = {
    ...formData,
    TableInfo: JSON.stringify(formData.TableInfo)
  }
  return newForm
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
        if (element.FieldName === 'TableInfo') {
          //  回显表格数据
          if (element.FieldValue) {
            formData.TableInfo = JSON.parse(element.FieldValue)
          }
        } else {
          formData[element.FieldName] = element.FieldValue
        }
      })
    }
  }
)
</script>

<style lang="scss" scoped>
.node-section {
  .basicContent {
    .key {
      color: #303133;
      margin-right: 16px;
      font-size: 14px;
    }
    .value {
      color: #606266;
      font-size: 14px;
    }
  }
}
</style>
