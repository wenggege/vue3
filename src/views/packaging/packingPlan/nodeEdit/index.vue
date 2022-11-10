<template>
  <div class="container-page">
    <NodeTitle
      :title="state.title"
      :nodeInfo="state.nodeInfo"
      @emitSave="emitSave"
      @emitSaveDone="emitSaveDone"
      @emitReset="emitReset"
      @emitCancel="emitCancel"
      @emitEditTitle="emitEditTitle"
      @emitCommand="emitCommand"
    />
    <div class="node-box">
      <TaskBasic
        ref="basciFormRef"
        @emtBasicData="handleBasicData"
        :status="state?.status"
        :PMContent="state?.nodeInfo?.PMContent"
        :time="state?.nodeInfo?.PlanFinishDateText"
      />
    </div>
    <!-- 动态表单组件 -->
    <div class="node-box">
      <component
        v-if="state.componentName"
        :is="state.componentName"
        ref="mainFormRef"
        :nodeInfo="state.nodeInfo"
      ></component>
    </div>
    <!-- 底部 -->
    <div class="node-box">
      <TaskBottom :PackPlanNodeGUID="route.query.PackPlanNodeGUID" />
    </div>
    <!-- 完成任务二次弹窗 -->
    <FormDIalogRemarkTime
      ref="FormDialogRef"
      @emtConfirm="handleDialogConfirm"
    />
    <!-- 推送指令弹窗 -->
    <FormDIalogCommand
      ref="FormDialogCommandRef"
      @emtConfirm="handleCommandConfirm"
    />
  </div>
</template>

