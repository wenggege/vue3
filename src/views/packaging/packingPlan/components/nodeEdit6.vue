<template>
  <div class="node-form">
    <p class="node-form-title">任务内容</p>
    <TaskInfo :taskInfo="nodeInfo" />
    <el-form
      ref="ruleFormRef"
      :model="formData"
      class="demo-ruleForm"
      status-icon
      :disabled="nodeInfo.Status === 3"
    >
      <el-row class="mb10">
        <el-col :span="12">
          <el-form-item
            label="包装车间："
            prop="PackWorkshop"
            :rules="[
              { required: true, message: '不能为空', trigger: 'change' }
            ]"
          >
            <el-input v-model="formData.PackWorkshop" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="质量标准："
            prop="QualityStandard"
            :rules="[
              { required: true, message: '不能为空', trigger: 'change' }
            ]"
          >
            <el-input v-model="formData.QualityStandard" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="mb10">
        <el-col :span="12">
          <el-form-item
            label="发货数量/KG："
            prop="PlanShippingNumber"
            :rules="[
              { required: true, message: '不能为空', trigger: 'change' }
            ]"
          >
            <el-input-number
              v-model="formData.PlanShippingNumber"
              controls-position="right"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="预计出厂日期："
            prop="PlanProductionDate"
            :rules="[
              { required: true, message: '不能为空', trigger: 'change' }
            ]"
          >
            <el-date-picker
              v-model="formData.PlanProductionDate"
              type="date"
              placeholder="选择日期"
              value-format="YYYY-MM-DD"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="mb10">
        <el-col :span="24">
          <el-form-item
            label="拍照方式："
            prop="PhotoWay"
            :rules="[
              { required: true, message: '不能为空', trigger: 'change' }
            ]"
          >
            <el-radio-group v-model="formData.PhotoWay">
              <el-radio label="商检方式照相">商检方式照相</el-radio>
              <el-radio
                v-for="item in PhotoWayArr"
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
            label="是否需要TTUI温度计："
            prop="HasThermometer"
            :rules="[
              { required: true, message: '不能为空', trigger: 'change' }
            ]"
          >
            <el-radio-group v-model="formData.HasThermometer">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="Number(formData.HasThermometer)">
          <el-form-item
            label="数量："
            prop="ThermometerNumber"
            :rules="[{ required: true, message: '不能为空', trigger: 'blur' }]"
          >
            <el-input-number
              v-model="formData.ThermometerNumber"
              controls-position="right"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="Number(formData.HasThermometer)">
          <el-form-item
            label="温度区间范围："
            prop="TemperatureRange"
            :rules="[{ required: true, message: '不能为空', trigger: 'blur' }]"
          >
            <el-input v-model="formData.TemperatureRange" />
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
        <el-col :span="24">
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
        <el-col :span="6" v-if="Number(formData.HasConnectedThermometer)">
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
        <el-col :span="18" v-if="Number(formData.HasConnectedThermometer)">
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
                  v-model="ConnectedPLOther"
              /></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="mb10">
        <el-col :span="24">
          <el-form-item
            label="是否需要干燥剂："
            prop="HasDesiccant"
            :rules="[
              { required: true, message: '不能为空', trigger: 'change' }
            ]"
          >
            <el-radio-group v-model="formData.HasDesiccant">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="Number(formData.HasDesiccant)">
          <el-form-item
            label="放"
            prop="DesiccantSplitPack"
            :rules="[{ required: true, message: '不能为空', trigger: 'blur' }]"
          >
            <el-input-number
              v-model="formData.DesiccantSplitPack"
              controls-position="right"
              :min="0"
              :step="1"
              :step-strictly="true"
            />
            个袋子
          </el-form-item>
        </el-col>
        <el-col :span="18" v-if="Number(formData.HasDesiccant)">
          <el-form-item
            label="放置位置："
            prop="DesiccantPlacementLocation"
            :rules="[
              { required: true, message: '不能为空', trigger: 'change' }
            ]"
          >
            <el-radio-group v-model="formData.DesiccantPlacementLocation">
              <el-radio
                v-for="(i, k) in PlacementLocationArr"
                :key="k"
                :label="i.id"
                >{{ i.name }}
                <el-input
                  v-if="k === PlacementLocationArr.length - 1"
                  class="ml10"
                  v-model="DesiccantPLOther"
              /></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row class="mb10">
        <el-col :span="12">
          <el-form-item
            label="是否需要随货样品："
            prop="HasSample"
            :rules="[
              { required: true, message: '不能为空', trigger: 'change' }
            ]"
          >
            <el-radio-group v-model="formData.HasSample">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="Number(formData.HasSample)">
          <el-form-item
            label="数量："
            prop="SampleNumber"
            :rules="[{ required: true, message: '不能为空', trigger: 'blur' }]"
          >
            <el-input-number
              v-model="formData.SampleNumber"
              controls-position="right"
              :min="0"
            />
          </el-form-item>
        </el-col>
      </el-row>
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
            label="数量："
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

      <el-table :data="formData.TableInfo" border class="table-form mb10">
        <el-table-column
          v-for="(item, index) in tabelHeader"
          :key="index"
          show-overflow-tooltip
          :prop="item.prop"
          :width="item.width"
          :label="item.label"
        >
          <template v-slot:header>
            <div :class="item.isRequired ? 'is-require-label' : ''">
              <span v-if="item.isRequired" class="color-danger">*</span>
              <span class="pl5">{{ item.label }}</span>
            </div>
          </template>
          <template v-slot="scope">
            <el-form-item
              :prop="`TableInfo.${scope.$index}.${item.prop}`"
              :rules="[
                {
                  required: item.isRequired,
                  message: '不能为空',
                  trigger: `${item.type}` == 'input' ? 'blur' : 'change'
                }
              ]"
            >
              <el-select
                v-if="item.type === 'select'"
                v-model="scope.row[item.prop]"
                placeholder="请选择"
              >
                <el-option
                  v-for="sel in item.option"
                  :key="sel.id"
                  :label="sel.name"
                  :value="sel.id"
                />
              </el-select>
              <el-input
                v-else-if="item.type === 'input'"
                v-model="scope.row[item.prop]"
                placeholder="请输入内容"
              />
              <el-input-number
                v-else-if="item.type === 'number'"
                v-model="scope.row[item.prop]"
                controls-position="right"
                :step="item.step"
                :step-strictly="item.isInteger" 
                :min="0"
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="task" width="100">
          <template #default="scope" v-if="nodeInfo.Status !== 3">
            <span
              v-if="formData.TableInfo.length > 1"
              class="link-address"
              @click="onDelItem(scope.$index)"
            >
              删除
            </span>
            <span class="link-address pl10" @click="onAddTable">添加</span>
          </template>
        </el-table-column>
      </el-table>
      <el-row class="mb10">
        <el-col :span="12">
          <el-form-item
            label="内包装："
            :rules="[
              { required: true, message: '不能为空', trigger: 'change' }
            ]"
          >
            {{ formatJsonArr(formData.InsidePackDrumsName) }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="mb10">
        <el-col :span="12">
          <el-form-item
            label="外包装："
            :rules="[{ required: true, message: '不能为空', trigger: 'blur' }]"
          >
            {{ formData.PackDrumsName }}
          </el-form-item>
        </el-col>
      </el-row>

      <el-row class="mb10">
        <el-col :span="12">
          <el-form-item
            label="包装规格："
            :rules="[{ required: true, message: '不能为空', trigger: 'blur' }]"
          >
            {{ formData.SingleContainsNumber }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="打托方式："
            prop="DTType"
            :rules="[{ required: true, message: '不能为空', trigger: 'blur' }]"
          >
            <el-input v-model="formData.DTType" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row class="mb10">
        <el-col :span="16">
          <el-form-item label="备注：" prop="NodeRemark">
            <el-input type="textarea" v-model="formData.NodeRemark" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, computed, watch } from 'vue'
import TaskInfo from './task.vue'
import {EditTableHeader} from '@/types/packaging'
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
const tabelHeader = reactive<EditTableHeader[]>([
  {
    prop: 'PackBatchNumber',
    width: '',
    label: '包材批号',
    isRequired: true,
    type: 'input'
  },
  {
    prop: 'Barrelage',
    width: '',
    label: '桶数',
    isRequired: true,
    type: 'number',
    step: 1,
    isInteger: true,
  },
  {
    prop: 'PackedWeight',
    width: '',
    label: '包装重量/KG',
    isRequired: true,
    type: 'number',
    step: 1,
    isInteger: false,
  }
])
const formData = reactive<any>({
  TableInfo: [{ PackBatchNumber: '', Barrelage: '', PackedWeight: '' }],
  PackWorkshop: '', // 包装车间
  QualityStandard: '', // 质量标准
  PlanShippingNumber: '', // 发货数量
  PlanProductionDate: '', // 预计出厂日期
  PhotoWay: '', // 拍照方式
  HasThermometer: '', // 是否需要TTUI温度计
  ThermometerNumber: '', // TTUI温度计数量
  TemperatureRange: '', // 温度区间范围
  HasSizeUpDHL: '', // TTUI温度计是否按DHL要求
  HasConnectedThermometer: '', // 是否需要一次性联网温度计
  ConnectedThermometerNumber: '', // 一次性联网温度计数量
  ConnectedThermometerLocation: '', // 一次性联网温度计放置位置
  HasDesiccant: '', // 是否需要干燥剂
  DesiccantSplitPack: '', // 干燥剂放几个包
  DesiccantPlacementLocation: '', // 干燥剂放置位置
  HasSample: '', // 是否需要随货样品
  SampleNumber: '', // 随货样品数量
  HasSecurityCheckSample: '', // 是否需要安检样
  SecurityCheckSampleNumber: '', // 安检样数量
  DTType: '', // 打托方式
  NodeRemark: '', // 备注
  InsidePackDrumsName: '', // 内包装
  PackDrumsName: '', // 外包装
  SingleContainsNumber: '' // 包装规格
})
// 一次性联网温度计放置位置-其他
const ConnectedPLOther = ref('')
//  干燥剂放置位置-其他
const DesiccantPLOther = ref('')
onMounted(() => {
  // 请求选项
  /* 节点60需要的选项：
   * PhotoWay-拍照方式,PlacementLocation-放置位置
   */
  let codes = 'PhotoWay,PlacementLocation'
  useOptions.getOptions(codes)
})
const PhotoWayArr = computed(() => useOptions.PhotoWayArr)
const PlacementLocationArr = computed(() => useOptions.PlacementLocationArr)

const onAddTable = () => {
  formData.TableInfo.push({
    PackBatchNumber: '',
    Barrelage: '',
    PackedWeight: ''
  })
}
const onDelItem = (index: number) => {
  console.log('删除', index)
  formData.TableInfo.splice(index, 1)
}

const formatJsonArr = (value: string) => {
  return value ? JSON.parse(value).join(',') : ''
}
const sendFormData = () => {
  let newForm = {
    ...formData,
    TableInfo: JSON.stringify(formData.TableInfo),
    // 干燥剂放置位置-其他处理
    DesiccantPlacementLocation:
      formData.ConnectedThermometerLocation == PlacementLocationArr.value.length
        ? `${formData.ConnectedThermometerLocation},${DesiccantPLOther.value}`
        : formData.ConnectedThermometerLocation,
    // 一次性联网温度计放置位置处理
    ConnectedThermometerLocation:
      formData.ConnectedThermometerLocation == PlacementLocationArr.value.length
        ? `${formData.ConnectedThermometerLocation},${ConnectedPLOther.value}`
        : formData.ConnectedThermometerLocation,
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
        if (element.FieldName === 'TableInfo') {
          if (element.FieldValue) {
            formData.TableInfo = JSON.parse(element.FieldValue)
          }
        } else if (element.FieldName === 'DesiccantPlacementLocation') {
          //  干燥剂放置位置-其他
          if (element.FieldValue.indexOf(',') !== -1) {
            let arrText = element.FieldValue.split(',')
            formData[element.FieldName] = arrText[0]
            DesiccantPLOther.value = arrText[1]
          } else {
            formData[element.FieldName] = element.FieldValue
          }
        }else if (element.FieldName === 'ConnectedThermometerLocation') {
          //  干燥剂放置位置-其他
          if (element.FieldValue.indexOf(',') !== -1) {
            let arrText = element.FieldValue.split(',')
            formData[element.FieldName] = arrText[0]
            ConnectedPLOther.value = arrText[1]
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

<style lang="scss" scoped>
.table-form {
  margin-top: 15px;
}
</style>
