<template>
  <TablePage>
    <template #header>
      <el-form :inline="true" ref="formEl" :model="state" class="demo-form-inline">
        <el-form-item label="项目号">
          <el-input v-model="state.ProjectNo" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="问题清单状态">
          <el-select v-model="state.ProblemListStatus" placeholder="请选择">
            <el-option label="已完成" :value="1"></el-option>
            <el-option label="未完成" :value="0"></el-option>
            <el-option label="全部" :value="-1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button class="reset" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </template>
    <el-table :data="state.tableList" height="100%">
      <el-table-column label="ID" prop="Id" />
      <el-table-column label="项目" prop="ProjectNo"> 
        <template #default="scope">
          <span class="link-address">{{scope.row.ProjectNo}}</span>
        </template>
      </el-table-column>
      <el-table-column label="复盘状态" prop="ReplayStatus" > 
        <template #default="scope">
           <div class="status-text f-c">
            <i :class="scope.row.ReplayStatus === 1 ? 'incomplete' : ''"></i>
            <span class="ml10">{{scope.row.ReplayStatus === 1 ? '复盘' : '未复盘'}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="问题完成状态" prop="ProblemListStatus" > 
        <template #default="scope">
          <div class="status-text f-c">
            <i :class="scope.row.ProblemListStatus === 1 ? 'incomplete' : ''"></i>
            <span class="ml10">{{scope.row.ProblemListStatus === 1 ? '完成' : '未完成'}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" prop="task"> 
        <template #default="scope">
          <span class="link-address pr20" @click="showQuestionList(scope.row.ReplayNo)">问题清单</span>
          <span class="link-address" @click="goDetail(scope.row)">总结报告</span>
        </template>
      </el-table-column>
    </el-table>
    <template #pagination>
      <el-pagination 
        v-bind="state.innerPage" 
        background 
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange" />
    </template>
    <DialogBox ref="questionListRef" />
  </TablePage>
</template>

<script lang="ts" setup>
import { reactive, onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import DialogBox from './components/dialogBox.vue'
import { GetReplayList } from '@/api/projectAnalyse/index'
const router = useRouter();
const questionListRef = ref()

const state:any = reactive({
  tableList: [],
  ProjectNo: '',
  ProblemListStatus: -1,
  innerPage: {
    pageSize: 10,
    currentPage: 1,
    total: 0,
    pageSizes: [10, 20, 50, 100, 200],
    layout: 'total, sizes, prev, pager, next'
  },
})
onMounted(() => {
  initData()
})
const initData = () => {
  state.tableList = []
  let params = {
    ProjectNo: state.ProjectNo,
    ProblemListStatus: state.ProblemListStatus,
    pageSize: state.innerPage.pageSize,
    pageIndex: state.innerPage.currentPage
  }
  GetReplayList(params).then((res:any) => {
    if (res.Code === 200) {
      state.tableList = res.Data
      state.innerPage.total = res.Count
    }
  }) 
}
// 查询
const handleSearch = () => { 
  initData()
}
//切换每页条数
const handleSizeChange =(val: number) => {
  state.innerPage.pageSize = val
  state.innerPage.currentPage = 1;
  initData()
}
//切换当前页
const handleCurrentChange = (val: number) => {
  state.innerPage.currentPage = val
  initData()
}
// 重置
const handleReset = () => {
  state.ProjectNo = ''
  state.ProblemListStatus = -1
  initData()
}
const showQuestionList = (ReplayNo: number | string) => {
  questionListRef.value.openDialog(ReplayNo)
}
const goDetail = (row: any) => {
  router.push({
    name: 'projectReport',
    query: {
      rowData: JSON.stringify(row)
    }
  })
}
</script>

<style lang="scss" scoped>
.head-info{
  display: flex;
  span {
    margin-right: 30px;
    color: #000;
    font-size: 14px;
  }
}
.status-text {
  i {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #1765EC;
  }
  .incomplete {
    background-color: #FA8817;
  }
}
</style>