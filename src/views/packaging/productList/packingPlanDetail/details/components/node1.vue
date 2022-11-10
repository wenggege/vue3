<template>
  <!-- 节点1-包材信息表-PMO -->
  <div class="node-section">
    <p class="node-title">{{ nodeInfo?.NodeName }}</p>
    <el-row v-for="(i, k) in nodeData.TableInfo" :key="k">
      <el-col :span="12">
        <div class="basicContent">
          <p class="key">{{ findName(i.WrapperType, WrapperTypeArr) }}：</p>
          <span class="value" v-if="i.WrapperType === '1'">{{
            findName(i.Wrapper, WrapperInNameArr)
          }}</span>
          <span class="value" v-else>{{
            findName(i.Wrapper, WrapperOutNameArr)
          }}</span>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="basicContent">
          <p class="key">包装规格/KG：</p>
          <span class="value">{{ i.SingleContainsNumber }}</span>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div class="basicContent">
          <p class="key">是否需要干燥剂：</p>
          <span class="value">{{
            nodeData.HasDesiccant === '1' ? '是' : '否'
          }}</span>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="basicContent" v-if="Number(nodeData.HasDesiccant)">
          <p class="key">放置位置：</p>
          <span class="value">{{
            findName(nodeData.DesiccantPlacementLocation, PlacementLocationArr)
          }}</span>
          <!-- 其他 -->
          <span
            class="value"
            v-if="
              Number(nodeData.DesiccantPlacementLocation) == PlacementLocationArr.length
            "
            >{{ DesiccantPlacementLocationOther }}</span
          >
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div class="basicContent">
          <p class="key">是否需要除氧剂：</p>
          <span class="value">{{
            nodeData.HasDeoxidant === '1' ? '是' : '否'
          }}</span>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="basicContent" v-if="Number(nodeData.HasDeoxidant)">
          <p class="key">放置位置：</p>
          <span class="value">{{
            findName(nodeData.DeoxidantPlacementLocation, PlacementLocationArr)
          }}</span>
          <!-- 其他 -->
          <span
            class="value"
            v-if="
              Number(nodeData.DeoxidantPlacementLocation) == PlacementLocationArr.length
            "
            >{{ DeoxidantPlacementLocationOther }}</span
          >
        </div>
      </el-col>
      <el-col :span="24">
        <div class="basicContent">
          <p class="key">运输温度要求：</p>
          <span class="value">{{ nodeData.TransportTemperature }}</span>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="basicContent">
          <p class="key">备注（其他要求）：</p>
          <span class="value">{{ nodeData.NodeRemark || '无' }}</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { findName } from '@/utils/tools'
import { optionsStore } from '@/store'
import { Node10Type } from '@/types/packaging'
const useOptions = optionsStore()
const props = defineProps({
  nodeInfo: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

// 包材类别
const WrapperTypeArr = computed(() => useOptions.WrapperTypeArr)
// 包材名称_内包装
const WrapperInNameArr = computed(() => useOptions.WrapperInNameArr)
// 包材名称_外包装
const WrapperOutNameArr = computed(() => useOptions.WrapperOutNameArr)
// 放置位置
const PlacementLocationArr = computed(() => useOptions.PlacementLocationArr)
const nodeData = reactive<Node10Type>({})
const DesiccantPlacementLocationOther = ref('')
const DeoxidantPlacementLocationOther = ref('')
onMounted(() => {
  // 数据回显
  initData()
})
const initData = () => {
  props.nodeInfo.NodeContent.forEach((element) => {
    if (element.FieldName === 'TableInfo') {
      //  回显表格数据
      if (element.FieldValue) {
        nodeData.TableInfo = JSON.parse(element.FieldValue)
      }
    } else if (element.FieldName === 'DesiccantPlacementLocation') {
      // 干燥其他字段处理
      if (element.FieldValue.indexOf(',') !== -1) {
        console.log('有其他')
        let arrText = element.FieldValue.split(',')
        nodeData[element.FieldName] = arrText[0]
        DesiccantPlacementLocationOther.value = arrText[1]
      } else {
        nodeData[element.FieldName] = element.FieldValue
      }
    } else if (element.FieldName === 'DeoxidantPlacementLocation') {
      // 除氧其他字段处理
      if (element.FieldValue.indexOf(',') !== -1) {
        console.log('有其他')
        let arrText = element.FieldValue.split(',')
        nodeData[element.FieldName] = arrText[0]
        DeoxidantPlacementLocationOther.value = arrText[1]
      } else {
        nodeData[element.FieldName] = element.FieldValue
      }
    } else {
      nodeData[element.FieldName] = element.FieldValue
    }
  })
}
</script>
<style lang="scss" scoped>
.node-section {
  margin-bottom: 20px;
  .node-title {
    color: #323233;
    font-size: 18px;
    margin-bottom: 10px;
  }
}
.basicContent {
  padding-top: 15px;
  display: flex;
  color: #646566;
  align-items: flex-start;
  .key {
    min-width: 60px;
    margin-right: 20px;
    flex-shrink: 0;
  }
}
</style>
