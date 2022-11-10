<template>
  <div class="main-box">
    <div class="table-header"><slot name="header"></slot></div>
    <div class="table-box"><slot></slot></div>
    <div class="pagination-box"><slot name="pagination"></slot></div>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="scss">
.main-box {
  width: 100%;
  height: calc(100vh - 86px);
  background: #fff;
  padding: 10px 15px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  border-radius: 2px;
  .table-header {
    width: 100%;
    overflow: hidden;
    min-height: 45px;
    padding: 10px;
    box-sizing: border-box;
    padding: 10px;
    background: #f7f8fa;
    line-height: 37px;
    flex-shrink: 0;
    .el-form {
      margin-top: 15px;
    }

    .el-input {
      width: 200px;
    }

    .el-form-item__content {
      width: 250px;
    }
    .el-form-item__label {
      min-width: 80px;
    }

    .el-range-editor.el-input__wrapper {
      display: inline-flex;
      align-items: center;
      padding: 0 10px;
      margin-right: 10px;
    }
  }
  .table-box {
    margin-top: 5px;
    width: 100%;
    overflow-y: auto;
    flex:1
  }
  .pagination-box {
    width: 100%;
    height: auto;
    .el-pagination {
      margin: 10px auto;
    }
  }
  .el-table th.el-table__cell {
    font-weight: normal;
    background-color: $bgcolor;
    color: #000;
    font-size: 14px;
    padding: 14px 0;
  }

  .el-table .el-table__cell {
    padding: 1px 0;
  }
}
</style>
