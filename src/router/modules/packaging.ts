import { RouteRecordRaw } from 'vue-router'
export const routes: Array<RouteRecordRaw> = [
  {
    path: '/packingPlan',
    name: 'packingPlan',
    component: () => import('../../views/packaging/packingPlan/index.vue'),
    meta: {
      title: '包装计划',
      isShow: true,
      icon: 'Grid'
    }
  },
  {
    path: '/packingNodeEdit',
    name: 'packingNodeEdit',
    component: () =>
    import('../../views/packaging/packingPlan/nodeEdit/index.vue'),
    meta: {
      title: '节点编辑',
      isShow: false,
      icon: 'Management'
    }
  },
  {
    path: 'productList',
    name: 'productList',
    component: () => import('../../views/packaging/productList/index.vue'),
    meta: {
      title: '产品列表',
      isShow: true,
      icon: 'Document'
    }
  },
  {
    path: '/packingPlanDetail',
    name: 'packingPlanDetail',
    component: () =>
      import(
        '../../views/packaging/productList/packingPlanDetail/index.vue'
      ),
    meta: {
      title: '包装计划详情',
      isShow: false,
      icon: 'Postcard'
    }
  },
  {
    path: '/reportForms',
    name: 'reportForms',
    component: () => import('../../views/packaging/reportForms/index.vue'),
    meta: {
      title: '项目执行报表',
      isShow: true,
      icon: 'Postcard'
    }
  },
    // 由后端返回配置渲染的----产品列表和项目执行报表（一种复用方案）
    // {
    //   path: '/configProduct',
    //   name: 'configProduct',
    //   component: () => import('../../views/packaging/configPage/index.vue'),
    //   meta: {
    //     title: '产品列表配置页',
    //     isShow: true,
    //     icon: 'Postcard',
    //     code: 'packing_plan_product_list'
    //   }
    // },
    // {
    //   path: '/configProject',
    //   name: 'configProject',
    //   component: () => import('../../views/packaging/configPage/index.vue'),
    //   meta: {
    //     title: '项目执行报表配置页',
    //     isShow: true,
    //     icon: 'Postcard',
    //     code: 'packing_plan_list'
    //   }
    // }
]
