<template>
  <!-- 节点3-包装请购Deadline-物控-->
  <div class="node-section">
    <p class="node-title">{{ nodeInfo?.NodeName }}</p>
    <el-row v-for="(i, k) in nodeData.TableInfo" :key="k">
      <el-col :span="8">
        <div class="basicContent">
          <p
            class="key"
            v-text="i.WrapperType === '1' ? '内包材：' : '外包材：'"
          ></p>
          <span class="value">{{ i.WrapperNameSpec }}</span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="basicContent">
          <p class="key">SAP代码：</p>
          <span class="value">{{ i.SAPCode }}</span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="basicContent">
          <p class="key">数量：</p>
          <span class="value">{{ i.Number }}</span>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="basicContent">
          <p class="key">干燥剂：</p>
          <span class="value">{{
            findName(nodeData.Desiccant, DesiccantTypeArr)
          }}</span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="basicContent">
          <p class="key">SAP代码：</p>
          <span class="value">{{ nodeData.DesiccantSAP }}</span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="basicContent">
          <p class="key">数量：</p>
          <span class="value">{{ nodeData.DesiccantNumber }}</span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="basicContent">
          <p class="key">除氧剂：</p>
          <span class="value">{{
            findName(nodeData.Deoxidant, DeoxidantTypeArr)
          }}</span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="basicContent">
          <p class="key">SAP代码：</p>
          <span class="value">{{ nodeData.DeoxidantSAP }}</span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="basicContent">
          <p class="key">数量：</p>
          <span class="value">{{ nodeData.DeoxidantNumber }}</span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="basicContent">
          <p class="key">控温包材：</p>
          <span class="value">{{
            findName(nodeData.TruCoolGelType, TruCoolWrapperTypeArr)
          }}</span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="basicContent">
          <p class="key">SAP代码：</p>
          <span class="value">{{ nodeData.TruCoolGelTypeSAP }}</span>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="basicContent">
          <p class="key">危险品包材：</p>
        </div>
      </el-col>
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
          <span class="value">{{ nodeData.PackLevel }}</span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="basicContent">
          <p class="key">运输方式：</p>
          <span class="value">{{ nodeData.TransportMode }}</span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="basicContent">
          <p class="key">包装桶SAP代码：</p>
          <span class="value">{{ nodeData.PackDrumsSAPCode }}</span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="basicContent">
          <p class="key">包装桶名称/规格：</p>
          <span class="value">{{ nodeData.PackDrumsName }}</span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="basicContent">
          <p class="key">采购数量：</p>
          <span class="value">{{ nodeData.OrderSize }}</span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="basicContent">
          <p class="key">到货时间：</p>
          <span class="value">{{ nodeData.ArrivalDate }}</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted, computed } from 'vue'
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
// 干燥剂类型
const DesiccantTypeArr = computed(() => useOptions.DesiccantTypeArr)
// 除氧剂类型
const DeoxidantTypeArr = computed(() => useOptions.DeoxidantTypeArr)
// 控温包材
const TruCoolWrapperTypeArr = computed(() => useOptions.TruCoolWrapperTypeArr)
const nodeData = reactive<any>({})
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
    } else {
      nodeData[element.FieldName] = element.FieldValue
    }
  })
}
</script>
<style lang="scss" scoped></style>
