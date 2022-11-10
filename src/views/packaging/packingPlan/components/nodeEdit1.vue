<template>
  <div class="node-form">
    <div class="node-form-title">任务内容</div>
    <TaskInfo :taskInfo="nodeInfo" />
    <el-form
      ref="ruleFormRef"
      :model="formData"
      class="demo-ruleForm"
      status-icon
      :disabled="nodeInfo.Status === 3"
      size="default"
    >
      <el-table :data="formData.TableInfo" border class="table-form mb10">
        <el-table-column prop="WrapperType" label="包材类别">
          <template #default="scope">
            {{ scope.row.WrapperType === '1' ? '内包材' : '外包材' }}
          </template>
        </el-table-column>
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
              <template v-if="item.type === 'selectWrapper'">
                <!-- 内包材名称选择 -->
                <el-select
                  v-if="scope.row.WrapperType === '1'"
                  v-model="scope.row[item.prop]"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="sel in item.optionIn"
                    :key="sel.id"
                    :label="sel.name"
                    :value="sel.id"
                  />
                </el-select>
                <!-- 外包材名称选择 -->
                <el-select
                  v-if="scope.row.WrapperType === '2'"
                  v-model="scope.row[item.prop]"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="sel in item.optionOut"
                    :key="sel.id"
                    :label="sel.name"
                    :value="sel.id"
                  />
                </el-select>
              </template>
              <el-input
                v-else-if="item.type === 'input'"
                v-model="scope.row[item.prop]"
                placeholder="请输入内容"
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="task" width="100">
          <template #default="scope" v-if="nodeInfo.Status !== 3">
            <span
              v-if="
                formData.TableInfo.length > 2 && scope.row.WrapperType !== '2'
              "
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
        <el-col :span="24" v-if="Number(formData.HasDesiccant)">
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
                  v-if="i.id === '3'"
                  class="ml10"
                  v-model="DesiccantPlacementLocationOther"
              /></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="mb10">
        <el-col :span="24">
          <el-form-item
            label="是否需要除氧剂："
            prop="HasDeoxidant"
            :rules="[
              { required: true, message: '不能为空', trigger: 'change' }
            ]"
          >
            <el-radio-group v-model="formData.HasDeoxidant">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24" v-if="Number(formData.HasDeoxidant)">
          <el-form-item
            label="放置位置："
            prop="DeoxidantPlacementLocation"
            :rules="[
              { required: true, message: '不能为空', trigger: 'change' }
            ]"
          >
            <el-radio-group v-model="formData.DeoxidantPlacementLocation">
              <el-radio
                v-for="(i, k) in PlacementLocationArr"
                :key="k"
                :label="i.id"
                >{{ i.name }}
                <el-input
                  v-if="i.id === '3'"
                  class="ml10"
                  v-model="DeoxidantPlacementLocationOther"
              /></el-radio>
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
            <el-input
              v-model="formData.TemperatureRange"
              style="width: 100px"
            />
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
              :min="0"
              v-model="formData.SampleNumber"
              controls-position="right"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="mb10">
        <el-col :span="12">
          <el-form-item
            label="运输温度要求："
            prop="TransportTemperature"
            :rules="[
              { required: true, message: '不能为空', trigger: 'change' }
            ]"
          >
            <el-input v-model="formData.TransportTemperature" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="mb10">
        <el-col :span="12">
          <el-form-item label="备注（其他要求）：" prop="NodeRemark">
            <el-input type="textarea" v-model="formData.NodeRemark" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, computed, watch } from 'vue'
import { optionsStore } from '@/store'
import TaskInfo from './Task.vue'
const useOptions = optionsStore()

// 定义接口来定义对象的类型
// interface TableHeader {
//   prop: string
//   width: string | number
//   label: string
//   isRequired?: boolean
//   isTooltip?: boolean
//   type: string
//   option?: any
//   optionIn?: any
//   optionOut?: any
// }

