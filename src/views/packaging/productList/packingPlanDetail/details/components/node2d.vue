<template>
  <!-- 节点2-危险品包材请购需求表-技术PM -->
  <div class="node-section">
    <p class="node-title">{{ nodeInfo?.NodeName }}</p>
    <el-row>
      <el-col :span="8">
        <div class="basicContent">
          <p class="key">货物名称：</p>
          <span class="value">{{ nodeData.GoodsName }}</span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="basicContent">
          <p class="key">状态：</p>
          <span class="value">{{
            nodeData.GoodsStatus === '1' ? '固体' : '液体'
          }}</span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="basicContent">
          <p class="key">比重：</p>
          <span class="value">{{ nodeData.Proportion }}</span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="basicContent">
          <p class="key">联合国编号：</p>
          <span class="value">{{ nodeData.UNNumber }}</span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="basicContent">
          <p class="key">类：</p>
          <span class="value">{{ nodeData.DangerousType }}</span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="basicContent">
          <p class="key">包装等级：</p>
          <span class="value">{{nodeData.PackLevel}}</span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="basicContent">
          <p class="key">运输方式：</p>
          <span class="value">{{nodeData.TransportMode}}</span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="basicContent">
          <p class="key">包装桶SAP代码：</p>
          <span class="value">{{nodeData.PackDrumsSAPCode}}</span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="basicContent">
          <p class="key">包装桶名称/规格：</p>
          <span class="value">{{nodeData.PackDrumsName}}</span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="basicContent">
          <p class="key">采购数量：</p>
          <span class="value">{{nodeData.OrderSize}}</span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="basicContent">
          <p class="key">到货时间：</p>
          <span class="value">{{nodeData.ArrivalDate}}</span>
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
