<template>
  <!-- 节点4-发货信息表-物流BP -->
  <div class="node-section">
    <p class="node-title">{{ nodeInfo.NodeName }}</p>
    <el-row>
      <el-col :span="8">
        <div class="basicContent">
          <p class="key">是否需要安检样：</p>
          <span class="value">{{
            nodeData.HasSecurityCheckSample === '1' ? '是' : '否'
          }}</span>
        </div>
      </el-col>
      <el-col :span="8" v-if="Number(nodeData.HasSecurityCheckSample)">
        <div class="basicContent">
          <p class="key">数量：</p>
          <span class="value">{{ nodeData.SecurityCheckSampleNumber }}</span>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="basicContent">
          <p class="key">是否需要含量标签：</p>
          <span class="value">{{
            nodeData.HasContenTag === '1' ? '是' : '否'
          }}</span>
        </div>
      </el-col>

      <el-col :span="8">
        <div class="basicContent">
          <p class="key">是否打托：</p>
          <span class="value"
            >{{ nodeData.IsDT === '1' ? '是' : '否'
            }}{{ nodeData.IsDT === '1' ? '是' : '否' }}</span
          >
        </div>
      </el-col>
      <el-col :span="8">
        <div class="basicContent">
          <p class="key">打托方式：</p>
          <span class="value">{{
            findName(nodeData.DTType, PacketWayArr)
          }}</span>
        </div>
      </el-col>

      <el-col :span="24">
        <div class="basicContent">
          <p class="key">TTUI温度计是否按DHL要求：</p>
          <span class="value">{{
            nodeData.HasSizeUpDHL === '1' ? '是' : '否'
          }}</span>
        </div>
      </el-col>

      <el-col :span="8">
        <div class="basicContent">
          <p class="key">是否需要一次性联网温度计：</p>
          <span class="value">{{
            nodeData.HasConnectedThermometer === '1' ? '是' : '否'
          }}</span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="basicContent">
          <p class="key">数量：</p>
          <span class="value">{{ nodeData.ConnectedThermometerNumber }}</span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="basicContent">
          <p class="key">放置位置：</p>
          <span class="value">{{
            findName(
              nodeData.ConnectedThermometerLocation,
              PlacementLocationArr
            )
          }}</span>
          <!-- 其他 -->
          <span
            class="value"
            v-if="
              nodeData.ConnectedThermometerLocation ==
              PlacementLocationArr.length
            "
            >{{ CTLocationOther }}</span
          >
        </div>
      </el-col>

      <el-col :span="24">
        <div class="basicContent">
          <p class="key">其他要求：</p>
          <span class="value">{{ nodeData.OtherRequire }}</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { findName } from '@/utils/tools'
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
const PacketWayArr = computed(() => useOptions.PacketWayArr)
const PlacementLocationArr = computed(() => useOptions.PlacementLocationArr)
const nodeData = reactive<any>({})
const CTLocationOther = ref('')
onMounted(() => {
  // 数据回显
  initData()
})
const initData = () => {
  props.nodeInfo.NodeContent.forEach((element) => {
    if (element.FieldName === 'ConnectedThermometerLocation') {
      // 其他字段处理
      if (element.FieldValue.indexOf(',') !== -1) {
        console.log('有其他')
        let arrText = element.FieldValue.split(',')
        nodeData[element.FieldName] = arrText[0]
        CTLocationOther.value = arrText[1]
      } else {
        nodeData[element.FieldName] = element.FieldValue
      }
    } else {
      nodeData[element.FieldName] = element.FieldValue
    }
  })
}
</script>
<style lang="scss" scoped></style>
