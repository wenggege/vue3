<template>
  <el-table :data="tableData" height="100%">
    <el-table-column v-if="headerInfo.Selection" type="selection" width="55" />
    <template v-for="item in headerInfo.Columns">
      <el-table-column
        :key="item.Prop"
        v-if="!item.NeedDeal"
        :type="item.Type"
        :label="item.Label"
        :prop="item.Prop"
        :fixed="item.IsFixed"
      >
      </el-table-column>
      <template v-else>
        <el-table-column
          :key="item.Prop"
          :type="item.Type"
          :label="item.Label"
          :prop="item.Prop"
          :fixed="item.IsFixed"
          :width="item.Width"
        >
          <template #default="scope"
            ><slot :data="item" :scope="scope"></slot
          ></template>
        </el-table-column>
      </template>
    </template>
    <!-- <el-table-column fixed="right" label="操作" width="200">
      <template #default="scope">
        <el-button
          v-for="item in props.headerData.RowHandlers"
          :key="item.Code"
          type="primary"
          size="small"
          @click="handleClick(item, scope.row)"
          >{{ item.Title }}</el-button
        >
      </template>
    </el-table-column> -->
  </el-table>
</template>
<script setup lang="ts">
import { HeaderInfo } from '@/types'
type Props = {
  headerInfo: HeaderInfo
  tableData: Array<any>
}

defineProps<Props>()

// console.log('props', props)

// const headerClass = () => {
//   return 'headerRowClass'
// }
// console.log('props', props)

// const small = ref(false)
// const background = ref(true)
// const disabled = ref(false)

// const emits = defineEmits([
//   'handleClick',
//   'handleSizeChange',
//   'handleCurrentChange'
// ]) //定义事件
// const handleClick = (val, row) => {
//   emits('handleClick', val, row)
// }
// const handleSizeChange = (val) => {
//   emits('handleSizeChange', val)
// }
// const handleCurrentChange = (val) => {
//   emits('handleCurrentChange', val)
// }
</script>

<style lang="scss">
.el-table {
  .el-table__header th {
    height: 50px;
    font-size: 15px;
    font-weight: normal;
    color: #323232;
    background: #f7f8fa !important;
    border-bottom: none !important;
  }
  // .el-table__header .el-table__cell > .cell {
  //   white-space: nowrap;
  // }
  .el-table__row {
    height: 52px;
  }

  // 解决表格数据为空时样式不居中问题(仅在element-plus中)
  // .el-table__empty-block {
  //   position: absolute;
  //   top: 50%;
  //   left: 50%;
  //   transform: translate(-50%, -50%);
  // }
  // .table-empty {
  //   line-height: 30px;
  // }
}
// 分页样式
.el-pagination {
  display: flex;
  justify-content: flex-end;
  margin: 23px 0 10px;
}
</style>
<style lang="scss" scoped>
.table-header {
  margin: 10px auto;
}
.headerOper {
  margin-bottom: 10px;
}
</style>
