<template>
  <div class="mt20">
    <div class="section-content">
      <el-form label-position="top" :model="state.form">
        <el-row :gutter="80">
          <el-col
            v-for="item in state.form.fields"
            :key="item['Id']"
            :span="12"
          >
            <el-form-item :label="item['LifeCycleTittle']">
              <el-input
                type="textarea"
                v-model="item['LifeCycleContent']"
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, onMounted } from 'vue'
import { GetLifeCycle, AddLifeCycle } from '@/api/projectAnalyse/index'
const props = defineProps({
  rowData: {
    type: Object,
    default: null
  }
})
const state = reactive({
  form: {
    fields: []
  }
})
onMounted(() => {
  getLifeCycleList()
})

const getLifeCycleList = () => {
  GetLifeCycle({
    ReplayNo: props.rowData.ReplayNo
  }).then((res: any) => {
    if (res.code === 200) {
      state.form.fields = res.Data
    }
  })
}

defineExpose({
  state
})
</script>

<style lang="scss" scoped></style>
