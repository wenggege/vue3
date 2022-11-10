<template>
  <div>
    <p class="section-title">
      <img class="title-icon" src="@/assets/images/title_icon.png" alt="" />
      <span>项目产品质量</span>
    </p>
    <div class="section-content mb10">
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
  DeleteFile
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

onMounted(() => {
  getProjectList()
})
const getProjectList = () => {
  GetProjectList({
    ReplayNo: props.rowData.ReplayNo,
    SeverType: 'Quality'
  }).then((res: any) => {
    if (res.code === 200) {
      uploadData.fileList = res.Data
    }
  })
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
  let dataList = [] as fileObject[]
  const file = params.file
  const filetype = file.name.split('.').pop()
  var form = new FormData()
  form.append('file', file)
  form.append('filepath', 'Quality')
  Addfile(form).then((res: any) => {
    if (res?.code === 200) {
      let obj: fileObject = {
        Id: 0,
        FileName: file.name,
        FileType: filetype,
        FileSize: file.size,
        FileUrl: res.Data[0],
        ReplayNo: props.rowData.ReplayNo,
        SeverType: 'Quality'
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

<style lang="scss" scoped></style>
