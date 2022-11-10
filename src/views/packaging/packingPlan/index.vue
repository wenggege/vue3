<template>
  <div>
    <TablePage>
      <template #header>
        <el-descriptions :column="6">
          <el-descriptions-item label="项目号：">{{
            packagingInfo.ProjectNo
          }}</el-descriptions-item>
          <el-descriptions-item label="销售订单号：">{{
            packagingInfo.OrderNo
          }}</el-descriptions-item>
          <el-descriptions-item label="交付项：">{{
            packagingInfo.ItemNumber
          }}</el-descriptions-item>
          <el-descriptions-item label="产品代码：">{{
            packagingInfo.Product
          }}</el-descriptions-item>
          <el-descriptions-item label="产品类别：">{{
            packagingInfo.ProductTypeText
          }}</el-descriptions-item>
          <el-descriptions-item label="商业化产品：">{{
            packagingInfo.ProjectPhaseText
          }}</el-descriptions-item>
        </el-descriptions>
      </template>
      <Table
        v-if="headerInfo.Columns && headerInfo.Columns.length"
        :headerInfo="headerInfo"
        :tableData="nodeList"
      >
        <template v-slot="{ data, scope }">
          <el-link
            type="primary"
            @click="goNodeEdit(scope.row)"
            v-if="data.Prop == 'NodeName'"
            >{{ scope.row.NodeName }}</el-link
          >

          <el-link
            type="primary"
            v-if="data.Prop == 'PrefixNodesName'"
            @click="goPreNodeEdit(scope.row)"
            >{{ scope.row.PrefixNodesName }}</el-link
          >

          <template v-if="data.Prop == 'PMContent'">
            <div v-if="scope.row.PMContent">
              <el-tag
                v-for="it in scope.row.PMContent"
                :key="it.DomainId"
                type="info"
                round
                effect="plain"
                class="ml-2 mb5"
                >{{ it.Name }}</el-tag
              >
            </div>
            <div v-else>{{ scope.row.PMRole }}</div>
          </template>
          <template v-if="data.Prop == 'Operater'">
            <el-button
              v-if="scope.row.IsFinish === 1"
              plain
              size="small"
              type="primary"
              @click="completePackPlanNode(scope.row.PackPlanNodeGUID)"
              >完成任务
            </el-button>
            <el-button
              v-if="scope.row.IsRestart === 1"
              plain
              size="small"
              type="primary"
              @click="restartPackPlanNode(scope.row.PackPlanNodeGUID)"
              >重启任务</el-button
            >
            <el-button
              v-if="scope.row.IsPush === 1"
              plain
              size="small"
              type="primary"
              @click="pushCommand(scope.row.PackPlanNodeGUID)"
              >推送包装指令</el-button
            >
          </template>
        </template>
      </Table>
    </TablePage>
    <!-- 完成任务，重启任务二次弹窗 -->
    <FormDIalogRemarkTime
      ref="FormDialogRef"
      @emtConfirm="handleDialogConfirm"
    />
     <!-- 推送指令弹窗 -->
    <FormDIalogCommand
      ref="FormDialogCommandRef"
      @emtConfirm="handleCommandConfirm"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { IpackagingInfo } from './interface'
import { ElMessageBox } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import { debounce } from '@/utils/tools'
import { headerInfo } from './mock'
import {
  GetPackPlanInfo,
  GetPackPlanNodeList,
  CompletePackPlanNode,
  RestartPackPlanNode,
  PushPackPlan
} from '@/api/packaging'
const router = useRouter()
const route = useRoute()
console.log(route.query)
const FormDialogCommandRef = ref()
const FormDialogRef = ref()
const packagingInfo = ref<IpackagingInfo>({})
// const headerInfo = ref<any>({})
const nodeList = ref([])
const activeGuid = ref('')
const PackPlanNo = ref('')
console.log('FormDialogRef.value', FormDialogRef)

