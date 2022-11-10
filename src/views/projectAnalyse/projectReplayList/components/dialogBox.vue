<template>
  <el-dialog
    v-model="show"
    title="任务"
    width="1000px"
    :before-close="handleClose"
  >
    <QuestionList :tableList="state.tableList"/>
    <el-pagination 
        v-bind="state.innerPage" 
        background 
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">关闭</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, defineExpose,  defineProps, watch, reactive, defineEmits, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import QuestionList from '@/components/questionList/index.vue'
import { GetProblemlist } from '@/api/projectAnalyse/index'
// 设置显示主体弹窗
const show = ref<boolean>()

const state:any = reactive({
  tableList: [],
  ReplayNo: '',
  innerPage: {
    pageSize: 10,
    currentPage: 1,
    total: 0,
    pageSizes: [10, 20, 50, 100, 200],
    layout: 'total, sizes, prev, pager, next'
  },
})
// 打开弹窗
const openDialog = (ReplayNo : string | number) => {
  state.ReplayNo = ReplayNo
  getQuestionList()
  show.value = true
}
// 弹窗关闭
const handleClose = () => {
  show.value = false
  // 清空数据
  state.tableList = []
}
const getQuestionList = () => {
  state.tableList = []
  let params = {
    //ReplayNo: state.ReplayNo,
    ReplayNo: 'XS2022092185020127',
    pageSize: state.innerPage.pageSize,
    pageIndex: state.innerPage.currentPage
  }
  GetProblemlist(params).then((res:any) => {
    if (res.code === 200) {
      state.tableList = res.Data
      state.innerPage.total = res.Count
    }
  }) 
}
//切换每页条数
const handleSizeChange =(val: number) => {
  state.innerPage.pageSize = val
  state.innerPage.currentPage = 1;
  getQuestionList()
}
//切换当前页
const handleCurrentChange = (val: number) => {
  state.innerPage.currentPage = val
  getQuestionList()
}
// 取消
defineExpose({
  openDialog
})
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__body {
  padding-bottom: 0px;
}
.el-pagination{
  margin: 16px 0 0 0;
}
</style>
