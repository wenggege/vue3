<template>
  <el-dialog
    v-model="dialogVisible"
    title="选择推送包装指令人员"
    width="600px"
    :append-to-body="true"
    @close="handleClose"
  >
    <div class="dialog-box">
      <el-form
        :model="formData"
        :label-width="160"
        ref="dialogRef"
        :rules="rules"
      >
        <el-form-item label="发送人" prop="a">
          <el-tree-select
            v-model="formData.a"
            :data="personList"
            :render-after-expand="false"
          />
        </el-form-item>
        <el-form-item label="主送人" prop="b">
          <div>
            <UserSelect
              @getPeo="handleGetMainPerson"
              @deletePerson="deleteMainPerson"
              :personInfoList="mainPersonList"
              btnIcon="CirclePlus"
            ></UserSelect>
          </div>
        </el-form-item>
        <el-form-item label="抄送人" prop="c">
          <div>
            <UserSelect
              @getPeo="handleGetCsPerson"
              @deletePerson="deleteCsPerson"
              :personInfoList="csPersonList"
              btnIcon="CirclePlus"
            ></UserSelect>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="onConfirm(dialogRef)"
          >确定推送</el-button
        >
        <el-button @click="dialogVisible = false">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { GetTreeUserInfo } from '@/api/packaging/common'
import { mapTree, arrayObjectDistinc } from '@/utils/tools'
const personList = ref([])
const mainPersonList = ref<any>([])
const csPersonList = ref<any>([])
const dialogRef = ref()
const dialogVisible = ref(false)
const rules = reactive<any>({
  a: [
    {
      required: true,
      message: '请选择发件人',
      trigger: 'change'
    }
  ],
  b: [
    {
      required: true,
      message: '请选择主送人',
      trigger: 'change'
    }
  ]
})
const formData = reactive({
  a: '',
  b: '',
  c: ''
})
const emit = defineEmits(['emtConfirm'])
onMounted(() => {
  getTreeUserInfo()
})
const getTreeUserInfo = () => {
  GetTreeUserInfo().then((res: any) => {
    if (res.Code == 200) {
      personList.value = res.Data.map((org: any) => mapTree(org))
    }
  })
}
// 获取主送人人员信息
const handleGetMainPerson = (value: any) => {
  mainPersonList.value = arrayObjectDistinc([...mainPersonList.value, ...value])
  formData.b = mainPersonList.value
}
// 删除主送人
const deleteMainPerson = (tag: any) => {
  mainPersonList.value.splice(mainPersonList.value.indexOf(tag), 1)
  formData.b = mainPersonList.value
}
// 获取抄送人人员信息
const handleGetCsPerson = (value: any) => {
  csPersonList.value = arrayObjectDistinc([...csPersonList.value, ...value])
  formData.c = csPersonList.value
}
// 删除抄送人
const deleteCsPerson = (tag: any) => {
  csPersonList.value.splice(csPersonList.value.indexOf(tag), 1)
  formData.c = csPersonList.value
}
const onConfirm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      let newForm = JSON.parse(JSON.stringify(formData))
      emit('emtConfirm', newForm)
      dialogVisible.value = false
    } else {
      console.log('error submit!', fields)
    }
  })
}
const showDialog = () => {
  dialogVisible.value = true
}
const handleClose = () => {
  dialogRef.value.resetFields()
  console.log('关闭弹窗')
}
defineExpose({
  showDialog
})
</script>
<style lang="scss" scoped>
.dialog-box {
  padding-right: 50px;
  box-sizing: border-box;
}
</style>
