<template>
  <div class="node-bottom">
    <el-tabs v-model="activeName" @tab-click="tabClick">
      <el-tab-pane label="前置任务" name="predecessorTask">
        <PredecessorTask :tableList="prefixNodeList"></PredecessorTask>
      </el-tab-pane>
      <el-tab-pane label="附件" name="accessory">
        <UploadDoc
          :btn-text="'点击上传'"
          btn-type="primary"
          :default-file="defaultFile"
          @emtUpdateFile="getFileList"
        />
      </el-tab-pane>
      <el-tab-pane label="日志" name="log">
        <Log :logList="logList"></Log>
        <p style="color:#909399;fontSize:14px" v-if="logList.length === 0">暂无日志</p>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import { GetAllFile, GetLogAll } from '@/api/packaging/common'
import { GetPrefixNodeList } from '@/api/packaging/index'
type Props = {
  PackPlanNodeGUID: string
}
const props = defineProps<Props>()
const activeName = ref('predecessorTask')
onMounted(() => {
  // 获取前置任务
  getPrefixNodeList()
})

const tabClick = (tab: TabsPaneContext) => {
  if (tab.props.name == 'predecessorTask') {
    if (prefixNodeList.value.length == 0) {
      getPrefixNodeList()
    }
  } else if (tab.props.name == 'accessory') {
    if (defaultFile.value.length == 0) {
      getFileList()
    }
  } else {
    if (logList.value.length == 0) {
      getLogAll()
    }
  }
}

const prefixNodeList = ref<any>([
  // {
  //   ActualFinishDateText: null,
  //   BaseProjectGUID: '6dd78d3b-8e7a-439f-997e-bcf665510271',
  //   IsFinish: 0,
  //   IsNormal: 1,
  //   IsRestart: 0,
  //   NodeName: '节点1-包材信息表-PMO',
  //   NodeNo: 10,
  //   NormalText: '正常',
  //   OperateAuth: 0,
  //   PMContent: [{ Name: '韩祉芸', Domain: 'PORTON\\\\zhiyun.han' }],
  //   PMRole: 'PMO',
  //   PackPlanNodeGUID: '00bb7b9b-d478-4439-a8d4-ff87e655cd38',
  //   PlanFinishDateText: '2022-11-01',
  //   PrefixNodes: '',
  //   PrefixNodesName: null,
  //   PrefixNodesNo: null,
  //   Status: 2,
  //   StatusText: '进行中'
  // }
])

const getPrefixNodeList = () => {
  let data = {
    PackPlanNodeGUID: props.PackPlanNodeGUID
  }
  GetPrefixNodeList(data).then((res) => {
    console.log(res)
    if (res?.Code === 1000) {
      prefixNodeList.value = res.Data
    }
  })
}

// 日志
const logList = ref<any>([
  // {
  //   Content: '唐菊于2022年09月09日 14:48创建了任务',
  //   CreateTime: '2022-09-09T14:48:37.527',
  //   CreateTimeText: '2022-09-09 14:48:37',
  //   Creator: null,
  //   Id: 960,
  //   Remark: null,
  //   TaskGUID: '56d7652b-9a1e-42f3-82be-5bf7a81f595c',
  //   Type: null
  // },
  // {
  //   Content: '唐菊于2022年09月09日 14:48创建了任务',
  //   CreateTime: '2022-09-09T14:48:37.527',
  //   CreateTimeText: '2022-09-09 14:48:37',
  //   Creator: null,
  //   Id: 960,
  //   Remark: null,
  //   TaskGUID: '56d7652b-9a1e-42f3-82be-5bf7a81f595c',
  //   Type: null
  // }
])
const getLogAll = () => {
  let data = {
    Type: 'PackPlan',
    Guid: props.PackPlanNodeGUID
  }
  GetLogAll(data).then((res) => {
    console.log(res)
    if (res?.Code === 1000) {
      logList.value = res.Data
    }
  })
}

// const props = defineProps(['PackPlanNodeGUID'])

const defaultFile = ref([]) as any
// 获取附件
const getFileList = () => {
  GetAllFile({ guid: props.PackPlanNodeGUID, type: 'PackPlan' }).then((res) => {
    defaultFile.value = []
    if (res.Data.length > 0) {
      res.Data.forEach((item) => {
        let obj = {
          name: item.FileName,
          url: item.FilePath,
          id: item.Id
        }
        defaultFile.value.push(obj)
      })
    }
  })
}
watch(
  () => props.PackPlanNodeGUID,
  (val) => {
    if (val) {
      // 获取文件列表
      getFileList()
      // 获取前置任务
      getPrefixNodeList()
      // 获取日志
      getLogAll()
    }
  },
  { deep: true }
)
</script>

<style lang="scss" scoped>
.log-item {
  line-height: 30px;
  font-size: 14px;
  color: #323233;
}
:deep(.el-tabs__nav) {
  height: 50px;
  line-height: 50px;
}
</style>
