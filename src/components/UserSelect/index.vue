<template>
  <div>
    <el-tag
      v-for="tag in personInfoList"
      :key="tag"
      size="large"
      closable
      :disable-transitions="false"
      @close="handleDeletePerson(tag)"
      style="margin-right: 10px; margin-bottom: 5px"
    >
      {{ tag.Name }}
    </el-tag>
    <el-button
      v-if="btnIcon && !visible"
      text
      :icon="btnIcon"
      @click="visible = !visible"
    >
    </el-button>
    <el-button
      type="primary"
      v-if="!visible && !btnIcon"
      plain
      @click="visible = !visible"
    >
      {{ btnText }}
    </el-button>
    <template v-if="visible">
      <el-popover
        placement="bottom-start"
        :width="300"
        trigger="click"
        :visible="visible"
      >
        <template #reference>
          <el-input
            v-model="queryData"
            ref="refInput"
            placeholder="请选择"
            @click="visible = true"
            @input="onQueryChanged"
          />
        </template>

        <el-space style="margin-bottom: 10px">
          <el-button @click="visible = false" size="small">取消</el-button>
          <el-button @click="confirm" size="small">确定</el-button>
        </el-space>
        <el-tree-v2
          ref="treeRef"
          :data="peoList"
          :props="treeProps"
          show-checkbox
          :height="208"
          :multiple="false"
          :filter-method="filterMethod"
        />
      </el-popover>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { GetTreeUserInfo } from '@/api/packaging/common'
import { personType } from '@/types'
import { mapTree } from '@/utils/tools'
type Props = {
  personInfoList?: personType[]
  btnIcon?: string
  btnText?: string
}
// defineProps<Props>()

withDefaults(defineProps<Props>(), {
  btnIcon: '',
  btnText: '添加责任人'
})

const treeProps = {
  value: 'value',
  label: 'label',
  children: 'children',
  email: 'email'
}

onMounted(() => {
  getTreeUserInfo()
})

const visible = ref(false)
const peoList = ref()
const queryData = ref('')
const treeRef = ref()
const userData = ref([])
const getTreeUserInfo = () => {
  GetTreeUserInfo().then((res: any) => {
    console.log(res)
    if (res.Code == 200) {
      console.log(res)
      peoList.value = res.Data.map((org: any) => mapTree(org))
      console.log('data.value', peoList.value)
    }
  })
}

const onQueryChanged = (queryData: any) => {
  treeRef.value.filter(queryData)
}
const filterMethod = (queryData: any, treenode: any) => {
  return treenode.label.includes(queryData)
}

const emits = defineEmits(['getPeo', 'deletePerson'])
const confirm = () => {
  console.log(treeRef.value.getCheckedNodes())
  let list = treeRef.value
    .getCheckedNodes()
    .filter((v: any) => !v.children || v.children.length === 0)

  console.log('list', list)

  userData.value = list.map((v: any) => {
    return {
      Name: v.label,
      Domain: v.value,
      Email: v.email
    }
  })
  queryData.value = ''
  visible.value = false
  onQueryChanged(queryData.value)
  emits('getPeo', userData.value)
}

const handleDeletePerson = (tag: personType) => {
  emits('deletePerson', tag)
}
</script>
