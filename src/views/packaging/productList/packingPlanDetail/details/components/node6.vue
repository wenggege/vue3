<template>
  <!-- 节点6-包装指令-计划专员 -->
  <div class="node-section">
    <p class="node-title">{{ nodeInfo?.NodeName }}</p>
    <el-row>
      <el-col :span="8">
        <div class="basicContent">
          <p class="key">包装车间：</p>
          <span class="value">{{ nodeData.PackWorkshop }}</span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="basicContent">
          <p class="key">质量标准：</p>
          <span class="value">{{ nodeData.QualityStandard }}</span>
        </div>
      </el-col>
    </el-row>

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
    </el-row>

    <el-row>
      <el-col :span="8">
        <div class="basicContent">
          <p class="key">拍照方式：</p>
          <span class="value">{{
            findName(nodeData.PhotoWay, PhotoWayArr)
          }}</span>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="8">
        <div class="basicContent">
          <p class="key">是否需要TTUI温度计：</p>
          <span class="value">{{
            nodeData.HasThermometer === '1' ? '是' : '否'
          }}</span>
        </div>
      </el-col>
      <el-col :span="8" v-if="Number(nodeData.HasThermometer)">
        <div class="basicContent">
          <p class="key">数量：</p>
          <span class="value">{{ nodeData.ThermometerNumber }}</span>
        </div>
      </el-col>
      <el-col :span="8" v-if="Number(nodeData.HasThermometer)">
        <div class="basicContent">
          <p class="key">温度区间范围：</p>
          <span class="value">{{ nodeData.TemperatureRange }}</span>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="8">
        <div class="basicContent">
          <p class="key">TTUI温度计是否按DHL要求：</p>
          <span class="value">{{
            nodeData.HasSizeUpDHL === '1' ? '是' : '否'
          }}</span>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="8">
        <div class="basicContent">
          <p class="key">是否需要一次性联网温度计：</p>
          <span class="value">{{
            nodeData.HasConnectedThermometer === '1' ? '是' : '否'
          }}</span>
        </div>
      </el-col>
      <el-col :span="8" v-if="Number(nodeData.HasConnectedThermometer)">
        <div class="basicContent">
          <p class="key">数量：</p>
          <span class="value">{{ nodeData.ConnectedThermometerNumber }}</span>
        </div>
      </el-col>
      <el-col :span="8" v-if="Number(nodeData.HasConnectedThermometer)">
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
    </el-row>

    <el-row>
      <el-col :span="8">
        <div class="basicContent">
          <p class="key">是否需要干燥剂：</p>
          <span class="value">{{
            nodeData.HasDesiccant === '1' ? '是' : '否'
          }}</span>
        </div>
      </el-col>
      <el-col :span="8" v-if="Number(nodeData.HasDesiccant)">
        <div class="basicContent">
          <span class="value">放{{ nodeData.DesiccantSplitPack }}个袋子</span>
        </div>
      </el-col>
      <el-col :span="8" v-if="Number(nodeData.HasDesiccant)">
        <div class="basicContent">
          <p class="key">放置位置：</p>
          <span class="value">{{
            findName(nodeData.DesiccantPlacementLocation, PlacementLocationArr)
          }}</span>
          <!-- 其他 -->
          <span
            class="value"
            v-if="
              nodeData.DesiccantPlacementLocation == PlacementLocationArr.length
            "
            >{{ DesiccantPlacementLocationOther }}</span
          >
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="8">
        <div class="basicContent">
          <p class="key">是否需要随货样品：</p>
          <span class="value">{{
            nodeData.HasSample === '1' ? '是' : '否'
          }}</span>
        </div>
      </el-col>
      <el-col :span="8" v-if="Number(nodeData.HasSample)">
        <div class="basicContent">
          <p class="key">数量：</p>
          <span class="value">{{ nodeData.SampleNumber }}</span>
        </div>
      </el-col>
    </el-row>

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
          <p class="key">需要：</p>
          <span class="value">{{ nodeData.SecurityCheckSampleNumber }}</span>
        </div>
      </el-col>
    </el-row>
    <div class="table-box" style="margintop: 10px">
      <el-table :data="nodeData.TableInfo">
        <el-table-column label="包装批号" prop="PackBatchNumber" />
        <el-table-column label="桶数" prop="Barrelage" />
        <el-table-column label="包装重量/KG" prop="PackedWeight" />
      </el-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { optionsStore } from '@/store'
import { findName } from '@/utils/tools'
const useOptions = optionsStore()
const props = defineProps({
  nodeInfo: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
const PhotoWayArr = computed(() => useOptions.PhotoWayArr)
const PlacementLocationArr = computed(() => useOptions.PlacementLocationArr)
const nodeData = reactive<any>({})
const DesiccantPlacementLocationOther = ref('')
const CTLocationOther = ref('')
onMounted(() => {
  // 数据回显
  initData()
})
const initData = () => {
  console.log('数据回显')
  props.nodeInfo.NodeContent.forEach((element) => {
    if (element.FieldName === 'TableInfo') {
      //  回显表格数据
      if (element.FieldValue) {
        nodeData.TableInfo = JSON.parse(element.FieldValue)
      }
    } else if (element.FieldName === 'ConnectedThermometerLocation') {
      if (element.FieldValue.indexOf(',') !== -1) {
        console.log('有其他')
        let arrText = element.FieldValue.split(',')
        nodeData[element.FieldName] = arrText[0]
        CTLocationOther.value = arrText[1]
      } else {
        nodeData[element.FieldName] = element.FieldValue
      }
    } else if (element.FieldName === 'DesiccantPlacementLocation') {
      if (element.FieldValue.indexOf(',') !== -1) {
        console.log('有其他')
        let arrText = element.FieldValue.split(',')
        nodeData[element.FieldName] = arrText[0]
        DesiccantPlacementLocationOther.value = arrText[1]
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
