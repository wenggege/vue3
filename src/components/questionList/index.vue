<template>
  <div class="table">
    <el-button
      v-if="inReport"
      type="primary"
      class="mb12 mt22"
      @click="handleAdd"
      >新建问题</el-button
    >
    <el-table :data="state.tableList" max-height="300px" style="width: 100%">
      <el-table-column prop="Id" label="序号" width="60" />
      <el-table-column prop="Description" label="问题描述" />
      <el-table-column prop="Type" label="问题分类" />
      <el-table-column prop="ActionItem" label="行动项" />
      <el-table-column prop="Responsible" label="责任人" />
      <el-table-column
        prop="ExpectedFinishingDate"
        label="预计完成日期"
        minWidth="160"
      >
        <template #default="scope">
          <span>{{
            scope.row.ExpectedFinishingDate
              ? moment(scope.row.ExpectedFinishingDate).format(
                  'YYYY-MM-DD HH:mm:ss'
                )
              : ''
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="ActualFinishingDate"
        label="实际完成日期"
        minWidth="160"
      >
        <template #default="scope">
          <span>{{
            scope.row.ActualFinishingDate
              ? moment(scope.row.ActualFinishingDate).format(
                  'YYYY-MM-DD HH:mm:ss'
                )
              : ''
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="Remark" label="备注" minWidth="160" />
      <el-table-column label="操作">
        <template #default="scope">
          <span
            v-if="!inReport && scope.row.FinishingStatus !== 1"
            class="link-address pr20"
            @click="handleDone(scope.row)"
            >完成</span
          >
          <span
            v-if="inReport"
            class="link-address pr20"
            @click="handleEdit(scope.row)"
            >编辑</span
          >
          <span
            v-if="inReport"
            class="link-address"
            @click="handleDel(scope.row)"
            >删除</span
          >
        </template>
      </el-table-column>
    </el-table>
    <div v-if="inReport">
      <el-pagination
        v-bind="state.innerPage"
        background
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
    <el-dialog
      v-model="state.showDialog"
      :close-on-click-modal="false"
      :title="state.dialogType === 'add' ? '新建问题' : '编辑问题'"
      width="500px"
    >
      <el-form
        ref="ruleFormRef"
        :model="state.formData"
        label-width="110px"
        :rules="rules"
      >
        <el-form-item label="问题描述" prop="Description">
          <el-input type="textarea" v-model="state.formData.Description" />
        </el-form-item>
        <el-form-item label="问题分类" prop="Type">
          <el-select
            v-model="state.formData.Type"
            placeholder="请选择"
            style="width: 100%"
          >
            <el-option
              v-for="item in TypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="行动项" prop="ActionItem">
          <el-input v-model="state.formData.ActionItem" />
        </el-form-item>
        <!-- Responsible -->
        <el-form-item label="责任人" prop="Responsible">
          <el-select
            v-model="state.formData.Responsible"
            placeholder="请选择"
            class="selects"
            value-key="EmpNo"
            @change="userBtn($event)"
            clearable
            filterable
            :filter-method="getAsslist"
            style="width: 100%"
          >
            <el-option
              v-for="item in state.Useroptions"
              :key="item['EmpNo']"
              :label="item['EmpName']"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="预计完成日期" prop="ExpectedFinishingDate">
          <el-date-picker
            v-model="state.formData.ExpectedFinishingDate"
            type="date"
            label="请选择日期"
            placeholder="请选择日期"
            value-format="YYYY-MM-DD"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="备注" prop="Remark">
          <el-input type="textarea" v-model="state.formData.Remark" />
        </el-form-item>
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
import { defineProps, ref, reactive, watch, onMounted } from 'vue'
import { arrayObjectDistinc } from '@/utils/tools'
import {
  AddProblem,
  GetProblemlist,
  DeleteProblem,
  Getuser
} from '@/api/projectAnalyse/index'
import moment from 'moment'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
interface personType {
  PMDomainId: string
  PMName: string
  PMEmail: string
}
const props = defineProps({
  tableList: {
    type: Array,
    default: () => {
      return []
    }
  },
  // 总结报告中，为true时有新增功能
  inReport: {
    type: Boolean,
    default: false
  },
  rowData: {
    type: Object,
    default: null
  }
})
// 问题分类
const TypeList = [
  {
    value: '成本',
    label: '成本'
  },
  {
    value: '时间',
    label: '时间'
  },
  {
    value: '质量',
    label: '质量'
  },
  {
    value: '其他',
    label: '其他'
  }
]
const state = reactive({
  formData: {
    Id: 0,
    Description: '',
    Type: '',
    ActionItem: '',
    Responsible: '',
    ExpectedFinishingDate: '',
    Remark: '',
    Person: [],
    PMDomainId: [] as string[],
    PMName: [] as string[],
    PMEmail: [] as string[]
  },
  showDialog: false,
  dialogType: 'add',
  tableList: [],
  Useroptions: [],
  query: '',
  DepUserName: '',
  innerPage: {
    pageSize: 10,
    currentPage: 1,
    total: 0,
    pageSizes: [10, 20, 50, 100, 200],
    layout: 'total, sizes, prev, pager, next'
  }
})
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  Description: [{ required: true, message: '必填', trigger: 'blur' }],
  Type: [{ required: true, message: '必填', trigger: 'blur' }],
  ActionItem: [{ required: true, message: '必填', trigger: 'blur' }],
  Responsible: [{ required: true, message: '必填', trigger: 'blur' }],
  ExpectedFinishingDate: [{ required: true, message: '必填', trigger: 'blur' }],
  Remark: [{ required: true, message: '必填', trigger: 'blur' }]
})
// 选择责任人信息
const personInfoList = ref<any>([])
const personVisable = ref(false)

onMounted(() => {
  if (props.inReport) getQuestionList()
})
const getQuestionList = () => {
  state.tableList = []
  let params = {
    //ReplayNo: 'XS2022092185020127',
    ReplayNo: props.rowData.ReplayNo,
    pageSize: state.innerPage.pageSize,
    pageIndex: state.innerPage.currentPage
  }
  GetProblemlist(params).then((res: any) => {
    if (res.code === 200) {
      state.tableList = res.Data
      state.innerPage.total = res.Count
    }
  })
}
const userBtn = (e: any) => {
  state.DepUserName = e.DomainID
  state.formData.Responsible = e.EmpName
}
const getPeople = () => {
  Getuser({ query: state.query }).then((res: any) => {
    state.Useroptions = res.Data
  })
}
const getAsslist = (e: any) => {
  state.query = e
  getPeople()
}
//切换每页条数
const handleSizeChange = (val: number) => {
  state.innerPage.pageSize = val
  state.innerPage.currentPage = 1
  getQuestionList()
}
//切换当前页
const handleCurrentChange = (val: number) => {
  state.innerPage.currentPage = val
  getQuestionList()
}

// 获取人员信息

// 完成
const handleDone = (row: any) => {
  ElMessageBox.prompt('备注：', '提示', {
    confirmButtonText: '完成',
    cancelButtonText: '取消'
  })
    .then(({ value }) => {
      let params = Object.assign(row, {
        Remark: value,
        FinishingStatus: 1
      })
      AddProblem(params).then((res: any) => {
        if (res.code === 200) {
          ElMessage({
            type: 'success',
            message: '操作成功'
          })
        }
      })
    })
    .catch(() => {})
}

// 新增
const handleAdd = (value: any) => {
  state.dialogType = 'add'
  state.showDialog = true
}
// 编辑
const handleEdit = (row: any) => {
  state.dialogType = 'edit'
  state.showDialog = true
  // row数据赋值给formData
  state.formData.Description = row.Description
  state.formData.Type = row.Type
  state.formData.ActionItem = row.ActionItem
  state.formData.ExpectedFinishingDate = row.ExpectedFinishingDate
  state.formData.Remark = row.Remark
  state.formData.Id = row.Id
  state.formData.Responsible = row.Responsible
}
// 删除
const handleDel = (row: any) => {
  ElMessageBox.confirm('确定要删除此条问题吗？', '提示', {
    type: 'warning'
  }).then(() => {
    let params = {
      Id: row.Id,
      ReplayNo: props.rowData.ReplayNo
    }
    DeleteProblem(params).then((res: any) => {
      if (res.code === 200) {
        ElMessage({
          type: 'success',
          message: '操作成功'
        })
        getQuestionList()
      }
    })
  })
}
// 表单完成
const onConfirm = () => {
  ruleFormRef.value.validate((valid, fields) => {
    if (valid) {
      let params = Object.assign(state.formData, {
        ReplayNo: props.rowData.ReplayNo
      })
      AddProblem(params).then((res: any) => {
        if (res.code === 200) {
          state.showDialog = false
          getQuestionList()
          ElMessage({
            type: 'success',
            message: '操作成功'
          })
        }
      })
    }
  })
}
watch(
  () => state.showDialog,
  (val: boolean) => {
    if (!val) {
      personVisable.value = false
      personInfoList.value = []
      // 清空表单
      state.formData.PMDomainId = []
      state.formData.PMName = []
      state.formData.PMEmail = []
      state.formData.Person = []
      state.formData.Description = ''
      state.formData.Type = ''
      state.formData.ActionItem = ''
      state.formData.ExpectedFinishingDate = ''
      state.formData.Remark = ''
      state.formData.Responsible = ''
      state.formData.Id = 0
      ruleFormRef.value.clearValidate()
      ruleFormRef.value.resetFields()
    } else {
      getPeople()
    }
  },
  {
    deep: true
  }
)
watch(
  () => props.tableList,
  (val) => {
    state.tableList = JSON.parse(JSON.stringify(val))
  }
)
defineExpose({
  handleAdd
})
</script>

<style lang="scss" scoped></style>
