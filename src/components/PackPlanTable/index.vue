<template>
  <Table
    v-if="headerInfo.Columns && headerInfo.Columns.length"
    :headerInfo="headerInfo"
    :tableData="tableList"
  >
    <template v-slot="{ data, scope }">
      <template v-if="data.Prop == 'PackPlanNo'">
        <p class="link-address" @click="goDetail(scope.row)">
          {{ scope.row.PackPlanNo }}
        </p>
      </template>
    </template>
  </Table>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

type Props = {
  tableList?: any
  tableConfig?: any
}

withDefaults(defineProps<Props>(), {
  tableList: () => [],
  tableConfig: () => {
    return {}
  }
})
// 模拟表头数据
const headerInfo = ref({
  Selection: false,
  Columns: [
    {
      Label: '包装计划ID',
      Prop: 'PackPlanNo',
      IsShow: true,
      Type: '',
      Link: '',
      IsFixed: false,
      NeedDeal: true
    },
    {
      Label: '交付项',
      Prop: 'ItemNumber',
      IsShow: true,
      Type: '',
      Link: '',
      IsFixed: false,
      NeedDeal: false
    },
    {
      Label: '关联行项目',
      Prop: 'ProjectNumber',
      IsShow: true,
      Type: '',
      Link: '',
      IsFixed: false,
      NeedDeal: false
    },
    {
      Label: '项目号',
      Prop: 'ProjectNo',
      IsShow: true,
      Type: '',
      Link: '',
      IsFixed: false,
      NeedDeal: false
    },
    {
      Label: '产品代码',
      Prop: 'Product',
      IsShow: true,
      Type: '',
      Link: '',
      IsFixed: false,
      NeedDeal: false
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
      Label: '数量（KG）',
      Prop: 'OrderCount',
      IsShow: true,
      Type: '',
      Link: '',
      IsFixed: false,
      NeedDeal: false
    },
    {
      Label: '预出厂时间',
      Prop: 'FinalProductDate',
      IsShow: true,
      Type: '',
      Link: '',
      IsFixed: false,
      NeedDeal: false
    },
    {
      Label: '包装计划状态',
      Prop: 'StatusText',
      IsShow: true,
      Type: '',
      Link: '',
      IsFixed: false,
      NeedDeal: false
    },
    {
      Label: '创建时间',
      Prop: 'CreateTimeText',
      IsShow: true,
      Type: '',
      Link: '',
      IsFixed: false,
      NeedDeal: false
    }
  ]
})
const emit = defineEmits(['emtPackPlan'])
const goDetail = (row: {PackPlanNo: string}) => {
  emit('emtPackPlan', row.PackPlanNo)
}
</script>
