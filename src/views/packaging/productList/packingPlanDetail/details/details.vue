<template>
  <!-- 基本信息 -->
  <div class="basicInfomation">
    <div v-for="i in detailData" :key="i.NodeNo">
      <component :is="`Node${i.NodeNo}`" :nodeInfo="i"></component>
    </div>
  </div>
</template>

<script lang="ts">
// script setup 模式下，components中is不能是字符串
import { reactive, defineComponent, toRefs } from 'vue'
import Node10 from './components/node1.vue'
import Node20 from './components/node2a.vue'
import Node21 from './components/node2b.vue'
import Node22 from './components/node2c.vue'
import Node23 from './components/node2d.vue'
import Node30 from './components/node3.vue'
import Node40 from './components/node4a.vue'
import Node41 from './components/node4b.vue'
import Node50 from './components/node5.vue'
import Node60 from './components/node6.vue'
export default defineComponent({
  name: 'packingPlanDetail',
  components: {
    Node10,
    Node20,
    Node21,
    Node22,
    Node23,
    Node30,
    Node40,
    Node41,
    Node50,
    Node60
  },
  props: {
    detailData: {
      type: Array as never,
      default: () => []
    }
  },
  setup() {
    const state = reactive({})
    return {
      ...toRefs(state),
      close
    }
  }
})
</script>
<style lang="scss" scoped>
.basicInfomation {
  width: 100%;
  overflow-y: auto;
  height: 100%;
  box-sizing: border-box;
  padding: 10px 15px;
  background-color: #fff;
  &::-webkit-scrollbar {
    width: 0 !important;
  }
}
</style>
