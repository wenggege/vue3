<template>
	<!-- 节点2-包材信息表-物流BP -->
	<div class="node-section">
		<p class="node-title">{{nodeInfo?.NodeName}}</p>
		<el-row>
			<el-col :span="24">
				<div class="basicContent">
					<p class="key">控温要求：</p>
					<span class="value">{{nodeData.TransportTemperature}}</span>
				</div>
			</el-col>
			<el-col :span="24">
				<div class="basicContent">
					<p class="key">控温包材：</p>
					<span class="value">{{findName(nodeData.TruCoolGelType, TruCoolWrapperTypeArr)}}</span>
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
const TruCoolWrapperTypeArr = computed(() => useOptions.TruCoolWrapperTypeArr)
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
<style lang="scss" scoped>
</style>
