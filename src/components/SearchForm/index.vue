<template>
  <div>
    <el-form :inline="true" :model="state.searchData" class="demo-form-inline">
      <el-row :gutter="20">
        <el-col
          :xl="8"
          :lg="8"
          :md="12"
          :xs="24"
          v-for="item in props.searchParam.SearchCondition"
          :key="item.id"
        >
          <el-form-item :label="`${item.Title} :`" :prop="item.Name">
            <!-- 文本框 -->
            <template
              v-if="
                item.ControlType.Code == 'text' ||
                item.ControlType.Code == 'textarea'
              "
            >
              <el-input
                v-model="state.searchData[item.Name]"
                placeholder="请输入"
                clearable
              ></el-input>
            </template>
            <!-- 下拉选择框 -->
            <template v-if="item.ControlType.Code == 'single_option'">
              <el-select
                v-model="state.searchData[item.Name]"
                placeholder="请选择"
              >
                <el-option
                  v-for="itemValue in item.Options"
                  :key="itemValue.Value"
                  :label="itemValue.Label"
                  :value="itemValue.Value"
                  :disabled="itemValue.disabled"
                />
              </el-select>
            </template>
            <!-- 下拉树形选择框 -->
            <!-- <template
              v-if="
                item.Type == 'treeSelect' || item.Type == 'multipleTreeSelect'
              "
            >
              <el-tree-select
                v-model="item.Name"
                :multiple="item.Type == 'multipleTreeSelect'"
                :data="item.enum"
              />
            </template> -->
            <!-- 日期选择 -->
            <template v-if="item.ControlType.Code == 'datetime_select'">
              <el-date-picker
                v-model="state.searchData[item.Name]"
                value-format="YYYY-MM-DD"
                type="date"
                placeholder="请选择日期"
              />
            </template>
            <!-- 日期范围选择 -->
            <template v-if="item.ControlType.Code == 'datetime_range'">
              <el-date-picker
                v-model="state.searchData[item.Name]"
                type="daterange"
                value-format="YYYY-MM-DD"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
              />
            </template>
          </el-form-item>
        </el-col>
        <el-col :xl="8" :lg="8" :md="12" :xs="24">
          <el-form-item>
            <template v-for="(i, k) in props.searchParam.Buttons" :key="k">
              <el-button
                :type="i.IsPrimary ? 'primary' : ''"
                :disabled="i.IsDisabled"
                @click="onSubmit(i)"
                >{{ i.Title }}</el-button
              >
            </template>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
const props = defineProps({
  searchParam: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
const state = reactive({
  searchData: {}
})
const emits = defineEmits(['handleQuery','handleReset']) //定义事件
const onSubmit = (item) => {
  if (item.Code.indexOf('_reset') > -1) {
    // 重置按钮点击
    // resetFormData.value.resetFields()
    Object.keys(state.searchData).forEach((key) => {
      state.searchData[key] = ''
    })
    emits('handleReset')
  } else {
    emits('handleQuery', state.searchData)
  }
}
</script>

<style scoped></style>
