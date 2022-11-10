<template>
  <el-dialog
    v-model="dialogVisible"
    :title="`设置${timeLabel}`"
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
        <el-form-item :label="timeLabel" prop="Time">
          <el-date-picker
            v-model="formData.Time"
            type="date"
            prop="Time"
            placeholder="请选择日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item label="备注：" prop="Remark">
          <el-input type="textarea" v-model="formData.Remark" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="onConfirm(dialogRef)">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { debounce } from '@/utils/tools'

const emit = defineEmits(['emtConfirm'])
const dialogRef = ref()
const dialogVisible = ref(false)
const timeLabel = ref('实际结束时间：')
const rules = reactive<any>({
  Time: [
    {
      type: 'date',
      required: true,
      message: '请选择日期',
      trigger: 'change'
    }
  ]
})
const formData = reactive({
  Time: '',
  Remark: '',
  type: ''
})
const onConfirm = debounce( async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      // let obj = {
      //   type: formType.value,
      //   ...formData
      // }
      // 直接传递formData接收到的值为空，因为后面resetFields()会将formData重置,简单的深拷贝一下
      let newForm = JSON.parse(JSON.stringify(formData))
      emit('emtConfirm', newForm)
      dialogVisible.value = false
    } else {
      console.log('error submit!', fields)
    }
  })
})
const showDialog = (type: string) => {
  formData.type = type
  if (type === 'complete') {
    // 完成任务
    timeLabel.value = '实际结束时间：'
  }
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
