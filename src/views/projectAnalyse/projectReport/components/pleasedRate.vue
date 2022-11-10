<template>
  <div>
    <p class="section-title">
      <img class="title-icon" src="@/assets/images/title_icon.png" alt="" />
      <span>客户满意度</span>
    </p>
    <div class="section-content">
      <div class="pleased-box">
        <div class="pleased-icon">
          <img src="@/assets/images/level_icon.png" alt="" />
        </div>
        <div class="pleased-score">
          <p class="score-title f-c">
            平均得分 <span>{{ state.average }}</span>
          </p>
          <el-descriptions class="margin-top" :column="4" size="default">
            <el-descriptions-item
              v-for="item in state.members"
              :key="item.activity"
              :label="item.activity + '：'"
              >{{ item.averageScore.toFixed(1) }}</el-descriptions-item
            >
          </el-descriptions>
        </div>
      </div>
    </div>
    <p class="section-title">
      <img class="title-icon" src="@/assets/images/title_icon.png" alt="" />
      <span>客户满意度文件</span>
    </p>
    <div class="section-content">
      <UploadFile
        :fileList="uploadData.fileList"
        @deleteFile="deleteFile"
        @httpRequest="httpRequest"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { onMounted, defineProps, reactive } from 'vue'
import UploadFile from '@/components/uploadFile1/index.vue'
import {
  GetProjectList,
  Addfile,
  Add,
  DeleteFile,
  GetSatisfactionAverage
} from '@/api/projectAnalyse/index'

const props = defineProps({
  rowData: {
    type: Object,
    default: null
  }
})

interface fileObject {
  Id: number
  FileName: string
  FileType: string
  FileSize: number
  FileUrl: string
  ReplayNo: string
  SeverType: string
}

const uploadData = reactive<any>({
  fileList: []
})
// 项目组信息
const state: any = reactive({
  members: [],
  average: 0
})

onMounted(() => {
  getSatisfactionAverage()
  getProjectList()
})
const getProjectList = () => {
  GetProjectList({
    ReplayNo: props.rowData.ReplayNo,
    SeverType: 'Satisfied '
  }).then((res: any) => {
    if (res.code === 200) {
      uploadData.fileList = res.Data
    }
  })
}

const getSatisfactionAverage = () => {
  GetSatisfactionAverage({
    // OrderNo: props.rowData.OrderNo
    OrderNo: '4589'
  }).then((res: any) => {
    if (res.code === 200) {
      state.members = res.data.questionList
      calculationAve(state.members)
    }
  })
}
// 计算平均得分
const calculationAve = (list: []) => {
  if (!list.length) return state.average
  const total = list.reduce((pre, cur: any) => {
    return pre + cur.averageScore
  }, 0)
  state.average = (total / list.length).toFixed(1)
}

const deleteFile = (value: any) => {
  let params = {
    Id: value.Id,
    ReplayNo: value.ReplayNo,
    SeverType: value.SeverType
  }
  DeleteFile(params).then((res: any) => {
    if (res.code === 200) {
      ElMessage({
        type: 'success',
        message: '操作成功'
      })
      getProjectList()
    } else {
      ElMessage({
        type: 'error',
        message: '操作失败'
      })
    }
  })
}

const httpRequest = (params: any) => {
  let dataList: fileObject[] = []
  const file = params.file
  const filetype = file.name.split('.').pop()
  var form = new FormData()
  form.append('file', file)
  form.append('filepath', 'Satisfied ')
  Addfile(form).then((res: any) => {
    if (res?.code === 200) {
      let obj: fileObject = {
        Id: 0,
        FileName: file.name,
        FileType: filetype,
        FileSize: file.size,
        FileUrl: res.Data[0],
        ReplayNo: props.rowData.ReplayNo,
        SeverType: 'Satisfied '
      }
      dataList.push(obj)
      Add(dataList).then((res: any) => {
        if (res.code === 200) {
          getProjectList()
          ElMessage({
            type: 'success',
            message: '上传成功'
          })
        } else {
          ElMessage({
            type: 'error',
            message: '上传失败'
          })
        }
      })
    }
  })
}
</script>

<style lang="scss" scoped>
.pleased-box {
  width: 100%;
  min-height: 200px;
  display: flex;
  border: 1px solid #ebedf0;
  border-radius: 2px;
  box-sizing: border-box;
  padding: 15px;
  .pleased-icon {
    margin-right: 10px;
    margin-top: 15px;
    flex-shrink: 0;
    img {
      width: 80px;
      height: 50px;
      display: block;
    }
  }
  .pleased-score {
    flex-grow: 1;
    .score-title {
      font-weight: bold;
      font-size: 16px;
      line-height: 22px;
      color: #323233;
      margin: 20px 0;
      span {
        font-size: 28px;
        line-height: 36px;
        color: #000000;
        font-weight: bold;
        padding-left: 8px;
      }
    }
    ::v-deep(.el-descriptions__content) {
      color: #000;
      font-weight: bold;
    }
  }
}
</style>
