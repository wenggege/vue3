<template>
  <div class="expaln">
    <!-- <div class="task-info">
      <span>销售订单号： {{ props.taskInfo.order }}</span>
      <span>产品代码： {{ props.taskInfo.code }}</span>
      <span>产品类别： {{ ['普通', '危险品'][props.taskInfo.type] }}</span>
    </div> -->
    <el-descriptions title="" class="mt20">
      <el-descriptions-item label="销售订单号：">
        {{ props.taskInfo.OrderNo }}</el-descriptions-item
      >
      <el-descriptions-item label="产品代码：">{{
        props.taskInfo.Product
      }}</el-descriptions-item>
      <el-descriptions-item label="产品类别：">
        {{
          ['普通', '危险品'][props.taskInfo.ProductType - 1]
        }}</el-descriptions-item
      >
    </el-descriptions>

    <div class="expaln-box" v-if="explainList.length > 0">
      <p class="expaln-title">填写说明:</p>
      <div class="expaln-list">
        <p v-for="(i, k) in explainList" :key="k">{{ k + 1 }}、{{ i }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
const props = defineProps({
  taskInfo: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

const explainList = computed(() => {
  let arr = [] as string[]
  switch (props.taskInfo.NodeNo) {
    case 10:
      arr = [
        '适用于所有成品（若该项目包材是根据质量标准执行且没有变化，可在下方表格直接填写按质量标准执行）',
        '客户对包材信息没有要求用“NA”表示',
        '该表完善后需要传递给到研发PM和技术PM'
      ]
      break
    case 20:
      arr = [
        '液体密度，建议小数点后保留2位有效数字，单位为KG/M3，或者G/CM3。',
        '固体堆密度，建议小数点后保留2位有效数字，单位为KG/M3，或者G/CM3。根据不同批次测量结果可以给一个范围。测量方式建议：量筒中加入固定量的产品，震荡敦实3~10次，记录体积，并计算密度。',
        '致敏性：反馈实验过程中或过往项目经验是否发生过过敏现象。',
        '导静电性能：定性描述，例如：在干燥过程中是否有粉末的静电吸附。',
        '包装材料建议：内包装材质，PE袋，药用低密度聚乙烯袋（API），建议API的内包材固定厂家（同质量标准一致）。',
        '是否避光，是否有吸潮性能，是否低温储存，以及产品的特殊说明。'
      ]
      break
    case 21:
      arr = [
        '适用于所有成品（若该项目包材是根据质量标准执行且没有变化，可在下方表格直接填写按质量标准执行）',
        '客户对包材信息没有要求用“NA”表示',
        '该表完善后需要传递给到研发PM和技术PM'
      ]
      break
    case 22:
      arr = ['若不需要此包材用“NA”表示']
      break
    case 23:
      arr = ['提交包材个数需要多算一个作为留样；', '净重为单桶装产品的净重']
      break
    case 30:
      arr = []
      break
    case 40:
      arr = ['若没有要求用“NA”表示。']
      break
    case 41:
      arr = [
        '“ DHL”为一家专门的跨境快递公司，该公司要求温度计需用纸箱包装，粘贴锂电池标签和温度计型号标签；',
        '是否打托及打托方式基于控温箱或飞机机舱要求考虑，不包含客户需求及托盘承重数据；',
        '如需2个或2个以上一次性联网温度计，需备注放置于哪个托盘。'
      ]
      break
    case 50:
      arr = []
      break
    case 60:
      arr = [
        '商检方式拍照要求见睿想系统《通关单办理拍照要求》；',
        '危险品拍照要求见睿想系统《危包证办理拍照要求》；',
        '危险品货物需要贴GHS标签(特殊情况除外)、危害标识、UN桶包装或UN箱；',
        '使用温度计需要贴温度记录仪唛头，英文内容：Temperature logger inside、中文内容：内有温度记录仪；',
        '使用干燥剂需要贴干燥剂唛头，英文内容：ATTENTION:This packaging contains desiccant.；Inclusion: SiO2 Desiccant；Inclusion: SiO2 Desiccant.中文内容：注意：此包装含有干燥剂；内含：二氧化硅干燥剂；',
        '附有随货样品，需要贴随货样品提醒唛头和随货样品标签；',
        '按照DHL要求，①使用控温箱/控温罩打托： 按照原来的模式执行，用塑料袋包装温度计并放在在桶侧面（保温罩内），增加：贴温度计锂电池标签、温度计电池型号标签.②不使用控温箱/控温罩打托：温度计使用纸箱包装，贴温度计锂电池标签、温度计电池型号标签，放置在托盘盖板上方中央.③国际快递不打托：温度计使用纸箱包装，贴温度计锂电池标签、温度计电池型号标签，固定在桶侧面',
        '发往国内用中文版本的质量标签、安全标签、运输标签；发往国外用英文版本的质量标签、安全标签、运输标签。'
      ]
      break
  }
  return arr
})
</script>
<style lang="scss" scoped>
.expaln {
  padding: 0 15px;
  margin-bottom: 20px;
}
.expaln-box {
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  background: #fdf6ec;
  border: 1px solid #fcf2e3;
  padding: 0 20px;
  box-sizing: border-box;
  font-size: 13px;
  color: #666666;
  .expaln-title {
    width: 70px;
    text-align: left;
    flex-shrink: 0;
  }
  .expaln-list {
    p {
      line-height: 20px;
    }
  }
}
.task-info {
  display: flex;
  margin-top: 20px;
  color: #323233;
  span {
    margin-right: 60px;
  }
}
</style>
