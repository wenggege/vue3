<template>
  <!-- 通用表格配置页面 -->
  <TablePage>
    <template #header>
      <!-- 配置表单 -->
      <SearchForm
        :searchParam="state.searchParam"
        @handleQuery="handleQuery"
        @handleReset="handleReset"
      />
    </template>
    <!-- 配置表格 -->
    <CommonTable
      :tableData="state.tableList"
      :tableConfig="state.tableConfig"
      @emtRowClick="handleRowClick"
    />
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
import { ref, reactive, onMounted, watch } from 'vue'
import { GetPackPlanList, GetPackPlanProductList } from '@/api/packaging/index'
import { GetTableConfig } from '@/api/packaging/common'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const state: any = reactive({
  tableList: [],
  count: 0,
  tableConfig: {},
  searchParam: {}
})
let searchData = reactive<any>({
  Page: 1,
  Limit: 15
})
const code = ref('')
const apiList = {
  packing_plan_list: GetPackPlanList,
  packing_plan_product_list: GetPackPlanProductList
}
onMounted(() => {
  initData()
})
const initData = () => {
  // 获取query中的code
  code.value = route.meta.code as string
  getTableConfig()
  // 根据code请求表格数据
  getTableList()
}
const getTableConfig = () => {
  // 获取表格配置
  let params = {
    code: code.value
  }
  GetTableConfig(params).then((res) => {
    console.log('表格配置', res)
    if (res.Code === 200) {
      state.tableConfig = res.Data
      state.searchParam = JSON.parse(res.Data.SearchLayout)
    }
  })
}
const getTableList = () => {
  let apiParams = {}
  for (let key in searchData) {
    if (searchData[key] !== '') {
      apiParams[key] = searchData[key]
    }
  }
  apiList[code.value](apiParams).then((res) => {
    console.log('包装计划列表==>', res)
    if (res.Code === 1000) {
      state.tableList = res.Data
      state.count = res.Count
    }
  })
}

// 分页
const handleCurrentChange = (val: number) => {
  console.log(val)
  searchData.Page = val
  getTableList()
}
// 重置
const handleReset = () => {
  searchData.Product = ''
  searchData.ProjectNo = ''
  searchData.ProductType = 0
  searchData.Status = 0
  getTableList()
}
// 查询
const handleQuery = (searchValue) => {
  console.log('searchValue-----', searchValue)
  Object.assign(searchData, searchValue)
  getTableList()
}
// 表格点击
const handleRowClick = (item: any, row: { PackPlanNo: string }) => {
  // 跳转包装计划页
  router.push({
    name: 'packingPlan',
    query: {
      PackPlanNo: row.PackPlanNo
    }
  })
}
watch(
  () => route,
  (routerObj) => {
    console.log('routerObj', routerObj)
    if (routerObj.meta.code) {
      initData()
    }
  },
  { deep: true }
)
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
