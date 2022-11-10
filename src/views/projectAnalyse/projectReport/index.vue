<template>
  <!-- 总结报告 -->
  <div class="report">
    <div class="section">
      <div class="section-bar">
        <i></i>
        <span>项目背景</span>
      </div>
      <BasicInfo :rowData="rowData" />
      <ProjectPerson :rowData="rowData" />
      <ProjectQuality :rowData="rowData" />
    </div>
    <div class="section">
      <div class="section-bar">
        <i></i>
        <span>项目交付表现回顾</span>
      </div>
      <PassRate :rowData="rowData" :urlData="state.urlData" />
      <PleasedRate :rowData="rowData" />
    </div>
    <div class="section">
      <div class="section-bar">
        <i></i>
        <span>执行总结</span>
      </div>
      <Summary
        @emtAddQuestion="handleAddQuestion"
        :rowData="rowData"
        :urlData="state.urlData"
      />
    </div>
    <div class="section">
      <div class="section-bar">
        <i></i>
        <span>项目在博腾内部的生命周期管理</span>
      </div>
      <LifeCycle :rowData="rowData" ref="lifeCycle" />
    </div>
    <div class="section">
      <div class="section-bar">
        <i></i>
        <span>项目问题清单</span>
      </div>
      <div class="section-content">
        <QuestionList ref="questionRef" inReport :rowData="rowData" />
      </div>
    </div>
    <div class="btn-box">
      <el-button class="btn-done" type="primary" v-debounce="onDone"
        >完成项目总结</el-button
      >
      <el-button class="btn-done" type="primary" v-debounce="save"
        >保存</el-button
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import BasicInfo from './components/basicInfo.vue'
import ProjectPerson from './components/projectPerson.vue'
import ProjectQuality from './components/projectQuality.vue'
import PassRate from './components/passRate.vue'
import PleasedRate from './components/pleasedRate.vue'
import Summary from './components/summary.vue'
import LifeCycle from './components/lifeCycle.vue'
import QuestionList from '@/components/questionList/index.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  AddLifeCycle,
  GetProjectUrl,
  SubProject
} from '@/api/projectAnalyse/index'
const route = useRoute()
const data: any = route.query.rowData
const questionRef = ref()
let rowData = JSON.parse(data)

const lifeCycle = ref(null)
const state = reactive({
  urlData: {}
})

onMounted(() => {
  getProjectUrl()
})
const getProjectUrl = () => {
  GetProjectUrl({ ReplayNo: rowData.ReplayNo }).then((res: any) => {
    if (res.Code === 200) {
      state.urlData = res.Data
    }
  })
}

// 新建问题
const handleAddQuestion = (value: any) => {
  questionRef.value.handleAdd(value)
}
const onDone = () => {
  ElMessageBox.confirm('确定完成项目总结', '提示', {
    type: 'warning'
  })
    .then(() => {
      SubProject({ ReplayNo: rowData.ReplayNo }).then((res: any) => {
        if (res.code === 200) {
          ElMessage({
            type: 'success',
            message: '操作成功'
          })
        } else {
          ElMessage({
            type: 'error',
            message: '操作失败'
          })
        }
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消'
      })
    })
}

// 保存项目在博腾内部的生命周期管理
const save = () => {
  let data: object | any = lifeCycle.value
  AddLifeCycle(data.state.form.fields).then((res: any) => {
    if (res.code === 200) {
      ElMessage({
        type: 'success',
        message: '保存成功'
      })
    } else {
      ElMessage({
        type: 'success',
        message: '保存失败'
      })
    }
  })
}
</script>
<style lang="scss" scoped>
.report {
  // background-color: #fff;
  box-sizing: border-box;
  padding: 15px 0;
  width: 100%;
  overflow-x: hidden;
  color: #323233;
  .section {
    background-color: #fff;
    box-sizing: border-box;
    padding-top: 10px;
    padding-bottom: 15px;
    margin-bottom: 15px;
  }
  .btn-box {
    width: 100%;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  }
  ::v-deep(.section) {
    .section-bar {
      width: 100%;
      display: flex;
      align-items: center;
      font-size: 16px;
      font-weight: bold;
      line-height: 20px;
      padding-left: 15px;
      color: #323233;
      box-sizing: border-box;
      i {
        display: inline-block;
        width: 3px;
        height: 16px;
        margin-right: 6px;
        background-color: #1765ec;
      }
    }
    .section-title {
      font-size: 14px;
      padding-left: 15px;
      font-weight: bold;
      margin: 25px 0;
      display: flex;
      align-items: center;
      .title-icon {
        margin-right: 6px;
        width: 16px;
        height: 16px;
      }
    }
    .section-content {
      box-sizing: border-box;
      padding: 0 20px;
    }
  }
}
</style>
