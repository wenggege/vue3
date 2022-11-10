import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from './modules/packaging'
import { projectRoutes } from './modules/projectAnalyse'
import cookies from 'js-cookie'
import { GetToken } from '../api/packaging/common'
import { ref } from 'vue'

import { close, start } from '../utils/nporgress'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'root',
      component: () => import('@/layout/index.vue'),
      children: [...routes, ...projectRoutes]
    }
  ]
})

export default router

const token = ref<string>('')
const getToken = () => {
  const Identity = {
    // DominId: cookies.get('Identity')
    // 测试环境就用下面这个，如果过期了登录 https://pjm-test.porton.cn/ 在cookie 下重新复制一个DominId
    DominId: 'BEJxJ%2bosjcaFeMnrY1ZGnw%3d%3d'
  }
  // GetToken(Identity).then((res: any) => {
  //   if (res.Code == 200) {
  //     token.value = res.Data
  //     sessionStorage.setItem('token', res.Data)
  //   }
  // })
  sessionStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJEb21haW5JZCI6IlBPUlRPTlxcanUudGFuZyIsIk5hbWUiOiLllJDoj4oiLCJFbXBObyI6IlBUMTQ3MTAiLCJEdHBObyI6IkQwMjY5IiwiRHRwTmFtZSI6IklUQlAt6LSi5YqhJumHh-i0rSblt6XnqIsiLCJleHAiOjE2NjM3MjMxMTAsImlzcyI6IlNQQ1AuUEpNIn0.dQfAu79_8GXHWOuZDhOBChAJBYgX5sZ2VqiP1a6YdB0')
}

router.beforeEach(async (to, from, next) => {
  if (token.value) {
    next()
  } else {
    await getToken()
    next()
  }
  start()
})

router.afterEach(() => {
  close()
})