const props = defineProps({
  nodeInfo: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

// 包材名称_内包装
const WrapperInNameArr = computed(() => useOptions.WrapperInNameArr)
// 包材名称_外包装
const WrapperOutNameArr = computed(() => useOptions.WrapperOutNameArr)
// 包材层数
const WrapperTierArr = computed(() => useOptions.WrapperTierArr)
// 密封方式
const SealTypeArr = computed(() => useOptions.SealTypeArr)
// 放置位置
const PlacementLocationArr = computed(() => useOptions.PlacementLocationArr)

const tabelHeader = reactive<any>([
  {
    prop: 'Wrapper',
    width: '',
    label: '包材名称',
    isRequired: true,
    type: 'selectWrapper', // 内外包装有两种选项组
    optionIn: WrapperInNameArr,
    optionOut: WrapperOutNameArr
  },
  {
    prop: 'WrapperTier',
    width: '',
    label: '单层/双层',
    type: 'select',
    option: WrapperTierArr
  },
  {
    prop: 'SealType',
    width: '',
    label: '密封方式',
    type: 'select',
    option: SealTypeArr
  },
  {
    prop: 'SingleContainsNumber',
    width: '',
    label: '包装规格',
    isRequired: true,
    type: 'input'
  }
])
const DesiccantPlacementLocationOther = ref('') // 干燥剂其他
const DeoxidantPlacementLocationOther = ref('') // 除氧剂其他
const formData = reactive<any>({
  TableInfo: [
    {
      WrapperType: '1', // 1内包材2外包材
      Wrapper: '', // 包材名称
      WrapperTier: '',
      SealType: '',
      SingleContainsNumber: '' // 包装规格/KG
    },
    {
      WrapperType: '2',
      Wrapper: '',
      WrapperTier: '',
      SealType: '',
      SingleContainsNumber: ''
    }
  ],
  HasDesiccant: '1', // 是否需要干燥剂
  DesiccantPlacementLocation: '', // 干燥剂-放置位置
  HasDeoxidant: '1', // 是否需要除氧剂
  DeoxidantPlacementLocation: '', // 除氧剂放置位置
  HasThermometer: '1', // 是否需要TTUI温度计
  ThermometerNumber: 0, // 温度计数量
  TemperatureRange: '', // 温度区间范围
  HasSample: '1', // 是否需要随货样品
  SampleNumber: 0, // 随货样品数量
  TransportTemperature: '', // 运输温度
  NodeRemark: '' // 备注
})
onMounted(() => {
  /* 节点10需要的选项：
   * WrapperType包材类别，WrapperInName-包材名称_内包装，WrapperOutName-包材名称_外包装，
   * WrapperTier-包材层数，SealType-密封方式，PlacementLocation-放置位置
   */
  let codes =
    'WrapperType,WrapperInName,WrapperOutName,WrapperTier,SealType,PlacementLocation'
  useOptions.getOptions(codes)
  // 数据回显
})
// 表格表单新增内包材
const onAddTable = () => {
  formData.TableInfo.push({
    WrapperType: '1',
    WrapperName: '',
    WrapperTier: '',
    SealType: '',
    WrapperSize: ''
  })
}
const onDelItem = (index: number) => {
  console.log('删除', index)
  formData.TableInfo.splice(index, 1)
}
const sendFormData = () => {
  let newForm = {
    ...formData,
    TableInfo: JSON.stringify(formData.TableInfo),
    // 干燥机其他处理
    DesiccantPlacementLocation:
      formData.DesiccantPlacementLocation == PlacementLocationArr.value.length
        ? `${formData.DesiccantPlacementLocation},${DesiccantPlacementLocationOther.value}`
        : formData.DesiccantPlacementLocation,
    // 除氧其他处理
    DeoxidantPlacementLocation:
      formData.DeoxidantPlacementLocation == PlacementLocationArr.value.length
        ? `${formData.DeoxidantPlacementLocation},${DeoxidantPlacementLocationOther.value}`
        : formData.DeoxidantPlacementLocation
  }
  return newForm
}
defineExpose({
  sendFormData
})
watch(
  () => props.nodeInfo,
  (val) => {
    if (val?.NodeContent.length > 0) {
      // 数据回显
      val.NodeContent.forEach((element) => {
        if (element.FieldName === 'TableInfo') {
          //  回显表格数据
          if (element.FieldValue) {
            formData.TableInfo = JSON.parse(element.FieldValue)
          }
        } else if (element.FieldName === 'DesiccantPlacementLocation') {
          // 干燥其他字段处理
          if (element.FieldValue.indexOf(',') !== -1) {
            console.log('有其他')
            let arrText = element.FieldValue.split(',')
            formData[element.FieldName] = arrText[0]
            DesiccantPlacementLocationOther.value = arrText[1]
          } else {
            formData[element.FieldName] = element.FieldValue
          }
        } else if (element.FieldName === 'DeoxidantPlacementLocation') {
          // 除氧其他字段处理
          if (element.FieldValue.indexOf(',') !== -1) {
            console.log('有其他')
            let arrText = element.FieldValue.split(',')
            formData[element.FieldName] = arrText[0]
            DeoxidantPlacementLocationOther.value = arrText[1]
          } else {
            formData[element.FieldName] = element.FieldValue
          }
        } else {
          formData[element.FieldName] = element.FieldValue
        }
      })
    }
  },
  { deep: true }
)
</script>

<style lang="scss" scoped>
.table-form {
  margin-top: 15px;
}
</style>
