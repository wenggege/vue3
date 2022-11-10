<template>
  <div>
    <el-upload
      v-model:file-list="fileList"
      class="upload-demo"
      :action="action"
      :headers="headers"
      :on-success="handleSuccess"
      :limit="limit"
    >
      <span v-if="btnDesc" class="pr20">{{ `${btnDesc}:` }}</span>
      <el-button :type="btnType" class="mb10" :icon="btnIcon">{{
        btnText
      }}</el-button>
      <template #file="{ file }">
        <div class="file-item" @click="handlePreview(file)">
          <div class="file-name">
            <el-icon class="mr10"><Document /></el-icon>
            {{ file.name }}
          </div>
          <div class="icon-group">
            <el-icon @click.stop="onDownLoad(file)"><Download /></el-icon>
            <el-icon @click.stop="onDel(file)" class="ml20"><Delete /></el-icon>
          </div>
        </div>
      </template>
    </el-upload>

    <el-dialog v-model="imgDlgVisible" width="800px">
      <img style="width: 100%" :src="imgUrl" alt="Preview Image" />
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'
import { UploadUserFile, ElMessageBox, ElMessage } from 'element-plus'
import { useRoute } from 'vue-router'
import { DeleteFile } from '@/api/packaging/common'
const route = useRoute()
const props = defineProps({
  defaultFile: {
    type: Array,
    default: () => {
      return []
    }
  },
  limit: {
    type: Number,
    default: 3
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
  }
})
const emit = defineEmits(['emtUpdateFile'])
const imgDlgVisible = ref(false)
const imgUrl = ref('')
// 上传
const fileList = ref<UploadUserFile[]>([])
const baseApiUrl = import.meta.env.VITE_BASE_URL_API
const TaskGUID = route.query.PackPlanNodeGUID
// console.log(route.query.PackPlanNodeGUID, 'PackPlanNodeGUID')
const headers = { Authorization: sessionStorage.getItem('token') }
const action =
  baseApiUrl + '/api/Files/UploadFiles?Type=PackPlan' + '&Guid=' + TaskGUID

const handleSuccess = (file: any, uploadFiles: any) => {
  console.log(fileList.value)
  console.log('file', file, uploadFiles)
  fileList.value.forEach((item: any) => {
    if (item.response) {
      item.url = item.response.Data[0].Url
      item.id = item.response.Data[0].Id
    }
  })
}

// 预览文件
const handlePreview = (file: any) => {
  console.log('预览', file)
  const addTypeArray = file.name.split('.')
  const addType = addTypeArray[addTypeArray.length - 1]
  const url = baseApiUrl + '' + file.url.split('wwwroot')[1]
  if (addType === 'pdf') {
    let a = document.createElement('a')
    a.setAttribute('href', url)
    a.setAttribute('target', '_blank')
    a.setAttribute('id', 'openwin')
    document.body.appendChild(a)
    a.click()
  } else if (
    [
      'txt',
      'doc',
      'docx',
      'xls',
      'xlsx',
      'pot',
      'potx',
      'ppt',
      'pptx'
    ].includes(addType.toLowerCase())
  ) {
    console.log('文档')
    onDownLoad(file)
  } else if (['png', 'jpg', 'jpeg'].includes(addType.toLowerCase())) {
    // 图片类型
    console.log('打开图片预览')
    imgUrl.value = url
    imgDlgVisible.value = true
  }
}
// 下载文件
const onDownLoad = (file: any) => {
  console.log('下载', file, fileList.value)
  let url = baseApiUrl + '' + file.url.split('wwwroot')[1]
  const el = document.createElement('a')
  el.style.display = 'none'
  el.setAttribute('target', '_blank')
  file.name && el.setAttribute('download', file.name)
  el.href = url
  document.body.appendChild(el)
  el.click()
  document.body.removeChild(el)
}

// 删除文件
const onDel = (file: any) => {
  ElMessageBox.confirm('确认要删除附件吗？', '提示', {
    type: 'warning'
  })
    .then(() => {
      // 删除
      console.log(file)
      DeleteFile({ id: file.id }).then((res) => {
        if (res.Code === 1000) {
          ElMessage.success('删除成功')
          // 删除列表
          emit('emtUpdateFile')
        }
      })
    })
    .catch(() => {
      console.log('取消')
    })
}

watch(
  () => props.defaultFile,
  (val) => {
    if (val.length > 0) {
      fileList.value = JSON.parse(JSON.stringify(val))
    } else {
      fileList.value = []
    }
  },
  { deep: true }
)
</script>

<style lang="scss" scoped>
.upload-demo {
  width: 550px;
}
.file-item {
  width: 550px;
  height: 30px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 6px;
  cursor: pointer;
  &:hover {
    background: #f5f7fa;
  }
  .file-name {
    max-width: 70%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .icon-group {
    .el-icon {
      &:hover {
        color: blue !important;
      }
    }
  }
}
</style>
