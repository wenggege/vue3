<template>
  <!-- 节点2-基础信息表-研发PM -->
  <div class="node-section">
    <p class="node-title">{{ nodeInfo?.NodeName }}</p>
    <el-row>
      <el-col :span="12" v-if="nodeData.LiquidOrSolid === '2'">
        <div class="basicContent">
          <p class="key">液体-密度：</p>
          <span class="value">{{nodeData.Proportion}}</span>
        </div>
      </el-col>
      <el-col :span="12" v-else>
        <div class="basicContent">
          <p class="key">固体-堆密度：</p>
          <span class="value">{{nodeData.Proportion}}</span>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="basicContent">
          <p class="key">致敏性：</p>
          <span class="value">{{
            nodeData.HasSensitization === '1' ? '是' : '否'
          }}</span>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="basicContent">
          <p class="key">导静电性能：</p>
          <span class="value">{{
            nodeData.HasConduction === '1' ? '是' : '否'
          }}</span>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="basicContent">
          <p class="key">是否低温储存：</p>
          <span class="value">{{
            nodeData.HasLowTemperatureStorage === '1' ? '是' : '否'
          }}</span>
        </div>
      </el-col>
      <el-col :span="12" v-if="Number(nodeData.HasLowTemperatureStorage)">
        <div class="basicContent">
          <p class="key">温度：</p>
          <span class="value">{{ nodeData.TemperatureRange }}</span>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="basicContent">
          <p class="key">是否有吸潮性能：</p>
          <span class="value">{{ nodeData.HasMoistureAbsorption === '1' ? '是' : '否'}}</span>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="basicContent">
          <p class="key">是否避光：</p>
          <span class="value">{{ nodeData.HasAwayLight === '1' ? '是' : '否'}}</span>
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
