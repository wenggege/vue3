import request from '../request'

/**
 * @description  获取项目复盘列表
 */
export const GetReplayList = (data: unknown) => {
  return request({
    url: `/Api/Project/GetReplayList`,
    method: 'GET',
    params:data,
    isLoading: true,
    isReplay:true
  })
}

/**
 * @description  获取项目复盘问题清单
 */
export const GetProblemlist = (data: unknown) => {
  return request({
    url: `/Api/Project/problemlist`,
    method: 'GET',
    params: data,
    isLoading: true,
    isReplay:true
  })
}

/**
 * @description  添加问题
 */
export const AddProblem = (data: unknown) => {
  return request({
    url: `/Api/Project/AddProblem`,
    method: 'POST',
    data,
    isLoading: true,
    isReplay:true
  })
}

/**
 * @description  报告获取基本信息
 */
export const GetOrder = (data: unknown) => {
  return request({
    url: `/Api/Project/GetOrder`,
    method: 'GET',
    params:data,
    isLoading: true,
    isReplay:true
  })
}

/**
 * @description  报告获取基本信息
 */
export const GetProjectUser = (data: unknown) => {
  return request({
    url: `/Api/Project/GetProjectUser`,
    method: 'GET',
    params:data,
    isLoading: true,
    isReplay:true
  })
}

/**
 * @description  获取已上传文件列表
 */
export const GetProjectList = (data: unknown) => {
  return request({
    url: `/Api/Project/getProjectList`,
    method: 'GET',
    params:data,
    isLoading: true,
    isReplay:true
  })
}

/**
 * @description  文件上传
 */
export const Addfile = (data: unknown) => {
  return request({
    url: `/Api/base/addfile`,
    method: 'POST',
    data,
    isLoading: true,
    isReplay:true
  })
}

/**
 * @description  文件上传后在添加保存
 */
export const Add = (data: unknown) => {
  return request({
    url: `/Api/Project/add`,
    method: 'POST',
    data,
    isLoading: true,
    isReplay:true
  })
}

/**
 * @description  删除文件
 */
export const DeleteFile = (data: unknown) => {
  return request({
    url: `/Api/Project/delete`,
    method: 'POST',
    data,
    isLoading: true,
    isReplay:true
  })
}

/**
 * @description  获取成本达标率列表
 */
export const GetProjectCost = (data: unknown) => {
  return request({
    url: `/Api/Project/GetProjectCost`,
    method: 'GET',
    params:data,
    isLoading: true,
    isReplay:true
  })
}

/**
 * @description  成本达标率列表 - 编辑
 */
export const AddEvent = (data: unknown) => {
  return request({
    url: `/Api/Project/addEvent`,
    method: 'POST',
    data,
    isLoading: true,
    isReplay:true
  })
}

/**
 * @description  客户满意度
 */
export const GetSatisfactionAverage = (data: unknown) => {
  return request({
    url: `/Api/Project/GetSatisfactionAverage`,
    method: 'GET',
    params:data,
    isLoading: true,
    isReplay:true
  })
}

/**
 * @description 获取项目执行总结列表
 */
export const GetEvent = (data: unknown) => {
  return request({
    url: `/Api/Project/getEvent`,
    method: 'GET',
    params:data,
    isLoading: true,
    isReplay:true
  })
}

/**
 * @description  项目执行总结 - 新建/编辑事件
 */
export const AddEvents = (data: unknown) => {
  return request({
    url: `/Api/Project/addEvents`,
    method: 'POST',
    data,
    isLoading: true,
    isReplay:true
  })
}

/**
 * @description  项目执行总结 - 删除
 */
export const DeleteEvent = (data: unknown) => {
  return request({
    url: `/Api/Project/deleteEvent`,
    method: 'POST',
    data,
    isLoading: true,
    isReplay:true
  })
}

/**
 * @description  问题清单 - 删除
 */
export const DeleteProblem = (data: unknown) => {
  return request({
    url: `/Api/Project/deleteProblem`,
    method: 'POST',
    data,
    isLoading: true,
    isReplay:true
  })
}

/**
 * @description 获取内部生命周期管理
 */
export const GetLifeCycle = (data: unknown) => {
  return request({
    url: `/Api/Project/getLifeCycle`,
    method: 'GET',
    params:data,
    isLoading: true,
    isReplay:true
  })
}

/**
 * @description 添加-修改 内部生命周期管理
 */
export const AddLifeCycle = (data: unknown) => {
  return request({
    url: `/Api/Project/addLifeCycle`,
    method: 'POST',
    data,
    isLoading: true,
    isReplay:true
  })
}

/**
 * @description 获取跳转外链接
 */
export const GetProjectUrl = (data: unknown) => {
  return request({
    url: `/Api/Project/GetProjectUrl`,
    method: 'GET',
    params:data,
    isLoading: true,
    isReplay:true
  })
}

/**
 * @description 获取用户信息
 */
export const Getuser = (data: unknown) => {
  return request({
    url: `/Api/base/getuser`,
    method: 'GET',
    params: data,
    isReplay:true
  })
}

/**
 * @description 完成项目报告
 */
export const SubProject = (data: unknown) => {
  return request({
    url: `/Api/Project/SubProject`,
    method: 'POST',
    data,
    isLoading: true,
    isReplay:true
  })
}

/**
 * @description 获取主任务组化合物图片
 */
export const GetElab = (data: unknown) => {
  return request({
    url: `/Api/Project/GetElab`,
    method: 'GET',
    params: data,
    isReplay:true
  })
}

/**
 * @description 获取主任务组最新最佳工艺路线图片
 */
export const GetBestElabIMG = (data: unknown) => {
  return request({
    url: `/Api/Project/GetBestElabIMG`,
    method: 'GET',
    params: data,
    isReplay:true
  })
}