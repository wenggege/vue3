<template>
  <div>
    <p class="section-title">
      <img class="title-icon" src="@/assets/images/title_icon.png" alt="" />
      <span>项目组成员</span>
    </p>
    <div class="section-content">
      <div class="title-box">
        <span>项目成员</span>
      </div>
      <el-descriptions class="margin-top" :column="5" size="default">
        <el-descriptions-item
          v-for="item in state.members"
          :key="item.RoleName"
          :label="item.RoleName + '：'"
          >{{ item.Name }}</el-descriptions-item
        >
      </el-descriptions>
      <div class="title-box">
        <span>任务组成员</span>
      </div>
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane
          v-for="(item, index) in state.taskGroups"
          :key="item.ProjectGUID"
          :label="`任务组${index + 1}`"
          :name="index"
        >
          <div class="tips mb10">
            <span>任务组</span>
            {{ item.TaskGroupNo }}
          </div>
          <el-descriptions class="margin-top" :column="5" size="default">
            <el-descriptions-item
              v-for="ele in item.Members"
              :key="ele.RoleName"
              :label="ele.RoleName + '：'"
              >{{ ele.Name }}</el-descriptions-item
            >
          </el-descriptions>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import { GetProjectUser } from '@/api/projectAnalyse/index'

const props = defineProps({
  rowData: {
    type: Object,
    default: null
  }
})
const activeName = ref(0)

// 项目组信息
const state: any = reactive({
  members: [],
  taskGroups: []
})

onMounted(() => {
  getProjectUsers()
})
const getProjectUsers = () => {
  GetProjectUser({ projectNo: props.rowData.ProjectNo }).then((res: any) => {
    if (res.Code === 200) {
      state.members = res.Data.ProjectMembers
      state.taskGroups = res.Data.TaskGroupMembers
    }
  })
}

// 切换导航条
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
  console.log(tab.props.name)
}
</script>

<style lang="scss" scoped>
.section-content {
  width: 100%;
  box-sizing: border-box;
  padding: 10px 15px !important;
  .tips {
    font-size: 14px;
    color: #000000;
    display: flex;
    align-items: center;
    font-weight: bold;
    span {
      display: inline-block;
      width: 44px;
      height: 20px;
      font-size: 12px;
      line-height: 20px;
      text-align: center;
      background-color: #1765ec;
      margin-right: 8px;
      font-weight: 400;
      color: #fff;
    }
  }
  .title-box {
    margin-bottom: 15px;
    span {
      font-size: 14px;
      font-weight: bold;
      color: #646566;
    }
  }
}
</style>
