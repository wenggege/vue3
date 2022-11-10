<template>
  <!--节点2-包材信息表-技术PM -->
  <div class="node-section">
    <p class="node-title">{{ nodeInfo?.NodeName }}</p>
    <div class="table-box">
      <p class="table-title">内包材：</p>
      <el-table :data="nodeData.InsideWapper">
        <el-table-column label="包材名称规格/mm" prop="WrapperNameSpec" />
        <el-table-column label="SAP代码" prop="SAPCode" />
        <el-table-column label="单件装量/KG" prop="SingleContainsNumber" />
        <el-table-column label="数量/个" prop="Number" />
      </el-table>
    </div>
    <el-row v-for="(i, k) in nodeData.OutsideWapper" :key="k">
      <el-col :span="6">
        <div class="basicContent">
          <p class="key">外包材：</p>
          <span class="value">{{ i.WrapperNameSpec }}</span>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="basicContent">
          <p class="key">SAP代码：</p>
          <span class="value">{{ i.SAPCode }}</span>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="basicContent">
          <p class="key">单件装量/KG：</p>
          <span class="value">{{ i.SingleContainsNumber }}</span>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="basicContent">
          <p class="key">数量/个：</p>
          <span class="value">{{ i.Number }}</span>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="basicContent">
          <p class="key">内包袋包装方式：</p>
          <span class="value">{{
            findName(nodeData.InsidePackWay, InPackWayArr)
          }}</span>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="basicContent">
          <p class="key">内包材封口方式：</p>
          <span class="value">{{
            findName(nodeData.InsideSealWay, InSealWayArr)
          }}</span>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="basicContent">
          <p class="key">贮存要求：</p>
          <span class="value">{{
            findName(nodeData.StorageRequirements, StorageRequirementsArr)
          }}</span>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <div class="basicContent">
          <p class="key">干燥剂：</p>
          <span class="value">{{
            findName(nodeData.Desiccant, DesiccantTypeArr)
          }}</span>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="basicContent">
          <p class="key">SAP代码：</p>
          <span class="value">{{ nodeData.DesiccantSAP }}</span>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="basicContent">
          <p class="key">数量/个：</p>
          <span class="value">{{ nodeData.DesiccantNumber }}</span>
        </div>
      </el-col>
      <el-col :span="6">
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
// 内包袋包装方式
const InPackWayArr = computed(() => useOptions.InPackWayArr)
// 内包材封口方式
const InSealWayArr = computed(() => useOptions.InSealWayArr)
// 贮存要求
const StorageRequirementsArr = computed(() => useOptions.StorageRequirementsArr)
// 干燥剂类型
const DesiccantTypeArr = computed(() => useOptions.DesiccantTypeArr)
// 放置位置，
const PlacementLocationArr = computed(() => useOptions.PlacementLocationArr)
const nodeData = reactive<any>({})
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
        // 数据处理，分开内包材和外包材
        nodeData.InsideWapper = []
        nodeData.OutsideWapper = []
        nodeData.TableInfo.forEach((item) => {
          if (item.WrapperType === '1') {
            // 内包材
            nodeData.InsideWapper.push(item)
          } else {
            // 外包材
            nodeData.OutsideWapper.push(item)
          }
        })
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
  .table-box {
    .table-title {
      color: #646566;
      margin-bottom: 10px;
    }
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
