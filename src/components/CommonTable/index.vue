<template>
  <el-table :data="tableData" height="100%">
    <!-- 多选框 -->
    <template v-if="tableConfig?.IsSelectList">
      <el-table-column type="selection" width="55"> </el-table-column>
    </template>
    <!-- 列表内容 -->
    <template v-for="(item, index) in columns">
      <el-table-column
        :key="index"
        v-if="item.Name && !item.IsHidden"
        v-bind="item"
        :prop="item.Name"
        :label="item.Label"
        :fixed="item.IsFixed ? 'left' : false"
        :width="item.Width"
        :header-align="item.align || 'left'"
        :align="item.align || 'left'"
        show-overflow-tooltip
      >
        <!--  自定义列展示，根据type值判断展示什么类型 -->
        <template #default="scope">
          <!--  link类型   -->
          <div v-if="item.Link !== null && item.Link !== ''">
            <el-link type="primary" @click="rowClick(item, scope.row)">{{
              scope.row[item.Name]
            }}</el-link>
          </div>
          <div
            v-else
            style="
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            "
          >
            {{ scope.row[item.Name] ? scope.row[item.Name] : '-' }}
          </div>
        </template>
      </el-table-column>
    </template>
    <!-- 操作栏 -->
  </el-table>
</template>
<script setup lang="ts">
// import { HeaderInfo } from '@/types'
import { ref, watch } from 'vue'
import {tableColumns } from '@/types/packaging'
type Props = {
  tableConfig: any
  tableData: Array<any>
}

const emits = defineEmits(['emtRowClick']) //定义事件
const props = defineProps<Props>()
const columns = ref<tableColumns[]>([])

//表格内部按钮点击
const rowClick = (item: any, row: any) => {
  emits('emtRowClick', item, row)
}
watch(
  () => props.tableConfig,
  (val) => {
    if (val.Columns) {
      columns.value = JSON.parse(val.Columns)
    }
  }
)
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
