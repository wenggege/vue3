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
      <el-row class="mb10" :gutter="20">
        <el-col :span="12">
          <el-form-item
            label="液体/固体："
            prop="LiquidOrSolid"
            :rules="[
              { required: true, message: '不能为空', trigger: 'change' }
            ]"
          >
            <el-select v-model="formData.LiquidOrSolid" placeholder="请选择">
              <el-option label="固体" value="1" />
              <el-option label="液体" value="2" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="比重："
            prop="Proportion"
            :rules="[{ required: true, message: '不能为空', trigger: 'blur' }]"
          >
            <el-input v-model="formData.Proportion" style="width: 200px" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="mb10" :gutter="20">
        <el-col :span="12">
          <el-form-item
            label="致敏性："
            prop="HasSensitization"
            :rules="[
              { required: true, message: '不能为空', trigger: 'change' }
            ]"
          >
            <el-radio-group v-model="formData.HasSensitization">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="导静电性能："
            prop="HasConduction"
            :rules="[
              { required: true, message: '不能为空', trigger: 'change' }
            ]"
          >
            <el-radio-group v-model="formData.HasConduction">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
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
        <el-col :span="12">
          <el-form-item
            label="是否低温储存："
            prop="HasLowTemperatureStorage"
            :rules="[
              { required: true, message: '不能为空', trigger: 'change' }
            ]"
          >
            <el-radio-group v-model="formData.HasLowTemperatureStorage">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="Number(formData.HasLowTemperatureStorage)">
          <el-form-item
            label="温度："
            prop="TemperatureRange"
            :rules="[{ required: true, message: '不能为空', trigger: 'blur' }]"
          >
            <el-input-number
              :min="0"
              v-model="formData.TemperatureRange"
              controls-position="right"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="mb10">
        <el-col :span="8">
          <el-form-item
            label="是否有吸潮性能："
            prop="HasMoistureAbsorption"
            :rules="[
              { required: true, message: '不能为空', trigger: 'change' }
            ]"
          >
            <el-radio-group v-model="formData.HasMoistureAbsorption">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="mb10">
        <el-col :span="8">
          <el-form-item
            label="是否避光："
            prop="HasAwayLight"
            :rules="[
              { required: true, message: '不能为空', trigger: 'change' }
            ]"
          >
            <el-radio-group v-model="formData.HasAwayLight">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted, computed, watch } from 'vue'
import TaskInfo from './task.vue'
import { EditTableHeader } from '@/types/packaging'
import { optionsStore } from '@/store'
const useOptions = optionsStore()
// 定义接口来定义对象的类型
// interface TableHeader {
//   prop: string
//   width: string | number
//   label: string
//   isRequired?: boolean
//   isTooltip?: boolean
//   type: string
//   option?: any[]
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
const tabelHeader = reactive<EditTableHeader[]>([
  {
    prop: 'Wrapper',
    width: '',
    label: '包材名称',
    isRequired: true,
    type: 'selectWrapper', // 内外包装有两种选项组
    optionIn: WrapperInNameArr as any,
    optionOut: WrapperOutNameArr as any
  },
  {
    prop: 'WrapperTier',
    width: '',
    label: '单层/双层',
    type: 'select',
    option: WrapperTierArr as any
  },
  {
    prop: 'SealType',
    width: '',
    label: '密封方式',
    type: 'select',
    option: SealTypeArr as any
  },
  {
    prop: 'SingleContainsNumber',
    width: '',
    label: '包装规格',
    isRequired: true,
    type: 'input'
  }
])
const formData = reactive<any>({
  TableInfo: [
    {
      WrapperType: '1',
      Wrapper: '',
      WrapperTier: '',
      SealType: '',
      SingleContainsNumber: ''
    },
    {
      WrapperType: '2',
      Wrapper: '',
      WrapperTier: '',
      SealType: '',
      SingleContainsNumber: ''
    }
  ],
  LiquidOrSolid: '', // 固体/液体
  Proportion: '', // 比重
  HasSensitization: 0, // 致敏性
  HasConduction: '', // 导电性
  HasLowTemperatureStorage: '1', // 是否低温储存
  TemperatureRange: 0, // 温度
  HasMoistureAbsorption: '1', // 是否吸潮
  HasAwayLight: '1' // 是否避光
})
onMounted(() => {
  /* 节点20需要的选项：
   * WrapperType包材类别，WrapperInName-包材名称_内包装，WrapperOutName-包材名称_外包装，
   * WrapperTier-包材层数，SealType-密封方式
   */
  let codes =
    'WrapperType,WrapperInName,WrapperOutName,WrapperTier,SealType,PlacementLocation'
  useOptions.getOptions(codes)
})
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
    TableInfo: JSON.stringify(formData.TableInfo)
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
          //  回显表格数据
          if (element.FieldValue) {
            formData.TableInfo = JSON.parse(element.FieldValue)
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