<script lang="ts" setup>
import {
  onMounted,
  reactive,
  ref,
  markRaw,
  getCurrentInstance,
  watch
} from 'vue'
import { SavePackPlanNodeInfo } from '@/api/packaging/index'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  GetPackPlanNodeInfo,
  RestartPackPlanNode,
  PushPackPlan
} from '@/api/packaging/index'
import NodeTitle from '../components/NodeTitle.vue'
// import NodeBottom from '../components/NodeBottom.vue'
import NodeEdit1 from '../components/NodeEdit1.vue'
import NodeEdit2a from '../components/NodeEdit2a.vue'
import NodeEdit2b from '../components/NodeEdit2b.vue'
import NodeEdit2c from '../components/NodeEdit2c.vue'
import NodeEdit2d from '../components/NodeEdit2d.vue'
import NodeEdit3 from '../components/NodeEdit3.vue'
import NodeEdit4a from '../components/NodeEdit4a.vue'
import NodeEdit4b from '../components/NodeEdit4b.vue'
import NodeEdit5 from '../components/NodeEdit5.vue'
import NodeEdit6 from '../components/NodeEdit6.vue'
// import FormDialog from '@/components/FormDIalog/index.vue'
import { useRouter, useRoute } from 'vue-router'
import { Istate } from '@/views/packaging/packingPlan/interface'
const router = useRouter()
const route = useRoute()
const { proxy } = <any>getCurrentInstance()
const basciFormRef = ref()
const mainFormRef = ref()
const FormDialogRef = ref()
const FormDialogCommandRef = ref()
const state = reactive<Istate>({
  // oldTitle: '',
  // title: '',
  // componentName: '',
  // status: '', // 状态（1-未开始 2-进行中 3-已完成）
  // nodeInfo: '' // 节点详情
})
const formData = reactive<any>({
  packPlanNodeGUID: '', // 包装计划节点GUID
  PlanFinishDate: '', // 计划完成时间
  PMContent: '', // 负责人 UserInf-json
  NodeNo: '', // 包装计划节点号
  NodeContent: '', // 节点内容
  IsFinish: 0, // 是否完成 0-默认-仅保存 1-保存并完成
  NodeName: '', // 节点名称
  Remark: '', // 备注，保存并完成时提交
  ActualFinishDate: '', // 实际完成时间，保存并完成时提交
  extendFields: '' // 扩展字段
})
const pushPackPlanData = ref<any>({})
onMounted(() => {
  if (route.query.PackPlanNodeGUID && route.query.NodeNo) {
    initData(Number(route.query.NodeNo))
    getNodeDetail()
  }
})
const getNodeDetail = () => {
  let packPlanNodeGUID = route.query.PackPlanNodeGUID
  formData.packPlanNodeGUID = packPlanNodeGUID
  GetPackPlanNodeInfo({ packPlanNodeGUID }).then((res) => {
    console.log('节点信息', res)
    if (res?.Code === 1000) {
      state.status = res.Data.Status
      state.oldTitle = res.Data.NodeName
      state.title = res.Data.NodeName
      state.nodeInfo = res.Data
      formData.NodeNo = res.Data.NodeNo
      formData.NodeName = res.Data.NodeName + ',' + res.Data.NodeName
      // initData(res.Data.NodeNo)
    }
  })
}
const initData = (NodeNo: number) => {
  switch (NodeNo) {
    case 10:
      state.componentName = markRaw(NodeEdit1)
      break
    case 20:
      state.componentName = markRaw(NodeEdit2a)
      break
    case 21:
      state.componentName = markRaw(NodeEdit2b)
      break
    case 22:
      state.componentName = markRaw(NodeEdit2c)
      break
    case 23:
      state.componentName = markRaw(NodeEdit2d)
      break
    case 30:
      state.componentName = markRaw(NodeEdit3)
      break
    case 40:
      state.componentName = markRaw(NodeEdit4a)
      break
    case 41:
      state.componentName = markRaw(NodeEdit4b)
      break
    case 50:
      state.componentName = markRaw(NodeEdit5)
      break
    case 60:
      state.componentName = markRaw(NodeEdit6)
      break
  }
}
// 基础表单更新
const handleBasicData = (basicData: any) => {
  console.log('基础表单：', basicData)
  //  组装数据
  formData.PlanFinishDate = basicData.dateTime
  formData.PMContent = JSON.stringify(basicData.Person)
}
// 表单组件验证
const formRulesValidate = (pageRef: string, sonRef: string) => {
  return new Promise((resolve) => {
    proxy.$refs[pageRef].$refs[sonRef].validate((valid: boolean) => {
      if (valid) resolve(valid)
    })
  })
}
// 表单组件重置
const formRulesResetFields = () => {
  proxy.$refs.basciFormRef.$refs.ruleFormRef.resetFields()
  proxy.$refs.mainFormRef.$refs.ruleFormRef.resetFields()
}
// 保存
const emitSave = async () => {
  // 校验表单
  Promise.all([
    formRulesValidate('basciFormRef', 'ruleFormRef'),
    formRulesValidate('mainFormRef', 'ruleFormRef')
  ]).then(() => {
    formData.IsFinish = 0
    formData.ActualFinishDate = ''
    formData.Remark = ''
    handleSubmit()
  })
}
// 保存并完成
const emitSaveDone = () => {
  // 校验表单
  Promise.all([
    formRulesValidate('basciFormRef', 'ruleFormRef'),
    formRulesValidate('mainFormRef', 'ruleFormRef')
  ]).then(() => {
    formData.IsFinish = 1
    // 待确认是否要弹出时间和备注选择框
    FormDialogRef.value.showDialog('complete')
  })
}
// 弹窗确认
const handleDialogConfirm = (emtObj: any) => {
  console.log(emtObj)
  if (emtObj.type === 'complete') {
    // 保存并完成任务
    formData.ActualFinishDate = emtObj.Time
    formData.Remark = emtObj.Remark
    handleSubmit()
  }
}
// 组装数据并请求
const handleSubmit = (isPush = false) => {
  // 读取动态表单中的数据
  let mainForm = mainFormRef.value.sendFormData()
  // 21节点需要剥离扩展字段
  if (Number(route.query.NodeNo) === 21) {
    //extendFields
    let extendFieldObj = {
      PackDrumsSAPCode: mainForm.PackDrumsSAPCode,
      PackDrumsName: mainForm.PackDrumsName,
      OrderSize: mainForm.OrderSize,
      InsidePackDrumsName: mainForm.InsidePackDrumsName,
      SingleContainsNumber: mainForm.SingleContainsNumber
    }
    let extendFieldArr = [] as any
    for (let key in extendFieldObj) {
      let extendObj = {
        FieldName: key,
        FieldValue: extendFieldObj[key] + ''
      }
      extendFieldArr.push(extendObj)
    }
    console.log('extendField扩展字段原始数组', extendFieldArr)
    formData.extendFields = JSON.stringify(extendFieldArr)
    // 删除mainForm中的扩展字段
    delete mainForm.PackDrumsSAPCode
    delete mainForm.PackDrumsName,
      delete mainForm.OrderSize,
      delete mainForm.InsidePackDrumsName
    delete mainForm.SingleContainsNumber
  }
  let nodeArr = [] as object[]
  for (let key in mainForm) {
    let itemObj = {
      FieldName: key,
      FieldValue: mainForm[key] + '' // 后端要求都转为字符串
    }
    nodeArr.push(itemObj)
  }
  // console.log('表单数据组装:', nodeArr)
  formData.NodeContent = JSON.stringify(nodeArr)
  // 将请求参数调整为FormData格式
  let postData = new FormData()
  for (let key in formData) {
    postData.append(key, formData[key])
  }
  // console.log('表单数据',postData)
  SavePackPlanNodeInfo(postData).then((res) => {
    console.log(res)
    if (res.Code === 1000) {
      if (isPush) {
        // 推送包装指令
        console.log('推送包装指令')
        handlePushPackPlan()
      } else {
        ElMessage.success('保存成功')
        router.back()
      }
    }
  })
}
// 重启任务
const emitReset = () => {
  ElMessageBox.confirm('确认要重启任务吗？', '提示', {
    type: 'warning'
  })
    .then(() => {
      let postData = new FormData()
      postData.append('PackPlanNodeGUID', formData.packPlanNodeGUID)
      RestartPackPlanNode(postData).then((res) => {
        console.log(res)
        if (res.Code === 1000) {
          ElMessage({
            type: 'success',
            message: '重启成功'
          })
          getNodeDetail()
        }
      })
    })
    .catch(() => {
      console.log('取消')
    })
}
// 取消
const emitCancel = () => {
  formRulesResetFields()
  ElMessage({
    type: 'info',
    message: `取消编辑`
  })
  router.back()
}

