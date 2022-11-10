<template>
  <div>
    <p class="section-title">
      <img class="title-icon" src="@/assets/images/title_icon.png" alt="" />
      <span>项目基本信息</span>
    </p>
    <div class="section-content">
      <div class="basic-top">
        <div class="basic-left">
          <!-- <img src="@/assets/images/report_demo1.png" alt="" /> -->
          <img :src="state.leftImgUrl" alt="" />
          <div class="basic-list">
            <el-descriptions class="margin-top" :column="3" size="default">
              <el-descriptions-item label="客户">{{
                baseInfo.FinalCustomer
              }}</el-descriptions-item>
              <el-descriptions-item label="项目代码">{{
                baseInfo.FinalCustomer
              }}</el-descriptions-item>
              <el-descriptions-item label="博腾代号">{{
                baseInfo.PortonCode
              }}</el-descriptions-item>
              <el-descriptions-item label="化学名">{{
                baseInfo.FinalCustomer
              }}</el-descriptions-item>
              <el-descriptions-item label="临床期">{{
                baseInfo.ClinicalPhase
              }}</el-descriptions-item>
              <el-descriptions-item label="适应症">{{
                baseInfo.Indication
              }}</el-descriptions-item>
            </el-descriptions>
          </div>
        </div>
        <div class="basic-right">
          <div class="f-c">
            合成路线
            <el-button class="ml10" @click="imgVisible = true"
              >点击预览</el-button
            >
          </div>
          <img :src="state.rightImgUrl" alt="" />
        </div>
      </div>
      <div class="basic-bottom"></div>
    </div>
  </div>
  <el-dialog
    v-model="imgVisible"
    title="合成路线"
    :fullscreen="true"
    append-to-body
  >
    <img :src="state.rightImgUrl" alt="" />
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue'
import { GetOrder, GetElab, GetBestElabIMG } from '@/api/projectAnalyse/index'

const props = defineProps({
  rowData: {
    type: Object,
    default: null
  }
})
// 定义接口来定义基本信息对象的类型
interface BaseInfo {
  FinalCustomer: String
  ClinicalPhase: String
  Indication: String
  PortonCode: String
}
let baseInfo: BaseInfo = reactive({
  FinalCustomer: '',
  ClinicalPhase: '',
  Indication: '',
  PortonCode: ''
})

const imgVisible = ref(false)

const state = reactive<any>({
  leftImgUrl: '',
  rightImgUrl: ''
})

onMounted(() => {
  getBaseInfo()
})
const getBaseInfo = () => {
  GetOrder({ orderNo: props.rowData.OrderNo }).then((res: any) => {
    if (res.Code === 200) {
      if (res.Data.length) {
        baseInfo.FinalCustomer = res.Data[0].FinalCustomer
        baseInfo.PortonCode = res.Data[0].PortonCode
      }
      baseInfo.ClinicalPhase = res.DeliveryRequire.ClinicalPhase
      baseInfo.Indication = res.DeliveryRequire.Indication
    }
  })
  GetElab({ PortonCode: props.rowData.PortonCode }).then((res: any) => {
    if (res.Code === 200) {
      state.leftImgUrl = res.Data[0].StructureImgPath
    }
  })
  GetBestElabIMG({ PortonCode: 'D314' }).then((res: any) => {
    if (res.Code === 200) {
      state.rightImgUrl = res.Data[0]
    }
  })
}
</script>

<style lang="scss" scoped>
.section-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .basic-top {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .basic-left {
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        height: 192px;
        display: block;
      }
      .basic-list {
        width: 100%;
        margin-top: 10px;
      }
    }
    .basic-right {
      width: 50%;
      margin-left: 50px;
      font-size: 14px;
      font-weight: bold;
      img {
        max-width: 100%;
        min-height: 140px;
        max-height: 240px;
        display: block;
        margin: 30px auto;
      }
    }
  }
  .basic-bottom {
  }
}
</style>
