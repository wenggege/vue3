<template>
  <Table :headerInfo="headerInfo" :tableData="tableList">
    <template v-slot="{ data, scope }">
      <el-link
        type="primary"
        @click="goNodeEdit(scope.row)"
        v-if="data.Prop == 'NodeName'"
        >{{ scope.row.NodeName }}</el-link
      >
      <template v-if="data.Prop == 'PMContent'">
        <div v-if="scope.row.PMContent">
          <el-tag
            v-for="it in JSON.parse(scope.row.PMContent)"
            :key="it.DomainId"
            type="info"
            round
            effect="plain"
            class="ml-2"
            >{{ it.Name }}</el-tag
          >
        </div>
        <div v-else>{{ scope.row.PMRole }}</div>
      </template>
    </template>
  </Table>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
type Props = {
  tableList: Array<any>
}
defineProps<Props>()
const headerInfo = ref({
  Selection: false,
  Columns: [
    {
      Label: '任务名称',
      Prop: 'NodeName',
      IsShow: true,
      Type: 'link',
      Link: '',
      IsFixed: true,
      NeedDeal: true,
      Width: 300
    },

    {
      Label: '计划完成时间',
      Prop: 'PlanFinishDateText',
      IsShow: true,
      Type: '',
      Link: '',
      IsFixed: false,
      NeedDeal: false
    },
    {
      Label: '实际完成时间',
      Prop: 'ActualFinishDateText',
      IsShow: true,
      Type: '',
      Link: '',
      IsFixed: false,
      NeedDeal: false
    },

    {
      Label: '责任人',
      Prop: 'PMContent',
      IsShow: true,
      Type: 'link',
      Link: '',
      IsFixed: false,
      NeedDeal: true,
      Width: 240
    }
  ]
})

const goNodeEdit = (row: { PackPlanNodeGUID: string, NodeNo: string | number}) => {
  router.push({
    name: 'packingNodeEdit',
    query: {
      PackPlanNodeGUID: row.PackPlanNodeGUID,
      NodeNo: row.NodeNo
    }
  })
}
</script>
