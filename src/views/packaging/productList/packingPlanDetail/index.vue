<template>
  <div class="container-page">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="firstLabel" name="one">
        <Details :detailData="state.detailData" />
      </el-tab-pane>
      <el-tab-pane label="历史版本" name="two" lazy>
        <div>
          <PackPlanTable
            :tableList="state.tableData"
            @emtPackPlan="emtPackPlan"
          />
          <el-pagination
            :currentPage="searchData.Page"
            :page-size="searchData.Limit"
            :background="true"
            :total="state.count"
            layout="total, prev, pager, next"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Details from './details/details.vue'
import { GetPackPlanDetail, GetPackPlanList } from '@/api/packaging/index'
import { optionsStore } from '@/store'
const useOptions = optionsStore()
const route = useRoute()
const router = useRouter()
interface detailDataType {
  PackPlanNodeGUID: string
  NodeNo: number
  NodeName: string
  NodeContent: any
}
interface searchDataType {
  Product: string
  ProjectNo: string
  ProductType: number
  Status: number
  Page: number
  Limit: number
}
const activeName = ref('one')
const firstLabel = ref<string>('任务详情（最新）')
const state = reactive<any>({
  tableData: [],
  detailData: [] as detailDataType[],
  count: 0
})
const searchData = reactive<searchDataType>({
  Product: '',
  ProjectNo: '',
  ProductType: 0,
  Status: 0,
  Page: 1,
  Limit: 15
})
const handleClick = (tab: any, event: Event) => {
  console.log(tab, event)
}
onMounted(() => {
  getAllOptions()
  getDetails()
  getRevisions()
})
// 获取所有选项列表
const getAllOptions = () => {
  let codes =
    'WrapperType,WrapperInName,WrapperOutName,WrapperTier,SealType,PlacementLocation,' +
    'InPackWay,InSealWay,StorageRequirements,DesiccantType,DeoxidantType,TruCoolWrapperType,' +
    'PacketWay,PhotoWay'
  useOptions.getOptions(codes)
}
// 获取包装计划详情
const getDetails = () => {
  let data = {
    PackProductGUID: route.query.PackProductGUID
  }
  GetPackPlanDetail(data).then((res) => {
    console.log('包装计划详情===》', res)
    if (res.Code === 1000) {
      state.detailData = res.Data
    }
  })
}
const getRevisions = () => {
  searchData.Product = route.query.Product as string
  GetPackPlanList(searchData).then((res) => {
    if (res.Code === 1000) {
      console.log('历史版本====>', res)
      state.tableData = res.Data
      state.count = res.Count
    }
  })
}
// 分页
const handleCurrentChange = (val: number) => {
  searchData.Page = val
  getRevisions()
}
// 跳转
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
.container-page {
  .el-tabs {
    display: flex;
    flex-direction: column;
    height: 100%;
    .el-tabs__header {
      flex-shrink: 0;
    }
    ::v-deep(.el-tabs__content) {
      flex-grow: 1 !important;
      // overflow: auto !important;
    }
    ::v-deep(.el-tab-pane) {
      height: 100% !important;
    }
  }
}
</style>
