<template>
  <div>
    <p class="section-title">
      <img class="title-icon" src="@/assets/images/title_icon.png" alt="" />
      <span>项目执行总结</span>
    </p>
    <div class="section-content">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane
          v-for="(item, index) in state.tabsList"
          :key="item['Val']"
          :label="`${item['Val']}${item['Num'] > 0 ? `(${item['Num']})` : ''}`"
          :name="item['Val']"
        ></el-tab-pane>
      </el-tabs>
      <el-button type="primary" class="mb12" @click="handleAdd"
        >新建事件</el-button
      >
      <el-table :data="state.tableList" max-height="300px" style="width: 100%">
        <el-table-column prop="IsImportant" label="重要">
          <template #default="scope">
            <span>{{ scope.row.IsImportant ? '是' : '否' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="Milestone" label="项目阶段" />
        <el-table-column prop="EventType" label="影响类型" />
        <el-table-column prop="Steps" label="步骤" />
        <el-table-column prop="EventDec" label="事件描述" />
        <el-table-column prop="Remark" label="备注" />
        <el-table-column label="操作">
          <template #default="scope">
            <span
              class="link-address pr20"
              @click="handleAddQuestion(scope.row)"
              >+ 问题</span
            >
            <span class="link-address pr20" @click="handleEdit(scope.row)"
              >编辑</span
            >
            <span class="link-address" @click="handleDel(scope.row)">删除</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <p class="section-title">
      <img class="title-icon" src="@/assets/images/title_icon.png" alt="" />
      <span>库存物料（单单清）</span>
    </p>
    <div class="section-content">
      <div class="check-box">
        <el-button type="primary" plain @click="onCheck">点击查看</el-button>
      </div>
    </div>
    <el-dialog
      v-model="state.showDialog"
      :close-on-click-modal="false"
      :title="state.dialogType === 'add' ? '新建事件' : '编辑事件'"
    >
      <el-form
        ref="ruleFormRef"
        :model="state.formData"
        label-width="140px"
        :rules="rules"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="里程碑：" prop="Milestone">
              <el-input
                v-model="state.formData.Milestone"
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="事件来源：" prop="Source">
              <el-select
                v-model="state.formData.Source"
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  v-for="item in EventTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="影响类型：" prop="EventType">
              <el-select
                v-model="state.formData.EventType"
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  v-for="item in EventTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="步骤：" prop="Steps">
              <el-input v-model="state.formData.Steps" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="事件描述：" prop="EventDec">
              <el-input
                type="textarea"
                v-model="state.formData.EventDec"
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="原因分析：" prop="CauseAnalysis">
              <el-input
                type="textarea"
                v-model="state.formData.CauseAnalysis"
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="改进措施：" prop="Measures">
              <el-input
                type="textarea"
                v-model="state.formData.Measures"
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="优化建议：" prop="Suggestion">
              <el-input
                type="textarea"
                v-model="state.formData.Suggestion"
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="受影响的相关方：" prop="Affected">
              <el-select
                v-model="state.formData.Affected"
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  v-for="item in AffectedList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="重要或重大事件：" prop="IsImportant">
              <el-radio-group v-model="state.formData.IsImportant">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="备注：" prop="Remark">
              <el-input
                type="textarea"
                v-model="state.formData.Remark"
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="state.showDialog = false">取消</el-button>
          <el-button type="primary" v-debounce="onConfirm">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, defineEmits, watch, onMounted } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import { GetEvent, AddEvents, DeleteEvent } from '@/api/projectAnalyse/index'

const props = defineProps({
  rowData: {
    type: Object,
    default: null
  },
  urlData: {
    type: Object,
    default: null
  }
})

// 受影响的相关方
const AffectedList = [
  {
    value: '研发',
    label: '研发'
  },
  {
    value: '技术',
    label: '技术'
  },
  {
    value: 'QA',
    label: 'QA'
  },
  {
    value: 'QC',
    label: 'QC'
  },
  {
    value: 'ARD',
    label: 'ARD'
  },
  {
    value: '计划',
    label: '计划'
  },
  {
    value: '生产',
    label: '生产'
  },
  {
    value: '采购',
    label: '采购'
  },
  {
    value: '物流',
    label: '物流'
  },
  {
    value: 'EHS',
    label: 'EHS'
  },
  {
    value: '客户',
    label: '客户'
  },
  {
    value: '供应商',
    label: '供应商'
  }
]

const EventTypeList = [
  {
    value: 'Option1',
    label: 'Option1'
  }
]

const emit = defineEmits(['emtAddQuestion'])
const activeName = ref('全部')
const state = reactive({
  tabsList: [],
  tableList: [],
  Milestone: '', // 列表查询条件
  dialogType: 'add',
  showDialog: false,
  formData: {
    Id: 0,
    Milestone: '',
    Source: '',
    EventType: '',
    Steps: '',
    EventDec: '',
    CauseAnalysis: '',
    Measures: '',
    Suggestion: '',
    Affected: '',
    IsImportant: '',
    Remark: ''
  }
})
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  Milestone: [{ required: true, message: '必填', trigger: 'blur' }],
  Source: [{ required: true, message: '必填', trigger: 'blur' }],
  EventType: [{ required: true, message: '必填', trigger: 'blur' }],
  Steps: [{ required: true, message: '必填', trigger: 'blur' }],
  EventDec: [{ required: true, message: '必填', trigger: 'blur' }],
  CauseAnalysis: [{ required: true, message: '必填', trigger: 'blur' }],
  Measures: [{ required: true, message: '必填', trigger: 'blur' }],
  Suggestion: [{ required: true, message: '必填', trigger: 'blur' }],
  Affected: [{ required: true, message: '必填', trigger: 'blur' }],
  IsImportant: [{ required: true, message: '必填', trigger: 'blur' }]
  //Remark: [{ required: true, message: '必填', trigger: 'blur' }]
})

