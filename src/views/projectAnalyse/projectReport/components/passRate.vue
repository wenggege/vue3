<template>
  <div>
    <p class="section-title">
      <img class="title-icon" src="@/assets/images/title_icon.png" alt="" />
      <span>按时交付率</span>
    </p>
    <div class="section-content">
      <div class="check-box">
        <el-button type="primary" plain @click="onCheck">点击查看</el-button>
      </div>
    </div>
    <p class="section-title">
      <img class="title-icon" src="@/assets/images/title_icon.png" alt="" />
      <span>成本达标率</span>
    </p>
    <div class="section-content">
      <el-table
        :data="state.tableData"
        style="width: 100%; margin-top: 20px"
        :span-method="spanMethod"
        :row-style="rowState"
      >
        <el-table-column prop="ZCBFL" label="模块" width="180" />
        <el-table-column show-overflow-tooltip prop="ZCBMX" label="成本类型" />
        <el-table-column prop="ZMBCB_XS" label="目标成本" />
        <el-table-column prop="ZGLCB" label="管理成本" />
        <el-table-column prop="Result" label="对标结果（X%）">
          <template #default="scope"
            ><p
              :style="{ color: scope.row.Result > 0 ? '#F52929' : '#15B84D' }"
            >
              {{ scope.row.Result + '%' }}
            </p></template
          >
        </el-table-column>
        <el-table-column prop="Dec" label="超标原因分析" />
        <el-table-column label="操作" align="right">
          <template #default="scope">
            <p
              class="link-address"
              @click="onEdit(scope.row)"
              v-if="!scope.row.hasOwnProperty('haveTotal')"
            >
              编辑
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      v-model="dialogFormVisible"
      title="成本达标率编辑"
      :close-on-click-modal="false"
    >
      <el-form :model="form">
        <el-form-item label="成本类型" :label-width="formLabelWidth">
          <el-select v-model="form.ZCBMX" placeholder="" :disabled="true">
          </el-select>
        </el-form-item>
        <el-form-item label="目标成本" :label-width="formLabelWidth">
          <el-input v-model="form.ZMBCB_XS" :disabled="true" />
        </el-form-item>
        <el-form-item label="管理成本" :label-width="formLabelWidth">
          <el-input v-model="form.ZGLCB" :disabled="true" />
        </el-form-item>
        <el-form-item label="对标结果" :label-width="formLabelWidth">
          <el-input v-model="form.Result" :disabled="true" />
        </el-form-item>
        <el-form-item label="超标原因分析" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.Dec" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" v-debounce="onConfirm">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { GetProjectCost, AddEvent } from '@/api/projectAnalyse/index'
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'

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
interface User {
  ZCBFL: string
  ZCBMX: string
  ZMBCB_XS: string
  ZGLCB: string
  Result: string
  Dec: string
  haveTotal: string
}

interface SpanMethodProps {
  row: User
  column: TableColumnCtx<User>
  rowIndex: number
  columnIndex: number
}

const state = reactive<any>({
  tableData: [],
  spanArr: [], // 生成一个与行数相同的数组记录每一行设置的合并数,
  editRow: {}
})
const dialogFormVisible = ref(false)

const spanMethod = ({
  row,
  column,
  rowIndex,
  columnIndex
}: SpanMethodProps) => {
  if (columnIndex === 0) {
    if (state.spanArr[rowIndex]) {
      return {
        rowspan: state.spanArr[rowIndex],
        colspan: 1
      }
    } else {
      return {
        rowspan: 0,
        colspan: 0
      }
    }
  } else {
    return {
      rowspan: 1,
      colspan: 1
    }
  }
}
const insertData = (data: any) => {
  let productObj: User = {
    ZCBFL: '小结',
    ZCBMX: '-',
    ZMBCB_XS: '0',
    ZGLCB: '0',
    Result: '0',
    Dec: '-',
    haveTotal: 'product'
  }
  let developmentObj: User = {
    ZCBFL: '小结',
    ZCBMX: '-',
    ZMBCB_XS: '0',
    ZGLCB: '0',
    Result: '0',
    Dec: '-',
    haveTotal: 'development'
  }
  let totalObj: User = {
    ZCBFL: '合计',
    ZCBMX: '-',
    ZMBCB_XS: '0',
    ZGLCB: '0',
    Result: '0',
    Dec: '-',
    haveTotal: 'total'
  }
  data.forEach((item: User, index: number) => {
    if (index > 0) {
      if (item['ZCBFL'] !== data[index - 1]['ZCBFL']) {
        data.splice(index - 1, 1, productObj)
      }
    }
    if (index === data.length - 1) {
      data.splice(index + 1, 1, developmentObj)
      data.splice(index + 2, 1, totalObj)
    }
  })
  insertDataRes(data)
}

