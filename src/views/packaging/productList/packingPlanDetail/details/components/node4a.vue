<template>
  <!-- 节点4-发货信息表-PMO-->
  <div class="node-section">
    <p class="node-title">{{ nodeInfo?.NodeName }}</p>
    <el-row>
      <el-col :span="8">
        <div class="basicContent">
          <p class="key">发货数量/KG：</p>
          <span class="value">{{ nodeData.PlanShippingNumber }}</span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="basicContent">
          <p class="key">预计出厂日期：</p>
          <span class="value">{{ nodeData.PlanProductionDate }}</span>
        </div>
      </el-col>

      <el-col :span="24">
        <div class="basicContent">
          <p class="key">客户其他标签要求（如：PO Number）：</p>
          <span class="value">{{ nodeData.OtherTagRequire }}</span>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="basicContent">
          <p class="key">其他需求（包括但不限于打托要求）：</p>
          <span class="value">{{ nodeData.OtherRequire }}</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue'
const props = defineProps({
  nodeInfo: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
const nodeData = reactive<any>({})
onMounted(() => {
  // 数据回显
  initData()
})
const initData = () => {
  props.nodeInfo.NodeContent.forEach((element) => {
    nodeData[element.FieldName] = element.FieldValue
  })
}
</script>
<style lang="scss" scoped></style>
