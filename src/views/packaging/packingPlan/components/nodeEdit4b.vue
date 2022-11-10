<template>
  <div class="node-form">
    <p class="node-form-title">任务内容</p>
    <TaskInfo :taskInfo="nodeInfo" />
    <el-form
      ref="ruleFormRef"
      :model="formData"
      class="demo-ruleForm"
      status-icon
      size="default"
      :disabled="nodeInfo.Status === 3"
    >
      <el-row class="mb10">
        <el-col :span="12">
          <el-form-item
            label="是否需要安检样："
            prop="HasSecurityCheckSample"
            :rules="[
              { required: true, message: '不能为空', trigger: 'change' }
            ]"
          >
            <el-radio-group v-model="formData.HasSecurityCheckSample">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="Number(formData.HasSecurityCheckSample)">
          <el-form-item
            label="数量"
            prop="SecurityCheckSampleNumber"
            :rules="[{ required: true, message: '不能为空', trigger: 'blur' }]"
          >
            <el-input-number
              v-model="formData.SecurityCheckSampleNumber"
              controls-position="right"
              :min="0"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="mb10">
        <el-col :span="24">
          <el-form-item
            label="是否需要含量标签："
            prop="HasContenTag"
            :rules="[
              { required: true, message: '不能为空', trigger: 'change' }
            ]"
          >
            <el-radio-group v-model="formData.HasContenTag">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="mb10">
        <el-col :span="12">
          <el-form-item
            label="是否打托："
            prop="IsDT"
            :rules="[
              { required: true, message: '不能为空', trigger: 'change' }
            ]"
          >
            <el-radio-group v-model="formData.IsDT">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="Number(formData.IsDT)">
          <el-form-item
            label="打托方式："
            prop="DTType"
            :rules="[
              { required: true, message: '不能为空', trigger: 'change' }
            ]"
          >
            <el-radio-group v-model="formData.DTType">
              <el-radio
                v-for="item in PacketWayArr"
                :key="item.id"
                :label="item.id"
                >{{ item.name }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row class="mb10">
        <el-col :span="24">
          <el-form-item
            label="TTUI温度计是否按DHL要求："
            prop="HasSizeUpDHL"
            :rules="[
              { required: true, message: '不能为空', trigger: 'change' }
            ]"
          >
            <el-radio-group v-model="formData.HasSizeUpDHL">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row class="mb10">
        <el-col :span="12">
          <el-form-item
            label="是否需要一次性联网温度计："
            prop="HasConnectedThermometer"
            :rules="[
              { required: true, message: '不能为空', trigger: 'change' }
            ]"
          >
            <el-radio-group v-model="formData.HasConnectedThermometer">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="Number(formData.HasConnectedThermometer)">
          <el-form-item
            label="数量："
            prop="ConnectedThermometerNumber"
            :rules="[{ required: true, message: '不能为空', trigger: 'blur' }]"
          >
            <el-input-number
              v-model="formData.ConnectedThermometerNumber"
              controls-position="right"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24" v-if="Number(formData.HasConnectedThermometer)">
          <el-form-item
            label="放置位置："
            prop="ConnectedThermometerLocation"
            :rules="[
              { required: true, message: '不能为空', trigger: 'change' }
            ]"
          >
            <el-radio-group v-model="formData.ConnectedThermometerLocation">
              <el-radio
                v-for="(i, k) in PlacementLocationArr"
                :key="k"
                :label="i.id"
                >{{ i.name }}
                <el-input
                  v-if="k === PlacementLocationArr.length - 1"
                  class="ml10"
                  v-model="CTLocationOther"
              /></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="mb10">
        <el-col :span="16">
          <el-form-item label="其他要求：" prop="OtherRequire">
            <el-input type="textarea" v-model="formData.OtherRequire" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, onMounted, computed } from 'vue'
import TaskInfo from './task.vue'
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
onMounted(() => {
  // 请求选项
  /* 节点41需要的选项：
   * PacketWay-打托方式，PlacementLocation-放置位置
   */
  let codes = 'PacketWay,PlacementLocation'
  useOptions.getOptions(codes)
})
const PacketWayArr = computed(() => useOptions.PacketWayArr)
const PlacementLocationArr = computed(() => useOptions.PlacementLocationArr)
const formData = reactive({
  HasSecurityCheckSample: '', // 是否需要安检样
  SecurityCheckSampleNumber: '', // 安检样数量
  HasContenTag: '', // 是否需要含量标签
  IsDT: '', // 是否打托
  DTType: '', // 打托方式
  HasSizeUpDHL: '', // TTUI温度计是否按DHL要求
  HasConnectedThermometer: '', // 是否需要一次性联网温度计
  ConnectedThermometerNumber: '', // 数量
  ConnectedThermometerLocation: '', // 一次性联网温度计放置位置
  OtherRequire: '' // 其他要求
})
const CTLocationOther = ref('')
const sendFormData = () => {
  let newForm = {
    ...formData,
    // 位置其他处理
    ConnectedThermometerLocation:
      Number(formData.ConnectedThermometerLocation) === PlacementLocationArr.value.length
        ? `${formData.ConnectedThermometerLocation},${CTLocationOther.value}`
        : formData.ConnectedThermometerLocation
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
        if (element.FieldName === 'ConnectedThermometerLocation') {
          //  其他数据处理
         if (element.FieldValue.indexOf(',') !== -1) {
            let arrText = element.FieldValue.split(',')
            formData[element.FieldName] = arrText[0]
            CTLocationOther.value = arrText[1]
          } else {
            formData[element.FieldName] = element.FieldValue
          }
        } else {
          formData[element.FieldName] = element.FieldValue
        }
      })
    }
  }
)
</script>

<style lang="scss" scoped></style>