// 计算项目小结
const insertDataRes = (data: any) => {
  let product = data.find((item: User) => item.haveTotal === 'product')
  let development = data.find((item: User) => item.haveTotal === 'development')
  let total = data.find((item: User) => item.haveTotal === 'total')
  let productList = data.filter((item: any) => item.ZCBFL === '生产成本')
  let developmenttList = data.filter((item: any) => item.ZCBFL === '研发成本')
  // 生产成本-》目标成本小结
  product.ZMBCB_XS = productList.reduce((prev: number, curr: any) => {
    return prev + curr.ZMBCB_XS
  }, 0)
  // 生产成本-》管理成本小结
  product.ZGLCB = productList.reduce((prev: number, curr: any) => {
    return prev + curr.ZGLCB
  }, 0)
  // 生产成本-》对标结果小结
  product.Result = productList.reduce((prev: number, curr: any) => {
    return prev + parseFloat(curr.Result)
  }, 0)
  // 研发成本-》目标成本小结
  development.ZMBCB_XS = developmenttList.reduce((prev: number, curr: any) => {
    return prev + curr.ZMBCB_XS
  }, 0)
  // 研发成本-》管理成本小结
  development.ZGLCB = developmenttList.reduce((prev: number, curr: any) => {
    return prev + curr.ZGLCB
  }, 0)
  // 研发成本-》对标结果小结
  development.Result = developmenttList.reduce((prev: number, curr: any) => {
    return prev + parseFloat(curr.Result)
  }, 0)
  // 合计-》目标成本合计
  total.ZMBCB_XS = product.ZMBCB_XS + development.ZMBCB_XS
  // 合计-》管理成本合计
  total.ZGLCB = product.ZGLCB + development.ZGLCB
  // 合计-》对标结果合计
  total.Result = product.Result + development.Result
}
const filterData = (data: any) => {
  // 合并内容相同的单元格
  let contactDot = 0
  let spanArr = [] as any
  data.forEach((item: User, index: number) => {
    if (index === 0) {
      spanArr.push(1)
    } else {
      //注释：name  是对应体系,data 对应table绑定的数据源
      if (item['ZCBFL'] === data[index - 1]['ZCBFL']) {
        spanArr[contactDot] += 1
        spanArr.push(0)
      } else {
        contactDot = index
        spanArr.push(1)
      }
    }
  })
  state.spanArr = spanArr
}

onMounted(() => {
  getProjectCostList()
})

const getProjectCostList = () => {
  GetProjectCost({
    ReplayNo: props.rowData.ReplayNo,
    orderNo: props.rowData.OrderNo,
    project: props.rowData.DisplayRDProjectNo,
    orderID: props.rowData.OrderID
  }).then((res: any) => {
    if (res.Code === 200) {
      state.tableData = res.Data
      insertData(state.tableData)
      filterData(state.tableData)
    }
  })
}

const rowState = ({ row }) => {
  let style = {}
  switch (row.ZCBFL) {
    case '小结':
      style = {
        backgroundColor: '#ECF5FF'
      }
      break
    case '合计':
      style = {
        backgroundColor: '#FEE7D1'
      }
      break
  }
  return style
}

const formLabelWidth = '140px'
let form = reactive({
  ZCBMX: '',
  ZMBCB_XS: '',
  ZGLCB: '',
  Result: '',
  Dec: ''
})
const onCheck = () => {
  window.open(props.urlData.DeliveryUrl)
}
const onEdit = (row: any) => {
  dialogFormVisible.value = true
  state.editRow = row
  form.ZCBMX = row.ZCBMX
  form.ZMBCB_XS = row.ZMBCB_XS
  form.ZGLCB = row.ZGLCB
  form.Result = row.Result
  form.Dec = row.Dec
}
const onConfirm = () => {
  let params = {
    Id: 0,
    RowNo: state.editRow.Id,
    CostType: form.ZCBMX,
    TargetCost: form.ZMBCB_XS + '',
    ManageCost: form.ZGLCB + '',
    ReplayNo: props.rowData.ReplayNo,
    StandardResult: form.Result,
    Dec: form.Dec
  }
  AddEvent(params).then((res: any) => {
    if (res.code === 200) {
      dialogFormVisible.value = false
      getProjectCostList()
    }
  })
}
</script>

<style lang="scss" scoped>
.el-input {
  width: 210px;
}

::v-deep(.el-table__header .el-table__cell) {
  background-color: #f5f7fa;
}
::v-deep(.el-table__footer .el-table__cell) {
  background-color: #fee7d1;
}
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
