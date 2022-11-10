<template>
  <TablePage>
    <template #header>
      <!-- 配置表单 -->
      <!-- <SearchForm
        :searchParam="state.searchParam"
        @handleQuery="handleQuery"
        @handleReset="handleReset"
      /> -->
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
        <el-form-item label="项目号">
          <el-input v-model="searchData.ProjectNo" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchData.Status" placeholder="请选择">
            <el-option label="全部" :value="0"></el-option>
            <el-option label="未开始" :value="1"></el-option>
            <el-option label="进行中" :value="2"></el-option>
            <el-option label="已完成" :value="3"></el-option>
            <el-option label="异常" :value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getPackPlanList">查询</el-button>
          <el-button class="reset" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </template>
    <!-- 配置表格 -->
    <!-- <CommonTable
      :tableData="state.tableList"
      :tableConfig="state.tableConfig"
      @emtRowClick="handleRowClick"
    /> -->
    <PackPlanTable :tableList="state.tableList" @emtPackPlan="emtPackPlan" />
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
import { reactive, onMounted } from 'vue'
import { GetPackPlanList } from '@/api/packaging/index'
// import { GetTableConfig } from '@/api/packaging/common'
import { useRouter } from 'vue-router'
const router = useRouter()
interface searchType {
  Product: string,
  ProjectNo: string,
  ProductType: number,
  Status: number,
  Page: number,
  Limit: number
}
const state: any = reactive({
  tableList: [],
  count: 0,
  tableConfig: {},
  searchParam: {}
})
let searchData = reactive<searchType>({
  Product: '',
  ProjectNo: '',
  ProductType: 0,
  Status: 0,
  Page: 1,
  Limit: 15
})
onMounted(() => {
  // 先不用配置表格
  // getTableConfig()
  getPackPlanList()
})
// const getTableConfig = () => {
//   // 获取表格配置
//   let params = {
//     code: 'packing_plan_list'
//   }
//   GetTableConfig(params).then((res) => {
//     console.log('表格配置', res)
//     if (res.Code === 200) {
//       state.tableConfig = res.Data
//       state.searchParam = JSON.parse(res.Data.SearchLayout)
//     }
//   })
// }
const getPackPlanList = () => {
  let apiParams = {}
  for (let key in searchData) {
    if (searchData[key] !== '') {
      apiParams[key] = searchData[key]
    }
  }
  GetPackPlanList(apiParams).then((res) => {
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
  getPackPlanList()
}
// 重置
const handleReset = () => {
  searchData.Product = ''
  searchData.ProjectNo = ''
  searchData.ProductType = 0
  searchData.Status = 0
  getPackPlanList()
}
const emtPackPlan = (PackPlanNo: string) => {
  // 跳转包装计划页
  router.push({
    name: 'packingPlan',
    query: {
      PackPlanNo
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
