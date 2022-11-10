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
                @change="(arg) => handleSapChange(arg, scope.$index, 'table')"
                filterable
                remote
                reserve-keyword
                :remote-method="remoteMethod"
              >
                <el-option
                  v-for="sel in sapOptionsArr"
                  :key="sel.MATNR"
                  :label="sel.MATNR"
                  :value="sel.MATNR"
                />
              </el-select>
              <el-input
                v-else-if="item.type === 'input'"
                v-model="scope.row[item.prop]"
                placeholder="请输入内容"
                :disabled="item.isDisabled"
              />
              <el-date-picker
                v-else-if="item.type === 'date'"
                v-model="scope.row[item.prop]"
                type="date"
                placeholder="选择日期"
                value-format="YYYY-MM-DD"
              />
              <el-input-number
                v-else-if="item.type === 'number'"
                v-model="scope.row[item.prop]"
                controls-position="right"
                :min="0"
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
            label="内包袋包装方式："
            prop="InsidePackWay"
            :rules="[
              { required: true, message: '不能为空', trigger: 'change' }
            ]"
          >
            <el-radio-group v-model="formData.InsidePackWay">
              <el-radio v-for="(i, k) in InPackWayArr" :key="k" :label="i.id"
                >{{ i.name }}
                <el-input
                  v-if="k === InPackWayArr.length - 1"
                  class="ml10"
                  v-model="otherValue.InsidePackWayOther"
              /></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="mb10">
        <el-col :span="24">
          <el-form-item
            label="内包材封口方式："
            prop="InsideSealWay"
            :rules="[
              { required: true, message: '不能为空', trigger: 'change' }
            ]"
          >
            <el-radio-group v-model="formData.InsideSealWay">
              <el-radio v-for="(i, k) in InSealWayArr" :key="k" :label="i.id"
                >{{ i.name }}
                <el-input
                  v-if="k === InSealWayArr.length - 1"
                  class="ml10"
                  v-model="otherValue.InsideSealWayOther"
              /></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="mb10">
        <el-col :span="24">
          <el-form-item
            label="贮存要求："
            prop="StorageRequirements"
            :rules="[
              { required: true, message: '不能为空', trigger: 'change' }
            ]"
          >
            <el-radio-group v-model="formData.StorageRequirements">
              <el-radio
                v-for="(i, k) in StorageRequirementsArr"
                :key="k"
                :label="i.id"
                >{{ i.name }}
                <el-input-number
                  class="ml10 mr5"
                  v-if="k === StorageRequirementsArr.length - 1"
                  v-model="formData.SaveTemperature"
                  controls-position="right"
                  :min="0"
                />
                ℃
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 待确认干燥剂和除氧剂是通过sap选项带出 -->
      <el-row class="mb10" :gutter="20">
        <el-col :span="8">
          <el-form-item
            label="SAP代码："
            prop="DesiccantSAP"
            :rules="[{ required: true, message: '不能为空', trigger: 'blur' }]"
          >
            <el-select
              class="mr20"
              v-model="formData.DesiccantSAP"
              placeholder="请选择SAP代码"
              @change="(arg) => handleSapChange(arg, 0, 'Desiccant')"
              filterable
              remote
              reserve-keyword
              :remote-method="remoteMethod"
            >
              <el-option
                v-for="sel in sapOptionsArr"
                :key="sel.MATNR"
                :label="sel.MATNR"
                :value="sel.MATNR"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="干燥剂："
            prop="Desiccant"
            :rules="[
              { required: true, message: '不能为空', trigger: 'change' }
            ]"
          >
            <el-input
              v-model="formData.Desiccant"
              placeholder=""
              disabled
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item
            label="数量："
            prop="DesiccantNumber"
            :rules="[{ required: true, message: '不能为空', trigger: 'blur' }]"
          >
            <el-input-number
              v-model="formData.DesiccantNumber"
              controls-position="right"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="16">
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
                  v-model="otherValue.DesiccantPLOther"
              /></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="到货时间："
            prop="DesiccantArrivalTime"
            :rules="[
              { required: true, message: '不能为空', trigger: 'change' }
            ]"
          >
            <el-date-picker
              v-model="formData.DesiccantArrivalTime"
              type="date"
              placeholder="选择日期"
              value-format="YYYY-MM-DD"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row class="mb10" :gutter="20">
        <el-col :span="8">
          <el-form-item
            label="SAP代码："
            prop="DeoxidantSAP"
            :rules="[{ required: true, message: '不能为空', trigger: 'blur' }]"
          >
            <el-select
              class="mr20"
              v-model="formData.DeoxidantSAP"
              placeholder="请选择SAP代码"
              @change="(arg) => handleSapChange(arg, 0, 'Deoxidant')"
              filterable
              remote
              reserve-keyword
              :remote-method="remoteMethod"
            >
              <el-option
                v-for="sel in sapOptionsArr"
                :key="sel.MATNR"
                :label="sel.MATNR"
                :value="sel.MATNR"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="除氧剂："
            prop="Deoxidant"
            :rules="[
              { required: true, message: '不能为空', trigger: 'change' }
            ]"
          >
            <el-input
              v-model="formData.Deoxidant"
              placeholder=""
              disabled
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item
            label="数量："
            prop="DeoxidantNumber"
            :rules="[{ required: true, message: '不能为空', trigger: 'blur' }]"
          >
            <el-input-number
              v-model="formData.DeoxidantNumber"
              controls-position="right"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="16">
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
                  v-if="k === PlacementLocationArr.length - 1"
                  class="ml10"
                  v-model="otherValue.DeoxidantPLOther"
              /></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="到货时间："
            prop="DeoxidantArrivalTime"
            :rules="[
              { required: true, message: '不能为空', trigger: 'change' }
            ]"
          >
            <el-date-picker
              v-model="formData.DeoxidantArrivalTime"
              type="date"
              placeholder="选择日期"
              value-format="YYYY-MM-DD"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="mb10">
        <el-col :span="16">
          <el-form-item label="备注（其他要求）：" prop="NodeRemark">
            <el-input type="textarea" v-model="formData.NodeRemark" />
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
const props = defineProps({
  nodeInfo: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

const sapOptionsArr = computed(() => useOptions.sapOptionsArr)
// 内包袋包装方式
const InPackWayArr = computed(() => useOptions.InPackWayArr)
// 内包材封口方式
const InSealWayArr = computed(() => useOptions.InSealWayArr)
// 贮存要求
const StorageRequirementsArr = computed(() => useOptions.StorageRequirementsArr)
// 放置位置，
const PlacementLocationArr = computed(() => useOptions.PlacementLocationArr)

const tabelHeader = reactive<EditTableHeader[]>([
  {
    prop: 'SAPCode',
    width: '',
    label: 'SAP代码',
    isRequired: true,
    type: 'select'
  },
  {
    prop: 'WrapperNameSpec',
    width: '',
    label: '包材名称规格/mm',
    isRequired: true,
    type: 'input',
    isDisabled: true
  },
  {
    prop: 'SingleContainsNumber',
    width: '',
    label: '单件装量/KG',
    isRequired: true,
    type: 'number',
    isDisabled: false
  },
  {
    prop: 'Number',
    width: '',
    label: '数量/个',
    isRequired: true,
    type: 'number',
    isDisabled: false
  },
  {
    prop: 'ArrivalTime',
    width: '',
    label: '到货时间',
    isRequired: true,
    type: 'date'
  }
])
const otherValue = reactive({
  InsidePackWayOther: '', // 内包袋包装方式其他
  InsideSealWayOther: '', // 内包材封口方式
  DesiccantPLOther: '', // 干燥剂放置位置其他
  DeoxidantPLOther: '' // 除氧剂放置位置其他
})
const formData = reactive<any>({
  TableInfo: [
    {
      WrapperType: '1',
      SAPCode: '',
      WrapperNameSpec: '',
      SingleContainsNumber: '',
      Number: '',
      ArrivalTime: ''
    },
    {
      WrapperType: '2',
      SAPCode: '',
      WrapperNameSpec: '',
      SingleContainsNumber: '',
      Number: '',
      ArrivalTime: ''
    }
  ],
  InsidePackWay: '', // 内包袋包装方式
  InsideSealWay: '', // 内包材封口方式
  StorageRequirements: '1', // 贮存要求
  SaveTemperature: '', // 贮存温度
  Desiccant: '', // 干燥剂
  DesiccantSAP: '', // 干燥剂-SAP代码
  DesiccantNumber: 0, // 干燥剂-数量
  DesiccantPlacementLocation: '', // 干燥剂-放置位置
  DesiccantArrivalTime: '', // 干燥剂-到货时间
  Deoxidant: '', // 除氧剂
  DeoxidantSAP: '', // 除氧剂-SAP代码
  DeoxidantNumber: 0, // 除氧剂-数量
  DeoxidantPlacementLocation: '', // 除氧剂-放置位置
  DeoxidantArrivalTime: '', // 除氧剂-到货时间
  NodeRemark: '', // 备注
  PackDrumsSAPCode: '', // 外包材的SAP代码-extendFields
  PackDrumsName: '', // 外包材名称规格-extendFields
  OrderSize: '', // 外包材数量-extendFields
  InsidePackDrumsName: '', // 内包材名称规格-extendFields
  SingleContainsNumber: '' //  外包装单件装量/KG-extendFields
})
onMounted(() => {
  // 请求选项
  /* 节点21需要的选项：
   * WrapperType-包材类别，SAP代码， InPackWay-内包袋包装方式，InSealWay-内包材封口方式
   * StorageRequirements-贮存要求， DesiccantType-干燥剂类型，DeoxidantType-除氧剂类型、
   * PlacementLocation-放置位置，
   */
  let codes =
    'WrapperType,InPackWay,InSealWay,StorageRequirements,DesiccantType,DeoxidantType,PlacementLocation'
  useOptions.getOptions(codes)
  useOptions.getSap('')
})
const onAddTable = () => {
  formData.TableInfo.push({
    WrapperType: '1',
    SAPCode: '',
    WrapperNameSpec: '',
    SingleContainsNumber: '',
    Number: '',
    ArrivalTime: ''
  })
}
const onDelItem = (index: number) => {
  console.log('删除', index)
  formData.TableInfo.splice(index, 1)
}

//表格sap
const handleSapChange = (val, index, type) => {
  console.log('tableSap', val, index)
  let selectItem = sapOptionsArr.value.find((item) => {
    return item.MATNR === val
  })
  if (type === 'table') {
    formData.TableInfo[index].WrapperNameSpec = selectItem.MAKTX
  } else if (type === 'Desiccant') {
    // 干燥剂
    formData.Desiccant = selectItem.MAKTX
  } else {
    // 除氧剂
    formData.Deoxidant = selectItem.MAKTX
  }
}
// 远程搜索
const remoteMethod = (query: string) => {
  useOptions.getSap(query)
}
const sendFormData = () => {
  // 扩展字段相关
  // 处理外包材相关字段
  let outIndex = formData.TableInfo.findIndex((item) => {
    return item.WrapperType === '2'
  })
  formData.PackDrumsSAPCode = formData.TableInfo[outIndex].SAPCode
  formData.PackDrumsName = formData.TableInfo[outIndex].WrapperNameSpec
  formData.OrderSize = formData.TableInfo[outIndex].Number
  formData.SingleContainsNumber =
    formData.TableInfo[outIndex].SingleContainsNumber
  // 处理内包材规格InsidePackDrumsName
  let InsidePackDrumsNameArr = [] as any
  formData.TableInfo.forEach((obj) => {
    if (obj.WrapperType === '1') {
      InsidePackDrumsNameArr.push(obj.WrapperNameSpec)
    }
  })
  formData.InsidePackDrumsName = JSON.stringify(InsidePackDrumsNameArr)
  console.log('formData.InsidePackDrumsName ', formData.InsidePackDrumsName)
  // 处理其他字段
  let newForm = {
    ...formData,
    TableInfo: JSON.stringify(formData.TableInfo),
    // 内包袋包装方式其他处理
    InsidePackWay:
      formData.InsidePackWay == InPackWayArr.value.length
        ? `${formData.InsidePackWay},${otherValue.InsidePackWayOther}`
        : formData.InsidePackWay,
    // 内包材封口其他处理
    InsideSealWay:
      formData.InsideSealWay == InSealWayArr.value.length
        ? `${formData.InsideSealWay},${otherValue.InsideSealWayOther}`
        : formData.InsideSealWay,
    // 干燥其他处理
    DesiccantPlacementLocation:
      formData.DesiccantPlacementLocation == PlacementLocationArr.value.length
        ? `${formData.DesiccantPlacementLocation},${otherValue.DesiccantPLOther}`
        : formData.DesiccantPlacementLocation,
    // 除氧其他处理
    DeoxidantPlacementLocation:
      formData.DeoxidantPlacementLocation == PlacementLocationArr.value.length
        ? `${formData.DeoxidantPlacementLocation},${otherValue.DeoxidantPLOther}`
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
    // 数据回显
    if (val?.NodeContent.length > 0) {
      val.NodeContent.forEach((element) => {
        if (element.FieldName === 'TableInfo') {
          //  回显表格数据
          if (element.FieldValue) {
            formData.TableInfo = JSON.parse(element.FieldValue)
          }
        } else if (
          [
            'InsidePackWay',
            'InsideSealWay',
            'DesiccantPlacementLocation',
            'DeoxidantPlacementLocation'
          ].includes(element.FieldName)
        ) {
          if (element.FieldValue.indexOf(',') === -1) {
            formData[element.FieldName] = element.FieldValue
          } else {
            console.log('有其他')
            let arrText = element.FieldValue.split(',')
            formData[element.FieldName] = arrText[0]
            switch (element.FieldName) {
              case 'InsidePackWay':
                // 内包袋包装方式其他回显
                otherValue.InsidePackWayOther = arrText[1]
                break
              case 'InsideSealWay':
                // 内包材封口其他回显
                otherValue.InsideSealWayOther = arrText[1]
                break
              case 'DesiccantPlacementLocation':
                // 干燥位置其他回显
                otherValue.DesiccantPLOther = arrText[1]
                break
              case 'DeoxidantPlacementLocation':
                // 除氧其他处理
                otherValue.DeoxidantPLOther = arrText[1]
                break
            }
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
