<!-- eslint-disable @typescript-eslint/no-non-null-assertion -->
<template>
  <div>
    <div class="logo">
      <div class="logo-img">
        <img src="@/assets/images/logo.png" alt="" />
      </div>
      <div class="logo-txt" v-show="!collapse">
        <img src="@/assets/images/logo-txt-2x.png" alt="" />
      </div>
    </div>
    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical-demo"
      active-text-color="#1765EC"
      :collapse="collapse"
      :unique-opened="true"
      :router="true"
    >
      <template v-for="item in menuTree">
        <template v-if="item.meta.isShow">
          <el-sub-menu v-if="item.children" :index="item.path" :key="item.path">
            <template #title>
              <el-icon>
                <component :is="item.meta.icon"></component>
              </el-icon>
              <span>{{ item.meta.title }}</span>
            </template>
            <template v-for="subItem in item.children" :key="subItem.path">
              <template v-if="subItem.children && collapse">
                <el-sub-menu :index="subItem.path">
                  <template #title
                    ><span>{{ subItem.meta.title }}</span></template
                  >
                  <el-menu-item
                    v-for="it in subItem.children"
                    :key="it.path"
                    :index="it.path"
                    >{{ it.meta.title }}</el-menu-item
                  >
                </el-sub-menu>
              </template>

              <el-menu-item v-else-if="subItem.children && !collapse">
                <el-popover
                  placement="right-start"
                  :width="100"
                  trigger="hover"
                  :offset="44"
                  :show-arrow="false"
                >
                  <template #reference>
                    {{ subItem.name }}<el-icon><ArrowRight /></el-icon>
                  </template>
                  <el-menu-item
                    v-for="it in subItem.children"
                    :key="it.path"
                    :index="it.path"
                    @click="jump(it)"
                    >{{ it.meta.title }}</el-menu-item
                  >
                </el-popover>
              </el-menu-item>

              <el-menu-item
                v-else
                :index="subItem.path"
                :key="subItem.path"
                @click="jump(subItem)"
                >{{ subItem.meta.title }}</el-menu-item
              >
            </template>
          </el-sub-menu>

          <template v-else>
            <el-menu-item
              :index="item.path"
              :key="item.path"
              @click="jump(item)"
            >
              <el-icon>
                <component :is="item.meta.icon"></component>
              </el-icon>
              <template #title>{{ item.meta.title }}</template>
            </el-menu-item>
          </template>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAppStore } from '../../store/index'
import { ref, computed, watch } from 'vue'
import { useRouter, RouteRecordNormalized, useRoute } from 'vue-router'
import { route } from '../../types/index'

const routeData = useRoute()
const appRoute = computed(() => {
  return router.getRoutes().find((el) => el.name === 'root')
})

const menuTree = computed(() => {
  const copyRouter = JSON.parse(JSON.stringify(appRoute.value!.children))
  console.log('123', copyRouter)
  return copyRouter
})

const appStore = useAppStore()
const { collapse } = storeToRefs(appStore)

const router = useRouter()
const defaultActive = ref(sessionStorage.getItem('path') || '/')
const minWidth = collapse.value ? '167px' : '50px'

const jump = (item: route) => {
  console.log(item)
  // router.push({
  //   path: item.path
  // })
}
watch(
  () => routeData.path,
  (val) => {
    defaultActive.value = val
  }
)
</script>

<style lang="scss">
.logo {
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  padding: 0 0 0 17px;
  box-sizing: border-box;
  color: #fff;
  font-size: 17px;
  font-weight: bold;

  .logo-img {
    height: 30px;
    img {
      height: 30px;
      object-fit: cover;
    }
  }
  .logo-txt {
    height: 30px;
    display: flex;
    align-items: center;
    img {
      height: 16px;
      width: auto;
    }
  }
}
.el-menu {
  border: none !important;
  min-width: v-bind(minWidth);
}
.el-sub-menu .el-menu-item {
  min-width: v-bind(minWidth);
}

.el-menu-item.is-active {
  background-color: #edf4ff !important;
  border-right: 2px solid $mainColor;
}
:deep(.el-popper) {
  left: 42px;
}
</style>
