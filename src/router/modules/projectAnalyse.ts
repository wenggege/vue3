import { RouteRecordRaw } from 'vue-router'
export const projectRoutes: Array<RouteRecordRaw> = [
  {
    path: '/projectReplayList',
    name: 'projectReplayList',
    component: () => import('../../views/projectAnalyse/projectReplayList/index.vue'),
    meta: {
      title: '项目复盘列表',
      isShow: true,
      icon: 'List'
    }
  },
  {
    path: '/projectReport',
    name: 'projectReport',
    component: () =>
    import('../../views/projectAnalyse/projectReport/index.vue'),
    meta: {
      title: '项目总结报告',
      isShow: false,
      icon: 'Management'
    }
  }
]
