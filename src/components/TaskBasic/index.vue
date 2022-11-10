<template>
  <div class="node-form">
    <div class="node-form-title">任务基本信息</div>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="130px"
      class="demo-ruleForm"
      :size="formSize"
      :disabled="status === 3"
      status-icon
    >
      <el-form-item label="计划完成时间：" prop="dateTime">
        <el-date-picker
          v-model="ruleForm.dateTime"
          type="date"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item label="责任人：" prop="Person">
        <div>
          <UserSelect
            @getPeo="handleGetPersonInfo"
            @deletePerson="deletePerson"
            :personInfoList="personInfoList"
          ></UserSelect>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { arrayObjectDistinc } from '@/utils/tools'
import { personType } from '@/types'

const emit = defineEmits(['emtBasicData'])
const props = defineProps({
  status: {
    type: Number,
    default: 0
  },
  PMContent: {
    type: String,
    default: '',
  },
  time: {
    type: String,
    default: ''
  }
})
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
// 选择责任人信息
const personInfoList = ref<any>([])
const ruleForm = reactive({
  dateTime: '',
  Person: [],
})
const rules = reactive<FormRules>({
  dateTime: [
    {
      required: true,
      message: '请选择时间',
      trigger: 'change'
    }
  ],
  Person: [
    {
      required: true,
      message: '请选择负责人',
      trigger: 'change'
    }
  ]
})

// const personVisable = ref(false)
// 获取人员信息
const handleGetPersonInfo = (value: any) => {
  console.log('===> handleGetPersonInfo', value, personInfoList.value)
  personInfoList.value = arrayObjectDistinc([...personInfoList.value, ...value])
  ruleForm.Person = personInfoList.value
}
// 删除责任人
const deletePerson = (tag: personType) => {
  console.log('===> handleDeletePerson', tag)
  personInfoList.value.splice(personInfoList.value.indexOf(tag), 1)
  ruleForm.Person = personInfoList.value
}


watch(
  () => ruleForm,
  (val) => {
    console.log('基础信息改变---:', val)
    emit('emtBasicData', val)
  },
  {
    deep: true
  }
)
watch(
  () => props,
  (val) => {
    if (val.time) {
      ruleForm.dateTime = val.time
    }
    if (val.PMContent) {
      personInfoList.value = JSON.parse(val.PMContent)
      ruleForm.Person = JSON.parse(val.PMContent)
    }
  },
  {
    deep: true
  }
)
</script>

<style lang="scss" scoped></style>