onMounted(() => {
  getList()
})

// 获取列表
const getList = () => {
  GetEvent({
    ReplayNo: props.rowData.ReplayNo,
    Milestone: state.Milestone
  }).then((res: any) => {
    if (res.code === 200) {
      state.tableList = res.Data.data
      state.tabsList = res.Data.searchdata
    }
  })
}

// 切换导航条
const handleClick = (tab: TabsPaneContext, event: Event) => {
  if (tab.props.name === '全部') {
    state.Milestone = ''
  } else {
    state.Milestone = tab.props.name as string
  }
  // 更新tableList
  getList()
}

// 新增问题
const handleAddQuestion = (row: any) => {
  emit('emtAddQuestion', row)
}

// 新增
const handleAdd = () => {
  state.dialogType = 'add'
  state.showDialog = true
}
// 编辑
const handleEdit = (row: any) => {
  state.dialogType = 'edit'
  state.showDialog = true
  // row数据赋值给formData
  state.formData = JSON.parse(JSON.stringify(row))
}
// 删除
const handleDel = (row: any) => {
  ElMessageBox.confirm('确定要删除此条问题吗？', '提示', {
    type: 'warning'
  })
    .then(() => {
      DeleteEvent(row).then((res: any) => {
        if (res.code === 200) {
          ElMessage({
            type: 'success',
            message: '删除成功'
          })
          getList()
        } else {
          ElMessage({
            type: 'error',
            message: '删除失败'
          })
        }
      })
    })
    .catch(() => {})
}
// 表单完成
const onConfirm = () => {
  console.log(ruleFormRef.value)
  if (!ruleFormRef.value) return
  ruleFormRef.value.validate((valid, fields) => {
    if (valid) {
      let params = Object.assign(state.formData, {
        ReplayNo: props.rowData.ReplayNo
      })
      AddEvents(params).then((res: any) => {
        if (res.code === 200) {
          ElMessage({
            type: 'success',
            message: '操作成功'
          })
          resetForm()
          getList()
        }
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}
// 重置表单
const resetForm = () => {
  state.showDialog = false
  state.formData = {}
  ruleFormRef.value.clearValidate()
}
const onCheck = () => {
  window.open(props.urlData.InventoryUrl)
}
// 监听表单
watch(
  () => state.showDialog,
  (val) => {
    if (!val) {
      resetForm()
    }
  }
)
</script>

<style lang="scss" scoped>
.check-box {
  width: 100%;
  height: 64px;
  border: 1px solid #dcdfe6;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
