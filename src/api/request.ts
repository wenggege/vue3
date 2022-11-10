import axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios'
import { ElMessage } from 'element-plus'
import { IResponseData } from '@/types'
import { openLoading, closeLoading } from '../utils/loading'
declare module 'axios' {
  export interface AxiosRequestConfig {
    isLoading?: boolean
    isMock?: boolean
    isConfig?: boolean
    isReplay?: boolean // 项目复盘
  }
  export interface AxiosInstance {
    <T = any>(config: AxiosRequestConfig): Promise<IResponseData<T>>
  }
}

// 创建axios实例
const service = axios.create({
  //   baseURL: import.meta.env.VITE_API_URL,
  baseURL: '/task',
  timeout: 50000
})

// 添加请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.baseURL = config.isReplay
      ? '/Api'
      : config.isMock
      ? '/test'
      : config.isConfig
      ? '/config'
      : '/api'
    if (config.isLoading) {
      openLoading()
    }
    const token = sessionStorage.getItem('token')
    if (token) {
      const headers = {
        Authorization: 'Bearer ' + token,
        token,
        'Content-Type': 'application/json'
      }
      config.headers = { ...config.headers, ...headers }
    }
    return config
  },
  (error: AxiosError) => {
    ElMessage.error('请求失败')
    closeLoading()
    return Promise.resolve(error || '服务器异常')
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  async (response: AxiosResponse) => {
    closeLoading()
    const { data, status, statusText } = response
    if (status == 200 || status == 201) {
      if (data.Code !== 200 && data.Code !== 1000 && data.code !== 200) {
        ElMessage.error(data.Message || data.Data)
      } else {
        return data
      }
    } else {
      ElMessage.error(statusText)
      return Promise.reject(new Error(statusText))
    }
  },
  (error: AxiosError) => {
    const { response } = error
    if (response && response.status) {
      const { statusText } = response
      const errorText = statusText
      ElMessage.error(errorText)
    } else if (!response) {
      ElMessage.error('您的网络发生异常，无法连接服务器')
    }
    closeLoading()
    return Promise.reject(error)
  }
)

export default service