const emitEditTitle = (val: string) => {
  console.log('父组件接收的值', val)
  state.title = val
  formData.NodeName = state.oldTitle + ',' + state.title
}
// 推送指令
const emitCommand = () => {
  // 校验表单
  Promise.all([
    formRulesValidate('basciFormRef', 'ruleFormRef'),
    formRulesValidate('mainFormRef', 'ruleFormRef')
  ]).then(() => {
    // 显示推送指令弹窗
    FormDialogCommandRef.value.showDialog()
  })
}
const handleCommandConfirm = (emtObj: any) => {
  //  存储指令表单
  pushPackPlanData.value = emtObj
  console.log('指令表单=======>', emtObj)
  formData.IsFinish = 1
  // 先调用保存，
  handleSubmit(true)
}
const handlePushPackPlan = () => {
  // 然后推送指令接口
  let postData = new FormData()
  // todo: 组装指令参数
  PushPackPlan(postData).then((res) => {
    console.log(res)
    // todo: 推送成功处理
  })
}

watch(
  () => route.query.PackPlanNodeGUID,
  () => {
    if (route.query.PackPlanNodeGUID && route.query.NodeNo) {
      initData(Number(route.query.NodeNo))
      getNodeDetail()
    }
  },
  { deep: true }
)
</script>

<style lang="scss" scoped></style>
