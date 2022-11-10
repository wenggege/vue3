<template>
  <el-upload
    class="upload-demo"
    :action="action"
    :headers="headers"
    :on-success="handleSuccess"
    :http-request="httpRequest"
    :limit="limit"
    :show-file-list="false"
  >
    <span v-if="btnDesc" class="pr20">{{ `${btnDesc}:` }}</span>
    <el-button :type="btnType" class="mb10" :icon="btnIcon">{{
      btnText
    }}</el-button>
  </el-upload>
  <div v-for="(item, index) in newFileList">
    <div class="file_list">
      <img src="@/assets/images/file.png" alt="" />
      <span>{{ item.FileName }}</span>
      <div class="file_operate">
        <img
          src="@/assets/images/download.png"
          alt=""
          class="file_operate_download"
          @click="downloadFile(item)"
        />
        <img
          src="@/assets/images/delete.png"
          alt=""
          class="file_operate_delete"
          @click="deleteFile(item, index)"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps, reactive, watch } from 'vue'
import type { UploadFile, UploadFiles } from 'element-plus'
import { ElMessageBox } from 'element-plus'

const props = defineProps({
  limit: {
    type: Number,
    default: 99
  },
  btnType: {
    type: String,
    default: 'primary'
  },
  btnText: {
    type: String,
    default: '点击上传'
  },
  btnDesc: {
    type: String,
    default: ''
  },
  btnIcon: {
    type: String,
    default: ''
  },
  fileList: {
    type: Array,
    default: () => {
      return []
    }
  },
  action: {
    type: String,
    default: ''
  }
})

const headers = { Authorization: sessionStorage.getItem('token') }
const emit = defineEmits(['deleteFile', 'handleSuccess', 'httpRequest'])

const newFileList = ref<any>([])
// 上传成功
const handleSuccess = (
  res: any,
  uploadFile: UploadFile,
  uploadFiles: UploadFiles
) => {
  emit('handleSuccess', res, uploadFile, uploadFiles)
}

// 下载文件
const downloadFile = (row: any) => {
  const link = document.createElement('a')
  link.download = row.FileNmae
  link.href = row.FileUrl
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// 删除文件
const deleteFile = (item: any, index: number) => {
  ElMessageBox.confirm('确定删除此附件吗？删除后不可恢复', '提示', {
    type: 'warning'
  })
    .then(() => {
      emit('deleteFile', item)
    })
    .catch(() => {})
}

const httpRequest = (params: any) => {
  emit('httpRequest', params)
}
watch(
  () => props.fileList,
  (val) => {
    newFileList.value = JSON.parse(JSON.stringify(val))
  }
)
</script>

<style lang="scss" scoped>
.upload-demo {
  width: 550px;
}
.file_list {
  margin-bottom: 8px;
  width: 541px;
  height: 26px;
  display: flex;
  align-items: center;
  &:hover {
    background: #f5f7fa;
  }
  span {
    display: inline-block;
    width: 400px;
    padding-left: 4px;
    font-family: 'PingFang SC';
    font-weight: 400;
    font-size: 14px;
    color: #646566;
  }
  .file_operate {
    flex: 1;
    text-align: right;
    .file_operate_download {
      cursor: pointer;
      margin-right: 9px;
    }
    .file_operate_delete {
      cursor: pointer;
      margin-right: 4px;
    }
  }
}
</style>