onMounted(() => {
  if (route.query.PackPlanNo) {
    PackPlanNo.value = route.query.PackPlanNo as string
    localStorage.setItem('PackPlanNo', PackPlanNo.value)
  } else {
    // 如果没有query ,就从缓存获取
    if (localStorage.getItem('PackPlanNo')) {
      PackPlanNo.value = localStorage.getItem('PackPlanNo') as string
    } else {
      // todo: 没有包装计划id,临时赋值
      PackPlanNo.value = 'JH202209001'
      // 考虑跳转执行列表页，通知用户从包装计划id跳转进入
      // router.push({
      //   name: 'reportForms'
      // })
    }
  }
  if (PackPlanNo.value) {
    getPackagingDetail()
    getNodeList()
  }
})
const getPackagingDetail = () => {
  let data = {
    PackPlanNo: PackPlanNo.value
  }
  GetPackPlanInfo(data).then((res) => {
    console.log(res)
    packagingInfo.value = res.Data
  })
}

// 获取包装计划节点列表
const getNodeList = () => {
  let data = {
    PackPlanNo: PackPlanNo.value
  }
  GetPackPlanNodeList(data).then((res) => {
    if (res.Data.length > 0) {
      res.Data.forEach((item: any) => {
        if (item.PMContent) {
          item.PMContent = JSON.parse(item.PMContent)
        }
      })
      nodeList.value = res.Data
    }
  })
}

const goNodeEdit = (row: { PackPlanNodeGUID: string, NodeNo: string | number}) => {
  router.push({
    name: 'packingNodeEdit',
    query: {
      PackPlanNodeGUID: row.PackPlanNodeGUID,
      NodeNo: row.NodeNo
    }
  })
}
// 跳转前置节点编辑
const goPreNodeEdit = (row: { PrefixNodes: string, PrefixNodesNo: string | number}) => {
  router.push({
    name: 'packingNodeEdit',
    query: {
      PackPlanNodeGUID: row.PrefixNodes,
      NodeNo: row.PrefixNodesNo
    }
  })
}

// 完成任务弹窗
const completePackPlanNode = debounce((PackPlanNodeGUID: string) => {
  activeGuid.value = PackPlanNodeGUID
  FormDialogRef.value.showDialog('complete')
})
// 推送包装指令
const pushCommand = debounce((PackPlanNodeGUID: string) => {
  console.log(PackPlanNodeGUID)
  FormDialogCommandRef.value.showDialog()
})
const handleCommandConfirm = (emtObj: any) => {
  //  指令确认
  console.log('指令参数', emtObj)
  // 然后推送指令接口
  let postData = new FormData()
  // todo: 组装指令参数
  PushPackPlan(postData).then((res) => {
    console.log(res)
    // todo: 推送成功处理
  })
}
// 弹窗确认
const handleDialogConfirm = (emtObj: any) => {
  let postData = new FormData()
  postData.append('PackPlanNodeGUID', activeGuid.value)
  postData.append('ActualFinishDate', emtObj.Time)
  postData.append('Remark', emtObj.Remark)
  CompletePackPlanNode(postData).then((res) => {
    console.log(res)
    if (res?.Code == 1000) {
      getNodeList()
    }
  })
}
const restartPackPlanNode = debounce((PackPlanNodeGUID: any) => {
  ElMessageBox.confirm('确认要重启任务吗？', '提示', {
    type: 'warning'
  })
    .then(() => {
      let postData = new FormData()
      postData.append('PackPlanNodeGUID', PackPlanNodeGUID)
      RestartPackPlanNode(postData).then((res) => {
        console.log(res)
        if (res?.Code == 1000) {
          getNodeList()
        }
      })
    })
    .catch(() => {
      console.log('cancel')
    })
})
</script>

<style lang="scss" scoped>
:deep(.el-descriptions__body) {
  background: $bgcolor;
}
:deep(.el-descriptions__body
    .el-descriptions__table:not(.is-bordered)
    .el-descriptions__cell) {
  padding-bottom: 0;
}
:deep(.el-descriptions__label:not(.is-bordered-label)) {
  margin-right: 0;
}
.ml-2 {
  margin-right: 10px;
}
.dialog-box {
  padding: 0 60px 0 30px;
  box-sizing: border-box;
}
</style>
