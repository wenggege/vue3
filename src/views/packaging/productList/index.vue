<template>
  <TablePage>
    <template #header>
      <el-form
        :inline="true"
        ref="formEl"
        :model="searchData"
        class="demo-form-inline"
      >
        <el-form-item label="产品代码">
          <el-input v-model="searchData.Product" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="产品类别">
          <el-select v-model="searchData.ProductType" placeholder="请选择">
            <el-option label="全部" :value="0"></el-option>
            <el-option label="普货" :value="1"></el-option>
            <el-option label="危险品" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商业化产品">
          <el-select v-model="searchData.ProjectPhase" placeholder="请选择">
            <el-option label="全部" :value="0"></el-option>
            <el-option label="小试" :value="1"></el-option>
            <el-option label="中试" :value="2"></el-option>
            <el-option label="商业化" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button class="reset" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </template>
    <!-- <el-table :data="state.tableList" height="100%">
      <el-table-column label="产品代码" prop="Product" />
      <el-table-column label="产品类别" prop="ProductTypeText" />
      <el-table-column label="商业化产品" prop="ProjectPhaseText" />
      <el-table-column label="操作" prop="task">
        <template #default="scope">
          <p class="link-address" @click="goDetail(scope.row)">包装计划详情</p>
        </template>
      </el-table-column>
    </el-table> -->
    <Table
      v-if="headerInfo.Columns && headerInfo.Columns.length"
      :headerInfo="headerInfo"
      :tableData="state.tableList"
    >
      <template v-slot="{ data, scope }">
        <template v-if="data.Prop == 'Operater'">
          <p class="link-address" @click="goDetail(scope.row)">包装计划详情</p>
        </template>
      </template>
    </Table>
    <template #pagination>
      <el-pagination
        :currentPage="searchData.Page"
        :page-size="searchData.Limit"
        :background="true"
        :total="state.count"
        layout="total, prev, pager, next"
        @current-change="handleCurrentChange"
      />
    </template>
  </TablePage>
</template>

<script lang="ts" setup>
import TablePage from '@/components/tablePage/index.vue'
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { GetPackPlanProductList } from '@/api/packaging/index'
const router = useRouter()
interface searchType {
  Product: string,
  ProductType: number,
  ProjectPhase: number,
  Page: number,
  Limit: number
}
const state = reactive({
  tableList: [],
  count: 0
})
const searchData = reactive<searchType>({
  Product: '',
  ProductType: 0,
  ProjectPhase: 0,
  Page: 1,
  Limit: 15
})
onMounted(() => {
  getProductList()
})
// 模拟表头数据
const headerInfo = ref({
  Selection: false,
  Columns: [
    {
      Label: '产品代码',
      Prop: 'Product',
      IsShow: true,
      Type: '',
      Link: '',
      IsFixed: false,
      NeedDeal: false,
      Width: 300
    },
    {
      Label: '产品类别',
      Prop: 'ProductTypeText',
      IsShow: true,
      Type: '',
      Link: '',
      IsFixed: false,
      NeedDeal: false
    },
    {
      Label: '商业化产品',
      Prop: 'ProjectPhaseText',
      IsShow: true,
      Type: '',
      Link: '',
      IsFixed: false,
      NeedDeal: false
    },
    {
      Label: '操作',
      Prop: 'Operater',
      IsShow: true,
      Type: '',
      Link: '',
      IsFixed: false,
      NeedDeal: true
    }
  ]
})
const getProductList = () => {
  GetPackPlanProductList(searchData).then((res) => {
    console.log('产品列表===》', res)
    if (res.Code === 1000) {
      state.tableList = res.Data
      state.count = res.Count as number
    }
  })
}

// 查询
const handleSearch = () => {
  console.log('searchData----', searchData)
  getProductList()
}
// 分页
const handleCurrentChange = (val: number) => {
  console.log(val)
  searchData.Page = val
  getProductList()
}
// 重置
const handleReset = () => {
  searchData.Product = ''
  searchData.ProductType = 0
  searchData.ProjectPhase = 0
  getProductList()
}
const goDetail = (row: {Product:string, PackProductGUID:string}) => {
  // ElMessage({
  //   type: 'info',
  //   message: `跳转详情---${row.Product}`
  // })
  router.push({
    name: 'packingPlanDetail',
    query: {
      Product: row.Product,
      PackProductGUID: row.PackProductGUID
    }
  })
}
</script>

<style lang="scss" scoped>
.head-info {
  display: flex;
  span {
    margin-right: 30px;
    color: #000;
    font-size: 14px;
  }
}
</style>
